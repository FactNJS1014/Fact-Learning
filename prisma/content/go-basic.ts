import type { CourseContent } from "../seed-content";

export const goBasic: CourseContent = {
  slug: "go-basic",
  modules: [
    {
      title: "Getting Started with Go",
      description: "Introduction, installation, and first programs",
      lessons: [
        {
          title: "Introduction to Go",
          slug: "intro-go",
          content: `# Introduction to Go

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
          title: "Variables and Types",
          slug: "go-variables-types",
          content: `# Variables and Types

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
        {
          title: "Functions and Multiple Returns",
          slug: "go-functions",
          content: `# Functions

## Basic Functions

\`\`\`go
func greet(name string) string {
    return "Hello, " + name + "!"
}

func main() {
    fmt.Println(greet("Alice"))
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
\`\`\``,
          estimatedMinutes: 20,
          exercises: [
            {
              title: "Calculator Function",
              description: "Write functions for add, subtract, multiply, divide with error handling",
              requirements: ["Accept two float64 values", "Return result and error", "Handle divide by zero"],
              points: 20,
            },
          ],
        },
        {
          title: "Control Flow",
          slug: "go-control-flow",
          content: `# Control Flow

## if/else

\`\`\`go
if age >= 18 {
    fmt.Println("Adult")
} else if age >= 13 {
    fmt.Println("Teenager")
} else {
    fmt.Println("Child")
}
\`\`\`

## switch

\`\`\`go
switch day {
case "Monday":
    fmt.Println("Start of week")
case "Friday":
    fmt.Println("Almost weekend")
default:
    fmt.Println("Regular day")
}
\`\`\`

## for Loop (Go only has for)

\`\`\`go
// Traditional
for i := 0; i < 5; i++ {
    fmt.Println(i)
}

// While-style
for condition {
    // ...
}

// Infinite loop
for {
    // break to exit
}

// Range
for i, v := range []string{"a", "b", "c"} {
    fmt.Println(i, v)
}
\`\`\`

> **Note:** Go has no \`while\` or \`do-while\` — just \`for\`.`,
          estimatedMinutes: 20,
        },
        {
          title: "Arrays, Slices, and Maps",
          slug: "go-data-structures",
          content: `# Data Structures

## Arrays (Fixed Size)

\`\`\`go
var arr [5]int = [5]int{1, 2, 3, 4, 5}
fmt.Println(len(arr))  // 5
\`\`\`

## Slices (Dynamic)

\`\`\`go
slice := []int{1, 2, 3}
slice = append(slice, 4, 5)

// Sub-slice
sub := slice[1:3]  // [2, 3]

// Make
s := make([]int, 5)     // len=5, cap=5
s2 := make([]int, 0, 10) // len=0, cap=10
\`\`\`

## Maps

\`\`\`go
person := map[string]string{
    "name": "Alice",
    "age":  "25",
}

person["email"] = "alice@example.com"
delete(person, "age")

// Check existence
val, ok := person["name"]
if ok {
    fmt.Println(val)
}

// Iterate
for key, val := range person {
    fmt.Println(key, val)
}
\`\`\``,
          estimatedMinutes: 25,
          exercises: [
            {
              title: "Word Counter",
              description: "Write a function that counts word frequency in a string and returns a map",
              requirements: ["Accept a string", "Return map[string]int", "Handle empty strings"],
              points: 20,
            },
          ],
        },
      ],
    },
    {
      title: "Structs and Interfaces",
      description: "Go's approach to OOP without classes",
      lessons: [
        {
          title: "Structs",
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

## Struct Embedding (Composition)

\`\`\`go
type Address struct {
    City    string
    Country string
}

type Employee struct {
    Person  // embedded struct
    Address // embedded struct
    Company string
}

e := Employee{
    Person:  Person{Name: "Bob"},
    Address: Address{City: "Bangkok"},
}
fmt.Println(e.Name)  // promoted field
fmt.Println(e.City)  // promoted field
\`\`\``,
          estimatedMinutes: 25,
        },
        {
          title: "Interfaces",
          slug: "go-interfaces",
          content: `# Interfaces

## Defining Interfaces

\`\`\`go
type Writer interface {
    Write([]byte) (int, error)
}
\`\`\`

## Implicit Implementation

\`\`\`go
type ConsoleWriter struct{}

func (cw ConsoleWriter) Write(data []byte) (int, error) {
    fmt.Print(string(data))
    return len(data), nil
}

var w Writer = ConsoleWriter{}  // ConsoleWriter implements Writer
\`\`\`

## Empty Interface

\`\`\`go
func printAny(v interface{}) {
    fmt.Printf("Value: %v, Type: %T\\n", v, v)
}

printAny(42)       // Value: 42, Type: int
printAny("hello")  // Value: hello, Type: string
\`\`\`

## Type Assertions

\`\`\`go
var i interface{} = "hello"
s, ok := i.(string)
if ok {
    fmt.Println(s) // "hello"
}
\`\`\`

> **Key Concept:** Go interfaces are satisfied implicitly — no \`implements\` keyword needed.`,
          estimatedMinutes: 25,
          exercises: [
            {
              title: "Shape Calculator",
              description: "Create a Shape interface with Area() and Perimeter(). Implement Circle and Rectangle.",
              requirements: ["Define Shape interface", "Implement Circle", "Implement Rectangle", "Test both"],
              points: 25,
            },
          ],
        },
        {
          title: "Error Handling",
          slug: "go-error-handling",
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

// Custom error types
type ValidationError struct {
    Field   string
    Message string
}

func (e *ValidationError) Error() string {
    return e.Field + ": " + e.Message
}
\`\`\`

## Error Wrapping (Go 1.13+)

\`\`\`go
func processFile(path string) error {
    data, err := os.ReadFile(path)
    if err != nil {
        return fmt.Errorf("reading file %s: %w", path, err)
    }
    // ...
}
\`\`\`

> **Idiom:** Always check \`err != nil\` after function calls that return errors.`,
          estimatedMinutes: 20,
        },
        {
          title: "Goroutines and Channels",
          slug: "go-goroutines-channels",
          content: `# Goroutines and Channels

## Goroutines

\`\`\`go
func sayHello(name string) {
    fmt.Printf("Hello, %s!\\n", name)
}

go sayHello("Alice")  // runs concurrently
go sayHello("Bob")

// Wait for goroutines
var wg sync.WaitGroup
wg.Add(2)
go func() { defer wg.Done(); sayHello("A") }()
go func() { defer wg.Done(); sayHello("B") }()
wg.Wait()
\`\`\`

## Channels

\`\`\`go
ch := make(chan string)

go func() {
    ch <- "Hello from goroutine"
}()

msg := <-ch  // receive
fmt.Println(msg)
\`\`\`

## Buffered Channels

\`\`\`go
ch := make(chan int, 3)  // buffer size 3
ch <- 1
ch <- 2
ch <- 3
fmt.Println(<-ch)  // 1
\`\`\`

## Select Statement

\`\`\`go
select {
case msg := <-ch1:
    fmt.Println("From ch1:", msg)
case msg := <-ch2:
    fmt.Println("From ch2:", msg)
default:
    fmt.Println("No message")
}
\`\`\``,
          estimatedMinutes: 30,
        },
      ],
    },
    {
      title: "Standard Library and Packages",
      description: "Working with Go's powerful standard library",
      lessons: [
        {
          title: "File I/O",
          slug: "go-file-io",
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

## Using Scanner

\`\`\`go
file, _ := os.Open("data.txt")
defer file.Close()

scanner := bufio.NewScanner(file)
for scanner.Scan() {
    fmt.Println(scanner.Text())
}
\`\`\`

## JSON Handling

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
\`\`\``,
          estimatedMinutes: 20,
        },
        {
          title: "HTTP Servers",
          slug: "go-http-servers",
          content: `# HTTP Servers

## Basic HTTP Server

\`\`\`go
import "net/http"

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello, %s!", r.URL.Path[1:])
}

func main() {
    http.HandleFunc("/", handler)
    http.ListenAndServe(":8080", nil)
}
\`\`\`

## REST API with Methods

\`\`\`go
func apiHandler(w http.ResponseWriter, r *http.Request) {
    switch r.Method {
    case "GET":
        json.NewEncoder(w).Encode(users)
    case "POST":
        var user User
        json.NewDecoder(r.Body).Decode(&user)
        users = append(users, user)
        w.WriteHeader(http.StatusCreated)
        json.NewEncoder(w).Encode(user)
    }
}
\`\`\`

## Middleware Pattern

\`\`\`go
func logging(next http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        log.Printf("%s %s", r.Method, r.URL.Path)
        next(w, r)
    }
}
\`\`\``,
          estimatedMinutes: 25,
          exercises: [
            {
              title: "REST API",
              description: "Build a simple REST API with GET, POST, DELETE for a todo list",
              requirements: ["Handle JSON", "Multiple methods", "Proper status codes"],
              points: 25,
            },
          ],
        },
        {
          title: "Database with SQL",
          slug: "go-database",
          content: `# Database with Go

## Using database/sql

\`\`\`go
import (
    "database/sql"
    _ "github.com/lib/pq"  // PostgreSQL driver
)

func main() {
    db, err := sql.Open("postgres", "host=localhost user=postgres dbname=mydb sslmode=disable")
    if err != nil {
        log.Fatal(err)
    }
    defer db.Close()

    // Query single row
    var name string
    db.QueryRow("SELECT name FROM users WHERE id = $1", 1).Scan(&name)

    // Query multiple rows
    rows, _ := db.Query("SELECT name, email FROM users")
    defer rows.Close()
    for rows.Next() {
        var name, email string
        rows.Scan(&name, &email)
        fmt.Println(name, email)
    }
}
\`\`\`

## Insert Data

\`\`\`go
result, err := db.Exec(
    "INSERT INTO users (name, email) VALUES ($1, $2)",
    "Alice", "alice@example.com",
)
id, _ := result.LastInsertId()
\`\`\``,
          estimatedMinutes: 25,
        },
        {
          title: "Testing in Go",
          slug: "go-testing",
          content: `# Testing in Go

## Writing Tests

\`\`\`go
// math_test.go
package math

import "testing"

func TestAdd(t *testing.T) {
    result := Add(2, 3)
    if result != 5 {
        t.Errorf("Add(2, 3) = %d; want 5", result)
    }
}
\`\`\`

## Table-Driven Tests

\`\`\`go
func TestAdd(t *testing.T) {
    tests := []struct {
        a, b, want int
    }{
        {1, 2, 3},
        {0, 0, 0},
        {-1, 1, 0},
    }
    for _, tt := range tests {
        t.Run(fmt.Sprintf("%d+%d", tt.a, tt.b), func(t *testing.T) {
            if got := Add(tt.a, tt.b); got != tt.want {
                t.Errorf("Add(%d, %d) = %d, want %d", tt.a, tt.b, got, tt.want)
            }
        })
    }
}
\`\`\`

## Running Tests

\`\`\`bash
go test ./...
go test -v -run TestAdd
go test -cover
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    {
      title: "Building Real Applications",
      description: "Putting it all together",
      lessons: [
        {
          title: "Building a Login System",
          slug: "go-login-system",
          content: `# Building a Login System in Go

## User Registration & Authentication

\`\`\`go
type User struct {
    ID       int    \`json:"id"\`
    Username string \`json:"username"\`
    Email    string \`json:"email"\`
    Password string \`json:"-" json:"-" // never expose
}

// Registration
func registerHandler(w http.ResponseWriter, r *http.Request) {
    var req struct {
        Username string \`json:"username"\`
        Email    string \`json:"email"\`
        Password string \`json:"password"\`
    }
    json.NewDecoder(r.Body).Decode(&req)

    // Hash password
    hashed, _ := bcrypt.GenerateFromPassword([]byte(req.Password), 12)

    // Insert into DB
    result, err := db.Exec(
        "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)",
        req.Username, req.Email, string(hashed),
    )
    if err != nil {
        http.Error(w, "Username or email already exists", http.StatusConflict)
        return
    }
    w.WriteHeader(http.StatusCreated)
}

// Login
func loginHandler(w http.ResponseWriter, r *http.Request) {
    var req struct {
        Email    string \`json:"email"\`
        Password string \`json:"password"\`
    }
    json.NewDecoder(r.Body).Decode(&req)

    var user User
    var hashed string
    db.QueryRow("SELECT id, username, email, password_hash FROM users WHERE email = $1", req.Email).
        Scan(&user.ID, &user.Username, &user.Email, &hashed)

    if err := bcrypt.CompareHashAndPassword([]byte(hashed), []byte(req.Password)); err != nil {
        http.Error(w, "Invalid credentials", http.StatusUnauthorized)
        return
    }

    // Create session token
    token := uuid.New().String()
    db.Exec("INSERT INTO sessions (user_id, token, expires_at) VALUES ($1, $2, $3)",
        user.ID, token, time.Now().Add(24*time.Hour))

    json.NewEncoder(w).Encode(map[string]string{"token": token})
}
\`\`\``,
          estimatedMinutes: 30,
          exercises: [
            {
              title: "Build Auth API",
              description: "Create a complete register/login API with password hashing and session tokens",
              requirements: ["Use bcrypt for password hashing", "Create session on login", "Protect routes with middleware", "Handle errors properly"],
              points: 30,
            },
          ],
        },
        {
          title: "Middleware and Routing",
          slug: "go-middleware-routing",
          content: `# Middleware and Routing

## Custom Router

\`\`\`go
type Router struct {
    routes map[string]http.HandlerFunc
}

func NewRouter() *Router {
    return &Router{routes: make(map[string]http.HandlerFunc)}
}

func (rt *Router) Handle(method, path string, handler http.HandlerFunc) {
    rt.routes[method+" "+path] = handler
}

func (rt *Router) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    key := r.Method + " " + r.URL.Path
    if handler, ok := rt.routes[key]; ok {
        handler(w, r)
    } else {
        http.NotFound(w, r)
    }
}
\`\`\`

## Auth Middleware

\`\`\`go
func authMiddleware(next http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        token := r.Header.Get("Authorization")
        if token == "" {
            http.Error(w, "Unauthorized", http.StatusUnauthorized)
            return
        }
        // Validate token...
        next(w, r)
    }
}
\`\`\``,
          estimatedMinutes: 20,
        },
        {
          title: "Project Structure",
          slug: "go-project-structure",
          content: `# Go Project Structure

## Standard Layout

\`\`\`
myapp/
├── cmd/
│   └── server/
│       └── main.go
├── internal/
│   ├── handler/
│   │   ├── auth.go
│   │   └── user.go
│   ├── model/
│   │   └── user.go
│   ├── repository/
│   │   └── user_repo.go
│   └── service/
│       └── auth_service.go
├── pkg/
│   └── middleware/
│       └── auth.go
├── go.mod
├── go.sum
└── Makefile
\`\`\`

## Go Modules

\`\`\`bash
go mod init github.com/user/myapp
go get github.com/lib/pq
go mod tidy
\`\`\`

## Best Practices
- Use \`internal/\` for private packages
- Keep \`main.go\` small — delegate to packages
- One interface per file
- Table-driven tests
- Handle errors immediately`,
          estimatedMinutes: 20,
        },
        {
          title: "Deployment and Docker",
          slug: "go-deployment",
          content: `# Deployment

## Building for Production

\`\`\`bash
# Build optimized binary
go build -ldflags="-s -w" -o app cmd/server/main.go

# Cross-compile
GOOS=linux GOARCH=amd64 go build -o app-linux
GOOS=windows GOARCH=amd64 go build -o app.exe
\`\`\`

## Dockerfile

\`\`\`dockerfile
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o server ./cmd/server

FROM alpine:3.19
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /app/server .
CMD ["./server"]
\`\`\`

## Environment Variables

\`\`\`go
port := os.Getenv("PORT")
if port == "" {
    port = "8080"
}

dbURL := os.Getenv("DATABASE_URL")
\`\`\`

> **Tip:** Go binaries are self-contained — no runtime needed. Perfect for Docker.`,
          estimatedMinutes: 20,
        },
      ],
    },
  ],
};
