// Comprehensive lesson content for all programming languages
// Each course has 20+ lessons across modules

export interface LessonContent {
  title: string;
  slug: string;
  content: string;
  estimatedMinutes: number;
  exercises?: { title: string; description: string; requirements: string[]; points: number }[];
  quiz?: { title: string; questions: { question: string; type: string; options: { text: string; isCorrect: boolean }[] }[] };
}

export interface ModuleContent {
  title: string;
  description: string;
  lessons: LessonContent[];
}

export interface CourseContent {
  slug: string;
  modules: ModuleContent[];
}

// ─── Helper ────────────────────────────────────────────────

const code = (lang: string, code: string) => `\`\`\`${lang}\n${code}\n\`\`\``;

// ════════════════════════════════════════════════════════════
// PYTHON INTERMEDIATE (20 lessons)
// ════════════════════════════════════════════════════════════

export const pythonIntermediate: CourseContent = {
  slug: "python-intermediate",
  modules: [
    {
      title: "Object-Oriented Programming",
      description: "Master classes, objects, inheritance, and polymorphism",
      lessons: [
        { title: "Classes and Objects", slug: "classes-objects", content: "# Classes and Objects\n\n## Defining a Class\n\n```python\nclass Dog:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\n    def bark(self):\n        return f\"{self.name} says Woof!\"\n\nmy_dog = Dog(\"Buddy\", 3)\nprint(my_dog.bark())  # Buddy says Woof!\n```\n\n## Instance vs Class Variables\n\n```python\nclass Car:\n    wheels = 4  # Class variable\n\n    def __init__(self, make):\n        self.make = make  # Instance variable\n```\n\n> **Tip:** Always use `self` to refer to the current instance.", estimatedMinutes: 25, exercises: [{ title: "Create a Person Class", description: "Create a Person class with name, age, and greet() method", requirements: ["Define __init__", "Create greet() method", "Test with 2 instances"], points: 20 }] },
        { title: "Inheritance", slug: "inheritance", content: "# Inheritance\n\n## Basic Inheritance\n\n```python\nclass Animal:\n    def speak(self):\n        raise NotImplementedError\n\nclass Dog(Animal):\n    def speak(self):\n        return \"Woof!\"\n\nclass Cat(Animal):\n    def speak(self):\n        return \"Meow!\"\n```\n\n## super() Function\n\n```python\nclass Manager(Employee):\n    def __init__(self, name, salary, department):\n        super().__init__(name, salary)\n        self.department = department\n```\n\n## Multiple Inheritance\n\n```python\nclass Duck(Animal, Flyer, Swimmer):\n    pass\n```", estimatedMinutes: 20 },
        { title: "Polymorphism", slug: "polymorphism", content: "# Polymorphism\n\n## What is Polymorphism?\n\nDifferent classes can be used through the same interface.\n\n```python\ndef animal_sound(animal):\n    print(animal.speak())\n\nanimal_sound(Dog())  # Woof!\nanimal_sound(Cat())  # Meow!\n```\n\n## Duck Typing\n\n```python\nclass Duck:\n    def speak(self): return \"Quack!\"\n\nclass Dog:\n    def speak(self): return \"Woof!\"\n\nfor animal in [Duck(), Dog()]:\n    print(animal.speak())\n```", estimatedMinutes: 15 },
        { title: "Encapsulation", slug: "encapsulation", content: "# Encapsulation\n\n## Private Variables\n\n```python\nclass BankAccount:\n    def __init__(self, balance):\n        self.__balance = balance  # Private\n\n    def deposit(self, amount):\n        self.__balance += amount\n\n    def get_balance(self):\n        return self.__balance\n```\n\n## Properties\n\n```python\nclass Circle:\n    @property\n    def radius(self):\n        return self._radius\n\n    @radius.setter\n    def radius(self, value):\n        if value < 0:\n            raise ValueError(\"Radius cannot be negative\")\n        self._radius = value\n```", estimatedMinutes: 20 },
        { title: "Magic Methods", slug: "magic-methods", content: "# Magic Methods\n\n## Common Magic Methods\n\n```python\nclass Vector:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    def __repr__(self):\n        return f\"Vector({self.x}, {self.y})\"\n\n    def __add__(self, other):\n        return Vector(self.x + other.x, self.y + other.y)\n\n    def __len__(self):\n        return int((self.x**2 + self.y**2) ** 0.5)\n\n    def __eq__(self, other):\n        return self.x == other.x and self.y == other.y\n```\n\n## Useful Magic Methods\n\n- `__str__` — string representation\n- `__repr__` — developer representation\n- `__add__`, `__sub__`, `__mul__` — arithmetic\n- `__getitem__`, `__setitem__` — indexing\n- `__call__` — make instance callable", estimatedMinutes: 20 },
      ],
    },
    {
      title: "File Handling",
      description: "Read and write files, CSV, JSON",
      lessons: [
        { title: "Reading Files", slug: "reading-files", content: "# Reading Files\n\n## Using with Statement\n\n```python\nwith open(\"data.txt\", \"r\") as f:\n    content = f.read()\n    print(content)\n```\n\n## Line by Line\n\n```python\nwith open(\"data.txt\") as f:\n    for line in f:\n        print(line.strip())\n```\n\n## Read as Lines List\n\n```python\nwith open(\"data.txt\") as f:\n    lines = f.readlines()\n    print(len(lines))\n```", estimatedMinutes: 15 },
        { title: "Writing Files", slug: "writing-files", content: "# Writing Files\n\n## Write (Overwrites)\n\n```python\nwith open(\"output.txt\", \"w\") as f:\n    f.write(\"Hello World\\n\")\n```\n\n## Append\n\n```python\nwith open(\"log.txt\", \"a\") as f:\n    f.write(\"New entry\\n\")\n```\n\n## Writelines\n\n```python\nwith open(\"data.txt\", \"w\") as f:\n    f.writelines([\"line1\\n\", \"line2\\n\", \"line3\\n\"])\n```", estimatedMinutes: 15 },
        { title: "Working with JSON", slug: "json-files", content: "# JSON Files\n\n```python\nimport json\n\n# Write JSON\ndata = {\"name\": \"Alice\", \"age\": 25}\nwith open(\"data.json\", \"w\") as f:\n    json.dump(data, f, indent=2)\n\n# Read JSON\nwith open(\"data.json\") as f:\n    loaded = json.load(f)\n    print(loaded[\"name\"])\n```\n\n## JSON Strings\n\n```python\njson_str = json.dumps(data)\ndata = json.loads(json_str)\n```", estimatedMinutes: 20 },
        { title: "Working with CSV", slug: "csv-files", content: "# CSV Files\n\n```python\nimport csv\n\n# Write CSV\nwith open(\"data.csv\", \"w\", newline=\"\") as f:\n    writer = csv.writer(f)\n    writer.writerow([\"Name\", \"Age\"])\n    writer.writerow([\"Alice\", 25])\n\n# Read CSV\nwith open(\"data.csv\") as f:\n    reader = csv.DictReader(f)\n    for row in reader:\n        print(row[\"Name\"], row[\"Age\"])\n```", estimatedMinutes: 20 },
        { title: "File Paths with pathlib", slug: "pathlib", content: "# pathlib Module\n\n```python\nfrom pathlib import Path\n\np = Path(\"documents\")\np.mkdir(exist_ok=True)\n\nfile = p / \"data.txt\"\nfile.write_text(\"Hello\")\n\nprint(file.read_text())\nprint(file.exists())\nprint(file.suffix)\nprint(file.stem)\n```\n\n## Globbing\n\n```python\nfor py_file in Path(\".\").glob(\"**/*.py\"):\n    print(py_file)\n```", estimatedMinutes: 15 },
      ],
    },
    {
      title: "Error Handling & Decorators",
      description: "Exceptions, custom errors, and decorators",
      lessons: [
        { title: "Exception Handling", slug: "exception-handling", content: "# Exception Handling\n\n```python\ntry:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print(\"Cannot divide by zero!\")\nexcept Exception as e:\n    print(f\"Error: {e}\")\nfinally:\n    print(\"Always runs\")\n```\n\n## Custom Exceptions\n\n```python\nclass InsufficientFundsError(Exception):\n    def __init__(self, balance, amount):\n        super().__init__(\n            f\"Cannot withdraw {amount}. Balance: {balance}\"\n        )\n```", estimatedMinutes: 20 },
        { title: "Context Managers", slug: "context-managers", content: "# Context Managers\n\n## Using @contextmanager\n\n```python\nfrom contextlib import contextmanager\n\n@contextmanager\ndef timer():\n    import time\n    start = time.time()\n    yield\n    print(f\"Elapsed: {time.time() - start:.2f}s\")\n\nwith timer():\n    sum(range(1000000))\n```\n\n## Class-based\n\n```python\nclass Database:\n    def __enter__(self):\n        self.conn = connect()\n        return self.conn\n\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        self.conn.close()\n```", estimatedMinutes: 15 },
        { title: "Decorators", slug: "decorators", content: "# Decorators\n\n## Basic Decorator\n\n```python\ndef timer(func):\n    def wrapper(*args, **kwargs):\n        import time\n        start = time.time()\n        result = func(*args, **kwargs)\n        print(f\"{func.__name__} took {time.time()-start:.4f}s\")\n        return result\n    return wrapper\n\n@timer\ndef slow_function():\n    import time\n    time.sleep(1)\n```\n\n## Decorator with Arguments\n\n```python\ndef repeat(n):\n    def decorator(func):\n        def wrapper(*args, **kwargs):\n            for _ in range(n):\n                result = func(*args, **kwargs)\n            return result\n        return wrapper\n    return decorator\n\n@repeat(3)\ndef greet():\n    print(\"Hello!\")\n```", estimatedMinutes: 25 },
        { title: "Generators", slug: "generators", content: "# Generators\n\n## Generator Function\n\n```python\ndef fibonacci():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b\n\nfib = fibonacci()\nfor _ in range(10):\n    print(next(fib))\n```\n\n## Generator Expressions\n\n```python\nsquares = (x**2 for x in range(1000000))\nprint(next(squares))  # 0\nprint(next(squares))  # 1\n```\n\n## Benefits\n- Memory efficient\n- Lazy evaluation\n- Pipeline processing", estimatedMinutes: 20 },
      ],
    },
    {
      title: "Modules & Packages",
      description: "Organizing code into modules and packages",
      lessons: [
        { title: "Importing Modules", slug: "importing-modules", content: "# Importing Modules\n\n```python\nimport math\nfrom math import sqrt, pi\nfrom datetime import datetime as dt\nimport os.path as osp\n```\n\n## Creating Modules\n\n```python\n# utils.py\ndef greet(name):\n    return f\"Hello, {name}!\"\n\nPI = 3.14159\n```\n\n```python\n# main.py\nimport utils\nprint(utils.greet(\"Alice\"))\nprint(utils.PI)\n```", estimatedMinutes: 15 },
        { title: "Packages", slug: "packages", content: "# Packages\n\n## Package Structure\n\n```\nmypackage/\n    __init__.py\n    module1.py\n    module2.py\n    subpackage/\n        __init__.py\n        module3.py\n```\n\n## Using Packages\n\n```python\nfrom mypackage.module1 import MyClass\nfrom mypackage.subpackage import module3\n```", estimatedMinutes: 15 },
      ],
    },
    {
      title: "Regular Expressions",
      description: "Pattern matching with regex",
      lessons: [
        { title: "Regex Basics", slug: "regex-basics", content: "# Regular Expressions\n\n```python\nimport re\n\n# Find all emails\nemail = r\"[\\w.-]+@[\\w.-]+\\.\\w+\"\ntext = \"Contact us at hello@example.com\"\nmatch = re.findall(email, text)\nprint(match)  # ['hello@example.com']\n```\n\n## Common Patterns\n\n- `\\d` — digit\n- `\\w` — word character\n- `\\s` — whitespace\n- `.` — any character\n- `*` — zero or more\n- `+` — one or more\n- `?` — zero or one\n- `{n}` — exactly n times\n- `^` — start\n- `$` — end", estimatedMinutes: 20 },
        { title: "Regex Functions", slug: "regex-functions", content: "# Regex Functions\n\n```python\nimport re\n\n# search — first match\nm = re.search(r\"\\d+\", \"abc123def\")\nprint(m.group())  # 123\n\n# match — start only\nm = re.match(r\"\\d+\", \"123abc\")\nprint(m.group())  # 123\n\n# sub — replace\nresult = re.sub(r\"\\d+\", \"X\", \"a1b2c3\")\nprint(result)  # aXbXcX\n\n# split\nparts = re.split(r\"[,;]\", \"a,b;c\")\nprint(parts)  # ['a', 'b', 'c']\n```", estimatedMinutes: 20 },
      ],
    },
    {
      title: "Lambda & Functional Programming",
      description: "Functional programming paradigms in Python",
      lessons: [
        { title: "Lambda Functions", slug: "lambda-functions", content: "# Lambda Functions\n\n```python\n# Basic lambda\nsquare = lambda x: x ** 2\nadd = lambda a, b: a + b\n\nprint(square(5))   # 25\nprint(add(3, 4))   # 7\n```\n\n## With map, filter, reduce\n\n```python\nnumbers = [1, 2, 3, 4, 5]\n\n# map\nsquared = list(map(lambda x: x**2, numbers))\n\n# filter\nevens = list(filter(lambda x: x % 2 == 0, numbers))\n\n# reduce\nfrom functools import reduce\ntotal = reduce(lambda a, b: a + b, numbers)\n```", estimatedMinutes: 20 },
        { title: "Map, Filter, Reduce", slug: "map-filter-reduce", content: "# Map, Filter, Reduce\n\n## map()\n\n```python\nnames = [\"alice\", \"bob\", \"charlie\"]\nupper = list(map(str.upper, names))\n# ['ALICE', 'BOB', 'CHARLIE']\n```\n\n## filter()\n\n```python\nnumbers = [1, -2, 3, -4, 5]\npositive = list(filter(lambda x: x > 0, numbers))\n# [1, 3, 5]\n```\n\n## reduce()\n\n```python\nfrom functools import reduce\nproduct = reduce(lambda a, b: a * b, [1, 2, 3, 4])\n# 24\n```", estimatedMinutes: 20 },
        { title: "List Comprehensions", slug: "list-comprehensions", content: "# List Comprehensions\n\n```python\n# Basic\nsquares = [x**2 for x in range(10)]\n\n# With condition\nevens = [x for x in range(20) if x % 2 == 0]\n\n# Nested\npairs = [(x, y) for x in range(3) for y in range(3)]\n\n# Dict comprehension\nword_lengths = {w: len(w) for w in [\"hello\", \"world\"]}\n\n# Set comprehension\nunique_lengths = {len(w) for w in [\"hello\", \"world\", \"hi\"]}\n```", estimatedMinutes: 20 },
      ],
    },
  ],
};

