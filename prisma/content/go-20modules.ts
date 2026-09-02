import type { CourseContent } from "../seed-content";

export const goBasic20Modules: CourseContent = {
  slug: "go-basic",
  modules: [
    // Module 1: Introduction
    {
      title: "Introduction to Go",
      description: "What is Go, history, and getting started",
      lessons: [
        {
          title: "What is Go?",
          slug: "go-intro",
          content: `# What is Go?

Go (Golang) is a statically-typed, compiled language created at Google in 2009.

## Why Learn Go?
- **Fast compilation** and execution
- **Built-in concurrency** with goroutines
- **Simple syntax** — easy to read and write
- **Great for**: APIs, microservices, CLI tools, cloud infrastructure

## Your First Program

\`\`\`go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
\`\`\`

## Running Go Programs

\`\`\`bash
go run main.go        # Run directly
go build -o app       # Build binary
./app                 # Run binary
\`\`\`

> **Tip:** Go uses \`package main\` as the entry point and \`func main()\` as the entry function.`,
          estimatedMinutes: 15,
          exercises: [
            {
              title: "Hello Go",
              description: "Create a program that prints your name and age",
              requirements: ["Use fmt.Println", "Print at least 2 values", "Run with go run"],
              points: 10,
            },
          ],
        },
        {
          title: "Go Development Environment",
          slug: "go-setup",
          content: `# Setting Up Go

## Install Go
Download from golang.org

## Verify
\`\`\`bash
go version
\`\`\`

## Create Module
\`\`\`bash
go mod init github.com/username/myproject
\`\`\`

## IDEs
- **GoLand** (JetBrains)
- **VS Code** with Go extension`,
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
          title: "Variables in Go",
          slug: "go-variables",
          content: `# Variables

## Variable Declaration
\`\`\`go
// Explicit type
var name string = "Alice"

// Inferred type
age := 25

// Multiple declarations
var (
    x int = 10
    y bool = true
)

// Constants
const Pi = 3.14159
const (
    StatusOK = 200
    StatusNotFound = 404
)
\`\`\`

## Basic Types

| Type | Size | Example |
|------|------|---------|
| \`int\` | Platform-dependent | \`42\` |
| \`float64\` | 64-bit | \`3.14\` |
| \`string\` | UTF-8 | \`"hello"\` |
| \`bool\` | true/false | \`true\` |
| \`byte\` | uint8 | \`'A'\` |

## Zero Values

\`\`\`go
var i int       // 0
var f float64   // 0.0
var s string    // ""
var b bool      // false
\`\`\`

> **Tip:** Use \`:=\` for short variable declaration inside functions.`,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 3: Data Types
    {
      title: "Data Types Deep Dive",
      description: "Composite types, maps, and type conversion",
      lessons: [
        {
          title: "Composite Types",
          slug: "go-composite-types",
          content: `# Composite Types

## Structs
\`\`\`go
type Person struct {
    Name string
    Age  int
}

p := Person{Name: "Alice", Age: 25}
\`\`\`

## Arrays (Fixed Size)
\`\`\`go
var arr [5]int = [5]int{1, 2, 3, 4, 5}
fmt.Println(len(arr))  // 5
\`\`\`

## Slices (Dynamic)
\`\`\`go
slice := []int{1, 2, 3}
slice = append(slice, 4, 5)

sub := slice[1:3]  // [2, 3]
\`\`\`

## Maps
\`\`\`go
person := map[string]string{
    "name": "Alice",
    "age":  "25",
}

person["email"] = "alice@example.com"
delete(person, "age")
\`\`\`

## Type Conversion
\`\`\`go
i := 42
f := float64(i)
s := strconv.Itoa(i)
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 4: Operators
    {
      title: "Operators",
      description: "Arithmetic, comparison, logical operators",
      lessons: [
        {
          title: "Operators in Go",
          slug: "go-operators",
          content: `# Operators

## Arithmetic
\`\`\`go
a, b := 10, 3
fmt.Println(a + b)   // 13
fmt.Println(a - b)   // 7
fmt.Println(a * b)   // 30
fmt.Println(a / b)   // 3 (integer division)
fmt.Println(a % b)   // 1
\`\`\`

## Comparison
\`\`\`go
fmt.Println(5 == 5)  // true
fmt.Println(5 != 3)  // true
fmt.Println(5 > 3)   // true
fmt.Println(5 < 3)   // false
\`\`\`

## Logical
\`\`\`go
x, y := true, false
fmt.Println(x && y)  // false (AND)
fmt.Println(x || y)  // true  (OR)
fmt.Println(!x)      // false (NOT)
\`\`\`

## Short Circuit
\`\`\`go
// && stops at first false
// || stops at first true
\`\`\``,
          estimatedMinutes: 15,
          exercises: [
            {
              title: "Operator Practice",
              description: "Write a program that uses all operator types",
              requirements: ["Arithmetic ops", "Comparison ops", "Logical ops"],
              points: 15,
            },
          ],
        },
      ],
    },
    // Module 5: if Statement
    {
      title: "If Statement",
      description: "Single if condition in Go",
      lessons: [
        {
          title: "If in Go",
          slug: "go-if",
          content: `# If Statement

## Basic If
\`\`\`go
age := 20

if age >= 18 {
    fmt.Println("You can vote!")
}
\`\`\`

## If with Initial Statement
\`\`\`go
if score := getScore(); score >= 90 {
    fmt.Println("Grade: A")
}
\`\`\`

## Nested If
\`\`\`go
isMember := true
age := 25

if isMember {
    if age >= 18 {
        fmt.Println("Welcome!")
    }
}
\`\`\`

> **Go特色:** if 里面可以先执行语句再判断条件。`,
          estimatedMinutes: 15,
        },
      ],
    },
    // Module 6: if-else and if-else-if
    {
      title: "If-Else and If-Else-If",
      description: "Conditional branching",
      lessons: [
        {
          title: "If-Else in Go",
          slug: "go-if-else",
          content: `# If-Else

\`\`\`go
temperature := 25

if temperature > 30 {
    fmt.Println("It's hot!")
} else {
    fmt.Println("It's nice outside.")
}
\`\`\`

## If-Else-If Chain
\`\`\`go
score := 75
var grade string

if score >= 90 {
    grade = "A"
} else if score >= 80 {
    grade = "B"
} else if score >= 70 {
    grade = "C"
} else if score >= 60 {
    grade = "D"
} else {
    grade = "F"
}

fmt.Println("Grade:", grade)  // C
\`\`\`

## Guard Clauses
\`\`\`go
func process(n int) error {
    if n <= 0 {
        return errors.New("must be positive")
    }
    // Continue processing
    return nil
}
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
          title: "Switch in Go",
          slug: "go-switch",
          content: `# Switch Statement

\`\`\`go
day := "Monday"

switch day {
case "Monday":
    fmt.Println("Start of week")
case "Friday":
    fmt.Println("Almost weekend")
case "Saturday", "Sunday":
    fmt.Println("Weekend!")
default:
    fmt.Println("Regular day")
}
\`\`\`

## Switch with No Condition
\`\`\`go
score := 85

switch {
case score >= 90:
    fmt.Println("A")
case score >= 80:
    fmt.Println("B")
case score >= 70:
    fmt.Println("C")
default:
    fmt.Println("F")
}
\`\`\`

## Type Switch
\`\`\`go
func describe(i interface{}) {
    switch v := i.(type) {
    case int:
        fmt.Printf("Integer: %d\\n", v)
    case string:
        fmt.Printf("String: %s\\n", v)
    default:
        fmt.Printf("Unknown: %T\\n", v)
    }
}
\`\`\`

> **Note:** Go's switch doesn't fall through by default (no \`break\` needed).`,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 8: For Loop
    {
      title: "For Loop",
      description: "Go's only loop construct",
      lessons: [
        {
          title: "For Loop in Go",
          slug: "go-for",
          content: `# For Loop

Go only has \`for\` — no \`while\` or \`do-while\`.

## Traditional For
\`\`\`go
for i := 0; i < 5; i++ {
    fmt.Println(i)  // 0, 1, 2, 3, 4
}
\`\`\`

## While-style
\`\`\`go
count := 0
for count < 5 {
    fmt.Println(count)
    count++
}
\`\`\`

## Infinite Loop
\`\`\`go
for {
    // do something
    break  // exit when done
}
\`\`\`

## Range
\`\`\`go
fruits := []string{"apple", "banana", "cherry"}

for i, fruit := range fruits {
    fmt.Printf("%d: %s\\n", i, fruit)
}

// Ignore index
for _, fruit := range fruits {
    fmt.Println(fruit)
}

// Only index
for i := range fruits {
    fmt.Println(i)
}
\`\`\``,
          estimatedMinutes: 20,
          exercises: [
            {
              title: "FizzBuzz in Go",
              description: "Implement FizzBuzz from 1-100",
              requirements: ["Use for loop", "Use modulo", "Handle Fizz, Buzz, FizzBuzz"],
              points: 15,
            },
          ],
        },
      ],
    },
    // Module 9: While and Do-While
    {
      title: "While and Do-While Patterns",
      description: "Simulating while and do-while in Go",
      lessons: [
        {
          title: "While and Do-While Patterns",
          slug: "go-while-patterns",
          content: `# While and Do-While Patterns

## While Pattern
\`\`\`go
// while condition { ... }
i := 0
for i < 5 {
    fmt.Println(i)
    i++
}
\`\`\`

## Do-While Pattern
\`\`\`go
// do { ... } while (condition)
num := 1
for {
    fmt.Println(num)
    num *= 2
    if num > 16 {
        break
    }
}
// Output: 1, 2, 4, 8, 16
\`\`\`

## Loop with Break and Continue
\`\`\`go
for i := 0; i < 100; i++ {
    if i%2 != 0 {
        continue  // skip odd
    }
    if i > 10 {
        break  // stop after 10
    }
    fmt.Println(i)  // 0, 2, 4, 6, 8, 10
}
\`\`\``,
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
          slug: "go-loop-control",
          content: `# Break and Continue

## Break
\`\`\`go
for i := 0; i < 100; i++ {
    if i == 5 {
        break
    }
    fmt.Println(i)  // 0, 1, 2, 3, 4
}
\`\`\`

## Continue
\`\`\`go
for i := 0; i < 10; i++ {
    if i%2 == 0 {
        continue  // skip even
    }
    fmt.Println(i)  // 1, 3, 5, 7, 9
}
\`\`\`

## Break with Label
\`\`\`go
outer:
for i := 0; i < 5; i++ {
    for j := 0; j < 5; j++ {
        if j == 3 {
            break outer
        }
        fmt.Printf("%d,%d ", i, j)
    }
}
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
          slug: "go-arrays-slices",
          content: `# Arrays and Slices

## Arrays (Fixed Size)
\`\`\`go
var arr [5]int = [5]int{1, 2, 3, 4, 5}
fmt.Println(len(arr))  // 5

// Array literal
arr2 := [3]string{"a", "b", "c"}

// Auto-size
arr3 := [...]int{1, 2, 3}
\`\`\`

## Slices (Dynamic)
\`\`\`go
slice := []int{1, 2, 3}
slice = append(slice, 4, 5)

// Sub-slice
sub := slice[1:3]  // [2, 3]

// Make
s := make([]int, 5)      // len=5, cap=5
s2 := make([]int, 0, 10) // len=0, cap=10
\`\`\`

## Useful Slice Operations
\`\`\`go
import "sort"

nums := []int{3, 1, 4, 1, 5, 9}

sort.Ints(nums)           // [1, 1, 3, 4, 5, 9]
sort.Sort(sort.Reverse(sort.IntSlice(nums)))  // Descending

contains := sort.SearchInts(nums, 4)  // Index
\`\`\``,
          estimatedMinutes: 25,
          exercises: [
            {
              title: "Array Statistics",
              description: "Find min, max, and average of a slice",
              requirements: ["Create slice", "Find min", "Find max", "Calculate average"],
              points: 20,
            },
          ],
        },
      ],
    },
    // Module 12: Advanced Arrays
    {
      title: "Advanced Slices",
      description: "Slicing, copying, and multi-dimensional slices",
      lessons: [
        {
          title: "Advanced Slice Operations",
          slug: "go-advanced-slices",
          content: `# Advanced Slices

## Copying
\`\`\`go
src := []int{1, 2, 3}
dst := make([]int, len(src))
copy(dst, src)
\`\`\`

## Delete Element
\`\`\`go
func removeIndex(s []int, index int) []int {
    return append(s[:index], s[index+1:]...)
}
\`\`\`

## Multi-Dimensional
\`\`\`go
matrix := [][]int{
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9},
}

for _, row := range matrix {
    fmt.Println(row)
}
\`\`\`

## Filtering
\`\`\`go
nums := []int{1, 2, 3, 4, 5, 6}
var evens []int
for _, n := range nums {
    if n%2 == 0 {
        evens = append(evens, n)
    }
}
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 13: Objects (Structs)
    {
      title: "Structs",
      description: "Creating custom types with structs",
      lessons: [
        {
          title: "Structs in Go",
          slug: "go-structs",
          content: `# Structs

## Defining Structs
\`\`\`go
type Person struct {
    Name string
    Age  int
    Email string
}

// Create instance
p := Person{Name: "Alice", Age: 25, Email: "a@b.com"}

// Access fields
fmt.Println(p.Name)
p.Age = 26

// Empty struct
var empty struct{}
\`\`\`

## Methods
\`\`\`go
func (p Person) Greet() string {
    return "Hi, I'm " + p.Name
}

func (p *Person) SetAge(age int) {
    p.Age = age  // pointer receiver modifies original
}
\`\`\`

## Struct Embedding
\`\`\`go
type Address struct {
    City    string
    Country string
}

type Employee struct {
    Person  // embedded
    Address // embedded
    Company string
}

e := Employee{
    Person:  Person{Name: "Bob"},
    Address: Address{City: "Bangkok"},
}
fmt.Println(e.Name)  // promoted field
\`\`\``,
          estimatedMinutes: 25,
          exercises: [
            {
              title: "Shape Calculator",
              description: "Create structs for Circle and Rectangle with Area methods",
              requirements: ["Define structs", "Add methods", "Calculate area"],
              points: 25,
            },
          ],
        },
      ],
    },
    // Module 14: Advanced Objects
    {
      title: "Interfaces and Composition",
      description: "Go's approach to polymorphism",
      lessons: [
        {
          title: "Interfaces",
          slug: "go-interfaces",
          content: `# Interfaces

## Defining Interfaces
\`\`\`go
type Shape interface {
    Area() float64
    Perimeter() float64
}
\`\`\`

## Implicit Implementation
\`\`\`go
type Circle struct {
    Radius float64
}

func (c Circle) Area() float64 {
    return 3.14159 * c.Radius * c.Radius
}

func (c Circle) Perimeter() float64 {
    return 2 * 3.14159 * c.Radius
}
\`\`\`

## Empty Interface
\`\`\`go
func printAny(v interface{}) {
    fmt.Printf("Value: %v, Type: %T\\n", v, v)
}
\`\`\`

## Type Assertions
\`\`\`go
var i interface{} = "hello"
s, ok := i.(string)
if ok {
    fmt.Println(s)
}
\`\`\`

> **Key Concept:** Go interfaces are satisfied implicitly — no \`implements\` keyword needed.`,
          estimatedMinutes: 25,
        },
      ],
    },
    // Module 15: Objects - Advanced
    {
      title: "Struct Tags and Pointers",
      description: "JSON tags, pointers, and advanced struct features",
      lessons: [
        {
          title: "Pointers and Struct Tags",
          slug: "go-pointers-tags",
          content: `# Pointers

## Basic Pointers
\`\`\`go
x := 42
p := &x     // pointer to x
fmt.Println(*p)  // 42 (dereference)
*p = 100     // change x
fmt.Println(x)   // 100
\`\`\`

## Pointer Receiver
\`\`\`go
func (p *Person) SetName(name string) {
    p.Name = name  // modifies original
}
\`\`\`

# Struct Tags

## JSON Tags
\`\`\`go
type User struct {
    Name  string \`json:"name"\`
    Email string \`json:"email,omitempty"\`
    Age   int    \`json:"-"  // ignore\`
}
\`\`\`

## Custom Tags
\`\`\`go
type Config struct {
    Host string \`env:"HOST" default:"localhost"\`
    Port int    \`env:"PORT" default:"8080"\`
}
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 16: Functions
    {
      title: "Functions",
      description: "Defining functions, multiple returns, closures",
      lessons: [
        {
          title: "Functions in Go",
          slug: "go-functions",
          content: `# Functions

## Basic Functions
\`\`\`go
func greet(name string) string {
    return "Hello, " + name + "!"
}
\`\`\`

## Multiple Return Values
\`\`\`go
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("division by zero")
    }
    return a / b, nil
}

result, err := divide(10, 3)
if err != nil {
    fmt.Println("Error:", err)
}
\`\`\`

## Named Return Values
\`\`\`go
func swap(a, b int) (x, y int) {
    x = b
    y = a
    return // naked return
}
\`\`\`

## Variadic Functions
\`\`\`go
func sum(nums ...int) int {
    total := 0
    for _, n := range nums {
        total += n
    }
    return total
}

fmt.Println(sum(1, 2, 3, 4)) // 10
\`\`\`

## Functions as Values
\`\`\`go
add := func(a, b int) int { return a + b }
fmt.Println(add(3, 4))  // 7
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 17: Advanced Functions
    {
      title: "Closures and Goroutines",
      description: "Closures, goroutines, and channels",
      lessons: [
        {
          title: "Closures and Goroutines",
          slug: "go-closures-goroutines",
          content: `# Closures

\`\`\`go
func counter() func() int {
    count := 0
    return func() int {
        count++
        return count
    }
}

c := counter()
fmt.Println(c())  // 1
fmt.Println(c())  // 2
\`\`\`

# Goroutines

## Basic Goroutine
\`\`\`go
func sayHello(name string) {
    fmt.Printf("Hello, %s!\\n", name)
}

go sayHello("Alice")
go sayHello("Bob")
\`\`\`

## WaitGroup
\`\`\`go
var wg sync.WaitGroup
wg.Add(2)

go func() { defer wg.Done(); sayHello("A") }()
go func() { defer wg.Done(); sayHello("B") }()

wg.Wait()
\`\`\`

# Channels

\`\`\`go
ch := make(chan string)

go func() {
    ch <- "Hello from goroutine"
}()

msg := <-ch
fmt.Println(msg)
\`\`\``,
          estimatedMinutes: 30,
        },
      ],
    },
    // Module 18: Error Handling
    {
      title: "Error Handling",
      description: "Error interface and custom errors",
      lessons: [
        {
          title: "Error Handling in Go",
          slug: "go-errors",
          content: `# Error Handling

## Error Interface
\`\`\`go
type error interface {
    Error() string
}
\`\`\`

## Creating Errors
\`\`\`go
import "errors"

func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("cannot divide by zero")
    }
    return a / b, nil
}
\`\`\`

## Custom Error Types
\`\`\`go
type ValidationError struct {
    Field   string
    Message string
}

func (e *ValidationError) Error() string {
    return e.Field + ": " + e.Message
}
\`\`\`

## Error Wrapping
\`\`\`go
func processFile(path string) error {
    data, err := os.ReadFile(path)
    if err != nil {
        return fmt.Errorf("reading file %s: %w", path, err)
    }
    // ...
}
\`\`\`

## Error Handling Pattern
\`\`\`go
if err := doSomething(); err != nil {
    return fmt.Errorf("doing something: %w", err)
}
\`\`\`

> **Idiom:** Always check \`err != nil\` after function calls that return errors.`,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 19: Standard Library
    {
      title: "Standard Library",
      description: "File I/O, HTTP, JSON handling",
      lessons: [
        {
          title: "File I/O and HTTP",
          slug: "go-stdlib",
          content: `# File I/O

## Reading Files
\`\`\`go
import "os"

data, err := os.ReadFile("hello.txt")
if err != nil {
    log.Fatal(err)
}
fmt.Println(string(data))
\`\`\`

## Writing Files
\`\`\`go
content := []byte("Hello, World!")
err := os.WriteFile("output.txt", content, 0644)
\`\`\`

# JSON Handling

\`\`\`go
import "encoding/json"

type User struct {
    Name  string \`json:"name"\`
    Email string \`json:"email"\`
}

u := User{Name: "Alice", Email: "a@b.com"}
data, _ := json.Marshal(u)
fmt.Println(string(data))

var decoded User
json.Unmarshal(data, &decoded)
\`\`\`

# HTTP Server

\`\`\`go
import "net/http"

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello, %s!", r.URL.Path[1:])
}

func main() {
    http.HandleFunc("/", handler)
    http.ListenAndServe(":8080", nil)
}
\`\`\``,
          estimatedMinutes: 25,
          exercises: [
            {
              title: "REST API",
              description: "Build a simple REST API with GET, POST, DELETE",
              requirements: ["Handle JSON", "Multiple methods", "Proper status codes"],
              points: 25,
            },
          ],
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
          slug: "go-project-todo",
          content: `# CLI Todo Application

## Complete Application

\`\`\`go
package main

import (
    "bufio"
    "fmt"
    "os"
    "strings"
    "strconv"
)

type Todo struct {
    ID       int
    Title    string
    Complete bool
}

var todos []Todo
var nextID = 1

func addTodo(title string) {
    todos = append(todos, Todo{ID: nextID, Title: title})
    nextID++
    fmt.Println("Added!")
}

func listTodos() {
    if len(todos) == 0 {
        fmt.Println("No todos yet.")
        return
    }
    for _, t := range todos {
        status := "[ ]"
        if t.Complete {
            status = "[x]"
        }
        fmt.Printf("%d. %s %s\\n", t.ID, status, t.Title)
    }
}

func completeTodo(id int) {
    for i := range todos {
        if todos[i].ID == id {
            todos[i].Complete = true
            fmt.Println("Completed!")
            return
        }
    }
    fmt.Println("Not found.")
}

func deleteTodo(id int) {
    for i, t := range todos {
        if t.ID == id {
            todos = append(todos[:i], todos[i+1:]...)
            fmt.Println("Deleted!")
            return
        }
    }
    fmt.Println("Not found.")
}

func main() {
    scanner := bufio.NewScanner(os.Stdin)
    
    for {
        fmt.Println("\\n1. Add  2. List  3. Complete  4. Delete  5. Exit")
        fmt.Print("Choice: ")
        scanner.Scan()
        choice := scanner.Text()
        
        switch choice {
        case "1":
            fmt.Print("Title: ")
            scanner.Scan()
            addTodo(scanner.Text())
        case "2":
            listTodos()
        case "3":
            fmt.Print("ID: ")
            scanner.Scan()
            id, _ := strconv.Atoi(scanner.Text())
            completeTodo(id)
        case "4":
            fmt.Print("ID: ")
            scanner.Scan()
            id, _ := strconv.Atoi(scanner.Text())
            deleteTodo(id)
        case "5":
            fmt.Println("Goodbye!")
            return
        default:
            fmt.Println("Invalid choice")
        }
    }
}
\`\`\`

## Concepts Used
✅ Variables and Types
✅ Operators
✅ if/else-if/switch
✅ for loops (range)
✅ Slices (dynamic array)
✅ Structs (objects)
✅ Functions
✅ Error Handling
✅ Standard Library`,
          estimatedMinutes: 40,
          exercises: [
            {
              title: "Extend Todo App",
              description: "Add save/load from file and priority levels",
              requirements: ["Save todos to file", "Load on startup", "Add priority field", "Sort by priority"],
              points: 30,
            },
          ],
        },
      ],
    },
  ],
};
