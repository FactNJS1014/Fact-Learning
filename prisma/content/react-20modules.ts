import type { CourseContent } from "../seed-content";
import { lesson } from "./lesson-builder";

export const reactBasic20Modules: CourseContent = {
  slug: "react-basic",
  modules: [
    {
      title: "Introduction to React",
      description: "What React is, why it exists, and your first component",
      lessons: [
        lesson({
          title: "What is React?",
          slug: "react-what-is",
          minutes: 12,
          objective: "Understand what React is and when to use it.",
          intro:
            "React is a JavaScript library for building user interfaces. It was created by Facebook in 2013 and is now the most popular UI library in the world. React lets you describe what the UI should look like and it handles updating the DOM efficiently when data changes.",
          concepts: [
            "- **Component-based**: UI is built from small, reusable pieces called components.",
            "- **Declarative**: You describe the result, React figures out how to get there.",
            "- **Virtual DOM**: React keeps an in-memory copy of the UI and only updates what changed.",
            "- **Huge ecosystem**: works with thousands of libraries, tools, and frameworks like Next.js.",
          ],
          example: {
            lang: "jsx",
            code: "import React from 'react';\n\nfunction App() {\n  return <h1>Hello, React!</h1>;\n}\n\nexport default App;",
            output: "Renders: Hello, React!",
          },
          mistakes: [
            "Thinking React is a full framework with routing and data layer built in (it is a library).",
            "Mutating the DOM directly with document.querySelector instead of using React state.",
          ],
          bestPractices: [
            "Learn JavaScript fundamentals first — React is just JavaScript.",
            "Start with function components and hooks, not class components.",
          ],
          exerciseTitle: "Your First Component",
          exerciseDescription: "Create an App component that renders your name in a heading.",
          exerciseRequirements: [
            "Create a function component named App",
            "Return an h1 with your name",
            "Export the component",
          ],
          challenge: "Add a paragraph under the heading describing what you want to build with React.",
          summary:
            "React is a declarative, component-based UI library. Components describe the UI and React syncs it with the DOM.",
        }),
        lesson({
          title: "Setting Up a React Project",
          slug: "react-setup",
          minutes: 15,
          objective: "Create and run a React project with Vite.",
          intro:
            "Modern React projects are created with build tools that handle bundling, hot reload, and JSX compilation. Vite is the fastest and most popular choice today.",
          concepts: [
            "- **Vite**: fast dev server with instant hot module replacement.",
            "- **Create React App**: older tooling, no longer recommended for new projects.",
            "- **JSX**: JavaScript syntax extension that lets you write HTML-like markup inside JS.",
          ],
          syntax: {
            lang: "bash",
            code: "npm create vite@latest my-app -- --template react\ncd my-app\nnpm install\nnpm run dev",
          },
          example: {
            lang: "jsx",
            code: "// src/App.jsx — the entry component\nimport './App.css';\n\nfunction App() {\n  return (\n    <div className=\"app\">\n      <h1>Vite + React</h1>\n    </div>\n  );\n}\n\nexport default App;",
            output: "Dev server starts at http://localhost:5173",
          },
          mistakes: [
            "Running the app from the wrong directory after scaffolding.",
            "Forgetting that Vite's dev server uses a different port than CRA (5173 not 3000).",
          ],
          bestPractices: [
            "Keep component files in src/components.",
            "Use .jsx/.tsx extensions for files that contain JSX.",
          ],
          exerciseTitle: "Scaffold a Project",
          exerciseDescription: "Create a new Vite React project and run the dev server.",
          exerciseRequirements: [
            "Run npm create vite with the react template",
            "Install dependencies",
            "Start the dev server and confirm the default page renders",
          ],
          challenge: "Change the page title in index.html and the heading in App.jsx to personalize your app.",
          summary:
            "Vite scaffolds fast React projects with hot reload. The src/App.jsx file is where your application starts.",
        }),
        lesson({
          title: "JSX Fundamentals",
          slug: "react-jsx",
          minutes: 20,
          objective: "Write JSX: expressions, attributes, and rules.",
          intro:
            "JSX looks like HTML but is actually JavaScript. It compiles to React.createElement calls and gives you the full power of JavaScript inside your markup.",
          concepts: [
            "- **Expressions**: embed any JavaScript value with curly braces: {1 + 2}.",
            "- **Attributes**: use camelCase — className, onClick, htmlFor.",
            "- **One root element**: every component must return a single root (or fragment).",
            "- **Self-closing**: <img />, <input /> are valid.",
          ],
          example: {
            lang: "jsx",
            code: "function Welcome() {\n  const name = 'Ada';\n  const year = 1843;\n\n  return (\n    <div>\n      <h1>Hello, {name}</h1>\n      <p>Born in {year}. Sum: {2 + 2}</p>\n      <img src=\"ada.png\" alt=\"Portrait\" />\n    </div>\n  );\n}",
            output: "Hello, Ada\nBorn in 1843. Sum: 4",
          },
          mistakes: [
            "Using class instead of className for CSS classes.",
            "Returning two sibling elements without wrapping them in a fragment (<>...</>).",
            "Using statements (if, for) inside JSX braces — only expressions are allowed.",
          ],
          bestPractices: [
            "Use fragments <></> when you don't need a wrapping div.",
            "Format multi-line JSX with parentheses around the return.",
          ],
          exerciseTitle: "JSX Expressions",
          exerciseDescription: "Build a card component that renders your name, age, and a computed greeting.",
          exerciseRequirements: [
            "Use at least 3 JSX expressions in curly braces",
            "Use a className attribute",
            "Wrap in a fragment or single div",
          ],
          challenge: "Render a list of your three favorite foods using an array and .map().",
          summary:
            "JSX blends markup with JavaScript expressions. Remember: className for CSS, fragments for multiple roots, and braces for expressions.",
        }),
      ],
    },
    {
      title: "Components",
      description: "Building blocks: function components and composition",
      lessons: [
        lesson({
          title: "Function Components",
          slug: "react-function-components",
          minutes: 15,
          objective: "Create reusable function components.",
          intro:
            "A component is a JavaScript function that returns JSX. Components let you split the UI into independent, reusable pieces.",
          concepts: [
            "- Components must start with a capital letter so React treats them as components, not DOM tags.",
            "- Components can be composed: one component can render another.",
            "- Keep components small and focused on one thing.",
          ],
          example: {
            lang: "jsx",
            code: "function Header() {\n  return <header>My Site</header>;\n}\n\nfunction Footer() {\n  return <footer>© 2026</footer>;\n}\n\nfunction Page() {\n  return (\n    <div>\n      <Header />\n      <main>Content here</main>\n      <Footer />\n    </div>\n  );\n}",
            output: "Renders header, main, and footer in order.",
          },
          mistakes: [
            "Naming components in lowercase (header vs Header) — React treats lowercase as HTML tags.",
            "Defining components inside other components — this recreates them every render.",
          ],
          bestPractices: [
            "One component per file for anything non-trivial.",
            "Use a descriptive name based on what the component renders.",
          ],
          exerciseTitle: "Component Composition",
          exerciseDescription: "Create Header, Main, and Footer components and compose them in an App component.",
          exerciseRequirements: [
            "Create three separate components",
            "Compose all three in App",
            "Give each component meaningful content",
          ],
          challenge: "Extract a reusable Badge component and use it twice with different text.",
          summary:
            "Components are functions returning JSX. Compose small components to build large UIs.",
        }),
        lesson({
          title: "Props",
          slug: "react-props",
          minutes: 20,
          objective: "Pass data into components with props.",
          intro:
            "Props (short for properties) are the inputs to a component. They let you reuse the same component with different data, like a function with arguments.",
          concepts: [
            "- Props flow one-way: from parent to child.",
            "- Props are read-only — children must never mutate them.",
            "- Destructure props for cleaner code: function Card({ title, body }).",
            "- children is a special prop for passing nested JSX.",
          ],
          example: {
            lang: "jsx",
            code: "function Card({ title, description, children }) {\n  return (\n    <div className=\"card\">\n      <h2>{title}</h2>\n      <p>{description}</p>\n      {children}\n    </div>\n  );\n}\n\nfunction App() {\n  return (\n    <Card title=\"React\" description=\"A UI library\">\n      <button>Learn more</button>\n    </Card>\n  );\n}",
            output: "Card with heading, description, and a button inside.",
          },
          mistakes: [
            "Trying to reassign props inside the child component.",
            "Forgetting to pass a required prop, causing undefined errors.",
          ],
          bestPractices: [
            "Use default values in destructuring: function Card({ title = 'Untitled' }).",
            "Name props clearly and consistently (onX for event handlers).",
          ],
          exerciseTitle: "Prop Practice",
          exerciseDescription: "Build a ProductCard component that accepts title, price, and rating props.",
          exerciseRequirements: [
            "Accept at least 3 props",
            "Render all props",
            "Use the component twice with different data",
          ],
          challenge: "Add a children prop that renders a 'Add to cart' button.",
          summary:
            "Props pass data from parent to child. They are read-only inputs that make components reusable.",
        }),
        lesson({
          title: "Composition Patterns",
          slug: "react-composition",
          minutes: 15,
          objective: "Compose components using children and layout patterns.",
          intro:
            "Composition means building complex UIs by combining simpler components. The children prop makes flexible layouts possible without prop drilling.",
          concepts: [
            "- children lets a component accept arbitrary JSX.",
            "- Layout components (Grid, Panel, Modal) use children to wrap content.",
            "- Composition beats inheritance — there is no class inheritance in modern React.",
          ],
          example: {
            lang: "jsx",
            code: "function Panel({ title, children }) {\n  return (\n    <section className=\"panel\">\n      <h2>{title}</h2>\n      {children}\n    </section>\n  );\n}\n\nfunction App() {\n  return (\n    <Panel title=\"Notifications\">\n      <p>You have 3 new messages.</p>\n      <button>View all</button>\n    </Panel>\n  );\n}",
            output: "A titled panel wrapping arbitrary content.",
          },
          mistakes: [
            "Drilling many props through intermediate components when children would work.",
            "Nesting components too deeply instead of extracting.",
          ],
          bestPractices: [
            "Use children for wrapper/layout components.",
            "Extract a component when a piece of JSX appears more than twice.",
          ],
          exerciseTitle: "Layout Component",
          exerciseDescription: "Create a Container component that centers and max-widths its children.",
          exerciseRequirements: [
            "Accept children",
            "Apply a max-width style",
            "Use it to wrap content in App",
          ],
          challenge: "Build a SplitPane component that renders two children side by side.",
          summary:
            "Composition with the children prop creates flexible, reusable layout components.",
        }),
      ],
    },
    {
      title: "State with useState",
      description: "Managing data that changes over time",
      lessons: [
        lesson({
          title: "useState Basics",
          slug: "react-usestate",
          minutes: 20,
          objective: "Add and update state with the useState hook.",
          intro:
            "State is data that changes over time and makes the UI react. The useState hook returns the current value and an updater function.",
          concepts: [
            "- const [count, setCount] = useState(0) — value and setter.",
            "- Calling the setter re-renders the component with the new value.",
            "- Never mutate state directly; always use the setter.",
            "- State is preserved between renders.",
          ],
          example: {
            lang: "jsx",
            code: "import { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n    </div>\n  );\n}",
            output: "Clicking Increment increases the displayed count by 1.",
          },
          mistakes: [
            "Mutating state in place: count++ instead of setCount(count + 1).",
            "Calling the setter during render (infinite loop).",
            "Forgetting that setState is asynchronous when reading immediately after.",
          ],
          bestPractices: [
            "Use the functional update when the new value depends on the old: setCount(c => c + 1).",
            "Keep related state together in one object when it changes together.",
          ],
          exerciseTitle: "Counter App",
          exerciseDescription: "Build a counter with increment, decrement, and reset buttons.",
          exerciseRequirements: [
            "Use useState",
            "Implement three buttons",
            "Prevent the count from going below 0",
          ],
          challenge: "Add a step size input so the counter increments by the chosen amount.",
          summary:
            "useState gives components memory. Always update state with the setter, never mutate it.",
        }),
        lesson({
          title: "State and Forms",
          slug: "react-state-forms",
          minutes: 25,
          objective: "Manage form inputs with controlled components.",
          intro:
            "In React, form inputs are usually controlled: their value comes from state and they update state on change. This gives you full control over what is displayed.",
          concepts: [
            "- value={state} and onChange={e => setState(e.target.value)}.",
            "- Controlled inputs make validation, formatting, and resetting easy.",
            "- For many fields, store an object in state.",
          ],
          example: {
            lang: "jsx",
            code: "import { useState } from 'react';\n\nfunction SignupForm() {\n  const [form, setForm] = useState({ name: '', email: '' });\n\n  function handleChange(e) {\n    setForm({ ...form, [e.target.name]: e.target.value });\n  }\n\n  function handleSubmit(e) {\n    e.preventDefault();\n    console.log('Submitting', form);\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input name=\"name\" value={form.name} onChange={handleChange} />\n      <input name=\"email\" value={form.email} onChange={handleChange} />\n      <button type=\"submit\">Sign up</button>\n    </form>\n  );\n}",
            output: "Typing updates state; submitting logs the form object.",
          },
          mistakes: [
            "Forgetting value or onChange on an input (making it read-only or uncontrolled).",
            "Overwriting the whole form object instead of spreading the previous state.",
          ],
          bestPractices: [
            "Use the input's name attribute with computed keys to handle many fields.",
            "Always call e.preventDefault() in submit handlers.",
          ],
          exerciseTitle: "Controlled Form",
          exerciseDescription: "Build a login form with username and password fields controlled by state.",
          exerciseRequirements: [
            "Both inputs controlled by state",
            "Prevent default on submit",
            "Disable the submit button when fields are empty",
          ],
          challenge: "Show a live preview of the entered username below the form.",
          summary:
            "Controlled components bind input values to state, giving you complete control over forms.",
        }),
        lesson({
          title: "Lifting State Up",
          slug: "react-lifting-state",
          minutes: 20,
          objective: "Share state between sibling components.",
          intro:
            "When two components need the same data, move the state to their closest common parent and pass it down as props.",
          concepts: [
            "- State lives in the parent; children receive values and callbacks via props.",
            "- The parent owns the single source of truth.",
            "- This keeps data flow predictable and one-way.",
          ],
          example: {
            lang: "jsx",
            code: "function TemperatureInput({ value, onValueChange }) {\n  return (\n    <input\n      value={value}\n      onChange={(e) => onValueChange(e.target.value)}\n    />\n  );\n}\n\nfunction App() {\n  const [celsius, setCelsius] = useState('20');\n  const fahrenheit = (parseFloat(celsius) * 9) / 5 + 32;\n\n  return (\n    <div>\n      <TemperatureInput value={celsius} onValueChange={setCelsius} />\n      <p>{fahrenheit}°F</p>\n    </div>\n  );\n}",
            output: "Typing Celsius updates the Fahrenheit display live.",
          },
          mistakes: [
            "Duplicating the same state in two components instead of lifting it.",
            "Passing the raw setter down when children should only receive callbacks.",
          ],
          bestPractices: [
            "Lift state to the lowest common ancestor.",
            "Name callbacks with on-prefix: onValueChange, onSelect.",
          ],
          exerciseTitle: "Shared State",
          exerciseDescription: "Build a color picker: one input changes both a preview box and a hex code display.",
          exerciseRequirements: [
            "State lives in the parent component",
            "Two child components receive props",
            "Changing the input updates both displays",
          ],
          challenge: "Add a complementary color display computed from the entered hex.",
          summary:
            "Lift state to the nearest common parent so multiple components can share it through props.",
        }),
      ],
    },
    {
      title: "Events & Conditional Rendering",
      description: "Handling user interactions and rendering branches",
      lessons: [
        lesson({
          title: "Handling Events",
          slug: "react-events",
          minutes: 15,
          objective: "Attach event handlers to elements.",
          intro:
            "React events are named in camelCase and receive a synthetic event object. Handlers are functions you pass, not strings.",
          concepts: [
            "- onClick, onChange, onSubmit, onMouseEnter, and more.",
            "- Pass a function reference, not a call: onClick={handleClick}, not onClick={handleClick()}.",
            "- The synthetic event works across browsers and is pooled.",
          ],
          example: {
            lang: "jsx",
            code: "function EventDemo() {\n  function handleClick(event) {\n    console.log('Button clicked', event.target);\n  }\n\n  return (\n    <div>\n      <button onClick={handleClick}>Click me</button>\n      <input onChange={(e) => console.log(e.target.value)} />\n    </div>\n  );\n}",
            output: "Logs each click and each keystroke to the console.",
          },
          mistakes: [
            "Calling the handler during render: onClick={handleClick()}.",
            "Forgetting to pass the event object when the handler needs it.",
          ],
          bestPractices: [
            "Define handlers as named functions for readability.",
            "Use e.stopPropagation() only when you truly need to stop bubbling.",
          ],
          exerciseTitle: "Event Handlers",
          exerciseDescription: "Create buttons that log different messages and a hover area that changes text.",
          exerciseRequirements: [
            "Use at least 3 different event types",
            "Use a named handler for at least one event",
            "Log values to the console",
          ],
          challenge: "Track how many times a button was clicked and display it on the page.",
          summary:
            "Events in React are camelCase function props. Pass function references and receive the event object.",
        }),
        lesson({
          title: "Conditional Rendering",
          slug: "react-conditional",
          minutes: 15,
          objective: "Render different UI based on conditions.",
          intro:
            "React renders based on JavaScript conditions. Use if/else, ternary operators, and the logical && operator to show or hide parts of the UI.",
          concepts: [
            "- Ternary: {isLoggedIn ? <UserMenu /> : <LoginButton />}.",
            "- Logical AND: {unreadCount > 0 && <span>{unreadCount}</span>}.",
            "- Early return: return null or a fallback before the main JSX.",
          ],
          example: {
            lang: "jsx",
            code: "function Status({ isLoggedIn, unread }) {\n  if (!isLoggedIn) {\n    return <button>Login</button>;\n  }\n\n  return (\n    <div>\n      <p>Welcome back!</p>\n      {unread > 0 && <span className=\"badge\">{unread} new</span>}\n    </div>\n  );\n}",
            output: "Shows Login when logged out; welcome message and badge when logged in.",
          },
          mistakes: [
            "Using && with a number like {count && <p>} which renders 0 when count is 0.",
            "Over-nesting ternaries until they are unreadable.",
          ],
          bestPractices: [
            "Prefer early returns for complex conditions.",
            "Use && for simple show/hide, ternaries for two options.",
          ],
          exerciseTitle: "Conditional UI",
          exerciseDescription: "Build a component that shows a loading spinner, an error, or content based on a status prop.",
          exerciseRequirements: [
            "Handle at least 3 states: loading, error, success",
            "Use early return or ternary",
            "Use && for at least one case",
          ],
          challenge: "Add an empty state when the data list has zero items.",
          summary:
            "Conditional rendering uses plain JavaScript: if/else, ternaries, and logical operators.",
        }),
        lesson({
          title: "Rendering Lists",
          slug: "react-lists",
          minutes: 20,
          objective: "Render arrays of data with keys.",
          intro:
            "Map over arrays to render lists. Every item needs a stable, unique key so React can track changes efficiently.",
          concepts: [
            "- items.map(item => <li key={item.id}>{item.name}</li>).",
            "- Keys must be unique among siblings and stable across renders.",
            "- Never use the array index as a key when the list can be reordered.",
          ],
          example: {
            lang: "jsx",
            code: "const tasks = [\n  { id: 1, title: 'Learn React', done: true },\n  { id: 2, title: 'Build a project', done: false },\n];\n\nfunction TaskList() {\n  return (\n    <ul>\n      {tasks.map((task) => (\n        <li key={task.id}>\n          {task.done ? '✓' : '○'} {task.title}\n        </li>\n      ))}\n    </ul>\n  );\n}",
            output: "✓ Learn React\n○ Build a project",
          },
          mistakes: [
            "Using index as key for reorderable lists, causing incorrect UI updates.",
            "Putting the key on a child element instead of the mapped element.",
          ],
          bestPractices: [
            "Use IDs from your data as keys.",
            "Extract list item rendering into its own component when items are complex.",
          ],
          exerciseTitle: "List Rendering",
          exerciseDescription: "Render a list of products with name and price from an array.",
          exerciseRequirements: [
            "Use .map() to render items",
            "Give each item a unique key",
            "Style done/active items differently",
          ],
          challenge: "Add a filter that shows only products under a certain price.",
          summary:
            "Map arrays to JSX and provide stable keys for each item.",
        }),
      ],
    },
    {
      title: "Effects with useEffect",
      description: "Synchronizing with the outside world",
      lessons: [
        lesson({
          title: "useEffect Basics",
          slug: "react-useeffect",
          minutes: 25,
          objective: "Run side effects after render.",
          intro:
            "useEffect lets you synchronize a component with an external system: fetching data, subscriptions, timers, or updating the document title.",
          concepts: [
            "- useEffect(setup, dependencies) — setup runs after render.",
            "- Empty deps [] means run once after mount.",
            "- Return a cleanup function to cancel timers/subscriptions.",
          ],
          example: {
            lang: "jsx",
            code: "import { useState, useEffect } from 'react';\n\nfunction Clock() {\n  const [time, setTime] = useState(new Date());\n\n  useEffect(() => {\n    const id = setInterval(() => setTime(new Date()), 1000);\n    return () => clearInterval(id);\n  }, []);\n\n  return <p>{time.toLocaleTimeString()}</p>;\n}",
            output: "Updates the displayed time every second.",
          },
          mistakes: [
            "Forgetting the cleanup function — timers keep running after unmount.",
            "Setting state in an effect with dependencies that change every render (infinite loop).",
            "Using effects for derived values — compute them during render instead.",
          ],
          bestPractices: [
            "Ask: does this touch something outside React? If not, you may not need an effect.",
            "Include every reactive value the effect reads in the dependency array.",
          ],
          exerciseTitle: "Document Title Effect",
          exerciseDescription: "Update the document title to show the current count.",
          exerciseRequirements: [
            "Use useState for a count",
            "Use useEffect to update document.title",
            "Include the count in the dependency array",
          ],
          challenge: "Add a cleanup that restores the original title on unmount.",
          summary:
            "useEffect runs side effects after render and supports cleanup. Use it for external systems only.",
        }),
        lesson({
          title: "Fetching Data",
          slug: "react-data-fetching",
          minutes: 25,
          objective: "Load data from an API with useEffect and state.",
          intro:
            "A classic use of effects is fetching data. Combine loading, error, and data state to build robust data-fetching components.",
          concepts: [
            "- Track loading, error, and data in separate state.",
            "- Use a flag to avoid setting state after unmount or on stale requests.",
            "- AbortController cancels in-flight requests.",
          ],
          example: {
            lang: "jsx",
            code: "import { useState, useEffect } from 'react';\n\nfunction Users() {\n  const [users, setUsers] = useState([]);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    let cancelled = false;\n    fetch('https://jsonplaceholder.typicode.com/users')\n      .then((r) => r.json())\n      .then((data) => {\n        if (!cancelled) {\n          setUsers(data);\n          setLoading(false);\n        }\n      })\n      .catch((err) => {\n        if (!cancelled) {\n          setError(err);\n          setLoading(false);\n        }\n      });\n    return () => { cancelled = true; };\n  }, []);\n\n  if (loading) return <p>Loading...</p>;\n  if (error) return <p>Error: {error.message}</p>;\n  return <ul>{users.map((u) => <li key={u.id}>{u.name}</li>)}</ul>;\n}",
            output: "Loads and renders the user list, with loading and error states.",
          },
          mistakes: [
            "Setting state after the component unmounted (memory leak warning).",
            "Fetching inside render instead of an effect.",
          ],
          bestPractices: [
            "Use the cancelled flag or AbortController for cleanup.",
            "Extract data fetching into a custom hook for reuse.",
          ],
          exerciseTitle: "Fetch a List",
          exerciseDescription: "Fetch posts from an API and display titles, handling loading and errors.",
          exerciseRequirements: [
            "Use useEffect + useState",
            "Show a loading state",
            "Show an error state on failure",
            "Clean up with a cancelled flag",
          ],
          challenge: "Add a refresh button that refetches the data.",
          summary:
            "Fetch data in effects with loading/error/data state and proper cleanup.",
        }),
        lesson({
          title: "Custom Hooks",
          slug: "react-custom-hooks",
          minutes: 25,
          objective: "Extract reusable logic into custom hooks.",
          intro:
            "Custom hooks are functions that start with 'use' and call other hooks. They let you share stateful logic between components without changing the component tree.",
          concepts: [
            "- Name must start with use so lint rules apply correctly.",
            "- Custom hooks can return any value: data, functions, objects.",
            "- Two components using the same hook do not share state.",
          ],
          example: {
            lang: "jsx",
            code: "import { useState } from 'react';\n\nfunction useCounter(initial = 0) {\n  const [count, setCount] = useState(initial);\n  const increment = () => setCount((c) => c + 1);\n  const decrement = () => setCount((c) => c - 1);\n  const reset = () => setCount(initial);\n  return { count, increment, decrement, reset };\n}\n\nfunction Counter() {\n  const { count, increment, decrement, reset } = useCounter(10);\n  return (\n    <div>\n      <p>{count}</p>\n      <button onClick={increment}>+</button>\n      <button onClick={decrement}>-</button>\n      <button onClick={reset}>Reset</button>\n    </div>\n  );\n}",
            output: "A fully working counter built from a reusable hook.",
          },
          mistakes: [
            "Naming a hook without the 'use' prefix — React cannot detect rule violations.",
            "Calling hooks conditionally or inside loops.",
          ],
          bestPractices: [
            "Extract logic when the same stateful pattern appears in multiple components.",
            "Return stable callbacks (useCallback) if consumers use them in effects.",
          ],
          exerciseTitle: "useLocalStorage Hook",
          exerciseDescription: "Write a custom hook that reads and writes a value to localStorage.",
          exerciseRequirements: [
            "Hook starts with use",
            "Accepts a key and default value",
            "Syncs with localStorage on change",
            "Use it in a component",
          ],
          challenge: "Create useDebounce that returns a value updated only after a delay.",
          summary:
            "Custom hooks extract reusable stateful logic. Name them with 'use' and compose existing hooks.",
        }),
      ],
    },
    {
      title: "useMemo & useCallback",
      description: "Performance optimizations for expensive work",
      lessons: [
        lesson({
          title: "useMemo",
          slug: "react-usememo",
          minutes: 20,
          objective: "Cache expensive calculations with useMemo.",
          intro:
            "useMemo caches the result of a computation and recomputes it only when its dependencies change. Use it for genuinely expensive work.",
          concepts: [
            "- const value = useMemo(() => compute(x), [x]).",
            "- The function runs during render, not after.",
            "- Don't memoize trivial calculations — the memo itself has a cost.",
          ],
          example: {
            lang: "jsx",
            code: "import { useMemo, useState } from 'react';\n\nfunction FilteredList({ items, filter }) {\n  const filtered = useMemo(() => {\n    console.log('Filtering...');\n    return items.filter((i) => i.includes(filter));\n  }, [items, filter]);\n\n  return <ul>{filtered.map((i) => <li key={i}>{i}</li>)}</ul>;\n}",
            output: "Logs 'Filtering...' only when items or filter change.",
          },
          mistakes: [
            "Memoizing simple arithmetic or string concatenation.",
            "Missing dependencies from the array — the memo becomes stale.",
          ],
          bestPractices: [
            "Profile first; memoize only real bottlenecks.",
            "Keep the dependency array complete and stable.",
          ],
          exerciseTitle: "Expensive Filter",
          exerciseDescription: "Memoize a filter over a large array that includes a console log.",
          exerciseRequirements: [
            "Create a large array (1000+ items)",
            "Filter it with useMemo",
            "Verify the log only runs on dependency changes",
          ],
          challenge: "Add a second state that re-renders the component and confirm the filter is not recomputed.",
          summary:
            "useMemo caches computation results and recomputes only when dependencies change.",
        }),
        lesson({
          title: "useCallback",
          slug: "react-usecallback",
          minutes: 20,
          objective: "Stabilize function references with useCallback.",
          intro:
            "useCallback returns a memoized version of a function that only changes when dependencies change. It prevents unnecessary re-renders of memoized children.",
          concepts: [
            "- const fn = useCallback(() => doSomething(x), [x]).",
            "- Useful with React.memo children that re-render when props change.",
            "- Functions defined in a component are new on every render without it.",
          ],
          example: {
            lang: "jsx",
            code: "import { useCallback, useState } from 'react';\n\nfunction Button({ label, onClick }) {\n  console.log('Button rendered:', label);\n  return <button onClick={onClick}>{label}</button>;\n}\n\nfunction App() {\n  const [count, setCount] = useState(0);\n\n  const increment = useCallback(() => {\n    setCount((c) => c + 1);\n  }, []);\n\n  return (\n    <div>\n      <p>{count}</p>\n      <Button label=\"Add\" onClick={increment} />\n    </div>\n  );\n}",
            output: "Button logs only once unless its props change.",
          },
          mistakes: [
            "Wrapping every function in useCallback without need.",
            "Forgetting dependencies, capturing stale values.",
          ],
          bestPractices: [
            "Combine with React.memo for child components that re-render frequently.",
            "Use useCallback when the function is a dependency of an effect or memoized child.",
          ],
          exerciseTitle: "Stable Callbacks",
          exerciseDescription: "Build a memoized child button that logs renders, and keep its handler stable with useCallback.",
          exerciseRequirements: [
            "Create a child with React.memo",
            "Pass a useCallback handler",
            "Verify the child does not re-render when unrelated state changes",
          ],
          challenge: "Add a second state that changes and confirm the memoized child stays stable.",
          summary:
            "useCallback memoizes functions so memoized children skip unnecessary re-renders.",
        }),
        lesson({
          title: "React.memo",
          slug: "react-memo",
          minutes: 15,
          objective: "Skip re-renders of unchanged components.",
          intro:
            "React.memo wraps a component to skip re-rendering when its props are shallowly equal to the previous render's props.",
          concepts: [
            "- const Memoized = React.memo(Component).",
            "- Only re-renders when props actually change (shallow comparison).",
            "- Pair with useCallback/useMemo so function and object props stay stable.",
          ],
          example: {
            lang: "jsx",
            code: "import { memo, useState } from 'react';\n\nconst Item = memo(function Item({ name }) {\n  console.log('Rendering', name);\n  return <li>{name}</li>;\n});\n\nfunction App() {\n  const [count, setCount] = useState(0);\n  const items = ['a', 'b', 'c'];\n\n  return (\n    <div>\n      <p>{count}</p>\n      <button onClick={() => setCount(count + 1)}>+</button>\n      <ul>{items.map((i) => <Item key={i} name={i} />)}</ul>\n    </div>\n  );\n}",
            output: "Items do not re-render when count changes.",
          },
          mistakes: [
            "Wrapping everything in memo — it only helps when renders are costly.",
            "Passing inline objects/functions, defeating memo entirely.",
          ],
          bestPractices: [
            "Use memo for large lists or components that render frequently.",
            "Keep props primitive or memoized.",
          ],
          exerciseTitle: "Memoized List",
          exerciseDescription: "Create a list of memoized rows and verify they skip re-renders when an unrelated counter changes.",
          exerciseRequirements: [
            "Use React.memo on the row component",
            "Use a console log to verify renders",
            "Pass stable props only",
          ],
          challenge: "Add one row that receives an inline object and observe how it defeats memoization.",
          summary:
            "React.memo skips re-renders when props are unchanged. Use it selectively with stable props.",
        }),
      ],
    },
    {
      title: "Context API",
      description: "Sharing data across the component tree",
      lessons: [
        lesson({
          title: "Creating Context",
          slug: "react-context",
          minutes: 20,
          objective: "Create and consume context for global data.",
          intro:
            "Context provides a way to pass data through the component tree without prop drilling. It is ideal for themes, auth, and user preferences.",
          concepts: [
            "- createContext(defaultValue) creates the context object.",
            "- Provider supplies the value to its subtree.",
            "- useContext consumes the nearest Provider's value.",
          ],
          example: {
            lang: "jsx",
            code: "import { createContext, useContext } from 'react';\n\nconst ThemeContext = createContext('light');\n\nfunction Toolbar() {\n  const theme = useContext(ThemeContext);\n  return <div className={theme}>Current theme: {theme}</div>;\n}\n\nfunction App() {\n  return (\n    <ThemeContext.Provider value=\"dark\">\n      <Toolbar />\n    </ThemeContext.Provider>\n  );\n}",
            output: "Toolbar renders 'Current theme: dark'.",
          },
          mistakes: [
            "Using context for everything — state that only one component needs should stay local.",
            "Creating a new value object every render, causing all consumers to re-render.",
          ],
          bestPractices: [
            "Memoize context values with useMemo when it contains objects.",
            "Split contexts when data changes at different rates.",
          ],
          exerciseTitle: "Theme Context",
          exerciseDescription: "Create a theme context with light/dark values and consume it in two components.",
          exerciseRequirements: [
            "Create context with createContext",
            "Provide a value at the app root",
            "Consume it in at least two components",
          ],
          challenge: "Add a toggle button that switches the theme value via state.",
          summary:
            "Context shares data across the tree without prop drilling. Pair it with state for dynamic values.",
        }),
        lesson({
          title: "Context + Reducer",
          slug: "react-context-reducer",
          minutes: 25,
          objective: "Manage complex state with useReducer and context.",
          intro:
            "useReducer manages state updates through actions, similar to Redux but built in. Combined with context, it gives you a global store.",
          concepts: [
            "- const [state, dispatch] = useReducer(reducer, initialState).",
            "- Reducers are pure: (state, action) => newState.",
            "- Dispatch action objects like { type: 'increment' }.",
          ],
          example: {
            lang: "jsx",
            code: "import { useReducer } from 'react';\n\nfunction reducer(state, action) {\n  switch (action.type) {\n    case 'increment':\n      return { count: state.count + 1 };\n    case 'decrement':\n      return { count: state.count - 1 };\n    case 'reset':\n      return { count: 0 };\n    default:\n      return state;\n  }\n}\n\nfunction Counter() {\n  const [state, dispatch] = useReducer(reducer, { count: 0 });\n\n  return (\n    <div>\n      <p>{state.count}</p>\n      <button onClick={() => dispatch({ type: 'increment' })}>+</button>\n      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>\n      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>\n    </div>\n  );\n}",
            output: "Buttons dispatch actions that the reducer translates into state changes.",
          },
          mistakes: [
            "Mutating state inside the reducer — return a new object.",
            "Putting side effects (fetch, timers) inside a reducer — they belong in effects or handlers.",
          ],
          bestPractices: [
            "Use action type constants to avoid typos.",
            "Keep reducers pure and testable.",
          ],
          exerciseTitle: "Todo Reducer",
          exerciseDescription: "Build a todo list with useReducer supporting add, toggle, and remove actions.",
          exerciseRequirements: [
            "Use useReducer with at least 3 action types",
            "Never mutate state directly",
            "Render the list from state",
          ],
          challenge: "Add a 'clear completed' action.",
          summary:
            "useReducer centralizes state transitions in pure functions driven by actions.",
        }),
        lesson({
          title: "Global Store Pattern",
          slug: "react-global-store",
          minutes: 20,
          objective: "Combine context and reducer into a global store.",
          intro:
            "Wrap your app in a provider that owns reducer state and exposes dispatch through context — a lightweight alternative to external state libraries.",
          concepts: [
            "- Create a StoreContext holding { state, dispatch }.",
            "- AppProvider wraps children and provides the value.",
            "- useStore() hook makes consuming convenient.",
          ],
          example: {
            lang: "jsx",
            code: "const StoreContext = createContext(null);\n\nfunction AppProvider({ children }) {\n  const [state, dispatch] = useReducer(reducer, initialState);\n  const value = useMemo(() => ({ state, dispatch }), [state]);\n  return (\n    <StoreContext.Provider value={value}>\n      {children}\n    </StoreContext.Provider>\n  );\n}\n\nfunction useStore() {\n  return useContext(StoreContext);\n}",
            output: "Any component inside AppProvider can read state and dispatch actions.",
          },
          mistakes: [
            "Forgetting useMemo on the provider value — every consumer re-renders on any state change.",
            "Creating multiple providers for data that belongs in one store.",
          ],
          bestPractices: [
            "Expose only what components need.",
            "Split stores by domain (auth, cart, ui) when the app grows.",
          ],
          exerciseTitle: "Cart Store",
          exerciseDescription: "Build a global shopping cart with add/remove/clear actions shared between a product list and a cart badge.",
          exerciseRequirements: [
            "Create an AppProvider with reducer state",
            "Consume state in two different components",
            "Memoize the provider value",
          ],
          challenge: "Persist the cart to localStorage with an effect in the provider.",
          summary:
            "A context + reducer provider creates a global store with predictable updates.",
        }),
      ],
    },
    {
      title: "Styling in React",
      description: "CSS approaches: modules, inline, and Tailwind",
      lessons: [
        lesson({
          title: "CSS Modules",
          slug: "react-css-modules",
          minutes: 15,
          objective: "Scope styles locally with CSS Modules.",
          intro:
            "CSS Modules let you write normal CSS that is scoped to a component automatically. Class names become unique per file.",
          concepts: [
            "- Import styles: import styles from './Card.module.css'.",
            "- Apply: className={styles.card}.",
            "- Build tools hash class names to avoid collisions.",
          ],
          example: {
            lang: "jsx",
            code: "/* Card.module.css */\n.card {\n  border: 1px solid #ddd;\n  border-radius: 8px;\n  padding: 16px;\n}\n\n.title {\n  font-size: 18px;\n  font-weight: 600;\n}",
            output: "Classes compile to unique names like Card_card__2x4k9.",
          },
          mistakes: [
            "Using plain className=\"card\" and expecting scoping.",
            "Naming files without the .module.css suffix.",
          ],
          bestPractices: [
            "Keep one module file per component.",
            "Use kebab-case class names inside the CSS file.",
          ],
          exerciseTitle: "Module Styles",
          exerciseDescription: "Style a card component using a CSS module file.",
          exerciseRequirements: [
            "Create a .module.css file",
            "Apply at least 3 styles",
            "Import and use the styles object",
          ],
          challenge: "Add a modifier class (e.g. .card--featured) and toggle it conditionally.",
          summary:
            "CSS Modules scope styles per component, avoiding global class collisions.",
        }),
        lesson({
          title: "Inline Styles",
          slug: "react-inline-styles",
          minutes: 10,
          objective: "Apply dynamic styles with the style prop.",
          intro:
            "The style prop accepts an object of camelCase CSS properties. It is best for dynamic values like positions, widths, and colors.",
          concepts: [
            "- style={{ backgroundColor: color, width: progress + '%' }}.",
            "- Values with units are strings; numeric values imply px for some properties.",
            "- Inline styles cannot do media queries or pseudo-classes.",
          ],
          example: {
            lang: "jsx",
            code: "function ProgressBar({ value }) {\n  return (\n    <div style={{ background: '#eee', borderRadius: 4, height: 12 }}>\n      <div\n        style={{\n          width: value + '%',\n          background: value > 70 ? '#10b981' : '#f59e0b',\n          height: '100%',\n          borderRadius: 4,\n        }}\n      />\n    </div>\n  );\n}",
            output: "A bar whose fill width and color depend on the value prop.",
          },
          mistakes: [
            "Using hyphenated keys like background-color (should be backgroundColor).",
            "Mixing inline styles with stylesheets for static styles.",
          ],
          bestPractices: [
            "Use inline styles only for dynamic values.",
            "Keep static styling in CSS files or a framework like Tailwind.",
          ],
          exerciseTitle: "Dynamic Styles",
          exerciseDescription: "Build a progress bar component with dynamic width and color.",
          exerciseRequirements: [
            "Use the style prop with dynamic values",
            "Change color based on value thresholds",
            "Accept a value prop",
          ],
          challenge: "Add a smooth width transition using the transition CSS property.",
          summary:
            "Inline styles handle dynamic values. Use camelCase keys and prefer CSS files for static styles.",
        }),
        lesson({
          title: "Tailwind CSS in React",
          slug: "react-tailwind",
          minutes: 20,
          objective: "Style components with utility classes.",
          intro:
            "Tailwind CSS provides utility classes you compose directly in JSX. It is fast to iterate with and produces small CSS bundles in production.",
          concepts: [
            "- Compose utilities: className=\"flex items-center justify-between p-4 rounded-lg\".",
            "- Conditional classes with template strings or the clsx helper.",
            "- Dark mode via the dark: variant.",
          ],
          example: {
            lang: "jsx",
            code: "function Card({ featured }) {\n  const classes =\n    'rounded-xl border p-6 ' +\n    (featured\n      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'\n      : 'border-gray-200 bg-white dark:bg-gray-900');\n\n  return <div className={classes}>Card content</div>;\n}",
            output: "A rounded card whose colors switch with the featured prop and dark mode.",
          },
          mistakes: [
            "Repeating long class strings without extracting a component or a className variable.",
            "Fighting specificity with !important when utilities conflict.",
          ],
          bestPractices: [
            "Use clsx or a tiny helper for conditional classes.",
            "Extract repeated class combinations into small components.",
          ],
          exerciseTitle: "Tailwind Card",
          exerciseDescription: "Rebuild your card component using only Tailwind utilities.",
          exerciseRequirements: [
            "Use flexbox utilities for layout",
            "Use responsive prefixes (sm:, md:)",
            "Add a hover effect",
          ],
          challenge: "Add dark: variants for every color you used.",
          summary:
            "Tailwind utility classes live in JSX for fast, consistent styling with dark-mode support.",
        }),
      ],
    },
    {
      title: "Routing",
      description: "Client-side navigation with React Router",
      lessons: [
        lesson({
          title: "Setting Up React Router",
          slug: "react-router-setup",
          minutes: 15,
          objective: "Install and configure React Router.",
          intro:
            "React Router is the standard routing library for client-side React apps. It maps URLs to components without full page reloads.",
          concepts: [
            "- BrowserRouter wraps the app and syncs UI with the URL.",
            "- Routes and Route define the URL-to-component mapping.",
            "- Link performs client-side navigation.",
          ],
          example: {
            lang: "jsx",
            code: "import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';\n\nfunction App() {\n  return (\n    <BrowserRouter>\n      <nav>\n        <Link to=\"/\">Home</Link>\n        <Link to=\"/about\">About</Link>\n      </nav>\n      <Routes>\n        <Route path=\"/\" element={<Home />} />\n        <Route path=\"/about\" element={<About />} />\n      </Routes>\n    </BrowserRouter>\n  );\n}",
            output: "Navigating between / and /about swaps the rendered component.",
          },
          mistakes: [
            "Using <a href> for internal links — full page reloads break SPA state.",
            "Forgetting the catch-all route for 404 pages.",
          ],
          bestPractices: [
            "Use NavLink for nav items that need active styling.",
            "Organize routes in a dedicated routes file as the app grows.",
          ],
          exerciseTitle: "Two Routes",
          exerciseDescription: "Set up a router with Home and About routes plus a shared nav.",
          exerciseRequirements: [
            "Use BrowserRouter and Routes",
            "Create at least 2 routes",
            "Navigate with Link",
          ],
          challenge: "Add a catch-all * route rendering a Not Found component.",
          summary:
            "React Router maps URLs to components with declarative Routes and Link navigation.",
        }),
        lesson({
          title: "Dynamic Routes & Params",
          slug: "react-dynamic-routes",
          minutes: 20,
          objective: "Handle URL parameters with useParams.",
          intro:
            "Dynamic routes match URL segments to variables. useParams gives the current route's parameters so components can fetch and render the right data.",
          concepts: [
            "- Define dynamic segments with a colon: path=\"/products/:id\".",
            "- const { id } = useParams() inside the route component.",
            "- useNavigate() programs navigation after actions like form submits.",
          ],
          example: {
            lang: "jsx",
            code: "import { useParams, useNavigate } from 'react-router-dom';\n\nfunction ProductPage() {\n  const { id } = useParams();\n  const navigate = useNavigate();\n\n  // product = products.find(p => p.id === id)\n\n  return (\n    <div>\n      <h1>Product {id}</h1>\n      <button onClick={() => navigate('/products')}>Back to list</button>\n    </div>\n  );\n}\n\n// Route: <Route path=\"/products/:id\" element={<ProductPage />} />",
            output: "/products/42 renders 'Product 42'.",
          },
          mistakes: [
            "Assuming the param is always present — validate before using.",
            "Using useNavigate for links; prefer Link for static navigation.",
          ],
          bestPractices: [
            "Handle the not-found case when params don't match any data.",
            "Keep route params URL-encoded when they contain special characters.",
          ],
          exerciseTitle: "Blog Post Route",
          exerciseDescription: "Create a route /posts/:slug that renders the matching post from an array.",
          exerciseRequirements: [
            "Use useParams to read the slug",
            "Look up the post in data",
            "Render a not-found message for unknown slugs",
          ],
          challenge: "Add a back button using useNavigate.",
          summary:
            "Dynamic segments + useParams give components access to URL parameters.",
        }),
        lesson({
          title: "Nested Routes & Layouts",
          slug: "react-nested-routes",
          minutes: 20,
          objective: "Share layouts across routes with nested routes.",
          intro:
            "Nested routes let a parent route render a shared layout with an Outlet where child routes render.",
          concepts: [
            "- A layout route renders <Outlet /> for children.",
            "- Relative paths inherit the parent path.",
            "- index routes render at the parent's exact path.",
          ],
          example: {
            lang: "jsx",
            code: "import { Outlet, Link } from 'react-router-dom';\n\nfunction DashboardLayout() {\n  return (\n    <div style={{ display: 'flex' }}>\n      <nav>\n        <Link to=\"overview\">Overview</Link>\n        <Link to=\"settings\">Settings</Link>\n      </nav>\n      <main><Outlet /></main>\n    </div>\n  );\n}\n\n// Routes:\n// <Route path=\"/dashboard\" element={<DashboardLayout />}>\n//   <Route index element={<Overview />} />\n//   <Route path=\"settings\" element={<Settings />} />\n// </Route>",
            output: "/dashboard renders the layout with Overview; /dashboard/settings swaps the main area.",
          },
          mistakes: [
            "Forgetting the Outlet — child routes render nothing.",
            "Using absolute paths for every nested link instead of relative ones.",
          ],
          bestPractices: [
            "Use layouts for persistent UI: sidebars, headers, tabs.",
            "Use index routes for the default child.",
          ],
          exerciseTitle: "Settings Layout",
          exerciseDescription: "Build a settings section with tabs (profile, security, notifications) under one layout.",
          exerciseRequirements: [
            "Create a layout route with Outlet",
            "Create at least 3 child routes",
            "Use an index route for the default tab",
          ],
          challenge: "Highlight the active tab using NavLink's className function.",
          summary:
            "Nested routes with Outlet share layouts across related pages.",
        }),
      ],
    },
    {
      title: "Forms & Validation",
      description: "Building robust forms without a library",
      lessons: [
        lesson({
          title: "Form State Patterns",
          slug: "react-form-state",
          minutes: 25,
          objective: "Manage multi-field forms with a single state object.",
          intro:
            "For complex forms, keep all field values in one state object and update via the input's name attribute. This makes submission and reset simple.",
          concepts: [
            "- const [values, setValues] = useState(initialValues).",
            "- handleChange uses computed keys: setValues({ ...values, [e.target.name]: e.target.value }).",
            "- Reset by setting values back to initialValues.",
          ],
          example: {
            lang: "jsx",
            code: "const initialValues = { name: '', email: '', role: 'student' };\n\nfunction RegistrationForm() {\n  const [values, setValues] = useState(initialValues);\n\n  function handleChange(e) {\n    setValues({ ...values, [e.target.name]: e.target.value });\n  }\n\n  function handleSubmit(e) {\n    e.preventDefault();\n    console.log(values);\n    setValues(initialValues);\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input name=\"name\" value={values.name} onChange={handleChange} />\n      <input name=\"email\" type=\"email\" value={values.email} onChange={handleChange} />\n      <select name=\"role\" value={values.role} onChange={handleChange}>\n        <option value=\"student\">Student</option>\n        <option value=\"mentor\">Mentor</option>\n      </select>\n      <button type=\"submit\">Register</button>\n    </form>\n  );\n}",
            output: "All inputs update one state object; submit logs and resets it.",
          },
          mistakes: [
            "Creating separate useState calls per field — harder to reset and validate.",
            "Forgetting to spread ...values, wiping other fields.",
          ],
          bestPractices: [
            "Keep initialValues as a constant outside the component.",
            "Group related forms into their own component.",
          ],
          exerciseTitle: "Multi-field Form",
          exerciseDescription: "Build a registration form with 4 fields sharing one state object.",
          exerciseRequirements: [
            "One state object for all fields",
            "Computed-key update handler",
            "Reset on submit",
          ],
          challenge: "Add a checkbox that toggles an 'accept terms' boolean field.",
          summary:
            "A single state object with computed-key updates keeps multi-field forms clean.",
        }),
        lesson({
          title: "Client-Side Validation",
          slug: "react-validation",
          minutes: 25,
          objective: "Validate forms and show errors per field.",
          intro:
            "Validate before submit and show field-level errors. Keep an errors object in state and update it as the user types.",
          concepts: [
            "- errors state: { field: message }.",
            "- validate() returns an errors object; submit only when empty.",
            "- Show errors under inputs with aria-invalid for accessibility.",
          ],
          example: {
            lang: "jsx",
            code: "function validate(values) {\n  const errors = {};\n  if (!values.name) errors.name = 'Name is required';\n  if (!values.email.includes('@')) errors.email = 'Enter a valid email';\n  if (values.password.length < 8) errors.password = 'Minimum 8 characters';\n  return errors;\n}\n\nfunction SignupForm() {\n  const [values, setValues] = useState({ name: '', email: '', password: '' });\n  const [errors, setErrors] = useState({});\n\n  function handleSubmit(e) {\n    e.preventDefault();\n    const errs = validate(values);\n    setErrors(errs);\n    if (Object.keys(errs).length === 0) {\n      console.log('Submitting', values);\n    }\n  }\n\n  return (\n    <form onSubmit={handleSubmit} noValidate>\n      <input name=\"name\" value={values.name} onChange={handleChange} aria-invalid={!!errors.name} />\n      {errors.name && <p className=\"error\">{errors.name}</p>}\n      <input name=\"email\" value={values.email} onChange={handleChange} aria-invalid={!!errors.email} />\n      {errors.email && <p className=\"error\">{errors.email}</p>}\n      <input name=\"password\" type=\"password\" value={values.password} onChange={handleChange} aria-invalid={!!errors.password} />\n      {errors.password && <p className=\"error\">{errors.password}</p>}\n      <button type=\"submit\">Sign up</button>\n    </form>\n  );\n}",
            output: "Invalid fields show messages under each input and block submission.",
          },
          mistakes: [
            "Only validating on submit — validate on change for better UX.",
            "Not setting noValidate on the form, letting the browser double-report.",
          ],
          bestPractices: [
            "Keep validation logic in a pure function you can unit test.",
            "Use aria-invalid and aria-describedby for screen readers.",
          ],
          exerciseTitle: "Validated Form",
          exerciseDescription: "Add per-field validation to a signup form with error messages.",
          exerciseRequirements: [
            "Validate at least 3 rules",
            "Show errors under fields",
            "Block submit when invalid",
            "Add aria-invalid attributes",
          ],
          challenge: "Validate live on change once a field has been touched.",
          summary:
            "Field-level validation with an errors object improves UX and accessibility.",
        }),
        lesson({
          title: "Form Libraries",
          slug: "react-form-libraries",
          minutes: 15,
          objective: "Understand when to use libraries like React Hook Form.",
          intro:
            "For large forms, libraries like React Hook Form reduce boilerplate, handle re-renders efficiently, and integrate with schema validators like Zod.",
          concepts: [
            "- useForm({ resolver: zodResolver(schema) }).",
            "- register() wires inputs without controlled state.",
            "- handleSubmit validates then calls your submit handler.",
          ],
          example: {
            lang: "jsx",
            code: "import { useForm } from 'react-hook-form';\nimport { zodResolver } from '@hookform/resolvers/zod';\nimport { z } from 'zod';\n\nconst schema = z.object({\n  email: z.string().email(),\n  password: z.string().min(8),\n});\n\nfunction LoginForm() {\n  const { register, handleSubmit, formState: { errors } } = useForm({\n    resolver: zodResolver(schema),\n  });\n\n  return (\n    <form onSubmit={handleSubmit((data) => console.log(data))}>\n      <input {...register('email')} />\n      {errors.email && <p>{errors.email.message}</p>}\n      <input type=\"password\" {...register('password')} />\n      {errors.password && <p>{errors.password.message}</p>}\n      <button type=\"submit\">Login</button>\n    </form>\n  );\n}",
            output: "Zod validates on submit; errors render per field.",
          },
          mistakes: [
            "Adding a form library for 2-field forms — plain state is simpler.",
            "Ignoring the resolver — library validation without a schema is half the value.",
          ],
          bestPractices: [
            "Use Zod schemas shared with the backend when possible.",
            "Let the library handle re-renders — avoid re-subscribing inputs.",
          ],
          exerciseTitle: "Library Form",
          exerciseDescription: "Recreate a signup form using React Hook Form with a Zod schema.",
          exerciseRequirements: [
            "Install react-hook-form and zod",
            "Define a Zod schema with 3 fields",
            "Render errors from formState",
          ],
          challenge: "Add a confirmPassword field with a refine that matches password.",
          summary:
            "React Hook Form + Zod scales validation for complex forms with less boilerplate.",
        }),
      ],
    },
    {
      title: "Fetching & APIs",
      description: "Calling backends: fetch, errors, and patterns",
      lessons: [
        lesson({
          title: "fetch in React",
          slug: "react-fetch",
          minutes: 20,
          objective: "Call APIs with the fetch API.",
          intro:
            "fetch is the built-in browser API for HTTP requests. Combine it with state and effects to load and send data.",
          concepts: [
            "- await fetch(url, { method, headers, body }).",
            "- Check res.ok before parsing JSON.",
            "- Wrap in try/catch for network errors.",
          ],
          example: {
            lang: "jsx",
            code: "async function createUser(user) {\n  const res = await fetch('/api/users', {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify(user),\n  });\n\n  if (!res.ok) {\n    throw new Error('Request failed: ' + res.status);\n  }\n\n  return res.json();\n}",
            output: "Posts JSON and parses the response, throwing on non-2xx statuses.",
          },
          mistakes: [
            "Forgetting res.ok — fetch only rejects on network errors, not 404s/500s.",
            "Sending JSON without the Content-Type header.",
          ],
          bestPractices: [
            "Wrap API calls in service functions, not inside components.",
            "Handle both error and loading states in the UI.",
          ],
          exerciseTitle: "API Service",
          exerciseDescription: "Write service functions for GET and POST on a /api/items endpoint.",
          exerciseRequirements: [
            "One function per HTTP method",
            "Check res.ok in both",
            "Return parsed JSON or throw",
          ],
          challenge: "Add a generic request helper that takes method, url, and body.",
          summary:
            "Use fetch with res.ok checks and service functions for clean API calls.",
        }),
        lesson({
          title: "Error Handling & Retries",
          slug: "react-fetch-errors",
          minutes: 20,
          objective: "Handle API errors gracefully with retry logic.",
          intro:
            "Network failures and server errors are inevitable. Design your UI to show friendly errors and offer retry.",
          concepts: [
            "- Distinguish validation errors (4xx) from server failures (5xx).",
            "- A retry state that refetches on demand.",
            "- Timeouts with AbortController for hanging requests.",
          ],
          example: {
            lang: "jsx",
            code: "function useFetch(url) {\n  const [data, setData] = useState(null);\n  const [error, setError] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [attempt, setAttempt] = useState(0);\n\n  useEffect(() => {\n    const controller = new AbortController();\n    setLoading(true);\n\n    fetch(url, { signal: controller.signal })\n      .then((r) => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })\n      .then(setData)\n      .catch((e) => { if (e.name !== 'AbortError') setError(e); })\n      .finally(() => setLoading(false));\n\n    return () => controller.abort();\n  }, [url, attempt]);\n\n  return { data, error, loading, retry: () => setAttempt((a) => a + 1) };\n}",
            output: "Retry increments attempt, refetching the URL.",
          },
          mistakes: [
            "Swallowing errors silently — always surface them in the UI.",
            "Not aborting requests on unmount.",
          ],
          bestPractices: [
            "Show a retry button on failure.",
            "Log server errors with context for debugging.",
          ],
          exerciseTitle: "Retry Hook",
          exerciseDescription: "Build a useFetch hook with loading, error, data, and retry.",
          exerciseRequirements: [
            "Return all four values",
            "Abort in-flight requests on cleanup",
            "Render a retry button in a demo component",
          ],
          challenge: "Add exponential backoff: retries wait 1s, 2s, 4s before refetching.",
          summary:
            "Robust data fetching includes error states, cleanup via AbortController, and retry.",
        }),
        lesson({
          title: "Data Fetching Patterns",
          slug: "react-fetch-patterns",
          minutes: 20,
          objective: "Compare client vs server data fetching and caching options.",
          intro:
            "Client-side fetching is simple but lacks caching, deduplication, and SSR. Libraries like TanStack Query add those. In frameworks like Next.js, server components fetch on the server.",
          concepts: [
            "- TanStack Query: query keys, caching, background refetch, mutations.",
            "- React Query dedupes identical requests and caches by key.",
            "- Server components fetch where data lives, avoiding waterfalls.",
          ],
          example: {
            lang: "jsx",
            code: "import { useQuery } from '@tanstack/react-query';\n\nfunction Users() {\n  const { data, isLoading, isError, refetch } = useQuery({\n    queryKey: ['users'],\n    queryFn: () => fetch('/api/users').then((r) => r.json()),\n  });\n\n  if (isLoading) return <p>Loading...</p>;\n  if (isError) return <button onClick={refetch}>Retry</button>;\n  return <ul>{data.map((u) => <li key={u.id}>{u.name}</li>)}</ul>;\n}",
            output: "Cached, deduped query with automatic loading/error states.",
          },
          mistakes: [
            "Re-fetching the same data in every component without a cache.",
            "Nesting fetches (waterfalls) instead of parallelizing.",
          ],
          bestPractices: [
            "Use a query library once an app has real data needs.",
            "Define query keys consistently (['resource', id]).",
          ],
          exerciseTitle: "Query Integration",
          exerciseDescription: "Refactor a fetch-on-mount component to use TanStack Query.",
          exerciseRequirements: [
            "Define a query with a key and queryFn",
            "Use isLoading and isError states",
            "Provide a refetch",
          ],
          challenge: "Add a mutation to create an item and invalidate the list query.",
          summary:
            "Caching layers like TanStack Query make client data fetching robust and fast.",
        }),
      ],
    },
    {
      title: "Authentication in React",
      description: "Token-based auth patterns",
      lessons: [
        lesson({
          title: "Auth Context",
          slug: "react-auth-context",
          minutes: 25,
          objective: "Store auth state in context and guard routes.",
          intro:
            "Authentication state — the current user and login/logout functions — belongs in a context so every component can access it.",
          concepts: [
            "- AuthProvider holds user, loading, login, logout.",
            "- On mount, call a /api/auth/session endpoint to restore the session.",
            "- Route guards redirect unauthenticated users.",
          ],
          example: {
            lang: "jsx",
            code: "const AuthContext = createContext(null);\n\nfunction AuthProvider({ children }) {\n  const [user, setUser] = useState(null);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    fetch('/api/auth/session')\n      .then((r) => r.json())\n      .then((data) => setUser(data.user || null))\n      .finally(() => setLoading(false));\n  }, []);\n\n  const login = async (email, password) => {\n    const res = await fetch('/api/auth/login', {\n      method: 'POST',\n      headers: { 'Content-Type': 'application/json' },\n      body: JSON.stringify({ email, password }),\n    });\n    const data = await res.json();\n    if (data.user) setUser(data.user);\n    return data;\n  };\n\n  const logout = async () => {\n    await fetch('/api/auth/logout', { method: 'POST' });\n    setUser(null);\n  };\n\n  return (\n    <AuthContext.Provider value={{ user, loading, login, logout }}>\n      {children}\n    </AuthContext.Provider>\n  );\n}",
            output: "Any component can read the user and call login/logout.",
          },
          mistakes: [
            "Trusting client-side auth alone — always verify on the server.",
            "Storing tokens in localStorage (XSS risk); prefer httpOnly cookies.",
          ],
          bestPractices: [
            "Keep tokens in httpOnly cookies set by the server.",
            "Guard routes both client-side (UX) and server-side (security).",
          ],
          exerciseTitle: "Auth Provider",
          exerciseDescription: "Build an AuthProvider with user, loading, login, and logout, and consume it in a header.",
          exerciseRequirements: [
            "Create the provider with state",
            "Provide login/logout functions",
            "Show login state in a header component",
          ],
          challenge: "Add a RequireAuth wrapper that redirects to /login when there is no user.",
          summary:
            "Auth context centralizes user state; server-side verification remains the real gate.",
        }),
        lesson({
          title: "Protected Routes",
          slug: "react-protected-routes",
          minutes: 15,
          objective: "Guard pages with a wrapper component.",
          intro:
            "A RequireAuth component wraps protected pages: if the user is not logged in, redirect; if still loading, show a spinner.",
          concepts: [
            "- useNavigate for imperative redirects.",
            "- Show a loading state while the session restores to avoid flashing.",
            "- Redirect to login with a return URL so users come back after login.",
          ],
          example: {
            lang: "jsx",
            code: "function RequireAuth({ children }) {\n  const { user, loading } = useAuth();\n  const navigate = useNavigate();\n  const location = useLocation();\n\n  useEffect(() => {\n    if (!loading && !user) {\n      navigate('/login', { state: { from: location } });\n    }\n  }, [user, loading, navigate, location]);\n\n  if (loading || !user) return <div>Checking session...</div>;\n  return children;\n}\n\n// Usage: <Route path=\"/dashboard\" element={<RequireAuth><Dashboard /></RequireAuth>} />",
            output: "Unauthenticated users bounce to /login with their origin recorded.",
          },
          mistakes: [
            "Rendering children while loading — causes a flash of the protected page.",
            "Only guarding in the UI; server APIs must also check sessions.",
          ],
          bestPractices: [
            "Always pair client guards with server-side authorization.",
            "Preserve the intended destination for post-login redirect.",
          ],
          exerciseTitle: "Route Guard",
          exerciseDescription: "Wrap three routes in RequireAuth and verify the redirect flow.",
          exerciseRequirements: [
            "Create RequireAuth component",
            "Redirect unauthenticated users to /login",
            "Show loading while checking",
          ],
          challenge: "Redirect back to the original page after login using location.state.",
          summary:
            "RequireAuth wrappers protect routes client-side; servers must enforce the same rules.",
        }),
        lesson({
          title: "Session Expiry Handling",
          slug: "react-session-expiry",
          minutes: 20,
          objective: "Detect expired sessions and re-authenticate.",
          intro:
            "Sessions expire. Your app should detect 401 responses, clear stale auth state, and prompt the user to log in again.",
          concepts: [
            "- A fetch wrapper that intercepts 401 responses.",
            "- On 401, clear user state and redirect to login.",
            "- Show a friendly 'session expired' message.",
          ],
          example: {
            lang: "jsx",
            code: "async function apiFetch(url, options = {}) {\n  const res = await fetch(url, options);\n\n  if (res.status === 401) {\n    // Clear auth state and redirect\n    logout();\n    window.location.href = '/login?expired=1';\n    throw new Error('Session expired');\n  }\n\n  return res;\n}",
            output: "Any 401 triggers logout and a redirect to /login?expired=1.",
          },
          mistakes: [
            "Ignoring 401s and rendering stale data.",
            "Letting the user keep clicking with a dead session.",
          ],
          bestPractices: [
            "Centralize API calls in one wrapper that handles auth errors.",
            "Show an explicit 'session expired, please log in again' message.",
          ],
          exerciseTitle: "401 Interceptor",
          exerciseDescription: "Create an apiFetch wrapper that handles 401 by logging out and redirecting.",
          exerciseRequirements: [
            "Wrap fetch in a single function",
            "Detect 401 responses",
            "Redirect to login with an expired flag",
          ],
          challenge: "Silently refresh the session once using a refresh endpoint before redirecting.",
          summary:
            "Intercept 401s centrally, clear auth state, and route users back to login.",
        }),
      ],
    },
    {
      title: "CRUD Applications",
      description: "Building full CRUD against an API",
      lessons: [
        lesson({
          title: "Reading & Listing",
          slug: "react-crud-list",
          minutes: 20,
          objective: "Fetch and display a collection with search.",
          intro:
            "CRUD starts with listing data. Fetch on mount, render a table or cards, and support search and filtering.",
          concepts: [
            "- Keep search terms in state and debounce API calls.",
            "- Sort/filter server-side for large datasets.",
            "- Show empty and loading states.",
          ],
          example: {
            lang: "jsx",
            code: "function ProductList() {\n  const [query, setQuery] = useState('');\n  const { data, isLoading } = useQuery({\n    queryKey: ['products', query],\n    queryFn: () => fetch('/api/products?q=' + encodeURIComponent(query)).then((r) => r.json()),\n  });\n\n  return (\n    <div>\n      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder=\"Search...\" />\n      {isLoading ? <p>Loading...</p> :\n        data.length === 0 ? <p>No products found</p> :\n        <ul>{data.map((p) => <li key={p.id}>{p.name} — ${p.price}</li>)}</ul>}\n    </div>\n  );\n}",
            output: "Typing refetches products matching the query.",
          },
          mistakes: [
            "Filtering client-side on the full list when the API supports q.",
            "No debounce on search input — hammering the API per keystroke.",
          ],
          bestPractices: [
            "Debounce search inputs (~300ms).",
            "Encode query parameters.",
          ],
          exerciseTitle: "Searchable List",
          exerciseDescription: "Fetch a list from an API and add debounced search.",
          exerciseRequirements: [
            "Fetch data with a query key",
            "Debounce the search input",
            "Handle empty results",
          ],
          challenge: "Add a sort dropdown that changes the API query.",
          summary:
            "Lists need loading/empty states and server-side search with debounce.",
        }),
        lesson({
          title: "Creating & Updating",
          slug: "react-crud-create",
          minutes: 25,
          objective: "Create and update resources with mutations.",
          intro:
            "Creating and updating sends data to the API. On success, refresh the list so the UI matches the server.",
          concepts: [
            "- POST creates, PUT/PATCH updates.",
            "- Mutations update the cache or invalidate queries to refetch.",
            "- Disable buttons while a request is in flight to prevent duplicates.",
          ],
          example: {
            lang: "jsx",
            code: "const mutation = useMutation({\n  mutationFn: (product) =>\n    fetch('/api/products', {\n      method: 'POST',\n      headers: { 'Content-Type': 'application/json' },\n      body: JSON.stringify(product),\n    }).then((r) => {\n      if (!r.ok) throw new Error('Failed to create');\n      return r.json();\n    }),\n  onSuccess: () => {\n    queryClient.invalidateQueries({ queryKey: ['products'] });\n  },\n});\n\nfunction handleSubmit(e) {\n  e.preventDefault();\n  mutation.mutate({ name, price });\n}",
            output: "Creating a product refreshes the product list automatically.",
          },
          mistakes: [
            "Not invalidating queries after a mutation — stale UI.",
            "Allowing double submits while pending.",
          ],
          bestPractices: [
            "Use optimistic updates for snappy UIs on slow networks.",
            "Show mutation errors near the form.",
          ],
          exerciseTitle: "Create + Update",
          exerciseDescription: "Build a form that creates products and an edit flow that updates them.",
          exerciseRequirements: [
            "POST mutation with query invalidation",
            "PUT/PATCH for updates",
            "Disable the submit button while pending",
          ],
          challenge: "Implement optimistic update with rollback on error.",
          summary:
            "Mutations send data, invalidate caches, and keep the UI in sync.",
        }),
        lesson({
          title: "Deleting & Confirmations",
          slug: "react-crud-delete",
          minutes: 15,
          objective: "Delete resources safely with confirmation.",
          intro:
            "Deleting is destructive. Always confirm, show pending state, and handle errors so the UI never lies about the data.",
          concepts: [
            "- Confirm dialogs for destructive actions.",
            "- Disable the delete button while the request is running.",
            "- On success, remove the item from the cache or invalidate.",
          ],
          example: {
            lang: "jsx",
            code: "const deleteMutation = useMutation({\n  mutationFn: (id) => fetch('/api/products/' + id, { method: 'DELETE' }),\n  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),\n});\n\nfunction DeleteButton({ id }) {\n  function handleDelete() {\n    if (window.confirm('Delete this product permanently?')) {\n      deleteMutation.mutate(id);\n    }\n  }\n\n  return (\n    <button onClick={handleDelete} disabled={deleteMutation.isPending}>\n      {deleteMutation.isPending ? 'Deleting...' : 'Delete'}\n    </button>\n  );\n}",
            output: "Confirm dialog, pending state, and cache invalidation on success.",
          },
          mistakes: [
            "Deleting without confirmation.",
            "Leaving the deleted item visible after success.",
          ],
          bestPractices: [
            "Use optimistic removal for instant feedback.",
            "Provide an undo option when possible.",
          ],
          exerciseTitle: "Safe Delete",
          exerciseDescription: "Add delete buttons with confirmation to your product list.",
          exerciseRequirements: [
            "Confirm before deleting",
            "Show pending state",
            "Update the list on success",
          ],
          challenge: "Implement a toast with an Undo action after deletion.",
          summary:
            "Safe deletion: confirm, disable while pending, sync the UI on success.",
        }),
      ],
    },
    {
      title: "Advanced Hooks & Patterns",
      description: "useRef, portals, and error boundaries",
      lessons: [
        lesson({
          title: "useRef",
          slug: "react-useref",
          minutes: 20,
          objective: "Reference DOM nodes and mutable values with useRef.",
          intro:
            "useRef returns a mutable object that persists for the component's lifetime. It is used for DOM refs and for values that change without triggering re-renders.",
          concepts: [
            "- const inputRef = useRef(null); <input ref={inputRef} />.",
            "- inputRef.current.focus() accesses the DOM node.",
            "- Refs do not cause re-renders when mutated.",
          ],
          example: {
            lang: "jsx",
            code: "import { useRef } from 'react';\n\nfunction AutoFocusInput() {\n  const inputRef = useRef(null);\n\n  function focusInput() {\n    inputRef.current.focus();\n  }\n\n  return (\n    <div>\n      <input ref={inputRef} />\n      <button onClick={focusInput}>Focus input</button>\n    </div>\n  );\n}",
            output: "Clicking the button focuses the text input.",
          },
          mistakes: [
            "Using refs to trigger re-renders — use state for that.",
            "Reading ref.current during render — it may be stale or null.",
          ],
          bestPractices: [
            "Use refs for imperative DOM actions: focus, scroll, measuring.",
            "Use refs to store timers and ids for cleanup.",
          ],
          exerciseTitle: "Ref Practice",
          exerciseDescription: "Build a form with focus, scroll-to-top, and select-all buttons using refs.",
          exerciseRequirements: [
            "Use at least 2 refs",
            "Perform an imperative DOM action",
            "Do not use state for the interaction",
          ],
          challenge: "Measure an element's width on resize using a ref and report it in state.",
          summary:
            "useRef holds DOM references and mutable values that skip re-renders.",
        }),
        lesson({
          title: "Portals",
          slug: "react-portals",
          minutes: 15,
          objective: "Render content outside the component tree with portals.",
          intro:
            "createPortal renders children into a different DOM node. It is perfect for modals, tooltips, and dropdowns that must escape overflow containers.",
          concepts: [
            "- ReactDOM.createPortal(jsx, document.body).",
            "- Events still bubble through the React tree, not the DOM tree.",
            "- Portals solve z-index and overflow clipping issues.",
          ],
          example: {
            lang: "jsx",
            code: "import { createPortal } from 'react-dom';\n\nfunction Modal({ open, onClose, children }) {\n  if (!open) return null;\n\n  return createPortal(\n    <div className=\"modal-overlay\" onClick={onClose}>\n      <div className=\"modal\" onClick={(e) => e.stopPropagation()}>\n        {children}\n      </div>\n    </div>,\n    document.body\n  );\n}",
            output: "The modal renders at the end of <body>, above everything.",
          },
          mistakes: [
            "Rendering to a node that does not exist yet (check with document.body).",
            "Forgetting stopPropagation on inner clicks.",
          ],
          bestPractices: [
            "Portal modals and tooltips that overlay other UI.",
            "Close on Escape and on overlay click for accessibility.",
          ],
          exerciseTitle: "Portal Modal",
          exerciseDescription: "Build a modal component using createPortal with close-on-overlay and Escape.",
          exerciseRequirements: [
            "Render via createPortal to document.body",
            "Close on overlay click",
            "Close on Escape key",
          ],
          challenge: "Lock body scroll while the modal is open.",
          summary:
            "Portals render UI into other DOM nodes, ideal for overlays and modals.",
        }),
        lesson({
          title: "Error Boundaries",
          slug: "react-error-boundaries",
          minutes: 15,
          objective: "Catch render errors with error boundaries.",
          intro:
            "Error boundaries are class components that catch JavaScript errors in their children and render a fallback UI instead of crashing the app.",
          concepts: [
            "- Implement componentDidCatch and getDerivedStateFromError.",
            "- Error boundaries do not catch errors in event handlers or async code.",
            "- Libraries like react-error-boundary provide hook-friendly APIs.",
          ],
          example: {
            lang: "jsx",
            code: "import { Component } from 'react';\n\nclass ErrorBoundary extends Component {\n  state = { hasError: false, message: '' };\n\n  static getDerivedStateFromError(error) {\n    return { hasError: true, message: error.message };\n  }\n\n  componentDidCatch(error, info) {\n    console.error('Boundary caught:', error, info);\n  }\n\n  render() {\n    if (this.state.hasError) {\n      return <div className=\"error\">Something went wrong. <button onClick={() => location.reload()}>Reload</button></div>;\n    }\n    return this.props.children;\n  }\n}\n\n// Usage: <ErrorBoundary><ProductPage /></ErrorBoundary>",
            output: "Child render errors show the fallback instead of a blank page.",
          },
          mistakes: [
            "Expecting boundaries to catch async errors — they only catch render/lifecycle errors.",
            "Creating one giant boundary instead of scoped ones per feature.",
          ],
          bestPractices: [
            "Wrap major sections (routes, widgets) with their own boundaries.",
            "Log boundary errors with context for diagnosis.",
          ],
          exerciseTitle: "Feature Boundary",
          exerciseDescription: "Create an ErrorBoundary and wrap two independent sections of a page.",
          exerciseRequirements: [
            "Implement the boundary class",
            "Render a fallback UI",
            "Wrap two sections separately so one failure does not kill the page",
          ],
          challenge: "Add a reset button that clears the error state instead of reloading.",
          summary:
            "Error boundaries contain render failures to a fallback UI per section.",
        }),
      ],
    },
    {
      title: "Performance",
      description: "Profiling and optimizing React apps",
      lessons: [
        lesson({
          title: "Why Components Re-render",
          slug: "react-rerenders",
          minutes: 20,
          objective: "Understand re-render triggers and how to inspect them.",
          intro:
            "A component re-renders when its state changes, its props change, or its parent re-renders. Knowing why helps you fix performance problems.",
          concepts: [
            "- Parent re-renders re-render all children by default.",
            "- React DevTools Profiler shows render commits and durations.",
            "- console.log in render shows how often a component renders.",
          ],
          example: {
            lang: "jsx",
            code: "function ExpensiveItem({ item }) {\n  console.log('Rendering', item.id);\n  return <li>{item.name}</li>;\n}\n\nfunction List({ items, onRefresh }) {\n  console.log('List re-rendered');\n  return (\n    <div>\n      <button onClick={onRefresh}>Refresh</button>\n      <ul>{items.map((i) => <ExpensiveItem key={i.id} item={i} />)}</ul>\n    </div>\n  );\n}",
            output: "Refreshing re-renders the List and every ExpensiveItem.",
          },
          mistakes: [
            "Optimizing before profiling — premature optimization.",
            "Assuming memo fixes everything (it adds comparison cost).",
          ],
          bestPractices: [
            "Profile with React DevTools first.",
            "Keep state as close to where it is used as possible.",
          ],
          exerciseTitle: "Render Audit",
          exerciseDescription: "Add console.log to a parent and child, then change state and observe the render cascade.",
          exerciseRequirements: [
            "Log in both parent and child",
            "Change parent state",
            "Document which components re-rendered and why",
          ],
          challenge: "Fix the cascade with memo + useCallback and re-audit.",
          summary:
            "Re-renders cascade from parents. Profile before optimizing.",
        }),
        lesson({
          title: "Code Splitting & Lazy",
          slug: "react-code-splitting",
          minutes: 20,
          objective: "Load heavy components on demand with React.lazy.",
          intro:
            "Code splitting breaks the bundle into chunks loaded on demand, shrinking the initial payload. React.lazy + Suspense defer component loading until needed.",
          concepts: [
            "- const Charts = React.lazy(() => import('./Charts')).",
            "- Wrap lazy components in <Suspense fallback={...}>.",
            "- Route-level splitting is the highest-impact place to start.",
          ],
          example: {
            lang: "jsx",
            code: "import { lazy, Suspense } from 'react';\n\nconst DashboardCharts = lazy(() => import('./DashboardCharts'));\n\nfunction Dashboard() {\n  return (\n    <div>\n      <h1>Dashboard</h1>\n      <Suspense fallback={<div className=\"skeleton\">Loading charts...</div>}>\n        <DashboardCharts />\n      </Suspense>\n    </div>\n  );\n}",
            output: "Charts JS only downloads when Dashboard renders.",
          },
          mistakes: [
            "Lazy-loading tiny components — the overhead beats the savings.",
            "Forgetting Suspense — lazy components throw a promise without it.",
          ],
          bestPractices: [
            "Split at route boundaries first.",
            "Give Suspense a meaningful fallback (skeletons).",
          ],
          exerciseTitle: "Lazy Widget",
          exerciseDescription: "Lazy-load a heavy widget (a chart or editor) with Suspense.",
          exerciseRequirements: [
            "Use React.lazy + dynamic import",
            "Provide a Suspense fallback",
            "Verify the chunk loads on demand in the network tab",
          ],
          challenge: "Preload the widget on hover using a small script.",
          summary:
            "React.lazy + Suspense defer heavy code until it is actually needed.",
        }),
        lesson({
          title: "Virtualized Lists",
          slug: "react-virtualized",
          minutes: 15,
          objective: "Render large lists efficiently with virtualization.",
          intro:
            "Rendering 10,000 rows at once freezes the browser. Virtualization renders only the visible window of rows and reuses DOM nodes as you scroll.",
          concepts: [
            "- Libraries: react-window, @tanstack/react-virtual.",
            "- Fixed vs dynamic row heights matter for the algorithm.",
            "- Window only the list container, not the whole page.",
          ],
          example: {
            lang: "jsx",
            code: "import { FixedSizeList as List } from 'react-window';\n\nfunction Row({ index, style }) {\n  return <div style={style}>Row {index + 1}</div>;\n}\n\nfunction VirtualList() {\n  return (\n    <List height={400} itemCount={100000} itemSize={35} width=\"100%\">\n      {Row}\n    </List>\n  );\n}",
            output: "100,000 rows scroll smoothly; only visible ones are in the DOM.",
          },
          mistakes: [
            "Virtualizing lists under ~100 items — unnecessary complexity.",
            "Variable heights without measurement — wrong scroll math.",
          ],
          bestPractices: [
            "Keep row components light and memoized.",
            "Use a key for each row when data can reorder.",
          ],
          exerciseTitle: "Virtualized Feed",
          exerciseDescription: "Replace a plain map over 10,000 items with a virtualized list.",
          exerciseRequirements: [
            "Install react-window",
            "Render 10,000+ items virtually",
            "Keep the visible rows interactive",
          ],
          challenge: "Measure the render time before and after and compare.",
          summary:
            "Virtualization renders only what is visible, keeping huge lists smooth.",
        }),
      ],
    },
    {
      title: "Testing React",
      description: "Vitest, React Testing Library, and testing strategies",
      lessons: [
        lesson({
          title: "Testing Setup",
          slug: "react-testing-setup",
          minutes: 20,
          objective: "Set up Vitest and React Testing Library.",
          intro:
            "Vitest runs tests fast with Vite. React Testing Library renders components and interacts with them the way users do.",
          concepts: [
            "- Vitest config with jsdom environment.",
            "- render(<App />) then screen.getByRole/getByText.",
            "- fireEvent / userEvent simulate interactions.",
          ],
          example: {
            lang: "jsx",
            code: "import { render, screen, fireEvent } from '@testing-library/react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;\n}\n\ntest('increments on click', () => {\n  render(<Counter />);\n  const button = screen.getByRole('button', { name: /Count: 0/ });\n  fireEvent.click(button);\n  expect(screen.getByRole('button', { name: /Count: 1/ })).toBeInTheDocument();\n});",
            output: "The test clicks the button and asserts the new label.",
          },
          mistakes: [
            "Querying by test ids when roles/text work — prefer user-visible queries.",
            "Not cleaning up between tests (RTL does this automatically).",
          ],
          bestPractices: [
            "Test behavior, not implementation details.",
            "Use getByRole with accessible names.",
          ],
          exerciseTitle: "First Component Test",
          exerciseDescription: "Write a test for a counter component covering increment and reset.",
          exerciseRequirements: [
            "Set up Vitest + RTL",
            "Render the component",
            "Assert behavior with user-visible queries",
          ],
          challenge: "Test keyboard interaction: focus the button and press Enter.",
          summary:
            "Vitest + React Testing Library test components the way users use them.",
        }),
        lesson({
          title: "Testing Async & Mocking",
          slug: "react-testing-async",
          minutes: 25,
          objective: "Test data fetching with mocks and waitFor.",
          intro:
            "Async components need mocked fetch calls and waitFor to resolve promises. Mock modules with vi.mock to isolate the component.",
          concepts: [
            "- vi.fn() and vi.mock() replace fetch or service modules.",
            "- waitFor(() => expect(...)) waits for async UI updates.",
            "- findBy* queries are async versions of getBy*.",
          ],
          example: {
            lang: "jsx",
            code: "global.fetch = vi.fn(() =>\n  Promise.resolve({\n    ok: true,\n    json: () => Promise.resolve([{ id: 1, name: 'Ada' }]),\n  })\n);\n\ntest('loads users', async () => {\n  render(<Users />);\n  expect(screen.getByText('Loading...')).toBeInTheDocument();\n  const user = await screen.findByText('Ada');\n  expect(user).toBeInTheDocument();\n});",
            output: "The test asserts loading first, then the fetched name appears.",
          },
          mistakes: [
            "Asserting immediately after an async render without await.",
            "Mocking the entire library instead of just the network layer.",
          ],
          bestPractices: [
            "Mock at the boundary: fetch or your service layer.",
            "Test error states too: reject the promise and expect the error UI.",
          ],
          exerciseTitle: "Async Test",
          exerciseDescription: "Write tests for a fetching component: success, loading, and error paths.",
          exerciseRequirements: [
            "Mock fetch with vi.fn",
            "Test the loading state",
            "Test success and error rendering",
          ],
          challenge: "Assert the retry button refetches after an error.",
          summary:
            "Mock network boundaries and use findBy/waitFor for async assertions.",
        }),
        lesson({
          title: "Testing User Flows",
          slug: "react-testing-flows",
          minutes: 25,
          objective: "Test complete user flows with Testing Library.",
          intro:
            "Flow tests walk through a user journey — fill a form, submit, see the result. They catch integration bugs unit tests miss.",
          concepts: [
            "- userEvent for realistic typing, clicking, keyboard.",
            "- Combine render with router/history providers when components navigate.",
            "- Assert on final UI state, not intermediate calls.",
          ],
          example: {
            lang: "jsx",
            code: "import userEvent from '@testing-library/user-event';\n\nasync function setup() {\n  const user = userEvent.setup();\n  render(<LoginForm />);\n  return user;\n}\n\ntest('login flow shows error for bad email', async () => {\n  const user = await setup();\n  await user.type(screen.getByLabelText(/email/i), 'not-an-email');\n  await user.type(screen.getByLabelText(/password/i), 'secret123');\n  await user.click(screen.getByRole('button', { name: /login/i }));\n  expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();\n});",
            output: "Typing into labeled inputs and submitting shows the validation error.",
          },
          mistakes: [
            "Typing into inputs without labels (getByLabelText fails).",
            "Using fireEvent when userEvent better simulates real typing.",
          ],
          bestPractices: [
            "Use userEvent.setup() for each test.",
            "Wrap components in the providers they need (Router, QueryClient).",
          ],
          exerciseTitle: "Login Flow Test",
          exerciseDescription: "Test a login form end to end: validation error, then successful submit with mocked auth.",
          exerciseRequirements: [
            "Use userEvent for interaction",
            "Test validation failure",
            "Test successful submit calls the API",
          ],
          challenge: "Test that the submit button is disabled while pending.",
          summary:
            "Flow tests simulate real user journeys through forms and interactions.",
        }),
      ],
    },
    {
      title: "Architecture & Project Structure",
      description: "Organizing React apps for scale",
      lessons: [
        lesson({
          title: "Feature-Based Structure",
          slug: "react-architecture",
          minutes: 20,
          objective: "Organize projects by feature rather than by file type.",
          intro:
            "Feature folders group all code for a feature — components, hooks, services, tests — making it easy to find and delete related code.",
          concepts: [
            "- src/features/<feature>/ with components/, hooks/, api/, tests/.",
            "- Shared UI lives in src/components/ui.",
            "- Domain logic in services/hooks, not inside components.",
          ],
          example: {
            lang: "text",
            code: "src/\n  app/          # routing & pages\n  components/   # shared UI\n  features/\n    auth/\n      components/\n      hooks/\n      api.ts\n    products/\n      components/\n      api.ts\n  lib/          # utils, config\n  types/",
            output: "A scalable, navigable project layout.",
          },
          mistakes: [
            "Deeply nested prop drilling because logic lives in page components.",
            "A flat components folder with hundreds of files.",
          ],
          bestPractices: [
            "Co-locate tests with their feature.",
            "Keep pages thin — delegate to feature components.",
          ],
          exerciseTitle: "Refactor Layout",
          exerciseDescription: "Reorganize a small app into feature folders for auth and products.",
          exerciseRequirements: [
            "Create at least 2 feature folders",
            "Move related files together",
            "Keep shared UI separate",
          ],
          challenge: "Extract the data-fetching logic from components into api.ts modules.",
          summary:
            "Feature folders scale better than file-type folders.",
        }),
        lesson({
          title: "State Management Decisions",
          slug: "react-state-decisions",
          minutes: 20,
          objective: "Choose the right state solution per concern.",
          intro:
            "Not all state is the same: local UI state, shared client state, server cache, and URL state each have a best-fit tool.",
          concepts: [
            "- Local state: useState for one component.",
            "- Shared client state: Context for low-frequency data (theme, auth).",
            "- Server state: TanStack Query for cache, dedupe, refetch.",
            "- URL state: search params for shareable filters.",
          ],
          example: {
            lang: "jsx",
            code: "// Example decision map\n// 1. Is it local to one component?        -> useState\n// 2. Is it server data?                   -> TanStack Query\n// 3. Is it needed by many components?     -> Context / Zustand\n// 4. Should it survive refresh/share?     -> URL params\n// 5. Complex domain state with actions?   -> useReducer",
            output: "A quick decision guide for choosing state tools.",
          },
          mistakes: [
            "Putting server data in Context instead of a query cache.",
            "Reaching for a global store for state used in one component.",
          ],
          bestPractices: [
            "Start local, lift when needed.",
            "Document the chosen pattern per state type.",
          ],
          exerciseTitle: "State Audit",
          exerciseDescription: "Audit an existing app and move each piece of state to the right solution.",
          exerciseRequirements: [
            "Identify 5+ state usages",
            "Classify each by the decision map",
            "Refactor at least 2 to a better fit",
          ],
          challenge: "Move a filter from local state to URL search params.",
          summary:
            "Match the state tool to the state's nature: local, server, shared, or URL.",
        }),
        lesson({
          title: "Component Design",
          slug: "react-component-design",
          minutes: 15,
          objective: "Design reusable, composable components.",
          intro:
            "Good components are small, single-purpose, and accept props rather than reaching into global state. Design the API (props) before the internals.",
          concepts: [
            "- Props define the contract: data in, events out (onX).",
            "- Compound components share implicit state (Select + Option).",
            "- Presentational vs container: UI vs data wiring.",
          ],
          example: {
            lang: "jsx",
            code: "// Bad: component reaches into global state\nfunction UserBadge() {\n  const user = useStore((s) => s.user);\n  return <span>{user.name}</span>;\n}\n\n// Good: data comes in as props\nfunction UserBadge({ name, role }) {\n  return (\n    <span className=\"badge\">\n      {name} · {role}\n    </span>\n  );\n}",
            output: "Prop-driven components are reusable anywhere.",
          },
          mistakes: [
            "Components that fetch their own data — hard to test and reuse.",
            "Giant components with many unrelated concerns.",
          ],
          bestPractices: [
            "One responsibility per component.",
            "Accept props, emit callbacks; keep global access at the edges.",
          ],
          exerciseTitle: "Prop Design",
          exerciseDescription: "Refactor a component that uses global state to accept props instead.",
          exerciseRequirements: [
            "Identify global state used inside a component",
            "Move it to props",
            "Update the parent to pass the data",
          ],
          challenge: "Add a children slot to make the component composable.",
          summary:
            "Design components around a clean props contract: data in, events out.",
        }),
      ],
    },
    {
      title: "Deployment",
      description: "Building and shipping React apps",
      lessons: [
        lesson({
          title: "Production Builds",
          slug: "react-production-build",
          minutes: 15,
          objective: "Create and analyze production builds.",
          intro:
            "Production builds minify, tree-shake, and optimize for speed. Analyze the output to catch bundle bloat.",
          concepts: [
            "- npm run build produces a dist/ folder.",
            "- Vite uses Rollup under the hood for bundling.",
            "- Build analysis tools (vite-bundle-visualizer) show bundle contents.",
          ],
          example: {
            lang: "bash",
            code: "npm run build\n# dist/ output with hashed filenames\n\nnpx vite-bundle-visualizer\n# opens a treemap of your bundle",
            output: "Optimized, hashed assets ready to deploy.",
          },
          mistakes: [
            "Deploying the dev server output (npm run dev) instead of a build.",
            "Ignoring large dependency bloat in the bundle.",
          ],
          bestPractices: [
            "Check bundle size in CI.",
            "Lazy-load heavy third-party libraries.",
          ],
          exerciseTitle: "Build & Analyze",
          exerciseDescription: "Run a production build and analyze the bundle for large chunks.",
          exerciseRequirements: [
            "Run the production build",
            "Run a bundle analyzer",
            "Identify the largest dependencies",
          ],
          challenge: "Code-split the largest library and re-measure the initial bundle.",
          summary:
            "Production builds optimize output; bundle analysis prevents bloat.",
        }),
        lesson({
          title: "Environment Variables",
          slug: "react-env-vars",
          minutes: 15,
          objective: "Manage environment-specific configuration safely.",
          intro:
            "Environment variables configure apps per environment. Only VITE_-prefixed variables are exposed to the client bundle — everything else stays server-side.",
          concepts: [
            "- .env, .env.production, .env.development files.",
            "- VITE_API_URL is inlined into the client bundle.",
            "- Never put secrets (API keys, tokens) in VITE_ variables.",
          ],
          example: {
            lang: "bash",
            code: "# .env\nVITE_API_URL=https://api.example.com\n\n# Only in server code / build steps:\nDATABASE_URL=postgresql://...",
            output: "Client code reads VITE_API_URL; server secrets stay hidden.",
          },
          mistakes: [
            "Exposing secret keys through VITE_ prefixed variables.",
            "Hardcoding API URLs for different environments.",
          ],
          bestPractices: [
            "Create .env.example documenting all variables.",
            "Validate required variables at startup.",
          ],
          exerciseTitle: "Env Setup",
          exerciseDescription: "Move a hardcoded API URL into an environment variable.",
          exerciseRequirements: [
            "Create a .env file with the URL",
            "Read it via import.meta.env",
            "Add a .env.example",
          ],
          challenge: "Add a validation check that fails fast when the variable is missing.",
          summary:
            "Use VITE_ variables for client config and keep secrets out of the bundle.",
        }),
        lesson({
          title: "Hosting Options",
          slug: "react-hosting",
          minutes: 15,
          objective: "Deploy a React SPA to static hosts.",
          intro:
            "A Vite React SPA is static files — any static host works. The key detail is configuring SPA fallback so deep links serve index.html.",
          concepts: [
            "- Netlify, Vercel, Cloudflare Pages, GitHub Pages.",
            "- SPA fallback: redirect all routes to index.html.",
            "- Netlify: a _redirects file or netlify.toml with /* /index.html 200.",
          ],
          example: {
            lang: "text",
            code: "# public/_redirects\n/*    /index.html   200",
            output: "Any URL path serves the SPA shell.",
          },
          mistakes: [
            "Deep links 404ing because the host has no SPA fallback.",
            "Committing build output or .env files.",
          ],
          bestPractices: [
            "Set the build command and output directory in the host config.",
            "Add security headers on the host.",
          ],
          exerciseTitle: "Deploy to Netlify",
          exerciseDescription: "Deploy your app to Netlify with SPA fallback configured.",
          exerciseRequirements: [
            "Create the SPA fallback file",
            "Set build command to npm run build",
            "Deploy and verify a deep link works",
          ],
          challenge: "Add cache headers for hashed assets.",
          summary:
            "Static hosts plus SPA fallback make React apps deployable anywhere.",
        }),
      ],
    },
    {
      title: "Real World Project — Task Manager",
      description: "Build a complete task manager app",
      lessons: [
        lesson({
          title: "Project Setup & Data Model",
          slug: "react-project-setup",
          minutes: 30,
          objective: "Plan and scaffold a task manager application.",
          intro:
            "This final module builds a task manager with categories, search, and persistence. Start with the data model and the project scaffold.",
          concepts: [
            "- Task shape: { id, title, category, done, createdAt }.",
            "- Persistence via localStorage (upgrade to an API later).",
            "- Folder structure: features/tasks with components and hooks.",
          ],
          example: {
            lang: "jsx",
            code: "const initialTasks = [\n  { id: 1, title: 'Learn React', category: 'Study', done: true, createdAt: Date.now() },\n  { id: 2, title: 'Build task app', category: 'Project', done: false, createdAt: Date.now() },\n];\n\nfunction loadTasks() {\n  const raw = localStorage.getItem('tasks');\n  return raw ? JSON.parse(raw) : initialTasks;\n}",
            output: "Tasks load from localStorage with sensible defaults.",
          },
          mistakes: [
            "Skipping the data-model design step.",
            "Hardcoding tasks instead of loading from storage.",
          ],
          bestPractices: [
            "Define the TypeScript types for your entities first.",
            "Keep storage access in a small service module.",
          ],
          exerciseTitle: "Scaffold & Model",
          exerciseDescription: "Create the task types, storage service, and project folders.",
          exerciseRequirements: [
            "Define a Task type",
            "Create load/save storage functions",
            "Set up feature folders",
          ],
          challenge: "Add a dueDate field and render it formatted.",
          summary:
            "A clear data model and storage layer set up the whole project.",
        }),
        lesson({
          title: "Core Features",
          slug: "react-project-features",
          minutes: 40,
          objective: "Implement add, toggle, delete, and filter tasks.",
          intro:
            "With the model in place, build the UI: an input to add tasks, checkboxes to toggle, delete buttons, and filters for status and category.",
          concepts: [
            "- Lifting state to a TaskList container.",
            "- Derived lists via useMemo for filters.",
            "- Controlled form input with Enter-to-submit.",
          ],
          example: {
            lang: "jsx",
            code: "function TaskApp() {\n  const [tasks, setTasks] = useState(loadTasks);\n  const [filter, setFilter] = useState('all');\n\n  useEffect(() => localStorage.setItem('tasks', JSON.stringify(tasks)), [tasks]);\n\n  const addTask = (title) => {\n    setTasks((prev) => [\n      { id: Date.now(), title, category: 'General', done: false, createdAt: Date.now() },\n      ...prev,\n    ]);\n  };\n\n  const toggleTask = (id) =>\n    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));\n\n  const deleteTask = (id) => setTasks((prev) => prev.filter((t) => t.id !== id));\n\n  const visible = tasks.filter((t) =>\n    filter === 'all' ? true : filter === 'done' ? t.done : !t.done\n  );\n\n  return (\n    <div>\n      <TaskInput onAdd={addTask} />\n      <FilterTabs current={filter} onChange={setFilter} />\n      <ul>{visible.map((t) => <TaskItem key={t.id} task={t} onToggle={toggleTask} onDelete={deleteTask} />)}</ul>\n    </div>\n  );\n}",
            output: "A complete task list with persistence, filters, and actions.",
          },
          mistakes: [
            "Mutating tasks array directly instead of mapping to new arrays.",
            "Storing the whole filter logic inline in JSX.",
          ],
          bestPractices: [
            "Use functional setState for derived updates.",
            "Persist in an effect keyed on tasks.",
          ],
          exerciseTitle: "Build Core UI",
          exerciseDescription: "Implement add, toggle, delete, and the all/active/done filters.",
          exerciseRequirements: [
            "Add a controlled task input",
            "Implement all three actions immutably",
            "Implement the filters",
            "Persist to localStorage",
          ],
          challenge: "Add category tagging and a category filter dropdown.",
          summary:
            "Core CRUD plus filters and persistence make the app genuinely useful.",
        }),
        lesson({
          title: "Polish & Deploy",
          slug: "react-project-deploy",
          minutes: 30,
          objective: "Add empty states, stats, and deploy the finished app.",
          intro:
            "Finish the product: empty states, completion stats, keyboard shortcuts, and a production deployment.",
          concepts: [
            "- Empty state when no tasks match.",
            "- Progress bar from derived completion stats.",
            "- Deploy the build to a static host.",
          ],
          example: {
            lang: "jsx",
            code: "const done = tasks.filter((t) => t.done).length;\nconst progress = tasks.length ? Math.round((done / tasks.length) * 100) : 0;\n\nif (visible.length === 0) {\n  return (\n    <div className=\"empty\">\n      <p>No tasks {filter !== 'all' ? 'in this view' : 'yet'}.</p>\n      <button onClick={() => setFilter('all')}>Show all</button>\n    </div>\n  );\n}",
            output: "Friendly empty states and a live completion bar.",
          },
          mistakes: [
            "Shipping without empty/error states.",
            "Forgetting to verify the production build locally before deploying.",
          ],
          bestPractices: [
            "Review accessibility: labels, focus, keyboard support.",
            "Verify the deployed site on mobile.",
          ],
          exerciseTitle: "Final Polish",
          exerciseDescription: "Add empty states, stats, and deploy your task manager.",
          exerciseRequirements: [
            "Empty states for filters",
            "Completion progress display",
            "Production build deployed to a host",
          ],
          challenge: "Add keyboard shortcut 'n' to focus the new-task input.",
          summary:
            "Polish, accessibility, and a real deployment complete the project.",
        }),
      ],
    },
  ],
};