// ════════════════════════════════════════════════════════════
// JAVA BASIC (20 lessons)
// ════════════════════════════════════════════════════════════

export const javaBasic: CourseContent = {
  slug: "java-basic",
  modules: [
    {
      title: "Getting Started",
      description: "Introduction to Java and setup",
      lessons: [
        { title: "Introduction to Java", slug: "intro-java", content: "# Introduction to Java\n\nJava is a compiled, statically-typed, object-oriented language.\n\n## Your First Program\n\n```java\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}\n```\n\n## Key Concepts\n- Everything is inside a **class**\n- `main()` is the entry point\n- Every statement ends with **semicolons**\n- Java is **case-sensitive**", estimatedMinutes: 15, exercises: [{ title: "Hello Java", description: "Create a program that prints your name", requirements: ["Create a class", "Use main method", "Print your name"], points: 10 }] },
        { title: "Variables and Data Types", slug: "java-variables", content: "# Variables and Data Types\n\n## Primitive Types\n\n| Type | Size | Example |\n|------|------|---------|\n| `int` | 4 bytes | `int age = 25;` |\n| `double` | 8 bytes | `double pi = 3.14;` |\n| `char` | 2 bytes | `char c = 'A';` |\n| `boolean` | 1 bit | `boolean flag = true;` |\n| `long` | 8 bytes | `long big = 100L;` |\n| `float` | 4 bytes | `float f = 3.14f;` |\n| `byte` | 1 byte | `byte b = 127;` |\n| `short` | 2 bytes | `short s = 30000;` |\n\n## Strings\n\n```java\nString name = \"Alice\";\nint len = name.length();\nString upper = name.toUpperCase();\n```", estimatedMinutes: 20 },
        { title: "Operators", slug: "java-operators", content: "# Operators\n\n## Arithmetic\n\n```java\nint a = 10, b = 3;\na + b   // 13\na - b   // 7\na * b   // 30\na / b   // 3 (integer division)\na % b   // 1 (modulus)\n```\n\n## Ternary\n\n```java\nint age = 20;\nString s = (age >= 18) ? \"Adult\" : \"Minor\";\n```", estimatedMinutes: 15 },
      ],
    },
    {
      title: "Control Flow",
      description: "Conditions and loops",
      lessons: [
        { title: "If-Else Statements", slug: "if-else", content: "# If-Else\n\n```java\nint score = 85;\nif (score >= 90) {\n    System.out.println(\"A\");\n} else if (score >= 80) {\n    System.out.println(\"B\");\n} else {\n    System.out.println(\"C\");\n}\n```\n\n## Switch\n\n```java\nString day = \"Monday\";\nswitch (day) {\n    case \"Monday\": System.out.println(\"Start\"); break;\n    case \"Friday\": System.out.println(\"TGIF\"); break;\n    default: System.out.println(\"Regular\");\n}\n```", estimatedMinutes: 20 },
        { title: "For Loop", slug: "for-loop", content: "# For Loop\n\n```java\n// Basic for loop\nfor (int i = 0; i < 5; i++) {\n    System.out.println(i);\n}\n\n// Enhanced for-each\nint[] nums = {1, 2, 3, 4, 5};\nfor (int n : nums) {\n    System.out.println(n);\n}\n```\n\n## Nested Loops\n\n```java\nfor (int i = 1; i <= 5; i++) {\n    for (int j = 1; j <= i; j++) {\n        System.out.print(\"* \");\n    }\n    System.out.println();\n}\n```", estimatedMinutes: 20, exercises: [{ title: "FizzBuzz", description: "Print 1-100: multiples of 3=Fizz, 5=Buzz, both=FizzBuzz", requirements: ["Use for loop", "Use modulo", "Handle all cases"], points: 15 }] },
        { title: "While Loop", slug: "while-loop", content: "# While Loop\n\n```java\nint count = 0;\nwhile (count < 5) {\n    System.out.println(count);\n    count++;\n}\n```\n\n## do-while\n\n```java\nint num = 1;\ndo {\n    System.out.println(num);\n    num *= 2;\n} while (num <= 16);\n```\n\n## Break and Continue\n\n```java\nfor (int i = 0; i < 10; i++) {\n    if (i == 5) break;\n    if (i % 2 == 0) continue;\n    System.out.println(i);\n}\n```", estimatedMinutes: 15 },
      ],
    },
    {
      title: "Methods and Arrays",
      description: "Functions and data structures",
      lessons: [
        { title: "Methods", slug: "java-methods", content: "# Methods\n\n```java\npublic static int add(int a, int b) {\n    return a + b;\n}\n\npublic static void greet(String name) {\n    System.out.println(\"Hello, \" + name + \"!\");\n}\n```\n\n## Method Overloading\n\n```java\npublic static int add(int a, int b) { return a + b; }\npublic static double add(double a, double b) { return a + b; }\npublic static int add(int a, int b, int c) { return a + b + c; }\n```", estimatedMinutes: 20 },
        { title: "Arrays", slug: "java-arrays", content: "# Arrays\n\n```java\nint[] nums = new int[5];\nint[] primes = {2, 3, 5, 7, 11};\n\nSystem.out.println(primes[0]);  // 2\nSystem.out.println(primes.length);  // 5\n\nfor (int p : primes) {\n    System.out.println(p);\n}\n```\n\n## 2D Arrays\n\n```java\nint[][] matrix = {\n    {1, 2, 3},\n    {4, 5, 6}\n};\n```", estimatedMinutes: 20, exercises: [{ title: "Array Sum", description: "Write a method that returns the sum of an int array", requirements: ["Create method", "Accept array", "Return sum"], points: 15 }] },
      ],
    },
    {
      title: "OOP in Java",
      description: "Classes, objects, inheritance, interfaces",
      lessons: [
        { title: "Classes and Objects", slug: "java-classes", content: "# Classes and Objects\n\n```java\npublic class Person {\n    private String name;\n    private int age;\n\n    public Person(String name, int age) {\n        this.name = name;\n        this.age = age;\n    }\n\n    public String getName() { return name; }\n    public void setAge(int age) { this.age = age; }\n\n    @Override\n    public String toString() {\n        return name + \" (\" + age + \")\";\n    }\n}\n\nPerson p = new Person(\"Alice\", 25);\nSystem.out.println(p);\n```", estimatedMinutes: 25 },
        { title: "Inheritance", slug: "java-inheritance", content: "# Inheritance\n\n```java\npublic class Animal {\n    String name;\n\n    public void speak() {\n        System.out.println(\"...\");\n    }\n}\n\npublic class Dog extends Animal {\n    @Override\n    public void speak() {\n        System.out.println(\"Woof!\");\n    }\n}\n```\n\n## abstract class\n\n```java\npublic abstract class Shape {\n    abstract double area();\n}\n\npublic class Circle extends Shape {\n    double radius;\n    double area() { return Math.PI * radius * radius; }\n}\n```", estimatedMinutes: 25 },
        { title: "Interfaces", slug: "java-interfaces", content: "# Interfaces\n\n```java\npublic interface Drawable {\n    void draw();\n    default void hide() {\n        System.out.println(\"Hidden\");\n    }\n}\n\npublic class Rectangle implements Drawable {\n    @Override\n    public void draw() {\n        System.out.println(\"Drawing rectangle\");\n    }\n}\n```\n\n## Multiple Interfaces\n\n```java\npublic class Widget implements Drawable, Resizable {\n    // Must implement both\n}\n```", estimatedMinutes: 20 },
        { title: "Encapsulation", slug: "java-encapsulation", content: "# Encapsulation\n\n## Access Modifiers\n\n| Modifier | Class | Package | Subclass | World |\n|----------|-------|---------|----------|-------|\n| `public` | ✓ | ✓ | ✓ | ✓ |\n| `protected` | ✓ | ✓ | ✓ | ✗ |\n| default | ✓ | ✓ | ✗ | ✗ |\n| `private` | ✓ | ✗ | ✗ | ✗ |\n\n```java\npublic class BankAccount {\n    private double balance;\n\n    public void deposit(double amount) {\n        if (amount > 0) balance += amount;\n    }\n\n    public double getBalance() {\n        return balance;\n    }\n}\n```", estimatedMinutes: 15 },
        { title: "Exceptions", slug: "java-exceptions", content: "# Exception Handling\n\n```java\ntry {\n    int result = 10 / 0;\n} catch (ArithmeticException e) {\n    System.out.println(\"Cannot divide by zero!\");\n} finally {\n    System.out.println(\"Always runs\");\n}\n```\n\n## Custom Exceptions\n\n```java\npublic class InsufficientFundsException extends Exception {\n    public InsufficientFundsException(String msg) {\n        super(msg);\n    }\n}\n```", estimatedMinutes: 20 },
      ],
    },
  ],
};

// ════════════════════════════════════════════════════════════
// JAVASCRIPT BASIC (20 lessons)
// ════════════════════════════════════════════════════════════

