import type { CourseContent } from "../seed-content";

export const nodejsBasic20Modules: CourseContent = {
  slug: "nodejs-basic",
  modules: [
    // Module 1: Introduction
    {
      title: "Introduction to Node.js",
      description: "What is Node.js, setup, and first program",
      lessons: [
        {
          title: "What is Node.js?",
          slug: "node-intro",
          content: `# What is Node.js?

Node.js is a JavaScript runtime built on Chrome's V8 engine.

## Why Learn Node.js?
- **JavaScript everywhere** — frontend + backend
- **Non-blocking I/O** — fast and scalable
- **Huge ecosystem** — npm packages
- **Great for**: APIs, real-time apps, microservices

## Your First Program
\`\`\`javascript
// hello.js
console.log("Hello, Node.js!");
\`\`\`

## Running
\`\`\`bash
node hello.js
\`\`\`

## Node REPL
\`\`\`bash
node
> 2 + 2
4
> .exit
\`\`\``,
          estimatedMinutes: 15,
        },
        {
          title: "Node.js Development Setup",
          slug: "node-setup",
          content: `# Setting Up Node.js

## Install
Download from nodejs.org

## Verify
\`\`\`bash
node -v
npm -v
\`\`\`

## Create Project
\`\`\`bash
mkdir my-app
cd my-app
npm init -y
\`\`\`

## Package.json
\`\`\`json
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
\`\`\``,
          estimatedMinutes: 10,
        },
      ],
    },
    // Module 2: Variables
    {
      title: "Variables and Types",
      description: "var, let, const, and JavaScript types",
      lessons: [
        {
          title: "Node.js Variables",
          slug: "node-variables",
          content: `# Variables

## var, let, const
\`\`\`javascript
var name = "Alice";      // function-scoped (avoid)
let age = 25;            // block-scoped
const PI = 3.14159;      // block-scoped, cannot reassign
\`\`\`

## Data Types
\`\`\`javascript
let str = "Hello";       // string
let num = 42;            // number
let big = 9007199254740991n; // bigint
let bool = true;         // boolean
let nothing = null;      // null
let notDefined = undefined; // undefined
let sym = Symbol('id');  // symbol
\`\`\`

## typeof
\`\`\`javascript
console.log(typeof "Hello");   // "string"
console.log(typeof 42);        // "number"
console.log(typeof true);      // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof null);      // "object" (bug!)
\`\`\`

## Template Literals
\`\`\`javascript
let name = "Alice";
let msg = \`Hello, \${name}!\`;
console.log(msg);  // Hello, Alice!
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 3: Data Types
    {
      title: "Data Types Deep Dive",
      description: "Strings, numbers, objects, and type conversion",
      lessons: [
        {
          title: "JavaScript Data Types",
          slug: "node-datatypes",
          content: `# Data Types

## Strings
\`\`\`javascript
let s = "Hello World";
s.length;           // 11
s.toUpperCase();    // "HELLO WORLD"
s.toLowerCase();    // "hello world"
s.includes("World"); // true
s.replace("World", "JS"); // "Hello JS"
s.split(" ");       // ["Hello", "World"]
s.trim();           // remove whitespace
\`\`\`

## Numbers
\`\`\`javascript
let x = 42;
let y = 3.14;
let inf = Infinity;
let nan = NaN;

Number("42");     // 42
parseInt("42px"); // 42
parseFloat("3.14"); // 3.14
\`\`\`

## Type Conversion
\`\`\`javascript
// String to Number
+"42"          // 42
Number("42")   // 42
parseInt("42") // 42

// Number to String
String(42)     // "42"
(42).toString() // "42"

// To Boolean
Boolean(0)     // false
Boolean("")    // false
Boolean(null)  // false
Boolean("hi")  // true
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 4: Operators
    {
      title: "Operators",
      description: "All operator types in JavaScript",
      lessons: [
        {
          title: "JavaScript Operators",
          slug: "node-operators",
          content: `# Operators

## Arithmetic
\`\`\`javascript
console.log(10 + 3);   // 13
console.log(10 - 3);   // 7
console.log(10 * 3);   // 30
console.log(10 / 3);   // 3.333
console.log(10 % 3);   // 1
console.log(2 ** 3);   // 8 (power)
\`\`\`

## Comparison
\`\`\`javascript
console.log(5 == "5");   // true (loose)
console.log(5 === "5");  // false (strict)
console.log(5 !== "5");  // true
\`\`\`

## Logical
\`\`\`javascript
console.log(true && false);  // false
console.log(true || false);  // true
console.log(!true);          // false
\`\`\`

## Nullish Coalescing
\`\`\`javascript
let value = null;
let result = value ?? "default";  // "default"
\`\`\`

## Optional Chaining
\`\`\`javascript
let user = { address: { city: "Bangkok" } };
let city = user?.address?.city;  // "Bangkok"
let zip = user?.address?.zip;    // undefined
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
          title: "If Statement",
          slug: "node-if",
          content: `# If Statement

\`\`\`javascript
let age = 20;

if (age >= 18) {
    console.log("You can vote!");
}
\`\`\`

## Truthy/Falsy Values
\`\`\`javascript
// Falsy: false, 0, "", null, undefined, NaN
// Truthy: everything else

if ("hello") {
    console.log("This runs!");  // "hello" is truthy
}

if (0) {
    console.log("This doesn't run!");
}
\`\`\`

## Short Circuit
\`\`\`javascript
let name = "";
let display = name || "Anonymous";  // "Anonymous"
let strict = name ?? "Anonymous";   // "Anonymous"
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
          title: "If-Else",
          slug: "node-if-else",
          content: `# If-Else

\`\`\`javascript
let temperature = 25;

if (temperature > 30) {
    console.log("It's hot!");
} else {
    console.log("It's nice outside.");
}
\`\`\`

## If-Else-If Chain
\`\`\`javascript
let score = 75;
let grade;

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

console.log("Grade:", grade);  // C
\`\`\`

## Ternary Operator
\`\`\`javascript
let age = 20;
let status = age >= 18 ? "Adult" : "Minor";
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
          title: "Switch Statement",
          slug: "node-switch",
          content: `# Switch Statement

\`\`\`javascript
let day = "Monday";

switch (day) {
    case "Monday":
        console.log("Start of week");
        break;
    case "Friday":
        console.log("TGIF!");
        break;
    case "Saturday":
    case "Sunday":
        console.log("Weekend!");
        break;
    default:
        console.log("Regular day");
}
\`\`\`

## Switch with Expressions
\`\`\`javascript
let dayType = (() => {
    switch (day) {
        case "Monday":
        case "Tuesday":
        case "Wednesday":
        case "Thursday":
        case "Friday":
            return "Weekday";
        case "Saturday":
        case "Sunday":
            return "Weekend";
        default:
            return "Unknown";
    }
})();
\`\`\`

## Early Return Pattern
\`\`\`javascript
function getDiscount(tier) {
    if (tier === "gold") return 0.2;
    if (tier === "silver") return 0.1;
    if (tier === "bronze") return 0.05;
    return 0;
}
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 8: For Loop
    {
      title: "For Loop",
      description: "for, for...of, for...in, and forEach",
      lessons: [
        {
          title: "For Loops",
          slug: "node-for",
          content: `# For Loops

## Basic For
\`\`\`javascript
for (let i = 0; i < 5; i++) {
    console.log(i);  // 0, 1, 2, 3, 4
}
\`\`\`

## For...of (Values)
\`\`\`javascript
let fruits = ["apple", "banana", "cherry"];

for (let fruit of fruits) {
    console.log(fruit);
}
\`\`\`

## For...in (Keys)
\`\`\`javascript
let person = { name: "Alice", age: 25 };

for (let key in person) {
    console.log(key + ": " + person[key]);
}
\`\`\`

## forEach
\`\`\`javascript
fruits.forEach((fruit, index) => {
    console.log(index, fruit);
});
\`\`\`

## Nested Loops
\`\`\`javascript
for (let i = 1; i <= 5; i++) {
    let row = "";
    for (let j = 1; j <= i; j++) {
        row += "* ";
    }
    console.log(row);
}
\`\`\``,
          estimatedMinutes: 20,
          exercises: [
            {
              title: "FizzBuzz",
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
          title: "While and Do-While",
          slug: "node-while",
          content: `# While Loop

\`\`\`javascript
let count = 0;
while (count < 5) {
    console.log(count);
    count++;
}
\`\`\`

# Do-While Loop

\`\`\`javascript
let num = 1;
do {
    console.log(num);
    num *= 2;
} while (num <= 16);
// Output: 1, 2, 4, 8, 16
\`\`\`

## Key Difference
- **while**: Checks before execution
- **do-while**: Executes at least once

## Infinite Loop with Break
\`\`\`javascript
while (true) {
    let input = readline.question("Command: ");
    if (input === "quit") break;
}
\`\`\``,
          estimatedMinutes: 15,
        },
      ],
    },
    // Module 10: Loop Control
    {
      title: "Loop Control",
      description: "Break, continue, and labels",
      lessons: [
        {
          title: "Break and Continue",
          slug: "node-loop-control",
          content: `# Break and Continue

## Break
\`\`\`javascript
for (let i = 0; i < 100; i++) {
    if (i === 5) break;
    console.log(i);  // 0, 1, 2, 3, 4
}
\`\`\`

## Continue
\`\`\`javascript
for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) continue;  // skip even
    console.log(i);  // 1, 3, 5, 7, 9
}
\`\`\`

## Labeled Break
\`\`\`javascript
outer:
for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
        if (j === 3) break outer;
        console.log(i + "," + j);
    }
}
\`\`\`

## Break with Labels
\`\`\`javascript
let found = false;
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        if (i * j === 42) {
            found = true;
            break;
        }
    }
    if (found) break;
}
\`\`\``,
          estimatedMinutes: 15,
        },
      ],
    },
    // Module 11: Arrays
    {
      title: "Arrays",
      description: "Creating and working with arrays",
      lessons: [
        {
          title: "Array Basics",
          slug: "node-arrays",
          content: `# Arrays

## Create
\`\`\`javascript
let fruits = ["apple", "banana", "cherry"];
let numbers = [1, 2, 3, 4, 5];
let mixed = [1, "hello", true, null];
\`\`\`

## Access
\`\`\`javascript
console.log(fruits[0]);      // "apple"
console.log(fruits.length);  // 3
console.log(fruits.at(-1));  // "cherry"
\`\`\`

## Add/Remove
\`\`\`javascript
fruits.push("date");      // add to end
fruits.unshift("avocado"); // add to start
fruits.pop();              // remove last
fruits.shift();            // remove first
fruits.splice(1, 1);       // remove at index
\`\`\`

## Find
\`\`\`javascript
fruits.includes("apple");      // true
fruits.indexOf("banana");      // 1
fruits.find(f => f.length > 5); // first match
fruits.findIndex(f => f.length > 5); // index of match
\`\`\``,
          estimatedMinutes: 25,
        },
      ],
    },
    // Module 12: Advanced Arrays
    {
      title: "Advanced Array Methods",
      description: "map, filter, reduce, and chaining",
      lessons: [
        {
          title: "Array Methods",
          slug: "node-array-methods",
          content: `# Advanced Array Methods

## map
\`\`\`javascript
let numbers = [1, 2, 3, 4, 5];
let doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10]
\`\`\`

## filter
\`\`\`javascript
let evens = numbers.filter(n => n % 2 === 0);
// [2, 4]
\`\`\`

## reduce
\`\`\`javascript
let sum = numbers.reduce((acc, n) => acc + n, 0);
// 15
\`\`\`

## Chaining
\`\`\`javascript
let result = numbers
    .filter(n => n > 2)
    .map(n => n * 10)
    .reduce((acc, n) => acc + n, 0);
// 120 (30 + 40 + 50)
\`\`\`

## sort
\`\`\`javascript
let nums = [3, 1, 4, 1, 5, 9];
nums.sort((a, b) => a - b);  // [1, 1, 3, 4, 5, 9]
\`\`\`

## spread
\`\`\`javascript
let arr1 = [1, 2];
let arr2 = [3, 4];
let combined = [...arr1, ...arr2];  // [1, 2, 3, 4]
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 13: Objects
    {
      title: "Objects",
      description: "Creating and working with objects",
      lessons: [
        {
          title: "Object Basics",
          slug: "node-objects",
          content: `# Objects

## Create
\`\`\`javascript
let person = {
    name: "Alice",
    age: 25,
    email: "alice@example.com"
};
\`\`\`

## Access
\`\`\`javascript
console.log(person.name);        // "Alice"
console.log(person["age"]);      // 25
console.log(person.address?.city); // undefined (safe)
\`\`\`

## Modify
\`\`\`javascript
person.age = 26;
person.phone = "555-1234";
delete person.email;
\`\`\`

## Loop
\`\`\`javascript
for (let key in person) {
    console.log(key + ": " + person[key]);
}

Object.keys(person);    // ["name", "age"]
Object.values(person);  // ["Alice", 26]
Object.entries(person); // [["name","Alice"], ["age",26]]
\`\`\`

## Destructuring
\`\`\`javascript
let { name, age } = person;
console.log(name, age);  // "Alice" 26

// Rename
let { name: userName } = person;
\`\`\``,
          estimatedMinutes: 25,
        },
      ],
    },
    // Module 14: Advanced Objects
    {
      title: "Advanced Object Patterns",
      description: "Spread, destructuring, and computed properties",
      lessons: [
        {
          title: "Object Patterns",
          slug: "node-object-patterns",
          content: `# Object Patterns

## Spread
\`\`\`javascript
let defaults = { color: "blue", size: "medium" };
let custom = { ...defaults, color: "red" };
// { color: "red", size: "medium" }
\`\`\`

## Destructuring
\`\`\`javascript
function greet({ name, age = 0 }) {
    console.log(\`Hello, \${name}! Age: \${age}\`);
}

greet({ name: "Alice" });  // "Hello, Alice! Age: 0"
\`\`\`

## Optional Chaining
\`\`\`javascript
let user = { address: { city: "Bangkok" } };
let zip = user?.address?.zip;  // undefined
let city = user?.address?.city ?? "Unknown";  // "Bangkok"
\`\`\`

## Computed Properties
\`\`\`javascript
let key = "name";
let obj = {
    [key]: "Alice",
    [\`get\${key.charAt(0).toUpperCase() + key.slice(1)}\`]() {
        return this[key];
    }
};
\`\`\`

## Object.assign
\`\`\`javascript
let target = {};
Object.assign(target, { a: 1 }, { b: 2 });
// { a: 1, b: 2 }
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 15: Functions
    {
      title: "Functions",
      description: "Function declarations, expressions, and arrow functions",
      lessons: [
        {
          title: "Functions in Node.js",
          slug: "node-functions",
          content: `# Functions

## Function Declaration
\`\`\`javascript
function greet(name) {
    return \`Hello, \${name}!\`;
}
\`\`\`

## Function Expression
\`\`\`javascript
const add = function(a, b) {
    return a + b;
};
\`\`\`

## Arrow Function
\`\`\`javascript
const multiply = (a, b) => a * b;
const square = x => x * x;
\`\`\`

## Default Parameters
\`\`\`javascript
function greet(name = "World") {
    return \`Hello, \${name}!\`;
}
\`\`\`

## Rest Parameters
\`\`\`javascript
function sum(...nums) {
    return nums.reduce((a, b) => a + b, 0);
}
\`\`\`

## Spread Operator
\`\`\`javascript
let numbers = [1, 2, 3];
let result = Math.max(...numbers);  // 3
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 16: Advanced Functions
    {
      title: "Closures and Higher-Order Functions",
      description: "Closures, callbacks, and higher-order functions",
      lessons: [
        {
          title: "Closures and Callbacks",
          slug: "node-closures",
          content: `# Closures

\`\`\`javascript
function makeCounter() {
    let count = 0;
    return function() {
        count++;
        return count;
    };
}

const counter = makeCounter();
console.log(counter());  // 1
console.log(counter());  // 2
\`\`\`

# Callbacks

\`\`\`javascript
function fetchData(callback) {
    setTimeout(() => {
        callback(null, "Data loaded!");
    }, 1000);
}

fetchData((err, data) => {
    if (err) console.error(err);
    console.log(data);
});
\`\`\`

# Higher-Order Functions

\`\`\`javascript
function applyToNumber(num, operation) {
    return operation(num);
}

const result = applyToNumber(10, x => x * 2);  // 20
\`\`\`

# Promises
\`\`\`javascript
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve("Data!"), 1000);
    });
}

fetchData().then(data => console.log(data));
\`\`\`

# Async/Await
\`\`\`javascript
async function getData() {
    try {
        const data = await fetchData();
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}
\`\`\``,
          estimatedMinutes: 25,
        },
      ],
    },
    // Module 17: Modules
    {
      title: "Modules and Packages",
      description: "require, import, and npm packages",
      lessons: [
        {
          title: "Node.js Modules",
          slug: "node-modules",
          content: `# Modules

## CommonJS (require)
\`\`\`javascript
// math.js
function add(a, b) { return a + b; }
module.exports = { add };

// main.js
const { add } = require('./math');
console.log(add(2, 3));
\`\`\`

## ES Modules (import)
\`\`\`javascript
// math.mjs
export function add(a, b) { return a + b; }

// main.mjs
import { add } from './math.mjs';
\`\`\`

## Built-in Modules
\`\`\`javascript
const fs = require('fs');
const path = require('path');
const http = require('http');
const os = require('os');
\`\`\`

## npm Packages
\`\`\`bash
npm install express          # install
npm install --save-dev nodemon # dev dep
npm uninstall express         # remove
npm list                     # list deps
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 18: Error Handling
    {
      title: "Error Handling",
      description: "Try-catch, error classes, and async errors",
      lessons: [
        {
          title: "Error Handling",
          slug: "node-errors",
          content: `# Error Handling

## Try-Catch
\`\`\`javascript
try {
    let result = JSON.parse("invalid json");
} catch (err) {
    console.error("Parse error:", err.message);
} finally {
    console.log("Always runs");
}
\`\`\`

## Custom Errors
\`\`\`javascript
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

throw new AppError("Not found", 404);
\`\`\`

## Async Error Handling
\`\`\`javascript
// Promise
fetchData()
    .then(data => console.log(data))
    .catch(err => console.error(err));

// Async/Await
async function getData() {
    try {
        const data = await fetchData();
        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}
\`\`\`

## Error Events
\`\`\`javascript
process.on('unhandledRejection', (err) => {
    console.error('Unhandled rejection:', err);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught exception:', err);
    process.exit(1);
});
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 19: File System
    {
      title: "File System and HTTP",
      description: "Reading files, writing files, and HTTP servers",
      lessons: [
        {
          title: "File System and HTTP",
          slug: "node-fs-http",
          content: `# File System

## Read File
\`\`\`javascript
const fs = require('fs');

// Sync
const data = fs.readFileSync('file.txt', 'utf8');

// Async
fs.readFile('file.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});
\`\`\`

## Write File
\`\`\`javascript
fs.writeFileSync('output.txt', 'Hello, World!');
fs.appendFileSync('log.txt', 'New entry\\n');
\`\`\`

# HTTP Server

\`\`\`javascript
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Hello!' }));
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});
\`\`\`

# Express.js

\`\`\`javascript
const express = require('express');
const app = express();

app.use(express.json());

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', (req, res) => {
    const user = { id: Date.now(), ...req.body };
    users.push(user);
    res.status(201).json(user);
});

app.listen(3000);
\`\`\``,
          estimatedMinutes: 25,
        },
      ],
    },
    // Module 20: Project Application
    {
      title: "Project — REST API Todo App",
      description: "Build a complete REST API",
      lessons: [
        {
          title: "REST API Todo Application",
          slug: "node-project-api",
          content: `# REST API Todo Application

## Complete Application

\`\`\`javascript
const express = require('express');
const app = express();
app.use(express.json());

let todos = [];
let nextId = 1;

// GET all
app.get('/todos', (req, res) => {
    res.json(todos);
});

// GET one
app.get('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).json({ error: 'Not found' });
    res.json(todo);
});

// POST
app.post('/todos', (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: 'Title required' });
    
    const todo = { id: nextId++, title, done: false };
    todos.push(todo);
    res.status(201).json(todo);
});

// PUT
app.put('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).json({ error: 'Not found' });
    
    todo.title = req.body.title ?? todo.title;
    todo.done = req.body.done ?? todo.done;
    res.json(todo);
});

// DELETE
app.delete('/todos/:id', (req, res) => {
    const index = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Not found' });
    
    todos.splice(index, 1);
    res.status(204).send();
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

app.listen(3000, () => console.log('API running on port 3000'));
\`\`\`

## Test with curl
\`\`\`bash
curl http://localhost:3000/todos
curl -X POST http://localhost:3000/todos -H "Content-Type: application/json" -d '{"title":"Learn Node"}'
curl -X PUT http://localhost:3000/todos/1 -H "Content-Type: application/json" -d '{"done":true}'
curl -X DELETE http://localhost:3000/todos/1
\`\`\`

## Concepts Used
✅ Variables (let, const)
✅ Operators (+, ===, ||)
✅ if/else-if/switch
✅ for/while loops
✅ Arrays (map, filter, find)
✅ Objects (destructuring)
✅ Functions (arrow, callbacks)
✅ Modules (require, module.exports)
✅ Error Handling (try-catch)
✅ HTTP (express)`,
          estimatedMinutes: 40,
          exercises: [
            {
              title: "Extend API",
              description: "Add filtering, search, and validation",
              requirements: ["Add query params filter", "Search by title", "Input validation", "Error handling middleware"],
              points: 30,
            },
          ],
        },
      ],
    },
  ],
};
