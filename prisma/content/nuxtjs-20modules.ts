import type { CourseContent } from "../seed-content";
import { lesson } from "./lesson-builder";

export const nuxtjsBasic20Modules: CourseContent = {
  slug: "nuxtjs-basic",
  modules: [
    {
      title: "Introduction to Nuxt",
      description: "What Nuxt is and getting started",
      lessons: [
        lesson({
          title: "What is Nuxt?",
          slug: "nuxt-intro",
          minutes: 12,
          objective: "Understand Nuxt and its superpowers.",
          intro:
            "Nuxt is the Vue framework for production: it adds file-based routing, SSR/SSG, server APIs, and auto-imports on top of Vue.",
          concepts: [
            "- **File-based routing**: pages/ folder defines routes.",
            "- **Server-side rendering**: better SEO and first paint.",
            "- **Auto-imports**: components and composables available everywhere.",
            "- **Nitro server**: API routes and server logic built in.",
          ],
          example: {
            lang: "vue",
            code: "<template>\n  <h1>Hello, Nuxt!</h1>\n</template>",
            output: "Running nuxi dev serves this page at localhost:3000.",
          },
          mistakes: [
            "Confusing Nuxt with plain Vue SPA setups.",
            "Not using auto-imports — importing components manually everywhere.",
          ],
          bestPractices: [
            "Follow the conventions; Nuxt is convention-first.",
            "Use the official docs and nuxi tooling.",
          ],
          exerciseTitle: "First Nuxt App",
          exerciseDescription: "Create a Nuxt app and build a home page with your name.",
          exerciseRequirements: [
            "Scaffold with npx nuxi init",
            "Edit pages/index.vue",
            "Run dev server",
          ],
          challenge: "Add an about page and link between them.",
          summary:
            "Nuxt is the production Vue framework with routing, SSR, and server APIs.",
        }),
        lesson({
          title: "Project Setup",
          slug: "nuxt-setup",
          minutes: 15,
          objective: "Scaffold and configure a Nuxt project.",
          intro:
            "nuxi init scaffolds a project. nuxt.config.ts centralizes configuration: modules, app settings, and runtime config.",
          concepts: [
            "- npx nuxi init my-app and npm install.",
            "- nuxt.config.ts for modules, CSS, and runtime config.",
            "- npm run dev / build / preview commands.",
          ],
          syntax: {
            lang: "bash",
            code: "npx nuxi@latest init my-app\ncd my-app\nnpm install\nnpm run dev",
          },
          example: {
            lang: "ts",
            code: "// nuxt.config.ts\nexport default defineNuxtConfig({\n  compatibilityDate: '2026-01-01',\n  devtools: { enabled: true },\n  css: ['~/assets/css/main.css'],\n  runtimeConfig: {\n    public: {\n      apiBase: 'https://api.example.com',\n    },\n  },\n});",
            output: "Modules, CSS, and runtime config in one file.",
          },
          mistakes: [
            "Missing compatibilityDate — Nuxt warns on every run.",
            "Putting secrets in runtimeConfig.public.",
          ],
          bestPractices: [
            "Use runtimeConfig for runtime settings.",
            "Use environment variables via .env for anything secret.",
          ],
          exerciseTitle: "Config Exploration",
          exerciseDescription: "Set up runtimeConfig and a global CSS file.",
          exerciseRequirements: [
            "Add runtimeConfig with a public value",
            "Add global CSS",
            "Read the config in a page",
          ],
          challenge: "Add the Tailwind module to the project.",
          summary:
            "nuxt.config.ts and nuxi provide the project foundation.",
        }),
        lesson({
          title: "Directory Structure",
          slug: "nuxt-structure",
          minutes: 15,
          objective: "Navigate Nuxt's conventional folders.",
          intro:
            "Nuxt's magic comes from conventions: pages, components, composables, layouts, and server folders each have a role.",
          concepts: [
            "- pages/ — routes; layouts/ — shared shells.",
            "- components/ — auto-imported components.",
            "- composables/ — auto-imported composables.",
            "- server/ — API routes and server utilities.",
          ],
          example: {
            lang: "text",
            code: "app.vue              # root component\npages/\n  index.vue           # /\n  about.vue           # /about\n  posts/\n    [slug].vue        # /posts/:slug\nlayouts/\n  default.vue\ncomponents/\n  Card.vue            # auto-imported <Card />\ncomposables/\n  useAuth.ts          # auto-imported\nserver/\n  api/\n    posts.ts          # GET /api/posts",
            output: "The conventional Nuxt layout.",
          },
          mistakes: [
            "Importing components manually when auto-import exists.",
            "Putting non-page files in pages/ (they become routes).",
          ],
          bestPractices: [
            "Rely on auto-imports — that's the Nuxt way.",
            "Keep pages thin; move logic to composables.",
          ],
          exerciseTitle: "Structure Tour",
          exerciseDescription: "Create pages, a layout, a component, and a composable.",
          exerciseRequirements: [
            "2+ pages",
            "1 layout",
            "1 auto-imported component used in a page",
          ],
          challenge: "Move a counter into a composable and share it.",
          summary:
            "Convention folders make Nuxt apps predictable and fast to build.",
        }),
      ],
    },
    {
      title: "Pages & Routing",
      description: "File-based routes",
      lessons: [
        lesson({
          title: "Pages & Routes",
          slug: "nuxt-pages",
          minutes: 20,
          objective: "Define routes with the pages folder.",
          intro:
            "Every .vue file in pages/ becomes a route. Nested folders nest URLs; dynamic segments use square brackets.",
          concepts: [
            "- pages/about.vue → /about.",
            "- pages/posts/[slug].vue → /posts/:slug.",
            "- Route names: posts-slug; navigate with NuxtLink.",
          ],
          example: {
            lang: "vue",
            code: "<template>\n  <div>\n    <h1>Post: {{ $route.params.slug }}</h1>\n    <NuxtLink to=\"/posts\">All posts</NuxtLink>\n  </div>\n</template>",
            output: "/posts/hello shows the slug in the heading.",
          },
          mistakes: [
            "Using <a href> instead of NuxtLink (loses prefetch).",
            "Forgetting dynamic folder names use square brackets.",
          ],
          bestPractices: [
            "Use NuxtLink everywhere.",
            "Use definePageMeta for per-page metadata.",
          ],
          exerciseTitle: "Route Building",
          exerciseDescription: "Create static and dynamic routes for a blog.",
          exerciseRequirements: [
            "3+ static pages",
            "1 dynamic [slug] page",
            "Navigate with NuxtLink",
          ],
          challenge: "Add page metadata with definePageMeta.",
          summary:
            "The pages folder defines routes; NuxtLink navigates them.",
        }),
        lesson({
          title: "Navigation & Params",
          slug: "nuxt-navigation",
          minutes: 15,
          objective: "Navigate programmatically and read params.",
          intro:
            "navigateTo() moves programmatically; useRoute() reads the current route; middleware guards navigation.",
          concepts: [
            "- const router = useRouter(); router.push('/x').",
            "- const route = useRoute(); route.params.id.",
            "- Middleware: definePageMeta({ middleware: 'auth' }).",
          ],
          example: {
            lang: "vue",
            code: "<script setup lang=\"ts\">\nconst router = useRouter();\nconst route = useRoute();\n\nfunction goHome() {\n  router.push('/');\n}\n\nconst slug = route.params.slug;\n</script>\n\n<template>\n  <button @click=\"goHome\">Home</button>\n  <p>Current slug: {{ slug }}</p>\n</template>",
            output: "Programmatic navigation and current params.",
          },
          mistakes: [
            "Using window.location for internal navigation.",
            "Reading route.params during SSR before await.",
          ],
          bestPractices: [
            "Use route middleware for guarded pages.",
            "Keep navigation logic in composables when shared.",
          ],
          exerciseTitle: "Navigation",
          exerciseDescription: "Add programmatic navigation and a route middleware.",
          exerciseRequirements: [
            "Programmatic navigation",
            "Read a route param",
            "A simple auth middleware",
          ],
          challenge: "Redirect logged-out users from /dashboard via middleware.",
          summary:
            "useRouter, useRoute, and middleware cover all navigation needs.",
        }),
        lesson({
          title: "Layouts",
          slug: "nuxt-layouts",
          minutes: 20,
          objective: "Share UI with layouts.",
          intro:
            "Layouts wrap pages with persistent chrome — navbars and footers. The default layout applies to all pages unless overridden.",
          concepts: [
            "- layouts/default.vue is the default shell.",
            "- definePageMeta({ layout: 'admin' }) selects another.",
            "- Layouts accept slots for page content.",
          ],
          example: {
            lang: "vue",
            code: "<!-- layouts/default.vue -->\n<template>\n  <div>\n    <header>\n      <NuxtLink to=\"/\">Home</NuxtLink>\n      <NuxtLink to=\"/about\">About</NuxtLink>\n    </header>\n    <main>\n      <slot />\n    </main>\n    <footer>© 2026</footer>\n  </div>\n</template>\n\n<!-- pages/about.vue -->\n<script setup lang=\"ts\">\ndefinePageMeta({ layout: 'default' });\n</script>",
            output: "Header and footer persist across pages.",
          },
          mistakes: [
            "Repeating the navbar markup on every page.",
            "Forgetting that custom layouts need a <slot />.",
          ],
          bestPractices: [
            "Use layouts for persistent chrome.",
            "Use route groups or nested layouts for sections.",
          ],
          exerciseTitle: "Layouts",
          exerciseDescription: "Create default and admin layouts and assign pages to them.",
          exerciseRequirements: [
            "2 layouts",
            "Assign via definePageMeta",
            "Both include a slot",
          ],
          challenge: "Make the layout switch based on a route meta flag.",
          summary:
            "Layouts provide persistent shells per page or section.",
        }),
      ],
    },
    {
      title: "Components",
      description: "Reusable UI with auto-imports",
      lessons: [
        lesson({
          title: "Vue Components in Nuxt",
          slug: "nuxt-components",
          minutes: 20,
          objective: "Create auto-imported components.",
          intro:
            "Any component in components/ is auto-imported — use <Card /> without importing. This is the Nuxt way of building UI.",
          concepts: [
            "- File name becomes the tag: Card.vue → <Card />.",
            "- Props via defineProps, events via defineEmits.",
            "- Scoped styles per component.",
          ],
          example: {
            lang: "vue",
            code: "<!-- components/Card.vue -->\n<script setup lang=\"ts\">\ndefineProps<{ title: string; description?: string }>();\n</script>\n\n<template>\n  <article class=\"card\">\n    <h2>{{ title }}</h2>\n    <p v-if=\"description\">{{ description }}</p>\n  </article>\n</template>\n\n<style scoped>\n.card {\n  border: 1px solid #ddd;\n  border-radius: 8px;\n  padding: 16px;\n}\n</style>",
            output: "Use <Card title=\"Hi\" /> anywhere without importing.",
          },
          mistakes: [
            "Manually importing components that are auto-imported.",
            "Using global components when local ones are lighter.",
          ],
          bestPractices: [
            "Colocate related components in folders.",
            "Type props with TypeScript generics.",
          ],
          exerciseTitle: "Component Library",
          exerciseDescription: "Build a reusable Button and Badge component.",
          exerciseRequirements: [
            "2 components with props",
            "Used without imports in 2 pages",
            "Scoped styles",
          ],
          challenge: "Add a v-model component (custom input).",
          summary:
            "components/ auto-imports make UI building frictionless.",
        }),
        lesson({
          title: "Props & Events",
          slug: "nuxt-props-events",
          minutes: 20,
          objective: "Pass data and emit events between components.",
          intro:
            "Props flow down; events flow up. defineEmits declares the events a component can emit.",
          concepts: [
            "- defineProps with defaults and required flags.",
            "- const emit = defineEmits(['submit']); emit('submit', value).",
            "- v-model sugar for two-way values.",
          ],
          example: {
            lang: "vue",
            code: "<!-- components/SearchInput.vue -->\n<script setup lang=\"ts\">\nconst props = defineProps<{ modelValue: string; placeholder?: string }>();\nconst emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>();\n</script>\n\n<template>\n  <input\n    :value=\"modelValue\"\n    :placeholder=\"placeholder\"\n    @input=\"emit('update:modelValue', ($event.target as HTMLInputElement).value)\"\n  />\n</template>\n\n<!-- usage: <SearchInput v-model=\"query\" /> -->",
            output: "A reusable input bound with v-model.",
          },
          mistakes: [
            "Mutating props directly (Vue warns).",
            "Not declaring emits — harder to debug.",
          ],
          bestPractices: [
            "Use v-model components for form inputs.",
            "Type emits with the call-signature syntax.",
          ],
          exerciseTitle: "v-model Component",
          exerciseDescription: "Build a labeled input component supporting v-model.",
          exerciseRequirements: [
            "defineProps + defineEmits",
            "v-model support",
            "Used in a form",
          ],
          challenge: "Add validation feedback via a prop.",
          summary:
            "Props and events (with v-model) connect components cleanly.",
        }),
        lesson({
          title: "Slots",
          slug: "nuxt-slots",
          minutes: 15,
          objective: "Compose layouts with slots.",
          intro:
            "Slots let parents inject content into a component. Named slots provide multiple injection points.",
          concepts: [
            "- <slot /> default slot.",
            "- <slot name=\"header\" /> named slots.",
            "- Scoped slots pass data up to the parent.",
          ],
          example: {
            lang: "vue",
            code: "<!-- components/PageSection.vue -->\n<template>\n  <section class=\"section\">\n    <header><slot name=\"header\" /></header>\n    <div class=\"body\"><slot /></div>\n    <footer><slot name=\"footer\" /></footer>\n  </section>\n</template>\n\n<!-- usage -->\n<PageSection>\n  <template #header>My Section</template>\n  Main content here\n  <template #footer>Footer note</template>\n</PageSection>",
            output: "Parent content lands in the right slots.",
          },
          mistakes: [
            "Naming slots inconsistently.",
            "Forgetting a fallback for optional slots.",
          ],
          bestPractices: [
            "Provide default slot content when sensible.",
            "Use scoped slots for data-driven layouts.",
          ],
          exerciseTitle: "Slot Layout",
          exerciseDescription: "Build a PageSection component with three named slots.",
          exerciseRequirements: [
            "3 named slots",
            "Default content for one slot",
            "Used in a page",
          ],
          challenge: "Create a scoped slot exposing item data.",
          summary:
            "Slots make components composable containers.",
        }),
      ],
    },
    {
      title: "Composables & State",
      description: "Reactive logic with auto-imports",
      lessons: [
        lesson({
          title: "Composables",
          slug: "nuxt-composables",
          minutes: 25,
          objective: "Extract reusable logic into composables.",
          intro:
            "Composables are functions that wrap reactive state — the Vue composition API in a reusable function, auto-imported from composables/.",
          concepts: [
            "- Any file in composables/ auto-imports.",
            "- Use ref, computed, and lifecycle inside.",
            "- Return the reactive pieces components need.",
          ],
          example: {
            lang: "ts",
            code: "// composables/useCounter.ts\nexport function useCounter(initial = 0) {\n  const count = ref(initial);\n  const double = computed(() => count.value * 2);\n\n  function increment() {\n    count.value++;\n  }\n\n  return { count, double, increment };\n}\n\n// pages/index.vue\nconst { count, double, increment } = useCounter(5);",
            output: "Reactive counter shared across any component.",
          },
          mistakes: [
            "Defining composables outside composables/ (no auto-import).",
            "Returning whole reactive objects when components need values.",
          ],
          bestPractices: [
            "Name with use prefix.",
            "Compose small composables into bigger ones.",
          ],
          exerciseTitle: "useFetch wrapper",
          exerciseDescription: "Create a useApi composable that wraps useFetch with auth headers.",
          exerciseRequirements: [
            "Composable in composables/",
            "Uses useFetch or $fetch",
            "Consumed in a page",
          ],
          challenge: "Add caching and retry options.",
          summary:
            "Composables encapsulate reactive logic and auto-import.",
        }),
        lesson({
          title: "State Management",
          slug: "nuxt-state",
          minutes: 20,
          objective: "Share state with useState.",
          intro:
            "useState is Nuxt's SSR-safe shared state: values are consistent between server and client, and can be made global via a module export.",
          concepts: [
            "- const count = useState('count', () => 0).",
            "- Keys make state shared across components.",
            "- Pinia for bigger app state.",
          ],
          example: {
            lang: "ts",
            code: "// composables/useCart.ts\nexport function useCart() {\n  const items = useState<CartItem[]>('cart', () => []);\n\n  function add(item: CartItem) {\n    items.value.push(item);\n  }\n\n  const total = computed(() =>\n    items.value.reduce((sum, i) => sum + i.price, 0)\n  );\n\n  return { items, add, total };\n}",
            output: "Cart state shared across header and cart pages.",
          },
          mistakes: [
            "Using module-level refs (SSR hydration mismatches) instead of useState.",
            "Storing non-serializable values in useState.",
          ],
          bestPractices: [
            "Always use useState or Pinia for shared state.",
            "Give state clear string keys.",
          ],
          exerciseTitle: "Shared State",
          exerciseDescription: "Build a cart composable with useState shared by two components.",
          exerciseRequirements: [
            "useState with a key",
            "Computed total",
            "Two components reading the same state",
          ],
          challenge: "Persist cart state to localStorage.",
          summary:
            "useState gives SSR-safe shared state; Pinia scales it further.",
        }),
        lesson({
          title: "Pinia",
          slug: "nuxt-pinia",
          minutes: 25,
          objective: "Manage app state with Pinia stores.",
          intro:
            "Pinia is the official Vue state library, first-class in Nuxt via the @pinia/nuxt module. Stores hold state, getters, and actions.",
          concepts: [
            "- Add the module, then defineStore.",
            "- state, getters, and actions replace Vuex patterns.",
            "- Stores are auto-imported by name.",
          ],
          example: {
            lang: "ts",
            code: "// stores/user.ts\nexport const useUserStore = defineStore('user', {\n  state: () => ({\n    name: '',\n    xp: 0,\n  }),\n  getters: {\n    level: (state) => Math.floor(state.xp / 100) + 1,\n  },\n  actions: {\n    addXp(amount: number) {\n      this.xp += amount;\n    },\n  },\n});\n\n// In a component\nconst user = useUserStore();\nuser.addXp(10);\nconsole.log(user.level);",
            output: "A typed store with getters and actions.",
          },
          mistakes: [
            "Using the options API style when setup stores are cleaner.",
            "Storing server-fetched data that useFetch could cache.",
          ],
          bestPractices: [
            "Use setup-style stores with refs and functions.",
            "Keep server data in useFetch, client state in Pinia.",
          ],
          exerciseTitle: "Pinia Store",
          exerciseDescription: "Create a todo store with add/toggle/clear actions.",
          exerciseRequirements: [
            "Define the store",
            "Getters for counts",
            "Use it in two components",
          ],
          challenge: "Add a persistence plugin for the store.",
          summary:
            "Pinia gives structured, typed state management for Nuxt apps.",
        }),
      ],
    },
    {
      title: "Data Fetching",
      description: "Server and client data with useFetch",
      lessons: [
        lesson({
          title: "useFetch",
          slug: "nuxt-usefetch",
          minutes: 25,
          objective: "Fetch data with useFetch.",
          intro:
            "useFetch is Nuxt's data-fetching workhorse: SSR support, caching, deduplication, and reactive refresh built in.",
          concepts: [
            "- const { data, error, pending } = await useFetch('/api/posts').",
            "- await in setup runs it during SSR.",
            "- Keys dedupe identical requests.",
          ],
          example: {
            lang: "vue",
            code: "<script setup lang=\"ts\">\nconst { data: posts, error, pending, refresh } = await useFetch('/api/posts');\n</script>\n\n<template>\n  <div v-if=\"pending\">Loading...</div>\n  <div v-else-if=\"error\">Something went wrong</div>\n  <ul v-else>\n    <li v-for=\"post in posts\" :key=\"post.id\">{{ post.title }}</li>\n  </ul>\n  <button @click=\"refresh\">Refresh</button>\n</template>",
            output: "Server-rendered data with loading, error, and refresh.",
          },
          mistakes: [
            "Using client-only fetching with onMounted when useFetch exists.",
            "Forgetting that await useFetch runs on the server.",
          ],
          bestPractices: [
            "Use useFetch over raw $fetch for page data.",
            "Set a key for cache sharing.",
          ],
          exerciseTitle: "Post Feed",
          exerciseDescription: "Fetch posts with useFetch and render them with states.",
          exerciseRequirements: [
            "useFetch with await",
            "Loading and error states",
            "Refresh action",
          ],
          challenge: "Add watch: true to refetch when a reactive param changes.",
          summary:
            "useFetch handles SSR, caching, and refetching declaratively.",
        }),
        lesson({
          title: "Server Routes (Nitro)",
          slug: "nuxt-server-routes",
          minutes: 25,
          objective: "Build API endpoints with server/ routes.",
          intro:
            "Files in server/api/ become endpoints served by Nitro: full-stack without a separate backend.",
          concepts: [
            "- server/api/posts.ts exports defineEventHandler.",
            "- readBody, getQuery, getRouterParam helpers.",
            "- server/ code never ships to the client.",
          ],
          example: {
            lang: "ts",
            code: "// server/api/posts/index.ts\nexport default defineEventHandler(async (event) => {\n  const posts = await prisma.post.findMany({\n    where: { status: 'PUBLISHED' },\n    orderBy: { createdAt: 'desc' },\n  });\n  return posts;\n});\n\n// server/api/posts/[id].ts\nexport default defineEventHandler(async (event) => {\n  const id = getRouterParam(event, 'id');\n  const post = await prisma.post.findUnique({ where: { id } });\n  if (!post) {\n    throw createError({ statusCode: 404, message: 'Post not found' });\n  }\n  return post;\n});",
            output: "GET /api/posts and /api/posts/:id backed by the database.",
          },
          mistakes: [
            "Importing server code into client components.",
            "Returning raw errors that leak internals.",
          ],
          bestPractices: [
            "Validate input with Zod in handlers.",
            "Use createError for proper status codes.",
          ],
          exerciseTitle: "Posts API",
          exerciseDescription: "Create list and detail API routes with 404 handling.",
          exerciseRequirements: [
            "2 endpoints",
            "404 via createError",
            "Called with useFetch from a page",
          ],
          challenge: "Add a POST endpoint with Zod validation.",
          summary:
            "Nitro server routes make Nuxt full-stack out of the box.",
        }),
        lesson({
          title: "Server Utilities & Middleware",
          slug: "nuxt-server-middleware",
          minutes: 20,
          objective: "Share server logic and intercept requests.",
          intro:
            "server/utils/ holds shared server helpers; server/middleware/ runs logic before handlers — perfect for auth checks and rate limiting.",
          concepts: [
            "- server/utils/autoImports like client-side composables.",
            "- server/middleware/auth.ts checks sessions on API routes.",
            "- H3 event context carries the request.",
          ],
          example: {
            lang: "ts",
            code: "// server/utils/auth.ts\nexport async function requireUser(event: H3Event) {\n  const session = await getSession(event);\n  if (!session?.user) {\n    throw createError({ statusCode: 401, message: 'Unauthorized' });\n  }\n  return session.user;\n}\n\n// server/api/notes/index.ts\nexport default defineEventHandler(async (event) => {\n  const user = await requireUser(event);\n  return prisma.note.findMany({ where: { userId: user.id } });\n});",
            output: "Reusable auth enforcement across API routes.",
          },
          mistakes: [
            "Duplicating auth checks in every handler.",
            "Trusting client-supplied user ids.",
          ],
          bestPractices: [
            "Put auth/validation helpers in server/utils.",
            "Enforce ownership in queries.",
          ],
          exerciseTitle: "Auth Middleware",
          exerciseDescription: "Create requireUser and protect a notes API.",
          exerciseRequirements: [
            "Helper in server/utils",
            "Used in 2 handlers",
            "Ownership-scoped queries",
          ],
          challenge: "Add a rate-limit middleware to a public endpoint.",
          summary:
            "Server utilities and middleware keep API logic DRY and secure.",
        }),
      ],
    },
    {
      title: "Authentication in Nuxt",
      description: "Sessions, tokens, and route guards",
      lessons: [
        lesson({
          title: "Session Auth",
          slug: "nuxt-session-auth",
          minutes: 25,
          objective: "Implement cookie-based session auth.",
          intro:
            "Nuxt auth stores an httpOnly session cookie; server routes validate it on every request. This is the secure, SSR-friendly pattern.",
          concepts: [
            "- Login handler sets an httpOnly cookie.",
            "- useRequestHeaders forwards cookies in SSR fetches.",
            "- useCookie exposes non-httpOnly state client-side.",
          ],
          example: {
            lang: "ts",
            code: "// server/api/auth/login.post.ts\nexport default defineEventHandler(async (event) => {\n  const body = await readBody(event);\n  const user = await verifyCredentials(body.email, body.password);\n\n  if (!user) {\n    throw createError({ statusCode: 401, message: 'Invalid credentials' });\n  }\n\n  const session = await createSession(user.id); // 24h expiry\n  setCookie(event, 'session', session.token, {\n    httpOnly: true,\n    secure: process.env.NODE_ENV === 'production',\n    sameSite: 'lax',\n    maxAge: 86400,\n    path: '/',\n  });\n\n  return { user: { id: user.id, name: user.name } };\n});",
            output: "Login sets a secure httpOnly session cookie.",
          },
          mistakes: [
            "Storing tokens in localStorage (XSS-readable).",
            "Not setting httpOnly/sameSite on the cookie.",
          ],
          bestPractices: [
            "Validate sessions in every protected server route.",
            "Redirect expired sessions to login.",
          ],
          exerciseTitle: "Auth Flow",
          exerciseDescription: "Build login/logout endpoints with cookie sessions.",
          exerciseRequirements: [
            "Login sets the cookie",
            "Logout clears it",
            "A protected endpoint rejects without it",
          ],
          challenge: "Add session expiry handling with a refresh flow.",
          summary:
            "httpOnly cookie sessions with server-side validation are the secure baseline.",
        }),
        lesson({
          title: "Route Guards",
          slug: "nuxt-route-guards",
          minutes: 15,
          objective: "Protect pages with route middleware.",
          intro:
            "Page middleware runs before rendering a route: check the session on the server, redirect unauthenticated users to login.",
          concepts: [
            "- middleware/auth.ts with defineNuxtRouteMiddleware.",
            "- navigateTo('/login') on failure.",
            "- Client and server both run page middleware.",
          ],
          example: {
            lang: "ts",
            code: "// middleware/auth.ts\nexport default defineNuxtRouteMiddleware(async (to) => {\n  const user = await useCurrentUser(); // server-safe session check\n\n  if (!user) {\n    return navigateTo('/login?redirect=' + encodeURIComponent(to.fullPath));\n  }\n});\n\n// pages/dashboard.vue\n<script setup lang=\"ts\">\ndefinePageMeta({ middleware: 'auth' });\n</script>",
            output: "/dashboard bounces guests to /login with a return path.",
          },
          mistakes: [
            "Checking a client cookie alone (spoofable).",
            "Forgetting the return-path so users lose their destination.",
          ],
          bestPractices: [
            "Enforce in server routes too — middleware is UX, handlers are security.",
            "Use global middleware for app-wide rules.",
          ],
          exerciseTitle: "Guards",
          exerciseDescription: "Protect a dashboard and an admin page with middleware.",
          exerciseRequirements: [
            "Auth middleware",
            "Admin role check",
            "Redirect with return path",
          ],
          challenge: "Handle the expired-session case with a message.",
          summary:
            "Route middleware guards pages; server handlers enforce the same rules.",
        }),
        lesson({
          title: "useState for Auth UI",
          slug: "nuxt-auth-state",
          minutes: 20,
          objective: "Keep the auth UI in sync with useState.",
          intro:
            "Client UI needs the current user: a useState-backed composable hydrated from the session endpoint keeps navbar and pages in sync.",
          concepts: [
            "- useCurrentUser() composable with useState.",
            "- Refresh after login/logout.",
            "- NuxtServerInit-style hydration via callOnce.",
          ],
          example: {
            lang: "ts",
            code: "// composables/useCurrentUser.ts\nexport function useCurrentUser() {\n  const user = useState<User | null>('currentUser', () => null);\n\n  async function refresh() {\n    const data = await $fetch('/api/auth/session');\n    user.value = data.user;\n  }\n\n  return { user, refresh };\n}\n\n// In the navbar\nconst { user, refresh } = useCurrentUser();\nawait callOnce(async () => {\n  if (import.meta.server) await refresh();\n});",
            output: "Navbar shows login state consistently on server and client.",
          },
          mistakes: [
            "Fetching the session in every component.",
            "Directly mutating the state instead of through refresh().",
          ],
          bestPractices: [
            "Hydrate auth state once at app entry.",
            "Clear state on logout immediately.",
          ],
          exerciseTitle: "Auth UI",
          exerciseDescription: "Build a navbar that reacts to login state.",
          exerciseRequirements: [
            "useCurrentUser composable",
            "Refresh after login/logout",
            "Navbar switches links by state",
          ],
          challenge: "Add a permissions-based link for admins.",
          summary:
            "useState + a session endpoint keeps auth UI reactive.",
        }),
      ],
    },
    {
      title: "Database & Full Stack",
      description: "Prisma with Nuxt server routes",
      lessons: [
        lesson({
          title: "Prisma Setup in Nuxt",
          slug: "nuxt-prisma",
          minutes: 20,
          objective: "Connect Prisma to Nuxt server routes.",
          intro:
            "Prisma works in server/ with a shared client instance. Never import it into client components — it holds the database password.",
          concepts: [
            "- lib/server/db.ts exports a singleton PrismaClient.",
            "- Server routes import the client.",
            "- Migrations via prisma CLI.",
          ],
          example: {
            lang: "ts",
            code: "// server/utils/db.ts\nimport { PrismaClient } from '@prisma/client';\n\nconst prisma = globalThis.prisma ?? new PrismaClient();\n\nif (process.env.NODE_ENV !== 'production') {\n  globalThis.prisma = prisma;\n}\n\nexport default prisma;\n\n// server/api/courses/index.ts\nimport prisma from '~~/server/utils/db';\n\nexport default defineEventHandler(async () => {\n  return prisma.course.findMany({ where: { status: 'PUBLISHED' } });\n});",
            output: "Typed database access inside server routes.",
          },
          mistakes: [
            "Importing PrismaClient into client components.",
            "Creating a new client per request (connection exhaustion).",
          ],
          bestPractices: [
            "Singleton pattern for the client.",
            "Use the pooled URL on serverless.",
          ],
          exerciseTitle: "Prisma API",
          exerciseDescription: "Wire Prisma into Nuxt and build a courses API.",
          exerciseRequirements: [
            "Singleton client",
            "2 endpoints using it",
            "No client-side imports",
          ],
          challenge: "Add validation and ownership checks to a mutation.",
          summary:
            "Prisma in server routes gives typed full-stack data access.",
        }),
        lesson({
          title: "Mutations & Revalidation",
          slug: "nuxt-mutations",
          minutes: 20,
          objective: "Mutate data and refresh cached pages.",
          intro:
            "Mutations POST from the client to server routes, then refresh the cached page data so the UI stays truthful.",
          concepts: [
            "- $fetch('/api/posts', { method: 'POST', body }).",
            "- refreshNuxtData() or refresh() on the specific fetch.",
            "- Optimistic updates for snappy UX.",
          ],
          example: {
            lang: "vue",
            code: "<script setup lang=\"ts\">\nconst { data: posts, refresh } = await useFetch('/api/posts');\n\nasync function addPost(title: string) {\n  await $fetch('/api/posts', {\n    method: 'POST',\n    body: { title },\n  });\n  await refresh();\n}\n</script>",
            output: "Creating a post refreshes the fetched list.",
          },
          mistakes: [
            "Not refreshing after mutations — stale lists.",
            "Allowing double-submits while pending.",
          ],
          bestPractices: [
            "Disable submit buttons while pending.",
            "Use optimistic updates for high-value interactions.",
          ],
          exerciseTitle: "CRUD Flow",
          exerciseDescription: "Build create and delete with server routes and refresh.",
          exerciseRequirements: [
            "POST + DELETE routes",
            "Refresh after both",
            "Pending state",
          ],
          challenge: "Implement optimistic delete with rollback.",
          summary:
            "POST/PATCH/DELETE server routes plus refresh keep UI and data in sync.",
        }),
      ],
    },
    {
      title: "SEO & Metadata",
      description: "Meta tags and social sharing",
      lessons: [
        lesson({
          title: "useHead",
          slug: "nuxt-usehead",
          minutes: 15,
          objective: "Control document head with useHead.",
          intro:
            "useHead sets titles, metas, and links per page — SSR-rendered for crawlers and social platforms.",
          concepts: [
            "- useHead({ title, meta, link }).",
            "- useSeoMeta for the common SEO tags.",
            "- Values can be reactive.",
          ],
          example: {
            lang: "vue",
            code: "<script setup lang=\"ts\">\nuseSeoMeta({\n  title: () => 'Courses | FactLearning',\n  description: 'Browse 16+ free programming courses.',\n  ogTitle: 'FactLearning Courses',\n  ogDescription: 'Learn programming from Basic to Advanced.',\n});\n</script>",
            output: "Titles and OG tags render into the head.",
          },
          mistakes: [
            "Setting head client-side only (crawlers miss it).",
            "Duplicate titles without a title template.",
          ],
          bestPractices: [
            "Use useSeoMeta for standard tags.",
            "Set ogImage with absolute URLs.",
          ],
          exerciseTitle: "Meta Tags",
          exerciseDescription: "Add per-page SEO meta to three pages.",
          exerciseRequirements: [
            "useSeoMeta on each",
            "OG tags on one",
            "Reactive title on one",
          ],
          challenge: "Add JSON-LD structured data.",
          summary:
            "useHead/useSeoMeta render SSR-friendly metadata per page.",
        }),
        lesson({
          title: "Dynamic Meta",
          slug: "nuxt-dynamic-meta",
          minutes: 15,
          objective: "Generate meta from fetched data.",
          intro:
            "Fetch data, then feed it into useSeoMeta — each course or post page gets unique titles and descriptions.",
          concepts: [
            "- useFetch inside setup, then useSeoMeta with computed values.",
            "- Await data before rendering head.",
            "- Noindex for authenticated pages.",
          ],
          example: {
            lang: "vue",
            code: "<script setup lang=\"ts\">\nconst { data: course } = await useFetch('/api/courses/' + route.params.slug);\n\nuseSeoMeta({\n  title: () => course.value?.title ?? 'Course',\n  description: () => course.value?.description,\n});\n</script>",
            output: "Each course page has unique, data-driven metadata.",
          },
          mistakes: [
            "Empty titles for missing data.",
            "Indexing private pages.",
          ],
          bestPractices: [
            "Provide fallbacks.",
            "Set robots: noindex on auth pages.",
          ],
          exerciseTitle: "Dynamic Head",
          exerciseDescription: "Set meta from fetched post data on a [slug] page.",
          exerciseRequirements: [
            "Fetch-then-meta pattern",
            "Fallback title",
            "noindex on a private route",
          ],
          challenge: "Add per-page canonical URLs.",
          summary:
            "Data-driven head tags personalize SEO for dynamic pages.",
        }),
      ],
    },
    {
      title: "Error Handling & Middleware",
      description: "Error pages and app middleware",
      lessons: [
        lesson({
          title: "Error Pages",
          slug: "nuxt-errors",
          minutes: 15,
          objective: "Handle 404 and error states.",
          intro:
            "Nuxt renders error.vue for app errors and gives per-route control with definePageMeta and error handling in data fetching.",
          concepts: [
            "- error.vue in the root handles 404/500.",
            "- createError / throw createError in server routes.",
            "- showError() for client-side errors.",
          ],
          example: {
            lang: "vue",
            code: "<!-- error.vue -->\n<script setup lang=\"ts\">\nconst props = defineProps<{ error: { statusCode: number; message: string } }>();\n</script>\n\n<template>\n  <div class=\"error-page\">\n    <h1>{{ error.statusCode }}</h1>\n    <p>{{ error.message }}</p>\n    <button @click=\"clearError({ redirect: '/' })\">Go home</button>\n  </div>\n</template>",
            output: "Friendly, branded error screens.",
          },
          mistakes: [
            "Letting raw errors reach users.",
            "Forgetting the clearError redirect.",
          ],
          bestPractices: [
            "Design error pages for 404 and 500.",
            "Log errors with context.",
          ],
          exerciseTitle: "Error Page",
          exerciseDescription: "Create a styled error.vue handling 404 and 500.",
          exerciseRequirements: [
            "Error page with both cases",
            "Home redirect button",
            "Branded styling",
          ],
          challenge: "Add a not-found page for dynamic routes.",
          summary:
            "Error pages turn failures into branded, navigable states.",
        }),
        lesson({
          title: "App & Route Middleware",
          slug: "nuxt-middleware-types",
          minutes: 15,
          objective: "Use global and named middleware.",
          intro:
            "Named middleware guards specific routes; global middleware runs on every navigation. Both run on server and client.",
          concepts: [
            "- middleware/ files with defineNuxtRouteMiddleware.",
            "- Global middleware uses .global.ts suffix or is configured.",
            "- Return navigateTo to redirect.",
          ],
          example: {
            lang: "ts",
            code: "// middleware/visited.global.ts\nexport default defineNuxtRouteMiddleware(() => {\n  if (!import.meta.server) {\n    localStorage.setItem('lastVisit', new Date().toISOString());\n  }\n});\n\n// Named usage\n// pages/account.vue\ndefinePageMeta({ middleware: 'auth' });",
            output: "Global logic on every route; named guards per page.",
          },
          mistakes: [
            "Doing heavy work in global middleware.",
            "Client-only logic without import.meta.server guards.",
          ],
          bestPractices: [
            "Keep middleware fast and side-effect-light.",
            "Combine flags via to.meta for flexible guards.",
          ],
          exerciseTitle: "Middleware",
          exerciseDescription: "Add a global visited-tracking middleware and a named auth middleware.",
          exerciseRequirements: [
            "1 global middleware",
            "1 named middleware",
            "Both demonstrate redirect or side effect",
          ],
          challenge: "Read route meta to decide admin access.",
          summary:
            "Global and named middleware handle cross-cutting navigation logic.",
        }),
      ],
    },
    {
      title: "Performance",
      description: "Optimizing Nuxt apps",
      lessons: [
        lesson({
          title: "Bundle Optimization",
          slug: "nuxt-bundle",
          minutes: 20,
          objective: "Reduce bundle size with lazy loading.",
          intro:
            "Nuxt splits code automatically; you can add control with lazy components and dynamic imports for heavy libraries.",
          concepts: [
            "- <LazyComponent /> defers component loading.",
            "- dynamic imports for big libraries.",
            "- nuxt.config build analyze for bundles.",
          ],
          example: {
            lang: "vue",
            code: "<script setup lang=\"ts\">\n// Lazy-load a heavy component only when shown\nconst showCharts = ref(false);\n</script>\n\n<template>\n  <button @click=\"showCharts = true\">Load charts</button>\n  <LazyDashboardCharts v-if=\"showCharts\" />\n</template>",
            output: "The chart chunk downloads only after the button click.",
          },
          mistakes: [
            "Eager-importing every component.",
            "Ignoring the build analyze report.",
          ],
          bestPractices: [
            "Use the Lazy prefix for below-the-fold UI.",
            "Analyze bundles in CI.",
          ],
          exerciseTitle: "Lazy Load",
          exerciseDescription: "Lazy-load a heavy component and verify the chunk split.",
          exerciseRequirements: [
            "Lazy component prefix",
            "Conditional render",
            "Verify network behavior",
          ],
          challenge: "Preload the chunk on hover.",
          summary:
            "Lazy loading defers heavy code until interaction.",
        }),
        lesson({
          title: "Caching & ISR",
          slug: "nuxt-caching",
          minutes: 20,
          objective: "Cache pages with ISR and route rules.",
          intro:
            "Nuxt route rules control rendering: swr, isr, and prerender per route pattern — static speed for mostly-static content.",
          concepts: [
            "- routeRules: { '/courses': { isr: 3600 } }.",
            "- swr shares a cache across users.",
            "- Static + dynamic routes can coexist.",
          ],
          example: {
            lang: "ts",
            code: "// nuxt.config.ts\nexport default defineNuxtConfig({\n  routeRules: {\n    '/': { prerender: true },\n    '/courses': { swr: 3600 },\n    '/courses/**': { swr: 3600 },\n    '/dashboard/**': { ssr: false },\n  },\n});",
            output: "Public pages cached; dashboard client-rendered.",
          },
          mistakes: [
            "Caching personalized pages.",
            "Stale cache after content updates without invalidation.",
          ],
          bestPractices: [
            "Use swr/isr for public content.",
            "Validate personalization boundaries.",
          ],
          exerciseTitle: "Route Rules",
          exerciseDescription: "Apply route rules for static, ISR, and dynamic sections.",
          exerciseRequirements: [
            "3 rule types",
            "Verify behavior in build output",
            "Justify each choice",
          ],
          challenge: "Add on-demand invalidation via a server route.",
          summary:
            "Route rules fine-tune rendering and caching per route pattern.",
        }),
        lesson({
          title: "Images & Assets",
          slug: "nuxt-images",
          minutes: 15,
          objective: "Optimize images with Nuxt Image.",
          intro:
            "@nuxt/image optimizes images: resizing, modern formats, and lazy loading, served through your chosen provider.",
          concepts: [
            "- Add the module and use <NuxtImg />.",
            "- Props: src, sizes, loading, format.",
            "- Providers map to CDNs or local optimization.",
          ],
          example: {
            lang: "vue",
            code: "<NuxtImg\n  src=\"/images/python.jpg\"\n  alt=\"Python logo\"\n  width=\"400\"\n  height=\"225\"\n  loading=\"lazy\"\n  format=\"webp\"\n  class=\"rounded-lg\"\n/>",
            output: "Optimized, responsive images with lazy loading.",
          },
          mistakes: [
            "Using plain img tags and missing optimization.",
            "Missing dimensions — layout shift.",
          ],
          bestPractices: [
            "Set explicit sizes.",
            "Configure a provider for production.",
          ],
          exerciseTitle: "Image Optimization",
          exerciseDescription: "Replace img tags with NuxtImg across a gallery.",
          exerciseRequirements: [
            "Module installed",
            "5+ NuxtImg usages",
            "Lazy loading set",
          ],
          challenge: "Add a CDN provider configuration.",
          summary:
            "Nuxt Image automates responsive, lazy, modern-format images.",
        }),
      ],
    },
    {
      title: "Testing & Deployment",
      description: "Quality gates and shipping",
      lessons: [
        lesson({
          title: "Testing with Vitest",
          slug: "nuxt-testing",
          minutes: 25,
          objective: "Test composables, components, and pages.",
          intro:
            "@nuxt/test-utils runs Vitest against Nuxt internals — components render, composables run, and pages can be exercised.",
          concepts: [
            "- mountSuspended renders components in a Nuxt context.",
            "- mockNuxtImport replaces composables.",
            "- useTestContext for SSR tests.",
          ],
          example: {
            lang: "ts",
            code: "import { describe, expect, it } from 'vitest';\nimport { mountSuspended } from '@nuxt/test-utils/runtime';\n\nit('counter increments', async () => {\n  const wrapper = await mountSuspended(Counter, {});\n  expect(wrapper.text()).toContain('0');\n  await wrapper.find('button').trigger('click');\n  expect(wrapper.text()).toContain('1');\n});",
            output: "Nuxt-aware component tests.",
          },
          mistakes: [
            "Testing components without the Nuxt context (auto-imports fail).",
            "Testing implementation details.",
          ],
          bestPractices: [
            "Test behavior and user-visible output.",
            "Mock network boundaries.",
          ],
          exerciseTitle: "Component Test",
          exerciseDescription: "Write tests for a counter component and a composable.",
          exerciseRequirements: [
            "Vitest configured",
            "Component test",
            "Composable test",
          ],
          challenge: "Test a page with mocked useFetch.",
          summary:
            "Nuxt test-utils makes composables and components testable in context.",
        }),
        lesson({
          title: "Production Build & Deploy",
          slug: "nuxt-deploy",
          minutes: 20,
          objective: "Build and deploy Nuxt with Node or static hosting.",
          intro:
            "nuxi build outputs a Node server (with Nitro) that deploys anywhere; Nuxt also targets static or serverless platforms.",
          concepts: [
            "- npm run build then node .output/server/index.mjs.",
            "- Netlify/Vercel detect Nuxt automatically.",
            "- NITRO_PRESET env selects the deploy target.",
          ],
          syntax: {
            lang: "bash",
            code: "npm run build\nnode .output/server/index.mjs\n\n# serverless preset example\nNITRO_PRESET=netlify npm run build",
          },
          example: {
            lang: "text",
            code: ".output/\n  server/\n    index.mjs      # the Nitro server\n  public/           # static assets",
            output: "A portable server output.",
          },
          mistakes: [
            "Deploying the source instead of .output.",
            "Missing environment variables on the host.",
          ],
          bestPractices: [
            "Test the built server locally first.",
            "Set secrets in the host, never the repo.",
          ],
          exerciseTitle: "Build & Deploy",
          exerciseDescription: "Build locally, run the output server, then deploy to a host.",
          exerciseRequirements: [
            "Production build succeeds",
            "Output server runs",
            "Deployed with env config",
          ],
          challenge: "Set up CI that builds and preview-deploys.",
          summary:
            "Nitro output is portable across Node, serverless, and static hosts.",
        }),
      ],
    },
    {
      title: "Real World Project — Learning Platform UI",
      description: "Build a course platform in Nuxt",
      lessons: [
        lesson({
          title: "Planning",
          slug: "nuxt-project-plan",
          minutes: 25,
          objective: "Plan a course platform: routes, data, state.",
          intro:
            "The final module builds a mini learning platform: course catalog, course detail with curriculum, and a progress dashboard.",
          concepts: [
            "- Routes: /, /courses, /courses/[slug], /dashboard.",
            "- Server API: courses, lessons, progress.",
            "- State: Pinia or useState for progress.",
          ],
          example: {
            lang: "text",
            code: "pages/\n  index.vue             # hero + featured\n  courses/index.vue     # catalog + filters\n  courses/[slug].vue    # curriculum\n  dashboard.vue         # progress\nserver/\n  api/courses/index.ts\n  api/courses/[slug].ts\n  api/lessons/[id]/complete.post.ts",
            output: "A clear route and API map.",
          },
          mistakes: [
            "Skipping the API design before pages.",
            "Duplicating progress state across components.",
          ],
          bestPractices: [
            "Design endpoints to match page needs.",
            "Centralize progress state.",
          ],
          exerciseTitle: "Plan & Scaffold",
          exerciseDescription: "Create the routes and API structure for the platform.",
          exerciseRequirements: [
            "4 pages",
            "3 API endpoints",
            "Route rules for caching",
          ],
          challenge: "Add search to the courses API.",
          summary:
            "A plan-first approach maps routes, APIs, and state cleanly.",
        }),
        lesson({
          title: "Building Features",
          slug: "nuxt-project-features",
          minutes: 35,
          objective: "Implement catalog, detail, and progress.",
          intro:
            "Build the features: filterable catalog, curriculum with completion states, and mark-complete that updates progress everywhere.",
          concepts: [
            "- useFetch with query params for filters.",
            "- definePageMeta for layout selection.",
            "- Optimistic progress updates + refresh.",
          ],
          example: {
            lang: "vue",
            code: "<script setup lang=\"ts\">\nconst route = useRoute();\nconst { data: course, refresh } = await useFetch('/api/courses/' + route.params.slug);\n\nasync function markComplete(lessonId: string) {\n  await $fetch('/api/lessons/' + lessonId + '/complete', { method: 'POST' });\n  await refresh();\n}\n</script>\n\n<template>\n  <div v-if=\"course\">\n    <h1>{{ course.title }}</h1>\n    <ul>\n      <li v-for=\"lesson in course.lessons\" :key=\"lesson.id\">\n        {{ lesson.title }}\n        <button @click=\"markComplete(lesson.id)\">✓ Complete</button>\n      </li>\n    </ul>\n  </div>\n</template>",
            output: "Curriculum with server-persisted completion.",
          },
          mistakes: [
            "Not refreshing after mutations.",
            "No loading/empty states.",
          ],
          bestPractices: [
            "Wire states: loading, error, empty.",
            "Refetch the source of truth after mutations.",
          ],
          exerciseTitle: "Features",
          exerciseDescription: "Build catalog filters, curriculum, and progress.",
          exerciseRequirements: [
            "Filterable catalog",
            "Curriculum UI",
            "Mark-complete flow",
          ],
          challenge: "Add a progress bar per course.",
          summary:
            "Server data + mutations + refresh build the core learning loop.",
        }),
        lesson({
          title: "Ship & Harden",
          slug: "nuxt-project-ship",
          minutes: 25,
          objective: "Add auth, SEO, and deploy the platform.",
          intro:
            "Finish: require login to learn, add metadata, test the flows, and deploy.",
          concepts: [
            "- Auth middleware on /courses/[slug] and /dashboard.",
            "- useSeoMeta per course.",
            "- Production build + deploy.",
          ],
          example: {
            lang: "vue",
            code: "// pages/courses/[slug].vue\n<script setup lang=\"ts\">\ndefinePageMeta({ middleware: 'auth' });\n\nconst { data: course } = await useFetch('/api/courses/' + route.params.slug);\n\nuseSeoMeta({\n  title: () => course.value?.title ?? 'Course',\n  description: () => course.value?.description,\n});\n</script>",
            output: "Protected, SEO-optimized course pages.",
          },
          mistakes: [
            "Guarding only client-side.",
            "Skipping the production smoke test.",
          ],
          bestPractices: [
            "Enforce auth in API routes too.",
            "Smoke-test key routes after deploy.",
          ],
          exerciseTitle: "Ship",
          exerciseDescription: "Add auth + SEO and deploy the platform.",
          exerciseRequirements: [
            "Auth middleware + API checks",
            "Per-course meta",
            "Deployed and verified",
          ],
          challenge: "Add a certificate page on course completion.",
          summary:
            "Auth, SEO, and deployment complete the full-stack Nuxt project.",
        }),
      ],
    },
    {
      title: "Server-Side Rendering",
      description: "SSR, SSG, and hydration",
      lessons: [
        lesson({
          title: "SSR vs SSG vs SPA",
          slug: "nuxt-rendering-modes",
          minutes: 20,
          objective: "Choose the right rendering mode.",
          intro:
            "Nuxt renders pages on the server (SSR), at build time (SSG), or in the browser (SPA). The choice trades SEO and speed against freshness.",
          concepts: [
            "- **SSR (default)**: render per request — fresh, SEO-friendly, slightly slower.",
            "- **SSG**: render once at build — fastest, but stale until rebuilt.",
            "- **SPA**: no server rendering — instant navigation, weaker SEO.",
            "- **Hybrid**: per-route config via routeRules.",
          ],
          example: {
            lang: "ts",
            code: "// nuxt.config.ts — hybrid rendering\nexport default defineNuxtConfig({\n  ssr: true, // default: SSR everywhere\n  routeRules: {\n    '/': { prerender: true },        // SSG for the landing page\n    '/docs/**': { swr: 3600 },       // cached but refreshed hourly\n    '/dashboard/**': { ssr: false }, // client-only app section\n  },\n});",
            output: "Each route pattern gets its best rendering mode.",
          },
          mistakes: [
            "Forcing everything to SSG and serving stale user data.",
            "Disabling SSR globally when one section needs client rendering.",
          ],
          bestPractices: [
            "Default to SSR; opt into SSG for static marketing pages.",
            "Use swr/isr for content that changes occasionally.",
          ],
          exerciseTitle: "Mode Map",
          exerciseDescription: "Classify five routes of an app and configure routeRules for each.",
          exerciseRequirements: ["3+ rule types", "Justify each choice", "Verify in build output"],
          challenge: "Prerender the marketing pages and compare Lighthouse.",
          summary:
            "Rendering modes let each route trade freshness, SEO, and speed deliberately.",
        }),
        lesson({
          title: "Nitro Server Lifecycle",
          slug: "nuxt-nitro-lifecycle",
          minutes: 15,
          objective: "Understand how Nitro serves Nuxt applications.",
          intro:
            "Nitro is the server engine behind Nuxt: it compiles server routes and middleware into a portable serverless-friendly runtime.",
          concepts: [
            "- Nitro bundles server/ code into one deployable output.",
            "- Handlers run per request; utils and middleware run in the same process.",
            "- The output works on Node, serverless, and edge runtimes.",
          ],
          example: {
            lang: "bash",
            code: "npm run build\n# .output/server/index.mjs — one portable server\nnode .output/server/index.mjs\n\n# Or deploy with a preset:\n# NITRO_PRESET=netlify npm run build",
            output: "A portable server output for any hosting target.",
          },
          mistakes: [
            "Writing server code that depends on Node-only globals on edge runtimes.",
            "Forgetting that build-time env is baked in unless marked runtime.",
          ],
          bestPractices: [
            "Keep server code runtime-agnostic.",
            "Use runtimeConfig for values that change per environment.",
          ],
          exerciseTitle: "Server Output",
          exerciseDescription: "Build the app and run the Nitro output locally.",
          exerciseRequirements: ["npm run build", "Run the output server", "Smoke-test an API route"],
          challenge: "Switch the NITRO_PRESET to a serverless target and rebuild.",
          summary:
            "Nitro packages the server layer into a portable, deployable unit.",
        }),
        lesson({
          title: "Hydration & Client State",
          slug: "nuxt-hydration",
          minutes: 20,
          objective: "Understand hydration and avoid mismatches.",
          intro:
            "Hydration attaches client interactivity to server-rendered HTML. Mismatches happen when server and client render different markup.",
          concepts: [
            "- The server sends HTML; the client 'hydrates' it with event listeners.",
            "- `Date.now()`, window, and random values differ between runs.",
            "- Client-only sections use `<ClientOnly>` or onMounted.",
          ],
          example: {
            lang: "vue",
            code: "<template>\n  <div>\n    <!-- Server-safe timestamp -->\n    <p>Server time: {{ serverTime }}</p>\n\n    <!-- Client-only: never matches on the server -->\n    <ClientOnly>\n      <LiveClock />\n    </ClientOnly>\n  </div>\n</template>\n\n<script setup lang=\"ts\">\nconst serverTime = new Date().toISOString();\n</script>",
            output: "Server-safe values render everywhere; live data stays client-side.",
          },
          mistakes: [
            "Rendering window-dependent values during SSR.",
            "Ignoring hydration warnings — they usually mean real bugs.",
          ],
          bestPractices: [
            "Guard browser-only code with ClientOnly or onMounted.",
            "Make dates/random values deterministic on the server.",
          ],
          exerciseTitle: "Hydration Fix",
          exerciseDescription: "Find and fix a hydration mismatch in an app.",
          exerciseRequirements: ["Reproduce the mismatch", "Fix with ClientOnly", "Verify no warnings"],
          challenge: "Add a server-safe relative-time display.",
          summary:
            "Hydration binds client interactivity to server HTML — keep renders deterministic.",
        }),
      ],
    },
    {
      title: "Plugins & Modules",
      description: "Extending Nuxt",
      lessons: [
        lesson({
          title: "Nuxt Plugins",
          slug: "nuxt-plugins",
          minutes: 20,
          objective: "Run code at app startup with plugins.",
          intro:
            "Plugins run once when the app initializes — perfect for registering global libraries, attaching API clients, or seeding state.",
          concepts: [
            "- Files in plugins/ auto-register.",
            "- `defineNuxtPlugin((nuxtApp) => {})` receives the app context.",
            "- `provide` exposes helpers like `$api` everywhere.",
          ],
          example: {
            lang: "ts",
            code: "// plugins/api.ts\nexport default defineNuxtPlugin((nuxtApp) => {\n  const api = {\n    get: (path: string) => $fetch('/api' + path),\n    post: (path: string, body: unknown) =>\n      $fetch('/api' + path, { method: 'POST', body }),\n  };\n\n  return {\n    provide: { api },\n  };\n});\n\n// Anywhere:\n// const { $api } = useNuxtApp();\n// const posts = await $api.get('/posts');",
            output: "A global API helper available in every component.",
          },
          mistakes: [
            "Putting request-scoped logic in plugins (they run once).",
            "Over-using plugins when composables suffice.",
          ],
          bestPractices: [
            "Use plugins for true app-wide initialization.",
            "Return provides with typed keys.",
          ],
          exerciseTitle: "API Plugin",
          exerciseDescription: "Create a plugin that provides an API client.",
          exerciseRequirements: ["defineNuxtPlugin", "Provide a helper", "Use it in a page"],
          challenge: "Add a global auth header from state.",
          summary:
            "Plugins run once at startup and can provide app-wide helpers.",
        }),
        lesson({
          title: "App Lifecycle & Hooks",
          slug: "nuxt-lifecycle-hooks",
          minutes: 15,
          objective: "Hook into the app lifecycle.",
          intro:
            "Nuxt exposes lifecycle hooks so you can run logic at precise moments: app created, page started, and route changes.",
          concepts: [
            "- `app:created` and `app:beforeMount` in plugins.",
            "- `onNuxtReady` for client-only initialization.",
            "- Route hooks: onBeforeRouteLeave, onAfterEach.",
          ],
          example: {
            lang: "vue",
            code: "<script setup lang=\"ts\">\n// In a component or composable\nonNuxtReady(() => {\n  console.log('App is ready');\n});\n\n// Per-route enter/leave\nonBeforeRouteLeave((to, from) => {\n  console.log('Leaving', from.fullPath);\n});\n\n// Track page views\nconst route = useRoute();\nwatch(() => route.fullPath, (path) => {\n  console.log('Navigated to', path);\n});\n</script>",
            output: "Lifecycle callbacks for analytics and initialization.",
          },
          mistakes: [
            "Running client-only logic in server-executed setup.",
            "Duplicating route watchers across components.",
          ],
          bestPractices: [
            "Centralize analytics in one composable.",
            "Use onNuxtReady for one-time client work.",
          ],
          exerciseTitle: "Analytics Hook",
          exerciseDescription: "Build an analytics composable using route watchers and onNuxtReady.",
          exerciseRequirements: ["onNuxtReady usage", "Route watch", "Single composable"],
          challenge: "Send page views only for public pages.",
          summary:
            "Lifecycle hooks time your logic precisely.",
        }),
        lesson({
          title: "Using Modules",
          slug: "nuxt-modules",
          minutes: 15,
          objective: "Install and configure Nuxt modules.",
          intro:
            "Modules add framework-level features: Tailwind, Pinia, Image, i18n, and more are one dependency plus config away.",
          concepts: [
            "- npm install -D @nuxtjs/tailwindcss then add to `modules`.",
            "- Module options are configured inline or via `modules: [[name, options]]`.",
            "- Modules compose — layer them for features.",
          ],
          example: {
            lang: "ts",
            code: "export default defineNuxtConfig({\n  modules: [\n    '@pinia/nuxt',\n    '@nuxtjs/tailwindcss',\n    '@nuxt/image',\n    ['@nuxtjs/i18n', { locales: ['en', 'th'], defaultLocale: 'en' }],\n  ],\n});",
            output: "Pinia, Tailwind, images, and i18n enabled declaratively.",
          },
          mistakes: [
            "Hand-rolling what a maintained module already does.",
            "Ignoring module compatibility with the installed Nuxt version.",
          ],
          bestPractices: [
            "Prefer official and well-maintained modules.",
            "Check module docs for version-specific config.",
          ],
          exerciseTitle: "Module Layer",
          exerciseDescription: "Add Tailwind and Pinia modules to a project.",
          exerciseRequirements: ["Install 2 modules", "Configure one with options", "Use both in a page"],
          challenge: "Add the Image module and optimize a hero image.",
          summary:
            "Modules package framework features for declarative adoption.",
        }),
      ],
    },
    {
      title: "Security in Nuxt",
      description: "Hardening Nuxt applications",
      lessons: [
        lesson({
          title: "Security Headers & Sanitization",
          slug: "nuxt-security",
          minutes: 20,
          objective: "Harden responses and sanitize user content.",
          intro:
            "Nuxt + Nitro support security headers globally, and server-side sanitization keeps user content safe when rendered.",
          concepts: [
            "- Set headers via routeRules or the `headers` option.",
            "- Validate and sanitize markdown/HTML before storing or rendering.",
            "- Keep CSP compatible with your scripts and styles.",
          ],
          example: {
            lang: "ts",
            code: "// nuxt.config.ts\nexport default defineNuxtConfig({\n  routeRules: {\n    '/**': {\n      headers: {\n        'X-Frame-Options': 'DENY',\n        'X-Content-Type-Options': 'nosniff',\n        'Referrer-Policy': 'strict-origin-when-cross-origin',\n        'Content-Security-Policy': \"default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:\",\n      },\n    },\n  },\n});",
            output: "Every response carries the security headers.",
          },
          mistakes: [
            "Rendering user-provided HTML with v-html unescaped.",
            "Setting headers only on selected routes.",
          ],
          bestPractices: [
            "Sanitize with a library (e.g., sanitize-html) before rendering.",
            "Test CSP against your analytics and embeds.",
          ],
          exerciseTitle: "Headers & Sanitize",
          exerciseDescription: "Add global security headers and sanitize a markdown field.",
          exerciseRequirements: ["Route-rule headers", "Sanitize user content", "Verify with curl"],
          challenge: "Add a report-only CSP for safe rollout.",
          summary:
            "Global headers plus sanitization close the common XSS/clickjacking gaps.",
        }),
        lesson({
          title: "Protecting Secrets",
          slug: "nuxt-secrets",
          minutes: 15,
          objective: "Keep secrets out of the client bundle.",
          intro:
            "Runtime config is the safe channel for environment values: private values stay server-side unless exposed via `public`.",
          concepts: [
            "- `runtimeConfig.secret` is server-only; `runtimeConfig.public` ships to the client.",
            "- Override via environment variables: NUXT_SECRET.",
            "- Never import `.env` values into client components.",
          ],
          example: {
            lang: "ts",
            code: "// nuxt.config.ts\nexport default defineNuxtConfig({\n  runtimeConfig: {\n    jwtSecret: '',      // server-only — set via NUXT_JWT_SECRET\n    databaseUrl: '',    // server-only\n    public: {\n      apiBase: '/api',  // safe for the client\n    },\n  },\n});\n\n// Server route:\n// const secret = useRuntimeConfig().jwtSecret; // ok\n\n// NEVER:\n// const secret = useRuntimeConfig().jwtSecret; // in a client component",
            output: "Secrets stay server-side; only public values reach the bundle.",
          },
          mistakes: [
            "Putting API keys under runtimeConfig.public.",
            "Hardcoding secrets in nuxt.config.",
          ],
          bestPractices: [
            "Prefix env overrides NUXT_ for runtimeConfig keys.",
            "Set secrets in the hosting dashboard, not the repo.",
          ],
          exerciseTitle: "Secret Audit",
          exerciseDescription: "Move all secrets into server-only runtimeConfig.",
          exerciseRequirements: ["No secrets in public", "Env overrides work", "Client bundle clean"],
          challenge: "Verify the bundle with a grep for the secret name.",
          summary:
            "runtimeConfig keeps secrets server-side and configuration env-driven.",
        }),
        lesson({
          title: "Rate Limiting & Abuse",
          slug: "nuxt-rate-limit",
          minutes: 15,
          objective: "Throttle public and auth endpoints.",
          intro:
            "Public server routes are abuse targets. A simple per-IP limiter in server middleware protects login and heavy endpoints.",
          concepts: [
            "- Track attempts in an in-memory Map keyed by IP.",
            "- Return 429 with Retry-After on excess.",
            "- Use a real store (Redis) for multi-instance deployments.",
          ],
          example: {
            lang: "ts",
            code: "// server/middleware/rateLimit.ts\nconst hits = new Map<string, { count: number; resetAt: number }>();\n\nexport default defineEventHandler((event) => {\n  const path = event.path;\n  if (!path.startsWith('/api/auth/login')) return;\n\n  const ip = getRequestIP(event) || 'unknown';\n  const now = Date.now();\n  const entry = hits.get(ip) ?? { count: 0, resetAt: now + 60000 };\n\n  if (entry.resetAt < now) {\n    hits.set(ip, { count: 1, resetAt: now + 60000 });\n    return;\n  }\n\n  entry.count += 1;\n  hits.set(ip, entry);\n  if (entry.count > 5) {\n    throw createError({ statusCode: 429, message: 'Too many attempts' });\n  }\n});",
            output: "Five login attempts per minute per IP; then 429s.",
          },
          mistakes: [
            "Limiting only in the UI.",
            "In-memory limits breaking across multiple instances.",
          ],
          bestPractices: [
            "Key by IP plus user when available.",
            "Log blocked attempts for monitoring.",
          ],
          exerciseTitle: "Login Throttle",
          exerciseDescription: "Add a rate-limit middleware to a login endpoint.",
          exerciseRequirements: ["Middleware runs first", "429 on excess", "Retry works after window"],
          challenge: "Persist limits in a cache store for multi-instance safety.",
          summary:
            "Middleware rate limiting throttles brute force without touching app logic.",
        }),
      ],
    },
  ],
};