export const javascriptBasic: CourseContent = {
  slug: "javascript-basic",
  modules: [
    {
      title: "JavaScript Fundamentals",
      description: "Variables, data types, and basic operations",
      lessons: [
        { title: "Introduction to JavaScript", slug: "intro-js", content: "# Introduction\n\nJavaScript is the language of the web.\n\n## Variables\n\n```javascript\nlet name = \"Alice\";   // Can reassign\nconst age = 25;       // Cannot reassign\n```\n\n## Data Types\n\n```javascript\nlet str = \"Hello\";\nlet num = 42;\nlet dec = 3.14;\nlet bool = true;\nlet nothing = null;\nlet empty = undefined;\nlet arr = [1, 2, 3];\nlet obj = { name: \"Bob\" };\n```\n\n## Template Literals\n\n```javascript\nconsole.log(`Hello, ${name}!`);\n```", estimatedMinutes: 15, exercises: [{ title: "Hello JS", description: "Create variables and print with template literals", requirements: ["Use let/const", "Use template literals"], points: 10 }] },
        { title: "Operators", slug: "js-operators", content: "# Operators\n\n## Arithmetic\n\n```javascript\n10 + 3   // 13\n10 - 3   // 7\n10 * 3   // 30\n10 / 3   // 3.333\n10 % 3   // 1\n2 ** 3   // 8\n```\n\n## Comparison\n\n```javascript\n5 == \"5\"   // true (loose)\n5 === \"5\"  // false (strict)\n5 !== \"5\"  // true\n```\n\n> Always use `===` and `!==`", estimatedMinutes: 15 },
        { title: "Strings", slug: "js-strings", content: "# Strings\n\n```javascript\nlet s = \"Hello World\";\ns.length          // 11\ns.toUpperCase()   // \"HELLO WORLD\"\ns.toLowerCase()   // \"hello world\"\ns.includes(\"World\") // true\ns.slice(0, 5)     // \"Hello\"\ns.split(\" \")      // [\"Hello\", \"World\"]\ns.replace(\"World\", \"JS\") // \"Hello JS\"\n```\n\n## Template Literals\n\n```javascript\nlet name = \"Alice\";\nlet age = 25;\nconsole.log(`${name} is ${age} years old`);\n\n// Multi-line\nlet html = `\n  <div>\n    <h1>${name}</h1>\n  </div>\n`;\n```", estimatedMinutes: 15 },
      ],
    },
    {
      title: "Control Flow",
      description: "Conditions and loops",
      lessons: [
        { title: "If-Else", slug: "js-if-else", content: "# If-Else\n\n```javascript\nlet score = 85;\nif (score >= 90) {\n    console.log(\"A\");\n} else if (score >= 80) {\n    console.log(\"B\");\n} else {\n    console.log(\"C\");\n}\n```\n\n## Ternary\n\n```javascript\nlet age = 20;\nlet status = age >= 18 ? \"Adult\" : \"Minor\";\n```\n\n## Nullish Coalescing\n\n```javascript\nlet value = null ?? \"default\"; // \"default\"\nlet value2 = 0 ?? \"default\";   // 0\n```", estimatedMinutes: 15 },
        { title: "Loops", slug: "js-loops", content: "# Loops\n\n## for loop\n\n```javascript\nfor (let i = 0; i < 5; i++) {\n    console.log(i);\n}\n```\n\n## while loop\n\n```javascript\nlet i = 0;\nwhile (i < 5) {\n    console.log(i);\n    i++;\n}\n```\n\n## for...of (arrays)\n\n```javascript\nfor (const num of [1, 2, 3]) {\n    console.log(num);\n}\n```\n\n## for...in (objects)\n\n```javascript\nconst obj = { a: 1, b: 2 };\nfor (const key in obj) {\n    console.log(key, obj[key]);\n}\n```", estimatedMinutes: 20, exercises: [{ title: "FizzBuzz JS", description: "FizzBuzz from 1-100 in JavaScript", requirements: ["Use for loop", "Handle Fizz, Buzz, FizzBuzz"], points: 15 }] },
      ],
    },
    {
      title: "Functions",
      description: "Writing reusable code",
      lessons: [
        { title: "Function Declarations", slug: "js-function-declarations", content: "# Function Declarations\n\n```javascript\nfunction greet(name) {\n    return `Hello, ${name}!`;\n}\n\nconsole.log(greet(\"Alice\"));\n```\n\n## Default Parameters\n\n```javascript\nfunction greet(name = \"World\") {\n    return `Hello, ${name}!`;\n}\n\ngreet();        // \"Hello, World!\"\ngreet(\"Alice\"); // \"Hello, Alice!\"\n```\n\n## Rest Parameters\n\n```javascript\nfunction sum(...nums) {\n    return nums.reduce((a, b) => a + b, 0);\n}\nsum(1, 2, 3, 4); // 10\n```", estimatedMinutes: 20 },
        { title: "Arrow Functions", slug: "js-arrow-functions", content: "# Arrow Functions\n\n```javascript\n// Full syntax\nconst add = (a, b) => {\n    return a + b;\n};\n\n// Concise (single expression)\nconst multiply = (a, b) => a * b;\n\n// Single param (no parens)\nconst square = x => x * x;\n\n// No params\nconst sayHi = () => \"Hi!\";\n```\n\n## Arrow vs Regular Functions\n\n- Arrow: no `this` binding\n- Arrow: shorter syntax\n- Regular: use for methods, constructors", estimatedMinutes: 20, exercises: [{ title: "Calculator Functions", description: "Create add, subtract, multiply, divide as arrow functions", requirements: ["4 functions", "Handle divide by zero", "Use arrow syntax"], points: 20 }] },
        { title: "Higher-Order Functions", slug: "js-hof", content: "# Higher-Order Functions\n\n```javascript\n// Function that takes a function\nfunction repeat(n, action) {\n    for (let i = 0; i < n; i++) {\n        action(i);\n    }\n}\n\nrepeat(3, i => console.log(i));\n```\n\n## Array Methods\n\n```javascript\nconst nums = [1, 2, 3, 4, 5];\n\n// map\nconst doubled = nums.map(n => n * 2);\n\n// filter\nconst evens = nums.filter(n => n % 2 === 0);\n\n// reduce\nconst sum = nums.reduce((acc, n) => acc + n, 0);\n\n// find\nconst first = nums.find(n => n > 3);\n\n// some / every\nnums.some(n => n > 3);   // true\nevery(n => n > 0);      // true\n```", estimatedMinutes: 25 },
      ],
    },
    {
      title: "Arrays and Objects",
      description: "Working with data structures",
      lessons: [
        { title: "Arrays", slug: "js-arrays", content: "# Arrays\n\n```javascript\nlet arr = [1, 2, 3, 4, 5];\n\narr.push(6);       // Add to end\narr.pop();         // Remove from end\narr.unshift(0);    // Add to start\narr.shift();       // Remove from start\narr.includes(3);   // true\narr.indexOf(3);    // 2\narr.slice(1, 3);   // [2, 3]\narr.splice(1, 1);  // Remove at index 1\narr.reverse();     // Reverse in place\narr.sort();        // Sort in place\narr.join(\", \");    // \"1, 2, 3\"\narr.flat();        // Flatten nested arrays\n```", estimatedMinutes: 20 },
        { title: "Objects", slug: "js-objects", content: "# Objects\n\n```javascript\nconst person = {\n    name: \"Alice\",\n    age: 25,\n    greet() {\n        return `Hi, I'm ${this.name}`;\n    }\n};\n\n// Access\nperson.name;           // \"Alice\"\nperson[\"age\"];         // 25\n\n// Add/modify\nperson.email = \"a@b.com\";\n\n// Destructuring\nconst { name, age } = person;\n\n// Spread\nconst copy = { ...person, age: 26 };\n\n// Object.keys / values / entries\nObject.keys(person);    // [\"name\", \"age\", \"greet\"]\nObject.values(person);  // [\"Alice\", 25, f]\nObject.entries(person); // [[\"name\", \"Alice\"], ...]\n```", estimatedMinutes: 20 },
        { title: "Destructuring", slug: "js-destructuring", content: "# Destructuring\n\n## Array Destructuring\n\n```javascript\nconst [a, b, ...rest] = [1, 2, 3, 4, 5];\n// a=1, b=2, rest=[3,4,5]\n\nconst [, second] = [1, 2, 3];\n// second = 2\n```\n\n## Object Destructuring\n\n```javascript\nconst { name, age, city = \"Unknown\" } = person;\n\n// Rename\nconst { name: userName } = person;\n```\n\n## Function Parameter Destructuring\n\n```javascript\nfunction greet({ name, age }) {\n    return `${name} is ${age}`;\n}\n\ngreet({ name: \"Alice\", age: 25 });\n```", estimatedMinutes: 15 },
      ],
    },
    {
      title: "DOM Manipulation",
      description: "Working with the browser",
      lessons: [
        { title: "Selecting Elements", slug: "js-dom-select", content: "# DOM Selection\n\n```javascript\ndocument.getElementById(\"app\");\ndocument.querySelector(\".container\");\ndocument.querySelectorAll(\".item\");\n\nconst el = document.querySelector(\"#myId\");\nel.textContent = \"New text\";\nel.innerHTML = \"<b>Bold</b>\";\nel.style.color = \"red\";\nel.classList.add(\"active\");\nel.classList.toggle(\"visible\");\n```", estimatedMinutes: 15 },
        { title: "Events", slug: "js-events", content: "# Events\n\n```javascript\nconst btn = document.querySelector(\"button\");\n\nbtn.addEventListener(\"click\", (e) => {\n    console.log(\"Clicked!\", e.target);\n});\n\n// Common Events\nclick, input, submit, keydown, keyup\nfocus, blur, scroll, resize, load\n```\n\n## Form Handling\n\n```javascript\ndocument.querySelector(\"form\")\n  .addEventListener(\"submit\", (e) => {\n    e.preventDefault();\n    const data = new FormData(e.target);\n    console.log(data.get(\"email\"));\n});\n```", estimatedMinutes: 20 },
        { title: "Creating Elements", slug: "js-dom-create", content: "# Creating Elements\n\n```javascript\n// Create\ncolor: div = document.createElement(\"div\");\ndiv.textContent = \"Hello\";\ndiv.classList.add(\"card\");\n\n// Append\ndocument.body.appendChild(div);\n\n// Template\ndocument.querySelector(\"#list\")\n  .insertAdjacentHTML(\"beforeend\",\n    `<li>${item}</li>`\n  );\n\n// Remove\ndiv.remove();\n```", estimatedMinutes: 15 },
      ],
    },
    {
      title: "Async JavaScript",
      description: "Promises and async/await",
      lessons: [
        { title: "Promises", slug: "js-promises", content: "# Promises\n\n```javascript\nconst promise = new Promise((resolve, reject) => {\n    setTimeout(() => resolve(\"Done!\"), 1000);\n});\n\npromise.then(msg => console.log(msg));\npromise.catch(err => console.error(err));\npromise.finally(() => console.log(\"Done\"));\n\n// Chaining\nfetch(url)\n  .then(res => res.json())\n  .then(data => console.log(data))\n  .catch(err => console.error(err));\n```", estimatedMinutes: 20 },
        { title: "Async/Await", slug: "js-async-await", content: "# Async/Await\n\n```javascript\nasync function fetchData() {\n    try {\n        const res = await fetch(\"/api/data\");\n        const data = await res.json();\n        return data;\n    } catch (err) {\n        console.error(err);\n    }\n}\n\nconst data = await fetchData();\n```\n\n## Parallel Requests\n\n```javascript\nconst [users, posts] = await Promise.all([\n    fetch(\"/api/users\").then(r => r.json()),\n    fetch(\"/api/posts\").then(r => r.json()),\n]);\n```", estimatedMinutes: 25, exercises: [{ title: "Fetch API", description: "Fetch data from a public API and display it", requirements: ["Use fetch", "Handle errors", "Display data"], points: 20 }] },
      ],
    },
  ],
};

