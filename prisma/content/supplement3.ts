import type { CourseContent } from "../seed-content";

function makeExtra(slug: string, modules: any[]): CourseContent {
  return { slug, modules };
}

// Python Advanced: 11 → needs 9 more
export const pyAdvExtra = makeExtra("python-advanced", [
  {
    title: "Web Development with FastAPI",
    description: "Modern Python web APIs",
    lessons: [
      { title: "FastAPI Basics", slug: "py-fastapi", content: "# FastAPI\n\n```python\nfrom fastapi import FastAPI, HTTPException\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\nclass User(BaseModel):\n    name: str\n    email: str\n    age: int\n\nusers: list[User] = []\n\n@app.get(\"/users\")\ndef list_users():\n    return users\n\n@app.post(\"/users\")\ndef create_user(user: User):\n    users.append(user)\n    return user\n\n@app.get(\"/users/{user_id}\")\ndef get_user(user_id: int):\n    if user_id >= len(users):\n        raise HTTPException(404, \"Not found\")\n    return users[user_id]\n```\n\nRun: `uvicorn main:app --reload`", estimatedMinutes: 25 },
      { title: "Database with SQLAlchemy", slug: "py-sqlalchemy", content: "# SQLAlchemy\n\n```python\nfrom sqlalchemy import create_engine, Column, Integer, String\nfrom sqlalchemy.orm import DeclarativeBase, Session\n\nengine = create_engine(\"sqlite:///app.db\")\n\nclass Base(DeclarativeBase): pass\n\nclass User(Base):\n    __tablename__ = \"users\"\n    id = Column(Integer, primary_key=True)\n    name = Column(String)\n    email = Column(String, unique=True)\n\nBase.metadata.create_all(engine)\n\nwith Session(engine) as session:\n    session.add(User(name=\"Alice\", email=\"a@b.com\"))\n    session.commit()\n    users = session.query(User).all()\n```", estimatedMinutes: 25 },
      { title: "Pytest Advanced", slug: "py-pytest-advanced", content: "# Advanced Pytest\n\n```python\nimport pytest\nfrom unittest.mock import Mock, patch\n\n# Mocking\ndef test_api_call():\n    with patch('myapp.api.requests.get') as mock_get:\n        mock_get.return_value.json.return_value = {'name': 'Alice'}\n        result = get_user(1)\n        assert result['name'] == 'Alice'\n        mock_get.assert_called_once()\n\n# Fixtures with scope\n@pytest.fixture(scope='module')\ndef db():\n    engine = create_engine('sqlite:///:memory:')\n    Base.metadata.create_all(engine)\n    yield Session(engine)\n\n# Conftest.py — shared fixtures\ndef pytest_configure(config):\n    config.addinivalue_line('markers', 'slow: slow tests')\n\n@pytest.mark.slow\ndef test_heavy_computation():\n    result = heavy_computation()\n    assert result == expected\n```", estimatedMinutes: 20 },
    ],
  },
]);

// Java: 17 → needs 3 more
export const javaExtra3 = makeExtra("java-basic", [
  {
    title: "Java 17+ Features",
    description: "Modern Java features",
    lessons: [
      { title: "Sealed Classes and Pattern Matching", slug: "java-sealed", content: "# Sealed Classes (Java 17)\n\n```java\npublic sealed interface Shape permits Circle, Rectangle, Triangle {}\n\npublic record Circle(double radius) implements Shape {}\npublic record Rectangle(double width, double height) implements Shape {}\npublic record Triangle(double base, double height) implements Shape {}\n\n// Pattern matching with switch (Java 21)\npublic static String describe(Shape shape) {\n    return switch (shape) {\n        case Circle c -> \"Circle with radius \" + c.radius();\n        case Rectangle r -> \"Rectangle \" + r.width() + \"x\" + r.height();\n        case Triangle t -> \"Triangle\";\n    };\n}\n```\n\n## Text Blocks\n\n```java\nString json = \"\"\"\n    {\n        \"name\": \"Alice\",\n        \"age\": 25\n    }\n    \"\"\";\n```\n\n## var in Lambda\n\n```java\nvar list = List.of(1, 2, 3);\nlist.stream().map((var x) -> x * 2).toList();\n```", estimatedMinutes: 25 },
    ],
  },
]);

