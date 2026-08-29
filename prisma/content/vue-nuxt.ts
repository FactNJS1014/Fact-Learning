import type { CourseContent } from "../seed-content";

export const vueBasic: CourseContent = {
  slug: "vue-basic",
  modules: [
    {
      title: "Getting Started with Vue",
      description: "Introduction, setup, and core concepts",
      lessons: [
        {
          title: "Introduction to Vue.js",
          slug: "intro-vue",
          content: `# Introduction to Vue.js

Vue.js is a progressive JavaScript framework for building UIs.

## Create a Vue App

\`\`\`bash
npm create vue@latest my-app
cd my-app
npm install
npm run dev
\`\`\`

## Your First Component

\`\`\`vue
<script setup>
import { ref } from 'vue'
const message = ref('Hello Vue!')
</script>

<template>
  <h1>{{ message }}</h1>
</template>
\`\`\`

## Vue 3 Features
- **Composition API** — better code organization
- **\`<script setup>\`** — less boilerplate
- **Reactivity system** — automatic DOM updates
- **Teleport** — render content elsewhere in DOM
- **Suspense** — async component loading`,
          estimatedMinutes: 15,
        },
        {
          title: "Template Syntax",
          slug: "vue-template",
          content: `# Template Syntax

## Data Binding

\`\`\`vue
<template>
  <!-- Text interpolation -->
  <h1>{{ title }}</h1>

  <!-- Raw HTML -->
  <p v-html="htmlContent"></p>

  <!-- Attribute binding -->
  <a :href="url">Link</a>
  <img :src="imageUrl" :alt="title">

  <!-- Dynamic attributes -->
  <div :class="{ active: isActive, 'text-bold': isBold }">
  <div :style="{ color: textColor }">
</template>
\`\`\`

## Conditional Rendering

\`\`\`vue
<template>
  <div v-if="isLoggedIn">Welcome!</div>
  <div v-else>Please login</div>
  <div v-show="isVisible">Shown/Hidden (CSS display)</div>
</template>
\`\`\`

## List Rendering

\`\`\`vue
<template>
  <ul>
    <li v-for="(item, index) in items" :key="item.id">
      {{ index }}. {{ item.name }}
    </li>
  </ul>
</template>
\`\`\``,
          estimatedMinutes: 20,
        },
        {
          title: "Reactivity and State",
          slug: "vue-reactivity",
          content: `# Reactivity

## ref() and reactive()

\`\`\`vue
<script setup>
import { ref, reactive } from 'vue'

// ref — for primitives
const count = ref(0)
count.value++  // .value needed in script

// reactive — for objects
const state = reactive({
  name: 'Alice',
  age: 25
})
state.age++  // no .value needed
</script>

<template>
  <!-- Auto-unwrapped in template -->
  <p>{{ count }}</p>
  <p>{{ state.name }}</p>
</template>
\`\`\`

## computed()

\`\`\`vue
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed(() => {
  return firstName.value + ' ' + lastName.value
})
</script>
\`\`\`

## watch()

\`\`\`vue
<script setup>
import { ref, watch } from 'vue'

const search = ref('')

watch(search, (newVal, oldVal) => {
  console.log(\`Search changed: \${oldVal} → \${newVal}\`)
})
</script>
\`\`\``,
          estimatedMinutes: 25,
        },
      ],
    },
    {
      title: "Components and Props",
      description: "Building reusable components",
      lessons: [
        {
          title: "Props and Events",
          slug: "vue-props-events",
          content: `# Props and Events

## Defining Props

\`\`\`vue
<script setup>
// Child component
const props = defineProps({
  title: String,
  count: { type: Number, default: 0 },
  items: { type: Array, required: true }
})

const emit = defineEmits(['update', 'delete'])
</script>

<template>
  <h2>{{ title }}</h2>
  <button @click="emit('delete')">Delete</button>
</template>
\`\`\`

## Using Component

\`\`\`vue
<script setup>
import UserCard from './UserCard.vue'
import { ref } from 'vue'

const users = ref([...])
function handleDelete(id) {
  users.value = users.value.filter(u => u.id !== id)
}
</script>

<template>
  <UserCard
    v-for="user in users"
    :key="user.id"
    :title="user.name"
    @delete="handleDelete(user.id)"
  />
</template>
\`\`\`

## v-model

\`\`\`vue
<!-- Parent -->
<ChildInput v-model="searchQuery" />

<!-- Child -->
<script setup>
const model = defineModel()  // Vue 3.4+
</script>
<template>
  <input v-model="model" />
</template>
\`\`\``,
          estimatedMinutes: 25,
        },
        {
          title: "Slots",
          slug: "vue-slots",
          content: `# Slots

## Default Slot

\`\`\`vue
<!-- Card.vue -->
<template>
  <div class="card">
    <slot />  <!-- Default slot content here -->
  </div>
</template>

<!-- Usage -->
<Card>
  <p>Card content here</p>
</Card>
\`\`\`

## Named Slots

\`\`\`vue
<!-- Layout.vue -->
<template>
  <header><slot name="header" /></header>
  <main><slot /></main>
  <footer><slot name="footer" /></footer>
</template>

<!-- Usage -->
<Layout>
  <template #header>
    <h1>Page Title</h1>
  </template>

  <p>Main content</p>

  <template #footer>
    <p>Copyright 2024</p>
  </template>
</Layout>
\`\`\`

## Scoped Slots

\`\`\`vue
<!-- TodoList.vue -->
<template>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      <slot :todo="todo" />
    </li>
  </ul>
</template>

<!-- Usage -->
<TodoList :todos="todos">
  <template #default="{ todo }">
    <span :class="{ done: todo.done }">{{ todo.text }}</span>
  </template>
</TodoList>
\`\`\``,
          estimatedMinutes: 20,
        },
        {
          title: "Lifecycle Hooks",
          slug: "vue-lifecycle",
          content: `# Lifecycle Hooks

\`\`\`vue
<script setup>
import {
  onBeforeMount, onMounted,
  onBeforeUpdate, onUpdated,
  onBeforeUnmount, onUnmounted
} from 'vue'

// Setup runs before mount (like created + beforeCreate)
console.log('Component setup')

onBeforeMount(() => {
  console.log('Before mount — DOM not ready')
})

onMounted(() => {
  console.log('Mounted — DOM ready, safe to query')
  // Fetch data, initialize libraries
})

onUpdated(() => {
  console.log('Re-rendered')
})

onUnmounted(() => {
  console.log('Cleanup: timers, event listeners')
})
</script>
\`\`\`

## Common Patterns

\`\`\`vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const data = ref(null)
const timer = ref(null)

onMounted(async () => {
  data.value = await fetchData()
  timer.value = setInterval(() => updateData(), 5000)
})

onUnmounted(() => {
  clearInterval(timer.value)  // Always cleanup!
})
</script>
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    {
      title: "Vue Router and Store",
      description: "Navigation and state management",
      lessons: [
        {
          title: "Vue Router",
          slug: "vue-router",
          content: `# Vue Router

## Setup

\`\`\`bash
npm install vue-router
\`\`\`

\`\`\`javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/users/:id', component: () => import('../views/User.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
\`\`\`

## Navigation

\`\`\`vue
<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </nav>
  <RouterView />
</template>
\`\`\`

## Route Params

\`\`\`vue
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const userId = route.params.id
</script>
\`\`\`

## Navigation Guards

\`\`\`javascript
router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !isLoggedIn()) {
    return '/login'
  }
})
\`\`\``,
          estimatedMinutes: 25,
        },
        {
          title: "Pinia State Management",
          slug: "vue-pinia",
          content: `# Pinia (State Management)

## Setup

\`\`\`bash
npm install pinia
\`\`\`

\`\`\`javascript
// stores/auth.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(null)

  async function login(email, password) {
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
    const data = await res.json()
    user.value = data.user
    token.value = data.token
  }

  function logout() {
    user.value = null
    token.value = null
  }

  return { user, token, login, logout }
})
\`\`\`

## Using Store

\`\`\`vue
<script setup>
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

async function handleLogin() {
  await auth.login(email, password)
}
</script>

<template>
  <div v-if="auth.user">Welcome, {{ auth.user.name }}</div>
  <button @click="auth.logout()">Logout</button>
</template>
\`\`\``,
          estimatedMinutes: 25,
          exercises: [
            {
              title: "Build a Todo App",
              description: "Create a Vue.js todo app with Pinia store, Router, and full CRUD",
              requirements: ["Use Composition API", "Pinia store for state", "Router for navigation", "Add, toggle, delete todos"],
              points: 30,
            },
          ],
        },
        {
          title: "Fetch API and HTTP Requests",
          slug: "vue-http",
          content: `# HTTP Requests

## Fetch API

\`\`\`vue
<script setup>
import { ref, onMounted } from 'vue'

const users = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const res = await fetch('/api/users')
    if (!res.ok) throw new Error('Failed to fetch')
    users.value = await res.json()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})
</script>
\`\`\`

## Axios Alternative

\`\`\`javascript
import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: { Authorization: \`Bearer \${token}\` }
})

// GET
const { data } = await api.get('/users')

// POST
const { data } = await api.post('/users', { name: 'Alice' })
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    {
      title: "Testing and Deployment",
      description: "Unit tests and production deployment",
      lessons: [
        {
          title: "Unit Testing with Vitest",
          slug: "vue-testing",
          content: `# Testing Vue Components

## Setup

\`\`\`bash
npm install -D vitest @vue/test-utils
\`\`\`

## Component Test

\`\`\`javascript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Counter from '../Counter.vue'

describe('Counter', () => {
  it('increments count', async () => {
    const wrapper = mount(Counter)
    expect(wrapper.text()).toContain('0')

    await wrapper.find('button').trigger('click')
    expect(wrapper.text()).toContain('1')
  })

  it('accepts initial count prop', () => {
    const wrapper = mount(Counter, { props: { initial: 5 } })
    expect(wrapper.text()).toContain('5')
  })
})
\`\`\`

## Run Tests

\`\`\`bash
npx vitest          # watch mode
npx vitest run      # single run
npx vitest --coverage
\`\`\``,
          estimatedMinutes: 20,
        },
        {
          title: "Build and Deployment",
          slug: "vue-deployment",
          content: `# Build and Deployment

## Production Build

\`\`\`bash
npm run build
# Output in dist/
\`\`\`

## Preview Locally

\`\`\`bash
npm run preview
\`\`\`

## Deployment Options

### Netlify
1. Push to GitHub
2. Connect repository in Netlify
3. Build command: \`npm run build\`
4. Publish directory: \`dist\`

### Vercel
\`\`\`bash
npm i -g vercel
vercel --prod
\`\`\`

### Docker

\`\`\`dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
\`\`\`

## Environment Variables

\`\`\`bash
# .env
VITE_API_URL=https://api.example.com
\`\`\`

Access: \`import.meta.env.VITE_API_URL\``,
          estimatedMinutes: 20,
        },
        {
          title: "Performance Optimization",
          slug: "vue-performance",
          content: `# Performance Optimization

## Lazy Loading Components

\`\`\`vue
<script setup>
const HeavyComponent = defineAsyncComponent(() =>
  import('./HeavyComponent.vue')
)
</script>
\`\`\`

## Lazy Loading Routes

\`\`\`javascript
const routes = [
  {
    path: '/dashboard',
    component: () => import('../views/Dashboard.vue')
  }
]
\`\`\`

## v-memo (Vue 3.2+)

\`\`\`vue
<div v-memo="[item.id, item.selected]">
  {{ item.name }} — only re-renders when id/selected changes
</div>
\`\`\`

## List Virtualization

\`\`\`bash
npm install @tanstack/vue-virtual
\`\`\`

## DevTools Profiling

\`\`\`bash
# Install Vue DevTools browser extension
# Use Performance tab to find slow components
# Use Timeline to track re-renders
\`\`\`

## Key Tips
- Use \`v-if\` over \`v-show\` for rarely shown items
- Keep component trees shallow
- Use \`shallowRef\` for large objects
- Avoid computed in templates (precompute in script)`,
          estimatedMinutes: 25,
        },
      ],
    },
  ],
};