// ════════════════════════════════════════════════════════════
// REACT BASIC (20 lessons)
// ════════════════════════════════════════════════════════════

export const reactBasic: CourseContent = {
  slug: "react-basic",
  modules: [
    {
      title: "React Fundamentals",
      description: "Components, JSX, and props",
      lessons: [
        { title: "Introduction to React", slug: "intro-react", content: "# Introduction to React\n\nReact is a JavaScript library for building UIs.\n\n## Core Concepts\n- Components: Reusable UI pieces\n- JSX: HTML-like syntax\n- Virtual DOM: Efficient updates\n\n## Your First Component\n\n```jsx\nfunction App() {\n    return (\n        <div>\n            <h1>Hello, React!</h1>\n        </div>\n    );\n}\n\nexport default App;\n```", estimatedMinutes: 15, exercises: [{ title: "First Component", description: "Create a Profile component", requirements: ["Function component", "JSX", "Export"], points: 15 }] },
        { title: "JSX Rules", slug: "jsx-rules", content: "# JSX Rules\n\n```jsx\n// Return one root element\nfunction App() {\n    return (\n        <div>\n            <h1>Title</h1>\n            <p>Text</p>\n        </div>\n    );\n}\n\n// Use className, not class\n<div className=\"container\">\n\n// Close self-closing tags\n<img src=\"photo.jpg\" />\n<br />\n\n// JavaScript in {}\nconst name = \"Alice\";\n<h1>Hello, {name}</h1>\n\n// Conditional rendering\n{isLoggedIn && <p>Welcome!</p>}\n{isAdmin ? <Admin /> : <User />}\n```", estimatedMinutes: 15 },
        { title: "Props", slug: "react-props", content: "# Props\n\n```jsx\nfunction UserCard({ name, email, avatar }) {\n    return (\n        <div className=\"card\">\n            <img src={avatar} alt={name} />\n            <h2>{name}</h2>\n            <p>{email}</p>\n        </div>\n    );\n}\n\n// Usage\n<UserCard name=\"Alice\" email=\"a@b.com\" avatar=\"/img.jpg\" />\n```\n\n## Default Props\n\n```jsx\nfunction Button({ text = \"Click Me\", color = \"blue\" }) {\n    return <button style={{ color }}>{text}</button>;\n}\n```\n\n## Children\n\n```jsx\nfunction Card({ title, children }) {\n    return <div><h2>{title}</h2>{children}</div>;\n}\n```", estimatedMinutes: 20 },
      ],
    },
    {
      title: "State and Events",
      description: "Managing state and user interactions",
      lessons: [
        { title: "useState Hook", slug: "usestate", content: "# useState\n\n```jsx\nimport { useState } from 'react';\n\nfunction Counter() {\n    const [count, setCount] = useState(0);\n\n    return (\n        <div>\n            <p>Count: {count}</p>\n            <button onClick={() => setCount(count + 1)}>+</button>\n            <button onClick={() => setCount(c => c - 1)}>-</button>\n        </div>\n    );\n}\n```\n\n## Functional Updates\n\n```jsx\nsetCount(prev => prev + 1);  // Correct\nsetCount(count + 1);         // May have bugs\n```", estimatedMinutes: 25, exercises: [{ title: "Todo List", description: "Create a todo list with add, toggle, delete", requirements: ["useState", "Add items", "Toggle complete", "Delete"], points: 25 }] },
        { title: "Handling Events", slug: "react-events", content: "# Events\n\n```jsx\nfunction Form() {\n    const handleSubmit = (e) => {\n        e.preventDefault();\n        console.log(\"Submitted!\");\n    };\n\n    return (\n        <form onSubmit={handleSubmit}>\n            <input type=\"text\" required />\n            <button type=\"submit\">Submit</button>\n        </form>\n    );\n}\n```\n\n## Passing Arguments\n\n```jsx\n<TodoItem onDelete={(id) => handleDelete(id)} />\n```", estimatedMinutes: 20 },
        { title: "Multiple State", slug: "react-multiple-state", content: "# Multiple State\n\n```jsx\nfunction Form() {\n    const [name, setName] = useState(\"\");\n    const [email, setEmail] = useState(\"\");\n    const [errors, setErrors] = useState({});\n\n    return (\n        <form>\n            <input value={name}\n                   onChange={e => setName(e.target.value)} />\n            <input value={email}\n                   onChange={e => setEmail(e.target.value)} />\n        </form>\n    );\n}\n```", estimatedMinutes: 15 },
      ],
    },
    {
      title: "Side Effects and Data Fetching",
      description: "useEffect and API calls",
      lessons: [
        { title: "useEffect Hook", slug: "useeffect", content: "# useEffect\n\n```jsx\nimport { useEffect, useState } from 'react';\n\nfunction Timer() {\n    const [seconds, setSeconds] = useState(0);\n\n    useEffect(() => {\n        const interval = setInterval(() => {\n            setSeconds(s => s + 1);\n        }, 1000);\n\n        return () => clearInterval(interval); // Cleanup\n    }, []); // Empty = run once\n\n    return <p>{seconds}s</p>;\n}\n```\n\n## Dependencies\n\n```jsx\nuseEffect(() => {\n    fetchData(id);\n}, [id]); // Re-run when id changes\n```", estimatedMinutes: 25 },
        { title: "Data Fetching", slug: "react-fetching", content: "# Data Fetching\n\n```jsx\nfunction UserList() {\n    const [users, setUsers] = useState([]);\n    const [loading, setLoading] = useState(true);\n    const [error, setError] = useState(null);\n\n    useEffect(() => {\n        fetch(\"/api/users\")\n            .then(res => res.json())\n            .then(setUsers)\n            .catch(setError)\n            .finally(() => setLoading(false));\n    }, []);\n\n    if (loading) return <p>Loading...</p>;\n    if (error) return <p>Error!</p>;\n\n    return users.map(u => <p key={u.id}>{u.name}</p>);\n}\n```", estimatedMinutes: 20 },
      ],
    },
    {
      title: "Lists and Forms",
      description: "Rendering lists and handling forms",
      lessons: [
        { title: "Rendering Lists", slug: "react-lists", content: "# Lists\n\n```jsx\nfunction TodoList({ todos }) {\n    return (\n        <ul>\n            {todos.map(todo => (\n                <li key={todo.id}>{todo.text}</li>\n            ))}\n        </ul>\n    );\n}\n```\n\n## Keys\n\n- Use unique, stable IDs\n- Never use array index as key\n- Keys help React identify changes\n\n## Conditional List Items\n\n```jsx\n{todos.map(todo => (\n    <li key={todo.id} className={todo.done ? \"done\" : \"\"}>\n        {todo.text}\n    </li>\n))}\n```", estimatedMinutes: 15 },
        { title: "Forms in React", slug: "react-forms", content: "# Forms\n\n## Controlled Components\n\n```jsx\nfunction LoginForm() {\n    const [email, setEmail] = useState(\"\");\n    const [password, setPassword] = useState(\"\");\n\n    const handleSubmit = (e) => {\n        e.preventDefault();\n        login(email, password);\n    };\n\n    return (\n        <form onSubmit={handleSubmit}>\n            <input type=\"email\" value={email}\n                   onChange={e => setEmail(e.target.value)} />\n            <input type=\"password\" value={password}\n                   onChange={e => setPassword(e.target.value)} />\n            <button>Login</button>\n        </form>\n    );\n}\n```\n\n## Select & Checkbox\n\n```jsx\n<select value={selected} onChange={e => setSelected(e.target.value)}>\n    <option value=\"a\">A</option>\n</select>\n```", estimatedMinutes: 20 },
      ],
    },
    {
      title: "Routing and Hooks",
      description: "React Router and custom hooks",
      lessons: [
        { title: "React Router", slug: "react-router", content: "# React Router\n\n```jsx\nimport { BrowserRouter, Routes, Route, Link } from 'react-router-dom';\n\nfunction App() {\n    return (\n        <BrowserRouter>\n            <nav>\n                <Link to=\"/\">Home</Link>\n                <Link to=\"/about\">About</Link>\n            </nav>\n            <Routes>\n                <Route path=\"/\" element={<Home />} />\n                <Route path=\"/about\" element={<About />} />\n                <Route path=\"/users/:id\" element={<User />} />\n            </Routes>\n        </BrowserRouter>\n    );\n}\n\n// Access params\nfunction User() {\n    const { id } = useParams();\n}\n```", estimatedMinutes: 20 },
        { title: "Custom Hooks", slug: "custom-hooks", content: "# Custom Hooks\n\n```jsx\nfunction useLocalStorage(key, initial) {\n    const [value, setValue] = useState(() => {\n        const saved = localStorage.getItem(key);\n        return saved ? JSON.parse(saved) : initial;\n    });\n\n    useEffect(() => {\n        localStorage.setItem(key, JSON.stringify(value));\n    }, [key, value]);\n\n    return [value, setValue];\n}\n\n// Usage\nconst [theme, setTheme] = useLocalStorage(\"theme\", \"dark\");\n```\n\n## Rules of Hooks\n1. Only call at top level\n2. Only call in React functions\n3. Custom hooks start with \"use\"", estimatedMinutes: 25 },
      ],
    },
  ],
};

// ════════════════════════════════════════════════════════════
// NEXT.JS BASIC (20 lessons)
// ════════════════════════════════════════════════════════════

