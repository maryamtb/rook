# fastapi quick reference

FastAPI basics for building, validating, and testing APIs quickly.

## Setup and install

```bash
python -m venv .venv
source .venv/bin/activate
pip install "fastapi[standard]"
```

## Run server (dev and prod)

```bash
fastapi dev main.py
fastapi run main.py

# legacy dev command
uvicorn main:app --reload
```

## Minimal app (hello world)

```python
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def hello() -> dict[str, str]:
    return {"message": "hello world"}
```

## Core patterns in one file

Path operations, params, validation, models, response_model, status codes,
errors, dependencies, CORS, and background tasks.

```python
from fastapi import BackgroundTasks, Depends, FastAPI, HTTPException, Path, Query, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://<your-domain>"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ItemIn(BaseModel):
    name: str
    price: float


class ItemOut(BaseModel):
    id: int
    name: str
    price: float


def require_api_key(x_api_key: str | None = Query(default=None)) -> None:
    if x_api_key != "dev-secret":
        raise HTTPException(status_code=401, detail="unauthorized")


def write_audit_log(message: str) -> None:
    with open("audit.log", "a") as f:
        f.write(message + "\n")


@app.get("/items/{item_id}", response_model=ItemOut)
def read_item(
    item_id: int = Path(gt=0),
    q: str | None = Query(default=None, min_length=2, max_length=20),
    _auth: None = Depends(require_api_key),
):
    if item_id != 1:
        raise HTTPException(status_code=404, detail="item not found")
    return {"id": item_id, "name": q or "keyboard", "price": 99.0}


@app.post("/items", response_model=ItemOut, status_code=status.HTTP_201_CREATED)
def create_item(payload: ItemIn):
    return {"id": 2, **payload.model_dump()}


@app.put("/items/{item_id}", response_model=ItemOut)
def update_item(item_id: int, payload: ItemIn):
    return {"id": item_id, **payload.model_dump()}


@app.delete("/items/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_item(item_id: int) -> None:
    if item_id < 1:
        raise HTTPException(status_code=400, detail="invalid id")


@app.post("/notify")
def notify(email: str, tasks: BackgroundTasks):
    tasks.add_task(write_audit_log, f"queued email to {email}")
    return {"queued": True}
```

## Testing with TestClient

```python
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_hello() -> None:
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "hello world"}
```