// JavaScript: 18 → needs 2 more
export const jsExtra3 = makeExtra("javascript-basic", [
  {
    title: "Modern JavaScript",
    description: "ES2024+ features",
    lessons: [
      { title: "Structured Clone and Temporal API", slug: "js-modern-features", content: "# Modern JS Features\n\n## Structured Clone\n\n```javascript\nconst original = { name: 'Alice', date: new Date(), nested: { x: 1 } };\nconst clone = structuredClone(original);\nclone.nested.x = 99;\nconsole.log(original.nested.x); // 1 (deep cloned)\n```\n\n## Array.groupBy (ES2024)\n\n```javascript\nconst people = [\n  { name: 'Alice', age: 25 },\n  { name: 'Bob', age: 17 },\n  { name: 'Charlie', age: 30 }\n];\n\nconst grouped = Object.groupBy(people, p => p.age >= 18 ? 'adult' : 'minor');\n// { adult: [{name:'Alice'},{name:'Charlie'}], minor: [{name:'Bob'}] }\n```\n\n## Promise.withResolvers\n\n```javascript\nconst { promise, resolve, reject } = Promise.withResolvers();\n// Use resolve/reject externally\nsetTimeout(() => resolve('done'), 1000);\n```", estimatedMinutes: 20 },
      { title: "WeakRef and FinalizationRegistry", slug: "js-weakref", content: "# WeakRef\n\n```javascript\nlet user = { name: 'Alice' };\nconst ref = new WeakRef(user);\n\nuser = null; // eligible for GC\n\nconsole.log(deref()); // undefined or object\n```\n\n## FinalizationRegistry\n\n```javascript\nconst registry = new FinalizationRegistry((heldValue) => {\n    console.log(`Object ${heldValue} was garbage collected`);\n});\n\nlet obj = { data: 'important' };\nregistry.register(obj, 'my-object');\nobj = null; // will trigger callback when GC'd\n```\n\n## Atomics and SharedArrayBuffer\n\n```javascript\nconst buffer = new SharedArrayBuffer(1024);\nconst view = new Int32Array(buffer);\nAtomics.add(view, 0, 5);  // atomic operation\nAtomics.load(view, 0);     // 5\n```", estimatedMinutes: 20 },
    ],
  },
]);

// React: 17 → needs 3 more
export const reactExtra3 = makeExtra("react-basic", [
  {
    title: "React Patterns",
    description: "Common patterns and best practices",
    lessons: [
      { title: "Compound Components", slug: "react-compound", content: "# Compound Components\n\n```jsx\nfunction Tabs({ children, defaultTab }) {\n    const [activeTab, setActiveTab] = useState(defaultTab);\n    return (\n        <TabContext.Provider value={{ activeTab, setActiveTab }}>\n            {children}\n        </TabContext.Provider>\n    );\n}\n\nTabs.Panel = function TabPanel({ id, children }) {\n    const { activeTab } = useContext(TabContext);\n    if (activeTab !== id) return null;\n    return <div>{children}</div>;\n};\n\nTabs.Button = function TabButton({ id, children }) {\n    const { activeTab, setActiveTab } = useContext(TabContext);\n    return (\n        <button className={activeTab === id ? 'active' : ''}\n                onClick={() => setActiveTab(id)}>\n            {children}\n        </button>\n    );\n};\n\n// Usage\n<Tabs defaultTab=\"home\">\n    <Tabs.Button id=\"home\">Home</Tabs.Button>\n    <Tabs.Button id=\"about\">About</Tabs.Button>\n    <Tabs.Panel id=\"home\"><HomeContent /></Tabs.Panel>\n    <Tabs.Panel id=\"about\"><AboutContent /></Tabs.Panel>\n</Tabs>\n```", estimatedMinutes: 25 },
      { title: "Render Props Pattern", slug: "react-render-props", content: "# Render Props\n\n```jsx\nfunction MouseTracker({ render }) {\n    const [position, setPosition] = useState({ x: 0, y: 0 });\n\n    useEffect(() => {\n        const handler = (e) => setPosition({ x: e.clientX, y: e.clientY });\n        window.addEventListener('mousemove', handler);\n        return () => window.removeEventListener('mousemove', handler);\n    }, []);\n\n    return render(position);\n}\n\n// Usage\n<MouseTracker render={({ x, y }) => (\n    <div>Mouse: {x}, {y}</div>\n)} />\n```", estimatedMinutes: 20 },
      { title: "React Portals", slug: "react-portals", content: "# Portals\n\n```jsx\nimport { createPortal } from 'react-dom';\n\nfunction Modal({ children, onClose }) {\n    return createPortal(\n        <div className=\"modal-overlay\" onClick={onClose}>\n            <div className=\"modal\" onClick={e => e.stopPropagation()}>\n                {children}\n                <button onClick={onClose}>Close</button>\n            </div>\n        </div>,\n        document.body  // Render outside parent DOM tree\n    );\n}\n\n// Usage\nfunction App() {\n    const [showModal, setShowModal] = useState(false);\n    return (\n        <div>\n            <button onClick={() => setShowModal(true)}>Open Modal</button>\n            {showModal && (\n                <Modal onClose={() => setShowModal(false)}>\n                    <h2>Hello!</h2>\n                </Modal>\n            )}\n        </div>\n    );\n}\n```", estimatedMinutes: 20 },
    ],
  },
]);