export const nuxtjsBasic: CourseContent = {
  slug: "nuxtjs-basic",
  modules: [
    {
      title: "Getting Started with Nuxt.js",
      description: "Introduction, setup, and core concepts",
      lessons: [
        {
          title: "Introduction to Nuxt.js",
          slug: "intro-nuxt",
          content: `# Introduction to Nuxt.js

Nuxt.js is a Vue.js framework with server-side rendering, file-based routing, and auto-imports.

## Create a Nuxt App

\`\`\`bash
npx nuxi init my-app
cd my-app
npm install
npm run dev
\`\`\`

## Key Features
- **File-based routing** — pages/ directory
- **Auto-imports** — ref, computed, components
- **Server routes** — server/api/ directory
- **SSR/SSG** — server-side rendering out of the box
- **Nitro engine** — deploy anywhere`,
          estimatedMinutes: 15,
        },
        {
          title: "File-Based Routing",
          slug: "nuxt-routing",
          content: `# File-Based Routing

## Pages Directory

\`\`\`
pages/
├── index.vue          → /
├── about.vue          → /about
├── blog/
│   ├── index.vue      → /blog
│   └── [slug].vue     → /blog/:slug
└── users/
    └── [id].vue       → /users/:id
\`\`\`

## Layouts

\`\`\`vue
<!-- layouts/default.vue -->
<template>
  <header>Nav</header>
  <slot />
  <footer>Footer</footer>
</template>
\`\`\`

## Navigation

\`\`\`vue
<template>
  <NuxtLink to="/about">About</NuxtLink>
  <NuxtLink :to="{ path: '/users', params: { id: 1 } }">User 1</NuxtLink>
  <button @click="$router.push('/login')">Login</button>
</template>
\`\`\`

## Route Middleware

\`\`\`javascript
// middleware/auth.js
export default defineNuxtRouteMiddleware((to) => {
  const user = useAuthUser()
  if (!user && to.path !== '/login') {
    return navigateTo('/login')
  }
})
\`\`\``,
          estimatedMinutes: 25,
        },
        {
          title: "Data Fetching",
          slug: "nuxt-fetching",
          content: `# Data Fetching

## useFetch

\`\`\`vue
<script setup>
const { data: posts, pending, error } = await useFetch('/api/posts')

if (error.value) {
  throw createError({ statusCode: 500, message: 'Failed to load' })
}
</script>

<template>
  <div v-if="pending">Loading...</div>
  <div v-else>
    <article v-for="post in posts" :key="post.id">
      {{ post.title }}
    </article>
  </div>
</template>
\`\`\`

## useAsyncData

\`\`\`vue
<script setup>
const { data: user } = await useAsyncData('user', () =>
  $fetch('/api/user')
)
</script>
\`\`\`

## useLazyFetch (Client-side only)

\`\`\`vue
<script setup>
// Doesn't block SSR
const { data } = useLazyFetch('/api/posts')
</script>
\`\`\``,
          estimatedMinutes: 25,
        },
      ],
    },
    {
      title: "Server Routes and API",
      description: "Building APIs with Nuxt",
      lessons: [
        {
          title: "Server API Routes",
          slug: "nuxt-server-api",
          content: `# Server API Routes

## Create API

\`\`\`javascript
// server/api/hello.get.ts
export default defineEventHandler((event) => {
  return { message: 'Hello from API!' }
})
\`\`\`

## POST Route

\`\`\`javascript
// server/api/users.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  // Save to database
  return { user: body }
})
\`\`\`

## Route Parameters

\`\`\`javascript
// server/api/users/[id].get.ts
export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  return { userId: id }
})
\`\`\`

## Middleware

\`\`\`javascript
// server/middleware/auth.ts
export default defineEventHandler((event) => {
  const token = getHeader(event, 'Authorization')
  if (!token) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }
})
\`\`\``,
          estimatedMinutes: 25,
        },
        {
          title: "Server Utilities",
          slug: "nuxt-server-utils",
          content: `# Server Utilities

## Database with Prisma

\`\`\`javascript
// server/utils/db.ts
import { PrismaClient } from '@prisma/client'

const prisma = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

export default prisma
\`\`\`

## Usage in API

\`\`\`javascript
// server/api/posts.get.ts
export default defineEventHandler(async () => {
  const posts = await prisma.post.findMany({
    include: { author: true }
  })
  return posts
})
\`\`\`

## Session Helper

\`\`\`javascript
// server/utils/session.ts
export function getSession(event) {
  return getCookie(event, 'session')
}

export function requireSession(event) {
  const session = getSession(event)
  if (!session) {
    throw createError({ statusCode: 401 })
  }
  return session
}
\`\`\``,
          estimatedMinutes: 20,
        },
        {
          title: "Authentication in Nuxt",
          slug: "nuxt-auth",
          content: `# Authentication

## Login API

\`\`\`javascript
// server/api/auth/login.post.ts
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !await bcrypt.compare(password, user.passwordHash)) {
    throw createError({ statusCode: 401, message: 'Invalid credentials' })
  }

  const token = generateToken(user.id)
  setCookie(event, 'auth_token', token, {
    httpOnly: true,
    maxAge: 86400
  })

  return { user: { id: user.id, name: user.name, email: user.email } }
})
\`\`\`

## Auth Composable

\`\`\`vue
<script setup>
// composables/useAuth.js
export function useAuth() {
  const user = useState('user', () => null)

  async function login(email, password) {
    const data = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email, password }
    })
    user.value = data.user
    navigateTo('/dashboard')
  }

  async function logout() {
    await $fetch('/api/auth/logout', { method: 'POST' })
    user.value = null
    navigateTo('/login')
  }

  return { user, login, logout }
}
\`\`\``,
          estimatedMinutes: 30,
        },
      ],
    },
    {
      title: "Advanced Nuxt",
      description: "Deployment and optimization",
      lessons: [
        {
          title: "Auto-Imports and Modules",
          slug: "nuxt-auto-imports",
          content: `# Auto-Imports

## What's Auto-Imported
- Vue API: ref, computed, watch, onMounted
- Nuxt utilities: useState, useFetch, navigateTo
- Components in components/ directory
- Composables in composables/ directory

## Custom Auto-Import

\`\`\`javascript
// nuxt.config.ts
export default defineNuxtConfig({
  imports: {
    dirs: ['utils', 'composables']
  }
})
\`\`\`

## Nuxt Modules

\`\`\`javascript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
  ]
})
\`\`\``,
          estimatedMinutes: 20,
        },
        {
          title: "Deployment",
          slug: "nuxt-deployment",
          content: `# Deployment

## Production Build

\`\`\`bash
npm run build
\`\`\`

## Deploy to Netlify

\`\`\`bash
npm install
npm run build
# Publish directory: .output/public
\`\`\`

## Docker

\`\`\`dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm ci && npm run build
EXPOSE 3000
CMD node .output/server/index.mjs
\`\`\`

## Environment Variables

\`\`\`javascript
// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    // Server-only
    dbUrl: process.env.DATABASE_URL,
    // Client-side (prefix with public)
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE
    }
  }
})
\`\`\`

Access: \`useRuntimeConfig().public.apiBase\``,
          estimatedMinutes: 20,
        },
        {
          title: "Performance and SEO",
          slug: "nuxt-performance",
          content: `# Performance and SEO

## SEO Meta Tags

\`\`\`vue
<script setup>
useHead({
  title: 'My Page',
  meta: [
    { name: 'description', content: 'Page description' },
    { property: 'og:title', content: 'My Page' },
  ]
})
</script>
\`\`\`

## Image Optimization

\`\`\`vue
<NuxtImg src="/hero.jpg" width="800" height="400" loading="lazy" />
\`\`\`

## Caching

\`\`\`javascript
// server/api/posts.get.ts
export default defineEventHandler(async (event) => {
  return cachedFunction(async () => {
    return await prisma.post.findMany()
  }, {
    maxAge: 60,
    name: 'posts'
  })
})
\`\`\`

## Key Performance Tips
- Use SSR for SEO-critical pages
- Use CSR for dynamic dashboards
- Lazy-load heavy components
- Use \`NuxtImg\` for optimized images
- Enable Gzip/Brotli compression
- Use CDN for static assets`,
          estimatedMinutes: 20,
        },
      ],
    },
  ],
};
