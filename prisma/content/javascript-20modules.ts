import type { CourseContent } from "../seed-content";

export const javascript20Modules: CourseContent = {
  slug: "javascript-20modules",
  modules: [
    // ════════════════════════════════════════════════════════════
    // MODULE 1: Introduction to JavaScript
    // ════════════════════════════════════════════════════════════
    {
      title: "Introduction to JavaScript",
      description: "JavaScript fundamentals — what it is, how it works, and your first programs",
      lessons: [
        {
          title: "What is JavaScript?",
          slug: "what-is-javascript",
          content: `# What is JavaScript?

JavaScript is one of the most popular programming languages in the world. It is the language of the web — every browser uses JavaScript to make websites interactive.

## History

- Created by **Brendan Eich** in 1995 at Netscape
- Originally called **LiveScript**, then renamed to JavaScript
- Standardized as **ECMAScript** (ES)
- Modern JavaScript uses **ES6+** (ECMAScript 2015+)

## Where JavaScript Runs

| Environment | Use Case |
|------------|----------|
| **Browser** | Interactive websites, UI, animations |
| **Node.js** | Server-side apps, APIs, CLI tools |
| **React Native** | Mobile apps |
| **Electron** | Desktop apps (VS Code, Discord) |

## Your First JavaScript Program

\`\`\`javascript
// This is a single-line comment
console.log("Hello, World!");
\`\`\`

## How to Run JavaScript

### In the Browser Console
1. Open any website
2. Press \`F12\` → Console tab
3. Type: \`console.log("Hello!")\`

### In a Script Tag
\`\`\`html
<!DOCTYPE html>
<html>
<body>
  <h1 id="title">Hello!</h1>
  <script>
    console.log("JavaScript is running!");
    document.getElementById("title").textContent = "Hello, JavaScript!";
  </script>
</body>
</html>
\`\`\`

### In Node.js
\`\`\`bash
node hello.js
\`\`\`

## Console Methods

\`\`\`javascript
console.log("Regular message");    // Standard output
console.warn("Warning message");   // Yellow warning
console.error("Error message");    // Red error
console.info("Info message");      // Blue info
console.table([{ a: 1 }, { a: 2 }]); // Display as table
console.time("timer");
// ... some code ...
console.timeEnd("timer");          // Measure time
\`\`\`

> **Key Takeaway:** JavaScript is everywhere — learning it opens doors to web, mobile, and server development.`,
          estimatedMinutes: 15,
          exercises: [
            {
              title: "Hello JavaScript",
              description: "Open the browser console and print your name, age, and favorite color using console.log",
              requirements: [
                "Open browser console (F12)",
                "Print your name",
                "Print your age",
                "Print your favorite color",
              ],
              points: 10,
            },
          ],
        },
        {
          title: "How JavaScript Executes",
          slug: "js-execution",
          content: `# How JavaScript Executes

## Single-Threaded

JavaScript is **single-threaded**, meaning it executes one line at a time, from top to bottom.

\`\`\`javascript
console.log("First");
console.log("Second");
console.log("Third");
// Output: First, Second, Third
\`\`\`

## Synchronous Execution

By default, JavaScript runs synchronously — it waits for each line to finish before moving on.

\`\`\`javascript
console.log("A");
console.log("B");
console.log("C");
// Always outputs: A → B → C
\`\`\`

## The Event Loop (Simplified)

JavaScript uses an **event loop** to handle asynchronous operations like timers, HTTP requests, and user interactions.

\`\`\`javascript
console.log("1");           // Runs immediately

setTimeout(() => {
  console.log("2");         // Runs after 0ms (but after all sync code)
}, 0);

console.log("3");           // Runs immediately

// Output: 1 → 3 → 2
\`\`\`

## Strict Mode

Enable strict mode to catch common mistakes:

\`\`\`javascript
"use strict";

// These will cause errors in strict mode:
x = 10;           // Error: x is not defined
delete {};        // Error: can't delete object
\`\`\`

> **Tip:** Always use \`"use strict"\` at the top of your scripts for safer code.`,
          estimatedMinutes: 15,
        },
      ],
    },

    // ════════════════════════════════════════════════════════════
    // MODULE 2: Variables
    // ════════════════════════════════════════════════════════════
    {
      title: "Variables",
      description: "Variables — let, const, var and how to store data",
      lessons: [
        {
          title: "Declaring Variables: let, const, var",
          slug: "variable-declarations",
          content: `# Declaring Variables

## Three Ways to Declare

\`\`\`javascript
let name = "Alice";       // Can be reassigned
const age = 25;           // Cannot be reassigned
var old = "avoid";        // Old way — avoid using
\`\`\`

## let — The Modern Variable

\`\`\`javascript
let score = 0;
score = 10;          // ✅ Reassignment is allowed
score = score + 5;   // ✅ 15

let message;         // Declared without value → undefined
message = "Hello";   // Now assigned
\`\`\`

## const — Constant Value

\`\`\`javascript
const pi = 3.14159;
pi = 3;              // ❌ TypeError: Assignment to constant

const user = { name: "Alice" };
user.name = "Bob";   // ✅ Object properties CAN change
user = {};           // ❌ Reassignment NOT allowed
\`\`\`

**Rules:**
- Must initialize when declaring: \`const x;\` → ❌ SyntaxError
- Cannot reassign after declaration
- BUT objects/arrays can be mutated

## var — The Old Way (Avoid)

\`\`\`javascript
var x = 10;
// Problems:
// 1. Function-scoped (not block-scoped)
// 2. Hoisted to top of scope
// 3. Can be redeclared
\`\`\`

## Best Practices

| Rule | Example |
|------|---------|
| Use \`const\` by default | \`const API_URL = "..."\` |
| Use \`let\` when reassigning | \`let count = 0;\` |
| Never use \`var\` | Avoid \`var\` entirely |
| Use UPPER_CASE for constants | \`const MAX_SIZE = 100;\` |

> **Rule of Thumb:** Start with \`const\`. Switch to \`let\` only when you need to reassign.`,
          estimatedMinutes: 20,
          exercises: [
            {
              title: "Variable Practice",
              description: "Create variables for a student profile using let and const appropriately",
              requirements: [
                "Create a const for student name",
                "Create a let for student GPA (will change)",
                "Create a const for school name",
                "Reassign the GPA variable",
                "Print all values",
              ],
              points: 15,
            },
          ],
        },
        {
          title: "Naming Rules and Conventions",
          slug: "variable-naming",
          content: `# Variable Naming Rules

## Mandatory Rules

\`\`\`javascript
let userName = "Alice";     // ✅ camelCase
let _private = true;        // ✅ starts with underscore
let $element = document;    // ✅ starts with $
let MAX_SIZE = 100;         // ✅ UPPER_CASE

let 1name = "Bad";          // ❌ can't start with number
let my-name = "Bad";        // ❌ no hyphens
let my name = "Bad";        // ❌ no spaces
let class = "Bad";          // ❌ reserved keyword
\`\`\`

## Naming Conventions

\`\`\`javascript
// Variables & Functions → camelCase
let firstName = "Alice";
function calculateTotal() {}

// Constants → UPPER_SNAKE_CASE
const API_BASE_URL = "https://api.example.com";
const MAX_RETRY_COUNT = 3;

// Classes → PascalCase
class UserProfile {}

// Boolean variables → is/has/can prefix
let isActive = true;
let hasPermission = false;
let canEdit = true;

// Private properties → _prefix
let _internalData = {};
\`\`\`

## Reserved Words

You CANNOT use these as variable names:
\`\`\`
break, case, catch, class, const, continue, debugger,
default, delete, do, else, export, extends, finally,
for, function, if, import, in, instanceof, let, new,
return, super, switch, this, throw, try, typeof,
var, void, while, with, yield
\`\`\`

> **Tip:** Descriptive names make code self-documenting. \`d\` vs \`daysUntilExpiration\` — which is clearer?`,
          estimatedMinutes: 15,
        },
      ],
    },

    // ════════════════════════════════════════════════════════════
    // MODULE 3: Data Types
    // ════════════════════════════════════════════════════════════
    {
      title: "Data Types",
      description: "All JavaScript data types — primitive and reference",
      lessons: [
        {
          title: "Primitive Data Types",
          slug: "primitive-types",
          content: `# Primitive Data Types

JavaScript has **7 primitive types**:

## 1. String — Text

\`\`\`javascript
let greeting = "Hello, World!";      // double quotes
let name = 'Alice';                  // single quotes
let template = \`Hello, \${name}!\`;  // template literal (backtick)

// String length
console.log(greeting.length);        // 13
console.log("".length);              // 0
\`\`\`

## 2. Number — Integers & Decimals

\`\`\`javascript
let age = 25;            // integer
let price = 19.99;       // decimal
let negative = -10;      // negative
let infinity = Infinity; // special value
let notANumber = NaN;    // Not a Number

// Number operations
console.log(10 + 3);    // 13
console.log(10 / 3);    // 3.3333333333333335
console.log(0.1 + 0.2); // 0.30000000000000004 (floating point!)
\`\`\`

## 3. Boolean — true or false

\`\`\`javascript
let isReady = true;
let isDone = false;

// Comparison results are boolean
console.log(5 > 3);    // true
console.log(5 === 3);  // false
\`\`\`

## 4. undefined — Unassigned

\`\`\`javascript
let x;
console.log(x);          // undefined
console.log(typeof x);   // "undefined"
\`\`\`

## 5. null — Intentional Empty

\`\`\`javascript
let selectedItem = null;  // Explicitly empty
console.log(typeof null); // "object" (known JS bug!)
\`\`\`

## 6. BigInt — Large Integers

\`\`\`javascript
const big = 9007199254740991n;  // add 'n' suffix
const huge = BigInt("9007199254740991");
\`\`\`

## 7. Symbol — Unique Identifiers

\`\`\`javascript
const id1 = Symbol("id");
const id2 = Symbol("id");
console.log(id1 === id2);  // false (always unique)
\`\`\`

## typeof Operator

\`\`\`javascript
typeof "hello"     // "string"
typeof 42          // "number"
typeof true        // "boolean"
typeof undefined   // "undefined"
typeof null        // "object" (bug!)
typeof Symbol()    // "symbol"
typeof 123n        // "bigint"
\`\`\`

## Primitive vs Reference

| Primitive | Reference |
|-----------|-----------|
| String, Number, Boolean | Object, Array, Function |
| Stored by **value** | Stored by **reference** |
| Immutable | Mutable |
| Compared by value | Compared by reference |

\`\`\`javascript
let a = 10;
let b = a;      // Copy of value
b = 20;
console.log(a); // 10 (unchanged)

let obj1 = { x: 1 };
let obj2 = obj1;  // Reference copy
obj2.x = 99;
console.log(obj1.x); // 99 (changed!)
\`\`\``,
          estimatedMinutes: 25,
          exercises: [
            {
              title: "Type Explorer",
              description: "Use typeof to check the data type of 10 different values",
              requirements: [
                "Check type of a string",
                "Check type of a number",
                "Check type of a boolean",
                "Check type of undefined",
                "Check type of null",
                "Check type of an array",
                "Check type of an object",
                "Check type of a function",
                "Check type of a BigInt",
                "Check type of a Symbol",
              ],
              points: 20,
            },
          ],
        },
        {
          title: "Type Conversion & Coercion",
          slug: "type-conversion",
          content: `# Type Conversion & Coercion

## Explicit Conversion (You Control It)

### To String
\`\`\`javascript
String(123)           // "123"
(123).toString()      // "123"
String(true)          // "true"
String(null)          // "null"
String(undefined)     // "undefined"
\`\`\`

### To Number
\`\`\`javascript
Number("123")         // 123
Number("hello")       // NaN
Number(true)          // 1
Number(false)         // 0
Number(null)          // 0
Number(undefined)     // NaN
Number("")            // 0

parseInt("42px")      // 42 (stops at non-number)
parseInt("hello")     // NaN
parseFloat("3.14")    // 3.14

+"123"                // 123 (unary + converts to number)
+"hello"              // NaN
\`\`\`

### To Boolean
\`\`\`javascript
Boolean(0)            // false
Boolean("")           // false
Boolean(null)         // false
Boolean(undefined)    // false
Boolean(NaN)          // false

Boolean(1)            // true
Boolean("hello")      // true
Boolean([])           // true (empty array is truthy!)
Boolean({})           // true (empty object is truthy!)
\`\`\`

**Falsy Values (6 total):**
\`false, 0, "", null, undefined, NaN\`

**Everything else is truthy!**

## Implicit Coercion (JS Does It Automatically)

\`\`\`javascript
// String concatenation wins
"5" + 3               // "53" (number → string)
"5" + true            // "5true"

// Number operations
"5" - 3               // 2 (string → number)
"5" * 2               // 10
"5" > 3               // true

// Equality with coercion
5 == "5"              // true  (loose — coerces types)
5 === "5"             // false (strict — checks type too)
\`\`\`

## == vs === (ALWAYS use ===)

\`\`\`javascript
// Loose equality (==) — COERCES types
0 == ""               // true
0 == false            // true
"" == false           // true
null == undefined     // true
"0" == false          // true

// Strict equality (===) — NO coercion
0 === ""              // false
0 === false           // false
"" === false          // false
null === undefined    // false
"0" === false         // false
\`\`\`

> **Golden Rule:** Always use \`===\` and \`!==\` to avoid unexpected type coercion bugs.`,
          estimatedMinutes: 20,
        },
      ],
    },

    // ════════════════════════════════════════════════════════════
    // MODULE 4: Operators
    // ════════════════════════════════════════════════════════════
    {
      title: "Operators",
      description: "All operators — arithmetic, comparison, logical, and assignment",
      lessons: [
        {
          title: "Arithmetic & Assignment Operators",
          slug: "arithmetic-operators",
          content: `# Arithmetic & Assignment Operators

## Arithmetic Operators

\`\`\`javascript
let a = 10, b = 3;

a + b    // 13    Addition
a - b    // 7     Subtraction
a * b    // 30    Multiplication
a / b    // 3.333 Division
a % b    // 1     Modulus (remainder)
a ** b   // 1000  Exponentiation (10³)
\`\`\`

### Integer Division & Remainder
\`\`\`javascript
Math.floor(7 / 2)    // 3 (integer division)
7 % 2                 // 1 (remainder)

// Check even/odd
10 % 2 === 0          // true (even)
7 % 2 === 0           // false (odd)
\`\`\`

### Division Edge Cases
\`\`\`javascript
10 / 0     // Infinity
-10 / 0    // -Infinity
0 / 0      // NaN
\`\`\`

## Assignment Operators

\`\`\`javascript
let x = 10;     // Simple assignment

x += 5;         // x = x + 5  → 15
x -= 3;         // x = x - 3  → 12
x *= 2;         // x = x * 2  → 24
x /= 4;         // x = x / 4  → 6
x %= 4;         // x = x % 4  → 2
x **= 3;        // x = x ** 3 → 8
\`\`\`

### String Concatenation
\`\`\`javascript
let name = "Alice";
let greeting = "Hello, " + name + "!";   // "Hello, Alice!"

let age = 25;
let msg = "I am " + age + " years old";  // "I am 25 years old"

// Template literals (better!)
let msg2 = \`I am \${age} years old\`;
\`\`\`

### Increment / Decrement
\`\`\`javascript
let count = 5;

count++;          // count = 6 (post-increment)
count--;          // count = 5 (post-decrement)

++count;          // count = 6 (pre-increment)
--count;          // count = 5 (pre-decrement)

// Pre vs Post matters!
let a = 5;
console.log(a++); // 5 (returns THEN increments)
console.log(a);   // 6
console.log(++a); // 7 (increments THEN returns)
\`\`\``,
          estimatedMinutes: 20,
          exercises: [
            {
              title: "Calculator",
              description: "Write expressions to calculate: area of circle (r=5), average of 3 numbers, temperature F→C",
              requirements: [
                "Area = π × r² (use Math.PI)",
                "Average of 85, 90, 78",
                "F to C: (F - 32) × 5/9",
              ],
              points: 15,
            },
          ],
        },
        {
          title: "Comparison & Logical Operators",
          slug: "comparison-logical",
          content: `# Comparison & Logical Operators

## Comparison Operators

\`\`\`javascript
// Equality
5 == "5"           // true  (loose — type coercion)
5 === "5"          // false (strict — no coercion)
5 != "5"           // false
5 !== "5"          // true

// Relational
5 > 3              // true
5 < 3              // false
10 >= 10           // true
5 <= 4             // false
\`\`\`

## Logical Operators

\`\`\`javascript
// AND (&&) — both must be true
true && true       // true
true && false      // false
false && true      // false
false && false     // false

// OR (||) — at least one must be true
true || true       // true
true || false      // true
false || true      // true
false || false     // false

// NOT (!) — flips the value
!true              // false
!false             // true
!!"hello"          // true (double negation = truthy check)
\`\`\`

## Short-Circuit Evaluation

\`\`\`javascript
// && returns first falsy or last value
"hello" && "world"     // "world"
0 && "hello"           // 0
null && "hello"        // null

// || returns first truthy or last value
"hello" || "world"     // "hello"
0 || "hello"           // "hello"
null || "default"      // "default"

// Common patterns
let name = userInput || "Anonymous";   // Default value
let result = data && data.items;       // Safe access
\`\`\`

## Nullish Coalescing (??)

\`\`\`javascript
// ?? only checks null/undefined (NOT 0 or "")
0 ?? "default"         // 0      (unlike || which gives "default")
"" ?? "default"        // ""     (unlike || which gives "default")
null ?? "default"      // "default"
undefined ?? "default" // "default"
\`\`\`

## Operator Precedence (Simplified)

\`\`\`javascript
// Highest to lowest:
// 1. ()  Parentheses
// 2. !   NOT, ++, --
// 3. * / %  Multiplicative
// 4. + -    Additive
// 5. < > <= >=  Relational
// 6. == === != !==  Equality
// 7. &&   AND
// 8. ||   OR
// 9. =    Assignment

// When in doubt, use parentheses!
\`\`\``,
          estimatedMinutes: 20,
        },
        {
          title: "Ternary & Other Useful Operators",
          slug: "ternary-operators",
          content: `# Ternary & Other Useful Operators

## Ternary Operator (Conditional)

\`\`\`javascript
// condition ? valueIfTrue : valueIfFalse

let age = 20;
let status = (age >= 18) ? "Adult" : "Minor";
console.log(status);  // "Adult"

// Nested (avoid — hard to read)
let grade = score >= 90 ? "A"
          : score >= 80 ? "B"
          : score >= 70 ? "C"
          : "F";

// Better: use if-else for complex logic
\`\`\`

## typeof Operator

\`\`\`javascript
typeof "hello"    // "string"
typeof 42         // "number"
typeof true       // "boolean"
typeof undefined  // "undefined"
typeof null       // "object" (bug!)
typeof []         // "object" (use Array.isArray instead)
typeof {}         // "object"
typeof function(){} // "function"
\`\`\`

## Optional Chaining (?.)

\`\`\`javascript
const user = {
  name: "Alice",
  address: {
    city: "Bangkok"
  }
};

user.address?.city        // "Bangkok"
user.address?.zip         // undefined (no error!)
user.contact?.email       // undefined (no error!)

// With methods
user.getName?.()          // undefined (safe call)
\`\`\`

## Spread Operator (...)

\`\`\`javascript
// Arrays
let arr1 = [1, 2, 3];
let arr2 = [...arr1, 4, 5];  // [1, 2, 3, 4, 5]

// Objects
let obj1 = { a: 1, b: 2 };
let obj2 = { ...obj1, c: 3 };  // { a: 1, b: 2, c: 3 }

// Function arguments
Math.max(...[1, 5, 3]);  // 5
\`\`\`

## Logical Assignment

\`\`\`javascript
// ES2021
let a = 0;
a ??= 10;    // a = a ?? 10  → 10 (nullish coalescing assignment)
a ||= 20;    // a = a || 20  → 10 (already truthy)
a &&= 5;     // a = a && 5   → 5  (both truthy)

// Useful for defaults
config.timeout ??= 3000;
config.retries ||= 3;
\`\`\`

> **Key Patterns:**
> - Use \`??\` for default values (respects 0 and "")
> - Use \`?.\` for safe property access
> - Use \`...\` for copying/merging arrays and objects`,
          estimatedMinutes: 20,
          exercises: [
            {
              title: "User Profile Display",
              description: "Use optional chaining, ternary, and template literals to display a user profile safely",
              requirements: [
                "Create a user object with nested data",
                "Use ?. to safely access nested properties",
                "Use ternary to show Active/Inactive",
                "Use template literals for output",
              ],
              points: 20,
            },
          ],
        },
      ],
    },

    // ════════════════════════════════════════════════════════════
    // MODULE 5: Conditionals — if, if-else
    // ════════════════════════════════════════════════════════════
    {
      title: "Conditionals — if / if-else",
      description: "Making decisions with if, if-else statements",
      lessons: [
        {
          title: "if Statement",
          slug: "if-statement",
          content: `# if Statement

The \`if\` statement executes a block of code only if a condition is **truthy**.

## Basic Syntax

\`\`\`javascript
if (condition) {
  // code runs only if condition is truthy
}
\`\`\`

## Examples

\`\`\`javascript
let temperature = 35;

if (temperature > 30) {
  console.log("It's hot outside! 🥵");
}
// Output: "It's hot outside! 🥵"
\`\`\`

\`\`\`javascript
let age = 16;

if (age >= 18) {
  console.log("You can vote!");
}
// Nothing prints (16 < 18)
\`\`\`

## Truthy and Falsy

\`\`\`javascript
// These are ALL truthy:
if ("hello") { }    // ✅ runs
if (42) { }         // ✅ runs
if (-1) { }         // ✅ runs
if ([]) { }         // ✅ runs
if ({}) { }         // ✅ runs

// These are falsy:
if ("") { }         // ❌ doesn't run
if (0) { }          // ❌ doesn't run
if (null) { }       // ❌ doesn't run
if (undefined) { }  // ❌ doesn't run
if (NaN) { }        // ❌ doesn't run
\`\`\`

## Omitting Braces (Single Line)

\`\`\`javascript
// These are equivalent:
if (age >= 18) console.log("Adult");
if (age >= 18) {
  console.log("Adult");
}

// Best practice: ALWAYS use braces
if (age >= 18) {
  console.log("Adult");
}
\`\`\`

## Nested if

\`\`\`javascript
let hasTicket = true;
let age = 20;

if (hasTicket) {
  if (age >= 18) {
    console.log("Welcome to the movie!");
  } else {
    console.log("Sorry, you need to be 18+");
  }
} else {
  console.log("You need a ticket first.");
}
\`\`\`

> **Best Practice:** Keep nesting to a maximum of 2-3 levels. Deeper nesting reduces readability.`,
          estimatedMinutes: 15,
        },
        {
          title: "if-else Statement",
          slug: "if-else-statement",
          content: `# if-else Statement

\`if-else\` provides an **alternative** path when the condition is falsy.

## Basic Syntax

\`\`\`javascript
if (condition) {
  // runs when truthy
} else {
  // runs when falsy
}
\`\`\`

## Examples

\`\`\`javascript
let age = 16;

if (age >= 18) {
  console.log("You can vote! ✅");
} else {
  console.log("Too young to vote. ❌");
}
// Output: "Too young to vote. ❌"
\`\`\`

\`\`\`javascript
let isLoggedIn = true;

if (isLoggedIn) {
  console.log("Welcome back, User!");
  console.log("Your dashboard is ready.");
} else {
  console.log("Please log in to continue.");
  window.location.href = "/login";
}
\`\`\`

## Checking Numbers

\`\`\`javascript
let number = -5;

if (number > 0) {
  console.log("Positive");
} else {
  console.log("Negative or zero");
}
// Output: "Negative or zero"

// To check if positive, negative, or zero:
if (number > 0) {
  console.log("Positive");
} else if (number < 0) {
  console.log("Negative");
} else {
  console.log("Zero");
}
\`\`\`

## Guard Clauses (Early Return Pattern)

\`\`\`javascript
// ❌ Deeply nested
function process(user) {
  if (user) {
    if (user.isActive) {
      if (user.hasPermission) {
        // do the real work
        return "Processing...";
      } else {
        return "No permission";
      }
    } else {
      return "User inactive";
    }
  } else {
    return "No user";
  }
}

// ✅ Guard clauses — flat and clean
function process(user) {
  if (!user) return "No user";
  if (!user.isActive) return "User inactive";
  if (!user.hasPermission) return "No permission";

  // do the real work
  return "Processing...";
}
\`\`\`

> **Tip:** Guard clauses reduce nesting and make code easier to follow.`,
          estimatedMinutes: 15,
          exercises: [
            {
              title: "Login System",
              description: "Write a login checker that validates username and password",
              requirements: [
                "Check if username is not empty",
                "Check if password is at least 6 characters",
                "Print appropriate messages for each case",
                "Use guard clause pattern",
              ],
              points: 20,
            },
          ],
        },
      ],
    },

    // ════════════════════════════════════════════════════════════
    // MODULE 6: Conditionals — if-else-if & switch case
    // ════════════════════════════════════════════════════════════
    {
      title: "Conditionals — if-else-if & switch",
      description: "Multi-way conditionals with if-else-if and switch-case",
      lessons: [
        {
          title: "if-else-if Chain",
          slug: "if-else-if",
          content: `# if-else-if Chain

Use \`if-else-if\` when you need **multiple conditions** to be checked in order.

## Basic Syntax

\`\`\`javascript
if (condition1) {
  // runs if condition1 is true
} else if (condition2) {
  // runs if condition2 is true
} else if (condition3) {
  // runs if condition3 is true
} else {
  // runs if NONE of the above are true
}
\`\`\`

## Grading System

\`\`\`javascript
let score = 85;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else if (score >= 70) {
  console.log("Grade: C");
} else if (score >= 60) {
  console.log("Grade: D");
} else {
  console.log("Grade: F");
}
// Output: "Grade: B"
\`\`\`

## Temperature Guide

\`\`\`javascript
let temp = 28;

if (temp >= 40) {
  console.log("🔥 Extreme heat! Stay indoors!");
} else if (temp >= 30) {
  console.log("🥵 Very hot! Drink water!");
} else if (temp >= 25) {
  console.log("😊 Warm and pleasant");
} else if (temp >= 15) {
  console.log("🧥 Cool, bring a jacket");
} else if (temp >= 0) {
  console.log("❄️ Cold! Bundle up!");
} else {
  console.log("🥶 Freezing! Stay warm!");
}
\`\`\`

## Common Mistakes

\`\`\`javascript
// ❌ WRONG: Overlapping ranges
let x = 85;
if (x > 80) console.log("A");       // Runs!
if (x > 70) console.log("B");       // Also runs! (85 > 70)

// ✅ CORRECT: Use else-if (only one runs)
if (x > 80) console.log("A");
else if (x > 70) console.log("B");  // Skipped because A matched

// ❌ WRONG: Unnecessary condition
if (score >= 90) {
  console.log("A");
} else if (score >= 80 && score < 90) {  // score < 90 is redundant!
  console.log("B");
}

// ✅ CORRECT: Simpler
if (score >= 90) {
  console.log("A");
} else if (score >= 80) {  // We already know score < 90
  console.log("B");
}
\`\`\`

> **Key Rule:** Conditions are checked **top to bottom**. Once one matches, the rest are skipped.`,
          estimatedMinutes: 20,
        },
        {
          title: "switch-case Statement",
          slug: "switch-case",
          content: `# switch-case Statement

\`switch\` is useful when comparing **one value** against **many possible matches**.

## Basic Syntax

\`\`\`javascript
switch (expression) {
  case value1:
    // runs if expression === value1
    break;
  case value2:
    // runs if expression === value2
    break;
  default:
    // runs if no case matches
}
\`\`\`

## Day of the Week

\`\`\`javascript
let day = "Monday";

switch (day) {
  case "Monday":
    console.log("Start of the work week 💼");
    break;
  case "Tuesday":
  case "Wednesday":
  case "Thursday":
    console.log("Regular workday 📝");
    break;
  case "Friday":
    console.log("TGIF! 🎉");
    break;
  case "Saturday":
  case "Sunday":
    console.log("Weekend! 🎊");
    break;
  default:
    console.log("Invalid day");
}
// Output: "Start of the work week 💼"
\`\`\`

## Without break (Fall-Through)

\`\`\`javascript
// ⚠️ Missing break causes fall-through!
let month = 3;

switch (month) {
  case 1:
    console.log("January");
    // no break! Falls through...
  case 2:
    console.log("February");
    // no break! Falls through...
  case 3:
    console.log("March");
    // no break! Falls through...
  case 4:
    console.log("April");
    break;
  default:
    console.log("Other month");
}
// Output: January, February, March, April (all matched!)
\`\`\`

## Switch vs if-else-if

\`\`\`javascript
// switch is better for exact value matching:
let role = "admin";
switch (role) {
  case "admin":     // ...
  case "editor":    // ...
  case "viewer":    // ...
}

// if-else-if is better for ranges and complex conditions:
if (score >= 90) {           // ✅ Can't do this with switch
} else if (age >= 18) {      // ✅ Multiple variables
} else if (name.startsWith("A")) { // ✅ Complex conditions
}
\`\`\`

## Switch with Expressions

\`\`\`javascript
let hour = new Date().getHours();

switch (true) {
  case hour < 12:
    console.log("Good morning ☀️");
    break;
  case hour < 18:
    console.log("Good afternoon 🌤️");
    break;
  default:
    console.log("Good evening 🌙");
    break;
}
\`\`\`

> **When to use switch:**
> - Comparing one variable against many **exact values**
> - Many cases to check
> - When you need **fall-through** behavior`,
          estimatedMinutes: 20,
          exercises: [
            {
              title: "Grade Calculator",
              description: "Build a grade calculator using if-else-if that also handles extra credit",
              requirements: [
                "90-100 = A",
                "80-89 = B",
                "70-79 = C",
                "60-69 = D",
                "Below 60 = F",
                "Print 'Extra Credit!' if score is 95+",
              ],
              points: 20,
            },
            {
              title: "Day Activity Planner",
              description: "Use switch-case to suggest activities for each day of the week",
              requirements: [
                "Monday: Study session",
                "Tuesday: Group project",
                "Wednesday: Lab work",
                "Thursday: Review day",
                "Friday: Presentation",
                "Saturday/Sunday: Rest & hobbies",
                "Handle invalid input",
              ],
              points: 20,
            },
          ],
        },
      ],
    },

    // ════════════════════════════════════════════════════════════
    // MODULE 7: Loops — for loop
    // ════════════════════════════════════════════════════════════
    {
      title: "Loops — for",
      description: "Repeating code with the for loop",
      lessons: [
        {
          title: "The for Loop",
          slug: "for-loop",
          content: `# The for Loop

The \`for\` loop repeats code a **specific number of times**.

## Basic Syntax

\`\`\`javascript
for (initialization; condition; update) {
  // code to repeat
}
\`\`\`

## Counting Loop

\`\`\`javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}
// Output: 0, 1, 2, 3, 4
\`\`\`

**Step by step:**
1. \`let i = 0\` — Initialize: runs once
2. \`i < 5\` — Condition: checked before each iteration
3. \`i++\` — Update: runs after each iteration
4. Loop body executes if condition is true

## Counting from 1

\`\`\`javascript
for (let i = 1; i <= 5; i++) {
  console.log(\`Number: \${i}\`);
}
// Output: Number: 1, Number: 2, ..., Number: 5
\`\`\`

## Counting Backwards

\`\`\`javascript
for (let i = 10; i >= 0; i -= 2) {
  console.log(i);
}
// Output: 10, 8, 6, 4, 2, 0
\`\`\`

## Multiplication Table

\`\`\`javascript
let num = 7;
for (let i = 1; i <= 10; i++) {
  console.log(\`\${num} × \${i} = \${num * i}\`);
}
// 7 × 1 = 7
// 7 × 2 = 14
// ...
// 7 × 10 = 70
\`\`\`

## Loop Patterns

\`\`\`javascript
// Sum of numbers 1-100
let sum = 0;
for (let i = 1; i <= 100; i++) {
  sum += i;
}
console.log(sum);  // 5050

// Find maximum in array
let nums = [3, 7, 2, 9, 1, 5];
let max = nums[0];
for (let i = 1; i < nums.length; i++) {
  if (nums[i] > max) {
    max = nums[i];
  }
}
console.log(max);  // 9

// Factorial
let factorial = 1;
for (let i = 1; i <= 5; i++) {
  factorial *= i;
}
console.log(factorial);  // 120 (5!)
\`\`\`

## Nested Loops

\`\`\`javascript
// Multiplication grid
for (let i = 1; i <= 5; i++) {
  let row = "";
  for (let j = 1; j <= 5; j++) {
    row += \`\${i * j}\t\`;
  }
  console.log(row);
}
// 1  2  3  4  5
// 2  4  6  8  10
// 3  6  9  12 15
// 4  8  12 16 20
// 5  10 15 20 25
\`\`\``,
          estimatedMinutes: 25,
          exercises: [
            {
              title: "Even Numbers Printer",
              description: "Print all even numbers from 1 to 50 using a for loop",
              requirements: [
                "Use a for loop",
                "Check if each number is even (use %)",
                "Print each even number",
              ],
              points: 15,
            },
            {
              title: "Sum Calculator",
              description: "Calculate the sum of all numbers from 1 to N where N is input by user",
              requirements: [
                "Set N = 100",
                "Use a for loop to add each number",
                "Print the final sum",
              ],
              points: 15,
            },
          ],
        },
        {
          title: "for...of and for...in Loops",
          slug: "for-of-for-in",
          content: `# for...of and for...in Loops

## for...of — Iterate Over Values

\`\`\`javascript
// Arrays
let fruits = ["apple", "banana", "cherry"];
for (let fruit of fruits) {
  console.log(fruit);
}
// Output: apple, banana, cherry

// Strings
for (let char of "Hello") {
  console.log(char);
}
// Output: H, e, l, l, o

// Maps
let map = new Map([["a", 1], ["b", 2]]);
for (let [key, value] of map) {
  console.log(\`\${key}: \${value}\`);
}

// Sets
let set = new Set([1, 2, 3]);
for (let num of set) {
  console.log(num);
}
\`\`\`

## for...in — Iterate Over Keys

\`\`\`javascript
let person = { name: "Alice", age: 25, city: "Bangkok" };

for (let key in person) {
  console.log(\`\${key}: \${person[key]}\`);
}
// Output:
// name: Alice
// age: 25
// city: Bangkok
\`\`\`

## for...of vs for...in

| Feature | for...of | for...in |
|---------|----------|----------|
| Iterates over | **Values** | **Keys/Indices** |
| Works on | Arrays, Strings, Maps, Sets | Objects, Arrays |
| Order | Guaranteed (values) | Guaranteed (enumerable keys) |
| Prototype chain | No | Yes (use hasOwnProperty) |

\`\`\`javascript
// ⚠️ Don't use for...in on arrays!
let arr = ["a", "b", "c"];
for (let key in arr) {
  console.log(key);        // "0", "1", "2" (strings!)
  console.log(arr[key]);   // works but key is string
}

// ✅ Use for...of for arrays
for (let value of arr) {
  console.log(value);      // "a", "b", "c"
}
\`\`\`

## Loop Over Array with Index

\`\`\`javascript
let colors = ["red", "green", "blue"];

// If you need the index:
colors.forEach((color, index) => {
  console.log(\`\${index}: \${color}\`);
});

// Or with for...of and entries()
for (let [index, color] of colors.entries()) {
  console.log(\`\${index}: \${color}\`);
}
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },

    // ════════════════════════════════════════════════════════════
    // MODULE 8: Loops — while & do-while
    // ════════════════════════════════════════════════════════════
    {
      title: "Loops — while & do-while",
      description: "Conditional loops with while and do-while",
      lessons: [
        {
          title: "The while Loop",
          slug: "while-loop",
          content: `# The while Loop

The \`while\` loop repeats **as long as a condition is true**.

## Basic Syntax

\`\`\`javascript
while (condition) {
  // code to repeat
  // ⚠️ Must change something to avoid infinite loop!
}
\`\`\`

## Simple Counting

\`\`\`javascript
let count = 0;
while (count < 5) {
  console.log(count);
  count++;  // Don't forget this!
}
// Output: 0, 1, 2, 3, 4
\`\`\`

## When to Use while vs for

\`\`\`javascript
// ✅ for: When you know HOW MANY times to loop
for (let i = 0; i < 10; i++) {
  console.log(i);
}

// ✅ while: When you don't know how many times
let randomNum;
while (randomNum !== 42) {
  randomNum = Math.floor(Math.random() * 100);
  console.log(\`Trying: \${randomNum}\`);
}
console.log("Found it! 🎉");
\`\`\`

## Practical Examples

\`\`\`javascript
// Power of 2 less than 1000
let power = 1;
while (power < 1000) {
  console.log(power);
  power *= 2;
}
// Output: 1, 2, 4, 8, 16, 32, 64, 128, 256, 512

// Reverse a string
let original = "Hello";
let reversed = "";
let index = original.length - 1;
while (index >= 0) {
  reversed += original[index];
  index--;
}
console.log(reversed);  // "olleH"
\`\`\`

## Avoiding Infinite Loops

\`\`\`javascript
// ❌ INFINITE LOOP — never stops!
while (true) {
  console.log("forever...");
}

// ❌ Forgot to update counter
let i = 0;
while (i < 5) {
  console.log(i);
  // Missing: i++
}

// ✅ Safe pattern
let maxAttempts = 100;
let attempts = 0;
while (attempts < maxAttempts) {
  // do something
  attempts++;
}
\`\`\`

> **Warning:** An infinite loop will freeze your browser tab. Always ensure the condition eventually becomes false.`,
          estimatedMinutes: 20,
        },
        {
          title: "The do-while Loop",
          slug: "do-while-loop",
          content: `# The do-while Loop

The \`do-while\` loop is similar to \`while\`, but it **always runs at least once**.

## Basic Syntax

\`\`\`javascript
do {
  // code runs at least once
} while (condition);  // ← semicolon required!
\`\`\`

## while vs do-while

\`\`\`javascript
// while: might NOT run at all
let x = 10;
while (x < 5) {
  console.log(x);   // Never runs! (10 is not < 5)
}

// do-while: ALWAYS runs at least once
let y = 10;
do {
  console.log(y);   // Prints: 10 (runs once before checking)
} while (y < 5);
\`\`\`

## Practical Examples

\`\`\`javascript
// Menu system (runs at least once)
let choice;
do {
  console.log("1. Play");
  console.log("2. Settings");
  console.log("3. Quit");
  choice = prompt("Choose an option:");
  
  switch (choice) {
    case "1": console.log("Starting game..."); break;
    case "2": console.log("Opening settings..."); break;
    case "3": console.log("Goodbye!"); break;
    default: console.log("Invalid choice");
  }
} while (choice !== "3");
\`\`\`

\`\`\`javascript
// Number guessing game
let secret = Math.floor(Math.random() * 10) + 1;
let guess;
let attempts = 0;

do {
  guess = parseInt(prompt("Guess a number (1-10):"));
  attempts++;
  
  if (guess < secret) {
    console.log("Too low!");
  } else if (guess > secret) {
    console.log("Too high!");
  }
} while (guess !== secret);

console.log(\`🎉 Correct! You got it in \${attempts} attempts.\`);
\`\`\`

## Loop Comparison Summary

| Loop | When to Use | Runs At Least Once? |
|------|-------------|---------------------|
| \`for\` | Known number of iterations | No |
| \`while\` | Unknown iterations, pre-check | No |
| \`do-while\` | Unknown iterations, must run once | Yes |

> **Best Practice:** Prefer \`for\` when you know the count. Use \`do-while\` for menus and user input.`,
          estimatedMinutes: 20,
          exercises: [
            {
              title: "Input Validator",
              description: "Use do-while to keep asking for input until a valid email is entered",
              requirements: [
                "Use do-while loop",
                "Check for @ in email",
                "Print success when valid",
                "Print error when invalid",
              ],
              points: 15,
            },
            {
              title: "FizzBuzz with while",
              description: "Print FizzBuzz for 1-100 using a while loop",
              requirements: [
                "Use while loop",
                "Multiples of 3: Fizz",
                "Multiples of 5: Buzz",
                "Multiples of both: FizzBuzz",
                "Print the number otherwise",
              ],
              points: 20,
            },
          ],
        },
      ],
    },

    // ════════════════════════════════════════════════════════════
    // MODULE 9: Loop Control — break & continue
    // ════════════════════════════════════════════════════════════
    {
      title: "Loop Control — break & continue",
      description: "Controlling loop flow with break and continue",
      lessons: [
        {
          title: "break and continue",
          slug: "break-continue",
          content: `# break and continue

## break — Exit the Loop Immediately

\`\`\`javascript
// Find the first number divisible by 7 in range 1-100
for (let i = 1; i <= 100; i++) {
  if (i % 7 === 0) {
    console.log(\`Found: \${i}\`);  // "Found: 7"
    break;  // Stop the loop entirely
  }
}
\`\`\`

\`\`\`javascript
// Search array for a value
let users = ["Alice", "Bob", "Charlie", "Diana"];
let searchFor = "Charlie";

for (let user of users) {
  if (user === searchFor) {
    console.log(\`\${user} found!\`);
    break;  // No need to check remaining
  }
}
// Output: "Charlie found!"
\`\`\`

## continue — Skip This Iteration

\`\`\`javascript
// Print only odd numbers
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) {
    continue;  // Skip even numbers
  }
  console.log(i);
}
// Output: 1, 3, 5, 7, 9
\`\`\`

\`\`\`javascript
// Skip invalid entries
let scores = [85, -1, 92, -5, 78, 100, -3];

for (let score of scores) {
  if (score < 0) {
    console.log("Invalid score, skipping...");
    continue;
  }
  console.log(\`Score: \${score}\`);
}
// Output:
// Score: 85
// Invalid score, skipping...
// Score: 92
// Invalid score, skipping...
// Score: 78
// Score: 100
// Invalid score, skipping...
\`\`\`

## Labeled Loops (Breaking Out of Nested Loops)

\`\`\`javascript
outer: for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    if (i === 2 && j === 3) {
      break outer;  // Breaks out of BOTH loops
    }
    console.log(\`\${i},\${j}\`);
  }
}
\`\`\`

## Practical Patterns

\`\`\`javascript
// Early termination with flag
let found = false;
for (let i = 0; i < 1000000; i++) {
  if (i === 42) {
    found = true;
    break;
  }
}
console.log(found ? "Found 42!" : "Not found");

// Remove negatives from array
let numbers = [3, -1, 5, -2, 8, -3, 1];
let positive = [];
for (let num of numbers) {
  if (num < 0) continue;
  positive.push(num);
}
console.log(positive);  // [3, 5, 8, 1]
\`\`\``,
          estimatedMinutes: 20,
          exercises: [
            {
              title: "Prime Finder",
              description: "Find the first 10 prime numbers using for loops and break/continue",
              requirements: [
                "Use nested loops",
                "Use break when factor is found",
                "Count up to 10 primes",
                "Print all 10 primes",
              ],
              points: 25,
            },
          ],
        },
      ],
    },

    // ════════════════════════════════════════════════════════════
    // MODULE 10: Arrays — Basics
    // ════════════════════════════════════════════════════════════
    {
      title: "Arrays — Basics",
      description: "Creating, accessing, and modifying arrays",
      lessons: [
        {
          title: "Array Fundamentals",
          slug: "array-fundamentals",
          content: `# Array Fundamentals

Arrays store **ordered lists** of values.

## Creating Arrays

\`\`\`javascript
// Array literal (preferred)
let fruits = ["apple", "banana", "cherry"];
let numbers = [1, 2, 3, 4, 5];
let mixed = ["hello", 42, true, null];  // mixed types
let empty = [];

// Array constructor (avoid)
let arr = new Array(5);  // Creates array with 5 empty slots
\`\`\`

## Accessing Elements (Zero-Indexed)

\`\`\`javascript
let colors = ["red", "green", "blue"];

colors[0]      // "red"    (first element)
colors[1]      // "green"  (second element)
colors[2]      // "blue"   (third element)
colors[3]      // undefined (out of bounds!)
colors[-1]     // undefined (no negative indexing)
colors.length  // 3

// Last element
colors[colors.length - 1]  // "blue"
\`\`\`

## Modifying Arrays

\`\`\`javascript
let arr = [1, 2, 3];

arr[0] = 10;       // [10, 2, 3]
arr[2] = 30;       // [10, 2, 30]

// Add elements
arr.push(4);       // [10, 2, 30, 4] — add to end
arr.unshift(0);    // [0, 10, 2, 30, 4] — add to start

// Remove elements
arr.pop();         // [0, 10, 2, 30] — remove last
arr.shift();       // [10, 2, 30] — remove first

// Insert at position
arr.splice(1, 0, 15);  // [10, 15, 2, 30] — insert at index 1

// Remove at position
arr.splice(1, 1);      // [10, 2, 30] — remove 1 element at index 1
\`\`\`

## Useful Array Properties

\`\`\`javascript
let arr = [1, 2, 3, 4, 5];

arr.length        // 5
arr.at(0)         // 1 (same as arr[0])
arr.at(-1)        // 5 (negative indexing!)
arr.includes(3)   // true
arr.indexOf(3)    // 2 (index of element)
arr.includes(6)   // false
arr.indexOf(6)    // -1 (not found)
\`\`\``,
          estimatedMinutes: 25,
          exercises: [
            {
              title: "Shopping Cart",
              description: "Create a shopping cart array and perform add, remove, and display operations",
              requirements: [
                "Create array with 3 initial items",
                "Add 2 more items with push()",
                "Remove the last item with pop()",
                "Insert item at index 1 with splice()",
                "Print the final cart",
              ],
              points: 20,
            },
          ],
        },
        {
          title: "Array Iteration Methods",
          slug: "array-iteration",
          content: `# Array Iteration Methods

## forEach — Loop Through Array

\`\`\`javascript
let fruits = ["apple", "banana", "cherry"];

fruits.forEach(function(fruit, index) {
  console.log(\`\${index}: \${fruit}\`);
});

// Arrow function version
fruits.forEach((fruit, index) => {
  console.log(\`\${index}: \${fruit}\`);
});
// Output:
// 0: apple
// 1: banana
// 2: cherry
\`\`\`

## map — Transform Each Element

\`\`\`javascript
let numbers = [1, 2, 3, 4, 5];
let doubled = numbers.map(n => n * 2);
console.log(doubled);  // [2, 4, 6, 8, 10]

let names = ["alice", "bob", "charlie"];
let upperNames = names.map(name => name.toUpperCase());
console.log(upperNames);  // ["ALICE", "BOB", "CHARLIE"]
\`\`\`

## filter — Keep Matching Elements

\`\`\`javascript
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let evens = numbers.filter(n => n % 2 === 0);
console.log(evens);  // [2, 4, 6, 8, 10]

let people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 17 },
  { name: "Charlie", age: 30 }
];
let adults = people.filter(p => p.age >= 18);
console.log(adults);  // [{name: "Alice", age: 25}, {name: "Charlie", age: 30}]
\`\`\`

## reduce — Accumulate into Single Value

\`\`\`javascript
let numbers = [1, 2, 3, 4, 5];
let sum = numbers.reduce((accumulator, current) => {
  return accumulator + current;
}, 0);
console.log(sum);  // 15

// Find maximum
let max = numbers.reduce((a, b) => a > b ? a : b);
console.log(max);  // 5

// Count occurrences
let words = ["apple", "banana", "apple", "cherry", "apple"];
let counts = words.reduce((acc, word) => {
  acc[word] = (acc[word] || 0) + 1;
  return acc;
}, {});
console.log(counts);  // { apple: 3, banana: 1, cherry: 1 }
\`\`\`

## find and some/every

\`\`\`javascript
let users = [
  { id: 1, name: "Alice", active: true },
  { id: 2, name: "Bob", active: false },
  { id: 3, name: "Charlie", active: true }
];

// find — first matching element
let bob = users.find(u => u.name === "Bob");
console.log(bob);  // { id: 2, name: "Bob", active: false }

// some — is ANY element matching?
let hasInactive = users.some(u => !u.active);
console.log(hasInactive);  // true

// every — are ALL elements matching?
let allActive = users.every(u => u.active);
console.log(allActive);  // false
\`\`\``,
          estimatedMinutes: 25,
        },
      ],
    },

    // ════════════════════════════════════════════════════════════
    // MODULE 11: Arrays — Advanced Methods
    // ════════════════════════════════════════════════════════════
    {
      title: "Arrays — Advanced Methods",
      description: "Sorting, slicing, spreading, and chaining array methods",
      lessons: [
        {
          title: "Sorting and Reversing",
          slug: "array-sort",
          content: `# Sorting and Reversing

## sort() — Sorts IN PLACE

\`\`\`javascript
// Strings (alphabetical)
let fruits = ["cherry", "apple", "banana"];
fruits.sort();
console.log(fruits);  // ["apple", "banana", "cherry"]

// Numbers — NEED a compare function!
let nums = [10, 1, 21, 2];
nums.sort();          // ❌ [1, 10, 2, 21] (lexicographic!)

nums.sort((a, b) => a - b);  // ✅ [1, 2, 10, 21]
nums.sort((a, b) => b - a);  // Descending: [21, 10, 2, 1]

// Sort objects by property
let people = [
  { name: "Charlie", age: 30 },
  { name: "Alice", age: 25 },
  { name: "Bob", age: 35 }
];

people.sort((a, b) => a.age - b.age);
console.log(people.map(p => p.name));
// ["Alice", "Charlie", "Bob"]
\`\`\`

## reverse() — Reverses IN PLACE

\`\`\`javascript
let arr = [1, 2, 3, 4, 5];
arr.reverse();
console.log(arr);  // [5, 4, 3, 2, 1]

// To reverse without mutating:
let reversed = [...arr].reverse();
\`\`\`

## slice() — Copy Part of Array

\`\`\`javascript
let arr = ["a", "b", "c", "d", "e"];

arr.slice(1, 3)     // ["b", "c"] (index 1 to 2)
arr.slice(2)        // ["c", "d", "e"] (from index 2)
arr.slice(-2)       // ["d", "e"] (last 2)
arr.slice()         // ["a", "b", "c", "d", "e"] (full copy)
\`\`\`

## concat() — Merge Arrays

\`\`\`javascript
let arr1 = [1, 2];
let arr2 = [3, 4];
let arr3 = [5, 6];

let merged = arr1.concat(arr2, arr3);
console.log(merged);  // [1, 2, 3, 4, 5, 6]

// Using spread (modern)
let merged2 = [...arr1, ...arr2, ...arr3];
\`\`\`

## flat() — Flatten Nested Arrays

\`\`\`javascript
let nested = [1, [2, 3], [4, [5, 6]]];
nested.flat();       // [1, 2, 3, 4, [5, 6]]
nested.flat(2);      // [1, 2, 3, 4, 5, 6]
nested.flat(Infinity); // Fully flattened
\`\`\`

## Method Chaining

\`\`\`javascript
let result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  .filter(n => n % 2 === 0)    // [2, 4, 6, 8, 10]
  .map(n => n * n)             // [4, 16, 36, 64, 100]
  .reduce((a, b) => a + b, 0); // 220

console.log(result);  // 220
\`\`\`

> **Note:** \`sort()\` and \`reverse()\` modify the original array. Use \`toSorted()\` and \`toReversed()\` (ES2023) for non-mutating versions.`,
          estimatedMinutes: 25,
        },
        {
          title: "Destructuring and Spread",
          slug: "array-destructuring",
          content: `# Array Destructuring and Spread

## Array Destructuring

\`\`\`javascript
// Basic
let [a, b, c] = [1, 2, 3];
console.log(a, b, c);  // 1 2 3

// Skip elements
let [first, , third] = [1, 2, 3];
console.log(first, third);  // 1 3

// Rest pattern
let [head, ...tail] = [1, 2, 3, 4, 5];
console.log(head);  // 1
console.log(tail);  // [2, 3, 4, 5]

// Default values
let [x = 10, y = 20] = [5];
console.log(x, y);  // 5 20

// Swap variables
let m = 1, n = 2;
[m, n] = [n, m];
console.log(m, n);  // 2 1
\`\`\`

## Spread Operator with Arrays

\`\`\`javascript
// Copy array
let original = [1, 2, 3];
let copy = [...original];

// Merge arrays
let arr1 = [1, 2];
let arr2 = [3, 4];
let merged = [...arr1, ...arr2];  // [1, 2, 3, 4]

// Add elements
let arr3 = [2, 3, 4];
let withStart = [1, ...arr3];  // [1, 2, 3, 4]
let withEnd = [...arr3, 5];    // [2, 3, 4, 5]

// Convert string to array
let chars = [..."Hello"];  // ["H", "e", "l", "l", "o"]

// Math.max with array
let nums = [5, 2, 8, 1, 9];
let max = Math.max(...nums);  // 9
\`\`\`

## Practical Patterns

\`\`\`javascript
// Remove duplicates
let arr = [1, 2, 2, 3, 3, 3, 4];
let unique = [...new Set(arr)];  // [1, 2, 3, 4]

// Get random element
let items = ["a", "b", "c", "d"];
let random = items[Math.floor(Math.random() * items.length)];

// Flatten and sort
let nested = [[3, 1], [4, 2], [6, 5]];
let sorted = nested.flat().sort((a, b) => a - b);
console.log(sorted);  // [1, 2, 3, 4, 5, 6]
\`\`\``,
          estimatedMinutes: 20,
          exercises: [
            {
              title: "Array Operations",
              description: "Given an array of scores, find the average of top 3 scores",
              requirements: [
                "Create array with 5+ scores",
                "Sort descending",
                "Take top 3 with slice",
                "Calculate average with reduce",
                "Round to 2 decimal places",
              ],
              points: 20,
            },
          ],
        },
      ],
    },

    // ════════════════════════════════════════════════════════════
    // MODULE 12: Objects — Basics
    // ════════════════════════════════════════════════════════════
    {
      title: "Objects — Basics",
      description: "Creating and using objects — key-value pairs",
      lessons: [
        {
          title: "Object Fundamentals",
          slug: "object-fundamentals",
          content: `# Object Fundamentals

Objects store data as **key-value pairs** (also called properties).

## Creating Objects

\`\`\`javascript
// Object literal (most common)
let person = {
  name: "Alice",
  age: 25,
  city: "Bangkok",
  isStudent: true
};

// Empty object
let empty = {};
\`\`\`

## Accessing Properties

\`\`\`javascript
let person = { name: "Alice", age: 25 };

// Dot notation (preferred)
person.name        // "Alice"
person.age         // 25

// Bracket notation (required for dynamic keys)
person["name"]     // "Alice"
let key = "age";
person[key]        // 25

// Non-existent properties return undefined
person.email       // undefined
\`\`\`

## Modifying Objects

\`\`\`javascript
let person = { name: "Alice", age: 25 };

// Add new properties
person.email = "alice@example.com";
person["phone"] = "081-234-5678";

// Modify existing properties
person.age = 26;

// Delete properties
delete person.phone;

// Check if property exists
"name" in person            // true
"phone" in person           // false
person.hasOwnProperty("age") // true
\`\`\`

## Nested Objects

\`\`\`javascript
let user = {
  name: "Alice",
  address: {
    street: "123 Main St",
    city: "Bangkok",
    country: "Thailand"
  },
  hobbies: ["reading", "coding", "gaming"]
};

// Access nested properties
user.address.city              // "Bangkok"
user.hobbies[0]               // "reading"
user.address.zip?.code        // undefined (safe access)
\`\`\`

## Object Methods

\`\`\`javascript
let calculator = {
  result: 0,

  add(n) {
    this.result += n;
    return this;  // Enable chaining
  },

  subtract(n) {
    this.result -= n;
    return this;
  },

  reset() {
    this.result = 0;
    return this;
  },

  getResult() {
    return this.result;
  }
};

calculator.add(10).add(5).subtract(3);
console.log(calculator.getResult());  // 12
\`\`\``,
          estimatedMinutes: 25,
          exercises: [
            {
              title: "Student Profile",
              description: "Create a student object with nested data and methods",
              requirements: [
                "Name, age, major properties",
                "Nested address object",
                "Array of courses",
                "Method to add a course",
                "Method to display full profile",
              ],
              points: 20,
            },
          ],
        },
      ],
    },

    // ════════════════════════════════════════════════════════════
    // MODULE 13: Objects — Advanced
    // ════════════════════════════════════════════════════════════
    {
      title: "Objects — Advanced",
      description: "Object methods, destructuring, and working with object data",
      lessons: [
        {
          title: "Object Destructuring",
          slug: "object-destructuring",
          content: `# Object Destructuring

## Basic Destructuring

\`\`\`javascript
let person = { name: "Alice", age: 25, city: "Bangkok" };

// Extract properties into variables
let { name, age, city } = person;
console.log(name);  // "Alice"
console.log(age);   // 25

// Rename variables
let { name: userName, age: userAge } = person;
console.log(userName);  // "Alice"

// Default values
let { name, age, phone = "N/A" } = person;
console.log(phone);  // "N/A"
\`\`\`

## Nested Destructuring

\`\`\`javascript
let user = {
  name: "Alice",
  address: {
    street: "123 Main St",
    city: "Bangkok"
  }
};

let { name, address: { street, city } } = user;
console.log(name);   // "Alice"
console.log(city);   // "Bangkok"
\`\`\`

## Spread with Objects

\`\`\`javascript
let defaults = { color: "blue", size: "medium", visible: true };
let custom = { color: "red", size: "large" };

let config = { ...defaults, ...custom };
// { color: "red", size: "large", visible: true }

// Override specific properties
let updated = { ...person, age: 26, city: "Chiang Mai" };
\`\`\`

## Object.entries, keys, values

\`\`\`javascript
let person = { name: "Alice", age: 25, city: "Bangkok" };

Object.keys(person);     // ["name", "age", "city"]
Object.values(person);   // ["Alice", 25, "Bangkok"]
Object.entries(person);  // [["name", "Alice"], ["age", 25], ["city", "Bangkok"]]

// Iterate over object
for (let [key, value] of Object.entries(person)) {
  console.log(\`\${key}: \${value}\`);
}
\`\`\`

## Converting Between Arrays and Objects

\`\`\`javascript
// Array of pairs → Object
let pairs = [["a", 1], ["b", 2], ["c", 3]];
let obj = Object.fromEntries(pairs);
// { a: 1, b: 2, c: 3 }

// Object → Array of pairs
let entries = Object.entries({ a: 1, b: 2 });
// [["a", 1], ["b", 2]]
\`\`\``,
          estimatedMinutes: 25,
          exercises: [
            {
              title: "Config Manager",
              description: "Create a config manager using object destructuring and spread",
              requirements: [
                "Default config object",
                "User config that overrides defaults",
                "Merge using spread",
                "Allow dynamic property access",
              ],
              points: 20,
            },
          ],
        },
        {
          title: "Object Patterns and Best Practices",
          slug: "object-patterns",
          content: `# Object Patterns and Best Practices

## Computed Property Names

\`\`\`javascript
let fieldName = "email";
let person = {
  name: "Alice",
  [fieldName]: "alice@example.com",  // Computed key
  [\`get\${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}\`]() {
    return this[fieldName];
  }
};

console.log(person.email);            // "alice@example.com"
console.log(person.getEmail());       // "alice@example.com"
\`\`\`

## Shorthand Properties

\`\`\`javascript
let name = "Alice";
let age = 25;

// Shorthand (when variable name matches key)
let person = { name, age };
// Same as: { name: name, age: age }

// Shorthand methods
let obj = {
  // Regular
  greet: function() { return "Hello!"; },
  // Shorthand (same thing!)
  greet() { return "Hello!"; }
};
\`\`\`

## Object Freezing and Sealing

\`\`\`javascript
// freeze — no changes at all
let frozen = Object.freeze({ name: "Alice", age: 25 });
frozen.name = "Bob";   // ❌ Silently fails (or throws in strict mode)
frozen.newProp = "x";  // ❌ Can't add new properties
console.log(frozen.name);  // "Alice"

// seal — no adding/removing, but can modify existing
let sealed = Object.seal({ name: "Alice", age: 25 });
sealed.name = "Bob";    // ✅ Can modify existing
sealed.newProp = "x";   // ❌ Can't add new properties
delete sealed.name;     // ❌ Can't delete
\`\`\`

## Deep Copy vs Shallow Copy

\`\`\`javascript
let original = { a: 1, b: { c: 2 } };

// Shallow copy (spread)
let shallow = { ...original };
shallow.b.c = 99;
console.log(original.b.c);  // 99 (shared reference!)

// Deep copy
let deep = structuredClone(original);
// OR: JSON trick (no functions/symbols)
let deep2 = JSON.parse(JSON.stringify(original));

deep.b.c = 100;
console.log(original.b.c);  // 99 (not affected!)
\`\`\`

> **Best Practices:**
> - Use shorthand when variable names match
> - Freeze/seal objects that should be immutable
> - Use \`structuredClone()\` for deep copies
> - Prefer \`Object.entries()\` for iterating over objects`,
          estimatedMinutes: 25,
        },
      ],
    },

    // ════════════════════════════════════════════════════════════
    // MODULE 14: Functions — Declaration & Expression
    // ════════════════════════════════════════════════════════════
    {
      title: "Functions — Declaration & Expression",
      description: "Creating reusable code with functions",
      lessons: [
        {
          title: "Function Declarations and Expressions",
          slug: "function-basics",
          content: `# Function Declarations and Expressions

## Function Declaration

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("Alice"));  // "Hello, Alice!"
\`\`\`

**Hoisting:** Function declarations are hoisted (available before their definition).

\`\`\`javascript
sayHi();  // ✅ Works! (hoisted)

function sayHi() {
  console.log("Hi!");
}
\`\`\`

## Function Expression

\`\`\`javascript
const greet = function(name) {
  return \`Hello, \${name}!\`;
};

console.log(greet("Bob"));  // "Hello, Bob!"
\`\`\`

**Not hoisted:** Must define before using.

\`\`\`javascript
sayHi();  // ❌ TypeError: sayHi is not a function

const sayHi = function() {
  console.log("Hi!");
};
\`\`\`

## Parameters and Arguments

\`\`\`javascript
// Multiple parameters
function add(a, b) {
  return a + b;
}
add(3, 4);  // 7

// Default parameters
function greet(name = "World") {
  return \`Hello, \${name}!\`;
}
greet();        // "Hello, World!"
greet("Alice"); // "Hello, Alice!"

// Rest parameters
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4, 5);  // 15
\`\`\`

## Return Values

\`\`\`javascript
// Explicit return
function multiply(a, b) {
  return a * b;
}

// Implicit return (arrow functions only)
const double = x => x * 2;

// Return nothing → returns undefined
function log(message) {
  console.log(message);
  // implicitly returns undefined
}

// Early return
function divide(a, b) {
  if (b === 0) return null;  // guard clause
  return a / b;
}
\`\`\`

## First-Class Functions

Functions in JavaScript are **first-class citizens** — they can be:

\`\`\`javascript
// 1. Assigned to variables
const fn = function() {};

// 2. Passed as arguments
function run(fn) {
  fn();
}
run(() => console.log("Hello!"));

// 3. Returned from functions
function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}
const double = createMultiplier(2);
const triple = createMultiplier(3);
console.log(double(5));  // 10
console.log(triple(5));  // 15
\`\`\``,
          estimatedMinutes: 25,
          exercises: [
            {
              title: "Math Utilities",
              description: "Create utility functions for common math operations",
              requirements: [
                "function factorial(n) — calculate factorial",
                "function isPrime(n) — check if prime",
                "function fibonacci(n) — return nth fibonacci",
                "Use default parameters where appropriate",
              ],
              points: 25,
            },
          ],
        },
      ],
    },

    // ════════════════════════════════════════════════════════════
    // MODULE 15: Functions — Arrow & Advanced
    // ════════════════════════════════════════════════════════════
    {
      title: "Functions — Arrow & Advanced",
      description: "Arrow functions, callbacks, and higher-order functions",
      lessons: [
        {
          title: "Arrow Functions",
          slug: "arrow-functions",
          content: `# Arrow Functions

Arrow functions provide a **shorter syntax** and behave differently with \`this\`.

## Syntax Variations

\`\`\`javascript
// Full syntax
const add = (a, b) => {
  return a + b;
};

// Concise body (implicit return)
const add2 = (a, b) => a + b;

// Single parameter (no parens needed)
const double = x => x * 2;

// No parameters
const sayHi = () => "Hi!";

// Return object literal
const makeUser = (name, age) => ({ name, age });
const user = makeUser("Alice", 25);  // { name: "Alice", age: 25 }
\`\`\`

## Arrow vs Regular Functions

\`\`\`javascript
// Regular function — has its own 'this'
function Person(name) {
  this.name = name;
  this.sayHi = function() {
    console.log(\`Hi, I'm \${this.name}\`);  // works
  };
}

// Arrow function — inherits 'this' from parent
function Person(name) {
  this.name = name;
  this.sayHi = () => {
    console.log(\`Hi, I'm \${this.name}\`);  // works
  };
}
\`\`\`

## When NOT to Use Arrow Functions

\`\`\`javascript
// ❌ Object methods
const person = {
  name: "Alice",
  // Don't use arrow here:
  greet: () => console.log(this.name),  // undefined!
  
  // Use regular function or shorthand:
  greet() { console.log(this.name); }   // "Alice"
};

// ❌ Constructors
const Dog = (name) => { this.name = name; };
new Dog("Buddy");  // TypeError!

// ❌ Callbacks that need 'this'
button.addEventListener("click", () => {
  console.log(this);  // window, not the button
});
\`\`\`

## Higher-Order Functions

A higher-order function takes a function as argument or returns a function.

\`\`\`javascript
// Takes function as argument
function repeat(n, action) {
  for (let i = 0; i < n; i++) {
    action(i);
  }
}
repeat(3, i => console.log(\`Iteration \${i}\`));

// Returns a function
function createGreeter(greeting) {
  return (name) => \`\${greeting}, \${name}!\`;
}
const sayHello = createGreeter("Hello");
const sayGoodbye = createGreeter("Goodbye");
sayHello("Alice");    // "Hello, Alice!"
sayGoodbye("Bob");    // "Goodbye, Bob!"
\`\`\``,
          estimatedMinutes: 20,
        },
        {
          title: "Callback Functions",
          slug: "callback-functions",
          content: `# Callback Functions

A **callback** is a function passed as an argument to another function.

## Basic Callbacks

\`\`\`javascript
function doTask(callback) {
  console.log("Task started...");
  callback();  // Call the passed function
}

doTask(() => console.log("Task completed!"));
// Output:
// Task started...
// Task completed!
\`\`\`

## Asynchronous Callbacks

\`\`\`javascript
// setTimeout — runs after delay
setTimeout(() => {
  console.log("This runs after 2 seconds");
}, 2000);

// setInterval — runs repeatedly
let count = 0;
const interval = setInterval(() => {
  count++;
  console.log(\`Count: \${count}\`);
  if (count >= 5) clearInterval(interval);
}, 1000);

// Event listeners
button.addEventListener("click", function() {
  console.log("Button clicked!");
});
\`\`\`

## Array Methods with Callbacks

\`\`\`javascript
let numbers = [1, 2, 3, 4, 5];

// map — transform each element
let doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10]

// filter — keep matching elements
let evens = numbers.filter(n => n % 2 === 0);
// [2, 4]

// reduce — accumulate into single value
let sum = numbers.reduce((acc, n) => acc + n, 0);
// 15

// sort — custom comparison
let nums = [3, 1, 4, 1, 5, 9, 2, 6];
nums.sort((a, b) => a - b);
// [1, 1, 2, 3, 4, 5, 6, 9]

// find — first matching element
let found = numbers.find(n => n > 3);
// 4

// some — any element matches?
let hasNeg = numbers.some(n => n < 0);
// false

// every — all elements match?
let allPositive = numbers.every(n => n > 0);
// true
\`\`\`

## Error-First Callback Pattern

\`\`\`javascript
// Node.js convention
function readFile(path, callback) {
  // If error: callback(error, null)
  // If success: callback(null, data)
}

readFile("data.txt", (error, data) => {
  if (error) {
    console.error("Failed:", error.message);
    return;
  }
  console.log("Data:", data);
});
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },

    // ════════════════════════════════════════════════════════════
    // MODULE 16: Functions — Scope & Closures
    // ════════════════════════════════════════════════════════════
    {
      title: "Functions — Scope & Closures",
      description: "Understanding scope, closures, and the 'this' keyword",
      lessons: [
        {
          title: "Scope and Closures",
          slug: "scope-closures",
          content: `# Scope and Closures

## What is Scope?

Scope determines where variables are accessible.

\`\`\`javascript
let global = "I'm global";

function outer() {
  let outerVar = "I'm in outer";

  function inner() {
    let innerVar = "I'm in inner";
    console.log(global);    // ✅ accessible
    console.log(outerVar);  // ✅ accessible
    console.log(innerVar);  // ✅ accessible
  }

  inner();
  console.log(innerVar);    // ❌ ReferenceError!
}

outer();
console.log(outerVar);      // ❌ ReferenceError!
\`\`\`

## Block Scope (let/const)

\`\`\`javascript
if (true) {
  let x = 10;
  const y = 20;
  var z = 30;
}

// console.log(x);  // ❌ ReferenceError
// console.log(y);  // ❌ ReferenceError
console.log(z);     // 30 (var ignores block scope!)
\`\`\`

## What is a Closure?

A **closure** is a function that remembers variables from its outer scope.

\`\`\`javascript
function createCounter() {
  let count = 0;  // This variable is "closed over"

  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter = createCounter();
counter.increment();  // 1
counter.increment();  // 2
counter.decrement();  // 1
counter.getCount();   // 1

// 'count' is private — can't access it directly
console.log(counter.count);  // undefined
\`\`\`

## Practical Closures

\`\`\`javascript
// Private variables
function createBank(initialBalance) {
  let balance = initialBalance;

  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (amount > balance) throw new Error("Insufficient funds");
      balance -= amount;
      return balance;
    },
    getBalance() {
      return balance;
    }
  };
}

const account = createBank(1000);
account.deposit(500);      // 1500
account.withdraw(200);     // 1300
console.log(account.getBalance());  // 1300
\`\`\`

## IIFE (Immediately Invoked Function Expression)

\`\`\`javascript
// Creates a scope that runs immediately
const result = (function() {
  let secret = 42;
  return secret * 2;
})();
console.log(result);  // 84
// 'secret' is not accessible here
\`\`\`

> **Key Concept:** Closures allow functions to "remember" the environment where they were created.`,
          estimatedMinutes: 25,
          exercises: [
            {
              title: "Counter Factory",
              description: "Create a function that returns a counter with increment, decrement, and reset methods using closures",
              requirements: [
                "Use closure for private count",
                "increment() — adds 1, returns new count",
                "decrement() — subtracts 1, returns new count",
                "reset() — resets to 0",
                "getCount() — returns current count",
              ],
              points: 25,
            },
          ],
        },
      ],
    },

    // ════════════════════════════════════════════════════════════
    // MODULE 17: Error Handling
    // ════════════════════════════════════════════════════════════
    {
      title: "Error Handling",
      description: "Handling errors gracefully with try-catch-finally",
      lessons: [
        {
          title: "try-catch-finally",
          slug: "error-handling",
          content: `# Error Handling with try-catch-finally

## Basic Syntax

\`\`\`javascript
try {
  // Code that might throw an error
  riskyOperation();
} catch (error) {
  // Handle the error
  console.error("Something went wrong:", error.message);
} finally {
  // Always runs, whether error occurred or not
  cleanup();
}
\`\`\`

## Common Errors

\`\`\`javascript
// TypeError
"hello".toUpperCase(123);  // TypeError: ...
null.toString();           // TypeError: Cannot read properties of null

// ReferenceError
console.log(x);            // ReferenceError: x is not defined

// SyntaxError
eval("if (true) {");       // SyntaxError: Unexpected end of input

// RangeError
(10).toString(37);         // RangeError: toString() radix must be between 2 and 36

// URIError
decodeURIComponent("%");   // URIError: URI malformed
\`\`\`

## Throwing Custom Errors

\`\`\`javascript
function divide(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("Both arguments must be numbers");
  }
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

try {
  console.log(divide(10, 0));
} catch (error) {
  console.error(error.message);  // "Cannot divide by zero"
}
\`\`\`

## Custom Error Classes

\`\`\`javascript
class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

function validateEmail(email) {
  if (!email.includes("@")) {
    throw new ValidationError("email", "Invalid email format");
  }
}

try {
  validateEmail("notanemail");
} catch (error) {
  if (error instanceof ValidationError) {
    console.error(\`\${error.field}: \${error.message}\`);
  } else {
    throw error;  // Re-throw unexpected errors
  }
}
\`\`\`

## Error Handling Patterns

\`\`\`javascript
// Pattern 1: Try-catch with fallback
function getUser(id) {
  try {
    return fetchUser(id);
  } catch {
    return { name: "Unknown", id };
  }
}

// Pattern 2: Async error handling
async function loadData() {
  try {
    const response = await fetch("/api/data");
    if (!response.ok) throw new Error("HTTP " + response.status);
    return await response.json();
  } catch (error) {
    console.error("Failed to load:", error);
    return null;
  }
}
\`\`\`

> **Best Practice:** Always handle errors gracefully. Never let your app crash silently.`,
          estimatedMinutes: 20,
          exercises: [
            {
              title: "Safe Calculator",
              description: "Build a calculator that handles division by zero, non-numeric inputs, and overflow",
              requirements: [
                "Wrap operations in try-catch",
                "Throw TypeError for non-numbers",
                "Throw Error for division by zero",
                "Return meaningful error messages",
              ],
              points: 20,
            },
          ],
        },
      ],
    },

    // ════════════════════════════════════════════════════════════
    // MODULE 18: String Methods
    // ════════════════════════════════════════════════════════════
    {
      title: "String Methods",
      description: "Working with strings — searching, transforming, and formatting",
      lessons: [
        {
          title: "String Methods in Depth",
          slug: "string-methods",
          content: `# String Methods in Depth

## Searching

\`\`\`javascript
let str = "Hello, World!";

str.includes("World")        // true
str.includes("world")        // false (case-sensitive!)
str.startsWith("Hello")      // true
str.endsWith("!")            // true
str.indexOf("World")         // 7
str.lastIndexOf("l")         // 9
str.indexOf("xyz")           // -1 (not found)
\`\`\`

## Extracting

\`\`\`javascript
let str = "Hello, World!";

str.slice(0, 5)              // "Hello"
str.slice(7)                 // "World!"
str.slice(-6)                // "orld!"
str.slice(-6, -1)            // "orld"

str.substring(0, 5)          // "Hello" (similar to slice)
str.substring(7, 0)          // "Hello" (reverses if start > end)
\`\`\`

## Transforming

\`\`\`javascript
let str = "  Hello, World!  ";

str.toUpperCase()            // "  HELLO, WORLD!  "
str.toLowerCase()            // "  hello, world!  "
str.trim()                   // "Hello, World!"
str.trimStart()              // "Hello, World!  "
str.trimEnd()                // "  Hello, World!"
str.padStart(20, "-")        // "---  Hello, World!  "
str.padEnd(20, ".")          // "  Hello, World!  ..."
str.repeat(3)                // "  Hello, World!    Hello, World!    Hello, World!  "
\`\`\`

## Replacing

\`\`\`javascript
let str = "Hello, World!";

str.replace("World", "JS")       // "Hello, JS!"
str.replaceAll("l", "L")          // "HeLLo, WorLd!"
str.replace(/o/g, "0")           // "Hell0, W0rld!" (regex)
\`\`\`

## Splitting and Joining

\`\`\`javascript
// Split string → array
"a,b,c".split(",")           // ["a", "b", "c"]
"Hello".split("")            // ["H", "e", "l", "l", "o"]
"Hello World".split(" ")     // ["Hello", "World"]
"Hello".split("", 3)         // ["H", "e", "l"] (limit)

// Array → string
["a", "b", "c"].join("-")    // "a-b-c"
["Hello", "World"].join(" ") // "Hello World"
\`\`\`

## Template Literals (Backticks)

\`\`\`javascript
let name = "Alice";
let age = 25;

// String interpolation
let msg = \`Hello, \${name}! You are \${age} years old.\`;

// Expressions in template literals
let price = 29.99;
let total = \`Total: $\${(price * 1.07).toFixed(2)}\`;

// Multi-line strings
let html = \`
  <div>
    <h1>\${name}</h1>
    <p>Age: \${age}</p>
  </div>
\`;
\`\`\``,
          estimatedMinutes: 20,
          exercises: [
            {
              title: "Text Formatter",
              description: "Build a text formatting utility with multiple string methods",
              requirements: [
                "Function to capitalize first letter of each word",
                "Function to count vowels in a string",
                "Function to reverse a string",
                "Function to truncate string with ellipsis",
              ],
              points: 25,
            },
          ],
        },
      ],
    },

    // ════════════════════════════════════════════════════════════
    // MODULE 19: JSON & Data Handling
    // ════════════════════════════════════════════════════════════
    {
      title: "JSON & Data Handling",
      description: "Working with JSON, data structures, and data transformation",
      lessons: [
        {
          title: "JSON — parse and stringify",
          slug: "json-basics",
          content: `# JSON — JavaScript Object Notation

JSON is the standard format for exchanging data between servers and browsers.

## JSON.stringify — Object → String

\`\`\`javascript
let person = {
  name: "Alice",
  age: 25,
  hobbies: ["reading", "coding"]
};

let jsonStr = JSON.stringify(person);
console.log(jsonStr);
// '{"name":"Alice","age":25,"hobbies":["reading","coding"]}'

// Pretty print
let pretty = JSON.stringify(person, null, 2);
console.log(pretty);
// {
//   "name": "Alice",
//   "age": 25,
//   "hobbies": ["reading", "coding"]
// }

// Custom serialization
let filtered = JSON.stringify(person, (key, value) => {
  if (key === "age") return undefined;  // Exclude age
  return value;
});
console.log(filtered);  // {"name":"Alice","hobbies":["reading","coding"]}
\`\`\`

## JSON.parse — String → Object

\`\`\`javascript
let jsonStr = '{"name":"Alice","age":25}';
let obj = JSON.parse(jsonStr);
console.log(obj.name);  // "Alice"

// Safe parsing
try {
  let data = JSON.parse(invalidJson);
} catch (error) {
  console.error("Invalid JSON:", error.message);
}
\`\`\`

## Data Transformation Patterns

\`\`\`javascript
// Deep clone via JSON
let original = { a: 1, b: { c: 2 } };
let clone = JSON.parse(JSON.stringify(original));

// Convert to/from query strings
let params = { name: "Alice", age: 25 };
let queryString = new URLSearchParams(params).toString();
// "name=Alice&age=25"

let parsed = Object.fromEntries(new URLSearchParams(queryString));
// { name: "Alice", age: "25" }  ← Note: all strings!
\`\`\`

## localStorage with JSON

\`\`\`javascript
// Save data
let user = { name: "Alice", theme: "dark" };
localStorage.setItem("user", JSON.stringify(user));

// Load data
let saved = localStorage.getItem("user");
if (saved) {
  let user = JSON.parse(saved);
  console.log(user.name);  // "Alice"
}

// Remove data
localStorage.removeItem("user");
\`\`\`

> **Important:** JSON only supports strings, numbers, booleans, arrays, objects, and null. Functions, undefined, Date, Map, Set, etc. are NOT directly serializable.`,
          estimatedMinutes: 25,
          exercises: [
            {
              title: "Data Store",
              description: "Build a simple key-value data store using localStorage and JSON",
              requirements: [
                "set(key, value) — save to localStorage",
                "get(key) — load from localStorage",
                "remove(key) — delete from localStorage",
                "getAll() — return all stored data",
                "Handle errors gracefully",
              ],
              points: 20,
            },
          ],
        },
      ],
    },

    // ════════════════════════════════════════════════════════════
    // MODULE 20: Project Application — To-Do Manager
    // ════════════════════════════════════════════════════════════
    {
      title: "Project Application — To-Do Manager",
      description: "Build a complete To-Do Manager app using all JavaScript concepts learned",
      lessons: [
        {
          title: "Project Architecture",
          slug: "todo-architecture",
          content: `# To-Do Manager — Project Architecture

We'll build a complete **To-Do Manager** that uses concepts from all previous modules.

## Project Structure

\`\`\`
todo-manager/
├── index.html
├── style.css
└── app.js
\`\`\`

## Features

1. ✅ Add, edit, delete tasks
2. ✅ Mark tasks as complete
3. ✅ Filter tasks (All / Active / Completed)
4. ✅ Search tasks
5. ✅ Local storage persistence
6. ✅ Task statistics

## Concepts Used

| Module | Concept | Where Used |
|--------|---------|------------|
| 2 | Variables | All state management |
| 3 | Data Types | Type checking for inputs |
| 4 | Operators | Comparisons, ternary |
| 5-6 | Conditionals | Validation, filtering |
| 7-8 | Loops | Rendering task lists |
| 9 | break/continue | Search algorithm |
| 10-11 | Arrays | Task storage, filter/sort |
| 12-13 | Objects | Task data structure |
| 14-16 | Functions | All methods |
| 17 | Error Handling | Input validation |
| 18 | String Methods | Search, formatting |
| 19 | JSON | localStorage |`,
          estimatedMinutes: 15,
        },
        {
          title: "HTML & CSS Setup",
          slug: "todo-setup",
          content: `# To-Do Manager — HTML & CSS

## index.html

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>To-Do Manager</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <header>
      <h1>📝 To-Do Manager</h1>
      <div class="stats" id="stats"></div>
    </header>

    <!-- Add Task Form -->
    <form id="todo-form">
      <input type="text" id="task-input" placeholder="What needs to be done?" required>
      <select id="priority-select">
        <option value="low">🟢 Low</option>
        <option value="medium" selected>🟡 Medium</option>
        <option value="high">🔴 High</option>
      </select>
      <button type="submit">Add Task</button>
    </form>

    <!-- Search & Filter -->
    <div class="controls">
      <input type="text" id="search-input" placeholder="🔍 Search tasks...">
      <div class="filters">
        <button class="filter-btn active" data-filter="all">All</button>
        <button class="filter-btn" data-filter="active">Active</button>
        <button class="filter-btn" data-filter="completed">Completed</button>
      </div>
    </div>

    <!-- Task List -->
    <ul id="task-list"></ul>

    <!-- Actions -->
    <div class="actions" id="actions" style="display: none;">
      <button id="clear-completed">Clear Completed</button>
      <button id="clear-all">Clear All</button>
    </div>
  </div>

  <script src="app.js"></script>
</body>
</html>
\`\`\`

## style.css

\`\`\`css
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Segoe UI', sans-serif;
  background: #1a1a2e;
  color: #eee;
  min-height: 100vh;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

header { text-align: center; margin-bottom: 2rem; }
header h1 { font-size: 2rem; }

.stats {
  margin-top: 0.5rem;
  color: #aaa;
  font-size: 0.9rem;
}

#todo-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

#task-input {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #333;
  border-radius: 8px;
  background: #16213e;
  color: #eee;
  font-size: 1rem;
}

#priority-select {
  padding: 0.75rem;
  border: 2px solid #333;
  border-radius: 8px;
  background: #16213e;
  color: #eee;
}

button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: transform 0.1s;
}
button:active { transform: scale(0.95); }

#todo-form button {
  background: #0f3460;
  color: #eee;
}

.controls {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

#search-input {
  flex: 1;
  padding: 0.5rem;
  border: 2px solid #333;
  border-radius: 8px;
  background: #16213e;
  color: #eee;
}

.filters { display: flex; gap: 0.25rem; }

.filter-btn {
  padding: 0.5rem 1rem;
  background: #16213e;
  color: #aaa;
  border: 2px solid #333;
  border-radius: 8px;
  font-size: 0.85rem;
}
.filter-btn.active {
  background: #0f3460;
  color: #eee;
  border-color: #0f3460;
}

#task-list { list-style: none; }

.task-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  margin-bottom: 0.5rem;
  background: #16213e;
  border-radius: 8px;
  border-left: 4px solid;
}
.task-item.low { border-color: #2ecc71; }
.task-item.medium { border-color: #f39c12; }
.task-item.high { border-color: #e74c3c; }
.task-item.completed { opacity: 0.5; }

.task-item input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.task-text { flex: 1; }
.task-text.completed { text-decoration: line-through; }

.task-actions { display: flex; gap: 0.25rem; }
.task-actions button {
  padding: 0.4rem 0.8rem;
  font-size: 0.8rem;
}
.edit-btn { background: #3498db; color: white; }
.delete-btn { background: #e74c3c; color: white; }

.actions {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 1rem;
}
#clear-completed { background: #e67e22; color: white; }
#clear-all { background: #c0392b; color: white; }
\`\`\``,
          estimatedMinutes: 15,
        },
        {
          title: "JavaScript Logic — Part 1: Core Functions",
          slug: "todo-js-part1",
          content: `# To-Do Manager — Core JavaScript

## app.js (Part 1: Data & CRUD)

\`\`\`javascript
// ═══════════════════════════════════════════════════════
// MODULE: Data Layer & CRUD Operations
// ═══════════════════════════════════════════════════════

// --- State ---
let tasks = [];
let currentFilter = "all";
let searchQuery = "";
let editingId = null;

// --- Load from localStorage ---
function loadTasks() {
  try {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      tasks = JSON.parse(saved);
    }
  } catch (error) {
    console.error("Failed to load tasks:", error);
    tasks = [];
  }
}

// --- Save to localStorage ---
function saveTasks() {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (error) {
    console.error("Failed to save tasks:", error);
  }
}

// --- Generate unique ID ---
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

// --- Create Task ---
function createTask(text, priority = "medium") {
  if (!text || typeof text !== "string") {
    throw new TypeError("Task text must be a non-empty string");
  }

  const task = {
    id: generateId(),
    text: text.trim(),
    priority,
    completed: false,
    createdAt: new Date().toISOString()
  };

  tasks.unshift(task);  // Add to beginning
  saveTasks();
  render();
  return task;
}

// --- Update Task ---
function updateTask(id, updates) {
  const task = tasks.find(t => t.id === id);
  if (!task) {
    console.warn("Task not found:", id);
    return null;
  }

  Object.assign(task, updates);
  saveTasks();
  render();
  return task;
}

// --- Delete Task ---
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  render();
}

// --- Toggle Complete ---
function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    render();
  }
}

// --- Clear Completed ---
function clearCompleted() {
  tasks = tasks.filter(t => !t.completed);
  saveTasks();
  render();
}

// --- Clear All ---
function clearAll() {
  if (confirm("Delete ALL tasks? This cannot be undone.")) {
    tasks = [];
    saveTasks();
    render();
  }
}
\`\`\``,
          estimatedMinutes: 25,
        },
        {
          title: "JavaScript Logic — Part 2: Rendering & Events",
          slug: "todo-js-part2",
          content: `# To-Do Manager — Rendering & Events

## app.js (Part 2: UI & Event Handling)

\`\`\`javascript
// ═══════════════════════════════════════════════════════
// MODULE: Rendering & Event Handling
// ═══════════════════════════════════════════════════════

// --- Get filtered & searched tasks ---
function getFilteredTasks() {
  let filtered = tasks;

  // Apply filter
  switch (currentFilter) {
    case "active":
      filtered = filtered.filter(t => !t.completed);
      break;
    case "completed":
      filtered = filtered.filter(t => t.completed);
      break;
    // "all" — no filter needed
  }

  // Apply search
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(t =>
      t.text.toLowerCase().includes(query)
    );
  }

  return filtered;
}

// --- Format date ---
function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

// --- Render single task ---
function renderTask(task) {
  return \`
    <li class="task-item \${task.priority} \${task.completed ? 'completed' : ''}" data-id="\${task.id}">
      <input
        type="checkbox"
        \${task.completed ? 'checked' : ''}
        onchange="toggleTask('\${task.id}')"
      >
      <div class="task-text \${task.completed ? 'completed' : ''}">
        <strong>\${escapeHtml(task.text)}</strong>
        <small> · \${task.priority} · \${formatDate(task.createdAt)}</small>
      </div>
      <div class="task-actions">
        <button class="edit-btn" onclick="startEdit('\${task.id}')">✏️</button>
        <button class="delete-btn" onclick="deleteTask('\${task.id}')">🗑️</button>
      </div>
    </li>
  \`;
}

// --- Escape HTML (prevent XSS) ---
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// --- Render all tasks ---
function render() {
  const taskList = document.getElementById("task-list");
  const statsEl = document.getElementById("stats");
  const actionsEl = document.getElementById("actions");

  const filtered = getFilteredTasks();
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const active = total - completed;

  // Render task list
  if (filtered.length === 0) {
    taskList.innerHTML = \`
      <li class="task-item" style="justify-content: center; border: none;">
        \${total === 0 ? '📝 No tasks yet. Add one above!' : '🔍 No matching tasks.'}
      </li>
    \`;
  } else {
    taskList.innerHTML = filtered.map(renderTask).join("");
  }

  // Update stats
  statsEl.textContent = \`\${active} active · \${completed} completed · \${total} total\`;

  // Show/hide action buttons
  actionsEl.style.display = total > 0 ? "flex" : "none";
}

// --- Start editing a task ---
function startEdit(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  const input = document.getElementById("task-input");
  const form = document.getElementById("todo-form");

  input.value = task.text;
  input.focus();
  editingId = id;

  // Change button text
  form.querySelector("button[type=submit]").textContent = "Update";
}

// --- Event Listeners ---
document.addEventListener("DOMContentLoaded", () => {
  // Load saved tasks
  loadTasks();
  render();

  // Form submission (add/update)
  document.getElementById("todo-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const input = document.getElementById("task-input");
    const priority = document.getElementById("priority-select").value;
    const text = input.value.trim();

    if (!text) return;

    try {
      if (editingId) {
        updateTask(editingId, { text });
        editingId = null;
        document.querySelector("#todo-form button[type=submit]").textContent = "Add Task";
      } else {
        createTask(text, priority);
      }
      input.value = "";
      input.focus();
    } catch (error) {
      console.error("Error:", error.message);
    }
  });

  // Search input
  document.getElementById("search-input").addEventListener("input", (e) => {
    searchQuery = e.target.value;
    render();
  });

  // Filter buttons
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      render();
    });
  });

  // Clear buttons
  document.getElementById("clear-completed").addEventListener("click", clearCompleted);
  document.getElementById("clear-all").addEventListener("click", clearAll);

  // Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    // Escape to cancel edit
    if (e.key === "Escape" && editingId) {
      editingId = null;
      document.getElementById("task-input").value = "";
      document.querySelector("#todo-form button[type=submit]").textContent = "Add Task";
    }
  });
});
\`\`\`

## How Every Module Is Used

| Module | Concept | Usage in Project |
|--------|---------|-----------------|
| 1 | console.log | Debug logging |
| 2 | let/const | All variables (let for mutable, const for DOM refs) |
| 3 | Data Types | Type checking, typeof for validation |
| 4 | Operators | Comparison (===), ternary (condition ? A : B), spread (...) |
| 5 | if/else | Input validation, checking states |
| 6 | if-else-if & switch | Filter selection, task state checks |
| 7 | for loop | Rendering iteration, stats counting |
| 8 | while | While editing (in the form loop) |
| 9 | break/continue | Early exit in search, skip invalid tasks |
| 10 | Array basics | tasks array, push/filter/find |
| 11 | Array methods | filter(), map(), find(), reduce() |
| 12 | Object basics | Task object {id, text, priority, completed} |
| 13 | Object advanced | Object.assign, Object.entries, destructuring |
| 14 | Functions | createTask(), deleteTask(), render() |
| 15 | Arrow functions | Callbacks in filter/map/event listeners |
| 16 | Scope/closures | Private tasks array, module pattern |
| 17 | Error handling | try-catch for localStorage, input validation |
| 18 | String methods | trim(), toLowerCase(), includes(), padStart() |
| 19 | JSON | localStorage JSON.parse/stringify |

> **Congratulations!** You've built a complete application using 20 modules of JavaScript knowledge! 🎉`,
          estimatedMinutes: 30,
          exercises: [
            {
              title: "Enhance the To-Do Manager",
              description: "Add 3 new features to the To-Do Manager",
              requirements: [
                "Add due date support with date picker",
                "Add drag-and-drop to reorder tasks",
                "Add export to JSON file",
              ],
              points: 50,
            },
          ],
          quiz: {
            title: "Final Project Quiz",
            questions: [
              {
                question: "What method is used to convert a JavaScript object to a JSON string?",
                type: "MULTIPLE_CHOICE",
                options: [
                  { text: "JSON.parse()", isCorrect: false },
                  { text: "JSON.stringify()", isCorrect: true },
                  { text: "JSON.convert()", isCorrect: false },
                  { text: "JSON.toString()", isCorrect: false },
                ],
              },
              {
                question: "Which array method creates a new array with elements that pass a test?",
                type: "MULTIPLE_CHOICE",
                options: [
                  { text: "map()", isCorrect: false },
                  { text: "forEach()", isCorrect: false },
                  { text: "filter()", isCorrect: true },
                  { text: "reduce()", isCorrect: false },
                ],
              },
              {
                question: "The 'switch' statement uses strict equality (===) to match cases.",
                type: "TRUE_FALSE",
                options: [
                  { text: "True", isCorrect: true },
                  { text: "False", isCorrect: false },
                ],
              },
              {
                question: "Which of the following is NOT a falsy value in JavaScript?",
                type: "MULTIPLE_CHOICE",
                options: [
                  { text: '"" (empty string)', isCorrect: false },
                  { text: "0", isCorrect: false },
                  { text: "[] (empty array)", isCorrect: true },
                  { text: "null", isCorrect: false },
                ],
              },
              {
                question: "What is the output of: typeof null?",
                type: "MULTIPLE_CHOICE",
                options: [
                  { text: '"null"', isCorrect: false },
                  { text: '"undefined"', isCorrect: false },
                  { text: '"object"', isCorrect: true },
                  { text: '"boolean"', isCorrect: false },
                ],
              },
            ],
          },
        },
      ],
    },
  ],
};