// PHP: 17 → needs 3 more
export const phpExtra3 = makeExtra("php-basic", [
  {
    title: "Security and Best Practices",
    description: "Secure coding practices",
    lessons: [
      { title: "Security Best Practices", slug: "php-security", content: "# Security\n\n## SQL Injection Prevention\n\n```php\n// NEVER\necho \"SELECT * FROM users WHERE id = \" . $_GET['id'];\n\n// ALWAYS use prepared statements\n$stmt = $pdo->prepare(\"SELECT * FROM users WHERE id = :id\");\n$stmt->execute(['id' => $_GET['id']]);\n```\n\n## XSS Prevention\n\n```php\n// NEVER echo raw user input\necho $_GET['name'];\n\n// ALWAYS escape\necho htmlspecialchars($_GET['name'], ENT_QUOTES, 'UTF-8');\n```\n\n## CSRF Protection\n\n```php\n// Generate token\nsession_start();\n$_SESSION['csrf_token'] = bin2hex(random_bytes(32));\n\n// In form\n<input type=\"hidden\" name=\"csrf_token\" value=\"<?= $_SESSION['csrf_token'] ?>\">\n\n// Validate\nif ($_POST['csrf_token'] !== $_SESSION['csrf_token']) {\n    die('Invalid CSRF token');\n}\n```", estimatedMinutes: 25 },
      { title: "Password Hashing", slug: "php-password-security", content: "# Password Security\n\n```php\n// Hash password\n$hash = password_hash($password, PASSWORD_DEFAULT);\n// cost factor\n$hash = password_hash($password, PASSWORD_DEFAULT, ['cost' => 12]);\n\n// Verify password\nif (password_verify($input, $hash)) {\n    // Login successful\n}\n\n// Check if needs rehash\nif (password_needs_rehash($hash, PASSWORD_DEFAULT)) {\n    $newHash = password_hash($input, PASSWORD_DEFAULT);\n    // Update in database\n}\n```\n\n## Password Policy\n\n```php\nfunction validatePassword($password): array {\n    $errors = [];\n    if (strlen($password) < 8) $errors[] = 'Min 8 characters';\n    if (!preg_match('/[A-Z]/', $password)) $errors[] = 'Need uppercase';\n    if (!preg_match('/[a-z]/', $password)) $errors[] = 'Need lowercase';\n    if (!preg_match('/[0-9]/', $password)) $errors[] = 'Need number';\n    return $errors;\n}\n```", estimatedMinutes: 20 },
      { title: "Rate Limiting", slug: "php-rate-limiting", content: "# Rate Limiting\n\n```php\nfunction rateLimit($key, $maxAttempts, $windowSeconds) {\n    $redis = new Redis();\n    $redis->connect();\n\n    $now = time();\n    $windowStart = $now - $windowSeconds;\n\n    // Remove old entries\n    $redis->zRemRangeByScore($key, 0, $windowStart);\n\n    // Count current requests\n    $count = $redis->zCard($key);\n\n    if ($count >= $maxAttempts) {\n        throw new Exception('Rate limit exceeded');\n    }\n\n    // Add current request\n    $redis->zAdd($key, $now, $now . mt_rand());\n    $redis->expire($key, $windowSeconds);\n}\n\n// Usage\ntry {\n    rateLimit('login:' . $_SERVER['REMOTE_ADDR'], 5, 300);\n    // Process login\n} catch (Exception $e) {\n    http_response_code(429);\n    echo 'Too many attempts. Try again later.';\n}\n```", estimatedMinutes: 20 },
    ],
  },
]);

// Laravel: 16 → needs 4 more
export const laravelExtra3 = makeExtra("laravel-basic", [
  {
    title: "Advanced Features",
    description: "Policies, notifications, and more",
    lessons: [
      { title: "Policies and Gates", slug: "laravel-policies", content: "# Authorization\n\n```bash\nphp artisan make:policy PostPolicy --model=Post\n```\n\n```php\n// app/Policies/PostPolicy.php\nclass PostPolicy {\n    public function update(User $user, Post $post) {\n        return $user->id === $post->user_id;\n    }\n\n    public function delete(User $user, Post $post) {\n        return $user->id === $post->user_id || $user->role === 'ADMIN';\n    }\n}\n\n// Usage in controller\npublic function update(Request $request, Post $post) {\n    $this->authorize('update', $post);\n    // ...\n}\n\n// Blade\n@can('update', $post)\n    <button>Edit</button>\n@endcan\n```", estimatedMinutes: 25 },
      { title: "Notifications", slug: "laravel-notifications", content: "# Notifications\n\n```bash\nphp artisan make:notification OrderShipped\n```\n\n```php\nclass OrderShipped extends Notification {\n    public function __construct(private Order $order) {}\n\n    public function via($notifiable) {\n        return ['mail', 'database'];\n    }\n\n    public function toMail($notifiable) {\n        return (new MailMessage)\n            ->subject('Order Shipped')\n            ->line('Your order has been shipped!')\n            ->action('View Order', url('/orders/' . $this->order->id));\n    }\n\n    public function toArray($notifiable) {\n        return ['order_id' => $this->order->id];\n    }\n}\n\n// Send\n$user->notify(new OrderShipped($order));\n```", estimatedMinutes: 25 },
      { title: "Localization", slug: "laravel-localization", content: "# Localization\n\n```php\n// resources/lang/en/messages.php\nreturn [\n    'welcome' => 'Welcome to our application!',\n    'login' => 'Please login',\n];\n\n// resources/lang/th/messages.php\nreturn [\n    'welcome' => 'ยินดีต้อนรับ!',\n    'login' => 'กรุณาเข้าสู่ระบบ',\n];\n\n// Usage\nreturn __('messages.welcome');\nreturn __('messages.login');\n\n// Blade\n{{ __('messages.welcome') }}\n```", estimatedMinutes: 20 },
      { title: "Task Scheduling", slug: "laravel-scheduling", content: "# Task Scheduling\n\n```php\n// app/Console/Kernel.php\nprotected function schedule(Schedule $schedule) {\n    $schedule->command('posts:delete-old')\n             ->daily()\n             ->at('02:00');\n\n    $schedule->command('reports:generate')\n             ->weeklyOn(1, '8:00');\n\n    $schedule->call(function () {\n        DB::table('sessions')\n          ->where('last_activity', '<', now()->subHours(24))\n          ->delete();\n    })->hourly();\n}\n```\n\n```bash\n# In crontab:\n* * * * * cd /path-to-project && php artisan schedule:run >> /dev/null 2>&1\n```", estimatedMinutes: 20 },
    ],
  },
]);

