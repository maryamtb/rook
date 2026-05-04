<!-- ROOK:HEADER -->
> Part of [Rook](https://userook.app), a notes app made for code. Download free at [userook.app](https://userook.app).
<!-- /ROOK:HEADER -->

## Liskov Substitution Principle (LSP)

If you have a function that works with a `Bird`, it should also work with a `Sparrow` or a `Penguin`. If the `Penguin` forces the function to crash or act weirdly because it can't fly, you’ve broken the principle.

### Visual

```text
      BROKEN (Unexpected behavior)           FIXED (Predictable hierarchy)
                                             
          ┌────────────┐                         ┌────────────┐
          │    Bird    │                         │    Bird    │
          ├────────────┤                         └──────┬─────┘
          │ + fly()    │                                │
          └─────┬──────┘                 ┌──────────────┴──────────────┐
                │                        ▼                             ▼
        ┌───────┴───────┐        ┌──────────────┐              ┌──────────────┐
        ▼               ▼        │  FlyingBird  │              │ Flightless   │
    ┌────────┐      ┌────────┐   ├──────────────┤              └──────────────┘
    │ Sparrow│      │ Penguin│   │ + fly()      │                      ▲
    │ (ok)   │      │ (crash)│   └──────┬───────┘                      │
    └────────┘      └────────┘          │                      ┌───────┴──────┐
                                        ▼                      ▼              ▼
                                   ┌────────┐             ┌────────┐     ┌────────┐
                                   │ Sparrow│             │ Penguin│     │ Ostrich│
                                   └────────┘             └────────┘     └────────┘
```

---

### How to Spot It
You are likely violating LSP if:
* A subclass disables inherited behavior (e.g., leaving a method empty or raising `NotImplementedError`)
* You find yourself writing `if isinstance(obj, SpecificClass):` before calling a method
* A subclass surprises the code by returning a different data type than the parent (e.g., the parent returns a List, but the child returns `None` or a `String`).

---

### Walkthrough (Python)

#### The Problem
The classic "Square vs. Rectangle" trap. Mathematically, a square is a rectangle. But in code, if a `Square` inherits from `Rectangle` and forces `width == height`, it breaks any code that expects a rectangle to behave normally.

```python
class Rectangle:
    def set_width(self, w):
        self.width = w

    def set_height(self, h):
        self.height = h


class Square(Rectangle):
    def set_width(self, w):
        self.width = self.height = w  # Side effect: sets both!


def maximize_area(rect):
    rect.set_width(10)
    rect.set_height(5)
    # A Rectangle user expects 10 * 5 = 50.
    # But a Square gives 5 * 5 = 25. The code is now broken.
    assert rect.width * rect.height == 50
```

#### The Fix
If two classes share behavior but have different rules, don't force one to inherit from the other. Make them siblings under a more general interface or separate them entirely.

```python
class Shape(ABC):
    @abstractmethod
    def area(self):
        pass


class Rectangle(Shape):
    def __init__(self, w, h):
        self.w, self.h = w, h

    def area(self):
        return self.w * self.h


class Square(Shape):
    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side**2
```

---

### Another Shape: The "File System"
Imagine a base `File` class with a `write()` method.
*   **Violation:** A `ReadOnlyFile` subclass that throws an error when `write()` is called. 
*   **Fix:** Separate them into `ReadableFile` and `WritableFile`. Only give the `write()` capability to classes that can actually handle it.

---

### Try These
*   **Identify:** Look for methods in your subclasses that contain `pass` or `raise Exception("Not supported")`. 
*   **Refactor:** Ask yourself: "Is this subclass *really* a version of the parent, or does it just share some similarities?" If it can't fulfill the parent's full promise, use **Composition** instead of **Inheritance**.

<!-- ROOK:SERIES -->
*More in this series: [Dependency Inversion Principle (DIP)](dependency-inversion.md) · [Interface Segregation Principle (ISP)](interface-segregation.md) · [Open / Closed Principle (OCP)](open-closed.md) · [Single Responsibility Principle (SRP)](single-responsibility.md).*
<!-- /ROOK:SERIES -->

<!-- ROOK:FOOTER -->
---

> ## About Rook
>
> If you're looking for the perfect app for your code notes, you should check out **Rook**. Rook is a native macOS notes app made for code.
>
> [Download free at userook.app](https://userook.app) · [More community notes](https://github.com/maryamtb/rook/tree/main/community-notes)
<!-- /ROOK:FOOTER -->
