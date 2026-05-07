## Open / Closed Principle (OCP)

Software entities (classes, modules, functions) should be **open for extension**, but **closed for modification**. You should be able to add new functionality by adding new code, not by rewriting old code that already works.

### Visual

```text
      FRAGILE (Modify to grow)                EXTENSIBLE (Plug-in to grow)
      ┌──────────────────────┐               ┌──────────────────────┐
      │    AreaCalculator    │               │    AreaCalculator    │
      ├──────────────────────┤               ├──────────────────────┤
      │ if shape == Square:  │      ───►     │ for shape in shapes: │
      │   # add logic        │               │   shape.area()       │
      │ elif shape == Circle:│               └──────────┬───────────┘
      │   # add logic        │                          │
      └──────────────────────┘            ┌─────────────┴─────────────┐
          (Editing this file              ▼                           ▼
           every time you add        ┌──────────┐                ┌──────────┐
           a new shape)              │  Square  │                │  Circle  │
                                     └──────────┘                └──────────┘
                                      (Just add a new class file instead)
```

---

### How to Spot It
You are likely violating OCP if:
*   You find yourself staring at a long chain of `if/elif/else` or `switch` statements based on a "type" or "category."
*   Every time a new business requirement comes in, you have to open a core logic file and risk breaking existing features.
*   The "core" of your app knows too many details about specific "plugins."

---

### Walkthrough (Python)

#### The Problem
Every time we want to support a new shape, we have to change `AreaCalculator`. If we mess up a parenthesis, we break the calculator for *every* shape.

```python
class AreaCalculator:
    def total_area(self, shapes):
        total = 0
        for shape in shapes:
            if shape["type"] == "rect":
                total += shape["width"] * shape["height"]
            elif shape["type"] == "circle":
                total += 3.14 * (shape["radius"] ** 2)
        return total
```

#### The Fix
We define a "contract" (an Interface or Abstract Base Class). The calculator only knows that shapes have an `.area()` method. To add a `Triangle`, we just write a new class; we never touch the calculator.

```python
from abc import ABC, abstractmethod


class Shape(ABC):
    @abstractmethod
    def area(self):
        pass


class Rectangle(Shape):
    def __init__(self, w, h):
        self.w, self.h = w, h

    def area(self):
        return self.w * self.h


class AreaCalculator:
    def total_area(self, shapes):
        return sum(shape.area() for shape in shapes)
```

---

### Another Shape: The "Discount System"
Imagine an e-commerce checkout.
*   **Bad:** An `apply_discount` function with `if status == "VIP"`, `elif status == "FLASH_SALE"`.
*   **Good:** A `DiscountStrategy` interface. You create `VipDiscount` and `FlashSaleDiscount` classes. When the marketing team wants a "Black Friday" discount, you just drop in a new class file.

---

### Try These
*   **Identify:** Find a `switch` statement or a long `if/elif` chain in your code. Is it checking for a "type"? 
*   **Refactor:** Try to replace that conditional logic with **Polymorphism**. Create a base class or interface and move the specific logic into subclasses.

<!-- ROOK:SERIES -->
*More in this series: [Dependency Inversion Principle (DIP)](dependency-inversion.md) · [Interface Segregation Principle (ISP)](interface-segregation.md) · [Liskov Substitution Principle (LSP)](liskov-substitution.md) · [Single Responsibility Principle (SRP)](single-responsibility.md).*
<!-- /ROOK:SERIES -->

<!-- ROOK:FOOTER -->
---

> ## About Rook
>
> If you're looking for the perfect app for your code notes, you should check out **Rook**. Rook is a native macOS notes app made for code.
>
> [Download free at userook.app](https://userook.app) · [More community notes](https://github.com/maryamtb/rook/tree/main/community-notes)
<!-- /ROOK:FOOTER -->