// Next.js: 15 → needs 5 more
export const nextjsExtra3 = makeExtra("nextjs-basic", [
  {
    title: "Production Features",
    description: "Caching, ISR, and deployment",
    lessons: [
      { title: "Caching and ISR", slug: "nextjs-caching", content: "# Caching\n\n```tsx\n// Static (cached)\nasync function getStaticData() {\n    const data = await fetch('https://api.example.com/data', {\n        next: { revalidate: 3600 }  // ISR: revalidate every hour\n    });\n    return data.json();\n}\n\n// Dynamic (no cache)\nasync function getDynamicData() {\n    const data = await fetch('https://api.example.com/data', {\n        cache: 'no-store'\n    });\n    return data.json();\n}\n\n// Force revalidation\nimport { revalidatePath, revalidateTag } from 'next/cache';\nrevalidatePath('/posts');\nrevalidateTag('posts');\n```", estimatedMinutes: 20 },
      { title: "Forms and Server Actions", slug: "nextjs-forms", content: "# Forms with Server Actions\n\n```tsx\n'use client';\n\nimport { useActionState } from 'react';\nimport { createPost } from './actions';\n\nexport default function PostForm() {\n    const [state, formAction, isPending] = useActionState(createPost, null);\n\n    return (\n        <form action={formAction}>\n            <input name=\"title\" required />\n            <textarea name=\"body\" required />\n            <button type=\"submit\" disabled={isPending}>\n                {isPending ? 'Creating...' : 'Create Post'}\n            </button>\n            {state?.error && <p className=\"text-red-500\">{state.error}</p>}\n        </form>\n    );\n}\n```\n\n```tsx\n// actions.ts\n'use server';\n\nimport { revalidatePath } from 'next/cache';\n\nexport async function createPost(prev, formData) {\n    const title = formData.get('title');\n    const body = formData.get('body');\n\n    if (!title) return { error: 'Title required' };\n\n    await db.post.create({ data: { title, body } });\n    revalidatePath('/posts');\n    redirect('/posts');\n}\n```", estimatedMinutes: 25 },
      { title: "Middleware Advanced", slug: "nextjs-middleware-advanced", content: "# Advanced Middleware\n\n```ts\n// middleware.ts\nimport { NextResponse } from 'next/server';\nimport type { NextRequest } from 'next/server';\n\nexport function middleware(request: NextRequest) {\n    const token = request.cookies.get('session')?.value;\n    const { pathname } = request.nextUrl;\n\n    // Protected routes\n    const protectedRoutes = ['/dashboard', '/profile', '/admin'];\n    const isProtected = protectedRoutes.some(p => pathname.startsWith(p));\n\n    if (isProtected && !token) {\n        const url = new URL('/login', request.url);\n        url.searchParams.set('redirect', pathname);\n        return NextResponse.redirect(url);\n    }\n\n    // Admin only\n    if (pathname.startsWith('/admin')) {\n        // Verify admin role from token\n    }\n\n    // Add custom headers\n    const response = NextResponse.next();\n    response.headers.set('x-pathname', pathname);\n    return response;\n}\n\nexport const config = {\n    matcher: ['/dashboard/:path*', '/profile/:path*', '/admin/:path*']\n};\n```", estimatedMinutes: 20 },
    ],
  },
]);

// Node.js: 14 → needs 6 more
export const nodejsExtra3 = makeExtra("nodejs-basic", [
  {
    title: "Production Ready",
    description: "Testing, logging, and deployment",
    lessons: [
      { title: "Testing with Jest", slug: "node-testing", content: "# Testing\n\n```javascript\n// user.test.js\nconst request = require('supertest');\nconst app = require('./app');\n\ndescribe('Users API', () => {\n    test('GET /users returns list', async () => {\n        const res = await request(app).get('/users');\n        expect(res.statusCode).toBe(200);\n        expect(Array.isArray(res.body)).toBe(true);\n    });\n\n    test('POST /users creates user', async () => {\n        const res = await request(app)\n            .post('/users')\n            .send({ name: 'Alice', email: 'alice@test.com' });\n        expect(res.statusCode).toBe(201);\n        expect(res.body.name).toBe('Alice');\n    });\n\n    test('GET /users/:id returns 404 for missing', async () => {\n        const res = await request(app).get('/users/999');\n        expect(res.statusCode).toBe(404);\n    });\n});\n```\n\n```bash\nnpx jest\nnpx jest --coverage\n```", estimatedMinutes: 25 },
      { title: "Logging with Winston", slug: "node-logging", content: "# Logging\n\n```javascript\nconst winston = require('winston');\n\nconst logger = winston.createLogger({\n    level: 'info',\n    format: winston.format.combine(\n        winston.format.timestamp(),\n        winston.format.json()\n    ),\n    transports: [\n        new winston.transports.File({ filename: 'error.log', level: 'error' }),\n        new winston.transports.File({ filename: 'combined.log' }),\n    ],\n});\n\nif (process.env.NODE_ENV !== 'production') {\n    logger.add(new winston.transports.Console({\n        format: winston.format.simple()\n    }));\n}\n\n// Usage\nlogger.info('Server started', { port: 3000 });\nlogger.error('Database error', { error: err.message });\n```", estimatedMinutes: 20 },
      { title: "Rate Limiting", slug: "node-rate-limiting", content: "# Rate Limiting\n\n```javascript\nconst rateLimit = require('express-rate-limit');\n\nconst limiter = rateLimit({\n    windowMs: 15 * 60 * 1000, // 15 minutes\n    max: 100, // limit each IP to 100 requests per windowMs\n    message: 'Too many requests',\n});\n\napp.use(limiter);\n\n// Stricter for auth routes\nconst authLimiter = rateLimit({\n    windowMs: 60 * 60 * 1000, // 1 hour\n    max: 5, // 5 attempts per hour\n    message: 'Too many login attempts',\n});\n\napp.use('/api/login', authLimiter);\napp.use('/api/register', authLimiter);\n```", estimatedMinutes: 20 },
    ],
  },
]);

