import type { CourseContent } from "../seed-content";

export const csharpBasic20Modules: CourseContent = {
  slug: "csharp-basic",
  modules: [
    // Module 1: Introduction
    {
      title: "Introduction to C#",
      description: "What is C#, setup, and first program",
      lessons: [
        {
          title: "What is C#?",
          slug: "csharp-intro",
          content: `# What is C#?

C# is a modern, object-oriented language by Microsoft for .NET development.

## Why Learn C#?
- **Strongly-typed** — catch errors early
- **Rich standard library**
- **Cross-platform** (.NET 8+)
- **Great for**: Web (ASP.NET), Desktop, Games (Unity)

## Your First Program
\`\`\`csharp
using System;

class Program {
    static void Main(string[] args) {
        Console.WriteLine("Hello, World!");
    }
}
\`\`\`

## .NET CLI
\`\`\`bash
dotnet new console -n MyApp
cd MyApp
dotnet run
\`\`\``,
          estimatedMinutes: 15,
        },
        {
          title: "C# Development Setup",
          slug: "csharp-setup",
          content: `# Setting Up C#

## Install .NET SDK
Download from dotnet.microsoft.com

## Verify
\`\`\`bash
dotnet --version
\`\`\`

## IDE
- **Visual Studio** (recommended)
- **VS Code** with C# extension
- **JetBrains Rider**

## Project Commands
\`\`\`bash
dotnet new console     # Console app
dotnet new webapi      # Web API
dotnet new classlib    # Class library
dotnet build           # Build
dotnet run             # Run
dotnet test            # Run tests
\`\`\``,
          estimatedMinutes: 10,
        },
      ],
    },
    // Module 2: Variables
    {
      title: "Variables and Types",
      description: "Declaring variables, types, and constants",
      lessons: [
        {
          title: "C# Variables",
          slug: "csharp-variables",
          content: `# Variables

## Declaration
\`\`\`csharp
string name = "Alice";
int age = 25;
double height = 5.8;
bool isStudent = true;
char grade = 'A';

// var (inferred)
var x = 42;        // int
var s = "hello";   // string

// Constants
const double Pi = 3.14159;
\`\`\`

## String Interpolation
\`\`\`csharp
string msg = \$"Hello, {name}! You are {age} years old.";
\`\`\`

## Nullable Types
\`\`\`csharp
int? nullableInt = null;
string? nullableString = null;

if (nullableInt.HasValue) {
    Console.WriteLine(nullableInt.Value);
}
\`\`\`

## Type Casting
\`\`\`csharp
// Implicit (safe)
int i = 10;
double d = i;

// Explicit (unsafe)
double pi = 3.14;
int truncated = (int)pi;  // 3
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 3: Data Types
    {
      title: "Data Types Deep Dive",
      description: "Value types, reference types, and strings",
      lessons: [
        {
          title: "C# Data Types",
          slug: "csharp-datatypes",
          content: `# Data Types

## Value Types
\`\`\`csharp
int x = 42;           // 32-bit integer
long big = 999999L;   // 64-bit integer
float f = 3.14f;      // 32-bit float
double d = 3.14159;   // 64-bit float
decimal money = 99.99m; // 128-bit (financial)
bool flag = true;
char letter = 'A';    // 16-bit Unicode
\`\`\`

## Reference Types
\`\`\`csharp
string name = "Hello";  // immutable
object obj = 42;         // base type
\`\`\`

## Collections
\`\`\`csharp
// Array
int[] nums = { 1, 2, 3, 4, 5 };

// List
List<string> names = new() { "Alice", "Bob" };

// Dictionary
Dictionary<string, int> ages = new() {
    ["Alice"] = 25,
    ["Bob"] = 30
};
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 4: Operators
    {
      title: "Operators",
      description: "All operator types in C#",
      lessons: [
        {
          title: "C# Operators",
          slug: "csharp-operators",
          content: `# Operators

## Arithmetic
\`\`\`csharp
Console.WriteLine(10 + 3);   // 13
Console.WriteLine(10 - 3);   // 7
Console.WriteLine(10 * 3);   // 30
Console.WriteLine(10 / 3);   // 3 (integer)
Console.WriteLine(10 % 3);   // 1
\`\`\`

## Comparison
\`\`\`csharp
Console.WriteLine(5 == 5);   // true
Console.WriteLine(5 != 3);   // true
Console.WriteLine(5 > 3);    // true
Console.WriteLine(5 <= 5);   // true
\`\`\`

## Logical
\`\`\`csharp
Console.WriteLine(true && false);  // false
Console.WriteLine(true || false);  // true
Console.WriteLine(!true);          // false
\`\`\`

## Null Coalescing
\`\`\`csharp
string? name = null;
string displayName = name ?? "Unknown";
\`\`\`

## Pattern Matching
\`\`\`csharp
object obj = 42;
if (obj is int number) {
    Console.WriteLine(number);
}
\`\`\``,
          estimatedMinutes: 15,
          exercises: [
            {
              title: "Calculator",
              description: "Build a calculator using C# operators",
              requirements: ["Arithmetic ops", "Handle division", "Display results"],
              points: 15,
            },
          ],
        },
      ],
    },
    // Module 5: if
    {
      title: "If Statement",
      description: "Single if condition",
      lessons: [
        {
          title: "If in C#",
          slug: "csharp-if",
          content: `# If Statement

\`\`\`csharp
int age = 20;

if (age >= 18) {
    Console.WriteLine("You can vote!");
}
\`\`\`

## Nested If
\`\`\`csharp
bool isMember = true;
int age = 25;

if (isMember) {
    if (age >= 18) {
        Console.WriteLine("Welcome!");
    }
}
\`\`\`

## Null Check
\`\`\`csharp
string? name = GetName();

if (name != null) {
    Console.WriteLine(name.Length);
}
\`\`\``,
          estimatedMinutes: 15,
        },
      ],
    },
    // Module 6: if-else
    {
      title: "If-Else and If-Else-If",
      description: "Conditional branching",
      lessons: [
        {
          title: "If-Else in C#",
          slug: "csharp-if-else",
          content: `# If-Else

\`\`\`csharp
int temperature = 25;

if (temperature > 30) {
    Console.WriteLine("It's hot!");
} else {
    Console.WriteLine("It's nice outside.");
}
\`\`\`

## If-Else-If Chain
\`\`\`csharp
int score = 75;
string grade;

if (score >= 90) {
    grade = "A";
} else if (score >= 80) {
    grade = "B";
} else if (score >= 70) {
    grade = "C";
} else if (score >= 60) {
    grade = "D";
} else {
    grade = "F";
}

Console.WriteLine("Grade: " + grade);  // C
\`\`\`

## Ternary Operator
\`\`\`csharp
int age = 20;
string status = age >= 18 ? "Adult" : "Minor";
\`\`\``,
          estimatedMinutes: 15,
        },
      ],
    },
    // Module 7: Switch
    {
      title: "Switch Statement",
      description: "Switch-case and pattern matching",
      lessons: [
        {
          title: "Switch in C#",
          slug: "csharp-switch",
          content: `# Switch Statement

## Basic Switch
\`\`\`csharp
string day = "Monday";

switch (day) {
    case "Monday":
        Console.WriteLine("Start");
        break;
    case "Friday":
        Console.WriteLine("TGIF");
        break;
    case "Saturday":
    case "Sunday":
        Console.WriteLine("Weekend");
        break;
    default:
        Console.WriteLine("Regular");
        break;
}
\`\`\`

## Switch Expression (C# 8+)
\`\`\`csharp
string dayType = day switch {
    "Monday" or "Tuesday" or "Wednesday" or "Thursday" or "Friday" => "Weekday",
    "Saturday" or "Sunday" => "Weekend",
    _ => "Unknown"
};
\`\`\`

## Pattern Matching Switch
\`\`\`csharp
object obj = 42;
string description = obj switch {
    int i when i > 0 => "Positive int",
    int i => "Non-positive int",
    string s => $"String: {s}",
    null => "Null",
    _ => "Other"
};
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 8: For Loop
    {
      title: "For Loop",
      description: "Traditional and foreach loops",
      lessons: [
        {
          title: "For Loop in C#",
          slug: "csharp-for",
          content: `# For Loop

## Basic For
\`\`\`csharp
for (int i = 0; i < 5; i++) {
    Console.WriteLine(i);  // 0, 1, 2, 3, 4
}
\`\`\`

## Foreach
\`\`\`csharp
int[] numbers = { 1, 2, 3, 4, 5 };

foreach (int num in numbers) {
    Console.WriteLine(num);
}
\`\`\`

## Nested Loops
\`\`\`csharp
for (int i = 1; i <= 5; i++) {
    for (int j = 1; j <= i; j++) {
        Console.Write("* ");
    }
    Console.WriteLine();
}
\`\`\`

## Range Operator
\`\`\`csharp
foreach (int i in 0..5) {
    Console.WriteLine(i);  // 0, 1, 2, 3, 4
}
\`\`\``,
          estimatedMinutes: 20,
          exercises: [
            {
              title: "FizzBuzz C#",
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
          title: "While and Do-While in C#",
          slug: "csharp-while",
          content: `# While Loop

\`\`\`csharp
int count = 0;
while (count < 5) {
    Console.WriteLine(count);
    count++;
}
\`\`\`

# Do-While Loop

\`\`\`csharp
int num = 1;
do {
    Console.WriteLine(num);
    num *= 2;
} while (num <= 16);
// Output: 1, 2, 4, 8, 16
\`\`\`

## Key Difference
- **while**: Checks before execution
- **do-while**: Executes at least once

## Infinite Loop
\`\`\`csharp
while (true) {
    Console.Write("Enter command: ");
    string? input = Console.ReadLine();
    if (input == "quit") break;
}
\`\`\``,
          estimatedMinutes: 15,
        },
      ],
    },
    // Module 10: Loop Control
    {
      title: "Loop Control",
      description: "Break, continue, and goto",
      lessons: [
        {
          title: "Break and Continue",
          slug: "csharp-loop-control",
          content: `# Break and Continue

## Break
\`\`\`csharp
for (int i = 0; i < 100; i++) {
    if (i == 5) break;
    Console.WriteLine(i);  // 0, 1, 2, 3, 4
}
\`\`\`

## Continue
\`\`\`csharp
for (int i = 0; i < 10; i++) {
    if (i % 2 == 0) continue;  // skip even
    Console.WriteLine(i);  // 1, 3, 5, 7, 9
}
\`\`\`

## Break with Label
\`\`\`csharp
outer:
for (int i = 0; i < 5; i++) {
    for (int j = 0; j < 5; j++) {
        if (j == 3) break outer;
        Console.Write($"{i},{j} ");
    }
}
\`\`\``,
          estimatedMinutes: 15,
        },
      ],
    },
    // Module 11: Arrays
    {
      title: "Arrays",
      description: "Working with arrays",
      lessons: [
        {
          title: "Array Basics",
          slug: "csharp-arrays",
          content: `# Arrays

## Declaration
\`\`\`csharp
int[] nums = new int[5];         // [0,0,0,0,0]
int[] scores = { 90, 85, 95, 80, 88 };
string[] names = new string[] { "Alice", "Bob" };
\`\`\`

## Access
\`\`\`csharp
Console.WriteLine(scores[0]);     // 90
Console.WriteLine(scores.Length);  // 5
\`\`\`

## Looping
\`\`\`csharp
// For
for (int i = 0; i < scores.Length; i++) {
    Console.WriteLine(scores[i]);
}

// Foreach
foreach (int score in scores) {
    Console.WriteLine(score);
}
\`\`\`

## Methods
\`\`\`csharp
Array.Sort(scores);
Array.Reverse(scores);
int index = Array.IndexOf(scores, 95);
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 12: Advanced Arrays
    {
      title: "Advanced Arrays",
      description: "Multi-dimensional arrays and Array class",
      lessons: [
        {
          title: "Advanced Array Operations",
          slug: "csharp-advanced-arrays",
          content: `# Advanced Arrays

## Multi-Dimensional
\`\`\`csharp
int[,] matrix = {
    { 1, 2, 3 },
    { 4, 5, 6 },
    { 7, 8, 9 }
};

Console.WriteLine(matrix[1, 2]);  // 6
\`\`\`

## Jagged Arrays
\`\`\`csharp
int[][] jagged = new int[3][];
jagged[0] = new int[] { 1, 2 };
jagged[1] = new int[] { 3, 4, 5 };
jagged[2] = new int[] { 6 };
\`\`\`

## Span (Performance)
\`\`\`csharp
Span<int> span = stackalloc int[10];
for (int i = 0; i < 10; i++) span[i] = i;
\`\`\`

## Array Patterns
\`\`\`csharp
int[] nums = { 1, 2, 3, 4, 5 };

// Filter
var evens = nums.Where(n => n % 2 == 0).ToArray();

// Transform
var doubled = nums.Select(n => n * 2).ToArray();

// Sum
var sum = nums.Sum();
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 13: Objects (Classes)
    {
      title: "Classes and Objects",
      description: "Creating classes and objects",
      lessons: [
        {
          title: "Classes in C#",
          slug: "csharp-classes",
          content: `# Classes

## Basic Class
\`\`\`csharp
public class Person {
    public string Name { get; set; }
    public int Age { get; set; }
    
    public Person(string name, int age) {
        Name = name;
        Age = age;
    }
    
    public string Greet() => \$"Hi, I'm {Name}!";
}

var person = new Person("Alice", 25);
Console.WriteLine(person.Greet());
\`\`\`

## Auto-Property
\`\`\`csharp
public class Product {
    public string Name { get; set; } = "";
    public decimal Price { get; set; }
    public bool InStock { get; set; } = true;
}
\`\`\`

## Init-Only (C# 9+)
\`\`\`csharp
public class User {
    public string Name { get; init; }
    public DateTime Created { get; init; } = DateTime.Now;
}
\`\`\``,
          estimatedMinutes: 25,
        },
      ],
    },
    // Module 14: Advanced Objects
    {
      title: "Inheritance and Interfaces",
      description: "OOP concepts in C#",
      lessons: [
        {
          title: "Inheritance and Interfaces",
          slug: "csharp-inheritance",
          content: `# Inheritance

\`\`\`csharp
public class Animal {
    public string Name { get; set; }
    public virtual string Speak() => "...";
}

public class Dog : Animal {
    public override string Speak() => "Woof!";
}
\`\`\`

# Interfaces

\`\`\`csharp
public interface IWalkable {
    void Walk();
}

public interface ITalkable {
    void Talk();
}

public class Robot : IWalkable, ITalkable {
    public void Walk() => Console.WriteLine("Walking...");
    public void Talk() => Console.WriteLine("Talking...");
}
\`\`\`

# Abstract Classes

\`\`\`csharp
public abstract class Shape {
    public abstract double Area();
    public void Describe() => Console.WriteLine(\$"Area: {Area()}");
}

public class Circle : Shape {
    public double Radius { get; set; }
    public override double Area() => Math.PI * Radius * Radius;
}
\`\`\``,
          estimatedMinutes: 25,
        },
      ],
    },
    // Module 15: Functions
    {
      title: "Methods",
      description: "Defining and using methods",
      lessons: [
        {
          title: "Methods in C#",
          slug: "csharp-methods",
          content: `# Methods

## Basic Methods
\`\`\`csharp
static int Add(int a, int b) => a + b;

static string Greet(string name, string greeting = "Hello")
    => \$"{greeting}, {name}!";

// Out parameters
static bool TryDivide(int a, int b, out double result) {
    if (b == 0) { result = 0; return false; }
    result = (double)a / b;
    return true;
}

// Tuple returns
static (int sum, int product) Calculate(int a, int b)
    => (a + b, a * b);
\`\`\`

## Overloading
\`\`\`csharp
static int Add(int a, int b) => a + b;
static double Add(double a, double b) => a + b;
static string Add(string a, string b) => a + b;
\`\`\`

## Local Functions
\`\`\`csharp
int Factorial(int n) {
    return n <= 1 ? 1 : n * Factorial(n - 1);
}
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 16: Advanced Functions
    {
      title: "LINQ and Lambdas",
      description: "Language Integrated Query and lambda expressions",
      lessons: [
        {
          title: "LINQ and Lambda",
          slug: "csharp-linq",
          content: `# LINQ

## Query Syntax
\`\`\`csharp
var numbers = new[] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

var evens = from n in numbers
             where n % 2 == 0
             select n;
\`\`\`

## Method Syntax
\`\`\`csharp
var evens = numbers.Where(n => n % 2 == 0).ToList();

var sum = numbers.Sum();
var first = numbers.First(n => n > 5);
var ordered = numbers.OrderByDescending(n => n);
\`\`\`

## Chaining
\`\`\`csharp
var result = numbers
    .Where(n => n > 3)
    .Select(n => n * 2)
    .OrderBy(n => n)
    .ToList();
\`\`\`

## Lambda Expressions
\`\`\`csharp
Func<int, int> square = x => x * x;
Action<string> print = s => Console.WriteLine(s);
\`\`\``,
          estimatedMinutes: 25,
        },
      ],
    },
    // Module 17: Error Handling
    {
      title: "Exception Handling",
      description: "Try-catch-finally and custom exceptions",
      lessons: [
        {
          title: "Exception Handling",
          slug: "csharp-exceptions",
          content: `# Exception Handling

## Try-Catch-Finally
\`\`\`csharp
try {
    int result = 10 / 0;
} catch (DivideByZeroException e) {
    Console.WriteLine("Error: " + e.Message);
} finally {
    Console.WriteLine("Always runs");
}
\`\`\`

## Multiple Catch
\`\`\`csharp
try {
    var data = File.ReadAllText("file.txt");
} catch (FileNotFoundException e) {
    Console.WriteLine("File not found");
} catch (IOException e) {
    Console.WriteLine("IO Error");
} catch (Exception e) {
    Console.WriteLine("Other error");
}
\`\`\`

## Custom Exceptions
\`\`\`csharp
public class InsufficientFundsException : Exception {
    public decimal Amount { get; }
    
    public InsufficientFundsException(decimal amount)
        : base(\$"Insufficient funds: needed {amount:C}") {
        Amount = amount;
    }
}
\`\`\`

## throw and when
\`\`\`csharp
try {
    throw new InvalidOperationException("Bad state");
} catch (Exception e) when (e.Message.Contains("Bad")) {
    Console.WriteLine("Caught bad state");
}
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 18: Async/Await
    {
      title: "Async Programming",
      description: "Async/await and Task",
      lessons: [
        {
          title: "Async/Await",
          slug: "csharp-async",
          content: `# Async/Await

## Basic Async
\`\`\`csharp
static async Task<string> FetchDataAsync(string url) {
    using var client = new HttpClient();
    string content = await client.GetStringAsync(url);
    return content;
}
\`\`\`

## Async Methods
\`\`\`csharp
static async Task<int> ReadFileAsync(string path) {
    string content = await File.ReadAllTextAsync(path);
    return content.Length;
}
\`\`\`

## Parallel Execution
\`\`\`csharp
var task1 = FetchDataAsync("/api/users");
var task2 = FetchDataAsync("/api/posts");
await Task.WhenAll(task1, task2);
\`\`\`

## Async foreach
\`\`\`csharp
await foreach (var item in GetItemsAsync()) {
    Console.WriteLine(item);
}
\`\`\``,
          estimatedMinutes: 25,
        },
      ],
    },
    // Module 19: Collections
    {
      title: "Collections Framework",
      description: "List, Dictionary, and common collections",
      lessons: [
        {
          title: "Collections",
          slug: "csharp-collections",
          content: `# Collections

## List<T>
\`\`\`csharp
var names = new List<string> { "Alice", "Bob" };
names.Add("Charlie");
names.Remove("Bob");
names.Contains("Alice");  // true
names.Sort();
\`\`\`

## Dictionary<TKey, TValue>
\`\`\`csharp
var ages = new Dictionary<string, int>();
ages["Alice"] = 25;
ages["Bob"] = 30;

if (ages.TryGetValue("Alice", out int age)) {
    Console.WriteLine(age);
}
\`\`\`

## HashSet<T>
\`\`\`csharp
var unique = new HashSet<int> { 1, 2, 3, 2, 1 };
Console.WriteLine(unique.Count);  // 3
\`\`\`

## Queue<T> and Stack<T>
\`\`\`csharp
var queue = new Queue<string>();
queue.Enqueue("First");
queue.Enqueue("Second");
string first = queue.Dequeue();

var stack = new Stack<string>();
stack.Push("First");
stack.Push("Second");
string top = stack.Pop();
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 20: Project Application
    {
      title: "Project — Task Manager",
      description: "Build a complete task management application",
      lessons: [
        {
          title: "Task Manager Application",
          slug: "csharp-project-tasks",
          content: `# Task Manager Application

## Complete Application
\`\`\`csharp
using System;
using System.Collections.Generic;
using System.Linq;

class Task {
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public bool IsCompleted { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
}

class TaskManager {
    private List<Task> _tasks = new();
    private int _nextId = 1;
    
    public void Add(string title) {
        _tasks.Add(new Task { Id = _nextId++, Title = title });
        Console.WriteLine("Task added!");
    }
    
    public void Complete(int id) {
        var task = _tasks.FirstOrDefault(t => t.Id == id);
        if (task != null) {
            task.IsCompleted = true;
            Console.WriteLine("Completed!");
        } else {
            Console.WriteLine("Not found.");
        }
    }
    
    public void Remove(int id) {
        _tasks.RemoveAll(t => t.Id == id);
        Console.WriteLine("Removed!");
    }
    
    public void ListAll() {
        if (!_tasks.Any()) {
            Console.WriteLine("No tasks.");
            return;
        }
        foreach (var t in _tasks) {
            string status = t.IsCompleted ? "[x]" : "[ ]";
            Console.WriteLine(\$"  {t.Id}. {status} {t.Title}");
        }
    }
    
    public void Stats() {
        int completed = _tasks.Count(t => t.IsCompleted);
        Console.WriteLine(\$"Total: {_tasks.Count}, Completed: {completed}");
    }
}

class Program {
    static void Main() {
        var manager = new TaskManager();
        
        while (true) {
            Console.WriteLine("\\n1. Add  2. List  3. Complete  4. Remove  5. Stats  6. Exit");
            Console.Write("Choice: ");
            string? choice = Console.ReadLine();
            
            switch (choice) {
                case "1":
                    Console.Write("Title: ");
                    manager.Add(Console.ReadLine() ?? "");
                    break;
                case "2": manager.ListAll(); break;
                case "3":
                    Console.Write("ID: ");
                    if (int.TryParse(Console.ReadLine(), out int id))
                        manager.Complete(id);
                    break;
                case "4":
                    Console.Write("ID: ");
                    if (int.TryParse(Console.ReadLine(), out int rid))
                        manager.Remove(rid);
                    break;
                case "5": manager.Stats(); break;
                case "6": Console.WriteLine("Goodbye!"); return;
                default: Console.WriteLine("Invalid"); break;
            }
        }
    }
}
\`\`\`

## Concepts Used
✅ Variables and Types
✅ Operators
✅ if/else-if/switch
✅ for/foreach loops
✅ Arrays and Lists
✅ Objects (Classes)
✅ Methods
✅ LINQ
✅ Exception Handling
✅ Collections`,
          estimatedMinutes: 40,
          exercises: [
            {
              title: "Extend Task Manager",
              description: "Add priority, due dates, and file saving",
              requirements: ["Add priority field", "Add due date", "Save to JSON", "Load on startup"],
              points: 30,
            },
          ],
        },
      ],
    },
  ],
};
