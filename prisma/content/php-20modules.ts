import type { CourseContent } from "../seed-content";

export const phpBasic20Modules: CourseContent = {
  slug: "php-basic",
  modules: [
    // Module 1: Introduction
    {
      title: "Introduction to PHP",
      description: "What is PHP, history, and getting started",
      lessons: [
        {
          title: "What is PHP?",
          slug: "php-intro",
          content: `# What is PHP?

PHP (Hypertext Preprocessor) powers 77% of websites with known server-side languages.

## Why Learn PHP?
- **Easy to learn** — simple syntax
- **Huge community** — extensive documentation
- **Great for web** — built for the web
- **CMS Power** — WordPress, Drupal, Joomla

## Your First Script
\`\`\`php
<?php
echo "Hello, World!";
?>
\`\`\`

## Running PHP
\`\`\`bash
php script.php          # Command line
# Place in web server document root for web
\`\`\`

> **Tip:** PHP code is embedded in HTML using \`<?php ... ?>\` tags.`,
          estimatedMinutes: 15,
          exercises: [
            {
              title: "Hello PHP",
              description: "Create a PHP script that prints your info",
              requirements: ["Use echo", "Use PHP tags", "Run with php command"],
              points: 10,
            },
          ],
        },
        {
          title: "PHP Development Setup",
          slug: "php-setup",
          content: `# Setting Up PHP

## Install PHP
- XAMPP / WAMP (Windows)
- MAMP (Mac)
- LAMP (Linux)

## Verify
\`\`\`bash
php -v
\`\`\`

## Project Structure
\`\`\`
myproject/
├── public/          # Web root
│   └── index.php
├── src/
└── composer.json
\`\`\``,
          estimatedMinutes: 10,
        },
      ],
    },
    // Module 2: Variables
    {
      title: "Variables and Data Types",
      description: "Declaring variables, types, and null",
      lessons: [
        {
          title: "Variables in PHP",
          slug: "php-variables",
          content: `# Variables

## Rules
- Start with \`$\`
- Case-sensitive
- Can contain letters, numbers, underscores

\`\`\`php
\$name = "Alice";       // string
\$age = 25;             // integer
\$height = 5.8;         // float
\$isStudent = true;     // boolean
\$grades = [90, 85, 95]; // array
\$person = ["name" => "Bob", "age" => 30]; // associative array
\`\`\`

## String Types
\`\`\`php
\$single = 'No variable expansion';
\$double = "Hello, \$name!";  // interpolates
\`\`\`

## Type Checking
\`\`\`php
echo gettype(\$name);    // "string"
echo is_int(\$age);      // 1 (true)
\`\`\`

## Null
\`\`\`php
\$nothing = null;
echo isset(\$nothing);   // false
echo empty(\$nothing);   // true
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 3: Data Types
    {
      title: "Data Types Deep Dive",
      description: "Strings, arrays, and type juggling",
      lessons: [
        {
          title: "PHP Data Types",
          slug: "php-datatypes",
          content: `# PHP Data Types

## Scalar Types
- string: \`"Hello"\`
- int: \`42\`
- float: \`3.14\`
- bool: \`true\`

## Compound Types
- array: \`[1, 2, 3]\`
- object: \`new stdClass()\`

## Special Types
- null
- resource (file handles, DB connections)

## Type Casting
\`\`\`php
\$num = "42";
\$int = (int) \$num;   // 42
\$float = (float) \$num; // 42.0
\`\`\`

## String Functions
\`\`\`php
strlen("Hello");              // 5
strtolower("HELLO");          // "hello"
strtoupper("hello");          // "HELLO"
str_replace("World", "PHP", "Hello World"); // "Hello PHP"
substr("Hello", 0, 3);       // "Hel"
strpos("Hello", "e");        // 1
trim("  hello  ");            // "hello"
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 4: Operators
    {
      title: "Operators",
      description: "Arithmetic, comparison, logical, and string operators",
      lessons: [
        {
          title: "PHP Operators",
          slug: "php-operators",
          content: `# Operators

## Arithmetic
\`\`\`php
echo 10 + 3;   // 13
echo 10 - 3;   // 7
echo 10 * 3;   // 30
echo 10 / 3;   // 3.333
echo 10 % 3;   // 1
\`\`\`

## Comparison
\`\`\`php
echo 5 == "5";    // true (loose)
echo 5 === "5";   // false (strict)
echo 5 !== "5";   // true
\`\`\`

## String Concatenation
\`\`\`php
\$greeting = "Hello" . " " . "World";
echo "Hello, {\$name}!";  // interpolation
\`\`\`

## Logical
\`\`\`php
echo true && false;  // false (AND)
echo true || false;  // true  (OR)
echo !true;          // false (NOT)
\`\`\`

> **Important:** Always use \`===\` and \`!==\` for strict comparison.`,
          estimatedMinutes: 15,
          exercises: [
            {
              title: "Calculator",
              description: "Build a simple calculator using PHP operators",
              requirements: ["Use arithmetic operators", "Handle division by zero", "Display results"],
              points: 15,
            },
          ],
        },
      ],
    },
    // Module 5: if Statement
    {
      title: "If Statement",
      description: "Single if condition",
      lessons: [
        {
          title: "If Statement in PHP",
          slug: "php-if",
          content: `# If Statement

\`\`\`php
\$age = 20;

if (\$age >= 18) {
    echo "You can vote!";
}
\`\`\`

## Nested If
\`\`\`php
\$isMember = true;
\$age = 25;

if (\$isMember) {
    if (\$age >= 18) {
        echo "Welcome to the club!";
    }
}
\`\`\`

## Truthy and Falsy
\`\`\`php
// Falsy values: false, 0, 0.0, "", null, []
if (\$value) {
    // runs if truthy
}
\`\`\``,
          estimatedMinutes: 15,
        },
      ],
    },
    // Module 6: if-else and if-else-if
    {
      title: "If-Else and If-Else-If",
      description: "Conditional branching with else and elseif",
      lessons: [
        {
          title: "If-Else in PHP",
          slug: "php-if-else",
          content: `# If-Else

\`\`\`php
\$temperature = 25;

if (\$temperature > 30) {
    echo "It's hot!";
} else {
    echo "It's nice outside.";
}
\`\`\`

## Elseif Chain
\`\`\`php
\$score = 75;
\$grade = "";

if (\$score >= 90) {
    \$grade = "A";
} elseif (\$score >= 80) {
    \$grade = "B";
} elseif (\$score >= 70) {
    \$grade = "C";
} elseif (\$score >= 60) {
    \$grade = "D";
} else {
    \$grade = "F";
}

echo "Grade: " . \$grade;  // C
\`\`\`

## Short Ternary
\`\`\`php
\$age = 20;
\$status = \$age >= 18 ? "Adult" : "Minor";
\`\`\``,
          estimatedMinutes: 15,
        },
      ],
    },
    // Module 7: Switch
    {
      title: "Switch Statement",
      description: "Switch-case for multiple conditions",
      lessons: [
        {
          title: "Switch in PHP",
          slug: "php-switch",
          content: `# Switch Statement

\`\`\`php
\$day = "Monday";

switch (\$day) {
    case "Monday":
        echo "Start of week";
        break;
    case "Friday":
        echo "Almost weekend";
        break;
    case "Saturday":
    case "Sunday":
        echo "Weekend!";
        break;
    default:
        echo "Regular day";
}
\`\`\`

## Match Expression (PHP 8+)
\`\`\`php
\$statusCode = 404;

\$message = match (\$statusCode) {
    200 => "OK",
    404 => "Not Found",
    500 => "Server Error",
    default => "Unknown",
};
\`\`\`

## Switch vs Match
- **switch**: Loose comparison, needs \`break\`
- **match**: Strict comparison, returns value, no fall-through`,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 8: For Loop
    {
      title: "For Loop",
      description: "Traditional for loop and foreach",
      lessons: [
        {
          title: "For Loop in PHP",
          slug: "php-for",
          content: `# For Loop

## Basic For
\`\`\`php
for (\$i = 0; \$i < 5; \$i++) {
    echo \$i . "\\n";  // 0, 1, 2, 3, 4
}
\`\`\`

## Foreach (Indexed Array)
\`\`\`php
\$colors = ["red", "green", "blue"];

foreach (\$colors as \$color) {
    echo \$color . "\\n";
}
\`\`\`

## Foreach with Key
\`\`\`php
\$person = ["name" => "Alice", "age" => 25];

foreach (\$person as \$key => \$value) {
    echo "\$key: \$value\\n";
}
\`\`\`

## Nested Loops
\`\`\`php
for (\$i = 1; \$i <= 5; \$i++) {
    for (\$j = 1; \$j <= \$i; \$j++) {
        echo "* ";
    }
    echo "\\n";
}
\`\`\``,
          estimatedMinutes: 20,
          exercises: [
            {
              title: "FizzBuzz PHP",
              description: "Print 1-100 with FizzBuzz",
              requirements: ["Use for loop", "Use modulo", "Handle all cases"],
              points: 15,
            },
          ],
        },
      ],
    },
    // Module 9: While and Do-While
    {
      title: "While and Do-While",
      description: "Looping with while and do-while",
      lessons: [
        {
          title: "While and Do-While in PHP",
          slug: "php-while",
          content: `# While Loop

\`\`\`php
\$count = 0;
while (\$count < 5) {
    echo \$count . "\\n";
    \$count++;
}
\`\`\`

# Do-While Loop

\`\`\`php
\$num = 1;
do {
    echo \$num . "\\n";
    \$num *= 2;
} while (\$num <= 16);
// Output: 1, 2, 4, 8, 16
\`\`\`

## Key Difference
- **while**: Checks condition before execution
- **do-while**: Executes at least once

## Infinite Loop with Break
\`\`\`php
while (true) {
    echo "Enter command (quit to exit): ";
    \$input = trim(fgets(STDIN));
    if (\$input === "quit") break;
    echo "You said: \$input\\n";
}
\`\`\``,
          estimatedMinutes: 15,
        },
      ],
    },
    // Module 10: Loop Control
    {
      title: "Loop Control",
      description: "Break, continue, and alternative syntax",
      lessons: [
        {
          title: "Break and Continue",
          slug: "php-loop-control",
          content: `# Break and Continue

## Break
\`\`\`php
for (\$i = 0; \$i < 100; \$i++) {
    if (\$i == 5) break;
    echo \$i . " ";  // 0 1 2 3 4
}
\`\`\`

## Continue
\`\`\`php
for (\$i = 0; \$i < 10; \$i++) {
    if (\$i % 2 == 0) continue;  // skip even
    echo \$i . " ";  // 1 3 5 7 9
}
\`\`\`

## Alternative Syntax (for templates)
\`\`\`php
<?php for (\$i = 0; \$i < 5; \$i++): ?>
    <p>Item <?= \$i ?></p>
<?php endfor; ?>

<?php foreach (\$items as \$item): ?>
    <li><?= \$item ?></li>
<?php endforeach; ?>
\`\`\``,
          estimatedMinutes: 15,
        },
      ],
    },
    // Module 11: Arrays
    {
      title: "Arrays",
      description: "Indexed, associative, and multi-dimensional arrays",
      lessons: [
        {
          title: "Array Basics",
          slug: "php-arrays",
          content: `# Arrays

## Indexed Arrays
\`\`\`php
\$colors = ["red", "green", "blue"];
echo \$colors[0];  // "red"

\$colors[] = "yellow";  // append
count(\$colors);        // 4
\`\`\`

## Associative Arrays
\`\`\`php
\$person = [
    "name" => "Alice",
    "age" => 25,
    "email" => "alice@example.com"
];

echo \$person["name"];  // "Alice"
\`\`\`

## Multi-Dimensional
\`\`\`php
\$matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

echo \$matrix[1][2];  // 6
\`\`\`

## Array Functions
\`\`\`php
\$nums = [3, 1, 4, 1, 5, 9];

sort(\$nums);            // [1, 1, 3, 4, 5, 9]
array_reverse(\$nums);   // reverse
array_unique(\$nums);    // remove dupes
array_merge(\$a, \$b);    // merge
in_array(4, \$nums);     // true
\`\`\``,
          estimatedMinutes: 25,
          exercises: [
            {
              title: "Array Statistics",
              description: "Find min, max, and average",
              requirements: ["Create array", "Use array functions", "Display results"],
              points: 20,
            },
          ],
        },
      ],
    },
    // Module 12: Advanced Arrays
    {
      title: "Advanced Array Functions",
      description: "Map, filter, reduce, and array manipulation",
      lessons: [
        {
          title: "Array Functions Advanced",
          slug: "php-advanced-arrays",
          content: `# Advanced Array Functions

## Map
\`\`\`php
\$numbers = [1, 2, 3, 4, 5];
\$squared = array_map(fn(\$n) => \$n ** 2, \$numbers);
// [1, 4, 9, 16, 25]
\`\`\`

## Filter
\`\`\`php
\$evens = array_filter(\$numbers, fn(\$n) => \$n % 2 == 0);
// [2, 4]
\`\`\`

## Reduce
\`\`\`php
\$total = array_reduce(\$numbers, fn(\$carry, \$n) => \$carry + \$n, 0);
// 15
\`\`\`

## Explode and Implode
\`\`\`php
\$csv = "apple,banana,cherry";
\$array = explode(",", \$csv);  // ["apple", "banana", "cherry"]
\$string = implode(", ", \$array);  // "apple, banana, cherry"
\`\`\`

## Array Keys and Values
\`\`\`php
\$person = ["name" => "Alice", "age" => 25];
\$keys = array_keys(\$person);    // ["name", "age"]
\$values = array_values(\$person); // ["Alice", 25]
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 13: Objects
    {
      title: "Classes and Objects",
      description: "OOP fundamentals in PHP",
      lessons: [
        {
          title: "Classes in PHP",
          slug: "php-classes",
          content: `# Classes and Objects

## Basic Class
\`\`\`php
class User {
    public string \$name;
    public string \$email;
    private int \$age;

    public function __construct(string \$name, string \$email, int \$age) {
        \$this->name = \$name;
        \$this->email = \$email;
        \$this->age = \$age;
    }

    public function getAge(): int {
        return \$this->age;
    }

    public function greet(): string {
        return "Hi, I'm {\$this->name}!";
    }
}

\$user = new User("Alice", "alice@example.com", 25);
echo \$user->greet();
\`\`\`

## Access Modifiers

| Modifier | Class | Child | Outside |
|----------|-------|-------|---------|
| public | ✓ | ✓ | ✓ |
| protected | ✓ | ✓ | ✗ |
| private | ✓ | ✗ | ✗ |`,
          estimatedMinutes: 25,
          exercises: [
            {
              title: "Bank Account",
              description: "Create a BankAccount class with deposit and withdraw",
              requirements: ["Private balance", "Public methods", "Validation"],
              points: 20,
            },
          ],
        },
      ],
    },
    // Module 14: Advanced Objects
    {
      title: "Inheritance and Interfaces",
      description: "OOP advanced concepts",
      lessons: [
        {
          title: "Inheritance and Interfaces",
          slug: "php-inheritance-interfaces",
          content: `# Inheritance

\`\`\`php
class Animal {
    public function __construct(protected string \$name) {}
    public function speak(): string { return "..."; }
}

class Dog extends Animal {
    public function speak(): string {
        return "{\$this->name} says Woof!";
    }
}
\`\`\`

# Interfaces

\`\`\`php
interface Printable {
    public function toString(): string;
}

interface Loggable {
    public function toLog(): string;
}

class Document implements Printable, Loggable {
    public function toString(): string { return "Content"; }
    public function toLog(): string { return "Log: " . \$this->toString(); }
}
\`\`\`

# Abstract Classes

\`\`\`php
abstract class Shape {
    abstract public function area(): float;
    public function describe(): string {
        return "Area: " . \$this->area();
    }
}

class Circle extends Shape {
    public function __construct(private float \$radius) {}
    public function area(): float {
        return M_PI * \$this->radius ** 2;
    }
}
\`\`\``,
          estimatedMinutes: 25,
        },
      ],
    },
    // Module 15: Objects - Properties
    {
      title: "Properties and Magic Methods",
      description: "Getters, setters, and magic methods",
      lessons: [
        {
          title: "Properties and Magic Methods",
          slug: "php-properties-magic",
          content: `# Properties

\`\`\`php
class Product {
    private string \$name;
    private float \$price;

    public function getName(): string { return \$this->name; }
    
    public function setPrice(float \$price): void {
        if (\$price < 0) throw new InvalidArgumentException("Price can't be negative");
        \$this->price = \$price;
    }
}
\`\`\`

# Magic Methods

\`\`\`php
class Money {
    public function __construct(private float \$amount, private string \$currency) {}
    
    public function __toString(): string {
        return \$this->currency . number_format(\$this->amount, 2);
    }
    
    public function __get(string \$name) {
        return \$this->\$name ?? null;
    }
    
    public function __set(string \$name, mixed \$value) {
        \$this->\$name = \$value;
    }
}
\`\`\`

## Common Magic Methods
- \`__construct\` / \`__destruct\`
- \`__get\` / \`__set\`
- \`__toString\`
- \`__call\` / \`__callStatic\`
- \`__clone\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 16: Functions
    {
      title: "Functions",
      description: "Defining functions, scope, and closures",
      lessons: [
        {
          title: "Functions in PHP",
          slug: "php-functions",
          content: `# Functions

## Basic Functions
\`\`\`php
function greet(string \$name): string {
    return "Hello, \$name!";
}

echo greet("Alice");
\`\`\`

## Default Parameters
\`\`\`php
function greet(string \$name, string \$greeting = "Hello"): string {
    return "\$greeting, \$name!";
}

echo greet("Bob");           // "Hello, Bob!"
echo greet("Bob", "Hi");    // "Hi, Bob!"
\`\`\`

## Type Hints
\`\`\`php
function add(int \$a, int \$b): int {
    return \$a + \$b;
}

function process(array \$items): array {
    return array_map(fn(\$item) => strtoupper(\$item), \$items);
}
\`\`\`

## Scope
\`\`\`php
\$global_var = "I'm global";

function test() {
    global \$global_var;
    echo \$global_var;
}
\`\`\`

## Arrow Functions
\`\`\`php
\$double = fn(\$x) => \$x * 2;
echo \$double(5);  // 10
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 17: Advanced Functions
    {
      title: "Anonymous Functions and Closures",
      description: "Closures, callbacks, and functional programming",
      lessons: [
        {
          title: "Anonymous Functions and Closures",
          slug: "php-closures",
          content: `# Anonymous Functions

\`\`\`php
\$greet = function(string \$name) {
    return "Hello, \$name!";
};

echo \$greet("Alice");
\`\`\`

# Closures with \`use\`

\`\`\`php
\$counter = 0;
\$increment = function() use (&\$counter) {
    \$counter++;
    return \$counter;
};

echo \$increment();  // 1
echo \$increment();  // 2
\`\`\`

# Callbacks

\`\`\`php
function applyToNumber(int \$num, callable \$operation): int {
    return \$operation(\$num);
}

\$result = applyToNumber(10, fn(\$n) => \$n * 2);
// 20
\`\`\`

# Functional Programming

\`\`\`php
\$numbers = [1, 2, 3, 4, 5];

// Pipeline
\$result = array_reduce(
    array_filter(\$numbers, fn(\$n) => \$n > 2),
    fn(\$carry, \$n) => \$carry + \$n,
    0
);
// 12 (3 + 4 + 5)
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 18: Error Handling
    {
      title: "Error Handling",
      description: "Try-catch-finally and custom exceptions",
      lessons: [
        {
          title: "Exception Handling",
          slug: "php-exceptions",
          content: `# Exception Handling

## Try-Catch-Finally
\`\`\`php
try {
    \$result = 10 / 0;
} catch (DivisionByZeroError \$e) {
    echo "Error: " . \$e->getMessage();
} finally {
    echo "Always runs";
}
\`\`\`

## Custom Exceptions
\`\`\`php
class InsufficientFundsException extends Exception {
    private float \$amount;
    
    public function __construct(float \$amount) {
        parent::__construct("Insufficient funds: needed \$amount");
        \$this->amount = \$amount;
    }
}

// Using
function withdraw(float \$balance, float \$amount): float {
    if (\$amount > \$balance) {
        throw new InsufficientFundsException(\$amount);
    }
    return \$balance - \$amount;
}
\`\`\`

## Multiple Catch Blocks
\`\`\`php
try {
    \$data = json_decode(\$json, true);
    if (\$data === null) throw new InvalidArgumentException();
} catch (InvalidArgumentException \$e) {
    echo "Invalid data";
} catch (Exception \$e) {
    echo "Other error";
}
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 19: Superglobals and Web
    {
      title: "Superglobals and Web Basics",
      description: "Working with $_GET, $_POST, sessions",
      lessons: [
        {
          title: "Superglobals and Sessions",
          slug: "php-superglobals",
          content: `# Superglobals

\`\`\`php
// \$_GET - URL parameters
\$page = \$_GET['page'] ?? 1;

// \$_POST - Form data
\$name = \$_POST['name'] ?? '';

// \$_SERVER - Server info
\$method = \$_SERVER['REQUEST_METHOD'];

// Security: ALWAYS sanitize!
\$name = htmlspecialchars(\$_POST['name'] ?? '', ENT_QUOTES, 'UTF-8');
\`\`\`

# Sessions

\`\`\`php
session_start();

// Set
\$_SESSION['user'] = "Alice";
\$_SESSION['logged_in'] = true;

// Get
if (\$_SESSION['logged_in'] ?? false) {
    echo "Welcome, " . \$_SESSION['user'];
}

// Destroy
session_destroy();
\`\`\`

# Cookies

\`\`\`php
// Set cookie (expires in 7 days)
setcookie("theme", "dark", time() + (7 * 24 * 60 * 60));

// Read
\$theme = \$_COOKIE['theme'] ?? 'light';
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 20: Project Application
    {
      title: "Project — Contact Form System",
      description: "Build a complete contact form with validation",
      lessons: [
        {
          title: "Contact Form System",
          slug: "php-project-contact",
          content: `# Contact Form System

## Complete Application

### index.php (Form)
\`\`\`php
<?php
\$errors = [];
\$success = false;

if (\$_SERVER['REQUEST_METHOD'] === 'POST') {
    \$name = trim(\$_POST['name'] ?? '');
    \$email = trim(\$_POST['email'] ?? '');
    \$message = trim(\$_POST['message'] ?? '');
    
    // Validation
    if (empty(\$name)) \$errors[] = "Name is required";
    if (empty(\$email) || !filter_var(\$email, FILTER_VALIDATE_EMAIL)) {
        \$errors[] = "Valid email is required";
    }
    if (empty(\$message)) \$errors[] = "Message is required";
    
    if (empty(\$errors)) {
        // Save to file (in production, use database)
        \$data = date('Y-m-d H:i:s') . " | " . \$name . " | " . \$email . "\\n";
        file_put_contents('messages.txt', \$data, FILE_APPEND);
        \$success = true;
    }
}
?>

<!DOCTYPE html>
<html>
<head><title>Contact Us</title></head>
<body>
    <h1>Contact Us</h1>
    
    <?php if (\$success): ?>
        <p style="color: green;">Message sent successfully!</p>
    <?php endif; ?>
    
    <?php if (!empty(\$errors)): ?>
        <ul style="color: red;">
            <?php foreach (\$errors as \$error): ?>
                <li><?= htmlspecialchars(\$error) ?></li>
            <?php endforeach; ?>
        </ul>
    <?php endif; ?>
    
    <form method="POST">
        <p>
            <label>Name:<br>
                <input type="text" name="name" value="<?= htmlspecialchars(\$name ?? '') ?>">
            </label>
        </p>
        <p>
            <label>Email:<br>
                <input type="email" name="email" value="<?= htmlspecialchars(\$email ?? '') ?>">
            </label>
        </p>
        <p>
            <label>Message:<br>
                <textarea name="message" rows="5"><?= htmlspecialchars(\$message ?? '') ?></textarea>
            </label>
        </p>
        <button type="submit">Send</button>
    </form>
</body>
</html>
\`\`\`

## Concepts Used
✅ Variables and Types
✅ Operators
✅ if/else-if
✅ switch (for processing)
✅ foreach loops
✅ Arrays (errors list)
✅ Functions (validation)
✅ Superglobals (\$_POST)
✅ String functions (htmlspecialchars)
✅ File I/O (saving messages)`,
          estimatedMinutes: 40,
          exercises: [
            {
              title: "Extend the System",
              description: "Add email validation and admin view",
              requirements: ["Validate email format", "Add admin page to view messages", "Add delete functionality", "Use sessions"],
              points: 30,
            },
          ],
        },
      ],
    },
  ],
};