// Vue: 15 → needs 5 more
export const vueExtra3 = makeExtra("vue-basic", [
  {
    title: "Testing and Production",
    description: "Unit tests and deployment",
    lessons: [
      { title: "Unit Testing with Vitest", slug: "vue-unit-testing", content: "# Vitest\n\n```javascript\nimport { describe, it, expect, vi } from 'vitest';\nimport { mount } from '@vue/test-utils';\nimport Counter from './Counter.vue';\n\ndescribe('Counter', () => {\n    it('renders initial count', () => {\n        const wrapper = mount(Counter, { props: { initial: 5 } });\n        expect(wrapper.text()).toContain('5');\n    });\n\n    it('increments on click', async () => {\n        const wrapper = mount(Counter);\n        await wrapper.find('button').trigger('click');\n        expect(wrapper.text()).toContain('1');\n    });\n});\n```", estimatedMinutes: 20 },
      { title: "E2E Testing with Playwright", slug: "vue-e2e", content: "# Playwright\n\n```javascript\nimport { test, expect } from '@playwright/test';\n\ntest('login flow', async ({ page }) => {\n    await page.goto('/login');\n    await page.fill('input[name=\"email\"]', 'test@test.com');\n    await page.fill('input[name=\"password\"]', 'password123');\n    await page.click('button[type=\"submit\"]');\n    await expect(page).toHaveURL('/dashboard');\n});\n```\n\n```bash\nnpx playwright install\nnpx playwright test\n```", estimatedMinutes: 20 },
      { title: "Deployment Checklist", slug: "vue-deployment-checklist", content: "# Production Checklist\n\n```bash\n# Build\nnpm run build\n\n# Analyze bundle\nnpx vite-bundle-visualizer\n```\n\n## Checklist\n- [ ] Environment variables set\n- [ ] API URLs configured for production\n- [ ] Error tracking (Sentry) setup\n- [ ] Lighthouse score > 90\n- [ ] Images optimized\n- [ ] Lazy loading implemented\n- [ ] Meta tags configured\n- [ ] PWA (if needed)\n- [ ] SSL/HTTPS enabled\n- [ ] CDN configured\n- [ ] Gzip/Brotli compression\n- [ ] Security headers set", estimatedMinutes: 15 },
    ],
  },
]);

// Nuxt: 12 → needs 8 more
export const nuxtExtra3 = makeExtra("nuxtjs-basic", [
  {
    title: "Testing and Deployment",
    description: "Unit tests, E2E tests, and deployment",
    lessons: [
      { title: "Unit Testing", slug: "nuxt-testing", content: "# Nuxt Testing\n\n```javascript\n// vitest.config.ts\nimport { defineVitestConfig } from 'nuxt-vitest/config';\n\nexport default defineVitestConfig({});\n\n// composables/useCounter.test.ts\nimport { describe, it, expect } from 'vitest';\nimport { useCounter } from './useCounter';\n\ndescribe('useCounter', () => {\n    it('increments count', () => {\n        const { count, increment } = useCounter();\n        increment();\n        expect(count.value).toBe(1);\n    });\n});\n```", estimatedMinutes: 20 },
      { title: "Component Testing", slug: "nuxt-component-testing", content: "# Component Testing\n\n```javascript\nimport { describe, it, expect } from 'vitest';\nimport { mountSuspended } from '@nuxt/test-utils/runtime';\nimport MyComponent from './MyComponent.vue';\n\ndescribe('MyComponent', () => {\n    it('renders correctly', async () => {\n        const wrapper = await mountSuspended(MyComponent, {\n            props: { title: 'Hello' }\n        });\n        expect(wrapper.text()).toContain('Hello');\n    });\n});\n```", estimatedMinutes: 20 },
      { title: "Production Deployment", slug: "nuxt-production", content: "# Production Deployment\n\n```bash\n# Build\nnpm run build\n\n# Preview\nnpm run preview\n\n# Generate static site\nnpx nuxi generate\n```\n\n## Vercel\n\n```bash\nnpm i -g vercel\nvercel --prod\n```\n\n## Netlify\n\nBuild command: `npm run build`\nOutput: `.output/public`\n\n## Docker\n\n```dockerfile\nFROM node:20-alpine\nWORKDIR /app\nCOPY . .\nRUN npm ci && npm run build\nEXPOSE 3000\nCMD node .output/server/index.mjs\n```\n\n## Environment\n\n```bash\n# .env.production\nDATABASE_URL=...\nSECRET=...\nNUXT_PUBLIC_API_URL=https://api.myapp.com\n```", estimatedMinutes: 20 },
    ],
  },
]);