export const nextjsBasic: CourseContent = {
  slug: "nextjs-basic",
  modules: [
    {
      title: "Next.js Fundamentals",
      description: "App Router, file-based routing, layouts",
      lessons: [
        { title: "Introduction to Next.js", slug: "intro-nextjs", content: "# Next.js\n\nReact framework for production.\n\n## Create App\n\n```bash\nnpx create-next-app@latest my-app\n```\n\n## App Router\n\n```\napp/\n  page.tsx        → /\n  about/page.tsx  → /about\n  blog/page.tsx   → /blog\n```\n\n## Server vs Client Components\n\n```tsx\n// Server (default)\nasync function Page() {\n    const data = await fetchData();\n    return <div>{data}</div>;\n}\n\n// Client\n'use client';\nfunction Counter() {\n    const [count, setCount] = useState(0);\n    return <button onClick={() => setCount(c+1)}>{count}</button>;\n}\n```", estimatedMinutes: 20 },
        { title: "Routing", slug: "nextjs-routing", content: "# Routing\n\n## Pages\n\n```tsx\n// app/page.tsx → /\n// app/about/page.tsx → /about\n// app/blog/[slug]/page.tsx → /blog/:slug\n```\n\n## Dynamic Routes\n\n```tsx\n// app/courses/[id]/page.tsx\nexport default async function CoursePage({ params }) {\n    const { id } = await params;\n    const course = await getCourse(id);\n    return <h1>{course.title}</h1>;\n}\n```\n\n## Navigation\n\n```tsx\nimport Link from 'next/link';\n\n<Link href=\"/about\">About</Link>\n```\n\n## Layouts\n\n```tsx\n// app/layout.tsx (wraps all pages)\nexport default function RootLayout({ children }) {\n    return <html><body>{children}</body></html>;\n}\n```", estimatedMinutes: 25 },
        { title: "Data Fetching", slug: "nextjs-data-fetching", content: "# Data Fetching\n\n## Server Components\n\n```tsx\nasync function Page() {\n    const res = await fetch('https://api.example.com/data');\n    const data = await res.json();\n    return <div>{data.title}</div>;\n}\n```\n\n## Route Handlers (API)\n\n```ts\n// app/api/users/route.ts\nimport { NextResponse } from 'next/server';\n\nexport async function GET() {\n    const users = await db.user.findMany();\n    return NextResponse.json(users);\n}\n\nexport async function POST(request) {\n    const body = await request.json();\n    const user = await db.user.create({ data: body });\n    return NextResponse.json(user, { status: 201 });\n}\n```", estimatedMinutes: 25 },
        { title: "Server Actions", slug: "nextjs-server-actions", content: "# Server Actions\n\n```tsx\n'use client';\n\nimport { useActionState } from 'react';\nimport { createUser } from './actions';\n\nfunction Form() {\n    const [state, formAction] = useActionState(createUser, null);\n\n    return (\n        <form action={formAction}>\n            <input name=\"email\" type=\"email\" />\n            <button type=\"submit\">Create</button>\n            {state?.error && <p>{state.error}</p>}\n        </form>\n    );\n}\n```\n\n```ts\n// actions.ts\n'use server';\nexport async function createUser(prev, formData) {\n    const email = formData.get('email');\n    // validate and create user\n}\n```", estimatedMinutes: 25 },
      ],
    },
    {
      title: "Styling and UI",
      description: "CSS, Tailwind, and component libraries",
      lessons: [
        { title: "Tailwind CSS in Next.js", slug: "nextjs-tailwind", content: "# Tailwind CSS\n\n```tsx\nfunction Card() {\n    return (\n        <div className=\"bg-white rounded-xl p-6 shadow-lg\">\n            <h2 className=\"text-xl font-bold\">Title</h2>\n            <p className=\"text-gray-600\">Description</p>\n            <button className=\"bg-blue-500 text-white px-4 py-2 rounded\">\n                Click\n            </button>\n        </div>\n    );\n}\n```", estimatedMinutes: 15 },
        { title: "Responsive Design", slug: "nextjs-responsive", content: "# Responsive Design\n\n```tsx\nfunction Layout() {\n    return (\n        <div className=\"grid grid-cols-1 md:grid-cols-3 gap-4\">\n            <div className=\"col-span-1 md:col-span-2\">Main</div>\n            <div className=\"hidden md:block\">Sidebar</div>\n        </div>\n    );\n}\n```\n\n## Mobile Nav\n\n```tsx\n<nav className=\"md:hidden\">\n    {/* Mobile menu */}\n</nav>\n<nav className=\"hidden md:flex\">\n    {/* Desktop nav */}\n</nav>\n```", estimatedMinutes: 15 },
        { title: "Dark Mode", slug: "nextjs-dark-mode", content: "# Dark Mode\n\n```tsx\n'use client';\nimport { useState, useEffect } from 'react';\n\nexport function ThemeToggle() {\n    const [dark, setDark] = useState(false);\n\n    useEffect(() => {\n        document.documentElement.classList.toggle('dark', dark);\n    }, [dark]);\n\n    return (\n        <button onClick={() => setDark(!dark)}>\n            {dark ? '☀️' : '🌙'}\n        </button>\n    );\n}\n```", estimatedMinutes: 15 },
      ],
    },
    {
      title: "Authentication",
      description: "Auth, middleware, protected routes",
      lessons: [
        { title: "Auth Setup", slug: "nextjs-auth", content: "# Authentication\n\n## Custom Auth with Cookies\n\n```ts\n// lib/auth.ts\nimport { cookies } from 'next/headers';\nimport { SignJWT, jwtVerify } from 'jose';\n\nexport async function createSession(userId: string) {\n    const token = await new SignJWT({ userId })\n        .setProtectedHeader({ alg: 'HS256' })\n        .setExpirationTime('1d')\n        .sign(secret);\n\n    const cookieStore = await cookies();\n    cookieStore.set('session', token, {\n        httpOnly: true,\n        secure: true,\n        maxAge: 86400,\n    });\n}\n```", estimatedMinutes: 25 },
        { title: "Middleware", slug: "nextjs-middleware", content: "# Middleware\n\n```ts\n// middleware.ts\nimport { NextResponse } from 'next/server';\n\nexport function middleware(request) {\n    const token = request.cookies.get('session')?.value;\n\n    const protectedPaths = ['/dashboard', '/profile'];\n    const isProtected = protectedPaths.some(p =>\n        request.nextUrl.pathname.startsWith(p)\n    );\n\n    if (isProtected && !token) {\n        return NextResponse.redirect(new URL('/login', request.url));\n    }\n\n    return NextResponse.next();\n}\n\nexport const config = {\n    matcher: ['/dashboard/:path*', '/profile/:path*'],\n};\n```", estimatedMinutes: 20 },
      ],
    },
    {
      title: "Database and ORM",
      description: "Prisma with Next.js",
      lessons: [
        { title: "Prisma Setup", slug: "nextjs-prisma", content: "# Prisma with Next.js\n\n```ts\n// lib/db.ts\nimport { PrismaClient } from '@prisma/client';\n\ndeclare global {\n    var prisma: PrismaClient | undefined;\n}\n\nexport const db = globalThis.prisma ?? new PrismaClient();\n\nif (process.env.NODE_ENV !== 'production') {\n    globalThis.prisma = db;\n}\n```\n\n## Usage in Server Components\n\n```tsx\nimport { db } from '@/lib/db';\n\nasync function CoursesPage() {\n    const courses = await db.course.findMany();\n    return courses.map(c => <CourseCard key={c.id} {...c} />);\n}\n```", estimatedMinutes: 20 },
        { title: "Server Actions with Prisma", slug: "nextjs-prisma-actions", content: "# Server Actions + Prisma\n\n```ts\n'use server';\nimport { db } from '@/lib/db';\nimport { getSessionUser } from '@/lib/auth';\n\nexport async function createNote(formData: FormData) {\n    const user = await getSessionUser();\n    if (!user) throw new Error('Unauthorized');\n\n    const content = formData.get('content') as string;\n\n    return db.note.create({\n        data: {\n            userId: user.id,\n            content,\n            lessonId: formData.get('lessonId') as string,\n        },\n    });\n}\n```\n\n## Key Rules\n- Always validate on server\n- Use authenticated session, not client userId\n- Handle errors gracefully", estimatedMinutes: 25 },
      ],
    },
  ],
};

// ════════════════════════════════════════════════════════════
// NODE.JS BASIC (20 lessons)
// ════════════════════════════════════════════════════════════

export const nodejsBasic: CourseContent = {
  slug: "nodejs-basic",
  modules: [
    {
      title: "Node.js Fundamentals",
      description: "Runtime, modules, and core APIs",
      lessons: [
        { title: "Introduction to Node.js", slug: "intro-node", content: "# Node.js\n\nJavaScript runtime built on V8.\n\n## First Server\n\n```javascript\nconst http = require('http');\n\nconst server = http.createServer((req, res) => {\n    res.writeHead(200, { 'Content-Type': 'text/plain' });\n    res.end('Hello from Node.js!');\n});\n\nserver.listen(3000, () => console.log('Running on port 3000'));\n```\n\n## Module Systems\n\n```javascript\n// CommonJS\nconst fs = require('fs');\n\n// ES Modules\nimport fs from 'fs';\n```", estimatedMinutes: 15, exercises: [{ title: "Hello Server", description: "Create HTTP server responding with Hello World", requirements: ["Use http module", "Listen port 3000"], points: 15 }] },
        { title: "File System", slug: "node-fs", content: "# File System\n\n```javascript\nconst fs = require('fs').promises;\n\n// Read\nconst data = await fs.readFile('file.txt', 'utf-8');\n\n// Write\nawait fs.writeFile('output.txt', 'Hello');\nawait fs.appendFile('log.txt', 'Entry\\n');\n\n// Directories\nawait fs.mkdir('uploads', { recursive: true });\nconst files = await fs.readdir('.');\n\n// JSON\nawait fs.writeFile('data.json', JSON.stringify(obj, null, 2));\nconst parsed = JSON.parse(await fs.readFile('data.json', 'utf-8'));\n```", estimatedMinutes: 20 },
        { title: "Path Module", slug: "node-path", content: "# Path Module\n\n```javascript\nconst path = require('path');\n\npath.join(__dirname, 'files', 'data.txt');\npath.extname('file.tar.gz');  // '.gz'\npath.basename('/home/user/file.txt');  // 'file.txt'\npath.resolve('..');  // absolute path\npath.parse('/home/user/file.txt');\n// { root: '/', dir: '/home/user', base: 'file.txt', ext: '.txt', name: 'file' }\n```", estimatedMinutes: 10 },
      ],
    },
    {
      title: "Express.js",
      description: "Web framework for building APIs",
      lessons: [
        { title: "Express Basics", slug: "express-basics", content: "# Express.js\n\n```bash\nnpm install express\n```\n\n```javascript\nconst express = require('express');\nconst app = express();\n\napp.use(express.json());\n\napp.get('/', (req, res) => {\n    res.json({ message: 'Hello Express!' });\n});\n\napp.listen(3000);\n```", estimatedMinutes: 20 },
        { title: "Routing", slug: "express-routing", content: "# Express Routing\n\n```javascript\napp.get('/users', (req, res) => res.json(users));\napp.get('/users/:id', (req, res) => {\n    const user = users.find(u => u.id === req.params.id);\n    if (!user) return res.status(404).json({ error: 'Not found' });\n    res.json(user);\n});\napp.post('/users', (req, res) => {\n    const user = { id: Date.now(), ...req.body };\n    users.push(user);\n    res.status(201).json(user);\n});\napp.put('/users/:id', (req, res) => { /* update */ });\napp.delete('/users/:id', (req, res) => { /* delete */ });\n```\n\n## Router\n\n```javascript\nconst router = express.Router();\nrouter.get('/', listUsers);\nrouter.get('/:id', getUser);\napp.use('/api/users', router);\n```", estimatedMinutes: 25 },
        { title: "Middleware", slug: "express-middleware", content: "# Middleware\n\n```javascript\n// Built-in\napp.use(express.json());\napp.use(express.urlencoded({ extended: true }));\n\n// Custom\napp.use((req, res, next) => {\n    console.log(`${req.method} ${req.path}`);\n    next();\n});\n\n// Auth middleware\nfunction auth(req, res, next) {\n    const token = req.headers.authorization;\n    if (!token) return res.status(401).json({ error: 'Unauthorized' });\n    req.user = verifyToken(token);\n    next();\n}\n\napp.get('/profile', auth, (req, res) => {\n    res.json(req.user);\n});\n```", estimatedMinutes: 20 },
      ],
    },
    {
      title: "Database Integration",
      description: "Working with databases",
      lessons: [
        { title: "Prisma with Node.js", slug: "node-prisma", content: "# Prisma ORM\n\n```bash\nnpm install prisma @prisma/client\nnpx prisma init\n```\n\n```javascript\n// prisma/schema.prisma\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\nmodel User {\n  id    String @id @default(uuid())\n  name  String\n  email String @unique\n}\n```\n\n```javascript\nimport { PrismaClient } from '@prisma/client';\nconst prisma = new PrismaClient();\n\nconst user = await prisma.user.create({\n    data: { name: 'Alice', email: 'alice@test.com' }\n});\n\nconst users = await prisma.user.findMany();\n```", estimatedMinutes: 25 },
        { title: "CRUD Operations", slug: "node-crud", content: "# CRUD Operations\n\n```javascript\n// Create\nconst user = await prisma.user.create({ data: { name, email } });\n\n// Read\nconst user = await prisma.user.findUnique({ where: { id } });\nconst users = await prisma.user.findMany({ where: { role: 'ADMIN' } });\n\n// Update\nconst updated = await prisma.user.update({\n    where: { id },\n    data: { name: 'New Name' }\n});\n\n// Delete\nawait prisma.user.delete({ where: { id } });\n\n// Relations\nconst userWithPosts = await prisma.user.findUnique({\n    where: { id },\n    include: { posts: true }\n});\n```", estimatedMinutes: 20 },
      ],
    },
    {
      title: "REST API Best Practices",
      description: "Building production APIs",
      lessons: [
        { title: "API Structure", slug: "api-structure", content: "# API Structure\n\n```\napi/\n  routes/\n    users.js\n    courses.js\n    lessons.js\n  middleware/\n    auth.js\n    validate.js\n  utils/\n    response.js\n  index.js\n```\n\n## Response Format\n\n```javascript\n// Success\nres.json({ success: true, data: users });\n\n// Error\nres.status(404).json({ success: false, error: 'Not found' });\n\n// Paginated\nres.json({\n    data: users,\n    pagination: { page: 1, limit: 10, total: 100 }\n});\n```", estimatedMinutes: 15 },
        { title: "Error Handling", slug: "api-error-handling", content: "# Error Handling\n\n```javascript\n// Async wrapper\nconst asyncHandler = (fn) => (req, res, next) => {\n    Promise.resolve(fn(req, res, next)).catch(next);\n};\n\napp.get('/users', asyncHandler(async (req, res) => {\n    const users = await prisma.user.findMany();\n    res.json(users);\n}));\n\n// Global error handler\napp.use((err, req, res, next) => {\n    console.error(err.stack);\n    res.status(err.status || 500).json({\n        error: err.message || 'Internal Server Error'\n    });\n});\n```", estimatedMinutes: 20 },
      ],
    },
  ],
};

