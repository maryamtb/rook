## Interface Segregation Principle (ISP)

**"Many client-specific interfaces are better than one general-purpose interface."**

Don't force a class to depend on methods it doesn't use. Instead of one giant "God Interface," break it into small, specific pieces so classes only have to "sign up" for the specific actions they actually perform.

### Visual

```text
      BLOATED (Forced to disable methods)       LEAN (Specific & Focused)
      ┌──────────────────────────┐               ┌──────────┐   ┌──────────┐
      │      SmartPrinter        │               │ Printer  │   │ Scanner  │
      ├──────────────────────────┤               ├──────────┤   ├──────────┤
      │ + print()                │      ───►     │ + print()│   │ + scan() │
      │ + scan()                 │               └──────────┘   └──────────┘
      │ + fax()                  │                     ▲             ▲
      └─────────────┬────────────┘                     │             │
                    │                          ┌───────┴─────────────┴──────┐
          ┌─────────┴─────────┐                │      All-In-One Unit       │
          ▼                   ▼                └────────────────────────────┘
    ┌───────────┐       ┌───────────┐          (Only implement what you need)
    │ OldPrinter│       │ NewScanner│
    │ (fax=Error)       │ (print=???)
```

---

### How to Spot It
You are likely violating ISP if:
*   You find yourself writing "empty" implementations of methods (e.g., `def scan(self): pass`).
*   You see methods that raise `NotImplementedError` just to prevent them from being called.
*   Your interface (or abstract base class) has a massive list of methods that don't seem logically related.

---

### Walkthrough (Python)

#### The Problem
We have a `Worker` interface. But if we have a `Robot` worker, it's forced to implement `eat()`, which makes no sense. The Robot is forced to "stub out" or disable the method.

```python
class Worker(ABC):
    @abstractmethod
    def work(self):
        pass

    @abstractmethod
    def eat(self):
        pass


class Robot(Worker):
    def work(self):
        print("Robot is working")

    def eat(self):
        # Violation: Robots don't eat, but the interface forces this
        raise NotImplementedError("Robots don't have stomachs")
```

#### The Fix
Split the interfaces. Only classes that *need* to eat will inherit from `Eatable`.

```python
class Workable(ABC):
    @abstractmethod
    def work(self):
        pass


class Eatable(ABC):
    @abstractmethod
    def eat(self):
        pass


class Human(Workable, Eatable):
    def work(self):
        print("Human working")

    def eat(self):
        print("Human eating lunch")


class Robot(Workable):
    def work(self):
        print("Robot working")

    # Clean: No mention of eating
```

---

### Another Shape: The "Smart Home"
Imagine a `Device` interface with `turn_on()`, `set_volume()`, and `set_temperature()`.
*   **Bad:** A `LightBulb` is forced to implement `set_volume()`.
*   **Good:** Separate interfaces for `Switchable`, `VolumeControllable`, and `TemperatureControllable`.

---

### Try These
*   **Identify:** Look at your abstract classes. Do they have more than 5 methods? Could those be grouped into smaller, more specific roles?
*   **Refactor:** Use **Multiple Inheritance** to compose exactly the functionality a class needs.

<!-- ROOK:SERIES -->
*More in this series: [Dependency Inversion Principle (DIP)](dependency-inversion.md) · [Liskov Substitution Principle (LSP)](liskov-substitution.md) · [Open / Closed Principle (OCP)](open-closed.md) · [Single Responsibility Principle (SRP)](single-responsibility.md).*
<!-- /ROOK:SERIES -->

<!-- ROOK:FOOTER -->
---

> ## About Rook
>
> If you're looking for the perfect app for your code notes, you should check out **Rook**. Rook is a native macOS notes app made for code.
>
> [Download free at userook.app](https://userook.app) · [More community notes](https://github.com/maryamtb/rook/tree/main/community-notes)
<!-- /ROOK:FOOTER -->