// Rust: 17 → needs 3 more
export const rustExtra3 = makeExtra("rust-basic", [
  {
    title: "Practical Rust",
    description: "Real-world Rust applications",
    lessons: [
      { title: "Building a CLI Tool", slug: "rust-cli", content: "# CLI with clap\n\n```rust\nuse clap::Parser;\n\n#[derive(Parser)]\nstruct Cli {\n    #[arg(short, long)]\n    pattern: String,\n\n    #[arg(short, long, default_value = \".\")]\n    path: std::path::PathBuf,\n}\n\nfn main() {\n    let args = Cli::parse();\n    println!(\"Searching for '{}' in {}\", args.pattern, args.path.display());\n}\n```\n\n```toml\n[dependencies]\nclap = { version = \"4\", features = [\"derive\"] }\n```", estimatedMinutes: 20 },
      { title: "Web Scraping with reqwest", slug: "rust-scraping", content: "# Web Scraping\n\n```rust\nuse reqwest;\nuse scraper::{Html, Selector};\n\n#[tokio::main]\nasync fn main() -> Result<(), Box<dyn std::error::Error>> {\n    let html = reqwest::get(\"https://example.com\")\n        .await?\n        .text()\n        .await?;\n\n    let document = Html::parse_document(&html);\n    let selector = Selector::parse(\"h1\").unwrap();\n\n    for element in document.select(&selector) {\n        println!(\"{}\", element.text().collect::<String>());\n    }\n\n    Ok(())\n}\n```", estimatedMinutes: 25 },
      { title: "Error Handling Patterns", slug: "rust-error-final", content: "# Error Handling in Practice\n\n```rust\nuse thiserror::Error;\nuse anyhow::Result;\n\n#[derive(Error, Debug)]\nenum AppError {\n    #[error(\"Not found: {0}\")]\n    NotFound(String),\n\n    #[error(\"Database error\")]\n    Db(#[from] sqlx::Error),\n\n    #[error(\"Unauthorized\")]\n    Unauthorized,\n}\n\nfn get_user(id: i32) -> Result<User, AppError> {\n    let user = sqlx::query_as!(User, \"SELECT * FROM users WHERE id = $1\", id)\n        .fetch_optional(&pool)\n        .await?;\n\n    user.ok_or(AppError::NotFound(format!(\"User {}\", id)))\n}\n```", estimatedMinutes: 20 },
    ],
  },
]);

// C#: 14 → needs 6 more
export const csharpExtra3 = makeExtra("csharp-basic", [
  {
    title: "Advanced Topics",
    description: "Multithreading, signals, and more",
    lessons: [
      { title: "Multithreading", slug: "csharp-threading", content: "# Multithreading\n\n```csharp\n// Task\nvar task = Task.Run(() => {\n    Console.WriteLine($\"Running on thread {Thread.CurrentThread.ManagedThreadId}\");\n    return 42;\n});\nint result = await task;\n\n// Parallel\nParallel.For(0, 100, i => {\n    Console.WriteLine($\"Processing {i}\");\n});\n\n// CancellationToken\nvar cts = new CancellationTokenSource();\nvar task = Task.Run(async () => {\n    while (!cts.Token.IsCancellationRequested) {\n        Console.WriteLine(\"Working...\");\n        await Task.Delay(1000, cts.Token);\n    }\n}, cts.Token);\n\ncts.CancelAfter(5000); // Stop after 5 seconds\n```", estimatedMinutes: 25 },
      { title: "SignalR Real-time", slug: "csharp-signalr", content: "# SignalR\n\n```csharp\n// Hub\npublic class ChatHub : Hub {\n    public async Task SendMessage(string user, string message) {\n        await Clients.All.SendAsync(\"ReceiveMessage\", user, message);\n    }\n}\n\n// Register\nbuilder.Services.AddSignalR();\napp.MapHub<ChatHub>(\"/chathub\");\n```\n\n```javascript\n// Client\nimport * as signalR from '@microsoft/signalr';\nconst connection = new signalR.HubConnectionBuilder()\n    .withUrl('/chathub')\n    .build();\n\nconnection.on('ReceiveMessage', (user, message) => {\n    console.log(`${user}: ${message}`);\n});\n\nawait connection.start();\nawait connection.invoke('SendMessage', 'Alice', 'Hello!');\n```", estimatedMinutes: 25 },
      { title: "Application Configuration", slug: "csharp-config", content: "# Configuration\n\n```csharp\n// appsettings.json\n{\n    \"ConnectionStrings\": {\n        \"Default\": \"Server=...\"\n    },\n    \"Jwt\": {\n        \"Key\": \"secret-key\",\n        \"Issuer\": \"myapp\"\n    }\n}\n\n// Read\nvar builder = WebApplication.CreateBuilder(args);\nvar connectionString = builder.Configuration.GetConnectionString(\"Default\");\nvar jwtKey = builder.Configuration[\"Jwt:Key\"];\n\n// Options pattern\nbuilder.Services.Configure<JwtSettings>(\n    builder.Configuration.GetSection(\"Jwt\")\n);\n\n// Use\npublic class AuthService {\n    private readonly JwtSettings _jwtSettings;\n    public AuthService(IOptions<JwtSettings> options) {\n        _jwtSettings = options.Value;\n    }\n}\n```", estimatedMinutes: 20 },
    ],
  },
]);

