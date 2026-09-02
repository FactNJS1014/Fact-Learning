import type { CourseContent } from "../seed-content";

export const rustBasic20Modules: CourseContent = {
  slug: "rust-basic",
  modules: [
    // Module 1: Introduction
    {
      title: "Introduction to Rust",
      description: "What is Rust, setup, and first program",
      lessons: [
        {
          title: "What is Rust?",
          slug: "rust-intro",
          content: `# What is Rust?

Rust is a systems language focused on safety, speed, and concurrency.

## Why Learn Rust?
- **Memory safety** without garbage collector
- **Zero-cost abstractions**
- **Fearless concurrency**
- **Great tooling** (cargo, clippy, rustfmt)

## Install Rust
\`\`\`bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
\`\`\`

## Hello World
\`\`\`rust
fn main() {
    println!("Hello, World!");
}
\`\`\`

## Cargo (Build Tool)
\`\`\`bash
cargo new my-app
cd my-app
cargo run
cargo build --release
\`\`\``,
          estimatedMinutes: 15,
          exercises: [
            {
              title: "Hello Rust",
              description: "Create a program that prints your name and age",
              requirements: ["Use println!", "Use variables", "Run with cargo run"],
              points: 10,
            },
          ],
        },
        {
          title: "Rust Development Setup",
          slug: "rust-setup",
          content: `# Setting Up Rust

## Install
\`\`\`bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
\`\`\`

## Verify
\`\`\`bash
rustc --version
cargo --version
\`\`\`

## IDE
- **VS Code** with rust-analyzer
- **RustRover** (JetBrains)

## Project Structure
\`\`\`
my-app/
├── src/
│   └── main.rs
├── Cargo.toml
└── Cargo.lock
\`\`\``,
          estimatedMinutes: 10,
        },
      ],
    },
    // Module 2: Variables
    {
      title: "Variables and Mutability",
      description: "Declaring variables, shadowing, and constants",
      lessons: [
        {
          title: "Variables in Rust",
          slug: "rust-variables",
          content: `# Variables

## Basic Variables
\`\`\`rust
let x = 5;           // immutable by default
let mut y = 10;      // mutable
y += 1;

const MAX: i32 = 100; // constant (must have type)
static COUNT: i32 = 0; // static variable
\`\`\`

## Shadowing
\`\`\`rust
let x = 5;
let x = x + 1;       // shadowing
let x = x * 2;       // 12

// Can change type!
let spaces = "   ";
let spaces = spaces.len();  // 3 (now usize)
\`\`\`

## Basic Types
\`\`\`rust
let i: i32 = 42;          // integer
let f: f64 = 3.14;        // float
let b: bool = true;        // boolean
let c: char = 'A';         // char (4 bytes)
let s: &str = "hello";     // string slice
let owned: String = String::from("hello"); // owned string
\`\`\`

## Integer Types
\`\`\`rust
let a: i8 = -128;    // 8-bit signed
let b: u8 = 255;     // 8-bit unsigned
let c: i32 = 42;     // 32-bit signed
let d: u64 = 100;    // 64-bit unsigned
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 3: Data Types
    {
      title: "Data Types Deep Dive",
      description: "Tuples, arrays, slices, and strings",
      lessons: [
        {
          title: "Composite Types",
          slug: "rust-composite",
          content: `# Composite Types

## Tuples
\`\`\`rust
let tuple: (i32, f64, &str) = (1, 2.0, "three");
let (x, y, z) = tuple;  // destructuring
let first = tuple.0;    // indexing
\`\`\`

## Arrays (Fixed Size)
\`\`\`rust
let arr: [i32; 5] = [1, 2, 3, 4, 5];
let first = arr[0];
let len = arr.len();
\`\`\`

## Slices
\`\`\`rust
let s = [1, 2, 3, 4, 5];
let slice = &s[1..3];  // [2, 3]
\`\`\`

## Strings
\`\`\`rust
// &str (string slice, immutable)
let s: &str = "Hello";

// String (owned, mutable)
let mut s = String::from("Hello");
s.push_str(", World!");
s.push('!');

// Format
let name = "Alice";
let greeting = format!("Hello, {}!", name);
\`\`\`

## String Methods
\`\`\`rust
let s = "Hello, World!";
s.len();              // 13
s.contains("World");  // true
s.to_uppercase();     // "HELLO, WORLD!"
s.split(", ");        // ["Hello", "World!"]
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 4: Operators
    {
      title: "Operators",
      description: "Arithmetic, comparison, logical, and bitwise operators",
      lessons: [
        {
          title: "Rust Operators",
          slug: "rust-operators",
          content: `# Operators

## Arithmetic
\`\`\`rust
let a = 10, b = 3;
println!("{}", a + b);   // 13
println!("{}", a - b);   // 7
println!("{}", a * b);   // 30
println!("{}", a / b);   // 3 (integer)
println!("{}", a % b);   // 1
\`\`\`

## Comparison
\`\`\`rust
println!("{}", 5 == 5);  // true
println!("{}", 5 != 3);  // true
println!("{}", 5 > 3);   // true
println!("{}", 5 <= 5);  // true
\`\`\`

## Logical
\`\`\`rust
println!("{}", true && false);  // false
println!("{}", true || false);  // true
println!("{}", !true);          // false
\`\`\`

## Bitwise
\`\`\`rust
println!("{}", 0b1010 & 0b1100);  // 8 (AND)
println!("{}", 0b1010 | 0b1100);  // 14 (OR)
println!("{}", 0b1010 ^ 0b1100);  // 6 (XOR)
println!("{}", 1 << 3);           // 8 (shift left)
\`\`\`

## Range
\`\`\`rust
for i in 0..5 { println!("{}", i); }      // 0, 1, 2, 3, 4
for i in 0..=5 { println!("{}", i); }     // 0, 1, 2, 3, 4, 5
\`\`\``,
          estimatedMinutes: 15,
        },
      ],
    },
    // Module 5: if
    {
      title: "If Statement",
      description: "Single if condition",
      lessons: [
        {
          title: "If in Rust",
          slug: "rust-if",
          content: `# If Statement

\`\`\`rust
let age = 20;

if age >= 18 {
    println!("You can vote!");
}
\`\`\`

## If as Expression
\`\`\`rust
let age = 20;
let status = if age >= 18 {
    "Adult"
} else {
    "Minor"
};

println!("{}", status);  // Adult
\`\`\`

## Nested If
\`\`\`rust
let is_member = true;
let age = 25;

if is_member {
    if age >= 18 {
        println!("Welcome!");
    }
}
\`\`\`

> **Rust特色:** if 是表达式，可以返回值。`,
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
          title: "If-Else in Rust",
          slug: "rust-if-else",
          content: `# If-Else

\`\`\`rust
let temperature = 25;

if temperature > 30 {
    println!("It's hot!");
} else {
    println!("It's nice outside.");
}
\`\`\`

## If-Else-If Chain
\`\`\`rust
let score = 75;
let grade = if score >= 90 {
    'A'
} else if score >= 80 {
    'B'
} else if score >= 70 {
    'C'
} else if score >= 60 {
    'D'
} else {
    'F'
};

println!("Grade: {}", grade);  // C
\`\`\`

## Guard Pattern
\`\`\`rust
fn process(n: i32) -> String {
    if n <= 0 {
        return String::from("must be positive");
    }
    format!("Processing {}", n)
}
\`\`\``,
          estimatedMinutes: 15,
        },
      ],
    },
    // Module 7: Match (Switch)
    {
      title: "Match Expression",
      description: "Pattern matching in Rust",
      lessons: [
        {
          title: "Match Expression",
          slug: "rust-match",
          content: `# Match Expression

## Basic Match
\`\`\`rust
let day = "Monday";

match day {
    "Monday" => println!("Start"),
    "Friday" => println!("TGIF"),
    "Saturday" | "Sunday" => println!("Weekend"),
    _ => println!("Regular"),
}
\`\`\`

## Match with Values
\`\`\`rust
let number = 42;

match number {
    1 => println!("One"),
    2..=10 => println!("Small"),
    11..=100 => println!("Medium"),
    _ => println!("Large"),
}
\`\`\`

## Match with Enums
\`\`\`rust
enum Direction { North, South, East, West }

let dir = Direction::North;

match dir {
    Direction::North => println!("Up"),
    Direction::South => println!("Down"),
    Direction::East => println!("Right"),
    Direction::West => println!("Left"),
}
\`\`\`

## if let
\`\`\`rust
let some_value: Option<i32> = Some(42);

if let Some(value) = some_value {
    println!("Got: {}", value);
}
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 8: For Loop
    {
      title: "For Loop",
      description: "Iteration patterns in Rust",
      lessons: [
        {
          title: "For Loop in Rust",
          slug: "rust-for",
          content: `# For Loop

## Range
\`\`\`rust
for i in 0..5 {
    println!("{}", i);  // 0, 1, 2, 3, 4
}
\`\`\`

## Iterate Collection
\`\`\`rust
let fruits = vec!["apple", "banana", "cherry"];

for fruit in &fruits {
    println!("{}", fruit);
}
\`\`\`

## With Index
\`\`\`rust
for (i, fruit) in fruits.iter().enumerate() {
    println!("{}. {}", i + 1, fruit);
}
\`\`\`

## Nested Loops
\`\`\`rust
for i in 1..=5 {
    for j in 1..=i {
        print!("* ");
    }
    println!();
}
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 9: While and Do-While
    {
      title: "While and Loop",
      description: "While and infinite loop patterns",
      lessons: [
        {
          title: "While and Loop in Rust",
          slug: "rust-while",
          content: `# While Loop

\`\`\`rust
let mut count = 0;
while count < 5 {
    println!("{}", count);
    count += 1;
}
\`\`\`

## Loop (Infinite Loop)
\`\`\`rust
loop {
    println!("Infinite!");
    break;  // exit
}
\`\`\`

## Loop with Return Value
\`\`\`rust
let result = loop {
    counter += 1;
    if counter == 10 {
        break counter * 2;  // returns 20
    }
};
\`\`\`

## Do-While Pattern
\`\`\`rust
let mut num = 1;
loop {
    println!("{}", num);
    num *= 2;
    if num > 16 {
        break;
    }
}
// Output: 1, 2, 4, 8, 16
\`\`\`

> **Rust特色:** 没有do-while，用loop代替。`,
          estimatedMinutes: 15,
        },
      ],
    },
    // Module 10: Loop Control
    {
      title: "Loop Control",
      description: "Break, continue, and labeled loops",
      lessons: [
        {
          title: "Break and Continue",
          slug: "rust-loop-control",
          content: `# Break and Continue

## Break
\`\`\`rust
for i in 0..100 {
    if i == 5 { break; }
    println!("{}", i);  // 0, 1, 2, 3, 4
}
\`\`\`

## Continue
\`\`\`rust
for i in 0..10 {
    if i % 2 == 0 { continue; }  // skip even
    println!("{}", i);  // 1, 3, 5, 7, 9
}
\`\`\`

## Labeled Break (Nested Loops)
\`\`\`rust
'outer: for i in 0..5 {
    for j in 0..5 {
        if j == 3 { break 'outer; }
        print!("{} ", j);
    }
}
\`\`\`

## Loop with Return
\`\`\`rust
let x = loop {
    counter += 1;
    if counter == 10 {
        break counter * 2;
    }
};
println!("Result: {}", x);  // 20
\`\`\``,
          estimatedMinutes: 15,
        },
      ],
    },
    // Module 11: Arrays
    {
      title: "Arrays and Slices",
      description: "Working with arrays and slices",
      lessons: [
        {
          title: "Arrays and Slices",
          slug: "rust-arrays",
          content: `# Arrays

## Basic Arrays
\`\`\`rust
let arr: [i32; 5] = [1, 2, 3, 4, 5];
let first = arr[0];
let len = arr.len();
\`\`\`

## Initialize
\`\`\`rust
let zeros = [0; 10];  // [0, 0, 0, ..., 0]
\`\`\`

## Slices
\`\`\`rust
let s = [1, 2, 3, 4, 5];
let slice = &s[1..3];  // [2, 3]
let all = &s[..];      // [1, 2, 3, 4, 5]
let from = &s[2..];    // [3, 4, 5]
\`\`\`

## Iterate
\`\`\`rust
let arr = [10, 20, 30];

for item in arr.iter() {
    println!("{}", item);
}
\`\`\`

## Vec (Dynamic Array)
\`\`\`rust
let mut v: Vec<i32> = Vec::new();
v.push(1);
v.push(2);

let v = vec![1, 2, 3];
v.get(0);  // Option<&i32>
v.len();
\`\`\``,
          estimatedMinutes: 25,
        },
      ],
    },
    // Module 12: Advanced Arrays
    {
      title: "Vec and Common Patterns",
      description: "Vector operations and common patterns",
      lessons: [
        {
          title: "Vec Operations",
          slug: "rust-vec",
          content: `# Vec Operations

## Create
\`\`\`rust
let mut v = vec![1, 2, 3, 4, 5];
\`\`\`

## Add/Remove
\`\`\`rust
v.push(6);
v.pop();  // removes last
v.remove(0);  // removes by index
\`\`\`

## Search
\`\`\`rust
v.contains(&3);  // true
v.iter().position(|&x| x == 3);  // Option<usize>
\`\`\`

## Transform
\`\`\`rust
let doubled: Vec<i32> = v.iter().map(|x| x * 2).collect();
let evens: Vec<&i32> = v.iter().filter(|&&x| x % 2 == 0).collect();
\`\`\`

## Sort
\`\`\`rust
v.sort();
v.sort_by(|a, b| b.cmp(a));  // descending
v.reverse();
\`\`\`

## Common Patterns
\`\`\`rust
let sum: i32 = v.iter().sum();
let max = v.iter().max();
let min = v.iter().min();
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 13: Objects (Structs)
    {
      title: "Structs",
      description: "Defining and using structs",
      lessons: [
        {
          title: "Structs in Rust",
          slug: "rust-structs",
          content: `# Structs

## Basic Struct
\`\`\`rust
struct User {
    name: String,
    email: String,
    age: u32,
    active: bool,
}

let user = User {
    name: String::from("Alice"),
    email: String::from("alice@example.com"),
    age: 25,
    active: true,
};

println!("{}", user.name);
\`\`\`

## Methods
\`\`\`rust
impl User {
    fn greet(&self) -> String {
        format!("Hi, I'm {}!", self.name)
    }
    
    fn new(name: &str, email: &str) -> User {
        User {
            name: String::from(name),
            email: String::from(email),
            age: 0,
            active: true,
        }
    }
}

println!("{}", user.greet());
\`\`\`

## Tuple Struct
\`\`\`rust
struct Color(u8, u8, u8);
let red = Color(255, 0, 0);
\`\`\``,
          estimatedMinutes: 25,
          exercises: [
            {
              title: "Student Struct",
              description: "Create a Student struct with methods",
              requirements: ["Define struct", "Add methods", "Calculate GPA"],
              points: 20,
            },
          ],
        },
      ],
    },
    // Module 14: Advanced Objects
    {
      title: "Enums and Pattern Matching",
      description: "Enums with data and pattern matching",
      lessons: [
        {
          title: "Enums and Pattern Matching",
          slug: "rust-enums",
          content: `# Enums

## Basic Enum
\`\`\`rust
enum Direction { North, South, East, West }

let dir = Direction::North;
\`\`\`

## Enum with Data
\`\`\`rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(u8, u8, u8),
}

let msg = Message::Write(String::from("Hello"));

match msg {
    Message::Quit => println!("Quit"),
    Message::Move { x, y } => println!("Move to {},{}", x, y),
    Message::Write(s) => println!("Text: {}", s),
    Message::ChangeColor(r, g, b) => println!("Color: {},{},{}", r, g, b),
}
\`\`\`

## Option<T>
\`\`\`rust
let some_number: Option<i32> = Some(42);
let no_number: Option<i32> = None;

match some_number {
    Some(n) => println!("Got: {}", n),
    None => println!("Nothing"),
}
\`\`\`

## Result<T, E>
\`\`\`rust
fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err(String::from("Division by zero"))
    } else {
        Ok(a / b)
    }
}
\`\`\``,
          estimatedMinutes: 25,
        },
      ],
    },
    // Module 15: Functions
    {
      title: "Functions",
      description: "Defining functions, closures, and higher-order functions",
      lessons: [
        {
          title: "Functions in Rust",
          slug: "rust-functions",
          content: `# Functions

## Basic Functions
\`\`\`rust
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

fn main() {
    let msg = greet("Alice");
    println!("{}", msg);
}
\`\`\`

## Expressions vs Statements
\`\`\`rust
fn add(a: i32, b: i32) -> i32 {
    a + b  // no semicolon = expression (return value)
}
\`\`\`

## Closures
\`\`\`rust
let add = |a, b| a + b;
let result = add(3, 4);  // 7

let double = |x| x * 2;
\`\`\`

## Higher-Order Functions
\`\`\`rust
let numbers = vec![1, 2, 3, 4, 5];

let sum: i32 = numbers.iter().fold(0, |acc, &x| acc + x);
let evens: Vec<&i32> = numbers.iter().filter(|&&x| x % 2 == 0).collect();
let doubled: Vec<i32> = numbers.iter().map(|&x| x * 2).collect();
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 16: Advanced Functions
    {
      title: "Error Handling",
      description: "Result, Option, and error propagation",
      lessons: [
        {
          title: "Error Handling in Rust",
          slug: "rust-errors",
          content: `# Error Handling

## Result Type
\`\`\`rust
fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err(String::from("Division by zero"))
    } else {
        Ok(a / b)
    }
}

match divide(10.0, 3.0) {
    Ok(result) => println!("Result: {}", result),
    Err(e) => println!("Error: {}", e),
}
\`\`\`

## ? Operator (Propagation)
\`\`\`rust
use std::fs;

fn read_file(path: &str) -> Result<String, std::io::Error> {
    let content = fs::read_to_string(path)?;  // propagates error
    Ok(content)
}
\`\`\`

## unwrap and expect
\`\`\`rust
let value = some_result.unwrap();           // panics on Err
let value = some_result.expect("Failed");  // custom message
\`\`\`

## Custom Error Types
\`\`\`rust
#[derive(Debug)]
enum AppError {
    NotFound,
    Unauthorized,
    DatabaseError(String),
}

impl std::fmt::Display for AppError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match self {
            AppError::NotFound => write!(f, "Not found"),
            AppError::Unauthorized => write!(f, "Unauthorized"),
            AppError::DatabaseError(msg) => write!(f, "DB Error: {}", msg),
        }
    }
}
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 17: Ownership
    {
      title: "Ownership and Borrowing",
      description: "Rust's unique memory management",
      lessons: [
        {
          title: "Ownership Rules",
          slug: "rust-ownership",
          content: `# Ownership

Three Rules:
1. Each value has one owner
2. Only one owner at a time
3. Value is dropped when owner goes out of scope

## Move Semantics
\`\`\`rust
let s1 = String::from("hello");
let s2 = s1;  // s1 is MOVED, no longer valid
// println!("{}", s1); // ERROR!
println!("{}", s2);    // OK
\`\`\`

## Clone
\`\`\`rust
let s1 = String::from("hello");
let s2 = s1.clone();  // deep copy
println!("{} {}", s1, s2);  // both valid
\`\`\`

## References (Borrowing)
\`\`\`rust
fn print_len(s: &String) {  // borrow
    println!("Length: {}", s.len());
}

let s = String::from("hello");
print_len(&s);  // s still valid!
\`\`\`

## Mutable References
\`\`\`rust
fn add_world(s: &mut String) {
    s.push_str(", world!");
}

let mut s = String::from("hello");
add_world(&mut s);
println!("{}", s);  // "hello, world!"
\`\`\``,
          estimatedMinutes: 25,
        },
      ],
    },
    // Module 18: Traits
    {
      title: "Traits",
      description: "Defining shared behavior",
      lessons: [
        {
          title: "Traits",
          slug: "rust-traits",
          content: `# Traits

## Defining Traits
\`\`\`rust
trait Summary {
    fn summarize(&self) -> String;
}
\`\`\`

## Implementing Traits
\`\`\`rust
struct Article {
    title: String,
    content: String,
}

impl Summary for Article {
    fn summarize(&self) -> String {
        format!("{}: {}...", self.title, &self.content[..50])
    }
}
\`\`\`

## Trait Bounds
\`\`\`rust
fn notify(item: &impl Summary) {
    println!("Breaking: {}", item.summarize());
}

// Generic with trait bound
fn display<T: Summary + std::fmt::Display>(item: &T) {
    println!("{}", item);
}
\`\`\`

## Default Implementations
\`\`\`rust
trait Summary {
    fn summarize(&self) -> String {
        String::from("(Read more...)")
    }
}
\`\`\``,
          estimatedMinutes: 25,
        },
      ],
    },
    // Module 19: Error Handling Patterns
    {
      title: "Error Handling Best Practices",
      description: "Custom errors, thiserror, and anyhow",
      lessons: [
        {
          title: "Error Handling Patterns",
          slug: "rust-error-patterns",
          content: `# Error Handling Patterns

## Custom Error Enums
\`\`\`rust
#[derive(Debug)]
enum AppError {
    NotFound,
    Unauthorized,
    DatabaseError(String),
}

impl std::error::Error for AppError {}
impl std::fmt::Display for AppError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match self {
            Self::NotFound => write!(f, "Not found"),
            Self::Unauthorized => write!(f, "Unauthorized"),
            Self::DatabaseError(msg) => write!(f, "DB Error: {}", msg),
        }
    }
}
\`\`\`

## thiserror Crate
\`\`\`rust
use thiserror::Error;

#[derive(Error, Debug)]
enum AppError {
    #[error("Not found")]
    NotFound,
    #[error("Database error: {0}")]
    Db(#[from] sqlx::Error),
}
\`\`\`

## anyhow Crate
\`\`\`rust
use anyhow::{Result, Context};

fn read_config(path: &str) -> Result<Config> {
    let content = std::fs::read_to_string(path)
        .context("Failed to read config file")?;
    let config: Config = serde_json::from_str(&content)
        .context("Failed to parse config")?;
    Ok(config)
}
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 20: Project Application
    {
      title: "Project — CLI Todo App",
      description: "Build a complete CLI application",
      lessons: [
        {
          title: "CLI Todo Application",
          slug: "rust-project-todo",
          content: `# CLI Todo Application

## Complete Application

\`\`\`rust
use std::io::{self, BufRead, Write};

#[derive(Debug)]
struct Todo {
    id: u32,
    title: String,
    done: bool,
}

struct TodoApp {
    todos: Vec<Todo>,
    next_id: u32,
}

impl TodoApp {
    fn new() -> Self {
        TodoApp { todos: Vec::new(), next_id: 1 }
    }
    
    fn add(&mut self, title: &str) {
        self.todos.push(Todo {
            id: self.next_id,
            title: title.to_string(),
            done: false,
        });
        self.next_id += 1;
        println!("Added!");
    }
    
    fn list(&self) {
        if self.todos.is_empty() {
            println!("No todos.");
            return;
        }
        for todo in &self.todos {
            let status = if todo.done { "[x]" } else { "[ ]" };
            println!("  {}. {} {}", todo.id, status, todo.title);
        }
    }
    
    fn complete(&mut self, id: u32) {
        if let Some(todo) = self.todos.iter_mut().find(|t| t.id == id) {
            todo.done = true;
            println!("Completed!");
        } else {
            println!("Not found.");
        }
    }
    
    fn remove(&mut self, id: u32) {
        let len_before = self.todos.len();
        self.todos.retain(|t| t.id != id);
        if self.todos.len() < len_before {
            println!("Removed!");
        } else {
            println!("Not found.");
        }
    }
}

fn main() {
    let mut app = TodoApp::new();
    let stdin = io::stdin();
    
    loop {
        println!("\\n1. Add  2. List  3. Complete  4. Remove  5. Exit");
        print!("Choice: ");
        io::stdout().flush().unwrap();
        
        let mut choice = String::new();
        stdin.lock().read_line(&mut choice).unwrap();
        
        match choice.trim() {
            "1" => {
                print!("Title: ");
                io::stdout().flush().unwrap();
                let mut title = String::new();
                stdin.lock().read_line(&mut title).unwrap();
                app.add(title.trim());
            }
            "2" => app.list(),
            "3" => {
                print!("ID: ");
                io::stdout().flush().unwrap();
                let mut id = String::new();
                stdin.lock().read_line(&mut id).unwrap();
                if let Ok(id) = id.trim().parse() { app.complete(id); }
            }
            "4" => {
                print!("ID: ");
                io::stdout().flush().unwrap();
                let mut id = String::new();
                stdin.lock().read_line(&mut id).unwrap();
                if let Ok(id) = id.trim().parse() { app.remove(id); }
            }
            "5" => { println!("Goodbye!"); break; }
            _ => println!("Invalid"),
        }
    }
}
\`\`\`

## Concepts Used
✅ Variables (let, mut, const)
✅ Operators (+, -, ==, !=)
✅ if/else-if/match
✅ loop/for/while
✅ Vec (dynamic array)
✅ Structs (objects)
✅ Methods (impl)
✅ Enums (Option, Result)
✅ Pattern Matching
✅ Error Handling`,
          estimatedMinutes: 40,
          exercises: [
            {
              title: "Extend Todo App",
              description: "Add file persistence and priority",
              requirements: ["Save to file", "Load on startup", "Add priority", "Sort by priority"],
              points: 30,
            },
          ],
        },
      ],
    },
  ],
};
