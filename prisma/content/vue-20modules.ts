import type { CourseContent } from "../seed-content";

export const vueBasic20Modules: CourseContent = {
  slug: "vue-basic",
  modules: [
    // Module 1: Introduction
    {
      title: "Introduction to Vue.js",
      description: "What is Vue, setup, and first app",
      lessons: [
        {
          title: "What is Vue.js?",
          slug: "vue-intro",
          content: `# What is Vue.js?

Vue.js is a progressive JavaScript framework for building user interfaces.

## Why Learn Vue?
- **Simple** — easy to learn
- **Flexible** — can be used as a library or full framework
- **Reactive** — automatic UI updates
- **Great ecosystem** — Vue Router, Pinia, Vite

## Create a Vue App
\`\`\`bash
npm create vue@latest my-app
cd my-app
npm install
npm run dev
\`\`\`

## Your First Component
\`\`\`vue
<template>
  <h1>Hello, Vue!</h1>
</template>

<script setup>
import { ref } from 'vue'
const message = ref('Hello, Vue!')
</script>
\`\`\``,
          estimatedMinutes: 15,
        },
        {
          title: "Vue Development Setup",
          slug: "vue-setup",
          content: `# Setting Up Vue

## Prerequisites
- Node.js 18+
- npm or pnpm

## IDE
- **VS Code** with Vue - Official extension
- **WebStorm**

## Project Structure
\`\`\`
src/
├── components/
├── App.vue
└── main.js
\`\`\``,
          estimatedMinutes: 10,
        },
      ],
    },
    // Module 2: Variables
    {
      title: "Reactive Variables",
      description: "ref, reactive, and state management",
      lessons: [
        {
          title: "Reactive Variables in Vue",
          slug: "vue-variables",
          content: `# Reactive Variables

## ref (Primitive Values)
\`\`\`vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
const name = ref("Alice")
const isActive = ref(true)

// Access in script: count.value
// Access in template: count
console.log(count.value) // 0
count.value++
</script>
\`\`\`

## reactive (Objects)
\`\`\`vue
<script setup>
import { reactive } from 'vue'

const person = reactive({
  name: "Alice",
  age: 25
})

// Direct access (no .value)
console.log(person.name)
person.age++
</script>
\`\`\`

## toRef and toRefs
\`\`\`vue
<script setup>
const props = defineProps({ title: String })
const titleRef = toRef(props, 'title')
</script>
\`\`\`

> **Tip:** Use \`ref\` for primitive values, \`reactive\` for objects.`,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 3: Data Types
    {
      title: "Data Types and Template Syntax",
      description: "Working with different data types in templates",
      lessons: [
        {
          title: "Template Syntax",
          slug: "vue-template-syntax",
          content: `# Template Syntax

## Text Interpolation
\`\`\`vue
<template>
  <h1>{{ message }}</h1>
  <p>{{ count + 1 }}</p>
  <p>{{ isActive ? 'Active' : 'Inactive' }}</p>
</template>
\`\`\`

## Raw HTML
\`\`\`vue
<template>
  <p v-html="rawHtml"></p>
</template>
\`\`\`

## Attributes
\`\`\`vue
<template>
  <a :href="url">Link</a>
  <button :disabled="isDisabled">Click</button>
  <img :src="imageUrl" :alt="imageName">
</template>
\`\`\`

## JavaScript Expressions
\`\`\`vue
<template>
  <p>{{ message.split('').reverse().join('') }}</p>
  <p>{{ isActive ? 'Yes' : 'No' }}</p>
  <p>{{ Math.PI.toFixed(2) }}</p>
</template>
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 4: Operators
    {
      title: "Operators in Vue",
      description: "Using JavaScript operators in Vue templates",
      lessons: [
        {
          title: "Operators in Vue",
          slug: "vue-operators",
          content: `# Operators in Vue

## Arithmetic
\`\`\`vue
<script setup>
import { ref } from 'vue'
const price = ref(100)
const quantity = ref(3)
const total = ref(price.value * quantity.value)
</script>

<template>
  <p>Price: \${{ price }}</p>
  <p>Quantity: {{ quantity }}</p>
  <p>Total: \${{ price * quantity }}</p>
</template>
\`\`\`

## Comparison
\`\`\`vue
<template>
  <p v-if="score >= 90">Grade: A</p>
  <p v-else-if="score >= 80">Grade: B</p>
  <p v-else>Grade: C</p>
</template>
\`\`\`

## Logical
\`\`\`vue
<template>
  <button v-if="isLoggedIn && isAdmin">Admin Panel</button>
  <p v-show="!isLoading || hasError">Content</p>
</template>
\`\`\``,
          estimatedMinutes: 15,
        },
      ],
    },
    // Module 5: if Statement
    {
      title: "v-if Directive",
      description: "Conditional rendering with v-if",
      lessons: [
        {
          title: "Conditional Rendering",
          slug: "vue-v-if",
          content: `# Conditional Rendering

## v-if
\`\`\`vue
<template>
  <div v-if="isLoggedIn">
    <h2>Welcome, {{ username }}!</h2>
  </div>
  <div v-else>
    <p>Please log in.</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const isLoggedIn = ref(false)
const username = ref("Alice")
</script>
\`\`\`

## v-else-if
\`\`\`vue
<template>
  <div v-if="score >= 90">Grade: A</div>
  <div v-else-if="score >= 80">Grade: B</div>
  <div v-else-if="score >= 70">Grade: C</div>
  <div v-else>Grade: F</div>
</template>
\`\`\`

## v-else
\`\`\`vue
<template>
  <div v-if="items.length > 0">
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
  <div v-else>No items found.</div>
</template>
\`\`\`

## v-if vs v-show
- **v-if**: Destroys/recreates elements
- **v-show**: Toggles CSS display`,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 6: if-else
    {
      title: "v-if-else Patterns",
      description: "Complex conditional patterns",
      lessons: [
        {
          title: "Conditional Patterns",
          slug: "vue-conditional-patterns",
          content: `# Conditional Patterns

## Template v-if-else Chain
\`\`\`vue
<template>
  <div v-if="status === 'loading'">
    <Spinner />
  </div>
  <div v-else-if="status === 'error'">
    <ErrorMessage :message="errorMsg" />
  </div>
  <div v-else>
    <DataList :data="items" />
  </div>
</template>
\`\`\`

## Component Conditions
\`\`\`vue
<template>
  <component :is="currentComponent" />
</template>

<script setup>
import { computed } from 'vue'
import AdminPanel from './AdminPanel.vue'
import UserPanel from './UserPanel.vue'

const currentComponent = computed(() => 
  isAdmin.value ? AdminPanel : UserPanel
)
</script>
\`\`\``,
          estimatedMinutes: 15,
        },
      ],
    },
    // Module 7: Switch (v-else chain)
    {
      title: "Multiple Conditions (v-else-if)",
      description: "Using v-else-if as switch-case equivalent",
      lessons: [
        {
          title: "Multiple Conditions Pattern",
          slug: "vue-switch-pattern",
          content: `# Multiple Conditions (v-else-if as switch)

\`\`\`vue
<template>
  <div v-if="day === 'Monday'">Start of week</div>
  <div v-else-if="day === 'Tuesday'">Second day</div>
  <div v-else-if="day === 'Wednesday'">Midweek</div>
  <div v-else-if="day === 'Thursday'">Almost there</div>
  <div v-else-if="day === 'Friday'">TGIF!</div>
  <div v-else-if="day === 'Saturday' || day === 'Sunday'">Weekend!</div>
  <div v-else>Unknown day</div>
</template>

<script setup>
import { ref } from 'vue'
const day = ref("Wednesday")
</script>
\`\`\`

## Switch-like with Computed
\`\`\`vue
<script setup>
import { computed } from 'vue'

const statusMessage = computed(() => {
  switch (statusCode.value) {
    case 200: return "OK"
    case 404: return "Not Found"
    case 500: return "Server Error"
    default: return "Unknown"
  }
})
</script>

<template>
  <p>{{ statusMessage }}</p>
</template>
\`\`\``,
          estimatedMinutes: 15,
        },
      ],
    },
    // Module 8: For Loop
    {
      title: "v-for Directive",
      description: "Rendering lists with v-for",
      lessons: [
        {
          title: "v-for Loop",
          slug: "vue-v-for",
          content: `# v-for Loop

## Basic Loop
\`\`\`vue
<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.name }}
    </li>
  </ul>
</template>

<script setup>
const items = ref([
  { id: 1, name: "Apple" },
  { id: 2, name: "Banana" },
  { id: 3, name: "Cherry" }
])
</script>
\`\`\`

## With Index
\`\`\`vue
<template>
  <p v-for="(item, index) in items" :key="item.id">
    {{ index + 1 }}. {{ item.name }}
  </p>
</template>
\`\`\`

## Object Loop
\`\`\`vue
<template>
  <p v-for="(value, key) in person" :key="key">
    {{ key }}: {{ value }}
  </p>
</template>

<script setup>
const person = ref({ name: "Alice", age: 25, city: "Bangkok" })
</script>
\`\`\`

## Range
\`\`\`vue
<template>
  <span v-for="n in 10" :key="n">{{ n }} </span>
</template>
\`\`\`

> **Important:** Always use \`:key\` for performance and correct DOM updates!`,
          estimatedMinutes: 25,
          exercises: [
            {
              title: "Todo List",
              description: "Create a todo list with v-for",
              requirements: ["Use v-for", "Add items", "Toggle completion", "Use :key"],
              points: 20,
            },
          ],
        },
      ],
    },
    // Module 9: While (Watcher)
    {
      title: "Watchers",
      description: "Side effects and watching changes (Vue's while pattern)",
      lessons: [
        {
          title: "Watchers",
          slug: "vue-watchers",
          content: `# Watchers

## Basic Watcher
\`\`\`vue
<script setup>
import { ref, watch } from 'vue'

const searchQuery = ref("")

watch(searchQuery, (newVal, oldVal) => {
  console.log(\`Search changed: "\${oldVal}" -> "\${newVal}"\`)
  // Trigger API call
  fetchResults(newVal)
})
</script>
\`\`\`

## Deep Watcher
\`\`\`vue
<script setup>
const user = ref({ name: "Alice", preferences: {} })

watch(user, (newVal) => {
  saveToAPI(newVal)
}, { deep: true })
</script>
\`\`\`

## Immediate Watcher
\`\`\`vue
<script setup>
watch Effect(source, callback, { immediate: true })
</script>
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 10: Loop Control
    {
      title: "List Rendering Control",
      description: "Filtering, sorting, and transforming lists",
      lessons: [
        {
          title: "List Control Patterns",
          slug: "vue-list-control",
          content: `# List Control Patterns

## Filtering with Computed
\`\`\`vue
<script setup>
import { ref, computed } from 'vue'

const items = ref([
  { id: 1, name: "Apple", active: true },
  { id: 2, name: "Banana", active: false },
  { id: 3, name: "Cherry", active: true }
])

const activeItems = computed(() => 
  items.value.filter(item => item.active)
)
</script>

<template>
  <li v-for="item in activeItems" :key="item.id">
    {{ item.name }}
  </li>
</template>
\`\`\`

## Sorting
\`\`\`vue
<script setup>
const sortedItems = computed(() => 
  [...items.value].sort((a, b) => a.name.localeCompare(b.name))
)
</script>
\`\`\`

## Transforming
\`\`\`vue
<script setup>
const itemNames = computed(() => 
  items.value.map(item => item.name.toUpperCase())
)
</script>
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 11: Arrays
    {
      title: "Arrays in Vue",
      description: "Working with arrays in Vue reactivity",
      lessons: [
        {
          title: "Reactive Arrays",
          slug: "vue-arrays",
          content: `# Reactive Arrays

## Array Methods
\`\`\`vue
<script setup>
import { ref } from 'vue'

const fruits = ref(["Apple", "Banana", "Cherry"])

// Add
fruits.value.push("Date")
fruits.value.unshift("Avocado")

// Remove
fruits.value.pop()
fruits.value.shift()
fruits.value.splice(1, 1)

// Transform
fruits.value.reverse()
fruits.value.sort()
</script>
\`\`\`

## Array in Template
\`\`\`vue
<template>
  <ul>
    <li v-for="(fruit, index) in fruits" :key="index">
      {{ fruit }}
      <button @click="removeFruit(index)">X</button>
    </li>
  </ul>
  <button @click="addFruit">Add Fruit</button>
</template>

<script setup>
const fruits = ref(["Apple", "Banana"])

function addFruit() {
  fruits.value.push("New Fruit")
}

function removeFruit(index) {
  fruits.value.splice(index, 1)
}
</script>
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 12: Advanced Arrays
    {
      title: "Array Patterns in Vue",
      description: "Computed properties and array operations",
      lessons: [
        {
          title: "Array Patterns",
          slug: "vue-array-patterns",
          content: `# Array Patterns

## Filter, Map, Reduce
\`\`\`vue
<script setup>
const products = ref([
  { name: "Laptop", price: 999 },
  { name: "Phone", price: 699 },
  { name: "Tablet", price: 499 }
])

// Filter expensive
const expensive = computed(() => 
  products.value.filter(p => p.price > 500)
)

// Map to names
const names = computed(() => 
  products.value.map(p => p.name)
)

// Reduce to total
const totalPrice = computed(() => 
  products.value.reduce((sum, p) => sum + p.price, 0)
)
</script>
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 13: Objects
    {
      title: "Objects in Vue",
      description: "Working with objects and reactive state",
      lessons: [
        {
          title: "Reactive Objects",
          slug: "vue-objects",
          content: `# Reactive Objects

## Basic Object
\`\`\`vue
<script setup>
import { reactive } from 'vue'

const user = reactive({
  name: "Alice",
  age: 25,
  hobbies: ["reading", "coding"]
})

// Modify directly
user.age = 26
user.hobbies.push("gaming")
</script>
\`\`\`

## Props (Object Passing)
\`\`\`vue
<!-- Parent -->
<template>
  <UserCard :user="user" />
</template>

<!-- UserCard.vue -->
<script setup>
const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})
</script>
\`\`\`

## Emit (Object Events)
\`\`\`vue
<script setup>
const emit = defineEmits(['update', 'delete'])

function handleUpdate() {
  emit('update', { id: 1, name: "Updated" })
}
</script>
\`\`\``,
          estimatedMinutes: 25,
          exercises: [
            {
              title: "User Profile",
              description: "Create a user profile component with reactive object",
              requirements: ["Use reactive object", "Display user info", "Allow editing", "Emit changes"],
              points: 25,
            },
          ],
        },
      ],
    },
    // Module 14: Advanced Objects
    {
      title: "Object Patterns",
      description: "Destructuring, computed from objects, and store",
      lessons: [
        {
          title: "Object Patterns",
          slug: "vue-object-patterns",
          content: `# Object Patterns

## Destructuring
\`\`\`vue
<script setup>
import { reactive } from 'vue'

const user = reactive({ name: "Alice", age: 25 })
const { name, age } = user
</script>
\`\`\`

## Computed from Objects
\`\`\`vue
<script setup>
const product = reactive({
  name: "Laptop",
  price: 999,
  quantity: 1
})

const total = computed(() => product.price * product.quantity)
</script>

<template>
  <p>{{ product.name }}: \${{ total }}</p>
</template>
\`\`\`

## Pinia Store
\`\`\`vue
// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  actions: {
    increment() { this.count++ }
  }
})
\`\`\``,
          estimatedMinutes: 25,
        },
      ],
    },
    // Module 15: Objects - Methods
    {
      title: "Methods and Events",
      description: "Handling events and method calls",
      lessons: [
        {
          title: "Methods and Events",
          slug: "vue-methods-events",
          content: `# Methods and Events

## Methods
\`\`\`vue
<script setup>
function greet() {
  console.log("Hello!")
}

function add(a, b) {
  return a + b
}
</script>

<template>
  <button @click="greet">Click</button>
  <p>{{ add(3, 4) }}</p>
</template>
\`\`\`

## Event Handling
\`\`\`vue
<template>
  <!-- Basic click -->
  <button @click="handleClick">Click</button>
  
  <!-- With parameters -->
  <button @click="handleClick($event, 'data')">Click</button>
  
  <!-- Modifiers -->
  <form @submit.prevent="handleSubmit">
    <input @keyup.enter="handleEnter">
    <button @click.stop="handleClick">Stop</button>
  </form>
</template>
\`\`\`

## Event Modifiers
- \`.prevent\` — preventDefault
- \`.stop\` — stopPropagation
- \`.once\` — trigger once
- \`.self\` — only if target is element`,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 16: Functions
    {
      title: "Functions in Vue",
      description: "Component functions and composition",
      lessons: [
        {
          title: "Functions in Vue",
          slug: "vue-functions",
          content: `# Functions

## Component Function
\`\`\`vue
<script setup>
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

function formatDate(date) {
  return new Date(date).toLocaleDateString()
}
</script>

<template>
  <p>{{ formatCurrency(price) }}</p>
  <p>{{ formatDate(createdAt) }}</p>
</template>
\`\`\`

## Composition Functions (Composables)
\`\`\`vue
// composables/useCounter.js
import { ref } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  function increment() { count.value++ }
  function decrement() { count.value-- }
  function reset() { count.value = initialValue }
  
  return { count, increment, decrement, reset }
}
\`\`\`

## Using Composable
\`\`\`vue
<script setup>
import { useCounter } from './composables/useCounter'

const { count, increment, decrement } = useCounter(10)
</script>

<template>
  <p>{{ count }}</p>
  <button @click="increment">+</button>
  <button @click="decrement">-</button>
</template>
\`\`\``,
          estimatedMinutes: 25,
        },
      ],
    },
    // Module 17: Advanced Functions
    {
      title: "Lifecycle and Props",
      description: "Component lifecycle and props/emits",
      lessons: [
        {
          title: "Lifecycle and Props",
          slug: "vue-lifecycle-props",
          content: `# Lifecycle Hooks

\`\`\`vue
<script setup>
import { onMounted, onUpdated, onUnmounted } from 'vue'

onMounted(() => {
  console.log("Component mounted")
  // Fetch data, set up listeners
})

onUpdated(() => {
  console.log("Component updated")
})

onUnmounted(() => {
  console.log("Component unmounted")
  // Clean up
})
</script>
\`\`\`

# Props

\`\`\`vue
<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    default: 0
  }
})
</script>
\`\`\`

# Emits

\`\`\`vue
<script setup>
const emit = defineEmits(['update', 'delete'])

function handleDelete() {
  emit('delete', props.id)
}
</script>
\`\`\``,
          estimatedMinutes: 25,
        },
      ],
    },
    // Module 18: Slots and Components
    {
      title: "Slots and Components",
      description: "Component composition and slot patterns",
      lessons: [
        {
          title: "Slots and Component Composition",
          slug: "vue-slots",
          content: `# Slots

## Basic Slot
\`\`\`vue
<!-- Card.vue -->
<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<!-- Usage -->
<template>
  <Card>
    <h2>Title</h2>
    <p>Content</p>
  </Card>
</template>
\`\`\`

## Named Slots
\`\`\`vue
<!-- Layout.vue -->
<template>
  <header><slot name="header"></slot></header>
  <main><slot></slot></main>
  <footer><slot name="footer"></slot></footer>
</template>

<!-- Usage -->
<template>
  <Layout>
    <template #header>My Header</template>
    <template #default>Main Content</template>
    <template #footer>My Footer</template>
  </Layout>
</template>
\`\`\`

## Scoped Slots
\`\`\`vue
<!-- List.vue -->
<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      <slot :item="item"></slot>
    </li>
  </ul>
</template>

<!-- Usage -->
<template>
  <List :items="items">
    <template #default="{ item }">
      <span>{{ item.name }}</span>
    </template>
  </List>
</template>
\`\`\``,
          estimatedMinutes: 25,
        },
      ],
    },
    // Module 19: Form Handling
    {
      title: "Forms and Input",
      description: "Two-way binding and form handling",
      lessons: [
        {
          title: "Form Handling",
          slug: "vue-forms",
          content: `# Forms

## v-model (Two-way Binding)
\`\`\`vue
<template>
  <input v-model="name" placeholder="Name">
  <textarea v-model="message"></textarea>
  <select v-model="selected">
    <option value="A">Option A</option>
    <option value="B">Option B</option>
  </select>
  <input type="checkbox" v-model="agreed">
</template>

<script setup>
import { ref } from 'vue'
const name = ref("")
const message = ref("")
const selected = ref("A")
const agreed = ref(false)
</script>
\`\`\`

## Form Submission
\`\`\`vue
<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="form.email" type="email" required>
    <input v-model="form.password" type="password" required>
    <button type="submit">Login</button>
  </form>
</template>

<script setup>
const form = reactive({ email: '', password: '' })

function handleSubmit() {
  console.log("Submit:", form)
}
</script>
\`\`\`

## Form Validation
\`\`\`vue
<script setup>
import { ref, computed } from 'vue'

const email = ref("")
const isValid = computed(() => /^[^@]+@[^@]+\\.[^@]+$/.test(email.value))
</script>

<template>
  <input v-model="email" :class="{ error: !isValid && email }">
  <span v-if="!isValid && email">Invalid email</span>
</template>
\`\`\``,
          estimatedMinutes: 25,
        },
      ],
    },
    // Module 20: Project Application
    {
      title: "Project — Todo App",
      description: "Build a complete todo application",
      lessons: [
        {
          title: "Todo Application",
          slug: "vue-project-todo",
          content: `# Todo Application

## Complete App.vue
\`\`\`vue
<template>
  <div class="app">
    <h1>Todo App</h1>
    
    <!-- Add Todo -->
    <form @submit.prevent="addTodo">
      <input v-model="newTodo" placeholder="Add todo..." />
      <button type="submit">Add</button>
    </form>
    
    <!-- Filter -->
    <div>
      <button @click="filter = 'all'" :class="{ active: filter === 'all' }">All</button>
      <button @click="filter = 'active'" :class="{ active: filter === 'active' }">Active</button>
      <button @click="filter = 'completed'" :class="{ active: filter === 'completed' }">Done</button>
    </div>
    
    <!-- Todo List -->
    <ul>
      <li v-for="todo in filteredTodos" :key="todo.id">
        <input type="checkbox" v-model="todo.done">
        <span :class="{ done: todo.done }">{{ todo.text }}</span>
        <button @click="removeTodo(todo.id)">X</button>
      </li>
    </ul>
    
    <!-- Stats -->
    <p>{{ activeTodos }} items left</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const newTodo = ref("")
const filter = ref("all")
const todos = ref([
  { id: 1, text: "Learn Vue", done: true },
  { id: 2, text: "Build App", done: false }
])

const filteredTodos = computed(() => {
  if (filter.value === 'active') return todos.value.filter(t => !t.done)
  if (filter.value === 'completed') return todos.value.filter(t => t.done)
  return todos.value
})

const activeTodos = computed(() => 
  todos.value.filter(t => !t.done).length
)

function addTodo() {
  if (newTodo.value.trim()) {
    todos.value.push({
      id: Date.now(),
      text: newTodo.value,
      done: false
    })
    newTodo.value = ""
  }
}

function removeTodo(id) {
  todos.value = todos.value.filter(t => t.id !== id)
}
</script>

<style scoped>
.done { text-decoration: line-through; color: #999; }
.active { font-weight: bold; }
</style>
\`\`\`

## Concepts Used
✅ Reactive Variables (ref, computed)
✅ Template Syntax ({{ }}, :binding)
✅ v-if / v-else-if / v-else
✅ v-for with :key
✅ v-model (two-way binding)
✅ @click, @submit.prevent
✅ Computed Properties
✅ Methods
✅ Array Methods (filter, map)`,
          estimatedMinutes: 40,
          exercises: [
            {
              title: "Extend Todo App",
              description: "Add categories, due dates, and local storage",
              requirements: ["Add category filter", "Add due date", "Save to localStorage", "Load on startup"],
              points: 30,
            },
          ],
        },
      ],
    },
  ],
};