// Flutter: 12 → needs 8 more
export const flutterExtra3 = makeExtra("flutter-basic", [
  {
    title: "Advanced Topics",
    description: "Navigation, dependency injection, and more",
    lessons: [
      { title: "Advanced Navigation", slug: "flutter-nav-advanced", content: "# Named Routes\n\n```dart\nMaterialApp(\n  initialRoute: '/',\n  routes: {\n    '/': (ctx) => HomeScreen(),\n    '/login': (ctx) => LoginScreen(),\n    '/profile': (ctx) => ProfileScreen(),\n  },\n);\n\nNavigator.pushNamed(context, '/profile');\n\n// With arguments\nNavigator.pushNamed(context, '/user', arguments: {'id': 123});\n\n// Receive arguments\nclass UserScreen extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    final args = ModalRoute.of(context)!.settings.arguments as Map;\n    return Text('User ${args[\"id\"]}');\n  }\n}\n```", estimatedMinutes: 20 },
      { title: "Theme and Styling", slug: "flutter-theme", content: "# Theming\n\n```dart\nMaterialApp(\n  theme: ThemeData(\n    primarySwatch: Colors.blue,\n    brightness: Brightness.light,\n    appBarTheme: AppBarTheme(backgroundColor: Colors.white),\n  ),\n  darkTheme: ThemeData(\n    brightness: Brightness.dark,\n    primarySwatch: Colors.blue,\n  ),\n  themeMode: ThemeMode.system,\n);\n\n// Use in widgets\nfinal theme = Theme.of(context);\ntextStyle: theme.textTheme.headlineMedium,\ncolor: theme.colorScheme.primary,\n```", estimatedMinutes: 20 },
      { title: "Internationalization", slug: "flutter-i18n", content: "# Localization\n\n```dart\n// l10n/app_en.arb\n{\n  \"hello\": \"Hello\",\n  \"greeting\": \"Hello, {name}!\"\n}\n\n// l10n/app_th.arb\n{\n  \"hello\": \"สวัสดี\",\n  \"greeting\": \"สวัสดี, {name}!\"\n}\n\n// Usage\nAppLocalizations.of(context)!.hello\nAppLocalizations.of(context)!.greeting('Alice')\n```", estimatedMinutes: 15 },
    ],
  },
]);

// React Native: 12 → needs 8 more
export const rnExtra3 = makeExtra("react-native-basic", [
  {
    title: "Advanced Topics",
    description: "Native modules, deep linking, and more",
    lessons: [
      { title: "Deep Linking", slug: "rn-deeplinking", content: "# Deep Linking\n\n```json\n// app.json\n{\n  \"expo\": {\n    \"scheme\": \"myapp\"\n  }\n}\n```\n\n```jsx\n// Handle deep link\nimport { Linking } from 'react-native';\n\nuseEffect(() => {\n    const handleUrl = ({ url }) => {\n        const params = new URL(url).searchParams;\n        const token = params.get('token');\n        if (token) loginWithToken(token);\n    };\n\n    Linking.addEventListener('url', handleUrl);\n    Linking.getInitialURL().then(handleUrl);\n\n    return () => Linking.removeAllListeners('url');\n}, []);\n```", estimatedMinutes: 20 },
      { title: "Biometrics Authentication", slug: "rn-biometrics", content: "# Biometrics\n\n```jsx\nimport * as LocalAuthentication from 'expo-local-authentication';\n\nasync function authenticate() {\n    const hasHardware = await LocalAuthentication.hasHardwareAsync();\n    if (!hasHardware) return false;\n\n    const result = await LocalAuthentication.authenticateAsync({\n        promptMessage: 'Login with Face ID',\n        cancelLabel: 'Cancel',\n    });\n\n    return result.success;\n}\n```", estimatedMinutes: 15 },
      { title: "Background Tasks", slug: "rn-background", content: "# Background Tasks\n\n```jsx\nimport * as BackgroundFetch from 'expo-background-fetch';\nimport * as TaskManager from 'expo-task-manager';\n\nconst TASK_NAME = 'BACKGROUND_SYNC';\n\nTaskManager.defineTask(TASK_NAME, async () => {\n    try {\n        await syncData();\n        return BackgroundFetch.BackgroundFetchResult.NewData;\n    } catch {\n        return BackgroundFetch.BackgroundFetchResult.Failed;\n    }\n});\n\nawait BackgroundFetch.registerTaskAsync(TASK_NAME, {\n    minimumInterval: 15 * 60, // 15 minutes\n    stopOnTerminate: false,\n    startOnBoot: true,\n});\n```", estimatedMinutes: 20 },
    ],
  },
]);

