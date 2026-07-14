# fastapi quick reference

FastAPI is a Python framework for building HTTP APIs, documented at https://fastapi.tiangolo.com. Its central idea is that an endpoint is a typed function. The parameters declare what the request must contain, the return value declares what the response contains, and from those type declarations FastAPI derives everything else: request parsing, validation through Pydantic (invalid requests are rejected with precise errors before your code runs), and an interactive OpenAPI documentation page. Handlers can be async, and the app runs on an ASGI server (uvicorn). The sections below follow the order of the official tutorial.

## Setup

```bash
uv init --app
uv add fastapi --extra standard
uv run fastapi dev                     # dev server on 127.0.0.1:8000, reloads on save
uv run fastapi run                     # production server
```

Without uv: `pip install "fastapi[standard]"` inside a venv, then `fastapi dev main.py` (the older `uvicorn main:app --reload` does the same).

While the server runs, interactive docs are generated from your code at `/docs` (Swagger UI) and `/redoc`. Every example below shows up there automatically.

## First app, and how the decorators work

```python
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "hello world"}
```

`app` is the application object. `@app.get("/")` is a Python decorator: `app.get("/")` returns a function, that function is called with `root`, and it registers `root` in the app's route table for `GET /`. The line is equivalent to writing `app.get("/")(root)` after the definition. Decorators are FastAPI's entire routing API; there is one per HTTP method (`@app.get`, `@app.post`, `@app.put`, `@app.delete`), and each registration is called a *path operation*. The function's return value is converted to JSON.

Use `async def` when the function awaits something (database driver, HTTP call). A plain `def` also works; FastAPI runs it in a thread pool so it doesn't block the event loop.

## Path parameters

```python
@app.get("/items/{item_id}")
async def read_item(item_id: int):
    return {"item_id": item_id}
```

`{item_id}` in the path binds to the argument with the same name. The `int` hint is doing real work: `/items/5` arrives as the integer `5`, and `/items/abc` is rejected with a `422` response that says exactly which field failed and why, before your function runs. This is the central FastAPI idea; declare the type once and parsing, validation, and docs all follow.

## Query parameters

Any function argument not in the path becomes a query parameter.

```python
@app.get("/items")
async def list_items(skip: int = 0, limit: int = 10, q: str | None = None):
    return {"skip": skip, "limit": limit, "q": q}
```

This handles `/items?skip=20&limit=5&q=rook`. An argument with a default is optional; one without a default is required.

## Request body

Declare a JSON body as a Pydantic model. Fields with defaults are optional, the rest are required, and a wrong or missing field is a `422` with details.

```python
from pydantic import BaseModel


class Item(BaseModel):
    name: str
    price: float
    description: str | None = None


@app.post("/items")
async def create_item(item: Item):
    return {"name": item.name, "price_with_tax": item.price * 1.2}
```

FastAPI tells the parameter kinds apart by inspection: path params match the route, Pydantic models read the body, everything else is a query param.

## Validation rules

For rules beyond the type itself (ranges, lengths), wrap the type in `Annotated` with `Query` or `Path`. This is the syntax the docs recommend.

```python
from typing import Annotated
from fastapi import Path, Query


@app.get("/items/{item_id}")
async def read_item(
    item_id: Annotated[int, Path(gt=0)],
    q: Annotated[str | None, Query(min_length=2, max_length=20)] = None,
):
    return {"item_id": item_id, "q": q}
```

Headers and cookies work the same way with `Header()` and `Cookie()`. For body fields, use `Field` inside the Pydantic model.

## Response model and status codes

`response_model` declares what goes out: the return value is validated against it, documented, and any field not on the model is dropped, so internal fields can't leak. `status_code` sets the success status.

```python
from fastapi import status


class ItemOut(BaseModel):
    id: int
    name: str


@app.post("/items", response_model=ItemOut, status_code=status.HTTP_201_CREATED)
async def create_item(item: Item):
    return {"id": 1, "name": item.name, "internal_cost": 12.0}   # internal_cost is stripped
```

## Error handling

Raise `HTTPException` anywhere in a handler. The client gets `{"detail": ...}` with the status you set.

```python
from fastapi import HTTPException

items = {1: {"name": "keyboard"}}


@app.get("/items/{item_id}")
async def read_item(item_id: int):
    if item_id not in items:
        raise HTTPException(status_code=404, detail="item not found")
    return items[item_id]
```

## Dependencies

A dependency is a function that runs before the handler, with its result injected as an argument. It is FastAPI's answer to shared logic: auth checks, database sessions, pagination. Dependencies can declare their own parameters (and their own dependencies), and they validate the same way handlers do.

```python
from fastapi import Depends, Header, HTTPException


async def require_api_key(x_api_key: Annotated[str, Header()]):
    if x_api_key != "<secret>":
        raise HTTPException(status_code=401, detail="unauthorized")


@app.get("/private", dependencies=[Depends(require_api_key)])
async def private():
    return {"ok": True}
```

Here the dependency only guards; when you need its return value (a database session, the current user), take it as a parameter instead: `user: Annotated[User, Depends(get_current_user)]`.

## CORS

Browsers block JavaScript on one origin from calling an API on another unless the API opts in. Add the middleware and list the origins your frontend runs on.

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://<your-domain>"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Background tasks

A background task runs after the response is sent, in the same process. Good for audit logs and notification emails; use a real task queue for heavy work.

```python
from fastapi import BackgroundTasks


def write_audit_log(message: str):
    with open("audit.log", "a") as f:
        f.write(message + "\n")


@app.post("/notify")
async def notify(email: str, tasks: BackgroundTasks):
    tasks.add_task(write_audit_log, f"queued email to {email}")
    return {"queued": True}
```

## Bigger applications

When one file gets crowded, split routes into `APIRouter`s (one per resource, typically in a `routers/` package) and include them in the app. A router is registered the same way, with the same decorators.

```python
from fastapi import APIRouter

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/")
async def list_users():
    return []


app.include_router(router)
```

## Testing

`TestClient` calls the app in-process, so tests need no running server. Write plain pytest functions.

```python
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "hello world"}
```

```bash
uv run pytest
```

<!-- ROOK:FOOTER -->
---

> ## About Rook
>
> If you're looking for the perfect app for your code notes, you should check out **Rook**. Rook is a native macOS notes app made for code.
>
> [Download free at userook.app](https://userook.app) · [More community notes](https://github.com/maryamtb/rook/tree/main/community-notes)
<!-- /ROOK:FOOTER -->
