import type { CourseContent } from "../seed-content";
import { lesson } from "./lesson-builder";

export const nextjsBasic20Modules: CourseContent = {
  slug: "nextjs-basic",
  modules: [
    {
      title: "Introduction to Next.js",
      description: "What Next.js is and how to set it up",
      lessons: [
        lesson({
          title: "What is Next.js?",
          slug: "nextjs-what-is",
          minutes: 12,
          objective: "Understand Next.js and the App Router model.",
          intro:
            "Next.js is the React framework for production. It adds file-based routing, server rendering, API routes, and build optimizations on top of React.",
          concepts: [
            "- **App Router**: the modern routing system using the app/ folder.",
            "- **Server-first**: components render on the server by default.",
            "- **Full-stack**: pages, APIs, and server actions in one project.",
            "- **Optimized**: automatic code splitting, image optimization, caching.",
          ],
          example: {
            lang: "tsx",
            code: "// app/page.tsx — the home route\nexport default function Home() {\n  return <h1>Hello, Next.js!</h1>;\n}",
            output: "Running npm run dev serves this page at http://localhost:3000.",
          },
          mistakes: [
            "Confusing the old pages/ router with the app/ router APIs.",
            "Making every component a client component — the server is the default.",
          ],
          bestPractices: [
            "Start with the App Router — it is the recommended, modern approach.",
            "Read the official docs — Next.js changes quickly.",
          ],
          exerciseTitle: "First Page",
          exerciseDescription: "Create a Next.js app and build a home page that shows your name and a short bio.",
          exerciseRequirements: [
            "Scaffold with create-next-app",
            "Edit app/page.tsx",
            "Run the dev server and verify",
          ],
          challenge: "Add a second page at /about and link between them.",
          summary:
            "Next.js is the React framework with server-first rendering and file-based routing.",
        }),
        lesson({
          title: "Creating a Next.js Project",
          slug: "nextjs-setup",
          minutes: 15,
          objective: "Scaffold a Next.js project with TypeScript and Tailwind.",
          intro:
            "create-next-app scaffolds a project with sensible defaults: TypeScript, ESLint, Tailwind CSS, and the App Router.",
          concepts: [
            "- npx create-next-app@latest with flags for TypeScript, ESLint, Tailwind.",
            "- The app/ folder holds routes; public/ holds static assets.",
            "- next.config.ts centralizes configuration.",
          ],
          syntax: {
            lang: "bash",
            code: "npx create-next-app@latest my-app --ts --tailwind --eslint --app\ncd my-app\nnpm run dev",
          },
          example: {
            lang: "tsx",
            code: "// app/layout.tsx\nexport default function RootLayout({ children }) {\n  return (\n    <html lang=\"en\">\n      <body>{children}</body>\n    </html>\n  );\n}",
            output: "Every route renders inside this root layout.",
          },
          mistakes: [
            "Choosing plain JavaScript when TypeScript catches real bugs.",
            "Forgetting that layout.tsx replaces the _app/_document pattern.",
          ],
          bestPractices: [
            "Keep app/layout.tsx minimal — fonts, metadata, providers.",
            "Use path aliases (@/ imports) configured in tsconfig.",
          ],
          exerciseTitle: "Scaffold & Explore",
          exerciseDescription: "Create a project and explore the generated structure.",
          exerciseRequirements: [
            "Scaffold with TypeScript and Tailwind",
            "Identify layout.tsx, page.tsx, and globals.css",
            "Customize the root layout title",
          ],
          challenge: "Add a custom font using next/font in the root layout.",
          summary:
            "create-next-app gives a production-ready starting point in seconds.",
        }),
        lesson({
          title: "App Router Basics",
          slug: "nextjs-app-router",
          minutes: 20,
          objective: "Understand folders, files, and route conventions.",
          intro:
            "In the App Router, folders define routes and special files define behavior: page.tsx for UI, layout.tsx for shared chrome, loading.tsx for suspense fallbacks.",
          concepts: [
            "- Folders = routes; files = route segments.",
            "- Special files: page, layout, loading, error, not-found, route.",
            "- Nested layouts persist across navigation.",
          ],
          example: {
            lang: "text",
            code: "app/\n  layout.tsx          # root layout (required)\n  page.tsx            # / route\n  about/\n    page.tsx          # /about\n  blog/\n    layout.tsx        # shared for /blog/*\n    page.tsx          # /blog\n    [slug]/\n      page.tsx        # /blog/:slug",
            output: "A route tree mirroring the folder structure.",
          },
          mistakes: [
            "Naming a file page.tsx inside a folder you don't want as a route.",
            "Putting non-route files in app/ — they become routes.",
          ],
          bestPractices: [
            "Keep route components thin; move logic to lib/ and components/.",
            "Use group folders (route groups) like (marketing) to organize without affecting URLs.",
          ],
          exerciseTitle: "Route Structure",
          exerciseDescription: "Build a site with home, about, and blog routes using the conventions.",
          exerciseRequirements: [
            "Create 3 routes",
            "Add a nested layout to one route group",
            "Navigate between them with Link",
          ],
          challenge: "Add a loading.tsx to the blog route and observe it during navigation.",
          summary:
            "The App Router maps folders to routes with special files for UI states.",
        }),
      ],
    },
    {
      title: "Layouts & Pages",
      description: "Shared UI and route rendering",
      lessons: [
        lesson({
          title: "Layouts",
          slug: "nextjs-layouts",
          minutes: 20,
          objective: "Share UI across routes with nested layouts.",
          intro:
            "Layouts render persistent UI — headers, sidebars, footers — that do not remount when navigating between child routes.",
          concepts: [
            "- layout.tsx wraps its children on every navigation.",
            "- Layouts can nest: root layout → section layout → page.",
            "- Route groups (marketing) share a layout without adding URL segments.",
          ],
          example: {
            lang: "tsx",
            code: "// app/dashboard/layout.tsx\nexport default function DashboardLayout({ children }) {\n  return (\n    <div className=\"flex\">\n      <aside>Dashboard nav</aside>\n      <main>{children}</main>\n    </div>\n  );\n}",
            output: "The sidebar persists across /dashboard and /dashboard/settings.",
          },
          mistakes: [
            "Fetching data in a layout when you want a loading boundary per page.",
            "Forgetting that layouts do not re-render on navigation between children.",
          ],
          bestPractices: [
            "Use layouts for navigation, footers, and providers.",
            "Colocate section-specific styles in the section layout.",
          ],
          exerciseTitle: "Dashboard Layout",
          exerciseDescription: "Create a dashboard layout with a sidebar and three child pages.",
          exerciseRequirements: [
            "Create the layout with a sidebar",
            "Create 3 child pages",
            "Verify the sidebar persists on navigation",
          ],
          challenge: "Use a route group so /dashboard and /account share the layout.",
          summary:
            "Nested layouts keep shared UI persistent and efficient.",
        }),
        lesson({
          title: "Pages & Dynamic Segments",
          slug: "nextjs-pages-dynamic",
          minutes: 20,
          objective: "Render pages with dynamic URL segments.",
          intro:
            "Dynamic segments use square brackets in folder names. The page receives params (now a Promise in Next 15+) and renders per-segment data.",
          concepts: [
            "- Folder [slug] matches one segment; [...slug] matches many.",
            "- params is a Promise: await it inside the page.",
            "- generateStaticParams pre-renders known dynamic routes.",
          ],
          example: {
            lang: "tsx",
            code: "// app/products/[id]/page.tsx\nexport default async function ProductPage({ params }) {\n  const { id } = await params;\n  const product = await getProduct(id);\n\n  if (!product) return notFound();\n\n  return (\n    <div>\n      <h1>{product.name}</h1>\n      <p>{product.description}</p>\n    </div>\n  );\n}",
            output: "/products/42 renders the product with id 42.",
          },
          mistakes: [
            "Treating params as a plain object instead of awaiting it.",
            "Forgetting notFound() for missing data.",
          ],
          bestPractices: [
            "Validate dynamic params before querying.",
            "Use generateStaticParams for public, known routes.",
          ],
          exerciseTitle: "Product Pages",
          exerciseDescription: "Build dynamic product pages with 404 handling for unknown ids.",
          exerciseRequirements: [
            "Create a [id] route",
            "Await and use params",
            "Return notFound() for missing products",
          ],
          challenge: "Add generateStaticParams for a fixed product list.",
          summary:
            "Dynamic segments give pages URL-driven data with proper 404 handling.",
        }),
        lesson({
          title: "Linking & Navigation",
          slug: "nextjs-navigation",
          minutes: 15,
          objective: "Navigate with Link, useRouter, and redirect.",
          intro:
            "Client-side navigation in Next.js is instant thanks to the App Router's prefetching and caching. Link is the primary tool; useRouter handles programmatic navigation.",
          concepts: [
            "- <Link href=\"/about\"> prefetches and navigates without reload.",
            "- useRouter() gives router.push, replace, refresh, back.",
            "- redirect() (server) throws a redirect for server code.",
          ],
          example: {
            lang: "tsx",
            code: "import Link from 'next/link';\nimport { useRouter } from 'next/navigation';\n\nfunction Nav() {\n  const router = useRouter();\n\n  return (\n    <nav>\n      <Link href=\"/\">Home</Link>\n      <Link href=\"/courses\">Courses</Link>\n      <button onClick={() => router.push('/dashboard')}>Go to dashboard</button>\n    </nav>\n  );\n}",
            output: "Links navigate instantly; the button pushes programmatically.",
          },
          mistakes: [
            "Using <a> for internal links, losing prefetching.",
            "Importing useRouter from next/router instead of next/navigation.",
          ],
          bestPractices: [
            "Pass query strings via the href object for type safety.",
            "Use router.refresh() to re-run server components after mutations.",
          ],
          exerciseTitle: "Nav System",
          exerciseDescription: "Build a header nav with active link styling and a programmatic redirect button.",
          exerciseRequirements: [
            "Use Link for all internal navigation",
            "Highlight the active route with usePathname",
            "Add one programmatic navigation",
          ],
          challenge: "Pass a query param through a Link and read it in the target page.",
          summary:
            "Link, useRouter, and redirect cover all navigation needs.",
        }),
      ],
    },
    {
      title: "Server & Client Components",
      description: "The two component models",
      lessons: [
        lesson({
          title: "Server Components",
          slug: "nextjs-server-components",
          minutes: 25,
          objective: "Build components that render on the server.",
          intro:
            "Server Components render on the server by default: they can read the database directly, keep secrets off the client, and ship zero JavaScript.",
          concepts: [
            "- Every component in app/ is a Server Component unless marked 'use client'.",
            "- They can await database calls and file reads directly.",
            "- No hooks, events, or browser APIs inside them.",
          ],
          example: {
            lang: "tsx",
            code: "// app/courses/page.tsx — a server component\nexport default async function CoursesPage() {\n  const courses = await prisma.course.findMany({\n    where: { status: 'PUBLISHED' },\n  });\n\n  return (\n    <ul>\n      {courses.map((course) => (\n        <li key={course.id}>{course.title}</li>\n      ))}\n    </ul>\n  );\n}",
            output: "The page queries the database and renders HTML — no client JS needed.",
          },
          mistakes: [
            "Using useState/useEffect in a server component — move to a client child.",
            "Passing functions or non-serializable data from server to client.",
          ],
          bestPractices: [
            "Fetch data as close to the consumer as possible.",
            "Keep the interactive leaves as small client components.",
          ],
          exerciseTitle: "Server Data Page",
          exerciseDescription: "Build a page that reads data directly from a database table (or a mock array).",
          exerciseRequirements: [
            "Mark nothing as client — keep it server",
            "Fetch data inside the component",
            "Render a list",
          ],
          challenge: "Stream the list using Suspense boundaries.",
          summary:
            "Server Components render server-side, read data directly, and ship less JavaScript.",
        }),
        lesson({
          title: "Client Components",
          slug: "nextjs-client-components",
          minutes: 20,
          objective: "Add interactivity with 'use client' components.",
          intro:
            "Client Components add interactivity: state, effects, and event handlers. Mark them with 'use client' at the top of the file.",
          concepts: [
            "- 'use client' applies to the file and everything it imports (until another boundary).",
            "- They can still be rendered on the server initially (SSR) and hydrate.",
            "- Keep client boundaries small for performance.",
          ],
          example: {
            lang: "tsx",
            code: "'use client';\n\nimport { useState } from 'react';\n\nexport default function LikeButton({ initialLikes }) {\n  const [likes, setLikes] = useState(initialLikes);\n\n  return (\n    <button onClick={() => setLikes(likes + 1)}>\n      ♥ {likes}\n    </button>\n  );\n}",
            output: "A button that increments on click — interactive only where needed.",
          },
          mistakes: [
            "Putting 'use client' on every file (defeats server rendering benefits).",
            "Passing large data from server to client unnecessarily.",
          ],
          bestPractices: [
            "Start server-first; add 'use client' only for interactivity.",
            "Pass serializable props — keep functions inside actions or event handlers.",
          ],
          exerciseTitle: "Interactive Widget",
          exerciseDescription: "Build a client component (like a like button or counter) and use it inside a server page.",
          exerciseRequirements: [
            "Mark the component 'use client'",
            "Use state for interaction",
            "Embed it in a server component page",
          ],
          challenge: "Pass initial data from the server as a prop to the client component.",
          summary:
            "Client Components handle interactivity while Server Components stay the default.",
        }),
        lesson({
          title: "Composition Patterns",
          slug: "nextjs-composition",
          minutes: 20,
          objective: "Pass server data and client interactivity together cleanly.",
          intro:
            "The key pattern: fetch in a server component and pass serializable data as props to small client components. This keeps most of the app server-rendered.",
          concepts: [
            "- Server Component fetches, renders, and passes props down.",
            "- Client children receive data and wire interactivity.",
            "- Children props can pass server-rendered JSX into client components.",
          ],
          example: {
            lang: "tsx",
            code: "// app/feed/page.tsx (server)\nexport default async function FeedPage() {\n  const posts = await getPosts();\n\n  return (\n    <div>\n      {posts.map((post) => (\n        <PostCard key={post.id} post={post}>\n          <LikeButton postId={post.id} />\n        </PostCard>\n      ))}\n    </div>\n  );\n}\n\n// PostCard can be a server component; LikeButton is a client leaf.",
            output: "Server-rendered cards with interactive like buttons.",
          },
          mistakes: [
            "Making the whole tree client because one leaf is interactive.",
            "Passing props that aren't serializable (functions, Dates, Maps).",
          ],
          bestPractices: [
            "Push interactivity down to leaf components.",
            "Use the children-slot pattern to avoid client/server mismatches.",
          ],
          exerciseTitle: "Hybrid Page",
          exerciseDescription: "Build a page that mixes server-rendered content with a client widget per item.",
          exerciseRequirements: [
            "One server component page",
            "One client component used per item",
            "Pass serializable data only",
          ],
          challenge: "Add a Suspense boundary around the client widgets.",
          summary:
            "Compose server components with small client leaves for the best of both models.",
        }),
      ],
    },
    {
      title: "Data Fetching",
      description: "Server and client data patterns",
      lessons: [
        lesson({
          title: "Server-Side Fetching",
          slug: "nextjs-server-fetch",
          minutes: 20,
          objective: "Fetch data directly in server components.",
          intro:
            "Server Components fetch data where it lives: the database via Prisma, or APIs via fetch. No loading spinners, no waterfalls of client requests.",
          concepts: [
            "- Direct DB access with Prisma in server components.",
            "- fetch() with caching options (next: { revalidate }).",
            "- Parallel fetches with Promise.all to avoid waterfalls.",
          ],
          example: {
            lang: "tsx",
            code: "export default async function Dashboard() {\n  const [user, courses, stats] = await Promise.all([\n    prisma.user.findUnique({ where: { id: userId } }),\n    prisma.course.findMany({ where: { status: 'PUBLISHED' } }),\n    prisma.lessonProgress.count({ where: { userId } }),\n  ]);\n\n  return <DashboardView user={user} courses={courses} stats={stats} />;\n}",
            output: "All three queries run in parallel before render.",
          },
          mistakes: [
            "Awaiting queries sequentially, creating waterfalls.",
            "Fetching the same data in nested components repeatedly.",
          ],
          bestPractices: [
            "Use Promise.all for independent queries.",
            "Let React cache() deduplicate shared fetches within a request.",
          ],
          exerciseTitle: "Parallel Fetching",
          exerciseDescription: "Build a dashboard that fetches three datasets in parallel.",
          exerciseRequirements: [
            "Use Promise.all",
            "Fetch at least 3 datasets",
            "Render them together",
          ],
          challenge: "Stream sections with independent Suspense boundaries.",
          summary:
            "Server components fetch directly and in parallel for fast pages.",
        }),
        lesson({
          title: "Client-Side Fetching",
          slug: "nextjs-client-fetch",
          minutes: 20,
          objective: "Fetch from the browser for client components.",
          intro:
            "Some data must be fetched client-side: search-as-you-type, pagination controls, or data that changes after the initial render. Use a client fetch library or plain fetch.",
          concepts: [
            "- Route Handlers (/app/api/...) expose endpoints for client fetching.",
            "- TanStack Query works in Next.js client components.",
            "- Server Actions are usually the better choice for mutations.",
          ],
          example: {
            lang: "tsx",
            code: "'use client';\n\nimport { useState, useEffect } from 'react';\n\nexport default function SearchBox() {\n  const [query, setQuery] = useState('');\n  const [results, setResults] = useState([]);\n\n  useEffect(() => {\n    if (query.length < 2) return setResults([]);\n    const timer = setTimeout(async () => {\n      const res = await fetch('/api/search?q=' + encodeURIComponent(query));\n      setResults(await res.json());\n    }, 300);\n    return () => clearTimeout(timer);\n  }, [query]);\n\n  return (\n    <div>\n      <input value={query} onChange={(e) => setQuery(e.target.value)} />\n      <ul>{results.map((r) => <li key={r.id}>{r.title}</li>)}</ul>\n    </div>\n  );\n}",
            output: "Debounced search against a route handler.",
          },
          mistakes: [
            "Client-fetching data a server component could fetch faster.",
            "Forgetting debounce on search inputs.",
          ],
          bestPractices: [
            "Prefer server fetching for initial page data.",
            "Use TanStack Query when caching and refetch matter.",
          ],
          exerciseTitle: "Search Endpoint",
          exerciseDescription: "Create an /api/search route handler and a client search box that calls it.",
          exerciseRequirements: [
            "Create the route handler",
            "Debounce client-side input",
            "Render results",
          ],
          challenge: "Add loading and empty states to the results.",
          summary:
            "Client fetching fits interactive, frequently-changing data.",
        }),
        lesson({
          title: "Streaming & Suspense",
          slug: "nextjs-streaming",
          minutes: 20,
          objective: "Stream pages with Suspense for instant shells.",
          intro:
            "Streaming sends the page shell immediately and fills in slow sections as they resolve. Suspense boundaries mark where to pause.",
          concepts: [
            "- <Suspense fallback={...}> around slow server sections.",
            "- loading.tsx is a shortcut for the whole segment.",
            "- Users see content sooner and interact with it while the rest loads.",
          ],
          example: {
            lang: "tsx",
            code: "import { Suspense } from 'react';\n\nasync function SlowChart() {\n  const data = await fetchChartData(); // 2s\n  return <Chart data={data} />;\n}\n\nexport default function Dashboard() {\n  return (\n    <div>\n      <h1>Dashboard</h1>\n      <Suspense fallback={<ChartSkeleton />}>\n        <SlowChart />\n      </Suspense>\n    </div>\n  );\n}",
            output: "The heading renders instantly; the chart fills in when ready.",
          },
          mistakes: [
            "Wrapping the entire page in one Suspense (defeats the purpose).",
            "Blocking the shell on one slow query.",
          ],
          bestPractices: [
            "Boundary per independent data section.",
            "Use skeletons that match the final layout to avoid layout shift.",
          ],
          exerciseTitle: "Streamed Dashboard",
          exerciseDescription: "Split a dashboard into three Suspense sections with skeletons.",
          exerciseRequirements: [
            "Create at least 3 suspense sections",
            "Use matching skeleton fallbacks",
            "Verify the shell renders before slow data",
          ],
          challenge: "Simulate a slow query with a delay and measure time-to-first-content.",
          summary:
            "Suspense + streaming show instant shells and fill content progressively.",
        }),
      ],
    },
    {
      title: "Server Actions",
      description: "Mutations without client fetch",
      lessons: [
        lesson({
          title: "Server Action Basics",
          slug: "nextjs-server-actions",
          minutes: 25,
          objective: "Create and use server actions for mutations.",
          intro:
            "Server Actions are functions that run on the server, callable directly from forms and event handlers. They replace hand-written API routes for mutations.",
          concepts: [
            "- Mark the file 'use server' or the function with 'use server'.",
            "- Call them from <form action={fn}> or onClick handlers.",
            "- They support progressive enhancement — forms work without JS.",
          ],
          example: {
            lang: "tsx",
            code: "// app/actions.ts\n'use server';\n\nimport { revalidatePath } from 'next/cache';\n\nexport async function createTodo(formData: FormData) {\n  const title = String(formData.get('title'));\n  await prisma.todo.create({ data: { title } });\n  revalidatePath('/todos');\n}\n\n// app/todos/page.tsx\n<form action={createTodo}>\n  <input name=\"title\" required />\n  <button type=\"submit\">Add</button>\n</form>",
            output: "Submitting the form runs the action server-side and refreshes the list.",
          },
          mistakes: [
            "Putting heavy logic in client components instead of actions.",
            "Forgetting revalidatePath — the page shows stale data.",
          ],
          bestPractices: [
            "Validate input with Zod inside the action.",
            "Return typed results and handle errors in the UI.",
          ],
          exerciseTitle: "Todo Action",
          exerciseDescription: "Build a todo app where creating and deleting use server actions.",
          exerciseRequirements: [
            "Create at least 2 server actions",
            "Wire them to forms",
            "Revalidate after mutations",
          ],
          challenge: "Add Zod validation and return a field-level error map.",
          summary:
            "Server Actions move mutations to the server with progressive enhancement.",
        }),
        lesson({
          title: "Actions with useActionState",
          slug: "nextjs-useactionstate",
          minutes: 20,
          objective: "Handle pending and error states with useActionState.",
          intro:
            "useActionState (formerly useFormState) wires server actions to forms with pending state and returned values, making error display clean.",
          concepts: [
            "- const [state, action, pending] = useActionState(fn, initialState).",
            "- The action receives (prevState, formData).",
            "- Disable buttons while pending to prevent double submits.",
          ],
          example: {
            lang: "tsx",
            code: "'use client';\n\nimport { useActionState } from 'react';\nimport { createUser } from './actions';\n\nconst initialState = { error: null };\n\nexport function SignupForm() {\n  const [state, action, pending] = useActionState(createUser, initialState);\n\n  return (\n    <form action={action}>\n      <input name=\"email\" type=\"email\" required />\n      <input name=\"password\" type=\"password\" required />\n      {state.error && <p className=\"error\">{state.error}</p>}\n      <button type=\"submit\" disabled={pending}>\n        {pending ? 'Creating...' : 'Sign up'}\n      </button>\n    </form>\n  );\n}",
            output: "Pending disables the button; returned errors render under the form.",
          },
          mistakes: [
            "Wrapping the action call without forwarding formData.",
            "Not typing the action signature (prevState, formData).",
          ],
          bestPractices: [
            "Return a discriminated result ({ ok: true, data } | { ok: false, error }).",
            "Reset the form with form.reset() after success via a key change.",
          ],
          exerciseTitle: "Form with State",
          exerciseDescription: "Convert a form to useActionState with pending and error handling.",
          exerciseRequirements: [
            "Use useActionState",
            "Show pending state on the button",
            "Display returned errors",
          ],
          challenge: "Clear the form fields after a successful submit.",
          summary:
            "useActionState brings pending/error state to server-action forms.",
        }),
        lesson({
          title: "Security in Actions",
          slug: "nextjs-action-security",
          minutes: 20,
          objective: "Authenticate, authorize, and validate in server actions.",
          intro:
            "Server actions are public endpoints — anyone can call them. Every action must verify the session, check permissions, and validate input.",
          concepts: [
            "- Require the session inside the action (not the client).",
            "- Check ownership before mutating another user's data.",
            "- Validate with Zod; never trust formData.",
          ],
          example: {
            lang: "tsx",
            code: "'use server';\n\nimport { z } from 'zod';\nimport { getSessionUser } from '@/lib/auth';\n\nexport async function deleteNote(formData: FormData) {\n  const user = await getSessionUser();\n  if (!user) throw new Error('UNAUTHORIZED');\n\n  const noteId = String(formData.get('noteId'));\n  const note = await prisma.note.findUnique({ where: { id: noteId } });\n\n  if (!note || note.userId !== user.id) {\n    throw new Error('FORBIDDEN');\n  }\n\n  await prisma.note.delete({ where: { id: noteId } });\n  revalidatePath('/notes');\n}",
            output: "Session check, ownership check, then the deletion.",
          },
          mistakes: [
            "Trusting an id passed from the client without ownership checks (IDOR).",
            "Skipping validation because 'it's just a form'.",
          ],
          bestPractices: [
            "Fail closed: throw or return errors on any missing check.",
            "Log suspicious access attempts.",
          ],
          exerciseTitle: "Secure Action",
          exerciseDescription: "Add session, ownership, and Zod validation to a delete action.",
          exerciseRequirements: [
            "Require a logged-in user",
            "Check ownership of the resource",
            "Validate input with Zod",
          ],
          challenge: "Rate-limit the action with a simple in-memory limiter.",
          summary:
            "Every server action is an endpoint: authenticate, authorize, validate.",
        }),
      ],
    },
    {
      title: "Route Handlers & APIs",
      description: "Building API endpoints",
      lessons: [
        lesson({
          title: "Route Handler Basics",
          slug: "nextjs-route-handlers",
          minutes: 20,
          objective: "Create API endpoints with route.ts files.",
          intro:
            "Route Handlers are API endpoints defined with route.ts files. They support GET, POST, PUT, PATCH, DELETE and return NextResponse.",
          concepts: [
            "- app/api/.../route.ts exports HTTP method functions.",
            "- Export only the methods you support.",
            "- They run on the server with full environment access.",
          ],
          example: {
            lang: "tsx",
            code: "// app/api/health/route.ts\nexport async function GET() {\n  return NextResponse.json({ status: 'ok', time: new Date().toISOString() });\n}\n\n// app/api/todos/route.ts\nexport async function GET() {\n  const todos = await prisma.todo.findMany();\n  return NextResponse.json(todos);\n}\n\nexport async function POST(request: Request) {\n  const body = await request.json();\n  const todo = await prisma.todo.create({ data: body });\n  return NextResponse.json(todo, { status: 201 });\n}",
            output: "Standard REST endpoints backed by the database.",
          },
          mistakes: [
            "Exporting methods you don't handle (they return 405).",
            "Parsing the body twice or never handling JSON parse errors.",
          ],
          bestPractices: [
            "Validate bodies with Zod.",
            "Set proper status codes (201, 400, 401, 404).",
          ],
          exerciseTitle: "Todos API",
          exerciseDescription: "Build a full CRUD API for todos with route handlers.",
          exerciseRequirements: [
            "Implement GET and POST",
            "Implement PUT and DELETE for /api/todos/[id]",
            "Return proper status codes",
          ],
          challenge: "Add Zod validation and return 400 with the error details.",
          summary:
            "Route Handlers are the serverless API layer of Next.js apps.",
        }),
        lesson({
          title: "Dynamic API Routes",
          slug: "nextjs-api-dynamic",
          minutes: 20,
          objective: "Handle parameters, queries, and cookies in route handlers.",
          intro:
            "Dynamic segments, search params, headers, and cookies are all accessible in route handlers — the full HTTP surface.",
          concepts: [
            "- params is a Promise in handlers too.",
            "- request.nextUrl.searchParams for query strings.",
            "- cookies() and headers() from next/headers (await them).",
          ],
          example: {
            lang: "tsx",
            code: "// app/api/courses/[slug]/route.ts\nexport async function GET(request: Request, { params }) {\n  const { slug } = await params;\n  const course = await prisma.course.findUnique({ where: { slug } });\n\n  if (!course) {\n    return NextResponse.json({ error: 'Not found' }, { status: 404 });\n  }\n\n  return NextResponse.json(course);\n}",
            output: "/api/courses/python returns that course or a 404.",
          },
          mistakes: [
            "Forgetting to await params in handlers.",
            "Reading cookies without awaiting the cookies() call.",
          ],
          bestPractices: [
            "Encode/sanitize anything reflected in responses.",
            "Validate params with Zod before querying.",
          ],
          exerciseTitle: "Course API",
          exerciseDescription: "Build /api/courses and /api/courses/[slug] with validation and 404s.",
          exerciseRequirements: [
            "List endpoint with query filters",
            "Detail endpoint with 404",
            "Validate the slug format",
          ],
          challenge: "Add caching headers to the list endpoint.",
          summary:
            "Dynamic route handlers expose the full HTTP surface of the request.",
        }),
        lesson({
          title: "API Security",
          slug: "nextjs-api-security",
          minutes: 20,
          objective: "Protect API endpoints with auth and rate limiting.",
          intro:
            "API endpoints must verify sessions, enforce roles, validate input, and resist brute force. A tiny in-memory rate limiter stops rapid abuse.",
          concepts: [
            "- Check the session at the top of every protected handler.",
            "- Role checks for admin endpoints.",
            "- Rate limiting by IP for login/register endpoints.",
          ],
          example: {
            lang: "tsx",
            code: "const attempts = new Map();\n\nfunction rateLimit(key: string, limit = 10, windowMs = 60000) {\n  const now = Date.now();\n  const entry = attempts.get(key) || { count: 0, resetAt: now + windowMs };\n\n  if (entry.resetAt < now) {\n    attempts.set(key, { count: 1, resetAt: now + windowMs });\n    return true;\n  }\n\n  entry.count += 1;\n  attempts.set(key, entry);\n  return entry.count <= limit;\n}\n\nexport async function POST(request: Request) {\n  const ip = request.headers.get('x-forwarded-for') || 'unknown';\n  if (!rateLimit('login:' + ip, 10, 60000)) {\n    return NextResponse.json({ error: 'Too many attempts' }, { status: 429 });\n  }\n  // ... login logic\n}",
            output: "More than 10 login attempts per minute return 429.",
          },
          mistakes: [
            "Rate limiting only on the client (trivially bypassed).",
            "Trusting a client-supplied userId for authorization.",
          ],
          bestPractices: [
            "Rate limit in middleware or at the handler entry.",
            "Use server-side sessions for all identity checks.",
          ],
          exerciseTitle: "Protected API",
          exerciseDescription: "Add session checks, role checks, and rate limiting to an API.",
          exerciseRequirements: [
            "Session check on all methods",
            "Admin-only endpoint",
            "Rate limit one endpoint",
          ],
          challenge: "Move the limiter to a shared utility module.",
          summary:
            "Authenticate, authorize, validate, and rate-limit every API route.",
        }),
      ],
    },
    {
      title: "Authentication",
      description: "Sessions, cookies, and protected routes",
      lessons: [
        lesson({
          title: "Session Strategy",
          slug: "nextjs-session-strategy",
          minutes: 25,
          objective: "Implement server-side session authentication.",
          intro:
            "Next.js apps authenticate with httpOnly cookies holding a session token that the server validates on every request. Never trust the client.",
          concepts: [
            "- httpOnly + secure + sameSite cookies hold a session token.",
            "- Sessions expire (e.g., 24 hours) and are deleted server-side.",
            "- getSessionUser() in lib/auth.ts reads cookies + DB on every call.",
          ],
          example: {
            lang: "ts",
            code: "export async function createSession(userId: string) {\n  const token = crypto.randomUUID();\n  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);\n\n  await prisma.session.create({ data: { sessionToken: token, userId, expiresAt } });\n\n  cookies().set('session', token, {\n    httpOnly: true,\n    secure: process.env.NODE_ENV === 'production',\n    sameSite: 'lax',\n    maxAge: 86400,\n    path: '/',\n  });\n}",
            output: "A 24-hour, httpOnly, server-validated session.",
          },
          mistakes: [
            "Storing auth state in localStorage — XSS can steal it.",
            "Setting session cookies without httpOnly or sameSite.",
          ],
          bestPractices: [
            "Check expiry server-side on every authenticated request.",
            "Delete expired sessions and redirect to login.",
          ],
          exerciseTitle: "Session Service",
          exerciseDescription: "Implement createSession, getSessionUser, and destroySession in a lib module.",
          exerciseRequirements: [
            "Create sessions with expiry",
            "Validate sessions server-side",
            "Support logout",
          ],
          challenge: "Add session expiry cleanup on login.",
          summary:
            "Server-side sessions with httpOnly cookies are the secure foundation.",
        }),
        lesson({
          title: "Password Hashing",
          slug: "nextjs-password-hashing",
          minutes: 15,
          objective: "Hash and verify passwords with bcrypt.",
          intro:
            "Never store plain-text passwords. bcrypt hashes with a salt; verification compares against the stored hash.",
          concepts: [
            "- bcrypt.hash(password, 12) — cost factor 12 is a good default.",
            "- bcrypt.compare(password, hash) verifies.",
            "- Same hash function on every language/framework.",
          ],
          example: {
            lang: "ts",
            code: "import bcrypt from 'bcryptjs';\n\nexport async function hashPassword(password: string) {\n  return bcrypt.hash(password, 12);\n}\n\nexport async function verifyPassword(password: string, hash: string) {\n  return bcrypt.compare(password, hash);\n}",
            output: "Hashes are salted and unreadable; comparison is constant-time-ish.",
          },
          mistakes: [
            "Using a weak cost factor (bcrypt with cost < 10).",
            "Rolling your own hashing — always use a battle-tested library.",
          ],
          bestPractices: [
            "Hash with a per-password salt (bcrypt does this automatically).",
            "Use a timing-safe comparison (bcrypt.compare does).",
          ],
          exerciseTitle: "Auth Service",
          exerciseDescription: "Write register and login service functions using bcrypt.",
          exerciseRequirements: [
            "Hash on register",
            "Verify on login",
            "Return typed errors for duplicate email/username",
          ],
          challenge: "Add a minimum password policy and enforce it in the service.",
          summary:
            "bcrypt hashing with verification is the non-negotiable password baseline.",
        }),
        lesson({
          title: "Middleware & Protected Routes",
          slug: "nextjs-middleware",
          minutes: 20,
          objective: "Guard routes with middleware and layouts.",
          intro:
            "Middleware runs before requests complete — perfect for redirecting unauthenticated users. Layouts and server components enforce the same rules for real security.",
          concepts: [
            "- middleware.ts (or proxy.ts in Next 16) checks cookies before rendering.",
            "- Redirect to /login with the intended destination.",
            "- Server-side checks in layouts are the source of truth.",
          ],
          example: {
            lang: "ts",
            code: "// middleware.ts\nexport function middleware(request: NextRequest) {\n  const token = request.cookies.get('session')?.value;\n  const { pathname } = request.nextUrl;\n\n  const protectedRoute = ['/dashboard', '/courses', '/learn'].some(\n    (r) => pathname === r || pathname.startsWith(r + '/')\n  );\n\n  if (protectedRoute && !token) {\n    const login = new URL('/login', request.url);\n    login.searchParams.set('redirect', pathname);\n    return NextResponse.redirect(login);\n  }\n\n  return NextResponse.next();\n}",
            output: "Unauthenticated users bounce to /login with their origin preserved.",
          },
          mistakes: [
            "Trusting middleware alone — it can't read the DB; layouts must check the session.",
            "Not handling expired cookies (token present but invalid).",
          ],
          bestPractices: [
            "Middleware for UX redirects; server layout checks for enforcement.",
            "Exclude public assets from the matcher.",
          ],
          exerciseTitle: "Route Guard",
          exerciseDescription: "Add middleware protecting student routes and a layout-level session check.",
          exerciseRequirements: [
            "Middleware redirect with redirect param",
            "Layout re-checks the session",
            "Public routes stay accessible",
          ],
          challenge: "Handle the admin segment separately with a role check.",
          summary:
            "Middleware redirects; server layouts enforce authentication.",
        }),
      ],
    },
    {
      title: "Database with Prisma",
      description: "Typed database access",
      lessons: [
        lesson({
          title: "Prisma Setup",
          slug: "nextjs-prisma-setup",
          minutes: 20,
          objective: "Install Prisma and create the first model.",
          intro:
            "Prisma is a type-safe ORM. The schema defines models; migrations apply them; the generated client gives autocompleted, type-checked queries.",
          concepts: [
            "- prisma/schema.prisma defines models with a datasource.",
            "- npx prisma migrate dev creates and applies migrations.",
            "- @prisma/client gives the typed PrismaClient.",
          ],
          syntax: {
            lang: "bash",
            code: "npm install prisma --save-dev\nnpm install @prisma/client\nnpx prisma init --datasource-provider postgresql\n# edit schema.prisma, then:\nnpx prisma migrate dev --name init\nnpx prisma generate",
          },
          example: {
            lang: "prisma",
            code: "model User {\n  id        String   @id @default(uuid())\n  email     String   @unique\n  name      String\n  createdAt DateTime @default(now())\n}",
            output: "A users table with a unique email index.",
          },
          mistakes: [
            "Hardcoding DATABASE_URL in the schema or code.",
            "Forgetting to regenerate the client after schema changes.",
          ],
          bestPractices: [
            "Keep the schema in version control — it documents the data model.",
            "Use migrations, not db push, for production databases.",
          ],
          exerciseTitle: "First Model",
          exerciseDescription: "Set up Prisma, define a User model, and run your first migration.",
          exerciseRequirements: [
            "Initialize Prisma",
            "Define at least 2 models with a relation",
            "Run a migration and generate the client",
          ],
          challenge: "Add a unique index and a default value to a field.",
          summary:
            "Prisma turns your database into typed, autocompleted code.",
        }),
        lesson({
          title: "Queries & Relations",
          slug: "nextjs-prisma-queries",
          minutes: 25,
          objective: "Query with relations, filters, and includes.",
          intro:
            "Prisma queries read like plain English: findMany, findUnique, include relations, and filter with where clauses that are fully typed.",
          concepts: [
            "- findUnique vs findMany vs findFirst.",
            "- include vs select for shaping responses.",
            "- Nested filters: where: { module: { courseId } }.",
          ],
          example: {
            lang: "ts",
            code: "const course = await prisma.course.findUnique({\n  where: { slug: 'python' },\n  include: {\n    modules: {\n      orderBy: { order: 'asc' },\n      include: {\n        lessons: { where: { status: 'PUBLISHED' }, select: { id: true, title: true } },\n      },\n    },\n  },\n});",
            output: "One query returns the course with ordered modules and lessons.",
          },
          mistakes: [
            "Over-fetching with include when select would do.",
            "N+1 queries in loops instead of include relations.",
          ],
          bestPractices: [
            "Select only fields you render.",
            "Order relations explicitly.",
          ],
          exerciseTitle: "Course Query",
          exerciseDescription: "Write queries for a course catalog with modules, lessons, and counts.",
          exerciseRequirements: [
            "Use include for a nested relation",
            "Use a where filter",
            "Return lesson counts",
          ],
          challenge: "Write an aggregate query with _count.",
          summary:
            "Prisma's typed queries make complex relations simple and safe.",
        }),
        lesson({
          title: "Transactions & Upserts",
          slug: "nextjs-prisma-transactions",
          minutes: 20,
          objective: "Keep data consistent with transactions.",
          intro:
            "Multi-step writes — like completing a lesson and updating progress — must be atomic. Prisma transactions roll back everything if any step fails.",
          concepts: [
            "- prisma.$transaction([...]) for an array of operations.",
            "- prisma.$transaction(async (tx) => {...}) for interactive flows.",
            "- upsert creates or updates in one call.",
          ],
          example: {
            lang: "ts",
            code: "await prisma.$transaction(async (tx) => {\n  await tx.lessonProgress.upsert({\n    where: { userId_lessonId: { userId, lessonId } },\n    create: { userId, lessonId, status: 'COMPLETED', completedAt: new Date() },\n    update: { status: 'COMPLETED', completedAt: new Date() },\n  });\n\n  await tx.user.update({\n    where: { id: userId },\n    data: { xp: { increment: 10 } },\n  });\n});",
            output: "Lesson completion and XP award commit or fail together.",
          },
          mistakes: [
            "Awarding XP even when the progress write fails.",
            "Nesting transactions inside transactions.",
          ],
          bestPractices: [
            "Use transactions for multi-table writes.",
            "Keep interactive transactions short.",
          ],
          exerciseTitle: "Atomic Progress",
          exerciseDescription: "Wrap lesson completion + XP + streak updates in one transaction.",
          exerciseRequirements: [
            "Use $transaction with a callback",
            "Perform at least 3 writes",
            "Verify rollback behavior",
          ],
          challenge: "Add a unique constraint violation test to prove rollback.",
          summary:
            "Transactions make multi-step writes atomic and consistent.",
        }),
      ],
    },
    {
      title: "Metadata & SEO",
      description: "Optimizing pages for search engines",
      lessons: [
        lesson({
          title: "Static Metadata",
          slug: "nextjs-metadata",
          minutes: 15,
          objective: "Add metadata to pages and layouts.",
          intro:
            "The Metadata API controls titles, descriptions, Open Graph, and robots. Static metadata is a simple export from layout or page files.",
          concepts: [
            "- export const metadata = { title, description }.",
            "- Layout metadata applies to all children; pages can override.",
            "- metadataBase sets the URL base for OG tags.",
          ],
          example: {
            lang: "tsx",
            code: "// app/layout.tsx\nexport const metadata = {\n  title: {\n    default: 'FactLearning — Free Programming Learning Platform',\n    template: '%s | FactLearning',\n  },\n  description: 'Learn Java, Python, Go, and more from Basic to Advanced.',\n};\n\n// app/courses/page.tsx\nexport const metadata = {\n  title: 'All Courses',\n  description: 'Browse 16+ free programming courses.',\n};",
            output: "Pages get 'Page Title | FactLearning' automatically.",
          },
          mistakes: [
            "Duplicate titles across pages.",
            "Forgetting the description for social shares.",
          ],
          bestPractices: [
            "Use title.template for consistent branding.",
            "Set metadataBase to your production URL.",
          ],
          exerciseTitle: "Metadata Audit",
          exerciseDescription: "Add metadata to your root layout and three pages.",
          exerciseRequirements: [
            "Set a default title template",
            "Add per-page metadata",
            "Include descriptions",
          ],
          challenge: "Add Open Graph image tags to the home page.",
          summary:
            "The Metadata API handles SEO basics declaratively.",
        }),
        lesson({
          title: "Dynamic Metadata",
          slug: "nextjs-dynamic-metadata",
          minutes: 20,
          objective: "Generate metadata per dynamic route.",
          intro:
            "Dynamic routes generate metadata with generateMetadata, which receives the same params as the page and returns the document head.",
          concepts: [
            "- export async function generateMetadata({ params }).",
            "- Fetch or compute the title/description from params.",
            "- Return notFound() if the resource is missing.",
          ],
          example: {
            lang: "tsx",
            code: "// app/courses/[slug]/page.tsx\nexport async function generateMetadata({ params }) {\n  const { slug } = await params;\n  const course = await getCourseBySlug(slug);\n\n  if (!course) {\n    return { title: 'Course Not Found' };\n  }\n\n  return {\n    title: course.title,\n    description: course.description,\n  };\n}",
            output: "Each course page has unique, relevant metadata.",
          },
          mistakes: [
            "Fetching data twice (page + metadata) — dedupe with React cache.",
            "Returning metadata for non-existent resources.",
          ],
          bestPractices: [
            "Reuse the same query helper in metadata and page.",
            "Add robots.noindex for authenticated-only pages.",
          ],
          exerciseTitle: "Dynamic Titles",
          exerciseDescription: "Add generateMetadata to a dynamic blog or product route.",
          exerciseRequirements: [
            "Generate title and description from params",
            "Handle the not-found case",
            "Set noindex on a private route",
          ],
          challenge: "Add canonical URLs to the dynamic pages.",
          summary:
            "generateMetadata personalizes SEO for every dynamic route.",
        }),
        lesson({
          title: "Open Graph & Social",
          slug: "nextjs-og",
          minutes: 20,
          objective: "Create social sharing cards with Open Graph.",
          intro:
            "Open Graph tags control how links appear on social platforms. Next.js can generate OG images dynamically with the ImageResponse API.",
          concepts: [
            "- og:title, og:description, og:image, og:type tags.",
            "- opengraph-image.tsx generates images per route.",
            "- Static images via public/ or dynamic with ImageResponse.",
          ],
          example: {
            lang: "tsx",
            code: "// app/opengraph-image.tsx\nimport { ImageResponse } from 'next/og';\n\nexport const size = { width: 1200, height: 630 };\n\nexport default function OGImage() {\n  return new ImageResponse(\n    (\n      <div style={{ display: 'flex', fontSize: 64, background: '#0a0f1a', color: 'white', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>\n        FactLearning 🚀\n      </div>\n    ),\n    size\n  );\n}",
            output: "A 1200x630 social card generated on the fly.",
          },
          mistakes: [
            "Missing og:image — shares look generic.",
            "Absolute URLs required for OG images.",
          ],
          bestPractices: [
            "Test shares with the platform debuggers.",
            "Keep OG images informative, not just logos.",
          ],
          exerciseTitle: "OG Card",
          exerciseDescription: "Generate an Open Graph image for your site root.",
          exerciseRequirements: [
            "Create opengraph-image.tsx",
            "Use ImageResponse with a branded design",
            "Verify the URL resolves",
          ],
          challenge: "Make the OG image dynamic per course using generateImageMetadata.",
          summary:
            "Open Graph tags and generated images control social sharing.",
        }),
      ],
    },
    {
      title: "Caching & ISR",
      description: "Rendering strategies for speed",
      lessons: [
        lesson({
          title: "Rendering Strategies",
          slug: "nextjs-rendering",
          minutes: 20,
          objective: "Compare static, dynamic, and revalidated rendering.",
          intro:
            "Next.js renders at build time (static), per request (dynamic), or with time-based revalidation (ISR). Choose based on how often data changes.",
          concepts: [
            "- Static: generated once at build — fastest, no data changes.",
            "- Dynamic: per request — personalized or fresh data.",
            "- ISR: static with revalidate: 60 — rebuilt in the background.",
          ],
          example: {
            lang: "tsx",
            code: "// ISR: regenerate at most every hour\nexport const revalidate = 3600;\n\nexport default async function DocsPage() {\n  const docs = await fetchDocs();\n  return <DocsView docs={docs} />;\n}\n\n// Fully dynamic (personalized)\nexport const dynamic = 'force-dynamic';",
            output: "Docs rebuild hourly; personal pages always fresh.",
          },
          mistakes: [
            "Static-rendering pages that show user-specific data.",
            "Forgetting revalidate on frequently-updated content.",
          ],
          bestPractices: [
            "Start static, opt into dynamic only where needed.",
            "Use revalidatePath/revalidateTag for event-driven invalidation.",
          ],
          exerciseTitle: "Strategy Map",
          exerciseDescription: "Classify five pages of an app into static, ISR, or dynamic and implement them.",
          exerciseRequirements: [
            "Use all three strategies",
            "Justify each choice in comments",
            "Verify with build output",
          ],
          challenge: "Add on-demand revalidation via a webhook route.",
          summary:
            "Pick rendering per page: static, dynamic, or ISR.",
        }),
        lesson({
          title: "Client Router Cache",
          slug: "nextjs-router-cache",
          minutes: 15,
          objective: "Understand client-side navigation caching.",
          intro:
            "The App Router caches visited route segments in the client to make back/forward navigation instant. Understanding it prevents 'stale page' surprises.",
          concepts: [
            "- Router cache stores rendered segments during navigation.",
            "- Revalidation: revalidatePath, router.refresh(), or time.",
            "- Dynamic pages are refetched when cache expires.",
          ],
          example: {
            lang: "tsx",
            code: "'use client';\n\nimport { useRouter } from 'next/navigation';\n\nexport function RefreshButton() {\n  const router = useRouter();\n  return (\n    <button onClick={() => router.refresh()}>\n      Refresh data\n    </button>\n  );\n}",
            output: "router.refresh() re-runs server components without a full reload.",
          },
          mistakes: [
            "Expecting a hard reload for every navigation.",
            "Using window.location.reload() when router.refresh() is enough.",
          ],
          bestPractices: [
            "Call revalidatePath in server actions after mutations.",
            "Use router.refresh() after client-triggered mutations.",
          ],
          exerciseTitle: "Cache Behavior",
          exerciseDescription: "Create two pages and observe router cache behavior on navigation and refresh.",
          exerciseRequirements: [
            "Track a server-generated timestamp on each page",
            "Navigate and note the cache",
            "Trigger router.refresh() and note the update",
          ],
          challenge: "Set a route's dynamic config and observe cache expiry.",
          summary:
            "The router cache makes navigation instant; refresh it deliberately after mutations.",
        }),
        lesson({
          title: "Full Route Cache & revalidatePath",
          slug: "nextjs-full-route-cache",
          minutes: 20,
          objective: "Invalidate cached pages on demand.",
          intro:
            "revalidatePath and revalidateTag invalidate the Full Route Cache at the moment data changes — the modern replacement for time-based ISR.",
          concepts: [
            "- revalidatePath('/courses') refreshes that path's cached HTML.",
            "- revalidateTag('courses') refreshes everything tagged.",
            "- Call them inside server actions after mutations.",
          ],
          example: {
            lang: "ts",
            code: "'use server';\n\nimport { revalidatePath, revalidateTag } from 'next/cache';\n\nexport async function publishCourse(slug: string) {\n  await prisma.course.update({\n    where: { slug },\n    data: { status: 'PUBLISHED', publishedAt: new Date() },\n  });\n\n  revalidatePath('/courses');\n  revalidatePath('/courses/' + slug);\n  revalidateTag('courses');\n}",
            output: "Publishing instantly updates list and detail pages.",
          },
          mistakes: [
            "Only revalidating the path you edited, not its list pages.",
            "Calling revalidatePath in client components (server-only).",
          ],
          bestPractices: [
            "Tag related content and invalidate by tag.",
            "Revalidate all affected paths after a mutation.",
          ],
          exerciseTitle: "Revalidation",
          exerciseDescription: "Wire revalidatePath into a publish/unpublish action for a CMS-like app.",
          exerciseRequirements: [
            "Create a mutation that changes content",
            "Revalidate list and detail paths",
            "Verify the page updates without a manual reload",
          ],
          challenge: "Use revalidateTag with fetch('next: { tags }) on the reading side.",
          summary:
            "On-demand revalidation keeps caches fresh the moment data changes.",
        }),
      ],
    },
    {
      title: "Security",
      description: "Hardening Next.js applications",
      lessons: [
        lesson({
          title: "Security Headers",
          slug: "nextjs-security-headers",
          minutes: 15,
          objective: "Add security headers in middleware or config.",
          intro:
            "Security headers protect against common attacks: clickjacking (X-Frame-Options), sniffing (X-Content-Type-Options), and injection (CSP).",
          concepts: [
            "- Add headers in middleware on every response.",
            "- Content-Security-Policy is the most impactful header.",
            "- Permissions-Policy restricts browser features.",
          ],
          example: {
            lang: "ts",
            code: "export function middleware(request: NextRequest) {\n  const response = NextResponse.next();\n\n  response.headers.set('X-Frame-Options', 'DENY');\n  response.headers.set('X-Content-Type-Options', 'nosniff');\n  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');\n  response.headers.set(\n    'Content-Security-Policy',\n    \"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:\"\n  );\n\n  return response;\n}",
            output: "Every response carries the security headers.",
          },
          mistakes: [
            "A CSP so strict the app breaks (test carefully).",
            "Missing headers on API responses.",
          ],
          bestPractices: [
            "Audit headers with securityheaders.com.",
            "Use nonces for inline scripts when you can.",
          ],
          exerciseTitle: "Headers Middleware",
          exerciseDescription: "Add the standard security headers to a middleware.",
          exerciseRequirements: [
            "Set at least 4 security headers",
            "Verify them with curl -I",
            "Keep CSP compatible with your app",
          ],
          challenge: "Add a Content-Security-Policy-Report-Only header for safe testing.",
          summary:
            "Security headers are cheap, effective hardening for every response.",
        }),
        lesson({
          title: "Input Validation & Zod",
          slug: "nextjs-input-validation",
          minutes: 20,
          objective: "Validate all user input with Zod schemas.",
          intro:
            "Every form, action, and API body must be validated. Zod schemas define the shape, and parsing rejects anything unexpected before it reaches your database.",
          concepts: [
            "- z.object defines fields, types, and refinements.",
            "- safeParse returns typed success or detailed issues.",
            "- Shared schemas between client and server keep rules in one place.",
          ],
          example: {
            lang: "ts",
            code: "import { z } from 'zod';\n\nexport const registerSchema = z.object({\n  firstName: z.string().min(1),\n  lastName: z.string().min(1),\n  username: z.string().min(3).regex(/^[a-zA-Z0-9_]+$/),\n  email: z.string().email(),\n  password: z.string().min(8),\n});\n\nconst result = registerSchema.safeParse(body);\nif (!result.success) {\n  return { error: result.error.issues[0].message };\n}\n// result.data is fully typed and trusted",
            output: "Invalid input fails fast with a clear message.",
          },
          mistakes: [
            "Only checking truthiness of fields instead of validating.",
            "Trusting data after basic validation — validate with a schema always.",
          ],
          bestPractices: [
            "Validate at every boundary: server actions, route handlers, middleware.",
            "Keep schemas in a shared lib for reuse.",
          ],
          exerciseTitle: "Schema All Inputs",
          exerciseDescription: "Add Zod schemas to a register form, a comment form, and an API body.",
          exerciseRequirements: [
            "3 schemas minimum",
            "Use refinements where needed",
            "Return friendly error messages",
          ],
          challenge: "Derive TypeScript types from the schemas with z.infer.",
          summary:
            "Zod validation at every boundary blocks bad and malicious input.",
        }),
        lesson({
          title: "Protecting Against Common Attacks",
          slug: "nextjs-attack-defense",
          minutes: 20,
          objective: "Defend against XSS, CSRF, IDOR, and injection.",
          intro:
            "Next.js prevents many attacks by default — JSX escapes output, Prisma parameterizes SQL, and sameSite cookies blunt CSRF. Know what's left to do manually.",
          concepts: [
            "- XSS: React escapes text; sanitize any dangerouslySetInnerHTML.",
            "- SQL injection: Prisma parameterizes all queries — never use $queryRaw with concatenation.",
            "- IDOR: check ownership of every resource before reading or mutating.",
            "- CSRF: sameSite=lax cookies + server actions' built-in origin checks.",
          ],
          example: {
            lang: "ts",
            code: "// IDOR-safe: verify ownership before returning data\nconst note = await prisma.note.findFirst({\n  where: { id: noteId, userId: user.id },\n});\n\nif (!note) return NextResponse.json({ error: 'Not found' }, { status: 404 });\n\n// SQL injection: NEVER do this\n// const rows = await prisma.$queryRaw('SELECT * FROM users WHERE name = ' + input);\n\n// Always use parameters:\n// const rows = await prisma.$queryRaw`SELECT * FROM users WHERE name = ${input}`;",
            output: "Ownership-scoped queries and parameterized SQL.",
          },
          mistakes: [
            "Using dangerouslySetInnerHTML without sanitization.",
            "Fetching by id only — no ownership check (IDOR).",
          ],
          bestPractices: [
            "Scope queries by the session user.",
            "Sanitize rich content server-side (e.g., sanitize-html).",
          ],
          exerciseTitle: "Attack Audit",
          exerciseDescription: "Audit an app for XSS, IDOR, and injection risks and fix each.",
          exerciseRequirements: [
            "Find and fix an IDOR pattern",
            "Find and fix an XSS risk",
            "Confirm all DB access is parameterized",
          ],
          challenge: "Add a sanitizer to a markdown-rendering feature.",
          summary:
            "Defaults handle much; ownership checks and sanitization close the rest.",
        }),
      ],
    },
    {
      title: "Performance & Optimization",
      description: "Images, fonts, and bundle optimization",
      lessons: [
        lesson({
          title: "Image Optimization",
          slug: "nextjs-images",
          minutes: 20,
          objective: "Optimize images with next/image.",
          intro:
            "next/image optimizes images automatically: resizing, WebP/AVIF conversion, lazy loading, and priority hints. It also prevents layout shift.",
          concepts: [
            "- next/image with width/height and alt.",
            "- fill for container-based layouts.",
            "- priority for above-the-fold images; sizes for responsive.",
          ],
          example: {
            lang: "tsx",
            code: "import Image from 'next/image';\n\nexport default function CourseCard({ course }) {\n  return (\n    <Image\n      src={course.thumbnail}\n      alt={course.title}\n      width={400}\n      height={225}\n      sizes=\"(max-width: 768px) 100vw, 400px\"\n      priority={false}\n      className=\"rounded-lg object-cover\"\n    />\n  );\n}",
            output: "Optimized, responsive images with no layout shift.",
          },
          mistakes: [
            "Missing width/height or fill — layout shift or broken layout.",
            "Using <img> and missing out on optimization.",
          ],
          bestPractices: [
            "Set explicit dimensions.",
            "Use remotePatterns in next.config for external images.",
          ],
          exerciseTitle: "Image Upgrade",
          exerciseDescription: "Replace img tags with next/image in a card grid.",
          exerciseRequirements: [
            "Use next/image everywhere",
            "Set sizes for responsive behavior",
            "Add priority to the first image",
          ],
          challenge: "Compare Lighthouse performance before and after.",
          summary:
            "next/image gives automatic optimization and stable layouts.",
        }),
        lesson({
          title: "Fonts & Scripts",
          slug: "nextjs-fonts",
          minutes: 15,
          objective: "Load fonts and scripts efficiently.",
          intro:
            "next/font self-hosts Google fonts (privacy + no layout shift) and next/script controls third-party script loading.",
          concepts: [
            "- next/font/google with variable fonts.",
            "- font-display swap prevents invisible text.",
            "- next/script strategy: beforeInteractive, afterInteractive, lazyOnload.",
          ],
          example: {
            lang: "tsx",
            code: "// app/layout.tsx\nimport { Inter, JetBrains_Mono } from 'next/font/google';\n\nconst inter = Inter({ subsets: ['latin'], variable: '--font-sans' });\nconst mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });\n\nexport default function RootLayout({ children }) {\n  return (\n    <html lang=\"en\" className={inter.variable + ' ' + mono.variable}>\n      <body>{children}</body>\n    </html>\n  );\n}",
            output: "Self-hosted fonts with CSS variables for theming.",
          },
          mistakes: [
            "Loading fonts with <link> to Google — extra request + privacy concern.",
            "Blocking rendering on a slow analytics script.",
          ],
          bestPractices: [
            "Preload the critical font.",
            "Load analytics with lazyOnload.",
          ],
          exerciseTitle: "Font Setup",
          exerciseDescription: "Add a sans and a mono font via next/font with CSS variables.",
          exerciseRequirements: [
            "Load two fonts",
            "Expose CSS variables",
            "Apply them in globals.css",
          ],
          challenge: "Add an analytics script with lazyOnload.",
          summary:
            "next/font and next/script optimize loading of assets and third parties.",
        }),
        lesson({
          title: "Bundle & Server Optimization",
          slug: "nextjs-bundle",
          minutes: 20,
          objective: "Reduce bundle size and server load.",
          intro:
            "Ship less JavaScript, run less work per request. Lazy-load heavy libraries, prefer server components, and keep queries narrow.",
          concepts: [
            "- Server Components ship zero JS for static parts.",
            "- dynamic(() => import()) with ssr: false for client-only libs.",
            "- Narrow selects and pagination keep queries fast.",
          ],
          example: {
            lang: "tsx",
            code: "'use client';\n\nimport dynamic from 'next/dynamic';\n\n// Charts only loads when needed — huge bundle win\nconst Chart = dynamic(() => import('./BigChart'), {\n  ssr: false,\n  loading: () => <div className=\"skeleton\" />,\n});\n\nexport default function Dashboard() {\n  return <Chart />;\n}",
            output: "The chart library is a separate chunk loaded on demand.",
          },
          mistakes: [
            "Importing massive libraries at the top of client pages.",
            "Heavy queries returning hundreds of rows for a 10-row view.",
          ],
          bestPractices: [
            "Measure with next build output and bundle analyzers.",
            "Paginate or limit list queries.",
          ],
          exerciseTitle: "Bundle Slimming",
          exerciseDescription: "Identify the largest bundle chunks and lazy-load or remove them.",
          exerciseRequirements: [
            "Analyze the build output",
            "Lazy-load one heavy dependency",
            "Verify the initial JS drops",
          ],
          challenge: "Move a static section to a server component to remove its client JS.",
          summary:
            "Less JS and narrower queries mean faster pages and cheaper servers.",
        }),
      ],
    },
    {
      title: "Deployment",
      description: "Shipping to production",
      lessons: [
        lesson({
          title: "Build & Production Checks",
          slug: "nextjs-build-checks",
          minutes: 20,
          objective: "Pass lint, typecheck, and production build.",
          intro:
            "Before deploying: eslint clean, tsc --noEmit clean, and a successful next build. The build output shows route types (static/dynamic) and bundle sizes.",
          concepts: [
            "- npm run lint, npx tsc --noEmit, npm run build.",
            "- The build report shows static vs dynamic routes.",
            "- Fix errors before they reach production.",
          ],
          syntax: {
            lang: "bash",
            code: "npm run lint\nnpx tsc --noEmit\nnpm run build\nnpm run start   # verify the production server",
          },
          example: {
            lang: "text",
            code: "Route (app)                    Size     First Load JS\n┌ ○ /                          5.2 kB   87.4 kB\n├ ƒ /courses/[slug]            6.1 kB   91.2 kB\n└ ○ /about                     4.8 kB   86.9 kB",
            output: "○ = static, ƒ = dynamic — a quick health check.",
          },
          mistakes: [
            "Deploying without running the build locally.",
            "Ignoring the route type column in the build output.",
          ],
          bestPractices: [
            "Run all three checks in CI.",
            "Smoke-test key routes after start.",
          ],
          exerciseTitle: "Full Check",
          exerciseDescription: "Run lint, typecheck, build, and start; fix every issue.",
          exerciseRequirements: [
            "All three checks pass",
            "Review the build route table",
            "Smoke test 3 key pages on start",
          ],
          challenge: "Add a CI workflow that runs the checks on push.",
          summary:
            "Lint, typecheck, and build gate every production release.",
        }),
        lesson({
          title: "Deploying to Netlify",
          slug: "nextjs-netlify",
          minutes: 20,
          objective: "Deploy a Next.js app to Netlify.",
          intro:
            "Netlify supports Next.js with server components, server actions, and route handlers out of the box. Configure the build and environment, then push to deploy.",
          concepts: [
            "- netlify.toml: build command, publish directory, node version.",
            "- Environment variables set in Netlify, never in the repo.",
            "- Serverless functions power dynamic routes and APIs.",
          ],
          example: {
            lang: "toml",
            code: "[build]\n  command = \"npm run build\"\n  publish = \".next\"\n\n[build.environment]\n  NODE_VERSION = \"22\"\n\n[[plugins]]\n  package = \"@netlify/plugin-nextjs\"",
            output: "Netlify builds and serves the Next.js app.",
          },
          mistakes: [
            "Committing secrets to the repository.",
            "Forgetting to set DATABASE_URL/AUTH_SECRET in Netlify.",
          ],
          bestPractices: [
            "Use Neon's pooled connection string for serverless.",
            "Set NEXT_PUBLIC_* only for values safe for the browser.",
          ],
          exerciseTitle: "Netlify Deploy",
          exerciseDescription: "Connect the repo to Netlify and configure environment variables.",
          exerciseRequirements: [
            "Create netlify.toml",
            "Set environment variables in the dashboard",
            "Deploy and verify routes work",
          ],
          challenge: "Set up branch deploys for preview environments.",
          summary:
            "Netlify + the Next.js plugin deploys full-stack apps with env configuration.",
        }),
        lesson({
          title: "Production Database & Migrations",
          slug: "nextjs-prod-db",
          minutes: 20,
          objective: "Manage production database migrations safely.",
          intro:
            "Production databases need migration discipline: apply migrations in deploy steps, never db push, and use a managed Postgres like Neon.",
          concepts: [
            "- prisma migrate deploy applies committed migrations.",
            "- Neon: pooled URL for runtime, direct URL for migrations.",
            "- Backup and monitor before and after deploys.",
          ],
          example: {
            lang: "bash",
            code: "# During deploy (after build)\nnpx prisma migrate deploy\n\n# Verify schema matches\nnpx prisma migrate status\n\n# Seed only once / explicitly\nnpm run db:seed",
            output: "Migrations apply cleanly against the production database.",
          },
          mistakes: [
            "Running prisma db push in production.",
            "Running destructive seeds against production data.",
          ],
          bestPractices: [
            "Run migrations as an explicit deploy step.",
            "Test migrations against a staging database first.",
          ],
          exerciseTitle: "Deploy Runbook",
          exerciseDescription: "Write a deploy runbook covering migration, seed, and rollback steps.",
          exerciseRequirements: [
            "Document migration steps",
            "Document environment variables",
            "Include a rollback plan",
          ],
          challenge: "Practice a staging migration with a sample schema change.",
          summary:
            "Managed databases plus disciplined migrations keep production stable.",
        }),
      ],
    },
    {
      title: "Full Stack Project — Course Platform",
      description: "Build a learning platform end to end",
      lessons: [
        lesson({
          title: "Planning & Schema",
          slug: "nextjs-project-plan",
          minutes: 30,
          objective: "Plan a course platform and design its schema.",
          intro:
            "This final module builds a mini learning platform: courses, lessons, progress, and a dashboard — exactly the patterns real platforms like FactLearning use.",
          concepts: [
            "- Entities: Course, Lesson, LessonProgress, User.",
            "- Relations: course has lessons; user has progress per lesson.",
            "- Unique constraint on (userId, lessonId).",
          ],
          example: {
            lang: "prisma",
            code: "model Course {\n  id      String   @id @default(uuid())\n  title   String\n  slug    String   @unique\n  lessons Lesson[]\n}\n\nmodel Lesson {\n  id       String   @id @default(uuid())\n  courseId String\n  title    String\n  content  String\n  course   Course   @relation(fields: [courseId], references: [id], onDelete: Cascade)\n  progress LessonProgress[]\n}\n\nmodel LessonProgress {\n  id        String   @id @default(uuid())\n  userId    String\n  lessonId  String\n  completed Boolean  @default(false)\n  completedAt DateTime?\n  lesson    Lesson   @relation(fields: [lessonId], references: [id], onDelete: Cascade)\n\n  @@unique([userId, lessonId])\n}",
            output: "A clean, minimal learning-platform schema.",
          },
          mistakes: [
            "Skipping unique constraints — duplicate progress rows corrupt data.",
            "Designing the schema after writing pages (schema first!).",
          ],
          bestPractices: [
            "Add indexes on foreign keys used in where clauses.",
            "Use onDelete: Cascade carefully.",
          ],
          exerciseTitle: "Schema & Migrate",
          exerciseDescription: "Design the platform schema, migrate, and seed sample courses.",
          exerciseRequirements: [
            "Define all models and relations",
            "Run a migration",
            "Seed 2 courses with lessons",
          ],
          challenge: "Add a Quiz model with questions and options.",
          summary:
            "Schema-first design with constraints makes the platform robust.",
        }),
        lesson({
          title: "Pages & Learning Flow",
          slug: "nextjs-project-pages",
          minutes: 40,
          objective: "Build course, lesson, and progress pages.",
          intro:
            "With the schema ready, build the flow: course list → course detail → lesson page with mark-complete → dashboard showing progress.",
          concepts: [
            "- Server components for lists and details.",
            "- A client LessonView for the mark-complete interaction.",
            "- Server action completes lessons and revalidates.",
          ],
          example: {
            lang: "tsx",
            code: "// app/learn/[lessonId]/page.tsx (server)\nexport default async function LessonPage({ params }) {\n  const { lessonId } = await params;\n  const lesson = await prisma.lesson.findUnique({ where: { id: lessonId } });\n\n  if (!lesson) notFound();\n\n  return (\n    <article>\n      <h1>{lesson.title}</h1>\n      <Markdown content={lesson.content} />\n      <CompleteButton lessonId={lesson.id} />\n    </article>\n  );\n}",
            output: "Server-rendered lesson with a client completion button.",
          },
          mistakes: [
            "Fetching data in a client component when the server could.",
            "No revalidation after marking complete — progress looks stale.",
          ],
          bestPractices: [
            "Keep lesson content server-rendered (SEO-friendly).",
            "Revalidate the course page after completion.",
          ],
          exerciseTitle: "Learning Flow",
          exerciseDescription: "Implement course list, detail, lesson, and complete actions.",
          exerciseRequirements: [
            "3+ server pages",
            "1 client interaction (complete lesson)",
            "Progress shown on the course page",
          ],
          challenge: "Add next/previous lesson navigation.",
          summary:
            "Server pages + client leaves + server actions form the learning flow.",
        }),
        lesson({
          title: "Auth & Deployment",
          slug: "nextjs-project-auth",
          minutes: 30,
          objective: "Protect the platform and ship it.",
          intro:
            "Finish with authentication: register/login, protected routes, and deployment. Users must be logged in before they can learn.",
          concepts: [
            "- bcrypt + httpOnly session cookies.",
            "- Middleware redirects; layouts enforce.",
            "- Deploy with Netlify and a managed Postgres.",
          ],
          example: {
            lang: "tsx",
            code: "// middleware.ts (Next 16: proxy.ts)\nexport function middleware(request: NextRequest) {\n  const token = request.cookies.get('session')?.value;\n  const isLearn = request.nextUrl.pathname.startsWith('/learn');\n\n  if (isLearn && !token) {\n    const login = new URL('/login', request.url);\n    login.searchParams.set('redirect', request.nextUrl.pathname);\n    return NextResponse.redirect(login);\n  }\n  return NextResponse.next();\n}",
            output: "Every /learn route requires a session.",
          },
          mistakes: [
            "Protecting only in the UI, leaving APIs open.",
            "Storing tokens where XSS can read them.",
          ],
          bestPractices: [
            "Enforce auth in server actions and route handlers too.",
            "Verify the deployed site end to end.",
          ],
          exerciseTitle: "Ship It",
          exerciseDescription: "Add auth, protect routes, and deploy the platform.",
          exerciseRequirements: [
            "Register/login flow works",
            "Protected routes redirect",
            "Production build deployed",
          ],
          challenge: "Add progress persistence and a certificate on course completion.",
          summary:
            "Auth, protected routes, and deployment finish the full-stack project.",
        }),
      ],
    },
  ],
};