// Flask: 12 → needs 8 more
export const flaskExtra3 = makeExtra("flask-basic", [
  {
    title: "Production and Advanced",
    description: "Production deployment and advanced features",
    lessons: [
      { title: "Application Factory Pattern", slug: "flask-factory", content: "# Factory Pattern\n\n```python\n# app/__init__.py\nfrom flask import Flask\n\ndef create_app(config_name='default'):\n    app = Flask(__name__)\n    app.config.from_object(config[config_name])\n\n    db.init_app(app)\n    login_manager.init_app(app)\n\n    from app.main import main_bp\n    from app.auth import auth_bp\n    app.register_blueprint(main_bp)\n    app.register_blueprint(auth_bp)\n\n    return app\n```\n\n## Testing\n\n```python\n@pytest.fixture\ndef app():\n    app = create_app('testing')\n    with app.app_context():\n        db.create_all()\n        yield app\n        db.drop_all()\n```", estimatedMinutes: 25 },
      { title: "File Uploads", slug: "flask-uploads", content: "# File Uploads\n\n```python\nfrom werkzeug.utils import secure_filename\nimport os\n\nUPLOAD_FOLDER = 'uploads'\nALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'pdf'}\n\ndef allowed_file(filename):\n    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS\n\n@app.route('/upload', methods=['POST'])\ndef upload_file():\n    if 'file' not in request.files:\n        return 'No file', 400\n\n    file = request.files['file']\n    if file.filename == '':\n        return 'No file selected', 400\n\n    if file and allowed_file(file.filename):\n        filename = secure_filename(file.filename)\n        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))\n        return {'filename': filename}, 201\n```", estimatedMinutes: 20 },
      { title: "Production Checklist", slug: "flask-production", content: "# Production\n\n## Gunicorn\n\n```bash\ngunicorn -w 4 -b 0.0.0.0:5000 --access-logfile - app:app\n```\n\n## Nginx Config\n\n```nginx\nserver {\n    listen 80;\n    server_name example.com;\n\n    location / {\n        proxy_pass http://127.0.0.1:5000;\n        proxy_set_header Host $host;\n        proxy_set_header X-Real-IP $remote_addr;\n    }\n\n    location /static {\n        alias /var/www/static;\n    }\n}\n```\n\n## Checklist\n- [ ] DEBUG=False\n- [ ] SECRET_KEY from env\n- [ ] Database connection pooling\n- [ ] Error monitoring\n- [ ] HTTPS\n- [ ] Rate limiting\n- [ ] Input validation", estimatedMinutes: 20 },
    ],
  },
]);

// Django: 14 → needs 6 more
export const djangoExtra3 = makeExtra("django-basic", [
  {
    title: "Advanced Features",
    description: "Signals, caching, middleware, and more",
    lessons: [
      { title: "Internationalization (i18n)", slug: "django-i18n", content: "# Internationalization\n\n```python\n# settings.py\nLANGUAGE_CODE = 'en-us'\nUSE_I18N = True\nLANGUAGES = [\n    ('en', 'English'),\n    ('th', 'Thai'),\n]\n\n# In templates\n{% load i18n %}\n{% trans \"Hello\" %}\n\n# In Python\nfrom django.utils.translation import gettext as _\nmessage = _('Welcome to our site')\n\n# URL prefix\n# /en/dashboard/\n# /th/dashboard/\n```", estimatedMinutes: 20 },
      { title: "Custom Template Tags", slug: "django-template-tags", content: "# Custom Template Tags\n\n```python\n# myapp/templatetags/blog_tags.py\nfrom django import template\nfrom myapp.models import Post\n\nregister = template.Library()\n\n@register.simple_tag\ndef total_posts():\n    return Post.objects.filter(published=True).count()\n\n@register.inclusion_tag('blog/latest_posts.html')\ndef show_latest_posts(count=5):\n    posts = Post.objects.order_by('-created_at')[:count]\n    return {'posts': posts}\n```\n\n```html\n{% load blog_tags %}\n<p>Total posts: {% total_posts %}</p>\n{% show_latest_posts 3 %}\n```", estimatedMinutes: 20 },
      { title: "Aggregation and Annotations", slug: "django-aggregation", content: "# Aggregation\n\n```python\nfrom django.db.models import Count, Avg, Sum, Max, Min\n\n# Count posts per user\nstats = User.objects.annotate(\n    post_count=Count('post')\n).order_by('-post_count')\n\n# Average score\navg_score = Review.objects.aggregate(Avg('score'))\n# {'score__avg': 4.5}\n\n# Total revenue\ntotal = Order.objects.aggregate(total=Sum('amount'))\n# {'total': 12345.67}\n\n# Group by\nfrom django.db.models.functions import TruncMonth\nmonthly = Order.objects.annotate(\n    month=TruncMonth('created_at')\n).values('month').annotate(\n    total=Sum('amount')\n).order_by('month')\n```", estimatedMinutes: 25 },
    ],
  },
]);

export const allSupplements3: CourseContent[] = [
  pyAdvExtra, javaExtra3, jsExtra3, reactExtra3, phpExtra3,
  laravelExtra3, nextjsExtra3, nodejsExtra3, vueExtra3,
  nuxtExtra3, rustExtra3, csharpExtra3, flutterExtra3,
  rnExtra3, flaskExtra3, djangoExtra3,
];
