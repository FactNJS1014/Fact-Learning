import type { CourseContent } from "../seed-content";

export const phpBasic: CourseContent = {
  slug: "php-basic",
  modules: [
    {
      title: "Getting Started with PHP",
      description: "Introduction, setup, and fundamentals",
      lessons: [
        {
          title: "Introduction to PHP",
          slug: "intro-php",
          content: `# Introduction to PHP

PHP (Hypertext Preprocessor) powers 77% of websites with known server-side languages.

## Your First Script

\`\`\`php
<?php
echo "Hello, World!";
?>
\`\`\`

## PHP Tags

\`\`\`php
<?php // Standard opening tag
echo "PHP code here";

// Short tag (if enabled)
<?= "Same as echo" ?>
?>
\`\`\`

## Running PHP

\`\`\`bash
php script.php          # Command line
# Place in web server (Apache/Nginx) document root for web
\`\`\``,
          estimatedMinutes: 15,
          exercises: [
            {
              title: "Hello PHP",
              description: "Create a PHP script that prints your name, age, and favorite color",
              requirements: ["Use echo", "Use PHP tags", "Run with php command"],
              points: 10,
            },
          ],
        },
        {
          title: "Variables and Data Types",
          slug: "php-variables",
          content: `# Variables and Data Types

## Variables (Start with $)

\`\`\`php
$name = "Alice";      // string
$age = 25;            // integer
$height = 5.8;        // float
$isStudent = true;    // boolean
$grades = [90, 85, 95]; // array
\$person = ["name" => "Bob", "age" => 30]; // associative array
\`\`\`

## String Types

\`\`\`php
$single = 'No variable expansion';  // single quotes
$double = "Hello, $name!";          // double quotes interpolate
$nowdoc = <<<'EOT'
Raw text, no interpolation
EOT;
\`\`\`

## Type Checking

\`\`\`php
echo gettype($name);    // "string"
echo is_int($age);      // 1 (true)
echo is_string($name);  // 1 (true)
\`\`\`

## Null

\`\`\`php
$nothing = null;
echo isset($nothing);   // false
echo empty($nothing);   // true
\`\`\``,
          estimatedMinutes: 20,
        },
        {
          title: "Operators",
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
echo 5 <> 3;      // true (same as !=)
\`\`\`

## String Concatenation

\`\`\`php
$greeting = "Hello" . " " . "World";
$name = "Alice";
echo "Hello, {$name}!";  // variable interpolation
\`\`\`

> **Important:** Always use \`===\` and \`!==\` for strict comparison.`,
          estimatedMinutes: 15,
        },
        {
          title: "Control Flow",
          slug: "php-control-flow",
          content: `# Control Flow

## if/elseif/else

\`\`\`php
$score = 85;

if ($score >= 90) {
    echo "A";
} elseif ($score >= 80) {
    echo "B";
} else {
    echo "C";
}
\`\`\`

## switch

\`\`\`php
$day = "Monday";

switch ($day) {
    case "Monday":
        echo "Start of week";
        break;
    case "Friday":
        echo "Almost weekend";
        break;
    default:
        echo "Regular day";
}
\`\`\`

## Loops

\`\`\`php
// for
for ($i = 0; $i < 5; $i++) {
    echo $i;
}

// while
while ($condition) {
    // ...
}

// foreach
$fruits = ["apple", "banana", "cherry"];
foreach ($fruits as $fruit) {
    echo $fruit;
}

// associative
foreach ($person as $key => $value) {
    echo "$key: $value";
}
\`\`\``,
          estimatedMinutes: 20,
          exercises: [
            {
              title: "FizzBuzz in PHP",
              description: "Print 1-100 with Fizz for multiples of 3, Buzz for 5, FizzBuzz for both",
              requirements: ["Use for loop", "Use modulo operator", "Handle all cases"],
              points: 15,
            },
          ],
        },
      ],
    },
    {
      title: "Functions and Arrays",
      description: "Writing functions and working with arrays",
      lessons: [
        {
          title: "Functions",
          slug: "php-functions",
          content: `# Functions

## Basic Functions

\`\`\`php
function greet(string $name): string {
    return "Hello, $name!";
}

echo greet("Alice");
\`\`\`

## Default Parameters

\`\`\`php
function greet(string $name, string $greeting = "Hello"): string {
    return "$greeting, $name!";
}

echo greet("Bob");            // "Hello, Bob!"
echo greet("Bob", "Hi");     // "Hi, Bob!"
\`\`\`

## Type Hints

\`\`\`php
function add(int $a, int $b): int {
    return $a + $b;
}

function process(array $items): array {
    return array_map(fn($item) => strtoupper($item), $items);
}
\`\`\`

## Variable Scope

\`\`\`php
\$global_var = "I'm global";

function test() {
    global \$global_var;  // Access global
    echo \$global_var;
}
\`\`\``,
          estimatedMinutes: 20,
        },
        {
          title: "Working with Arrays",
          slug: "php-arrays",
          content: `# Arrays

## Indexed Arrays

\`\`\`php
$colors = ["red", "green", "blue"];
echo $colors[0];  // "red"
echo count($colors); // 3

$colors[] = "yellow"; // append
array_push($colors, "purple");
\`\`\`

## Associative Arrays

\`\`\`php
$person = [
    "name" => "Alice",
    "age" => 25,
    "email" => "alice@example.com"
];

echo $person["name"];
\`\`\`

## Useful Functions

\`\`\`php
$nums = [3, 1, 4, 1, 5, 9, 2, 6];

sort($nums);           // sort ascending
rsort($nums);          // sort descending
array_reverse($nums);  // reverse
array_unique($nums);   // remove duplicates
array_merge($a, $b);   // merge arrays
array_map(fn($n) => $n * 2, $nums); // transform
array_filter($nums, fn($n) => $n > 3); // filter
array_reduce($nums, fn($carry, $n) => $carry + $n, 0); // reduce
\`\`\``,
          estimatedMinutes: 25,
        },
        {
          title: "Strings in PHP",
          slug: "php-strings",
          content: `# Strings

## Common Functions

\`\`\`php
$s = "Hello, World!";

strlen($s);              // 13
strtolower($s);          // "hello, world!"
strtoupper($s);          // "HELLO, WORLD!"
str_replace("World", "PHP", $s); // "Hello, PHP!"
substr($s, 0, 5);       // "Hello"
strpos($s, "World");    // 7
trim("  hello  ");       // "hello"
explode(", ", "a, b, c"); // ["a", "b", "c"]
implode(", ", ["a","b"]); // "a, b"
\`\`\`

## sprintf

\`\`\`php
$name = "Alice";
$age = 25;
echo sprintf("My name is %s and I'm %d years old.", $name, $age);
\`\`\`

## Multibyte Strings

\`\`\`php
mb_strlen("Hello");  // use for UTF-8
mb_strtolower("HELLO");
\`\`\``,
          estimatedMinutes: 20,
        },
        {
          title: "Superglobals",
          slug: "php-superglobals",
          content: `# Superglobals

## Common Superglobals

\`\`\`php
// $_GET - URL parameters
$page = $_GET['page'] ?? 1;

// $_POST - Form data
$name = $_POST['name'] ?? '';

// $_REQUEST - Both GET and POST

// $_SERVER - Server info
$method = $_SERVER['REQUEST_METHOD'];
$ip = $_SERVER['REMOTE_ADDR'];

// $_SESSION - Session data (requires session_start())

// $_COOKIE - Cookie data

// $GLOBALS - All global variables
\`\`\`

## Security: Sanitize Input

\`\`\`php
// NEVER trust user input!
$name = htmlspecialchars($_POST['name'] ?? '', ENT_QUOTES, 'UTF-8');

// Filter email
$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
\`\`\``,
          estimatedMinutes: 20,
          exercises: [
            {
              title: "Form Handler",
              description: "Create a PHP script that processes a registration form with validation",
              requirements: ["Use \$_POST", "Validate email", "Sanitize all input", "Show errors for empty fields"],
              points: 20,
            },
          ],
        },
      ],
    },
    {
      title: "OOP in PHP",
      description: "Classes, objects, and modern PHP patterns",
      lessons: [
        {
          title: "Classes and Objects",
          slug: "php-classes",
          content: `# Classes and Objects

## Basic Class

\`\`\`php
class User {
    public string $name;
    public string $email;
    private int $age;

    public function __construct(string $name, string $email, int $age) {
        $this->name = $name;
        $this->email = $email;
        $this->age = $age;
    }

    public function getAge(): int {
        return $this->age;
    }

    public function greet(): string {
        return "Hi, I'm {$this->name}!";
    }
}

$user = new User("Alice", "alice@example.com", 25);
echo $user->greet();
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
              description: "Create a BankAccount class with deposit, withdraw, and balance methods",
              requirements: ["Private balance", "Public deposit/withdraw", "Prevent negative balance", "Show balance method"],
              points: 20,
            },
          ],
        },
        {
          title: "Inheritance and Interfaces",
          slug: "php-inheritance",
          content: `# Inheritance and Interfaces

## Inheritance

\`\`\`php
class Animal {
    public function __construct(protected string $name) {}

    public function speak(): string {
        return "...";
    }
}

class Dog extends Animal {
    public function speak(): string {
        return "{$this->name} says Woof!";
    }
}

class Cat extends Animal {
    public function speak(): string {
        return "{$this->name} says Meow!";
    }
}
\`\`\`

## Interfaces

\`\`\`php
interface Printable {
    public function toString(): string;
}

interface Loggable {
    public function toLog(): string;
}

class Document implements Printable, Loggable {
    public function toString(): string {
        return "Document content";
    }
    public function toLog(): string {
        return "Log: " . $this->toString();
    }
}
\`\`\`

## Abstract Classes

\`\`\`php
abstract class Shape {
    abstract public function area(): float;

    public function describe(): string {
        return "Area: " . $this->area();
    }
}
\`\`\``,
          estimatedMinutes: 25,
        },
        {
          title: "Traits and Namespaces",
          slug: "php-traits-namespaces",
          content: `# Traits and Namespaces

## Traits (Like Mixins)

\`\`\`php
trait HasTimestamps {
    public ?string $createdAt = null;
    public ?string $updatedAt = null;

    public function setCreatedAt(): void {
        $this->createdAt = date('Y-m-d H:i:s');
    }
}

class Post {
    use HasTimestamps;

    public string $title;
}

$post = new Post();
$post->setCreatedAt();
\`\`\`

## Namespaces

\`\`\`php
namespace App\\Models;

use App\\Utils\\Formatter;

class User {
    // ...
}
\`\`\`

## Autoloading (PSR-4)

\`\`\`json
// composer.json
{
    "autoload": {
        "psr-4": {
            "App\\": "src/"
        }
    }
}
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    {
      title: "Database and Security",
      description: "Working with databases and building secure applications",
      lessons: [
        {
          title: "PDO Database",
          slug: "php-pdo",
          content: `# Database with PDO

## Connecting

\`\`\`php
$dsn = "mysql:host=localhost;dbname=mydb;charset=utf8mb4";
$pdo = new PDO($dsn, "root", "password", [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
]);
\`\`\`

## CRUD Operations

\`\`\`php
// SELECT
$stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");
$stmt->execute(['email' => $email]);
$user = $stmt->fetch();

// INSERT
$stmt = $pdo->prepare("INSERT INTO users (name, email) VALUES (:name, :email)");
$stmt->execute(['name' => $name, 'email' => $email]);

// UPDATE
$stmt = $pdo->prepare("UPDATE users SET name = :name WHERE id = :id");
$stmt->execute(['name' => $newName, 'id' => $id]);

// DELETE
$stmt = $pdo->prepare("DELETE FROM users WHERE id = :id");
$stmt->execute(['id' => $id]);
\`\`\`

> **Security:** Always use prepared statements to prevent SQL injection.`,
          estimatedMinutes: 25,
          exercises: [
            {
              title: "User CRUD",
              description: "Create a complete CRUD system for users using PDO",
              requirements: ["Connect to database", "Prepare statements", "Handle errors", "CRUD operations"],
              points: 25,
            },
          ],
        },
        {
          title: "Authentication System",
          slug: "php-auth",
          content: `# Authentication in PHP

## Registration

\`\`\`php
function register(string $name, string $email, string $password): int {
    global $pdo;

    // Check existing
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        throw new Exception("Email already registered");
    }

    // Hash password
    $hash = password_hash($password, PASSWORD_DEFAULT);

    // Insert
    $stmt = $pdo->prepare("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)");
    $stmt->execute([$name, $email, $hash]);
    return (int) $pdo->lastInsertId();
}
\`\`\`

## Login

\`\`\`php
function login(string $email, string $password): ?array {
    global $pdo;

    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password_hash'])) {
        session_start();
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_name'] = $user['name'];
        return $user;
    }
    return null;
}
\`\`\`

## Protected Route

\`\`\`php
function requireAuth(): void {
    session_start();
    if (!isset($_SESSION['user_id'])) {
        header("Location: /login.php");
        exit;
    }
}
\`\`\``,
          estimatedMinutes: 30,
        },
        {
          title: "Sessions and Cookies",
          slug: "php-sessions",
          content: `# Sessions and Cookies

## Sessions

\`\`\`php
// Start session (must be before any output)
session_start();

// Set
$_SESSION['user_id'] = 123;
$_SESSION['theme'] = 'dark';

// Get
$userId = $_SESSION['user_id'] ?? null;

// Destroy
session_destroy();
\`\`\`

## Cookies

\`\`\`php
// Set cookie (before any output)
setcookie("theme", "dark", time() + 86400 * 30, "/");

// Read
$theme = $_COOKIE['theme'] ?? 'light';

// Delete
setcookie("theme", "", time() - 3600, "/");
\`\`\`

## Security Best Practices

\`\`\`php
// Regenerate session ID to prevent fixation
session_regenerate_id(true);

// Set secure cookie params
session_set_cookie_params([
    'lifetime' => 86400,
    'path' => '/',
    'secure' => true,
    'httponly' => true,
    'samesite' => 'Strict',
]);
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
  ],
};

export const laravelBasic: CourseContent = {
  slug: "laravel-basic",
  modules: [
    {
      title: "Getting Started with Laravel",
      description: "Installation, routing, and basics",
      lessons: [
        {
          title: "Introduction to Laravel",
          slug: "intro-laravel",
          content: `# Introduction to Laravel

Laravel is a PHP web framework with elegant syntax and powerful features.

## Installation

\`\`\`bash
composer create-project laravel/laravel myapp
cd myapp
php artisan serve
\`\`\`

## Key Features
- **Eloquent ORM** — beautiful database abstraction
- **Blade Templates** — powerful templating engine
- **Artisan CLI** — code generation and tasks
- **Built-in Auth** — authentication scaffolding
- **Queue System** — background job processing
- **Testing** — built-in PHPUnit support`,
          estimatedMinutes: 15,
        },
        {
          title: "Routing",
          slug: "laravel-routing",
          content: `# Routing

## Basic Routes

\`\`\`php
// routes/web.php
Route::get('/', function () {
    return view('welcome');
});

Route::get('/about', function () {
    return 'About page';
});
\`\`\`

## Route Parameters

\`\`\`php
Route::get('/users/{id}', function ($id) {
    return "User $id";
});
\`\`\`

## Resource Routes

\`\`\`php
Route::resource('posts', PostController::class);
// Creates: index, create, store, show, edit, update, destroy
\`\`\`

## Route Groups

\`\`\`php
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashController::class, 'index']);
    Route::resource('posts', PostController::class);
});
\`\`\``,
          estimatedMinutes: 20,
        },
        {
          title: "Controllers",
          slug: "laravel-controllers",
          content: `# Controllers

## Basic Controller

\`\`\`php
// app/Http/Controllers/PostController.php

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::all();
        return view('posts.index', compact('posts'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|max:255',
            'body' => 'required',
        ]);

        Post::create($validated);
        return redirect()->route('posts.index');
    }
}
\`\`\`

## Resource Controller

\`\`\`bash
php artisan make:controller PostController --resource
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    {
      title: "Eloquent ORM",
      description: "Working with databases elegantly",
      lessons: [
        {
          title: "Models and Migrations",
          slug: "laravel-models",
          content: `# Models and Migrations

## Migration

\`\`\`bash
php artisan make:migration create_posts_table
\`\`\`

\`\`\`php
// database/migrations/xxx_create_posts_table
public function up()
{
    Schema::create('posts', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained();
        $table->string('title');
        $table->text('body');
        $table->boolean('published')->default(false);
        $table->timestamps();
    });
}
\`\`\`

## Model

\`\`\`php
class Post extends Model
{
    protected $fillable = ['title', 'body', 'published'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
\`\`\`

## Usage

\`\`\`php
// Create
Post::create(['title' => 'Hello', 'body' => 'World', 'user_id' => 1]);

// Read
$posts = Post::where('published', true)->get();
$post = Post::find(1);

// Update
$post->update(['title' => 'Updated']);

// Delete
$post->delete();
\`\`\``,
          estimatedMinutes: 25,
        },
        {
          title: "Query Builder",
          slug: "laravel-query-builder",
          content: `# Query Builder

\`\`\`php
// SELECT
$users = DB::table('users')
    ->where('age', '>', 18)
    ->orderBy('name')
    ->limit(10)
    ->get();

// JOIN
$posts = DB::table('posts')
    ->join('users', 'posts.user_id', '=', 'users.id')
    ->select('posts.*', 'users.name')
    ->get();

// AGGREGATE
$count = DB::table('posts')->where('published', true)->count();
$avg = DB::table('orders')->avg('total');

// INSERT
DB::table('posts')->insert([
    'title' => 'Hello',
    'body' => 'World',
]);

// UPDATE
DB::table('posts')
    ->where('id', 1)
    ->update(['published' => true]);

// DELETE
DB::table('posts')->where('id', 1)->delete();
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    {
      title: "Views and Forms",
      description: "Blade templates and form handling",
      lessons: [
        {
          title: "Blade Templates",
          slug: "laravel-blade",
          content: `# Blade Templates

## Basic Syntax

\`\`\`html
{{-- resources/views/posts/index.blade.php --}}
@extends('layouts.app')

@section('content')
    <h1>{{ $title }}</h1>

    @if($posts->isEmpty())
        <p>No posts yet.</p>
    @else
        @foreach($posts as $post)
            <article>
                <h2>{{ $post->title }}</h2>
                <p>{{ Str::limit($post->body, 200) }}</p>
            </article>
        @endforeach
    @endif
@endsection
\`\`\`

## Components

\`\`\`html
{{-- Component --}}
<x-card title="Hello">
    <p>Content here</p>
</x-card>

{{-- Component class --}}
class Card extends Component {
    public function __construct(public string $title) {}
}
\`\`\``,
          estimatedMinutes: 20,
        },
        {
          title: "Forms and Validation",
          slug: "laravel-forms",
          content: `# Forms and Validation

## Form Request

\`\`\`php
class StorePostRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'title' => 'required|max:255',
            'body' => 'required|min:10',
        ];
    }
}
\`\`\`

## Blade Forms

\`\`\`html
<form method="POST" action="/posts">
    @csrf
    <input name="title" value="{{ old('title') }}">
    @error('title')
        <span class="text-red-500">{{ \$message }}</span>
    @enderror

    <textarea name="body">{{ old('body') }}</textarea>

    <button type="submit">Create</button>
</form>
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    {
      title: "Authentication and Security",
      description: "Built-in auth and security features",
      lessons: [
        {
          title: "Authentication Setup",
          slug: "laravel-auth",
          content: `# Authentication

## Install Breeze

\`\`\`bash
composer require laravel/breeze --dev
php artisan breeze:install blade
npm install && npm run build
php artisan migrate
\`\`\`

This gives you:
- Login / Register / Forgot Password
- Email verification
- Password reset
- Middleware protection

## Protecting Routes

\`\`\`php
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashController::class, 'index']);
});
\`\`\`

## Access User

\`\`\`php
$user = auth()->user();       // Current user
$user = Auth::user();         // Same
$id = auth()->id();           // User ID
\`\`\``,
          estimatedMinutes: 25,
        },
        {
          title: "API and Middleware",
          slug: "laravel-api",
          content: `# API and Middleware

## API Routes

\`\`\`php
// routes/api.php
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('posts', PostController::class);
});
\`\`\`

## Custom Middleware

\`\`\`php
class CheckRole
{
    public function handle(Request $request, Closure $next, string $role)
    {
        if (auth()->user()->role !== $role) {
            abort(403);
        }
        return $next($request);
    }
}

// Usage
Route::middleware('role:admin')->group(function () {
    // admin routes
});
\`\`\`

## Sanctum API Tokens

\`\`\`php
// Issue token
$token = $user->createToken('api-token')->plainTextToken;

// Verify (in middleware)
Route::middleware('auth:sanctum')->get('/user', fn() => auth()->user());
\`\`\``,
          estimatedMinutes: 25,
          exercises: [
            {
              title: "Build Auth API",
              description: "Create a Laravel API with registration, login, and protected routes using Sanctum",
              requirements: ["Register endpoint", "Login with token", "Protected dashboard route", "Proper validation"],
              points: 30,
            },
          ],
        },
      ],
    },
  ],
};