// ════════════════════════════════════════════════════════════
// REMAINING LANGUAGES (20 lessons each)
// ════════════════════════════════════════════════════════════

function makeLang(slug: string, title: string, icon: string, content: string): CourseContent {
  const sections = content.split("---SECTION---").map(s => s.trim());
  const modules: ModuleContent[] = [];
  
  for (const section of sections) {
    const lines = section.split("\n");
    const moduleTitle = lines[0].replace(/^##\s*/, "");
    const moduleDesc = lines[1] || "";
    const lessons: LessonContent[] = [];
    
    let currentLesson: Partial<LessonContent> | null = null;
    
    for (let i = 2; i < lines.length; i++) {
      const line = lines[i];
      if (line.startsWith("### ")) {
        if (currentLesson?.title) lessons.push(currentLesson as LessonContent);
        currentLesson = {
          title: line.slice(4),
          slug: line.slice(4).toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          content: "",
          estimatedMinutes: 15,
        };
      } else if (currentLesson) {
        currentLesson.content = (currentLesson.content || "") + line + "\n";
      }
    }
    if (currentLesson?.title) lessons.push(currentLesson as LessonContent);
    
    if (lessons.length > 0) {
      modules.push({ title: moduleTitle, description: moduleDesc, lessons });
    }
  }
  
  return { slug, modules };
}

export const goBasic: CourseContent = makeLang("go-basic", "Go Programming — Basic", "🐹", `## Go Fundamentals
### Introduction to Go
# Introduction to Go

Go (Golang) is a compiled, statically-typed language by Google.

## Your First Program

\`\`\`go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
\`\`\`

## Key Features
- Fast compilation
- Built-in concurrency (goroutines)
- Strong typing
- Garbage collected
- Great for APIs and microservices

### Variables and Types
# Variables and Types

\`\`\`go
// Variable declaration
var name string = "Alice"
age := 25  // short declaration
const Pi = 3.14

// Basic types
var i int = 42
var f float64 = 3.14
var b bool = true
var s string = "hello"
var c byte = 'A'

// Arrays and Slices
arr := [5]int{1, 2, 3, 4, 5}
slice := []int{1, 2, 3}
\`\`\`

### Functions
# Functions

\`\`\`go
func greet(name string) string {
    return "Hello, " + name
}

// Multiple return values
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("division by zero")
    }
    return a / b, nil
}

// Named return values
func split(sum int) (x, y int) {
    x = sum * 4 / 9
    y = sum - x
    return  // naked return
}
\`\`\`

### Control Flow
# Control Flow

\`\`\`go
// if
if age >= 18 {
    fmt.Println("Adult")
} else {
    fmt.Println("Minor")
}

// for (Go only has for)
for i := 0; i < 5; i++ {
    fmt.Println(i)
}

// while-style
for condition {
    // loop
}

// range
for i, v := range slice {
    fmt.Println(i, v)
}

// switch
switch day {
case "Monday":
    fmt.Println("Start")
case "Friday":
    fmt.Println("TGIF")
default:
    fmt.Println("Regular")
}
\`\`\`

### Structs and Methods
# Structs and Methods

\`\`\`go
type Person struct {
    Name string
    Age  int
}

// Method
func (p Person) Greet() string {
    return "Hi, I'm " + p.Name
}

// Pointer receiver (can modify)
func (p *Person) SetAge(age int) {
    p.Age = age
}

// Usage
p := Person{Name: "Alice", Age: 25}
fmt.Println(p.Greet())
\`\`\`

### Interfaces
# Interfaces

\`\`\`go
type Writer interface {
    Write([]byte) (int, error)
}

// Go interfaces are implicit
type ConsoleWriter struct{}

func (cw ConsoleWriter) Write(data []byte) (int, error) {
    fmt.Print(string(data))
    return len(data), nil
}
\`\`\`

### Goroutines and Channels
# Goroutines and Channels

\`\`\`go
// Goroutine
go func() {
    fmt.Println("Running in background")
}()

// Channel
ch := make(chan string)

go func() {
    ch <- "Hello from goroutine"
}()

msg := <-ch
fmt.Println(msg)

// Buffered channel
buf := make(chan int, 10)
buf <- 42

// Select
select {
case msg := <-ch1:
    fmt.Println(msg)
case msg := <-ch2:
    fmt.Println(msg)
default:
    fmt.Println("No message")
}
\`\`\`

### Error Handling
# Error Handling

\`\`\`go
result, err := divide(10, 0)
if err != nil {
    fmt.Println("Error:", err)
    return
}
fmt.Println(result)

// Custom errors
func validate(age int) error {
    if age < 0 {
        return fmt.Errorf("invalid age: %d", age)
    }
    return nil
}
\`\`\`

### Maps
# Maps

\`\`\`go
m := make(map[string]int)
m["alice"] = 25
m["bob"] = 30

// Delete
delete(m, "bob")

// Check existence
val, ok := m["alice"]
if ok {
    fmt.Println(val)
}

// Iterate
for k, v := range m {
    fmt.Println(k, v)
}
\`\`\`

### Packages and Modules
# Packages and Modules

\`\`\`go
// go.mod
module myapp

go 1.21

require (
    github.com/gin-gonic/gin v1.9.0
)

// Import
import (
    "fmt"
    "myapp/utils"
    "github.com/gin-gonic/gin"
)
\`\`\`

### Building REST APIs
# Building REST APIs

\`\`\`go
package main

import "github.com/gin-gonic/gin"

func main() {
    r := gin.Default()

    r.GET("/users", func(c *gin.Context) {
        c.JSON(200, gin.H{"users": []string{"Alice", "Bob"}})
    })

    r.POST("/users", func(c *gin.Context) {
        var user User
        if err := c.ShouldBindJSON(&user); err != nil {
            c.JSON(400, gin.H{"error": err.Error()})
            return
        }
        c.JSON(201, user)
    })

    r.Run(":8080")
}
\`\`\`

### Testing
# Testing

\`\`\`go
// math_test.go
package math

import "testing"

func TestAdd(t *testing.T) {
    result := Add(2, 3)
    if result != 5 {
        t.Errorf("Add(2,3) = %d; want 5", result)
    }
}

func BenchmarkAdd(b *testing.B) {
    for i := 0; i < b.N; i++ {
        Add(2, 3)
    }
}
\`\`\`

Run: \`go test -v\`
`);

export const phpBasic: CourseContent = makeLang("php-basic", "PHP Programming — Basic", "🐘", `## PHP Fundamentals
### Introduction to PHP
# Introduction to PHP

PHP is a server-side scripting language for web development.

## Your First Script

\`\`\`php
<?php
echo "Hello, World!";
?>
\`\`\`

## Variables

\`\`\`php
<?php
$name = "Alice";    // String
$age = 25;           // Integer
$price = 9.99;       // Float
$active = true;      // Boolean
$items = [1, 2, 3];  // Array
?>
\`\`\`

### Strings and Arrays
# Strings and Arrays

\`\`\`php
<?php
// String interpolation
$name = "World";
echo "Hello, $name!";
echo "Hello, {$name}!";

// String functions
strlen("Hello");      // 5
strtolower("HELLO");  // "hello"
str_replace("a", "b", "apple");  // "bpple"

// Indexed array
$colors = ["red", "green", "blue"];
echo $colors[0];  // "red"

// Associative array
$person = ["name" => "Alice", "age" => 25];
echo $person["name"];

// Array functions
array_push($colors, "yellow");
count($colors);
array_map(function($c) { return strtoupper($c); }, $colors);
?>
\`\`\`

### Control Flow
# Control Flow

\`\`\`php
<?php
if ($score >= 90) {
    echo "A";
} elseif ($score >= 80) {
    echo "B";
} else {
    echo "C";
}

// Switch
switch ($day) {
    case "Monday":
        echo "Start";
        break;
    default:
        echo "Regular";
}

// Loops
for ($i = 0; $i < 5; $i++) { echo $i; }
foreach ($colors as $color) { echo $color; }
while ($x < 10) { $x++; }
?>
\`\`\`

### Functions
# Functions

\`\`\`php
<?php
function greet(string $name): string {
    return "Hello, $name!";
}

// Default params
function add(int $a, int $b = 0): int {
    return $a + $b;
}

// Variadic
function sum(int ...$numbers): int {
    return array_sum($numbers);
}

echo greet("Alice");
echo add(5);
echo sum(1, 2, 3, 4);
?>
\`\`\`

### OOP in PHP
# OOP in PHP

\`\`\`php
<?php
class Person {
    private string $name;
    private int $age;

    public function __construct(string $name, int $age) {
        $this->name = $name;
        $this->age = $age;
    }

    public function greet(): string {
        return "Hi, I'm {$this->name}";
    }

    // Getters
    public function getName(): string { return $this->name; }
}

class Student extends Person {
    private string $school;

    public function __construct(string $name, int $age, string $school) {
        parent::__construct($name, $age);
        $this->school = $school;
    }
}

$p = new Person("Alice", 25);
echo $p->greet();
?>
\`\`\`

### Error Handling
# Error Handling

\`\`\`php
<?php
try {
    $result = 10 / 0;
} catch (DivisionByZeroError $e) {
    echo "Error: " . $e->getMessage();
} finally {
    echo "Cleanup";
}

// Custom exceptions
class InvalidAgeException extends Exception {}
?>
\`\`\`

### File Handling
# File Handling

\`\`\`php
<?php
// Write
file_put_contents("data.txt", "Hello\\n");

// Read
$content = file_get_contents("data.txt");
$lines = file("data.txt", FILE_IGNORE_NEW_LINES);

// Append
file_put_contents("log.txt", "Entry\\n", FILE_APPEND);

// JSON
$data = ["name" => "Alice"];
file_put_contents("data.json", json_encode($data));
$loaded = json_decode(file_get_contents("data.json"), true);
?>
\`\`\`

### Forms and Superglobals
# Forms and Superglobals

\`\`\`php
<?php
// GET
$page = $_GET["page"] ?? 1;

// POST
$name = $_POST["name"] ?? "";

// Validate and sanitize
$email = filter_var($_POST["email"] ?? "", FILTER_VALIDATE_EMAIL);

// Sessions
session_start();
\$_SESSION["user"] = "Alice";
$user = \$_SESSION["user"] ?? null;
?>
\`\`\`

### MySQL with PHP
# MySQL with PHP

\`\`\`php
<?php
// PDO connection
$pdo = new PDO(
    "mysql:host=localhost;dbname=mydb",
    "root",
    "password"
);

// Query
$stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
$stmt->execute([$email]);
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Insert
$stmt = $pdo->prepare("INSERT INTO users (name, email) VALUES (?, ?)");
$stmt->execute([$name, $email]);
?>
\`\`\`

### Composer and Autoloading
# Composer

\`\`\`bash
composer init
composer require monolog/monolog
\`\`\`

\`\`\`php
<?php
require 'vendor/autoload.php';

use Monolog\\Logger;
use Monolog\\Handler\\StreamHandler;

$log = new Logger('app');
$log->pushHandler(new StreamHandler('app.log', Logger::WARNING));
$log->warning('Something happened');
?>
\`\`\`
`);

export const laravelBasic: CourseContent = makeLang("laravel-basic", "Laravel Framework — Basic", "🔺", `## Laravel Fundamentals
### Introduction to Laravel
# Introduction to Laravel

Laravel is a PHP web framework known for elegant syntax.

## Installation

\`\`\`bash
composer create-project laravel/laravel my-app
cd my-app
php artisan serve
\`\`\`

### Routing
# Routing

\`\`\`php
// routes/web.php
Route::get('/', function () { return view('welcome'); });
Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::put('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);

// Route groups
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);
});
\`\`\`

### Controllers
# Controllers

\`\`\`php
<?php
namespace App\\Http\\Controllers;

use App\\Models\\User;
use Illuminate\\Http\\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return view('users.index', compact('users'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
        ]);

        User::create($validated);
        return redirect()->route('users.index');
    }
}
\`\`\`

### Blade Templates
# Blade Templates

\`\`\`blade
{{-- resources/views/users/index.blade.php --}}
@extends('layouts.app')

@section('content')
    <h1>Users</h1>
    @foreach($users as $user)
        <div>{{ $user->name }}</div>
    @endforeach

    @if($users->isEmpty())
        <p>No users found</p>
    @endif

    {{-- Component --}}
    <x-button text="Click Me" />
@endsection
\`\`\`

### Eloquent ORM
# Eloquent ORM

\`\`\`php
// app/Models/User.php
class User extends Authenticatable
{
    protected $fillable = ['name', 'email', 'password'];

    public function posts() { return $this->hasMany(Post::class); }
    public function profile() { return $this->hasOne(Profile::class); }
}

// Usage
$users = User::where('active', true)->get();
$user = User::find($id);
$user->posts()->create(['title' => 'Hello']);

// Relationships
$user->posts;
$user->profile;
\`\`\`

### Forms and Validation
# Forms and Validation

\`\`\`php
// Request validation
class StorePostRequest extends FormRequest
{
    public function rules()
    {
        return [
            'title' => 'required|string|max:255',
            'body' => 'required|string',
        ];
    }
}

// In controller
public function store(StorePostRequest $request)
{
    Post::create($request->validated());
}
\`\`\`

### Migrations
# Migrations

\`\`\`bash
php artisan make:migration create_posts_table
php artisan migrate
\`\`\`

\`\`\`php
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->cascadeOnDelete();
    $table->string('title');
    $table->text('body');
    $table->timestamps();
});
\`\`\`

### Authentication
# Authentication

\`\`\`bash
php artisan make:auth
\`\`\`

\`\`\`php
// Manual auth
if (Auth::attempt($credentials)) {
    return redirect()->intended('/dashboard');
}

// Protect routes
Route::middleware('auth')->group(function () { ... });

// Get user
$user = Auth::user();
\`\`\`

### API Resources
# API Resources

\`\`\`php
// app/Http/Resources/UserResource.php
class UserResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
        ];
    }
}

// Controller
return new UserResource($user);
return UserResource::collection($users);
\`\`\`
`);

export const vueBasic: CourseContent = makeLang("vue-basic", "Vue.js Development — Basic", "💚", `## Vue.js Fundamentals
### Introduction to Vue.js
# Introduction to Vue.js

Vue.js is a progressive JavaScript framework.

## Create App

\`\`\`bash
npm create vue@latest my-app
\`\`\`

## Composition API

\`\`\`vue
<script setup>
import { ref, computed } from 'vue';

const count = ref(0);
const doubled = computed(() => count.value * 2);

function increment() {
  count.value++;
}
</script>

<template>
  <button @click="increment">{{ count }} ({{ doubled }})</button>
</template>
\`\`\`

### Template Syntax
# Template Syntax

\`\`\`vue
<template>
  <!-- Text interpolation -->
  <h1>{{ message }}</h1>

  <!-- Raw HTML -->
  <p v-html="rawHtml"></p>

  <!-- Attributes -->
  <a :href="url">Link</a>

  <!-- Conditional -->
  <div v-if="show">Visible</div>
  <div v-else>Hidden</div>
  <div v-show="show">Toggle</div>

  <!-- List -->
  <ul>
    <li v-for="item in items" :key="item.id">{{ item.name }}</li>
  </ul>

  <!-- Event -->
  <button @click="handleClick">Click</button>
  <button @submit.prevent="onSubmit">Submit</button>
</template>
\`\`\`

### Reactive Data
# Reactive Data

\`\`\`vue
<script setup>
import { ref, reactive } from 'vue';

// ref for primitives
const name = ref('Alice');
const count = ref(0);

// reactive for objects
const user = reactive({ name: 'Alice', age: 25 });

// computed
const fullName = computed(() => \`\${user.name} Doe\`);

// watch
watch(count, (newVal, oldVal) => {
  console.log(\`Changed from \${oldVal} to \${newVal}\`);
});
</script>
\`\`\`

### Components
# Components

\`\`\`vue
<!-- ChildComponent.vue -->
<script setup>
const props = defineProps(['title', 'count']);
const emit = defineEmits(['update']);
</script>

<template>
  <h2>{{ title }}</h2>
  <button @click="emit('update', count + 1)">+</button>
</template>

<!-- Parent -->
<script setup>
import ChildComponent from './ChildComponent.vue';
</script>

<template>
  <ChildComponent title="Hello" :count="5" @update="handleUpdate" />
</template>
\`\`\`

### Lifecycle Hooks
# Lifecycle Hooks

\`\`\`vue
<script setup>
import { onMounted, onUpdated, onUnmounted } from 'vue';

onMounted(() => {
  console.log('Component mounted');
});

onUpdated(() => {
  console.log('Component updated');
});

onUnmounted(() => {
  console.log('Component unmounted');
});
</script>
\`\`\`

### Vue Router
# Vue Router

\`\`\`javascript
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/users/:id', component: User },
];

const router = createRouter({ history: createWebHistory(), routes });
\`\`\`

### Pinia (State Management)
# Pinia

\`\`\`javascript
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({ name: '', logged: false }),
  actions: {
    login(name) { this.name = name; this.logged = true; },
    logout() { this.name = ''; this.logged = false; },
  },
  getters: {
    greeting: (state) => \`Hello, \${state.name}\`,
  },
});
\`\`\`

### Props and Events
# Props and Events

\`\`\`vue
<script setup>
// Props with validation
const props = defineProps({
  title: { type: String, required: true },
  count: { type: Number, default: 0 },
});

// Emit events
const emit = defineEmits(['update', 'delete']);

function handleUpdate() {
  emit('update', props.count + 1);
}
</script>
\`\`\`

### Form Handling
# Form Handling

\`\`\`vue
<script setup>
import { ref } from 'vue';

const form = ref({ name: '', email: '' });

function submit() {
  console.log(form.value);
}
</script>

<template>
  <form @submit.prevent="submit">
    <input v-model="form.name" placeholder="Name" />
    <input v-model="form.email" type="email" placeholder="Email" />
    <button type="submit">Submit</button>
  </form>
</template>
\`\`\`

### Directives
# Custom Directives

\`\`\`vue
<script setup>
// v-focus directive
const vFocus = {
  mounted(el) { el.focus(); },
};
</script>

<template>
  <input v-focus />
</template>
\`\`\`
`);

export const nuxtjsBasic: CourseContent = makeLang("nuxtjs-basic", "Nuxt.js Development — Basic", "💚", `## Nuxt.js Fundamentals
### Introduction to Nuxt.js
# Introduction to Nuxt.js

Nuxt.js is a Vue.js framework for SSR applications.

## Create App

\`\`\`bash
npx nuxi init my-app
cd my-app && npm install
npm run dev
\`\`\`

### Pages and Routing
# Pages and Routing

\`\`\`vue
<!-- pages/index.vue → / -->
<!-- pages/about.vue → /about -->
<!-- pages/users/[id].vue → /users/:id -->

<script setup>
const route = useRoute();
const id = route.params.id;
</script>
\`\`\`

### Layouts
# Layouts

\`\`\`vue
<!-- layouts/default.vue -->
<template>
  <nav>My Nav</nav>
  <slot />
  <footer>Footer</footer>
</template>
\`\`\`

### Composables
# Composables (Auto-imports)

\`\`\`vue
<script setup>
// useFetch, useState, useRouter auto-imported
const { data: users } = await useFetch('/api/users');
const count = useState('count', () => 0);
</script>
\`\`\`

### API Routes
# API Routes

\`\`\`typescript
// server/api/users.get.ts
export default defineEventHandler(async (event) => {
  const users = await db.user.findMany();
  return users;
});

// server/api/users.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const user = await db.user.create({ data: body });
  return user;
});
\`\`\`

### Nitro Server Engine
# Nitro Server

\`\`\`typescript
// server/utils/db.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
\`\`\`
`);

export const rustBasic: CourseContent = makeLang("rust-basic", "Rust Programming — Basic", "🦀", `## Rust Fundamentals
### Introduction to Rust
# Introduction to Rust

Rust is a systems programming language focused on safety and performance.

## First Program

\`\`\`rust
fn main() {
    println!("Hello, World!");
}
\`\`\`

## Variables

\`\`\`rust
let x = 5;           // immutable
let mut y = 10;       // mutable
let z: i32 = 100;    // explicit type
const MAX: u32 = 100;
\`\`\`

### Ownership and Borrowing
# Ownership

\`\`\`rust
let s1 = String::from("hello");
let s2 = s1;  // s1 is moved, no longer valid

// Borrowing
let s3 = String::from("hello");
let len = calculate_length(&s3);  // immutable borrow
// s3 is still valid

fn calculate_length(s: &String) -> usize {
    s.len()
}

// Mutable borrowing
let mut s = String::from("hello");
change(&mut s);

fn change(s: &mut String) {
    s.push_str(", world");
}
\`\`\`

### Structs and Enums
# Structs and Enums

\`\`\`rust
struct User {
    name: String,
    email: String,
    active: bool,
}

impl User {
    fn greet(&self) -> String {
        format!("Hi, I'm {}", self.name)
    }
}

enum Color {
    Red,
    Green,
    Blue,
}

match color {
    Color::Red => println!("Red"),
    Color::Green => println!("Green"),
    _ => println!("Other"),
}
\`\`\`

### Error Handling
# Error Handling

\`\`\`rust
fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err(String::from("Division by zero"))
    } else {
        Ok(a / b)
    }
}

match divide(10.0, 0.0) {
    Ok(result) => println!("{}", result),
    Err(e) => println!("Error: {}", e),
}

// Or with unwrap (panics on error)
let result = divide(10.0, 2.0).unwrap();
\`\`\`

### Traits and Generics
# Traits and Generics

\`\`\`rust
trait Summary {
    fn summarize(&self) -> String;
}

struct Article { title: String, content: String }
struct Tweet { username: String, text: String }

impl Summary for Article {
    fn summarize(&self) -> String {
        format!("{}: {}", self.title, self.content)
    }
}

// Generic function
fn largest<T: PartialOrd>(list: &[T]) -> &T {
    let mut largest = &list[0];
    for item in &list[1..] {
        if item > largest { largest = item; }
    }
    largest
}
\`\`\`

### Concurrency
# Concurrency

\`\`\`rust
use std::thread;

let handle = thread::spawn(|| {
    for i in 1..5 {
        println!("Spawned: {}", i);
        thread::sleep(std::time::Duration::from_millis(100));
    }
});

handle.join().unwrap();

// Channels
let (tx, rx) = std::sync::mpsc::channel();
thread::spawn(move || { tx.send("Hello").unwrap(); });
let msg = rx.recv().unwrap();
\`\`\`
`);

export const csharpBasic: CourseContent = makeLang("csharp-basic", "C# Programming — Basic", "🔷", `## C# Fundamentals
### Introduction to C#
# Introduction to C#

C# is a modern, object-oriented language for .NET.

## Your First Program

\`\`\`csharp
Console.WriteLine("Hello, World!");
\`\`\`

### Variables and Types
# Variables and Types

\`\`\`csharp
int age = 25;
double price = 9.99;
string name = "Alice";
bool active = true;
char grade = 'A';

// String interpolation
Console.WriteLine(\`Hello, {name}!\`);

// Nullables
int? nullable = null;
\`\`\`

### Control Flow
# Control Flow

\`\`\`csharp
if (score >= 90) Console.WriteLine("A");
else if (score >= 80) Console.WriteLine("B");
else Console.WriteLine("C");

// Switch
switch (day) {
    case "Monday": Console.WriteLine("Start"); break;
    default: Console.WriteLine("Regular"); break;
}

// For loops
for (int i = 0; i < 5; i++) Console.WriteLine(i);
foreach (var item in list) Console.WriteLine(item);
while (condition) { /* ... */ }
\`\`\`

### Methods and Classes
# Methods and Classes

\`\`\`csharp
public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }

    public Person(string name, int age)
    {
        Name = name;
        Age = age;
    }

    public string Greet() => \`Hi, I'm {Name}\`;

    // Static method
    public static Person Create(string name) => new Person(name, 0);
}
\`\`\`

### Inheritance and Interfaces
# Inheritance and Interfaces

\`\`\`csharp
public interface IDrawable { void Draw(); }

public abstract class Shape
{
    public abstract double Area();
}

public class Circle : Shape
{
    public double Radius { get; set; }
    public override double Area() => Math.PI * Radius * Radius;
}

public class Widget : IDrawable
{
    public void Draw() => Console.WriteLine("Drawing");
}
\`\`\`

### LINQ
# LINQ

\`\`\`csharp
var numbers = new[] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

var evens = numbers.Where(n => n % 2 == 0);
var doubled = numbers.Select(n => n * 2);
var sum = numbers.Sum();
var first = numbers.First(n => n > 5);

// Chaining
var result = numbers
    .Where(n => n % 2 == 0)
    .Select(n => n * n)
    .OrderByDescending(n => n)
    .ToList();
\`\`\`

### Async/Await
# Async/Await

\`\`\`csharp
public async Task<string> GetDataAsync()
{
    using var client = new HttpClient();
    string data = await client.GetStringAsync("https://api.example.com");
    return data;
}
\`\`\`

### Collections
# Collections

\`\`\`csharp
var list = new List<int> { 1, 2, 3 };
list.Add(4);

var dict = new Dictionary<string, int> { ["alice"] = 25 };

var set = new HashSet<string> { "a", "b", "c" };
\`\`\`
`);

export const flutterBasic: CourseContent = makeLang("flutter-basic", "Flutter Development — Basic", "💙", `## Flutter Fundamentals
### Introduction to Flutter
# Introduction to Flutter

Flutter is Google's UI toolkit for building cross-platform apps.

## Create App

\`\`\`bash
flutter create my_app
cd my_app
flutter run
\`\`\`

### Dart Basics
# Dart Basics

\`\`\`dart
var name = 'Alice';  // String
int age = 25;         // int
double price = 9.99;  // double
bool active = true;   // bool

// Null safety
String? nullable;     // nullable
String nonNull = '';  // non-null

// Functions
String greet(String name) => 'Hello, $name!';

// Lists
var numbers = [1, 2, 3];
var doubled = numbers.map((n) => n * 2).toList();

// Maps
var user = {'name': 'Alice', 'age': 25};
\`\`\`

### Widgets
# Widgets

\`\`\`dart
import 'package:flutter/material.dart';

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text('My App')),
        body: Center(child: Text('Hello Flutter!')),
      ),
    );
  }
}
\`\`\`

### Stateful Widgets
# Stateful Widgets

\`\`\`dart
class Counter extends StatefulWidget {
  @override
  _CounterState createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int count = 0;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Count: $count'),
        ElevatedButton(
          onPressed: () => setState(() => count++),
          child: Text('Increment'),
        ),
      ],
    );
  }
}
\`\`\`

### Layouts
# Layouts

\`\`\`dart
Column(
  children: [
    Row(children: [Text('Left'), Spacer(), Text('Right')]),
    Expanded(child: ListView(children: items)),
    Container(
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(color: Colors.blue),
      child: Text('Styled'),
    ),
  ],
)
\`\`\`

### Navigation
# Navigation

\`\`\`dart
// Push
Navigator.push(context, MaterialPageRoute(
  builder: (context) => DetailPage(),
));

// Pop
Navigator.pop(context);

// Named routes
Navigator.pushNamed(context, '/detail');
\`\`\`

### Forms
# Forms

\`\`\`dart
Form(
  key: _formKey,
  child: Column(
    children: [
      TextFormField(
        validator: (v) => v!.isEmpty ? 'Required' : null,
      ),
      ElevatedButton(
        onPressed: () {
          if (_formKey.currentState!.validate()) {
            // Submit
          }
        },
        child: Text('Submit'),
      ),
    ],
  ),
)
\`\`\`

### HTTP Requests
# HTTP

\`\`\`dart
import 'dart:convert';
import 'package:http/http.dart' as http;

final response = await http.get(Uri.parse('https://api.example.com'));
final data = jsonDecode(response.body);
\`\`\`
`);

export const reactNativeBasic: CourseContent = makeLang("react-native-basic", "React Native Development — Basic", "⚛️", `## React Native Fundamentals
### Introduction to React Native
# Introduction to React Native

React Native lets you build mobile apps with React.

## Create App

\`\`\`bash
npx react-native init MyApp
cd MyApp
npx react-native run-ios
\`\`\`

### Core Components
# Core Components

\`\`\`jsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello React Native!</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Click Me</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
  button: { marginTop: 20, padding: 12, backgroundColor: '#007AFF', borderRadius: 8 },
  buttonText: { color: '#fff', fontSize: 16 },
});
\`\`\`

### Navigation
# Navigation

\`\`\`bash
npm install @react-navigation/native @react-navigation/stack
\`\`\`

\`\`\`jsx
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
\`\`\`

### Lists
# Lists

\`\`\`jsx
import { FlatList } from 'react-native';

<FlatList
  data={items}
  keyExtractor={item => item.id}
  renderItem={({ item }) => <Text>{item.name}</Text>}
/>
\`\`\`

### State Management
# State Management

\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <View>
      <Text>{count}</Text>
      <Button title="Increment" onPress={() => setCount(c => c + 1)} />
    </View>
  );
}
\`\`\`

### AsyncStorage
# AsyncStorage

\`\`\`jsx
import AsyncStorage from '@react-native-async-storage/async-storage';

// Save
await AsyncStorage.setItem('user', JSON.stringify(user));

// Load
const data = await AsyncStorage.getItem('user');
\`\`\`

### Styling
# Styling

\`\`\`jsx
// Responsive
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05,
  },
});
\`\`\`
`);

export const flaskBasic: CourseContent = makeLang("flask-basic", "Flask Web Framework — Basic", "🧪", `## Flask Fundamentals
### Introduction to Flask
# Introduction to Flask

Flask is a lightweight Python web framework.

## Installation

\`\`\`bash
pip install flask
\`\`\`

## First App

\`\`\`python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return 'Hello, Flask!'

@app.route('/users/<name>')
def user(name):
    return f'Hello, {name}!'

if __name__ == '__main__':
    app.run(debug=True)
\`\`\`

### Routing
# Routing

\`\`\`python
@app.route('/api/data', methods=['GET'])
def get_data():
    return {'message': 'Success'}

@app.route('/api/data', methods=['POST'])
def create_data():
    data = request.get_json()
    return {'created': True}, 201

@app.route('/users/<int:user_id>')
def get_user(user_id):
    return {'id': user_id}
\`\`\`

### Templates (Jinja2)
# Templates

\`\`\`html
<!-- templates/base.html -->
<!DOCTYPE html>
<html>
<head><title>{% block title %}My App{% endblock %}</title></head>
<body>
  {% block content %}{% endblock %}
</body>
</html>

<!-- templates/home.html -->
{% extends "base.html" %}
{% block content %}
  <h1>Hello, {{ name }}!</h1>
  <ul>
    {% for item in items %}
      <li>{{ item }}</li>
    {% endfor %}
  </ul>
{% endblock %}
\`\`\`

### Forms
# Forms

\`\`\`python
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField

class LoginForm(FlaskForm):
    email = StringField('Email')
    submit = SubmitField('Login')

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        # Process form
        return redirect('/dashboard')
    return render_template('login.html', form=form)
\`\`\`

### Database (SQLAlchemy)
# Database

\`\`\`python
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))

# Create tables
with app.app_context():
    db.create_all()
\`\`\`

### Blueprints
# Blueprints

\`\`\`python
from flask import Blueprint

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login')
def login():
    return 'Login page'

# Register
app.register_blueprint(auth_bp, url_prefix='/auth')
\`\`\`
`);

export const djangoBasic: CourseContent = makeLang("django-basic", "Django Web Framework — Basic", "🟢", `## Django Fundamentals
### Introduction to Django
# Introduction to Django

Django is a high-level Python web framework.

## Installation

\`\`\`bash
pip install django
django-admin startproject mysite
cd mysite
python manage.py runserver
\`\`\`

### Models
# Models

\`\`\`python
from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    published = models.BooleanField(default=False)

    def __str__(self):
        return self.title
\`\`\`

### Views
# Views

\`\`\`python
from django.shortcuts import render, get_object_or_404
from .models import Post

def post_list(request):
    posts = Post.objects.filter(published=True)
    return render(request, 'blog/post_list.html', {'posts': posts})

def post_detail(request, pk):
    post = get_object_or_404(Post, pk=pk)
    return render(request, 'blog/post_detail.html', {'post': post})
\`\`\`

### URLs
# URLs

\`\`\`python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.post_list, name='post_list'),
    path('post/<int:pk>/', views.post_detail, name='post_detail'),
]
\`\`\`

### Templates
# Templates

\`\`\`html
{% extends 'base.html' %}
{% block content %}
  {% for post in posts %}
    <h2>{{ post.title }}</h2>
    <p>{{ post.content|truncatewords:30 }}</p>
  {% endfor %}
{% endblock %}
\`\`\`

### Forms
# Forms

\`\`\`python
from django import forms

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'content']
\`\`\`

### Admin
# Admin

\`\`\`python
from django.contrib import admin
from .models import Post

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'created_at']
    list_filter = ['published', 'created_at']
    search_fields = ['title']
\`\`\`

### REST Framework
# Django REST Framework

\`\`\`python
from rest_framework import serializers, viewsets
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
\`\`\`

### Authentication
# Authentication

\`\`\`python
from django.contrib.auth import login, authenticate

def login_view(request):
    if request.method == 'POST':
        user = authenticate(
            username=request.POST['username'],
            password=request.POST['password']
        )
        if user:
            login(request, user)
            return redirect('/dashboard')
\`\`\`

### Static Files
# Static Files

\`\`\`html
{% load static %}
<img src="{% static 'images/logo.png' %}" />
<link rel="stylesheet" href="{% static 'css/style.css' %}" />
\`\`\`
`);

// Export all
export const allCourseContent: CourseContent[] = [
  pythonIntermediate,
  javaBasic,
  javascriptBasic,
  reactBasic,
  nodejsBasic,
  nextjsBasic,
  goBasic,
  phpBasic,
  laravelBasic,
  vueBasic,
  nuxtjsBasic,
  rustBasic,
  csharpBasic,
  flutterBasic,
  reactNativeBasic,
  flaskBasic,
  djangoBasic,
];
