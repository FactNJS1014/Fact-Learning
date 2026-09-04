import type { CourseContent } from "../seed-content";
import { lesson } from "./lesson-builder";

export const laravelBasic20Modules: CourseContent = {
  slug: "laravel-basic",
  modules: [
    {
      title: "Introduction to Laravel",
      description: "What Laravel is and environment setup",
      lessons: [
        lesson({
          title: "What is Laravel?",
          slug: "laravel-intro",
          minutes: 12,
          objective: "Understand Laravel and its philosophy.",
          intro:
            "Laravel is a PHP web application framework with expressive, elegant syntax. It provides routing, ORM, authentication, queues, and much more out of the box.",
          concepts: [
            "- **MVC**: Models, Views, Controllers organize the application.",
            "- **Eloquent**: a beautiful ActiveRecord ORM for the database.",
            "- **Artisan**: a command-line tool for scaffolding and tasks.",
            "- **Blade**: a powerful templating engine.",
          ],
          example: {
            lang: "php",
            code: "<?php\n\nRoute::get('/', function () {\n    return view('welcome');\n});",
            output: "GET / returns the welcome view.",
          },
          mistakes: [
            "Thinking Laravel is only for APIs — it does full MVC apps too.",
            "Skipping Artisan and hand-writing boilerplate.",
          ],
          bestPractices: [
            "Follow the framework conventions — Laravel rewards convention.",
            "Read the docs; they are excellent.",
          ],
          exerciseTitle: "First Route",
          exerciseDescription: "Create a Laravel project and a welcome route that returns a custom view.",
          exerciseRequirements: [
            "Install via composer create-project",
            "Define a GET route",
            "Return a view from it",
          ],
          challenge: "Add a second route with a URL parameter.",
          summary:
            "Laravel is a full-featured PHP framework built around convention and tooling.",
        }),
        lesson({
          title: "Environment Setup",
          slug: "laravel-setup",
          minutes: 15,
          objective: "Set up Laravel with Sail or a local environment.",
          intro:
            "Laravel runs anywhere PHP runs. Laravel Sail provides a Docker-based environment that works on any OS.",
          concepts: [
            "- Composer creates projects: composer create-project laravel/laravel.",
            "- Sail = Docker wrapper for PHP, MySQL, Redis.",
            "- .env configures the application.",
          ],
          syntax: {
            lang: "bash",
            code: "composer create-project laravel/laravel my-app\ncd my-app\nphp artisan serve         # local server\n# or with Docker:\n./vendor/bin/sail up -d",
          },
          example: {
            lang: "bash",
            code: "php artisan --version\nphp artisan route:list    # show all routes",
            output: "Lists the framework version and registered routes.",
          },
          mistakes: [
            "Running PHP 7 with Laravel 11/12 (requires PHP 8.2+).",
            "Committing .env files with credentials.",
          ],
          bestPractices: [
            "Use Sail for consistent environments.",
            "Keep .env.example in sync with your .env.",
          ],
          exerciseTitle: "Environment",
          exerciseDescription: "Set up Laravel locally and verify artisan commands work.",
          exerciseRequirements: [
            "Create a project with Composer",
            "Run artisan serve",
            "Check php artisan --version",
          ],
          challenge: "Configure a SQLite database in .env and run migrations.",
          summary:
            "Composer + Sail + .env give a reproducible Laravel environment.",
        }),
        lesson({
          title: "Laravel Project Structure",
          slug: "laravel-structure",
          minutes: 15,
          objective: "Navigate the default Laravel directory structure.",
          intro:
            "Knowing where things live is half of Laravel. Routes, controllers, models, views, and config all have conventional locations.",
          concepts: [
            "- routes/web.php and routes/api.php.",
            "- app/Http/Controllers, app/Models, app/Http/Middleware.",
            "- resources/views for Blade templates.",
            "- database/migrations, database/seeders, database/factories.",
          ],
          example: {
            lang: "text",
            code: "app/\n  Http/\n    Controllers/\n    Middleware/\n  Models/\n  Services/\nconfig/\n  app.php\n  database.php\nresources/\n  views/\nroutes/\n  web.php\n  api.php\ndatabase/\n  migrations/\n  seeders/\n  factories/",
            output: "The conventional Laravel layout.",
          },
          mistakes: [
            "Putting logic in routes instead of controllers.",
            "Storing business logic inside Blade templates.",
          ],
          bestPractices: [
            "Fat models, thin controllers.",
            "Use Artisan generators to create files in the right places.",
          ],
          exerciseTitle: "Structure Tour",
          exerciseDescription: "Explore the structure and generate your first controller and model.",
          exerciseRequirements: [
            "Use php artisan make:controller",
            "Use php artisan make:model",
            "Explain where each file landed",
          ],
          challenge: "Create a service class in app/Services and inject it.",
          summary:
            "Convention-based folders keep Laravel apps predictable.",
        }),
      ],
    },
    {
      title: "Routing",
      description: "Defining URLs and handling requests",
      lessons: [
        lesson({
          title: "Route Basics",
          slug: "laravel-routes",
          minutes: 20,
          objective: "Define GET, POST, and parameterized routes.",
          intro:
            "Routes map HTTP methods and URLs to controllers or closures. They live in routes/web.php and routes/api.php.",
          concepts: [
            "- Route::get/post/put/delete with URIs.",
            "- Route parameters: {id} with optional ? suffix.",
            "- Route naming: ->name('posts.show') for URL generation.",
          ],
          example: {
            lang: "php",
            code: "<?php\n\nuse App\\Http\\Controllers\\PostController;\n\nRoute::get('/posts', [PostController::class, 'index'])->name('posts.index');\nRoute::get('/posts/{post}', [PostController::class, 'show'])->name('posts.show');\nRoute::post('/posts', [PostController::class, 'store'])->name('posts.store');\n\n// Named route -> URL: route('posts.show', $post)",
            output: "Three RESTful routes pointing at controller methods.",
          },
          mistakes: [
            "Writing route logic inline in closures instead of controllers.",
            "Hardcoding URLs instead of using route() and named routes.",
          ],
          bestPractices: [
            "Group related routes with Route::resource for CRUD.",
            "Name routes — renaming a URL only touches the route file.",
          ],
          exerciseTitle: "Route Set",
          exerciseDescription: "Create a full set of routes for a posts resource.",
          exerciseRequirements: [
            "Define index, show, create, store, edit, update, destroy",
            "Use named routes",
            "Generate URLs with route()",
          ],
          challenge: "Refactor to Route::resource('posts') and verify all routes.",
          summary:
            "Clean route definitions with names and parameters power the app.",
        }),
        lesson({
          title: "Route Groups & Middleware",
          slug: "laravel-route-groups",
          minutes: 20,
          objective: "Group routes and apply middleware.",
          intro:
            "Route groups share attributes — middleware, prefixes, and namespaces — so you don't repeat them per route.",
          concepts: [
            "- Route::middleware(['auth'])->group(...).",
            "- Prefixes: ->prefix('admin').",
            "- Route::group applies shared config.",
          ],
          example: {
            lang: "php",
            code: "<?php\n\nRoute::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {\n    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');\n    Route::resource('users', UserController::class);\n});\n\n// URLs: /admin/dashboard, /admin/users\n// Names: admin.dashboard, admin.users.index",
            output: "All admin routes require auth and share the /admin prefix.",
          },
          mistakes: [
            "Applying auth middleware to public routes accidentally.",
            "Deeply nesting groups until the file is unreadable.",
          ],
          bestPractices: [
            "Group by area (admin, api, auth).",
            "Keep route files readable — extract to separate files for big apps.",
          ],
          exerciseTitle: "Admin Group",
          exerciseDescription: "Build an admin route group with auth middleware and prefix.",
          exerciseRequirements: [
            "Create a middleware-protected group",
            "Use a prefix and names",
            "Verify with route:list",
          ],
          challenge: "Add a custom middleware (e.g., checkRole:admin) to the group.",
          summary:
            "Route groups centralize middleware and URL prefixes.",
        }),
        lesson({
          title: "Route Model Binding",
          slug: "laravel-route-binding",
          minutes: 15,
          objective: "Inject models directly into controllers.",
          intro:
            "Laravel resolves type-hinted models in controller methods from the route parameter, fetching the record automatically and 404ing when missing.",
          concepts: [
            "- {post} + Post $post = automatic lookup.",
            "- Customize with getRouteKeyName for slug lookups.",
            "- Scoped bindings constrain child models to a parent.",
          ],
          example: {
            lang: "php",
            code: "// routes/web.php\nRoute::get('/posts/{post}', [PostController::class, 'show']);\n\n// PostController\npublic function show(Post $post)\n{\n    return view('posts.show', ['post' => $post]);\n}\n\n// Model: resolve by slug instead of id\npublic function getRouteKeyName(): string\n{\n    return 'slug';\n}",
            output: "/posts/hello-world loads the post with slug hello-world or 404s.",
          },
          mistakes: [
            "Manually finding models when binding does it for you.",
            "Forgetting to handle the 404 case (binding does it).",
          ],
          bestPractices: [
            "Use bindings for readable controllers.",
            "Use scoped bindings for nested resources.",
          ],
          exerciseTitle: "Model Binding",
          exerciseDescription: "Refactor a controller to use route model binding with slug keys.",
          exerciseRequirements: [
            "Type-hint the model in the method",
            "Customize the route key",
            "Confirm 404 behavior",
          ],
          challenge: "Add scoped binding for posts nested under a user.",
          summary:
            "Route model binding removes lookup boilerplate and gives free 404s.",
        }),
      ],
    },
    {
      title: "Controllers & Requests",
      description: "Handling HTTP requests",
      lessons: [
        lesson({
          title: "Controllers",
          slug: "laravel-controllers",
          minutes: 20,
          objective: "Organize logic in controllers.",
          intro:
            "Controllers handle requests: they orchestrate models, services, and views. Keep them thin by delegating business logic.",
          concepts: [
            "- php artisan make:controller PostController.",
            "- Single action controllers use __invoke.",
            "- Resource controllers have index/create/store/show/edit/update/destroy.",
          ],
          example: {
            lang: "php",
            code: "<?php\n\nnamespace App\\Http\\Controllers;\n\nuse App\\Models\\Post;\nuse Illuminate\\Http\\Request;\n\nclass PostController extends Controller\n{\n    public function index()\n    {\n        $posts = Post::published()->latest()->paginate(10);\n        return view('posts.index', compact('posts'));\n    }\n\n    public function show(Post $post)\n    {\n        return view('posts.show', compact('post'));\n    }\n}",
            output: "Index paginates published posts; show renders one post.",
          },
          mistakes: [
            "Putting queries and business rules directly in controllers.",
            "Returning JSON from web controllers without a purpose.",
          ],
          bestPractices: [
            "Inject services for business logic.",
            "Use Form Requests for validation.",
          ],
          exerciseTitle: "Post Controller",
          exerciseDescription: "Create a PostController covering all seven resource actions.",
          exerciseRequirements: [
            "Generate the controller with Artisan",
            "Implement index and show at minimum",
            "Return views",
          ],
          challenge: "Extract post listing into a service class.",
          summary:
            "Controllers orchestrate; keep them thin and delegate logic.",
        }),
        lesson({
          title: "Requests & Input",
          slug: "laravel-requests",
          minutes: 20,
          objective: "Read input safely from requests.",
          intro:
            "Laravel's Request object handles input, files, headers, and more — with helper methods that keep code clean.",
          concepts: [
            "- $request->input('name'), $request->all(), $request->only([...]).",
            "- $request->query() for query strings.",
            "- Validation via $request->validate() or Form Requests.",
          ],
          example: {
            lang: "php",
            code: "public function store(Request $request)\n{\n    $validated = $request->validate([\n        'title' => 'required|max:255',\n        'body'  => 'required',\n        'published_at' => 'nullable|date',\n    ]);\n\n    $post = Post::create($validated);\n\n    return redirect()->route('posts.show', $post);\n}",
            output: "Validated data creates the post and redirects.",
          },
          mistakes: [
            "Trusting raw input without validation.",
            "Using request()->all() and passing everything to the model (mass assignment).",
          ],
          bestPractices: [
            "Always validate and use the validated array.",
            "Use Form Requests for reusable validation.",
          ],
          exerciseTitle: "Validated Store",
          exerciseDescription: "Add validation rules to a post creation flow.",
          exerciseRequirements: [
            "Validate at least 3 fields",
            "Use the validated data",
            "Redirect with success message",
          ],
          challenge: "Create a FormRequest class for the validation.",
          summary:
            "Request objects give safe input handling with built-in validation.",
        }),
        lesson({
          title: "Form Requests & Mass Assignment",
          slug: "laravel-form-requests",
          minutes: 20,
          objective: "Use Form Requests and protect against mass assignment.",
          intro:
            "Form Requests bundle validation and authorization for a given action. Mass assignment protection ($fillable/$guarded) stops users injecting unwanted fields.",
          concepts: [
            "- php artisan make:request StorePostRequest.",
            "- authorize() controls who may run it.",
            "- rules() returns the validation rules.",
            "- $fillable whitelists writable columns.",
          ],
          example: {
            lang: "php",
            code: "<?php\n\nnamespace App\\Http\\Requests;\n\nuse Illuminate\\Foundation\\Http\\FormRequest;\n\nclass StorePostRequest extends FormRequest\n{\n    public function authorize(): bool\n    {\n        return auth()->check();\n    }\n\n    public function rules(): array\n    {\n        return [\n            'title' => 'required|string|max:255',\n            'body' => 'required|string',\n            'tags' => 'array',\n        ];\n    }\n}\n\n// Controller\npublic function store(StorePostRequest $request)\n{\n    $post = Post::create($request->validated());\n    return redirect()->route('posts.show', $post);\n}",
            output: "Validation and authorization live in one reusable class.",
          },
          mistakes: [
            "Whitelisting too much in $fillable.",
            "Validating in the controller instead of a Form Request.",
          ],
          bestPractices: [
            "Use Form Requests for anything non-trivial.",
            "Review $fillable against your schema regularly.",
          ],
          exerciseTitle: "Form Request",
          exerciseDescription: "Create Form Requests for store and update post actions.",
          exerciseRequirements: [
            "Create both requests",
            "Add authorization rules",
            "Use validated() in controllers",
          ],
          challenge: "Add custom validation rule classes for uniqueness.",
          summary:
            "Form Requests centralize validation and guard mass assignment.",
        }),
      ],
    },
    {
      title: "Blade Templates",
      description: "The templating engine",
      lessons: [
        lesson({
          title: "Blade Basics",
          slug: "laravel-blade",
          minutes: 20,
          objective: "Write templates with Blade syntax.",
          intro:
            "Blade is Laravel's templating engine: plain PHP files with {{ }} for output and @ directives for control flow.",
          concepts: [
            "- {{ $name }} escapes output (XSS-safe).",
            "- @if, @foreach, @forelse directives.",
            "- @extends / @section / @yield for layouts (or components).",
          ],
          example: {
            lang: "php",
            code: "{{-- resources/views/posts/index.blade.php --}}\n<h1>Posts</h1>\n\n@forelse ($posts as $post)\n    <article>\n        <h2>{{ $post->title }}</h2>\n        <p>{{ Str::limit($post->body, 120) }}</p>\n    </article>\n@empty\n    <p>No posts yet.</p>\n@endforelse",
            output: "A list with a clean empty state.",
          },
          mistakes: [
            "Using {!! !!} (unescaped) with user content — XSS risk.",
            "Putting heavy PHP logic in templates.",
          ],
          bestPractices: [
            "Use {{ }} unless you truly need raw HTML (and sanitize it).",
            "Extract repeated markup into components.",
          ],
          exerciseTitle: "Blade List",
          exerciseDescription: "Build a Blade view for posts with a loop and empty state.",
          exerciseRequirements: [
            "Use @forelse or @foreach",
            "Escape dynamic output",
            "Add an empty state",
          ],
          challenge: "Add pagination links with the paginator.",
          summary:
            "Blade provides safe, readable templates with control-flow directives.",
        }),
        lesson({
          title: "Layouts & Components",
          slug: "laravel-blade-components",
          minutes: 20,
          objective: "Share layout with template inheritance and components.",
          intro:
            "Blade layouts use @extends and @section, while Blade components (x-) provide reusable UI with slots and props.",
          concepts: [
            "- Layout: layout.app with @yield('content').",
            "- Components: <x-layout> and <x-card>.",
            "- Slots: {{ $slot }} and named slots.",
          ],
          example: {
            lang: "php",
            code: "{{-- resources/views/layouts/app.blade.php --}}\n<html>\n<head><title>@yield('title', 'My App')</title></head>\n<body>\n    <header>@include('partials.nav')</header>\n    <main>\n        {{ $slot }}\n    </main>\n</body>\n</html>\n\n{{-- usage in a page --}}\n<x-app-layout>\n    <x-slot:title>Posts</x-slot:title>\n    <h1>All Posts</h1>\n</x-app-layout>",
            output: "Every page inherits the shell and fills in its title and content.",
          },
          mistakes: [
            "Duplicating header/footer markup on every page.",
            "Forgetting that components' props must be declared.",
          ],
          bestPractices: [
            "Build UI as Blade components for reuse.",
            "Keep layouts thin.",
          ],
          exerciseTitle: "App Layout",
          exerciseDescription: "Create a shared layout and refactor two pages to use it.",
          exerciseRequirements: [
            "Create the layout component",
            "Use slots",
            "Refactor 2 pages",
          ],
          challenge: "Create a reusable Alert component with a variant prop.",
          summary:
            "Blade components and slots give DRY, composable templates.",
        }),
        lesson({
          title: "Forms & CSRF in Blade",
          slug: "laravel-blade-forms",
          minutes: 15,
          objective: "Build safe forms with CSRF tokens.",
          intro:
            "Every POST form needs @csrf to pass Laravel's CSRF protection. Blade helpers also handle old input and validation errors after redirects.",
          concepts: [
            "- @csrf emits the hidden token input.",
            "- @error('field') shows validation messages.",
            "- old('field') repopulates after validation failure.",
          ],
          example: {
            lang: "php",
            code: "<form method=\"POST\" action=\"{{ route('posts.store') }}\">\n    @csrf\n\n    <input name=\"title\" value=\"{{ old('title') }}\" />\n    @error('title')\n        <p class=\"error\">{{ $message }}</p>\n    @enderror\n\n    <textarea name=\"body\">{{ old('body') }}</textarea>\n    @error('body')\n        <p class=\"error\">{{ $message }}</p>\n    @enderror\n\n    <button type=\"submit\">Create Post</button>\n</form>",
            output: "A CSRF-safe form with error display and old-input restore.",
          },
          mistakes: [
            "Forgetting @csrf — requests get 419 errors.",
            "Not restoring old input after validation fails.",
          ],
          bestPractices: [
            "Always add @csrf to POST forms.",
            "Show errors inline with @error.",
          ],
          exerciseTitle: "Safe Form",
          exerciseDescription: "Build a post-creation form with CSRF, errors, and old input.",
          exerciseRequirements: [
            "Include @csrf",
            "Show field errors",
            "Restore old values",
          ],
          challenge: "Style the error state with Tailwind classes.",
          summary:
            "@csrf, @error, and old() make Blade forms safe and friendly.",
        }),
      ],
    },
    {
      title: "Eloquent ORM",
      description: "Querying and relationships",
      lessons: [
        lesson({
          title: "Eloquent Basics",
          slug: "laravel-eloquent",
          minutes: 25,
          objective: "CRUD with the Eloquent ORM.",
          intro:
            "Eloquent is Laravel's ORM: each model maps to a table and provides query builder methods, relationships, and events.",
          concepts: [
            "- Model names map to plural snake-case tables.",
            "- Post::all(), find(), where(), firstOrFail(), create().",
            "- Scopes chain into queries: Post::published().",
          ],
          example: {
            lang: "php",
            code: "use App\\Models\\Post;\n\n// Read\n$posts = Post::where('status', 'published')\n    ->latest()\n    ->paginate(15);\n\n// Create\n$post = Post::create(['title' => 'Hello', 'body' => 'World']);\n\n// Update\n$post->update(['title' => 'Updated']);\n\n// Delete\n$post->delete();",
            output: "Concise, readable CRUD against the database.",
          },
          mistakes: [
            "Using raw SQL when Eloquent covers the case.",
            "Forgetting to guard mass assignment with $fillable.",
          ],
          bestPractices: [
            "Use query scopes for reusable filters.",
            "Eager load relations to avoid N+1.",
          ],
          exerciseTitle: "Eloquent CRUD",
          exerciseDescription: "Write complete CRUD for a Post model.",
          exerciseRequirements: [
            "All four operations",
            "One query scope",
            "Pagination on the list",
          ],
          challenge: "Add a local scope for 'published last week'.",
          summary:
            "Eloquent turns tables into expressive, chainable model queries.",
        }),
        lesson({
          title: "Relationships",
          slug: "laravel-relationships",
          minutes: 25,
          objective: "Define and query model relationships.",
          intro:
            "Eloquent relationships — hasMany, belongsTo, belongsToMany — express database relations in code and enable eager loading.",
          concepts: [
            "- hasMany / belongsTo for one-to-many.",
            "- belongsToMany with pivot tables for many-to-many.",
            "- with() eager loads to prevent N+1 queries.",
          ],
          example: {
            lang: "php",
            code: "class User extends Authenticatable\n{\n    public function posts()\n    {\n        return $this->hasMany(Post::class);\n    }\n\n    public function roles()\n    {\n        return $this->belongsToMany(Role::class);\n    }\n}\n\n// Usage\n$user->posts;              // collection of posts\n$user->posts()->create([...]);\n$user->roles()->attach($roleId);\n\n// Eager load to avoid N+1\n$users = User::with('posts')->get();",
            output: "Relationships read naturally and query efficiently.",
          },
          mistakes: [
            "Forgetting with() — N+1 queries kill performance.",
            "Defining relations that don't match the migration columns.",
          ],
          bestPractices: [
            "Eager load by default in list views.",
            "Use has() / whereHas() for existence filters.",
          ],
          exerciseTitle: "Relations",
          exerciseDescription: "Add posts and roles relations to a User model and query them.",
          exerciseRequirements: [
            "Define both relations",
            "Eager load with with()",
            "Use whereHas for a filter",
          ],
          challenge: "Count posts per user with withCount.",
          summary:
            "Eloquent relationships model the database in code with eager-loading support.",
        }),
        lesson({
          title: "Migrations & Seeders",
          slug: "laravel-migrations",
          minutes: 25,
          objective: "Version the schema with migrations.",
          intro:
            "Migrations version the database schema; seeders fill it with data; factories generate test data. Together they make databases reproducible.",
          concepts: [
            "- php artisan make:migration create_posts_table.",
            "- Schema::create with columns and indexes.",
            "- Seeders + factories populate dev data.",
          ],
          example: {
            lang: "php",
            code: "use Illuminate\\Database\\Migrations\\Migration;\nuse Illuminate\\Database\\Schema\\Blueprint;\nuse Illuminate\\Support\\Facades\\Schema;\n\nreturn new class extends Migration\n{\n    public function up(): void\n    {\n        Schema::create('posts', function (Blueprint $table) {\n            $table->id();\n            $table->foreignId('user_id')->constrained()->cascadeOnDelete();\n            $table->string('title');\n            $table->text('body');\n            $table->timestamp('published_at')->nullable();\n            $table->timestamps();\n            $table->index(['user_id', 'published_at']);\n        });\n    }\n\n    public function down(): void\n    {\n        Schema::dropIfExists('posts');\n    }\n};",
            output: "A posts table with FK, timestamps, and a useful index.",
          },
          mistakes: [
            "Editing old migrations after they've run — create new ones.",
            "Forgetting the down() method for rollbacks.",
          ],
          bestPractices: [
            "One concern per migration.",
            "Use foreignId()->constrained() for clean FKs.",
          ],
          exerciseTitle: "Posts Migration",
          exerciseDescription: "Create a posts table with relationships and run it.",
          exerciseRequirements: [
            "Define the schema",
            "Add a foreign key",
            "Run migrate and verify with schema dump",
          ],
          challenge: "Add a seeder with a factory generating 50 posts.",
          summary:
            "Migrations, seeders, and factories make schema and data reproducible.",
        }),
      ],
    },
    {
      title: "Authentication",
      description: "Login, registration, and guards",
      lessons: [
        lesson({
          title: "Auth Scaffolding",
          slug: "laravel-auth-scaffold",
          minutes: 25,
          objective: "Set up authentication with Laravel Breeze.",
          intro:
            "Laravel Breeze provides minimal, clean authentication: register, login, password reset, and email verification, ready to customize.",
          concepts: [
            "- composer require laravel/breeze --dev.",
            "- php artisan breeze:install blade.",
            "- Auth::check(), Auth::user(), auth()->id().",
          ],
          syntax: {
            lang: "bash",
            code: "composer require laravel/breeze --dev\nphp artisan breeze:install blade\nphp artisan migrate\nnpm install && npm run dev",
          },
          example: {
            lang: "php",
            code: "// routes/web.php — protected route\nRoute::middleware(['auth'])->group(function () {\n    Route::get('/dashboard', function () {\n        return view('dashboard', ['user' => auth()->user()]);\n    })->name('dashboard');\n});",
            output: "/dashboard requires login and greets the authenticated user.",
          },
          mistakes: [
            "Building auth from scratch when Breeze is the sanctioned starting point.",
            "Forgetting to run migrations after installing.",
          ],
          bestPractices: [
            "Use Breeze/Starter Kits for proven auth flows.",
            "Protect routes with the auth middleware.",
          ],
          exerciseTitle: "Auth Install",
          exerciseDescription: "Install Breeze, migrate, and verify the auth flow.",
          exerciseRequirements: [
            "Install and configure Breeze",
            "Run migrations",
            "Register a user and confirm the dashboard",
          ],
          challenge: "Customize the register form to add a first_name field.",
          summary:
            "Breeze scaffolds secure, customizable authentication fast.",
        }),
        lesson({
          title: "Guards & Middleware",
          slug: "laravel-guards",
          minutes: 20,
          objective: "Understand guards, providers, and route protection.",
          intro:
            "Guards define how users authenticate (session vs token); providers define where users come from (the users table). Middleware applies guards to routes.",
          concepts: [
            "- config/auth.php defines guards and providers.",
            "- auth middleware protects routes.",
            "- Auth::attempt() validates credentials manually.",
          ],
          example: {
            lang: "php",
            code: "if (Auth::attempt(['email' => $email, 'password' => $password], $remember)) {\n    $request->session()->regenerate();\n    return redirect()->intended('/dashboard');\n}\n\nreturn back()->withErrors(['email' => 'Invalid credentials.']);",
            output: "Manual login with session regeneration against session fixation.",
          },
          mistakes: [
            "Skipping session()->regenerate() after login.",
            "Trusting Auth::user() before checking auth()->check().",
          ],
          bestPractices: [
            "Always regenerate the session on login.",
            "Use redirect()->intended() to return users to their destination.",
          ],
          exerciseTitle: "Custom Login",
          exerciseDescription: "Implement a manual login flow with session regeneration.",
          exerciseRequirements: [
            "Use Auth::attempt",
            "Regenerate the session",
            "Use intended() redirect",
          ],
          challenge: "Add a remember-me cookie path.",
          summary:
            "Guards + middleware protect routes; session regeneration prevents fixation.",
        }),
        lesson({
          title: "Authorization with Gates & Policies",
          slug: "laravel-policies",
          minutes: 25,
          objective: "Authorize actions with gates and policies.",
          intro:
            "Policies define per-model authorization: who may update, delete, or publish. Gates cover non-model actions like viewing admin panels.",
          concepts: [
            "- php artisan make:policy PostPolicy.",
            "- Methods like update(User $user, Post $post).",
            "- authorize() in controllers or @can in Blade.",
          ],
          example: {
            lang: "php",
            code: "class PostPolicy\n{\n    public function update(User $user, Post $post): bool\n    {\n        return $user->id === $post->user_id;\n    }\n\n    public function delete(User $user, Post $post): bool\n    {\n        return $user->id === $post->user_id;\n    }\n}\n\n// Controller\npublic function update(UpdatePostRequest $request, Post $post)\n{\n    $this->authorize('update', $post);\n    $post->update($request->validated());\n    return redirect()->route('posts.show', $post);\n}",
            output: "Only the author can update or delete their post.",
          },
          mistakes: [
            "Checking ownership manually in every controller method.",
            "Forgetting to authorize API and web entry points equally.",
          ],
          bestPractices: [
            "Always authorize, even for UI-hidden buttons.",
            "Test policies with policy-specific tests.",
          ],
          exerciseTitle: "Post Policy",
          exerciseDescription: "Create a PostPolicy and enforce it in update/delete.",
          exerciseRequirements: [
            "Generate the policy",
            "Implement owner checks",
            "Call authorize in controllers",
          ],
          challenge: "Add a publish action gated by an isAdmin check.",
          summary:
            "Policies centralize authorization so controllers stay clean and safe.",
        }),
      ],
    },
    {
      title: "Database & Eloquent Advanced",
      description: "Factories, relationships, and query power",
      lessons: [
        lesson({
          title: "Factories & Seeders",
          slug: "laravel-factories",
          minutes: 20,
          objective: "Generate test data with factories.",
          intro:
            "Factories define how to generate a model with realistic fake data; seeders use them to populate the database.",
          concepts: [
            "- php artisan make:factory PostFactory.",
            "- Faker generates names, emails, paragraphs.",
            "- DatabaseSeeder calls other seeders.",
          ],
          example: {
            lang: "php",
            code: "class PostFactory extends Factory\n{\n    protected $model = Post::class;\n\n    public function definition(): array\n    {\n        return [\n            'user_id' => User::factory(),\n            'title' => fake()->sentence(6),\n            'body' => fake()->paragraphs(3, true),\n            'published_at' => fake()->optional()->dateTime(),\n        ];\n    }\n}\n\n// Usage\nPost::factory()->count(50)->create();",
            output: "50 realistic posts with valid relations in one line.",
          },
          mistakes: [
            "Hardcoding data in factories instead of using Faker.",
            "Factories referencing models that don't exist.",
          ],
          bestPractices: [
            "Use state() methods for variants (published, draft).",
            "Seed a small, deterministic dataset for dev.",
          ],
          exerciseTitle: "Post Factory",
          exerciseDescription: "Create a factory and seed 25 posts with a user.",
          exerciseRequirements: [
            "Create the factory",
            "Use Faker",
            "Run the seeder",
          ],
          challenge: "Add states: published, draft, featured.",
          summary:
            "Factories + seeders produce realistic data for development and testing.",
        }),
        lesson({
          title: "Query Scopes & Accessors",
          slug: "laravel-scopes",
          minutes: 20,
          objective: "Encapsulate queries and attribute formatting.",
          intro:
            "Local scopes wrap reusable query constraints; accessors format attributes when read; mutators format on write.",
          concepts: [
            "- scopePublished => Post::published().",
            "- getFullNameAttribute => $user->full_name.",
            "- Casts: dates, booleans, JSON columns.",
          ],
          example: {
            lang: "php",
            code: "class Post extends Model\n{\n    protected $casts = [\n        'published_at' => 'datetime',\n        'is_featured' => 'boolean',\n        'meta' => 'array',\n    ];\n\n    public function scopePublished($query)\n    {\n        return $query->whereNotNull('published_at')\n            ->where('published_at', '<=', now());\n    }\n\n    public function getExcerptAttribute(): string\n    {\n        return Str::limit($this->body, 150);\n    }\n}",
            output: "Reusable filters and clean attribute access.",
          },
          mistakes: [
            "Repeating the same where clauses across controllers.",
            "Formatting attributes in views instead of accessors.",
          ],
          bestPractices: [
            "Put query filters in scopes, formatting in accessors.",
            "Use casts for consistent types.",
          ],
          exerciseTitle: "Scopes & Accessors",
          exerciseDescription: "Add published/featured scopes and an excerpt accessor.",
          exerciseRequirements: [
            "2 local scopes",
            "1 accessor",
            "Use casts on 2 fields",
          ],
          challenge: "Add a global scope for multi-tenancy (user_id filter).",
          summary:
            "Scopes, accessors, and casts keep models expressive and DRY.",
        }),
        lesson({
          title: "Eloquent Performance",
          slug: "laravel-eloquent-performance",
          minutes: 20,
          objective: "Avoid N+1 and profile slow queries.",
          intro:
            "The N+1 problem — querying relations per row — is the most common Laravel performance issue. Eager loading, withCount, and the query log reveal it.",
          concepts: [
            "- with('posts') eager loads in one query.",
            "- withCount('posts') adds counts without loading rows.",
            "- DB::enableQueryLog() or Laravel Debugbar shows queries.",
          ],
          example: {
            lang: "php",
            code: "// BAD: N+1 — one query per user\n$users = User::all();\nforeach ($users as $user) {\n    echo $user->posts->count(); // queries per user\n}\n\n// GOOD: two queries total\n$users = User::withCount('posts')->get();\nforeach ($users as $user) {\n    echo $user->posts_count;\n}",
            output: "One query instead of N+1.",
          },
          mistakes: [
            "Loading entire relations just to count them.",
            "Ignoring the Debugbar query count.",
          ],
          bestPractices: [
            "Watch the query count in Debugbar.",
            "Add indexes matching common where clauses.",
          ],
          exerciseTitle: "N+1 Fix",
          exerciseDescription: "Find and fix N+1 in a users-with-posts list.",
          exerciseRequirements: [
            "Reproduce the N+1",
            "Fix with eager loading",
            "Verify query count dropped",
          ],
          challenge: "Profile a slow query and add the right index.",
          summary:
            "Eager loading and withCount eliminate the N+1 problem.",
        }),
      ],
    },
    {
      title: "REST APIs with Laravel",
      description: "API routes, resources, and JSON",
      lessons: [
        lesson({
          title: "API Routes",
          slug: "laravel-api-routes",
          minutes: 20,
          objective: "Build JSON APIs on routes/api.php.",
          intro:
            "API routes share a /api prefix and skip session state — authentication uses tokens instead of cookies.",
          concepts: [
            "- routes/api.php with the api middleware group.",
            "- Return JSON responses or resources.",
            "- API resource controllers: php artisan make:controller --api.",
          ],
          example: {
            lang: "php",
            code: "// routes/api.php\nuse App\\Http\\Controllers\\Api\\PostController;\n\nRoute::apiResource('posts', PostController::class);\n\n// GET /api/posts          -> index\n// POST /api/posts         -> store\n// GET /api/posts/{post}   -> show\n// PUT/PATCH /api/posts/{post} -> update\n// DELETE /api/posts/{post} -> destroy",
            output: "Five REST endpoints from one line.",
          },
          mistakes: [
            "Putting API routes in web.php (session/CSRF apply).",
            "Returning HTML views from API routes.",
          ],
          bestPractices: [
            "Use apiResource for CRUD APIs.",
            "Return JSON consistently with proper status codes.",
          ],
          exerciseTitle: "Posts API",
          exerciseDescription: "Create a posts API with all five endpoints.",
          exerciseRequirements: [
            "Use apiResource",
            "Implement controller methods",
            "Return JSON",
          ],
          challenge: "Add pagination metadata to the index response.",
          summary:
            "apiResource builds full JSON CRUD APIs with one route declaration.",
        }),
        lesson({
          title: "API Resources",
          slug: "laravel-api-resources",
          minutes: 20,
          objective: "Shape JSON responses with API Resources.",
          intro:
            "API Resources transform models into clean JSON — you control exactly which fields appear, including computed values.",
          concepts: [
            "- php artisan make:resource PostResource.",
            "- toArray() defines the shape.",
            "- Collections via PostResource::collection($posts).",
          ],
          example: {
            lang: "php",
            code: "class PostResource extends JsonResource\n{\n    public function toArray($request): array\n    {\n        return [\n            'id' => $this->id,\n            'title' => $this->title,\n            'excerpt' => $this->excerpt,\n            'author' => $this->whenLoaded('user', fn () => [\n                'id' => $this->user->id,\n                'name' => $this->user->name,\n            ]),\n            'published_at' => $this->published_at?->toISOString(),\n        ];\n    }\n}\n\n// Controller\nreturn PostResource::collection($posts);",
            output: "A controlled, nested JSON shape.",
          },
          mistakes: [
            "Returning full models with hidden passwords leaking.",
            "Forgetting whenLoaded for optional relations.",
          ],
          bestPractices: [
            "Explicitly list output fields.",
            "Use whenLoaded to include relations only when eager-loaded.",
          ],
          exerciseTitle: "Resource Shape",
          exerciseDescription: "Create a PostResource and apply it to list and detail endpoints.",
          exerciseRequirements: [
            "Create the resource",
            "Shape 4+ fields",
            "Use whenLoaded for a relation",
          ],
          challenge: "Add a nested UserResource for the author.",
          summary:
            "API Resources give you full control over JSON output.",
        }),
        lesson({
          title: "API Authentication (Sanctum)",
          slug: "laravel-sanctum",
          minutes: 25,
          objective: "Protect APIs with Laravel Sanctum tokens.",
          intro:
            "Sanctum issues personal access tokens for API clients: mobile apps, SPAs, and third parties authenticate with Bearer tokens.",
          concepts: [
            "- php artisan install:api sets up Sanctum.",
            "- $user->createToken('name') issues a token.",
            "- SPA clients can use cookie-based session auth.",
          ],
          example: {
            lang: "php",
            code: "// routes/api.php\nRoute::middleware('auth:sanctum')->get('/user', function (Request $request) {\n    return $request->user();\n});\n\n// Login controller\npublic function login(Request $request)\n{\n    $credentials = $request->validate([\n        'email' => 'required|email',\n        'password' => 'required',\n    ]);\n\n    if (!Auth::attempt($credentials)) {\n        return response()->json(['message' => 'Invalid credentials'], 401);\n    }\n\n    $token = $request->user()->createToken('api')->plainTextToken;\n\n    return response()->json(['token' => $token, 'user' => $request->user()]);\n}",
            output: "Login returns a plain-text token; protected routes require it.",
          },
          mistakes: [
            "Using web session auth for mobile clients.",
            "Storing plainTextToken insecurely on the client.",
          ],
          bestPractices: [
            "Use Sanctum tokens for API clients.",
            "Return token_type and expiry metadata.",
          ],
          exerciseTitle: "Token Auth",
          exerciseDescription: "Set up Sanctum and protect a posts API with tokens.",
          exerciseRequirements: [
            "Install Sanctum",
            "Create a login endpoint returning a token",
            "Protect routes with auth:sanctum",
          ],
          challenge: "Add token revocation on logout.",
          summary:
            "Sanctum secures APIs with tokens, plus SPA session support.",
        }),
      ],
    },
    {
      title: "Validation & Errors",
      description: "Form and API validation",
      lessons: [
        lesson({
          title: "Validation Rules",
          slug: "laravel-validation-rules",
          minutes: 20,
          objective: "Use Laravel's built-in validation rules.",
          intro:
            "Laravel ships dozens of validation rules — required, email, unique, confirmed, between, exists, and more — applied to requests or arrays.",
          concepts: [
            "- Pipe syntax: 'title' => 'required|string|max:255'.",
            "- Array syntax: ['title' => ['required', 'string', 'max:255']].",
            "- Custom messages and attributes.",
          ],
          example: {
            lang: "php",
            code: "$validated = $request->validate([\n    'name' => ['required', 'string', 'max:255'],\n    'email' => ['required', 'email', 'unique:users,email'],\n    'password' => ['required', 'confirmed', 'min:8'],\n    'age' => ['nullable', 'integer', 'between:13,120'],\n]);",
            output: "Multi-rule validation with uniqueness against the users table.",
          },
          mistakes: [
            "Using regex rules without escaping.",
            "Forgetting confirmed requires a _confirmation field.",
          ],
          bestPractices: [
            "Prefer array syntax for readability.",
            "Use Form Requests for complex validation.",
          ],
          exerciseTitle: "Rules Practice",
          exerciseDescription: "Validate a profile form with 6+ different rules.",
          exerciseRequirements: [
            "Use unique, confirmed, between",
            "Use nullable with conditionals",
            "Test error responses",
          ],
          challenge: "Add custom error messages per rule.",
          summary:
            "Built-in rules cover most validation needs concisely.",
        }),
        lesson({
          title: "Custom Validation",
          slug: "laravel-custom-validation",
          minutes: 20,
          objective: "Write custom rule classes and closures.",
          intro:
            "When built-in rules aren't enough, write rule objects or closures that return true or a failure message.",
          concepts: [
            "- php artisan make:rule StrongPassword.",
            "- passes() contains the check.",
            "- Rule objects are injectable and testable.",
          ],
          example: {
            lang: "php",
            code: "class StrongPassword implements ValidationRule\n{\n    public function validate($attribute, $value, $fail): void\n    {\n        if (!preg_match('/[A-Z]/', $value) || !preg_match('/[0-9]/', $value)) {\n            $fail('The :attribute must contain an uppercase letter and a number.');\n        }\n    }\n}\n\n// Usage\n'password' => ['required', new StrongPassword],",
            output: "Password policy enforced by a reusable rule class.",
          },
          mistakes: [
            "Writing complex rules inline in controllers.",
            "Returning false without a helpful message.",
          ],
          bestPractices: [
            "Rule classes keep validation logic testable.",
            "Use rule classes across web and API.",
          ],
          exerciseTitle: "Custom Rule",
          exerciseDescription: "Create a rule validating usernames (letters, numbers, underscore, min length).",
          exerciseRequirements: [
            "Create the rule class",
            "Apply it in a Form Request",
            "Write the failure message",
          ],
          challenge: "Add a database-backed rule (unique username).",
          summary:
            "Rule classes extend validation with reusable, testable logic.",
        }),
        lesson({
          title: "Error Handling",
          slug: "laravel-errors",
          minutes: 15,
          objective: "Handle exceptions gracefully.",
          intro:
            "Laravel converts exceptions into friendly responses: HTTP errors render error pages, validation redirects back with errors, and the log captures details.",
          concepts: [
            "- Exception handlers in bootstrap/app.php (Laravel 11+).",
            "- Custom exception classes render custom responses.",
            "- API requests get JSON errors automatically.",
          ],
          example: {
            lang: "php",
            code: "// Custom exception\nclass PaymentFailedException extends Exception {}\n\n// Controller\ntry {\n    $payment = $this->payments->charge($amount);\n} catch (PaymentFailedException $e) {\n    Log::warning('Payment failed', ['user' => $user->id, 'reason' => $e->getMessage()]);\n    return back()->withErrors(['payment' => 'Your payment could not be processed.']);\n}",
            output: "Failures log details but show users a friendly message.",
          },
          mistakes: [
            "Displaying exception messages to users (leaks internals).",
            "Swallowing exceptions silently.",
          ],
          bestPractices: [
            "Log with context; respond generically.",
            "Use abort() for HTTP errors.",
          ],
          exerciseTitle: "Error Flow",
          exerciseDescription: "Add try/catch with logging and friendly errors to a payment-like flow.",
          exerciseRequirements: [
            "Custom exception",
            "Log with context",
            "Friendly user response",
          ],
          challenge: "Register a JSON renderer for API errors.",
          summary:
            "Handle exceptions by logging details and responding kindly.",
        }),
      ],
    },
    {
      title: "Files & Media",
      description: "Uploads and storage",
      lessons: [
        lesson({
          title: "File Uploads",
          slug: "laravel-uploads",
          minutes: 20,
          objective: "Handle file uploads with validation.",
          intro:
            "Laravel's Storage facade and request files make uploads simple: validate the file, store it, and save the path.",
          concepts: [
            "- $request->file('avatar')->store('avatars', 'public').",
            "- Validation: image, mimes, max:2048.",
            "- Storage::disk('public') for public files.",
          ],
          example: {
            lang: "php",
            code: "public function updateAvatar(Request $request)\n{\n    $validated = $request->validate([\n        'avatar' => ['required', 'image', 'mimes:jpeg,png,webp', 'max:2048'],\n    ]);\n\n    $path = $request->file('avatar')->store('avatars', 'public');\n\n    $user = auth()->user();\n    $user->avatar_path = $path;\n    $user->save();\n\n    return back()->with('success', 'Avatar updated!');\n}",
            output: "Validated image stored under public storage with its path saved.",
          },
          mistakes: [
            "Skipping file type/size validation.",
            "Storing uploads where they can't be served.",
          ],
          bestPractices: [
            "Validate mime types and size limits.",
            "Use Storage for cloud (S3) portability.",
          ],
          exerciseTitle: "Avatar Upload",
          exerciseDescription: "Add an avatar upload with validation and display.",
          exerciseRequirements: [
            "Validate the file",
            "Store it with a generated name",
            "Display it back",
          ],
          challenge: "Delete the old avatar when replaced.",
          summary:
            "Storage + validation handle uploads safely and portably.",
        }),
        lesson({
          title: "Downloading & Streaming",
          slug: "laravel-downloads",
          minutes: 15,
          objective: "Serve files for download and streaming.",
          intro:
            "The Storage facade and response helpers serve downloads, and streamDownload streams large files without loading them into memory.",
          concepts: [
            "- Storage::download($path) or response()->download().",
            "- Storage::disk('local')->download().",
            "- streamDownload for large generated files.",
          ],
          example: {
            lang: "php",
            code: "use Illuminate\\Support\\Facades\\Storage;\n\nRoute::get('/reports/{report}/download', function (Report $report) {\n    abort_unless(Storage::disk('private')->exists($report->file_path), 404);\n\n    return Storage::disk('private')->download($report->file_path);\n})->middleware('auth');",
            output: "Authenticated users download private files with correct headers.",
          },
          mistakes: [
            "Serving private files from the public disk.",
            "Loading huge files into memory.",
          ],
          bestPractices: [
            "Keep private files on the local/private disk.",
            "Use streamDownload for big files.",
          ],
          exerciseTitle: "Download Route",
          exerciseDescription: "Create an authenticated download route for a private file.",
          exerciseRequirements: [
            "Auth middleware",
            "Existence check",
            "Download response",
          ],
          challenge: "Generate a CSV in memory and stream it as a download.",
          summary:
            "Downloads and streams serve files efficiently and securely.",
        }),
      ],
    },
    {
      title: "Queues & Jobs",
      description: "Background work",
      lessons: [
        lesson({
          title: "Queues & Jobs",
          slug: "laravel-queues",
          minutes: 25,
          objective: "Run slow work in the background with jobs.",
          intro:
            "Queues defer slow work — emails, imports, notifications — out of the request lifecycle. Jobs are serializable classes run by workers.",
          concepts: [
            "- php artisan make:job ProcessReport.",
            "- dispatch() / dispatchAfterResponse().",
            "- php artisan queue:work runs the worker.",
          ],
          example: {
            lang: "php",
            code: "class SendWelcomeEmail implements ShouldQueue\n{\n    use Queueable, SerializesModels;\n\n    public function __construct(public User $user) {}\n\n    public function handle(): void\n    {\n        Mail::to($this->user)->send(new WelcomeEmail($this->user));\n    }\n}\n\n// Dispatch\nSendWelcomeEmail::dispatch($user);",
            output: "The email sends in the background; the request returns instantly.",
          },
          mistakes: [
            "Running jobs synchronously (dispatchSync) when the queue is the point.",
            "Passing non-serializable data to jobs.",
          ],
          bestPractices: [
            "Use SerializesModels for model properties.",
            "Run queue:work in production workers or Horizon.",
          ],
          exerciseTitle: "Job Queue",
          exerciseDescription: "Create a job that sends a report email and dispatch it.",
          exerciseRequirements: [
            "Create a ShouldQueue job",
            "Dispatch it",
            "Run a worker locally and verify",
          ],
          challenge: "Add retry and timeout configuration.",
          summary:
            "Queues move slow work off the request path into background jobs.",
        }),
        lesson({
          title: "Queued Notifications",
          slug: "laravel-notifications",
          minutes: 20,
          objective: "Send notifications via channels.",
          intro:
            "Notifications deliver messages through channels — mail, database, SMS — from one Notification class.",
          concepts: [
            "- php artisan make:notification CourseCompleted.",
            "- via() lists channels; toMail/toDatabase build messages.",
            "- $user->notify(new CourseCompleted($course)).",
          ],
          example: {
            lang: "php",
            code: "class CourseCompleted extends Notification\n{\n    use Queueable;\n\n    public function __construct(public Course $course) {}\n\n    public function via(object $notifiable): array\n    {\n        return ['mail', 'database'];\n    }\n\n    public function toMail(object $notifiable): MailMessage\n    {\n        return (new MailMessage)\n            ->subject('Course completed!')\n            ->line('Congratulations on finishing ' . $this->course->title)\n            ->action('View Certificate', url('/certificates'));\n    }\n\n    public function toArray(object $notifiable): array\n    {\n        return ['course_id' => $this->course->id];\n    }\n}\n\n// Usage\n$user->notify(new CourseCompleted($course));",
            output: "One class delivers mail + in-app notification.",
          },
          mistakes: [
            "Duplicating messages across channels manually.",
            "Forgetting Queueable on slow channels.",
          ],
          bestPractices: [
            "One notification class per event.",
            "Use database channel for in-app notifications.",
          ],
          exerciseTitle: "Notification",
          exerciseDescription: "Create a WelcomeNotification with mail and database channels.",
          exerciseRequirements: [
            "Create the notification",
            "Implement two channels",
            "Send it to a user",
          ],
          challenge: "Add an on-demand (unregistered email) notification.",
          summary:
            "Notifications fan out one event to many channels.",
        }),
      ],
    },
    {
      title: "Testing",
      description: "Feature and unit tests",
      lessons: [
        lesson({
          title: "Test Setup",
          slug: "laravel-testing",
          minutes: 20,
          objective: "Write feature tests for routes and controllers.",
          intro:
            "Pest and PHPUnit are the testing tools. Feature tests hit routes and assert on responses, database state, and redirects.",
          concepts: [
            "- php artisan test runs the suite.",
            "- Tests use a separate database (in-memory or test DB).",
            "- $this->get/post/assertStatus/assertDatabaseHas.",
          ],
          example: {
            lang: "php",
            code: "class PostTest extends TestCase\n{\n    use RefreshDatabase;\n\n    public function test_guest_cannot_create_post(): void\n    {\n        $this->post('/posts', ['title' => 'Hi'])\n            ->assertRedirect('/login');\n    }\n\n    public function test_user_can_create_post(): void\n    {\n        $user = User::factory()->create();\n\n        $this->actingAs($user)\n            ->post('/posts', ['title' => 'Hello', 'body' => 'World'])\n            ->assertRedirect();\n\n        $this->assertDatabaseHas('posts', ['title' => 'Hello']);\n    }\n}",
            output: "Auth and CRUD behavior proven by tests.",
          },
          mistakes: [
            "Not using RefreshDatabase — tests leak state.",
            "Asserting on implementation instead of behavior.",
          ],
          bestPractices: [
            "Test user-visible behavior.",
            "Use factories for fixtures.",
          ],
          exerciseTitle: "Post Tests",
          exerciseDescription: "Write tests for guest redirect, create, and validation failure.",
          exerciseRequirements: [
            "Use RefreshDatabase",
            "3 test cases",
            "Assert database state",
          ],
          challenge: "Test the policy: a user cannot edit another's post.",
          summary:
            "Feature tests verify real request flows against a fresh database.",
        }),
        lesson({
          title: "Testing APIs",
          slug: "laravel-api-tests",
          minutes: 20,
          objective: "Test API endpoints with JSON assertions.",
          intro:
            "API tests use json(), assertJson, and assertJsonStructure to verify endpoints, auth, and validation.",
          concepts: [
            "- $this->withToken($token)->getJson('/api/posts').",
            "- assertStatus(200), assertJsonCount, assertJsonStructure.",
            "- Sanctum::actingAs($user) authenticates test requests.",
          ],
          example: {
            lang: "php",
            code: "use Laravel\\Sanctum\\Sanctum;\n\npublic function test_index_requires_auth(): void\n{\n    $this->getJson('/api/posts')->assertUnauthorized();\n}\n\npublic function test_index_returns_posts(): void\n{\n    Sanctum::actingAs(User::factory()->create());\n\n    Post::factory()->count(3)->create();\n\n    $this->getJson('/api/posts')\n        ->assertOk()\n        ->assertJsonCount(3, 'data');\n}\n\npublic function test_store_validates(): void\n{\n    Sanctum::actingAs(User::factory()->create());\n\n    $this->postJson('/api/posts', ['title' => ''])\n        ->assertUnprocessable()\n        ->assertJsonValidationErrors('title');\n}",
            output: "Auth, shape, and validation all covered.",
          },
          mistakes: [
            "Hitting endpoints without auth — failing on guards.",
            "Asserting raw JSON instead of structure.",
          ],
          bestPractices: [
            "Test both happy paths and auth failures.",
            "Use assertJsonStructure to lock the contract.",
          ],
          exerciseTitle: "API Test Suite",
          exerciseDescription: "Write tests for the posts API covering auth, index, store, and validation.",
          exerciseRequirements: [
            "Unauthorized test",
            "Happy-path test",
            "Validation-error test",
          ],
          challenge: "Test token revocation on logout.",
          summary:
            "API tests lock down endpoints, auth, and response contracts.",
        }),
      ],
    },
    {
      title: "Security",
      description: "Hardening Laravel apps",
      lessons: [
        lesson({
          title: "Laravel Security Defaults",
          slug: "laravel-security",
          minutes: 20,
          objective: "Leverage built-in protections: CSRF, XSS, SQL.",
          intro:
            "Laravel protects against the OWASP basics out of the box: CSRF tokens, Blade escaping, parameterized queries. Know what's automatic and what's on you.",
          concepts: [
            "- CSRF: tokens on every POST via @csrf.",
            "- XSS: Blade {{ }} escapes; SQL: Eloquent parameterizes.",
            "- On you: authz checks, rate limiting, secure cookies.",
          ],
          example: {
            lang: "php",
            code: "// config/session.php\n'secure' => env('SESSION_SECURE_COOKIE', true),\n'http_only' => true,\n'same_site' => 'lax',\n\n// Throttle login attempts\nRoute::middleware(['throttle:5,1'])->post('/login', [LoginController::class, 'login']);",
            output: "Secure cookies and throttled login.",
          },
          mistakes: [
            "Disabling CSRF for convenience.",
            "Using {!! !!} on user content.",
          ],
          bestPractices: [
            "Keep defaults; add throttling and authz.",
            "Audit with security tooling.",
          ],
          exerciseTitle: "Security Audit",
          exerciseDescription: "Audit an app: CSRF tokens, escaping, throttling, secure cookies.",
          exerciseRequirements: [
            "Verify @csrf on all POST forms",
            "Confirm {{ }} escaping everywhere",
            "Add throttling to login",
          ],
          challenge: "Add a content-security-policy header middleware.",
          summary:
            "Defaults cover CSRF/XSS/SQL; harden authz, throttling, and cookies.",
        }),
        lesson({
          title: "Rate Limiting",
          slug: "laravel-rate-limiting",
          minutes: 15,
          objective: "Throttle requests per user and IP.",
          intro:
            "Laravel's rate limiter protects endpoints from brute force and abuse, with named limiters configurable per route.",
          concepts: [
            "- RateLimiter::for('login', ...) in AppServiceProvider.",
            "- throttle:login middleware on routes.",
            "- Per-user limits automatically key on auth id.",
          ],
          example: {
            lang: "php",
            code: "use Illuminate\\Cache\\RateLimiting\\Limit;\nuse Illuminate\\Support\\Facades\\RateLimiter;\n\nRateLimiter::for('login', function (Request $request) {\n    return Limit::perMinute(5)->by($request->user()?->id ?: $request->ip());\n});\n\n// routes/web.php\nRoute::post('/login', [LoginController::class, 'login'])\n    ->middleware('throttle:login');",
            output: "5 login attempts per minute per user/IP.",
          },
          mistakes: [
            "Throttling only login — protect register and APIs too.",
            "Keying purely by IP behind a shared proxy.",
          ],
          bestPractices: [
            "Key by user when authenticated, IP otherwise.",
            "Return a clear retry-after message.",
          ],
          exerciseTitle: "Throttle",
          exerciseDescription: "Add named rate limiters to login and a public API.",
          exerciseRequirements: [
            "Define a named limiter",
            "Apply throttle middleware",
            "Test the 429 response",
          ],
          challenge: "Customize the rate limit exceeded message.",
          summary:
            "Rate limiters throttle abuse per user or IP.",
        }),
      ],
    },
    {
      title: "Deployment",
      description: "Shipping Laravel to production",
      lessons: [
        lesson({
          title: "Production Prep",
          slug: "laravel-production",
          minutes: 20,
          objective: "Prepare a Laravel app for production.",
          intro:
            "Production setup: caching config, optimizing autoload, HTTPS, and environment separation.",
          concepts: [
            "- php artisan config:cache, route:cache, view:cache.",
            "- APP_ENV=production, APP_DEBUG=false.",
            "- Optimize composer with --no-dev.",
          ],
          syntax: {
            lang: "bash",
            code: "composer install --no-dev --optimize-autoloader\nphp artisan config:cache\nphp artisan route:cache\nphp artisan view:cache\nphp artisan migrate --force",
          },
          example: {
            lang: "bash",
            code: "# .env production\nAPP_ENV=production\nAPP_DEBUG=false\nAPP_URL=https://example.com\nSESSION_SECURE_COOKIE=true",
            output: "A hardened production configuration.",
          },
          mistakes: [
            "APP_DEBUG=true in production — leaks secrets.",
            "Running migrations without --force in production.",
          ],
          bestPractices: [
            "Cache config after every deploy.",
            "Keep .env out of version control.",
          ],
          exerciseTitle: "Prep Checklist",
          exerciseDescription: "Apply the production prep checklist to your app.",
          exerciseRequirements: [
            "Set production env values",
            "Cache config/routes/views",
            "Run migrations with --force",
          ],
          challenge: "Write a deploy script automating all steps.",
          summary:
            "Caching, debug-off, and forced migrations prepare production.",
        }),
        lesson({
          title: "Hosting Options",
          slug: "laravel-hosting",
          minutes: 15,
          objective: "Deploy to Forge, VPS, or shared hosting.",
          intro:
            "Laravel deploys to managed platforms (Forge, Vapor), VPS servers (DigitalOcean), or shared hosts with PHP + MySQL.",
          concepts: [
            "- Forge: server provisioning + deploy scripts.",
            "- VPS: Nginx + PHP-FPM + queue workers + cron.",
            "- Shared hosts: set document root to /public.",
          ],
          example: {
            lang: "nginx",
            code: "server {\n    listen 80;\n    server_name example.com;\n    root /var/www/app/public;\n\n    index index.php;\n\n    location / {\n        try_files $uri $uri/ /index.php?$query_string;\n    }\n\n    location ~ \\.php$ {\n        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;\n        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;\n        include fastcgi_params;\n    }\n}",
            output: "Nginx serving Laravel from the public directory.",
          },
          mistakes: [
            "Pointing the web root at the project root (exposes files).",
            "Forgetting queue workers and the scheduler cron.",
          ],
          bestPractices: [
            "Always document root to /public.",
            "Run the scheduler every minute for scheduled tasks.",
          ],
          exerciseTitle: "Deploy",
          exerciseDescription: "Deploy your app to a hosting environment of your choice.",
          exerciseRequirements: [
            "Set up Nginx or platform config",
            "Run migrations",
            "Verify https and .env",
          ],
          challenge: "Set up a queue worker process.",
          summary:
            "Host choice varies; the public-document-root and workers principles don't.",
        }),
      ],
    },
    {
      title: "Real World Project — Blog Platform",
      description: "Build a complete blog with auth and comments",
      lessons: [
        lesson({
          title: "Project Design",
          slug: "laravel-project-design",
          minutes: 30,
          objective: "Plan a blog platform: schema, routes, pages.",
          intro:
            "This final module builds a blog: posts with categories and tags, comments, author profiles, and a dashboard. Start with the data model.",
          concepts: [
            "- Entities: User, Post, Category, Tag, Comment.",
            "- Relations: posts belong to users, belongToMany tags.",
            "- Scopes: published(), latest().",
          ],
          example: {
            lang: "php",
            code: "Schema::create('posts', function (Blueprint $table) {\n    $table->id();\n    $table->foreignId('user_id')->constrained()->cascadeOnDelete();\n    $table->foreignId('category_id')->nullable()->constrained();\n    $table->string('title');\n    $table->string('slug')->unique();\n    $table->text('body');\n    $table->timestamp('published_at')->nullable();\n    $table->timestamps();\n});\n\nSchema::create('post_tag', function (Blueprint $table) {\n    $table->id();\n    $table->foreignId('post_id')->constrained()->cascadeOnDelete();\n    $table->foreignId('tag_id')->constrained()->cascadeOnDelete();\n    $table->unique(['post_id', 'tag_id']);\n});",
            output: "Posts with author, category, and a tag pivot.",
          },
          mistakes: [
            "Missing unique constraints on the pivot.",
            "No slug unique index.",
          ],
          bestPractices: [
            "Plan relations before writing pages.",
            "Add indexes on filter columns.",
          ],
          exerciseTitle: "Schema",
          exerciseDescription: "Create all migrations for the blog platform.",
          exerciseRequirements: [
            "5+ tables",
            "Pivot with unique constraint",
            "Foreign keys with cascade",
          ],
          challenge: "Add polymorphic comments (posts + projects).",
          summary:
            "A planned schema with constraints supports the whole feature set.",
        }),
        lesson({
          title: "Blog Features",
          slug: "laravel-project-features",
          minutes: 40,
          objective: "Build post CRUD, comments, and tag filters.",
          intro:
            "Implement the features: authors create posts, readers comment, and tags filter the index. Wire policies and Form Requests.",
          concepts: [
            "- PostController + PostPolicy + StorePostRequest.",
            "- Comment model with belongsTo Post.",
            "- Tag filter via whereHas('tags', ...).",
          ],
          example: {
            lang: "php",
            code: "public function index(Request $request)\n{\n    $query = Post::published()\n        ->with(['user', 'tags'])\n        ->latest('published_at');\n\n    if ($request->has('tag')) {\n        $query->whereHas('tags', fn ($q) => $q->where('slug', $request->tag));\n    }\n\n    $posts = $query->paginate(10);\n    return view('posts.index', compact('posts'));\n}\n\npublic function store(StorePostRequest $request)\n{\n    $post = $request->user()->posts()->create($request->validated());\n    $post->tags()->sync($request->input('tags', []));\n    return redirect()->route('posts.show', $post);\n}",
            output: "Filtered listing and safe creation with tag sync.",
          },
          mistakes: [
            "Forgetting to sync tags.",
            "No published filter on public listings.",
          ],
          bestPractices: [
            "Scope public queries to published posts.",
            "Eager load relations on listings.",
          ],
          exerciseTitle: "Blog Features",
          exerciseDescription: "Implement post CRUD, comments, and tag filtering.",
          exerciseRequirements: [
            "CRUD with policies",
            "Comment create with validation",
            "Tag filter on index",
          ],
          challenge: "Add a search box searching title + body.",
          summary:
            "Policies, scopes, and relations power the full blog.",
        }),
        lesson({
          title: "Polish & Ship",
          slug: "laravel-project-deploy",
          minutes: 30,
          objective: "Add dashboards, notifications, and deploy.",
          intro:
            "Finish with an author dashboard (their posts + stats), comment notifications, and a production deployment.",
          concepts: [
            "- Author dashboard scoped to auth()->user()->posts.",
            "- Notify post authors when someone comments.",
            "- Deploy with migrations and caches.",
          ],
          example: {
            lang: "php",
            code: "Route::middleware('auth')->group(function () {\n    Route::get('/dashboard', [DashboardController::class, 'index']);\n    Route::resource('posts', PostController::class);\n});\n\nclass CommentController extends Controller\n{\n    public function store(StoreCommentRequest $request, Post $post)\n    {\n        $comment = $post->comments()->create($request->validated() + [\n            'user_id' => auth()->id(),\n        ]);\n\n        $post->user->notify(new NewComment($comment));\n\n        return back()->with('success', 'Comment posted!');\n    }\n}",
            output: "Author dashboard and comment notifications.",
          },
          mistakes: [
            "Exposing all posts on the dashboard instead of the author's.",
            "Sending notifications synchronously without a queue.",
          ],
          bestPractices: [
            "Queue notifications.",
            "Test the full flow with feature tests.",
          ],
          exerciseTitle: "Ship the Blog",
          exerciseDescription: "Add the dashboard, notifications, and deploy the blog.",
          exerciseRequirements: [
            "Author-only dashboard",
            "Comment notification",
            "Production deployment",
          ],
          challenge: "Add scheduled digest emails for weekly posts.",
          summary:
            "Dashboards, notifications, and deployment complete the real-world project.",
        }),
      ],
    },
  ],
};