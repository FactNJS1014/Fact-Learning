import type { CourseContent } from "../seed-content";
import { lesson } from "./lesson-builder";

export const reactNativeBasic20Modules: CourseContent = {
  slug: "react-native-basic",
  modules: [
    {
      title: "Introduction to React Native",
      description: "What React Native is and setup",
      lessons: [
        lesson({
          title: "What is React Native?",
          slug: "rn-intro",
          minutes: 12,
          objective: "Understand React Native and when to use it.",
          intro:
            "React Native lets you build native iOS and Android apps with React and JavaScript. Components map to real native views, not webviews.",
          concepts: [
            "- **Native components**: View, Text, ScrollView render native UI.",
            "- **One codebase**: same JS for iOS and Android.",
            "- **JS + native bridge**: logic in JS, UI in native.",
            "- Expo simplifies tooling and testing.",
          ],
          example: {
            lang: "tsx",
            code: "import { Text, View } from 'react-native';\n\nexport default function App() {\n  return (\n    <View>\n      <Text>Hello, React Native!</Text>\n    </View>\n  );\n}",
            output: "A native screen showing the greeting.",
          },
          mistakes: [
            "Using web tags (div, span) — use RN components.",
            "Assuming a webview renders HTML.",
          ],
          bestPractices: [
            "Start with Expo for fast iteration.",
            "Test on a real device early.",
          ],
          exerciseTitle: "First App",
          exerciseDescription: "Create an Expo app and render your name with native components.",
          exerciseRequirements: [
            "Expo project",
            "View + Text",
            "Custom styling",
          ],
          challenge: "Add a second screen and navigate between them.",
          summary:
            "React Native renders real native UI from React components.",
        }),
        lesson({
          title: "Environment Setup",
          slug: "rn-setup",
          minutes: 20,
          objective: "Set up Expo and run on device/simulator.",
          intro:
            "Expo is the fastest path: no Xcode/Android Studio required for development, with Expo Go for on-device testing.",
          concepts: [
            "- npx create-expo-app my-app.",
            "- npm run start opens Expo Go / simulator.",
            "- Expo Go scans QR codes for instant testing.",
          ],
          syntax: {
            lang: "bash",
            code: "npx create-expo-app@latest my-app\ncd my-app\nnpm run start\n# press i for iOS simulator, a for Android, or scan the QR",
          },
          example: {
            lang: "bash",
            code: "npx expo start --tunnel   # works from any network",
            output: "Dev server with a QR code for Expo Go.",
          },
          mistakes: [
            "Installing the full native toolchain before trying Expo.",
            "Forgetting that physical devices need the same network or --tunnel.",
          ],
          bestPractices: [
            "Use Expo Go during development.",
            "Keep Node and the Expo CLI updated.",
          ],
          exerciseTitle: "Run Everywhere",
          exerciseDescription: "Start the app on a simulator and a physical device.",
          exerciseRequirements: [
            "Project scaffolded",
            "Runs on one simulator",
            "Runs on a physical device via QR",
          ],
          challenge: "Add Expo dev-client for custom native modules.",
          summary:
            "Expo removes the native setup barrier for React Native development.",
        }),
        lesson({
          title: "Core Components",
          slug: "rn-core-components",
          minutes: 20,
          objective: "Use View, Text, Image, and ScrollView.",
          intro:
            "The core components cover most UI: View (layout), Text (labels), Image, TextInput, and ScrollView for scrollable content.",
          concepts: [
            "- View is like a div; Text like a span/p.",
            "- TextInput for input; Image for media with source.",
            "- ScrollView for scrolling; FlatList for long lists.",
          ],
          example: {
            lang: "tsx",
            code: "import { ScrollView, Text, TextInput, View, Image } from 'react-native';\n\nexport default function Profile() {\n  return (\n    <ScrollView>\n      <Image source={{ uri: 'https://example.com/avatar.png' }} style={{ width: 80, height: 80, borderRadius: 40 }} />\n      <Text>Ada Lovelace</Text>\n      <TextInput placeholder=\"Update bio\" />\n      <View style={{ padding: 12 }}>\n        <Text>Scrollable content below...</Text>\n      </View>\n    </ScrollView>\n  );\n}",
            output: "A scrollable profile screen.",
          },
          mistakes: [
            "Using web elements or HTML strings.",
            "Forgetting style objects vs className strings.",
          ],
          bestPractices: [
            "Use FlatList for long lists (virtualized).",
            "Give TextInputs placeholders and accessibility labels.",
          ],
          exerciseTitle: "Profile Screen",
          exerciseDescription: "Build a scrollable profile screen with image, text, and input.",
          exerciseRequirements: [
            "ScrollView",
            "Image with remote source",
            "TextInput",
          ],
          challenge: "Add a list of interests with FlatList.",
          summary:
            "Core components map to native UI primitives for every screen.",
        }),
      ],
    },
    {
      title: "Styling & Layout",
      description: "StyleSheet and flexbox",
      lessons: [
        lesson({
          title: "StyleSheet",
          slug: "rn-styles",
          minutes: 20,
          objective: "Style components with StyleSheet.create.",
          intro:
            "RN styles are JavaScript objects. StyleSheet.create validates and optimizes them at build time.",
          concepts: [
            "- StyleSheet.create({ container: { flex: 1, padding: 16 } }).",
            "- Inline style arrays: style={[styles.base, isActive && styles.active]}.",
            "- Units: numbers are dp; percentages and strings for some props.",
          ],
          example: {
            lang: "tsx",
            code: "import { StyleSheet, Text, View } from 'react-native';\n\nconst styles = StyleSheet.create({\n  card: {\n    backgroundColor: '#fff',\n    borderRadius: 12,\n    padding: 16,\n    margin: 8,\n    shadowColor: '#000',\n    shadowOpacity: 0.1,\n    shadowRadius: 4,\n    elevation: 3,\n  },\n  title: { fontSize: 18, fontWeight: '600' },\n});\n\nexport default function Card({ title }) {\n  return (\n    <View style={styles.card}>\n      <Text style={styles.title}>{title}</Text>\n    </View>\n  );\n}",
            output: "A platform-consistent card (shadow via elevation on Android).",
          },
          mistakes: [
            "Using web-only CSS (hover, media queries don't apply).",
            "Forgetting Android shadow needs elevation.",
          ],
          bestPractices: [
            "Create reusable style objects per component.",
            "Use conditional style arrays for states.",
          ],
          exerciseTitle: "Styled Card",
          exerciseDescription: "Build a reusable Card with title, subtitle, and image.",
          exerciseRequirements: [
            "StyleSheet.create",
            "Conditional styles",
            "Shadow/elevation",
          ],
          challenge: "Add dark-mode styles via a theme prop.",
          summary:
            "StyleSheet and flexbox cover layout and theming needs.",
        }),
        lesson({
          title: "Flexbox Layout",
          slug: "rn-flexbox",
          minutes: 25,
          objective: "Lay out screens with flexbox.",
          intro:
            "RN uses flexbox for all layout: flexDirection, justifyContent, alignItems, and flex control rows and columns.",
          concepts: [
            "- Default flexDirection is column (unlike web).",
            "- justifyContent aligns on the main axis; alignItems on the cross.",
            "- flex: 1 makes a view fill available space.",
          ],
          example: {
            lang: "tsx",
            code: "<View style={{ flex: 1, flexDirection: 'row' }}>\n  <View style={{ flex: 1, backgroundColor: '#f87171' }} />\n  <View style={{ flex: 2, backgroundColor: '#34d399' }} />\n  <View style={{ flex: 1, backgroundColor: '#60a5fa' }} />\n</View>\n\n<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>\n  <Text>Centered content</Text>\n</View>",
            output: "A 1:2:1 row and a centered column.",
          },
          mistakes: [
            "Expecting row as the default direction.",
            "Using width percentages when flex is better.",
          ],
          bestPractices: [
            "Think flex-first: fill, space-between, center.",
            "Test layouts on small and large screens.",
          ],
          exerciseTitle: "Layouts",
          exerciseDescription: "Build a header, content, footer layout with flexbox.",
          exerciseRequirements: [
            "Column layout with header/main/footer",
            "A row with space-between",
            "Centered element",
          ],
          challenge: "Build a responsive grid of cards with flexWrap.",
          summary:
            "Flexbox is the one layout system — master it.",
        }),
        lesson({
          title: "Safe Areas & Responsive",
          slug: "rn-safe-area",
          minutes: 15,
          objective: "Handle notches and screen sizes.",
          intro:
            "Notches and home indicators vary per device. SafeAreaView (or react-native-safe-area-context) insets content correctly.",
          concepts: [
            "- SafeAreaView from react-native-safe-area-context.",
            "- useSafeAreaInsets for custom positioning.",
            "- Dimensions / useWindowDimensions for responsive values.",
          ],
          example: {
            lang: "tsx",
            code: "import { SafeAreaView } from 'react-native-safe-area-context';\nimport { useWindowDimensions, Text } from 'react-native';\n\nexport default function Home() {\n  const { width } = useWindowDimensions();\n  const isCompact = width < 380;\n\n  return (\n    <SafeAreaView style={{ flex: 1 }}>\n      <Text style={{ fontSize: isCompact ? 16 : 22 }}>\n        Responsive heading\n      </Text>\n    </SafeAreaView>\n  );\n}",
            output: "Content clears the notch; font scales with width.",
          },
          mistakes: [
            "Hardcoding paddingTop for the status bar.",
            "Ignoring landscape or small devices.",
          ],
          bestPractices: [
            "Wrap screens in SafeAreaView.",
            "Derive breakpoints from useWindowDimensions.",
          ],
          exerciseTitle: "Safe Screen",
          exerciseDescription: "Convert two screens to SafeAreaView with responsive text.",
          exerciseRequirements: [
            "SafeAreaView both",
            "Responsive sizing",
            "Landscape test",
          ],
          challenge: "Add insets-based absolute positioning for a floating button.",
          summary:
            "Safe areas and window dimensions make layouts device-proof.",
        }),
      ],
    },
    {
      title: "State & Props",
      description: "Component data flow",
      lessons: [
        lesson({
          title: "Props",
          slug: "rn-props",
          minutes: 15,
          objective: "Pass data with typed props.",
          intro:
            "Props flow parent to child, exactly like React web. TypeScript interfaces document the contract.",
          concepts: [
            "- Define a Props interface per component.",
            "- Defaults via destructuring.",
            "- Children render between component tags.",
          ],
          example: {
            lang: "tsx",
            code: "type UserBadgeProps = {\n  name: string;\n  role?: string;\n};\n\nexport default function UserBadge({ name, role = 'student' }: UserBadgeProps) {\n  return (\n    <View style={{ flexDirection: 'row', alignItems: 'center' }}>\n      <Text style={{ fontWeight: '600' }}>{name}</Text>\n      <Text style={{ marginLeft: 8, color: '#666' }}>{role}</Text>\n    </View>\n  );\n}",
            output: "A badge rendering name and optional role.",
          },
          mistakes: [
            "Mutating props in children.",
            "Missing defaults for optional props.",
          ],
          bestPractices: [
            "Type every prop interface.",
            "Use default values via destructuring.",
          ],
          exerciseTitle: "Props",
          exerciseDescription: "Build a ProductRow component with typed props used in a list.",
          exerciseRequirements: [
            "Typed props",
            "2 usages with different data",
            "Optional prop with default",
          ],
          challenge: "Pass a render function prop for custom content.",
          summary:
            "Typed props keep component contracts explicit.",
        }),
        lesson({
          title: "useState",
          slug: "rn-usestate",
          minutes: 20,
          objective: "Manage local state with useState.",
          intro:
            "State drives interactivity: form inputs, toggles, counters. useState works identically to React web.",
          concepts: [
            "- const [value, setValue] = useState('').",
            "- TextInput value/onChangeText pairs.",
            "- Never mutate state directly.",
          ],
          example: {
            lang: "tsx",
            code: "import { useState } from 'react';\nimport { Button, Text, TextInput, View } from 'react-native';\n\nexport default function Login() {\n  const [email, setEmail] = useState('');\n  const [password, setPassword] = useState('');\n\n  return (\n    <View style={{ padding: 16 }}>\n      <TextInput placeholder=\"Email\" value={email} onChangeText={setEmail} />\n      <TextInput placeholder=\"Password\" secureTextEntry value={password} onChangeText={setPassword} />\n      <Button title=\"Login\" onPress={() => console.log({ email, password })} />\n    </View>\n  );\n}",
            output: "Controlled inputs update state per keystroke.",
          },
          mistakes: [
            "Mutating state objects directly.",
            "Using onChange instead of onChangeText.",
          ],
          bestPractices: [
            "Derive values with useMemo when expensive.",
            "Reset state explicitly after submits.",
          ],
          exerciseTitle: "State UI",
          exerciseDescription: "Build a settings toggle and a counter using state.",
          exerciseRequirements: [
            "useState in 2 components",
            "Controlled TextInput",
            "A toggle (Switch)",
          ],
          challenge: "Share state between two components by lifting it.",
          summary:
            "useState drives all local interactivity.",
        }),
        lesson({
          title: "Hooks Overview",
          slug: "rn-hooks",
          minutes: 20,
          objective: "Use useEffect, useMemo, and custom hooks.",
          intro:
            "React hooks behave the same in RN: effects for side effects, memo for expensive values, and custom hooks for reuse.",
          concepts: [
            "- useEffect with cleanup for subscriptions.",
            "- useMemo for derived expensive values.",
            "- Custom hooks wrap platform APIs (e.g., useLocation).",
          ],
          example: {
            lang: "tsx",
            code: "import { useEffect, useState } from 'react';\n\nexport function useClock() {\n  const [now, setNow] = useState(new Date());\n\n  useEffect(() => {\n    const id = setInterval(() => setNow(new Date()), 1000);\n    return () => clearInterval(id);\n  }, []);\n\n  return now.toLocaleTimeString();\n}\n\nexport default function Clock() {\n  const time = useClock();\n  return <Text>{time}</Text>;\n}",
            output: "A ticking clock built from a custom hook.",
          },
          mistakes: [
            "Effects with missing cleanup for timers/listeners.",
            "Setting state in render loops.",
          ],
          bestPractices: [
            "Clean up every subscription.",
            "Encapsulate platform APIs in hooks.",
          ],
          exerciseTitle: "Custom Hook",
          exerciseDescription: "Create a useAppState hook that tracks the app's foreground state.",
          exerciseRequirements: [
            "Custom hook",
            "Effect with cleanup",
            "Consumed in a screen",
          ],
          challenge: "Create useDebounce for search inputs.",
          summary:
            "Hooks structure side effects and reuse across screens.",
        }),
      ],
    },
    {
      title: "Navigation",
      description: "Moving between screens",
      lessons: [
        lesson({
          title: "React Navigation Setup",
          slug: "rn-navigation-setup",
          minutes: 25,
          objective: "Install and configure React Navigation.",
          intro:
            "React Navigation is the standard: stack, tabs, and drawer navigators compose app navigation.",
          concepts: [
            "- @react-navigation/native + native-stack.",
            "- NavigationContainer wraps the app.",
            "- Stack.Screen defines routes.",
          ],
          syntax: {
            lang: "bash",
            code: "npm install @react-navigation/native @react-navigation/native-stack\nnpx expo install react-native-screens react-native-safe-area-context",
          },
          example: {
            lang: "tsx",
            code: "import { NavigationContainer } from '@react-navigation/native';\nimport { createNativeStackNavigator } from '@react-navigation/native-stack';\n\nconst Stack = createNativeStackNavigator();\n\nexport default function App() {\n  return (\n    <NavigationContainer>\n      <Stack.Navigator>\n        <Stack.Screen name=\"Home\" component={HomeScreen} />\n        <Stack.Screen name=\"Details\" component={DetailsScreen} />\n      </Stack.Navigator>\n    </NavigationContainer>\n  );\n}",
            output: "A native stack with two screens.",
          },
          mistakes: [
            "Using React Router (web) instead of React Navigation.",
            "Forgetting the native dependencies.",
          ],
          bestPractices: [
            "Type the navigator param lists.",
            "Keep screen components in separate files.",
          ],
          exerciseTitle: "Stack Setup",
          exerciseDescription: "Set up a stack navigator with three screens.",
          exerciseRequirements: [
            "NavigationContainer",
            "3 screens",
            "Param typing",
          ],
          challenge: "Add a tab navigator below the stack.",
          summary:
            "React Navigation provides native stack and tab navigation.",
        }),
        lesson({
          title: "Params & Navigation",
          slug: "rn-navigation-params",
          minutes: 20,
          objective: "Pass params and navigate programmatically.",
          intro:
            "Screens receive route params; navigation.navigate moves between screens with optional params.",
          concepts: [
            "- navigation.navigate('Details', { id: 42 }).",
            "- route.params in the destination screen.",
            "- useNavigation hook for deep components.",
          ],
          example: {
            lang: "tsx",
            code: "type RootStackParamList = {\n  Home: undefined;\n  Details: { id: number };\n};\n\nexport default function HomeScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'Home'>) {\n  return (\n    <Button\n      title=\"Open item 42\"\n      onPress={() => navigation.navigate('Details', { id: 42 })}\n    />\n  );\n}\n\nexport function DetailsScreen({ route }: NativeStackScreenProps<RootStackParamList, 'Details'>) {\n  return <Text>Item {route.params.id}</Text>;\n}",
            output: "Typed navigation with parameters.",
          },
          mistakes: [
            "Unhandled undefined params.",
            "Using any for param lists.",
          ],
          bestPractices: [
            "Type the param list fully.",
            "Validate params before use.",
          ],
          exerciseTitle: "Params",
          exerciseDescription: "Pass a course id from a list to a detail screen.",
          exerciseRequirements: [
            "Typed param list",
            "navigate with params",
            "Read route.params",
          ],
          challenge: "Add a back button with custom behavior.",
          summary:
            "Typed params and navigate() wire screens together.",
        }),
        lesson({
          title: "Tabs & Drawers",
          slug: "rn-tabs",
          minutes: 15,
          objective: "Add bottom tabs and drawer navigation.",
          intro:
            "Bottom tabs suit primary sections; drawers suit settings-heavy apps. Both compose with stacks per tab.",
          concepts: [
            "- createBottomTabNavigator.",
            "- Icons per tab with @expo/vector-icons.",
            "- Nested stacks inside tabs.",
          ],
          example: {
            lang: "tsx",
            code: "import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';\nimport { Ionicons } from '@expo/vector-icons';\n\nconst Tab = createBottomTabNavigator();\n\nexport default function Tabs() {\n  return (\n    <Tab.Navigator screenOptions={({ route }) => ({\n      tabBarIcon: ({ color, size }) => (\n        <Ionicons name={route.name === 'Home' ? 'home' : 'book'} color={color} size={size} />\n      ),\n    })}>\n      <Tab.Screen name=\"Home\" component={HomeStack} />\n      <Tab.Screen name=\"Courses\" component={CoursesStack} />\n    </Tab.Navigator>\n  );\n}",
            output: "A tab bar with icons, each tab hosting its own stack.",
          },
          mistakes: [
            "Putting every screen in the tab navigator.",
            "Forgetting active/inactive icon states.",
          ],
          bestPractices: [
            "One stack per tab.",
            "Match icons to route names.",
          ],
          exerciseTitle: "Tabs",
          exerciseDescription: "Create a tab navigator with three tabs and icons.",
          exerciseRequirements: [
            "3 tabs",
            "Icons",
            "Nested stack in one tab",
          ],
          challenge: "Hide the tab bar on a detail screen.",
          summary:
            "Tabs and drawers organize primary and secondary navigation.",
        }),
      ],
    },
    {
      title: "Lists & FlatList",
      description: "Efficient scrolling lists",
      lessons: [
        lesson({
          title: "FlatList",
          slug: "rn-flatlist",
          minutes: 25,
          objective: "Render efficient lists with FlatList.",
          intro:
            "FlatList virtualizes rows — only visible items render — making it the right choice for any list longer than a screen.",
          concepts: [
            "- data, renderItem, keyExtractor props.",
            "- ItemSeparatorComponent and ListHeaderComponent.",
            "- onEndReached for infinite scroll.",
          ],
          example: {
            lang: "tsx",
            code: "import { FlatList, Text, View } from 'react-native';\n\nconst COURSES = Array.from({ length: 100 }, (_, i) => ({ id: i, title: 'Course ' + i }));\n\nexport default function CourseList() {\n  return (\n    <FlatList\n      data={COURSES}\n      keyExtractor={(item) => String(item.id)}\n      renderItem={({ item }) => (\n        <View style={{ padding: 16, borderBottomWidth: 1, borderColor: '#eee' }}>\n          <Text>{item.title}</Text>\n        </View>\n      )}\n    />\n  );\n}",
            output: "100 rows scroll smoothly with virtualization.",
          },
          mistakes: [
            "Using ScrollView + map for long lists (renders everything).",
            "No keyExtractor — index keys break with reordering.",
          ],
          bestPractices: [
            "Always keyExtractor.",
            "Use getItemLayout for fixed-height rows.",
          ],
          exerciseTitle: "FlatList",
          exerciseDescription: "Build a course list with headers and separators.",
          exerciseRequirements: [
            "FlatList with keyExtractor",
            "ListHeaderComponent",
            "ItemSeparatorComponent",
          ],
          challenge: "Add infinite scroll with onEndReached.",
          summary:
            "FlatList virtualizes lists for smooth performance.",
        }),
        lesson({
          title: "Pull-to-Refresh & Empty States",
          slug: "rn-list-states",
          minutes: 15,
          objective: "Add refresh and empty states to lists.",
          intro:
            "Users expect pull-to-refresh and friendly empty states. FlatList supports both natively.",
          concepts: [
            "- refreshing + onRefresh props.",
            "- ListEmptyComponent renders when data is empty.",
            "- Combine with loading skeletons.",
          ],
          example: {
            lang: "tsx",
            code: "export default function Feed({ data, loading, onRefresh }) {\n  return (\n    <FlatList\n      data={data}\n      keyExtractor={(item) => item.id}\n      renderItem={renderItem}\n      refreshing={loading}\n      onRefresh={onRefresh}\n      ListEmptyComponent={\n        <View style={{ padding: 40, alignItems: 'center' }}>\n          <Text style={{ fontSize: 18 }}>No items yet</Text>\n          <Text style={{ color: '#666', marginTop: 8 }}>Pull down to refresh</Text>\n        </View>\n      }\n    />\n  );\n}",
            output: "Refresh spinner and empty-state messaging.",
          },
          mistakes: [
            "Empty state rendered as a row (styling leaks).",
            "Loading state blocking the whole screen.",
          ],
          bestPractices: [
            "Use ListEmptyComponent.",
            "Keep skeletons or spinners lightweight.",
          ],
          exerciseTitle: "List States",
          exerciseDescription: "Add pull-to-refresh and an empty state to a list.",
          exerciseRequirements: [
            "onRefresh + refreshing",
            "ListEmptyComponent",
            "Simulated async refresh",
          ],
          challenge: "Add a loading skeleton via ListEmptyComponent while first loading.",
          summary:
            "Refresh and empty states complete the list UX.",
        }),
      ],
    },
    {
      title: "Forms & Inputs",
      description: "Text input, keyboards, and validation",
      lessons: [
        lesson({
          title: "TextInput Patterns",
          slug: "rn-textinput",
          minutes: 20,
          objective: "Handle inputs: controlled values, keyboards, and focus.",
          intro:
            "TextInput handles text entry; keyboardType and returnKeyType tune the keyboard; refs manage focus.",
          concepts: [
            "- value + onChangeText controlled pattern.",
            "- keyboardType: email-address, number-pad, secureTextEntry.",
            "- ref.focus() moves focus programmatically.",
          ],
          example: {
            lang: "tsx",
            code: "const emailRef = useRef<TextInput>(null);\n\n<TextInput\n  placeholder=\"Email\"\n  keyboardType=\"email-address\"\n  autoCapitalize=\"none\"\n  returnKeyType=\"next\"\n  onSubmitEditing={() => passwordRef.current?.focus()}\n/>\n<TextInput\n  ref={passwordRef}\n  placeholder=\"Password\"\n  secureTextEntry\n  returnKeyType=\"done\"\n/>",
            output: "Email keyboard, tab-to-password via return key.",
          },
          mistakes: [
            "autoCapitalize left on for emails (annoying).",
            "Ignoring keyboard types.",
          ],
          bestPractices: [
            "Configure keyboard and return key per field.",
            "Manage focus flow for multi-field forms.",
          ],
          exerciseTitle: "Login Form",
          exerciseDescription: "Build a login form with proper keyboards and focus flow.",
          exerciseRequirements: [
            "2+ TextInputs",
            "Keyboard types",
            "Focus chaining",
          ],
          challenge: "Dismiss the keyboard on submit.",
          summary:
            "TextInput configuration shapes the mobile typing experience.",
        }),
        lesson({
          title: "Form Validation",
          slug: "rn-form-validation",
          minutes: 20,
          objective: "Validate inputs and show errors.",
          intro:
            "Validate on submit (and on change after first error) and show per-field messages below inputs.",
          concepts: [
            "- errors object in state.",
            "- Validate function returning field errors.",
            "- accessible error text via accessibilityLabel or live regions.",
          ],
          example: {
            lang: "tsx",
            code: "function validate(email: string, password: string) {\n  const errors: Record<string, string> = {};\n  if (!/\\S+@\\S+\\.\\S+/.test(email)) errors.email = 'Enter a valid email';\n  if (password.length < 8) errors.password = 'Minimum 8 characters';\n  return errors;\n}\n\nfunction handleSubmit() {\n  const errors = validate(email, password);\n  setErrors(errors);\n  if (Object.keys(errors).length === 0) {\n    // submit\n  }\n}",
            output: "Field errors block submission.",
          },
          mistakes: [
            "Only checking required fields.",
            "Showing errors before the user interacts.",
          ],
          bestPractices: [
            "Validate on change after first submit attempt.",
            "Make error text reachable by screen readers.",
          ],
          exerciseTitle: "Validated Form",
          exerciseDescription: "Add validation and error display to a signup form.",
          exerciseRequirements: [
            "3+ rules",
            "Error text under inputs",
            "Submit disabled while invalid",
          ],
          challenge: "Use a validation library like zod.",
          summary:
            "Per-field validation with clear errors improves mobile forms.",
        }),
      ],
    },
    {
      title: "Networking & APIs",
      description: "Fetching data in mobile apps",
      lessons: [
        lesson({
          title: "fetch & State",
          slug: "rn-fetch",
          minutes: 20,
          objective: "Fetch data with loading/error/data states.",
          intro:
            "Use fetch or axios in effects, track loading/error/data, and render states. The patterns match React web.",
          concepts: [
            "- useEffect + useState for fetching.",
            "- AbortController cancels on unmount.",
            "- Refresh patterns re-run the fetch.",
          ],
          example: {
            lang: "tsx",
            code: "export function useCourses() {\n  const [courses, setCourses] = useState([]);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState<string | null>(null);\n\n  const load = useCallback(async () => {\n    setLoading(true);\n    setError(null);\n    try {\n      const res = await fetch('https://api.example.com/courses');\n      if (!res.ok) throw new Error('HTTP ' + res.status);\n      setCourses(await res.json());\n    } catch (e) {\n      setError(e.message);\n    } finally {\n      setLoading(false);\n    }\n  }, []);\n\n  useEffect(() => { load(); }, [load]);\n\n  return { courses, loading, error, reload: load };\n}",
            output: "A reusable fetching hook with all states.",
          },
          mistakes: [
            "Setting state after unmount.",
            "Not checking res.ok.",
          ],
          bestPractices: [
            "Wrap fetch in hooks.",
            "Show friendly errors with retry.",
          ],
          exerciseTitle: "Fetch Hook",
          exerciseDescription: "Create useCourses with loading, error, and reload.",
          exerciseRequirements: [
            "Hook with all states",
            "Error display with retry",
            "Cleanup-safe",
          ],
          challenge: "Add caching with a simple in-memory store.",
          summary:
            "Fetching hooks standardize loading, error, and retry.",
        }),
        lesson({
          title: "API Clients & Auth",
          slug: "rn-api-auth",
          minutes: 25,
          objective: "Centralize API calls with auth headers.",
          intro:
            "A single API client adds auth headers, handles 401s, and centralizes error handling.",
          concepts: [
            "- Client with base URL and token injection.",
            "- 401 handling → logout + redirect.",
            "- Secure token storage: expo-secure-store.",
          ],
          example: {
            lang: "tsx",
            code: "import * as SecureStore from 'expo-secure-store';\n\nasync function api(path: string, options: RequestInit = {}) {\n  const token = await SecureStore.getItemAsync('token');\n\n  const res = await fetch(API_BASE + path, {\n    ...options,\n    headers: {\n      'Content-Type': 'application/json',\n      ...(token ? { Authorization: 'Bearer ' + token } : {}),\n      ...options.headers,\n    },\n  });\n\n  if (res.status === 401) {\n    await SecureStore.deleteItemAsync('token');\n    throw new ApiError('Session expired', 401);\n  }\n\n  return res;\n}",
            output: "Authenticated, centralized API access.",
          },
          mistakes: [
            "Storing tokens in AsyncStorage (unencrypted).",
            "Duplicating fetch logic across screens.",
          ],
          bestPractices: [
            "Use SecureStore for tokens.",
            "Centralize auth error handling.",
          ],
          exerciseTitle: "API Client",
          exerciseDescription: "Build an api() client with token handling and 401 logout.",
          exerciseRequirements: [
            "Token injection",
            "401 handling",
            "Used by 2 screens",
          ],
          challenge: "Add automatic retry once after token refresh.",
          summary:
            "A central client keeps auth and errors consistent.",
        }),
        lesson({
          title: "Loading & Skeleton UI",
          slug: "rn-loading",
          minutes: 15,
          objective: "Design loading states that don't jump.",
          intro:
            "Good loading states prevent layout shift: skeletons matching final layout beat centered spinners.",
          concepts: [
            "- Skeleton components with shimmer.",
            "- Placeholders sized like real content.",
            "- Errors inline with retry instead of full-screen.",
          ],
          example: {
            lang: "tsx",
            code: "function CourseSkeleton() {\n  return (\n    <View style={{ padding: 16 }}>\n      <View style={[styles.block, { width: 120, height: 16, borderRadius: 4 }]} />\n      <View style={[styles.block, { height: 14, marginTop: 8, opacity: 0.6 }]} />\n      <View style={[styles.block, { height: 14, marginTop: 4, opacity: 0.4 }]} />\n    </View>\n  );\n}\n\nconst styles = { block: { backgroundColor: '#e5e7eb', borderRadius: 4 } };",
            output: "Shimmer-style placeholders matching the layout.",
          },
          mistakes: [
            "Centered spinners that cause layout jump.",
            "Blocking navigation during loads.",
          ],
          bestPractices: [
            "Skeletons that mirror final content.",
            "Keep loaded content stable.",
          ],
          exerciseTitle: "Skeletons",
          exerciseDescription: "Replace spinners with layout-matching skeletons.",
          exerciseRequirements: [
            "Skeleton component",
            "3+ placeholder blocks",
            "Used in a loading state",
          ],
          challenge: "Add a shimmer animation.",
          summary:
            "Skeletons make loading feel instant and stable.",
        }),
      ],
    },
    {
      title: "Persistence & Storage",
      description: "Local data on device",
      lessons: [
        lesson({
          title: "AsyncStorage",
          slug: "rn-asyncstorage",
          minutes: 20,
          objective: "Persist small data with AsyncStorage.",
          intro:
            "AsyncStorage is a simple key-value store for non-sensitive data: settings, drafts, UI state.",
          concepts: [
            "- @react-native-async-storage/async-storage.",
            "- getItem/setItem/removeItem are async.",
            "- JSON-serialize complex values.",
          ],
          example: {
            lang: "tsx",
            code: "import AsyncStorage from '@react-native-async-storage/async-storage';\n\nconst KEY = 'settings';\n\nexport async function saveSettings(settings: object) {\n  await AsyncStorage.setItem(KEY, JSON.stringify(settings));\n}\n\nexport async function loadSettings(): Promise<object | null> {\n  const raw = await AsyncStorage.getItem(KEY);\n  return raw ? JSON.parse(raw) : null;\n}",
            output: "Settings persist across app restarts.",
          },
          mistakes: [
            "Storing tokens/passwords here (use SecureStore).",
            "Blocking startup on storage reads.",
          ],
          bestPractices: [
            "Wrap storage in typed service functions.",
            "Handle parse errors gracefully.",
          ],
          exerciseTitle: "Settings Persistence",
          exerciseDescription: "Persist theme and font-size settings with AsyncStorage.",
          exerciseRequirements: [
            "Typed save/load functions",
            "Applied on app start",
            "Error handling",
          ],
          challenge: "Sync settings across screens with context.",
          summary:
            "AsyncStorage persists lightweight, non-secret data.",
        }),
        lesson({
          title: "SecureStore",
          slug: "rn-securestore",
          minutes: 15,
          objective: "Store secrets securely with SecureStore.",
          intro:
            "expo-secure-store stores small secrets in the OS keystore (Keychain/Keystore) — the right place for tokens.",
          concepts: [
            "- SecureStore.setItemAsync/getItemAsync/deleteItemAsync.",
            "- Values are encrypted at rest.",
            "- Small values only (a few KB).",
          ],
          example: {
            lang: "tsx",
            code: "import * as SecureStore from 'expo-secure-store';\n\nexport async function setToken(token: string) {\n  await SecureStore.setItemAsync('auth_token', token);\n}\n\nexport async function getToken(): Promise<string | null> {\n  return SecureStore.getItemAsync('auth_token');\n}\n\nexport async function clearToken() {\n  await SecureStore.deleteItemAsync('auth_token');\n}",
            output: "Auth tokens encrypted in the OS keystore.",
          },
          mistakes: [
            "Using AsyncStorage for secrets.",
            "Ignoring the size limit.",
          ],
          bestPractices: [
            "SecureStore for tokens; AsyncStorage for preferences.",
            "Clear tokens on logout.",
          ],
          exerciseTitle: "Token Service",
          exerciseDescription: "Build a token service used by the API client.",
          exerciseRequirements: [
            "3 functions",
            "Integrated with api client",
            "Cleared on logout",
          ],
          challenge: "Add biometric-gated token access.",
          summary:
            "SecureStore keeps secrets in the OS keystore.",
        }),
        lesson({
          title: "SQLite & Databases",
          slug: "rn-sqlite",
          minutes: 20,
          objective: "Use SQLite for local databases.",
          intro:
            "For structured, queryable offline data, expo-sqlite provides a real SQL database on device.",
          concepts: [
            "- expo-sqlite openDatabase.",
            "- execSync for DDL; prepared statements for data.",
            "- Use it for offline-first features.",
          ],
          example: {
            lang: "tsx",
            code: "import * as SQLite from 'expo-sqlite';\n\nconst db = SQLite.openDatabaseSync('app.db');\n\ndb.execSync(`\n  CREATE TABLE IF NOT EXISTS notes (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    title TEXT NOT NULL,\n    body TEXT\n  );\n`);\n\nexport function addNote(title: string, body: string) {\n  db.runSync('INSERT INTO notes (title, body) VALUES (?, ?)', title, body);\n}\n\nexport function getNotes(): Note[] {\n  return db.getAllSync('SELECT * FROM notes ORDER BY id DESC');\n}",
            output: "Queryable local storage with SQL.",
          },
          mistakes: [
            "Using AsyncStorage for relational data.",
            "String-concatenating SQL (injection).",
          ],
          bestPractices: [
            "Prepared statements always.",
            "Migrate schemas with versioning.",
          ],
          exerciseTitle: "Notes DB",
          exerciseDescription: "Build a notes app storing data in SQLite.",
          exerciseRequirements: [
            "Table creation",
            "Insert + query",
            "Prepared statements",
          ],
          challenge: "Add full-text search.",
          summary:
            "SQLite gives offline-first apps a real database.",
        }),
      ],
    },
    {
      title: "Permissions & Device APIs",
      description: "Camera, location, and permissions",
      lessons: [
        lesson({
          title: "Permissions",
          slug: "rn-permissions",
          minutes: 20,
          objective: "Request permissions properly.",
          intro:
            "iOS and Android require runtime permission requests for camera, location, and more. expo-permissions makes it consistent.",
          concepts: [
            "- Permissions.requestAsync returns status.",
            "- Handle denied/undetermined states.",
            "- Explain why before asking (UX).",
          ],
          example: {
            lang: "tsx",
            code: "import * as Location from 'expo-location';\n\nasync function requestLocation() {\n  const { status } = await Location.requestForegroundPermissionsAsync();\n\n  if (status !== 'granted') {\n    Alert.alert('Location needed', 'Enable location to show nearby courses.');\n    return null;\n  }\n\n  return Location.getCurrentPositionAsync({});\n}",
            output: "Permission flow with a friendly denial message.",
          },
          mistakes: [
            "Requesting permission without context.",
            "Ignoring the denied state.",
          ],
          bestPractices: [
            "Explain first, then request.",
            "Handle re-request via settings deep links.",
          ],
          exerciseTitle: "Permission Flow",
          exerciseDescription: "Build a location-request flow with all states handled.",
          exerciseRequirements: [
            "Request with context",
            "Handle granted/denied",
            "Alert on denial",
          ],
          challenge: "Add a 'open settings' action on permanent denial.",
          summary:
            "Permission UX: explain, request, handle every outcome.",
        }),
        lesson({
          title: "Camera & Images",
          slug: "rn-camera",
          minutes: 20,
          objective: "Capture and pick images.",
          intro:
            "expo-image-picker and expo-camera handle photo capture and library selection with a few lines.",
          concepts: [
            "- launchCameraAsync / launchImageLibraryAsync.",
            "- MediaTypeOptions, quality, aspect.",
            "- Upload the picked uri to your API.",
          ],
          example: {
            lang: "tsx",
            code: "import * as ImagePicker from 'expo-image-picker';\n\nasync function pickAvatar() {\n  const result = await ImagePicker.launchImageLibraryAsync({\n    mediaTypes: ['images'],\n    allowsEditing: true,\n    aspect: [1, 1],\n    quality: 0.7,\n  });\n\n  if (!result.canceled) {\n    return result.assets[0].uri;\n  }\n}",
            output: "A cropped square image ready to upload.",
          },
          mistakes: [
            "Missing permission handling.",
            "Uploading without a size limit.",
          ],
          bestPractices: [
            "Compress with quality option.",
            "Preview before upload.",
          ],
          exerciseTitle: "Avatar Picker",
          exerciseDescription: "Add an avatar picker with crop and preview.",
          exerciseRequirements: [
            "Library picker",
            "Editing/crop",
            "Preview + upload",
          ],
          challenge: "Add camera capture too.",
          summary:
            "Image pickers and camera APIs are a few lines with Expo.",
        }),
        lesson({
          title: "Notifications",
          slug: "rn-notifications",
          minutes: 25,
          objective: "Send local and push notifications.",
          intro:
            "expo-notifications handles local notifications and push via Expo Push Service; a device token enables remote pushes.",
          concepts: [
            "- scheduleNotificationAsync for local notifications.",
            "- getExpoPushTokenAsync registers the device.",
            "- Listeners handle foreground notifications.",
          ],
          example: {
            lang: "tsx",
            code: "import * as Notifications from 'expo-notifications';\n\nasync function sendReminder() {\n  await Notifications.scheduleNotificationAsync({\n    content: {\n      title: 'Keep learning!',\n      body: 'Your streak is on the line — complete today\\'s lesson.',\n    },\n    trigger: { seconds: 3600, channelId: 'reminders' },\n  });\n}\n\nasync function registerPush() {\n  const token = await Notifications.getExpoPushTokenAsync();\n  await api('/devices', { method: 'POST', body: { token: token.data } });\n}",
            output: "Scheduled reminders and push registration.",
          },
          mistakes: [
            "Requesting permission after the user opted out already.",
            "No channel setup on Android.",
          ],
          bestPractices: [
            "Set up notification channels on Android.",
            "Handle notification taps to deep link.",
          ],
          exerciseTitle: "Notifications",
          exerciseDescription: "Add a daily reminder and push token registration.",
          exerciseRequirements: [
            "Local notification",
            "Token registration",
            "Channel setup",
          ],
          challenge: "Deep-link on notification press.",
          summary:
            "Notifications engage users and restore streaks.",
        }),
      ],
    },
    {
      title: "Performance & Debugging",
      description: "Smooth apps and faster iteration",
      lessons: [
        lesson({
          title: "Performance Basics",
          slug: "rn-performance",
          minutes: 20,
          objective: "Keep lists and renders fast.",
          intro:
            "Janky scrolling usually comes from heavy renders, big lists, or blocking the JS thread. Measure before optimizing.",
          concepts: [
            "- FlatList over ScrollView+map.",
            "- React.memo for expensive rows.",
            "- Use the performance monitor / React DevTools profiler.",
          ],
          example: {
            lang: "tsx",
            code: "const Row = memo(function Row({ item }: { item: Course }) {\n  return (\n    <View style={styles.row}>\n      <Text>{item.title}</Text>\n    </View>\n  );\n});\n\n<FlatList\n  data={courses}\n  renderItem={({ item }) => <Row item={item} />}\n  keyExtractor={(item) => item.id}\n  initialNumToRender={10}\n/>",
            output: "Memoized rows with limited initial render.",
          },
          mistakes: [
            "Rendering thousands of items in ScrollView.",
            "Heavy work in renderItem.",
          ],
          bestPractices: [
            "Profile with the built-in tools.",
            "Keep row components pure and light.",
          ],
          exerciseTitle: "Perf Pass",
          exerciseDescription: "Profile a list and fix the top bottleneck.",
          exerciseRequirements: [
            "Profile with DevTools",
            "Fix one issue",
            "Measure improvement",
          ],
          challenge: "Optimize images with lower resolution and caching.",
          summary:
            "Measure, then fix renders, lists, and JS-thread work.",
        }),
        lesson({
          title: "Debugging Tools",
          slug: "rn-debugging",
          minutes: 20,
          objective: "Debug with logs, DevTools, and Fast Refresh.",
          intro:
            "Expo DevTools, React DevTools, and console.logs cover most debugging. Fast Refresh preserves state while editing.",
          concepts: [
            "- console.log shows in the terminal/dev tools.",
            "- React DevTools profiles component trees.",
            "- Network inspector views API traffic.",
          ],
          example: {
            lang: "tsx",
            code: "// Quick debugging patterns\nconsole.log('render', item.id);\nconsole.warn('deprecated usage');\nconsole.error('request failed', { url, status });\n\n// Network debugging\nconst res = await fetch(url);\nconsole.log('response', res.status, await res.text());",
            output: "Structured logs for state and network issues.",
          },
          mistakes: [
            "Leaving console.logs in production bundles.",
            "Debugging blind without the profiler.",
          ],
          bestPractices: [
            "Remove or gate logs before release.",
            "Reproduce issues on the smallest component.",
          ],
          exerciseTitle: "Debug Session",
          exerciseDescription: "Set up DevTools and trace a network failure to its cause.",
          exerciseRequirements: [
            "Connect DevTools",
            "Use network inspector",
            "Fix a real bug found",
          ],
          challenge: "Add a global error boundary with logging.",
          summary:
            "Good tooling turns debugging into fast iteration.",
        }),
        lesson({
          title: "Testing",
          slug: "rn-testing",
          minutes: 20,
          objective: "Test components and hooks.",
          intro:
            "Jest + React Native Testing Library render components and simulate presses in a Node environment.",
          concepts: [
            "- @testing-library/react-native.",
            "- render, screen.getByText, fireEvent.press.",
            "- Mock native modules with jest.mock.",
          ],
          example: {
            lang: "tsx",
            code: "import { render, fireEvent, screen } from '@testing-library/react-native';\n\nit('increments on press', () => {\n  render(<Counter />);\n  fireEvent.press(screen.getByText('Increment'));\n  expect(screen.getByText('1')).toBeOnTheScreen();\n});",
            output: "Behavioral component tests.",
          },
          mistakes: [
            "Snapshot tests that break constantly.",
            "Not mocking native modules.",
          ],
          bestPractices: [
            "Test behavior, not snapshots.",
            "Mock at the API boundary.",
          ],
          exerciseTitle: "Component Tests",
          exerciseDescription: "Write tests for a counter and a form.",
          exerciseRequirements: [
            "2 test files",
            "fireEvent interactions",
            "Async test with waitFor",
          ],
          challenge: "Test a screen with mocked fetch.",
          summary:
            "RTL + Jest verify mobile components behave correctly.",
        }),
      ],
    },
    {
      title: "Build & Release",
      description: "Shipping to stores",
      lessons: [
        lesson({
          title: "App Icons & Splash",
          slug: "rn-app-icons",
          minutes: 20,
          objective: "Configure icons and splash screens.",
          intro:
            "expo prebuild generates all platform icon/splash sizes from a few assets. Branding matters for store approval.",
          concepts: [
            "- app.json: icon, splash, adaptiveIcon.",
            "- expo-splash-screen config.",
            "- npx expo prebuild regenerates native projects.",
          ],
          example: {
            lang: "json",
            code: "{\n  \"expo\": {\n    \"name\": \"FactLearn\",\n    \"icon\": \"./assets/icon.png\",\n    \"splash\": {\n      \"image\": \"./assets/splash.png\",\n      \"resizeMode\": \"contain\",\n      \"backgroundColor\": \"#0a0f1a\"\n    },\n    \"android\": {\n      \"adaptiveIcon\": {\n        \"foregroundImage\": \"./assets/adaptive-icon.png\",\n        \"backgroundColor\": \"#0a0f1a\"\n      }\n    }\n  }\n}",
            output: "Correctly sized branding across platforms.",
          },
          mistakes: [
            "Oversized/undersized icons.",
            "Splash images with transparency issues.",
          ],
          bestPractices: [
            "Provide 1024x1024 source icons.",
            "Test on both platforms.",
          ],
          exerciseTitle: "Branding",
          exerciseDescription: "Add app icon, splash, and adaptive icon.",
          exerciseRequirements: [
            "3 asset configs",
            "Correct sizes",
            "Verify on device",
          ],
          challenge: "Add a dark-mode splash variant.",
          summary:
            "Expo config generates store-ready branding.",
        }),
        lesson({
          title: "Building with EAS",
          slug: "rn-eas",
          minutes: 25,
          objective: "Build binaries with EAS Build.",
          intro:
            "EAS Build compiles signed iOS and Android binaries in the cloud, with credentials managed for you.",
          concepts: [
            "- npx eas-cli login and eas init.",
            "- eas build --platform android/ios.",
            "- Development, preview, and production profiles.",
          ],
          syntax: {
            lang: "bash",
            code: "npm install -g eas-cli\neas login\neas build:configure\neas build --platform android --profile preview\neas build --platform ios --profile production",
          },
          example: {
            lang: "json",
            code: "// eas.json\n{\n  \"build\": {\n    \"preview\": { \"distribution\": \"internal\" },\n    \"production\": { \"autoIncrement\": true }\n  }\n}",
            output: "Cloud builds with version auto-increment.",
          },
          mistakes: [
            "Building locally without the toolchain.",
            "Forgetting app.json versioning for TestFlight/Play.",
          ],
          bestPractices: [
            "Use development builds for native-module testing.",
            "Test preview builds on a real device.",
          ],
          exerciseTitle: "Cloud Build",
          exerciseDescription: "Configure EAS and produce an Android preview build.",
          exerciseRequirements: [
            "EAS project setup",
            "Preview build",
            "Install on device",
          ],
          challenge: "Produce a production iOS build for TestFlight.",
          summary:
            "EAS Build handles signing and compilation in the cloud.",
        }),
        lesson({
          title: "Store Submission",
          slug: "rn-store-submit",
          minutes: 20,
          objective: "Submit to the App Store and Play Store.",
          intro:
            "eas submit uploads your build to App Store Connect or Play Console with metadata and release tracking.",
          concepts: [
            "- eas submit --platform ios/android.",
            "- Metadata: descriptions, screenshots, privacy URLs.",
            "- App Store review guidelines vs Play policies.",
          ],
          example: {
            lang: "bash",
            code: "eas submit --platform ios\n# follows the App Store Connect flow\neas submit --platform android\n# uses the Play Console upload",
            output: "Binaries land in the store consoles.",
          },
          mistakes: [
            "Missing privacy policy URLs (store requirement).",
            "Not testing the release build on device first.",
          ],
          bestPractices: [
            "Prepare screenshots for all required sizes.",
            "Release gradually with phased rollouts.",
          ],
          exerciseTitle: "Submit Prep",
          exerciseDescription: "Prepare metadata and submit a build to one store.",
          exerciseRequirements: [
            "Metadata complete",
            "Screenshots ready",
            "Submission started",
          ],
          challenge: "Set up CI to build and submit on tag pushes.",
          summary:
            "eas submit streamlines store distribution.",
        }),
      ],
    },
    {
      title: "Real World Project — Study Tracker",
      description: "Build a full study app",
      lessons: [
        lesson({
          title: "Planning the App",
          slug: "rn-project-plan",
          minutes: 25,
          objective: "Plan a study tracker: screens, data, features.",
          intro:
            "The final module builds a study tracker: courses list, lesson detail, completion tracking, and daily streaks.",
          concepts: [
            "- Screens: Home, Course, Lesson, Stats.",
            "- Local data: SQLite or AsyncStorage.",
            "- Features: complete lessons, streak calc, stats.",
          ],
          example: {
            lang: "text",
            code: "screens/\n  HomeScreen.tsx        # continue learning + streak\n  CoursesScreen.tsx\n  LessonScreen.tsx      # mark complete\n  StatsScreen.tsx\ncomponents/\n  CourseCard.tsx\n  ProgressBar.tsx\nlib/\n  storage.ts            # persistence\n  streak.ts             # streak math",
            output: "A navigable, organized structure.",
          },
          mistakes: [
            "Building screens before the data layer.",
            "Skipping the streak edge cases (timezones!).",
          ],
          bestPractices: [
            "Design the storage API first.",
            "Plan navigation param types early.",
          ],
          exerciseTitle: "Plan & Scaffold",
          exerciseDescription: "Create the screen structure and storage module.",
          exerciseRequirements: [
            "4 screens",
            "Navigation param types",
            "Storage service",
          ],
          challenge: "Define the data types for courses and progress.",
          summary:
            "Plan-first keeps the app coherent as it grows.",
        }),
        lesson({
          title: "Core Features",
          slug: "rn-project-features",
          minutes: 35,
          objective: "Implement courses, progress, and streaks.",
          intro:
            "Build the features: fetch/show courses, complete lessons with persistence, and compute daily streaks from completion dates.",
          concepts: [
            "- FlatList of courses with progress.",
            "- Complete action persists and updates UI.",
            "- Streak: consecutive days with completions, timezone-aware.",
          ],
          example: {
            lang: "tsx",
            code: "export function calculateStreak(dates: string[]): { current: number; longest: number } {\n  const days = [...new Set(dates.map((d) => d.slice(0, 10)))].sort();\n\n  let current = 0;\n  let longest = 0;\n  let run = 0;\n  let prev: Date | null = null;\n\n  for (const day of days) {\n    const date = new Date(day + 'T00:00:00');\n    const gap = prev ? (date.getTime() - prev.getTime()) / 86400000 : 1;\n    run = gap === 1 ? run + 1 : 1;\n    longest = Math.max(longest, run);\n    prev = date;\n  }\n\n  // current streak: count back from today (or yesterday)\n  current = run > 0 ? run : 0;\n  return { current, longest };\n}",
            output: "Streak math handling day gaps and ordering.",
          },
          mistakes: [
            "Naive streak counting across timezones.",
            "Not deduplicating multiple completions per day.",
          ],
          bestPractices: [
            "Store completion timestamps, derive streaks.",
            "Test streak logic with fixtures.",
          ],
          exerciseTitle: "Features",
          exerciseDescription: "Implement course list, completion, and streak display.",
          exerciseRequirements: [
            "Course list with progress",
            "Mark-complete persistence",
            "Streak on home screen",
          ],
          challenge: "Add a weekly activity chart.",
          summary:
            "Persistence, completion, and streaks form the app's core.",
        }),
        lesson({
          title: "Polish & Ship",
          slug: "rn-project-ship",
          minutes: 30,
          objective: "Add notifications, test, and release.",
          intro:
            "Finish: daily reminder notifications, component tests, and a release build.",
          concepts: [
            "- Local notification at study time.",
            "- Tests for streak + components.",
            "- EAS build + preview install.",
          ],
          example: {
            lang: "tsx",
            code: "await Notifications.scheduleNotificationAsync({\n  content: {\n    title: 'Time to learn',\n    body: 'Complete one lesson to keep your streak!',\n  },\n  trigger: {\n    hour: 19,\n    minute: 0,\n    channelId: 'reminders',\n    repeats: true,\n  },\n});",
            output: "A daily 7pm reminder.",
          },
          mistakes: [
            "Shipping without tests for the streak math.",
            "Forgetting Android notification channels.",
          ],
          bestPractices: [
            "Test the tricky logic (streaks) thoroughly.",
            "Smoke-test the release build on device.",
          ],
          exerciseTitle: "Ship the App",
          exerciseDescription: "Add reminders, tests, and produce a preview build.",
          exerciseRequirements: [
            "Daily notification",
            "Streak + component tests",
            "Preview build installed",
          ],
          challenge: "Submit to TestFlight for beta testers.",
          summary:
            "Reminders, tests, and release builds finish the app.",
        }),
      ],
    },
  ],
};