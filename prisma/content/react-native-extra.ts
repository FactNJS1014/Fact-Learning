import type { ModuleContent } from "../seed-content";
import { lesson } from "./lesson-builder";

// Modules 13–20 for the React Native course (tops the course up to 20 modules).
export const reactNativeExtraModules: ModuleContent[] = [
  {
    title: "Advanced Navigation",
    description: "Deep linking, nesting, and navigation state",
    lessons: [
      lesson({
        title: "Deep Linking",
        slug: "rn-deep-linking",
        minutes: 25,
        objective: "Open the app at a specific screen from a URL.",
        intro:
          "Deep links let external URLs and push notifications open your app on the exact screen. React Navigation's linking config maps URL paths to screens.",
        concepts: [
          "- linking prop with prefixes (https://app.example.com, myapp://).",
          "- path-to-screen mapping with params.",
          "- NavigationContainer linking + config.",
        ],
        example: {
          lang: "typescript",
          code: "import { NavigationContainer } from '@react-navigation/native';\n\nconst linking = {\n  prefixes: ['myapp://', 'https://app.example.com'],\n  config: {\n    screens: {\n      Home: 'home',\n      Product: {\n        path: 'product/:id',\n        parse: { id: Number },\n      },\n      Settings: 'settings',\n    },\n  },\n};\n\nexport default function App() {\n  return (\n    <NavigationContainer linking={linking}>\n      <RootNavigator />\n    </NavigationContainer>\n  );\n}\n\n// myapp://product/42 or https://app.example.com/product/42\n// opens the Product screen with id=42",
          output: "URLs navigate straight to the right screen.",
        },
        mistakes: [
          "Forgetting to handle unknown deep links.",
          "Not parsing params (strings instead of numbers).",
        ],
        bestPractices: [
          "Test links with npx uri-scheme open.",
          "Guard screens against missing params.",
        ],
        exerciseTitle: "Deep Link",
        exerciseDescription: "Add deep linking for product and profile screens.",
        exerciseRequirements: ["Linking config", "Param parsing", "Test with uri-scheme"],
        challenge: "Handle auth-protected deep links.",
        summary: "Deep linking makes your app reachable from anywhere.",
      }),
      lesson({
        title: "Nested Navigators",
        slug: "rn-nested-nav",
        minutes: 20,
        objective: "Combine stack, tabs, and drawer navigation.",
        intro:
          "Real apps nest navigators: a tab navigator containing stacks, each stack holding screens. Navigation calls cross boundaries automatically.",
        concepts: [
          "- Tabs → Stack → screens hierarchy.",
          "- navigation.navigate('Tab', { screen: 'StackScreen' }).",
          "- Types for each navigator via NavigationProp.",
        ],
        example: {
          lang: "typescript",
          code: "const Tab = createBottomTabNavigator();\nconst HomeStack = createNativeStackNavigator();\n\nfunction HomeStackScreen() {\n  return (\n    <HomeStack.Navigator>\n      <HomeStack.Screen name=\"Feed\" component={Feed} />\n      <HomeStack.Screen name=\"PostDetail\" component={PostDetail} />\n    </HomeStack.Navigator>\n  );\n}\n\nexport default function AppNavigator() {\n  return (\n    <Tab.Navigator>\n      <Tab.Screen name=\"HomeTab\" component={HomeStackScreen} />\n      <Tab.Screen name=\"ProfileTab\" component={Profile} />\n    </Tab.Navigator>\n  );\n}\n\n// Navigate across boundaries\nnavigation.navigate('HomeTab', { screen: 'PostDetail', params: { id: 7 } });",
          output: "Tabs hosting stacks, navigable across levels.",
        },
        mistakes: [
          "Nesting without thinking about back behavior.",
          "Missing TypeScript types for navigation params.",
        ],
        bestPractices: [
          "Keep tab screens as stacks for back support.",
          "Type navigators for compile-time safety.",
        ],
        exerciseTitle: "Nested Nav",
        exerciseDescription: "Build tabs-with-stacks and cross-navigate.",
        exerciseRequirements: ["Tab navigator", "Nested stacks", "Typed params"],
        challenge: "Add a drawer for settings.",
        summary: "Nested navigators structure apps cleanly.",
      }),
      lesson({
        title: "Navigation State & Linking Events",
        slug: "rn-nav-state",
        minutes: 15,
        objective: "React to focus and restore navigation state.",
        intro:
          "useFocusEffect runs on screen focus (not just mount); getState/setState persist navigation across app restarts.",
        concepts: [
          "- useFocusEffect for refresh-on-focus.",
          "- Persist navigation state with AsyncStorage.",
          "- NavigationState serialization for restore.",
        ],
        example: {
          lang: "typescript",
          code: "import { useFocusEffect } from '@react-navigation/native';\nimport { useCallback } from 'react';\n\nfunction Feed() {\n  useFocusEffect(\n    useCallback(() => {\n      refreshPosts(); // refetch when screen gains focus\n      return () => cancelRefresh();\n    }, []),\n  );\n  return null;\n}\n\n// Persist state\nconst onStateChange = async (state) => {\n  await AsyncStorage.setItem('nav-state', JSON.stringify(state));\n};\n\nconst initialState = JSON.parse(await AsyncStorage.getItem('nav-state') ?? 'null');\n<NavigationContainer initialState={initialState} onStateChange={onStateChange}>",
          output: "Screens refresh on focus; state survives restarts.",
        },
        mistakes: [
          "Fetching only in useEffect (stale on back-navigation).",
          "Persisting state before it stabilizes.",
        ],
        bestPractices: [
          "Keep focus callbacks memoized.",
          "Reset nav state after logout.",
        ],
        exerciseTitle: "State",
        exerciseDescription: "Add focus-based refresh and state persistence.",
        exerciseRequirements: ["useFocusEffect", "AsyncStorage persistence", "Logout reset"],
        challenge: "Deep-link restore after app kill.",
        summary: "Focus events and persistence polish navigation UX.",
      }),
    ],
  },
  {
    title: "Animations",
    description: "Animated API, Reanimated, and gestures",
    lessons: [
      lesson({
        title: "Animated API",
        slug: "rn-animated",
        minutes: 25,
        objective: "Animate with the core Animated API.",
        intro:
          "React Native's Animated drives UI values on the native driver for buttery 60fps animations.",
        concepts: [
          "- Animated.Value + Animated.timing/spring.",
          "- nativeDriver: true for transforms/opacity.",
          "- Animated.View, Animated.Text bind values.",
        ],
        example: {
          lang: "typescript",
          code: "import { Animated, Easing, Pressable } from 'react-native';\nimport { useRef } from 'react';\n\nfunction FadeInCard() {\n  const opacity = useRef(new Animated.Value(0)).current;\n  const translateY = useRef(new Animated.Value(20)).current;\n\n  const animate = () => {\n    Animated.parallel([\n      Animated.timing(opacity, { toValue: 1, duration: 400, useNativeDriver: true }),\n      Animated.spring(translateY, { toValue: 0, useNativeDriver: true }),\n    ]).start();\n  };\n\n  return (\n    <Pressable onPress={animate}>\n      <Animated.View style={{ opacity, transform: [{ translateY }] }}>\n        <Card />\n      </Animated.View>\n    </Pressable>\n  );\n}",
          output: "A card that fades and springs into place.",
        },
        mistakes: [
          "Animating layout props without the native driver.",
          "Creating Animated.Value inside render.",
        ],
        bestPractices: [
          "useRef to keep values stable.",
          "Use parallel/sequence for complex motion.",
        ],
        exerciseTitle: "Fade",
        exerciseDescription: "Build a fade + slide entrance animation.",
        exerciseRequirements: ["Animated.Value in useRef", "Native driver", "Animated.parallel"],
        challenge: "Add an exit animation before removal.",
        summary: "The Animated API makes smooth, native-driven motion easy.",
      }),
      lesson({
        title: "Reanimated",
        slug: "rn-reanimated",
        minutes: 25,
        objective: "Use Reanimated for gestures and layout animations.",
        intro:
          "Reanimated runs animations on the UI thread with a worklet model, enabling gesture-driven motion and layout transitions.",
        concepts: [
          "- useSharedValue + useAnimatedStyle.",
          "- withSpring/withTiming in worklets.",
          "- Layout animations: entering/exiting props.",
        ],
        example: {
          lang: "typescript",
          code: "import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';\nimport { Gesture, GestureDetector } from 'react-native-gesture-handler';\n\nfunction DraggableCard() {\n  const x = useSharedValue(0);\n  const y = useSharedValue(0);\n\n  const drag = Gesture.Pan()\n    .onChange((e) => {\n      x.value += e.changeX;\n      y.value += e.changeY;\n    })\n    .onEnd(() => {\n      x.value = withSpring(0);\n      y.value = withSpring(0);\n    });\n\n  const style = useAnimatedStyle(() => ({\n    transform: [{ translateX: x.value }, { translateY: y.value }],\n  }));\n\n  return (\n    <GestureDetector gesture={drag}>\n      <Animated.View style={style}>\n        <Card />\n      </Animated.View>\n    </GestureDetector>\n  );\n}",
          output: "A card you can drag; it springs back on release.",
        },
        mistakes: [
          "Mutating shared values outside worklets.",
          "Mixing Animated API and Reanimated styles.",
        ],
        bestPractices: [
          "Wrap gesture callbacks in worklets (auto via reanimated).",
          "Test on device for jank.",
        ],
        exerciseTitle: "Drag",
        exerciseDescription: "Make a card draggable with spring-back.",
        exerciseRequirements: ["Pan gesture", "Shared values", "withSpring reset"],
        challenge: "Snap to a grid on release.",
        summary: "Reanimated + Gesture Handler power fluid interactive UI.",
      }),
      lesson({
        title: "Layout & List Animations",
        slug: "rn-list-animations",
        minutes: 15,
        objective: "Animate list insertions and reordering.",
        intro:
          "LayoutAnimation and Reanimated's entering/exiting make items appear, disappear, and reorder smoothly.",
        concepts: [
          "- LayoutAnimation.configureNext for simple cases.",
          "- entering={FadeInDown} exiting={FadeOut}.",
          "- Animated.FlatList for scroll-driven headers.",
        ],
        example: {
          lang: "typescript",
          code: "import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated';\n\nfunction TodoList({ todos, onDelete }) {\n  return (\n    <Animated.FlatList\n      data={todos}\n      renderItem={({ item }) => (\n        <Animated.View entering={FadeInDown.springify()} exiting={FadeOut}>\n          <TodoRow item={item} onDelete={() => onDelete(item.id)} />\n        </Animated.View>\n      )}\n    />\n  );\n}",
          output: "New todos fade in; removed ones fade out.",
        },
        mistakes: [
          "Animating every row on every render.",
          "Forgetting keys for correct enter/exit pairing.",
        ],
        bestPractices: [
          "Use keys everywhere in lists.",
          "Prefer transform/opacity animations.",
        ],
        exerciseTitle: "Animate List",
        exerciseDescription: "Add enter/exit animations to a todo list.",
        exerciseRequirements: ["entering animation", "exiting animation", "Stable keys"],
        challenge: "Animate reorder with drag handles.",
        summary: "List animations make data changes feel alive.",
      }),
    ],
  },
  {
    title: "Maps & Location",
    description: "Location permissions and map views",
    lessons: [
      lesson({
        title: "Location Services",
        slug: "rn-location",
        minutes: 20,
        objective: "Request permissions and read location.",
        intro:
          "react-native-geolocation-service plus permission flows (Info.plist / AndroidManifest) give you the device location.",
        concepts: [
          "- Permissions: requestLocationAuthorization / requestWhenInUseAuthorization.",
          "- getCurrentPosition and watchPosition.",
          "- Platform-specific permission strings.",
        ],
        example: {
          lang: "typescript",
          code: "import Geolocation from 'react-native-geolocation-service';\nimport { Platform, PermissionsAndroid } from 'react-native';\n\nasync function requestLocationPermission() {\n  if (Platform.OS === 'android') {\n    const granted = await PermissionsAndroid.request(\n      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,\n    );\n    if (granted !== PermissionsAndroid.RESULTS.GRANTED) return null;\n  } else {\n    const auth = await Geolocation.requestAuthorization('whenInUse');\n    if (auth !== 'granted') return null;\n  }\n  return new Promise((resolve, reject) =>\n    Geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true }),\n  );\n}",
          output: "The user's coordinates with proper permissions.",
        },
        mistakes: [
          "Requesting permissions without explaining why.",
          "Tracking location without user consent.",
        ],
        bestPractices: [
          "Request permission at the moment it's needed.",
          "Add NSLocationWhenInUseUsageDescription.",
        ],
        exerciseTitle: "Where Am I",
        exerciseDescription: "Request permission and show current coordinates.",
        exerciseRequirements: ["Permission flow", "getCurrentPosition", "Error handling"],
        challenge: "Add a watchPosition live tracker.",
        summary: "Location APIs are gated behind clear permission flows.",
      }),
      lesson({
        title: "MapView",
        slug: "rn-mapview",
        minutes: 25,
        objective: "Show maps with markers and regions.",
        intro:
          "react-native-maps renders native maps on iOS/Android with markers, polygons, and region control.",
        concepts: [
          "- <MapView initialRegion> for the viewport.",
          "- <Marker coordinate> pins a location.",
          "- MapViewDirections for route lines (optional).",
        ],
        example: {
          lang: "typescript",
          code: "import MapView, { Marker } from 'react-native-maps';\n\nfunction CoffeeMap({ places }) {\n  return (\n    <MapView\n      style={{ flex: 1 }}\n      initialRegion={{\n        latitude: 13.7563,\n        longitude: 100.5018,\n        latitudeDelta: 0.05,\n        longitudeDelta: 0.05,\n      }}\n    >\n      {places.map((p) => (\n        <Marker\n          key={p.id}\n          coordinate={{ latitude: p.lat, longitude: p.lng }}\n          title={p.name}\n          onPress={() => selectPlace(p)}\n        />\n      ))}\n    </MapView>\n  );\n}",
          output: "A map with tappable coffee shop markers.",
        },
        mistakes: [
          "Hardcoding the map region (no user fit).",
          "Many markers without clustering.",
        ],
        bestPractices: [
          "Fit bounds to the marker set.",
          "Cluster markers for large datasets.",
        ],
        exerciseTitle: "Map",
        exerciseDescription: "Render a map with 5+ interactive markers.",
        exerciseRequirements: ["MapView", "Markers with callouts", "Region fit"],
        challenge: "Draw a route between two points.",
        summary: "MapView brings native maps into any screen.",
      }),
    ],
  },
  {
    title: "Payments",
    description: "In-app purchases and Stripe",
    lessons: [
      lesson({
        title: "In-App Purchases",
        slug: "rn-iap",
        minutes: 25,
        objective: "Sell digital goods with react-native-iap.",
        intro:
          "Digital products (premium, subscriptions) must use the store's purchase system. react-native-iap wraps App Store and Play Store purchases.",
        concepts: [
          "- Register products with the store consoles first.",
          "- getProducts / requestPurchase / finishTransaction.",
          "- Validate receipts on your backend.",
        ],
        example: {
          lang: "typescript",
          code: "import RNIap from 'react-native-iap';\n\nconst productIds = ['premium_monthly'];\n\nasync function buyPremium() {\n  const products = await RNIap.getProducts({ skus: productIds });\n  const purchase = await RNIap.requestPurchase({ sku: products[0].productId });\n  // 1. Send receipt to your backend\n  // 2. Backend validates with Apple/Google\n  // 3. On success: unlock feature\n  await RNIap.finishTransaction({ purchase, isConsumable: false });\n  await grantPremium();\n}",
          output: "A validated premium purchase.",
        },
        mistakes: [
          "Unlocking features before receipt validation.",
          "Forgetting finishTransaction (stuck purchases).",
        ],
        bestPractices: [
          "Validate receipts server-side.",
          "Handle restore purchases.",
        ],
        exerciseTitle: "Paywall",
        exerciseDescription: "Add a premium product with server validation stub.",
        exerciseRequirements: ["Product fetch", "Purchase + finish", "Restore flow"],
        challenge: "Add subscription status checks on launch.",
        summary: "Store purchases keep digital sales legitimate.",
      }),
      lesson({
        title: "Stripe Checkout",
        slug: "rn-stripe",
        minutes: 25,
        objective: "Take card payments for physical goods.",
        intro:
          "For physical goods and services, Stripe's PaymentSheet handles PCI-compliant card entry without your app touching raw card data.",
        concepts: [
          "- Backend creates a PaymentIntent/SetupIntent.",
          "- initPaymentSheet + presentPaymentSheet.",
          "- Confirm result and fulfill the order.",
        ],
        example: {
          lang: "typescript",
          code: "import { initPaymentSheet, presentPaymentSheet } from '@stripe/stripe-react-native';\n\nasync function checkout(orderId: string) {\n  // 1. Backend: POST /api/payment-intent → { clientSecret }\n  const { clientSecret } = await createPaymentIntent(orderId);\n\n  await initPaymentSheet({ paymentIntentClientSecret: clientSecret });\n  const { error } = await presentPaymentSheet();\n\n  if (error) {\n    showToast('Payment cancelled');\n  } else {\n    // 2. Backend confirms via webhook, then fulfill order\n    confirmOrder(orderId);\n  }\n}",
          output: "A native card sheet completes payment safely.",
        },
        mistakes: [
          "Handling card numbers in your own forms.",
          "Trusting the client that payment succeeded.",
        ],
        bestPractices: [
          "Confirm payments server-side with webhooks.",
          "Handle the 'requires confirmation' states.",
        ],
        exerciseTitle: "Checkout",
        exerciseDescription: "Integrate Stripe PaymentSheet for an order.",
        exerciseRequirements: ["PaymentIntent from backend", "PaymentSheet flow", "Webhook confirmation"],
        challenge: "Add Apple Pay/Google Pay buttons.",
        summary: "Stripe PaymentSheet makes card payments safe and quick.",
      }),
    ],
  },
  {
    title: "Push Notifications",
    description: "Expo/RN push messaging",
    lessons: [
      lesson({
        title: "Setup & Tokens",
        slug: "rn-push-setup",
        minutes: 25,
        objective: "Register for push tokens and permissions.",
        intro:
          "Push notifications need device tokens: request permission, get the token, and register it with your backend.",
        concepts: [
          "- Expo notifications or react-native-push-notification.",
          "- getExpoPushTokenAsync returns the device token.",
          "- Store tokens server-side per user.",
        ],
        example: {
          lang: "typescript",
          code: "import * as Notifications from 'expo-notifications';\n\nNotifications.setNotificationHandler({\n  handleNotification: async () => ({\n    shouldShowBanner: true,\n    shouldShowList: true,\n    shouldPlaySound: true,\n  }),\n});\n\nasync function registerForPush() {\n  const { status } = await Notifications.requestPermissionsAsync();\n  if (status !== 'granted') return;\n  const token = (await Notifications.getExpoPushTokenAsync()).data;\n  await api.post('/me/devices', { token }); // register with backend\n}",
          output: "A device token registered for push delivery.",
        },
        mistakes: [
          "Requesting permission at app launch (bad UX).",
          "Not removing tokens on logout.",
        ],
        bestPractices: [
          "Ask permission in context (e.g., enabling reminders).",
          "Sync tokens on login and logout.",
        ],
        exerciseTitle: "Token",
        exerciseDescription: "Register a device token and store it.",
        exerciseRequirements: ["Permission request", "Token fetch", "Backend registration"],
        challenge: "Handle permission denial gracefully.",
        summary: "Tokens and permissions are the push foundation.",
      }),
      lesson({
        title: "Sending & Handling",
        slug: "rn-push-send",
        minutes: 25,
        objective: "Send pushes from a backend and react in-app.",
        intro:
          "Your server sends pushes via FCM/APNs (Expo's push service simplifies this); the app handles taps and foreground messages.",
        concepts: [
          "- POST to Expo push service or FCM from the server.",
          "- addNotificationResponseReceivedListener for taps.",
          "- Foreground vs background delivery behavior.",
        ],
        example: {
          lang: "typescript",
          code: "// Server (Node.js)\nconst res = await fetch('https://exp.host/--/api/v2/push/send', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({\n    to: userDeviceToken,\n    title: 'New comment',\n    body: 'Ada replied to your post',\n    data: { postId: '42' },\n  }),\n});\n\n// App: react to tap\nNotifications.addNotificationResponseReceivedListener((response) => {\n  const { postId } = response.notification.request.content.data;\n  navigation.navigate('PostDetail', { id: postId });\n});",
          output: "A notification that deep-links to the right screen.",
        },
        mistakes: [
          "Sending pushes synchronously in request handlers.",
          "Ignoring the data payload (tap does nothing).",
        ],
        bestPractices: [
          "Send pushes via a queue/worker.",
          "Always include a data payload for navigation.",
        ],
        exerciseTitle: "Push Flow",
        exerciseDescription: "Send a push from the server and deep-link on tap.",
        exerciseRequirements: ["Server send", "Tap listener", "Deep link to screen"],
        challenge: "Add notification badges and categories.",
        summary: "Server sends + in-app handling complete the push loop.",
      }),
    ],
  },
  {
    title: "Security & Storage",
    description: "Secure storage and app hardening",
    lessons: [
      lesson({
        title: "Secure Storage",
        slug: "rn-secure-storage",
        minutes: 20,
        objective: "Store tokens in the OS keystore.",
        intro:
          "AsyncStorage is unencrypted; tokens must live in the iOS Keychain / Android Keystore via react-native-keychain or expo-secure-store.",
        concepts: [
          "- expo-secure-store / react-native-keychain.",
          "- setItemAsync/getItemAsync with service names.",
          "- Clear on logout and token refresh.",
        ],
        example: {
          lang: "typescript",
          code: "import * as SecureStore from 'expo-secure-store';\n\nconst TOKEN_KEY = 'auth_token';\n\nexport const tokenStore = {\n  async save(token: string) {\n    await SecureStore.setItemAsync(TOKEN_KEY, token);\n  },\n  async load() {\n    return SecureStore.getItemAsync(TOKEN_KEY);\n  },\n  async clear() {\n    await SecureStore.deleteItemAsync(TOKEN_KEY);\n  },\n};\n\n// Use: const token = await tokenStore.load();",
          output: "Auth tokens protected by the OS keystore.",
        },
        mistakes: [
          "Putting tokens in AsyncStorage or Redux persist.",
          "Storing plaintext passwords anywhere.",
        ],
        bestPractices: [
          "Never log tokens.",
          "Rotate tokens on suspicious activity.",
        ],
        exerciseTitle: "Secure Tokens",
        exerciseDescription: "Move auth tokens into secure storage.",
        exerciseRequirements: ["SecureStore save/load/clear", "No token in AsyncStorage", "Logout clears"],
        challenge: "Add biometric unlock with expo-local-authentication.",
        summary: "Secure storage keeps secrets out of plaintext.",
      }),
      lesson({
        title: "App Hardening",
        slug: "rn-hardening",
        minutes: 20,
        objective: "Harden the app against tampering.",
        intro:
          "Production hardening: disable debug builds, strip dev logs, verify certificate pinning options, and protect API keys.",
        concepts: [
          "- __DEV__ guards for dev-only logs.",
          "- Environment configs via app config, not hardcoded.",
          "- Certificate pinning for high-security APIs.",
        ],
        example: {
          lang: "typescript",
          code: "// app.json\n{\n  \"expo\": {\n    \"name\": \"MyApp\",\n    \"ios\": { \"supportsTablet\": true },\n    \"android\": { \"package\": \"com.example.myapp\" },\n    \"extra\": {\n      \"apiUrl\": \"https://api.example.com\",\n      \"sentryDsn\": \"...\"\n    }\n  }\n}\n\n// Usage\nimport Constants from 'expo-constants';\nconst apiUrl = Constants.expoConfig?.extra?.apiUrl;\n\n// Dev-only logs\nif (__DEV__) {\n  console.log('request', payload);\n}",
          output: "Secrets in config, logs stripped from release.",
        },
        mistakes: [
          "Hardcoding API keys in the bundle.",
          "Shipping debug builds to stores.",
        ],
        bestPractices: [
          "Use app config + server-side secrets.",
          "Enroll in app attestation for sensitive features.",
        ],
        exerciseTitle: "Harden",
        exerciseDescription: "Move secrets to config and guard dev logs.",
        exerciseRequirements: ["Config-based secrets", "__DEV__ guards", "Release build smoke test"],
        challenge: "Add Sentry to the release build.",
        summary: "Hardening reduces the attack surface of shipped apps.",
      }),
    ],
  },
  {
    title: "Testing & CI",
    description: "Jest, React Native Testing Library, E2E",
    lessons: [
      lesson({
        title: "Unit & Component Tests",
        slug: "rn-unit-tests",
        minutes: 25,
        objective: "Test components and utilities with Jest.",
        intro:
          "Jest + React Native Testing Library render components, simulate interaction, and assert on accessibility-friendly queries.",
        concepts: [
          "- render, fireEvent, screen queries.",
          "- Mock native modules that need a device.",
          "- Test reducers/selectors/helpers as pure units.",
        ],
        example: {
          lang: "typescript",
          code: "import { render, fireEvent, screen } from '@testing-library/react-native';\nimport { Counter } from '../Counter';\n\ntest('increments when pressed', () => {\n  render(<Counter />);\n  fireEvent.press(screen.getByText('+1'));\n  expect(screen.getByText('Count: 1')).toBeOnTheScreen();\n});\n\n// Pure util test\ntest('formats currency', () => {\n  expect(formatCurrency(1234.5)).toBe('$1,234.50');\n});",
          output: "Fast, deterministic component tests.",
        },
        mistakes: [
          "Snapshot-testing everything (brittle).",
          "Not mocking native modules (crash on render).",
        ],
        bestPractices: [
          "Query by role/text, not testID, where possible.",
          "Test behavior, not implementation.",
        ],
        exerciseTitle: "Test It",
        exerciseDescription: "Write component tests for a form and a util.",
        exerciseRequirements: ["1 component test", "1 pure util test", "All green"],
        challenge: "Add a test for async data loading.",
        summary: "Jest + RNTL give fast feedback on logic and UI.",
      }),
      lesson({
        title: "E2E with Detox",
        slug: "rn-detox",
        minutes: 25,
        objective: "Automate real-device flows with Detox.",
        intro:
          "Detox runs tests against a real simulator/emulator, covering full user journeys that unit tests can't.",
        concepts: [
          "- Detox config: device, app binary, jest setup.",
          "- device.launchApp, element(by.id).tap().",
          "- CI: run on the same build for iOS/Android.",
        ],
        example: {
          lang: "typescript",
          code: "describe('Login flow', () => {\n  beforeAll(async () => {\n    await device.launchApp();\n  });\n\n  it('logs in and shows the dashboard', async () => {\n    await element(by.id('email')).typeText('ada@example.com');\n    await element(by.id('password')).typeText('secret123');\n    await element(by.id('login-button')).tap();\n    await expect(element(by.id('dashboard'))).toBeVisible();\n  });\n});",
          output: "The full login journey verified on a device.",
        },
        mistakes: [
          "Relying on sleep() waits (flaky).",
          "Testing everything E2E (slow, brittle).",
        ],
        bestPractices: [
          "Add testID only to interactive elements.",
          "Run critical paths E2E; the rest in unit tests.",
        ],
        exerciseTitle: "E2E",
        exerciseDescription: "Write one Detox flow for login → dashboard.",
        exerciseRequirements: ["Detox config", "1 critical flow", "Runs on simulator"],
        challenge: "Add a purchase flow E2E with a sandbox.",
        summary: "Detox verifies whole journeys on real devices.",
      }),
      lesson({
        title: "CI for Mobile",
        slug: "rn-ci",
        minutes: 15,
        objective: "Run mobile tests in CI.",
        intro:
          "GitHub Actions (or EAS Build) runs lint, unit tests, and optionally Detox on every push before any release.",
        concepts: [
          "- EAS Build for cloud builds without a Mac.",
          "- Matrix over Node versions / platforms.",
          "- Upload artifacts for test reports.",
        ],
        example: {
          lang: "yaml",
          code: "name: Mobile CI\non: [push]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with: { node-version: '20' }\n      - run: npm ci\n      - run: npx tsc --noEmit\n      - run: npm run lint\n      - run: npm test -- --coverage\n\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: expo/expo-github-action@v8\n      - run: npx eas build --platform android --non-interactive",
          output: "Typecheck, lint, tests, and a cloud build per push.",
        },
        mistakes: [
          "Skipping typecheck/lint in CI.",
          "Building only on local machines.",
        ],
        bestPractices: [
          "Fail fast: typecheck before tests.",
          "Cache node_modules for speed.",
        ],
        exerciseTitle: "CI",
        exerciseDescription: "Create a CI workflow for checks + a cloud build.",
        exerciseRequirements: ["Workflow YAML", "Checks run", "Build artifact"],
        challenge: "Add a Detox job on a macOS runner.",
        summary: "CI makes mobile quality checks automatic.",
      }),
    ],
  },
  {
    title: "Real World Project",
    description: "Build and ship an e-commerce app",
    lessons: [
      lesson({
        title: "Project Planning",
        slug: "rn-project-planning",
        minutes: 25,
        objective: "Plan the Shop app architecture.",
        intro:
          "We build 'ShopGo': a React Native e-commerce app — product catalog, cart, checkout with Stripe, orders, and push updates.",
        concepts: [
          "- Screens: Home, Catalog, Product, Cart, Checkout, Orders, Profile.",
          "- State: cart in React Context or Zustand; auth token secure-stored.",
          "- Backend: REST API for products, orders, payment intents.",
        ],
        example: {
          lang: "text",
          code: "Screens & navigation:\nTabs: Home | Catalog | Cart | Orders | Profile\nStacks inside each tab for details.\n\nState:\n- CartContext (items, add, remove, total)\n- AuthContext (token, user, login/logout)\n- SecureStore for tokens\n\nAPI endpoints:\n- GET /products, GET /products/:id\n- POST /orders, POST /orders/:id/pay\n- GET /orders\n\nMilestones:\n1. Navigation + theme shell\n2. Catalog + product detail\n3. Cart state + persistence\n4. Checkout with Stripe\n5. Orders + push updates\n6. Tests + release build",
          output: "A buildable roadmap for the app.",
        },
        mistakes: [
          "Skipping navigation planning.",
          "Leaving cart state in component props.",
        ],
        bestPractices: [
          "Plan screens and state before code.",
          "Keep API access in one service layer.",
        ],
        exerciseTitle: "Plan",
        exerciseDescription: "Document screens, state, and API endpoints.",
        exerciseRequirements: ["Screen map", "State design", "API list"],
        challenge: "Design the order state machine.",
        summary: "Planning prevents navigation and state spaghetti.",
      }),
      lesson({
        title: "Building the Core",
        slug: "rn-project-core",
        minutes: 30,
        objective: "Implement catalog, cart, and checkout.",
        intro:
          "Build the shopping core: fetch products, render a rich catalog, manage cart state, and complete a Stripe payment.",
        concepts: [
          "- FlatList catalog with product cards.",
          "- CartContext with add/remove/total and AsyncStorage persistence.",
          "- PaymentSheet checkout confirmed by webhook.",
        ],
        example: {
          lang: "typescript",
          code: "function CartProvider({ children }) {\n  const [items, setItems] = useState<CartItem[]>([]);\n\n  useEffect(() => {\n    AsyncStorage.getItem('cart').then((saved) => saved && setItems(JSON.parse(saved)));\n  }, []);\n\n  const add = (product: Product) => {\n    setItems((prev) => {\n      const existing = prev.find((i) => i.id === product.id);\n      const next = existing\n        ? prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))\n        : [...prev, { ...product, qty: 1 }];\n      AsyncStorage.setItem('cart', JSON.stringify(next));\n      return next;\n    });\n  };\n\n  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);\n  return <CartContext.Provider value={{ items, add, remove, total }}>{children}</CartContext.Provider>;\n}",
          output: "A persistent, reactive cart.",
        },
        mistakes: [
          "Recomputing totals in each screen.",
          "Not persisting the cart across restarts.",
        ],
        bestPractices: [
          "Centralize cart logic in context.",
          "Debounce persistence writes.",
        ],
        exerciseTitle: "Core Build",
        exerciseDescription: "Implement catalog + cart + checkout flow.",
        exerciseRequirements: ["Product list", "Persistent cart", "Stripe checkout"],
        challenge: "Add product search and filters.",
        summary: "Catalog, cart, and checkout form the shopping core.",
      }),
      lesson({
        title: "Launch",
        slug: "rn-project-launch",
        minutes: 30,
        objective: "Add orders, push updates, tests, and release.",
        intro:
          "Finish the product: order tracking, push updates on shipment, test coverage, and a release build.",
        concepts: [
          "- Orders screen polling or push-driven updates.",
          "- Push on order status changes (paid → shipped).",
          "- EAS Build for a signed release binary.",
        ],
        example: {
          lang: "typescript",
          code: "// Server: on order shipped\nawait sendPush(userDeviceToken, {\n  title: 'Order shipped 🚚',\n  body: `Your order #${order.id} is on the way`,\n  data: { orderId: order.id },\n});\n\n// App: refresh orders when a push arrives\nNotifications.addNotificationResponseReceivedListener((r) => {\n  refreshOrders(r.notification.request.content.data.orderId);\n});\n\n// Release\nnpx eas build --platform all --profile production\nnpx eas submit --platform ios  # or via app store connect",
          output: "Orders with live updates and a release build.",
        },
        mistakes: [
          "Skipping tests before the release build.",
          "Shipping without handling the payment webhook.",
        ],
        bestPractices: [
          "Test checkout with a sandbox card set.",
          "Monitor push deliverability after launch.",
        ],
        exerciseTitle: "Ship",
        exerciseDescription: "Add order pushes, tests, and a release build.",
        exerciseRequirements: ["Order status updates", "Test suite green", "Release build"],
        challenge: "Add order cancellation and refund flow.",
        summary: "Push updates, tests, and release complete the app.",
      }),
    ],
  },
];