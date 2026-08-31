import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding FactLearning database...");

  // Clean existing data using Prisma deleteMany
  console.log("  Cleaning existing data...");
  await prisma.userAchievement.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.note.deleteMany();
  await prisma.bookmark.deleteMany();
  await prisma.quizAttempt.deleteMany();
  await prisma.quizOption.deleteMany();
  await prisma.quizQuestion.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.exerciseProgress.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.lessonProgress.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.module.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.course.deleteMany();
  await prisma.courseCategory.deleteMany();
  await prisma.userStats.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();
  console.log("  Cleaned!");

  // ─── Users ────────────────────────────────────────────────

  const passwordHash = await bcrypt.hash("password123", 12);

  const admin = await prisma.user.create({
    data: {
      firstName: "Admin",
      lastName: "User",
      username: "admin",
      email: "admin@factlearning.com",
      passwordHash,
      role: "ADMIN",
      xp: 500,
      level: 6,
    },
  });

  const instructor = await prisma.user.create({
    data: {
      firstName: "John",
      lastName: "Teacher",
      username: "instructor",
      email: "instructor@factlearning.com",
      passwordHash,
      role: "INSTRUCTOR",
      xp: 300,
      level: 4,
    },
  });

  const demoUser = await prisma.user.create({
    data: {
      firstName: "Demo",
      lastName: "Student",
      username: "demo",
      email: "demo@factlearning.com",
      passwordHash,
      role: "USER",
      xp: 150,
      level: 3,
      currentStreak: 5,
      longestStreak: 12,
    },
  });

  // Create stats
  await prisma.userStats.createMany({
    data: [
      {
        userId: admin.id,
        coursesEnrolled: 0,
        coursesCompleted: 0,
        lessonsCompleted: 0,
      },
      {
        userId: instructor.id,
        coursesEnrolled: 2,
        coursesCompleted: 1,
        lessonsCompleted: 15,
      },
      {
        userId: demoUser.id,
        coursesEnrolled: 3,
        coursesCompleted: 1,
        lessonsCompleted: 10,
        exercisesCompleted: 5,
        quizzesPassed: 3,
      },
    ],
  });

  console.log("✅ Users created");

  // ─── Categories ───────────────────────────────────────────

  const categories = await Promise.all(
    [
      { name: "Frontend", slug: "frontend" },
      { name: "Backend", slug: "backend" },
      { name: "Mobile", slug: "mobile" },
      { name: "Systems", slug: "systems" },
      { name: "Frameworks", slug: "frameworks" },
    ].map((cat) => prisma.courseCategory.create({ data: cat })),
  );

  const [frontendCat, backendCat, mobileCat, systemsCat, frameworksCat] =
    categories;
  console.log("✅ Categories created");

  // ─── Courses ──────────────────────────────────────────────

  const courseData = [
    {
      title: "Python Programming — Basic",
      slug: "python-basic",
      description: "Learn Python programming from scratch.",
      level: "BASIC" as const,
      difficulty: "BEGINNER" as const,
      categoryId: backendCat.id,
      languageIcon: "/images/Python.png",
      estimatedHours: 20,
      instructorName: "John Teacher",
      status: "PUBLISHED" as const,
      requirements: [
        "No prior programming experience needed",
        "A computer with internet access",
      ],
      objectives: [
        "Write Python programs",
        "Understand variables and data types",
        "Use control flow and loops",
        "Write functions",
        "Handle basic errors",
      ],
    },
    {
      title: "Python Programming — Intermediate",
      slug: "python-intermediate",
      description: "Master OOP, modules, file handling, and more in Python.",
      level: "INTERMEDIATE" as const,
      difficulty: "MEDIUM" as const,
      categoryId: backendCat.id,
      languageIcon: "/images/Python.png",
      estimatedHours: 25,
      status: "PUBLISHED" as const,
      requirements: ["Python Basic course or equivalent knowledge"],
      objectives: [
        "Master Object-Oriented Programming",
        "Work with modules and packages",
        "Handle files and exceptions",
        "Understand decorators and generators",
      ],
    },
    {
      title: "Python Programming — Advanced",
      slug: "python-advanced",
      description:
        "Advanced Python: async programming, metaclasses, design patterns, and production best practices.",
      level: "ADVANCED" as const,
      difficulty: "HARD" as const,
      categoryId: backendCat.id,
      languageIcon: "/images/Python.png",
      estimatedHours: 30,
      status: "PUBLISHED" as const,
      requirements: ["Strong Python knowledge"],
      objectives: [
        "Async/await programming",
        "Design patterns",
        "Performance optimization",
        "Production deployment",
      ],
    },
    {
      title: "JavaScript Programming — Basic",
      slug: "javascript-basic",
      description:
        "Learn JavaScript fundamentals. Variables, functions, DOM manipulation, and events.",
      level: "BASIC" as const,
      difficulty: "BEGINNER" as const,
      categoryId: frontendCat.id,
      languageIcon: "/images/javascript.png",
      estimatedHours: 20,
      status: "PUBLISHED" as const,
      requirements: ["Basic HTML knowledge"],
      objectives: [
        "Write JavaScript programs",
        "Manipulate the DOM",
        "Handle events",
        "Use modern ES6+ syntax",
      ],
    },
    {
      title: "React Development — Basic",
      slug: "react-basic",
      description:
        "Learn React from scratch. Components, JSX, props, state, and hooks.",
      level: "BASIC" as const,
      difficulty: "BEGINNER" as const,
      categoryId: frontendCat.id,
      languageIcon: "/images/react.png",
      estimatedHours: 25,
      status: "PUBLISHED" as const,
      requirements: ["JavaScript basics"],
      objectives: [
        "Build React components",
        "Manage state with hooks",
        "Handle events and forms",
        "Use React Router",
      ],
    },
    {
      title: "Next.js Development — Basic",
      slug: "nextjs-basic",
      description:
        "Learn Next.js fundamentals. App Router, server components, API routes, and deployment.",
      level: "BASIC" as const,
      difficulty: "MEDIUM" as const,
      categoryId: frontendCat.id,
      languageIcon: "/images/nextjs.png",
      estimatedHours: 30,
      status: "PUBLISHED" as const,
      requirements: ["React basics", "JavaScript proficiency"],
      objectives: [
        "Create Next.js apps",
        "Use App Router",
        "Build with server components",
        "Deploy to production",
      ],
    },
    {
      title: "Java Programming — Basic",
      slug: "java-basic",
      description:
        "Learn Java fundamentals. OOP, collections, exception handling, and more.",
      level: "BASIC" as const,
      difficulty: "BEGINNER" as const,
      categoryId: backendCat.id,
      languageIcon: "/images/java.png",
      estimatedHours: 25,
      status: "PUBLISHED" as const,
      requirements: ["No prior experience needed"],
      objectives: [
        "Write Java programs",
        "Master OOP concepts",
        "Use collections",
        "Handle exceptions",
      ],
    },
    {
      title: "Go Programming — Basic",
      slug: "go-basic",
      description:
        "Learn Go from scratch. Goroutines, channels, interfaces, and concurrency.",
      level: "BASIC" as const,
      difficulty: "BEGINNER" as const,
      categoryId: backendCat.id,
      languageIcon: "/images/golang.png",
      estimatedHours: 20,
      status: "PUBLISHED" as const,
      requirements: ["Any programming experience helpful"],
      objectives: [
        "Write Go programs",
        "Understand goroutines",
        "Use channels",
        "Build concurrent programs",
      ],
    },
    {
      title: "Rust Programming — Basic",
      slug: "rust-basic",
      description:
        "Learn Rust from scratch. Ownership, borrowing, lifetimes, and systems programming.",
      level: "BASIC" as const,
      difficulty: "MEDIUM" as const,
      categoryId: systemsCat.id,
      languageIcon: "/images/rust.svg",
      estimatedHours: 25,
      status: "PUBLISHED" as const,
      requirements: ["Basic programming knowledge"],
      objectives: [
        "Understand ownership",
        "Write safe Rust code",
        "Use pattern matching",
        "Build CLI tools",
      ],
    },
    {
      title: "Vue.js Development — Basic",
      slug: "vue-basic",
      description:
        "Learn Vue.js from scratch. Components, reactivity, directives, and Composition API.",
      level: "BASIC" as const,
      difficulty: "BEGINNER" as const,
      categoryId: frontendCat.id,
      languageIcon: "/images/vue.png",
      estimatedHours: 20,
      status: "PUBLISHED" as const,
      requirements: ["HTML, CSS, JavaScript basics"],
      objectives: [
        "Build Vue components",
        "Use Composition API",
        "Manage state",
        "Create reactive UIs",
      ],
    },
    {
      title: "PHP Programming — Basic",
      slug: "php-basic",
      description:
        "Learn PHP fundamentals. Variables, functions, OOP, database interaction.",
      level: "BASIC" as const,
      difficulty: "BEGINNER" as const,
      categoryId: backendCat.id,
      languageIcon: "/images/php.png",
      estimatedHours: 20,
      status: "PUBLISHED" as const,
      requirements: ["Basic HTML knowledge"],
      objectives: [
        "Write PHP scripts",
        "Work with forms",
        "Connect to databases",
        "Understand OOP in PHP",
      ],
    },
    {
      title: "Laravel Framework — Basic",
      slug: "laravel-basic",
      description:
        "Learn Laravel from scratch. Routing, controllers, views, Eloquent ORM, and more.",
      level: "BASIC" as const,
      difficulty: "MEDIUM" as const,
      categoryId: frameworksCat.id,
      languageIcon: "/images/laravel.png",
      estimatedHours: 30,
      status: "PUBLISHED" as const,
      requirements: ["PHP basics"],
      objectives: [
        "Build Laravel apps",
        "Use Eloquent ORM",
        "Create APIs",
        "Handle authentication",
      ],
    },
    {
      title: "Flutter Development — Basic",
      slug: "flutter-basic",
      description:
        "Learn Flutter from scratch. Dart, widgets, layouts, and cross-platform mobile development.",
      level: "BASIC" as const,
      difficulty: "BEGINNER" as const,
      categoryId: mobileCat.id,
      languageIcon: "/images/flutter.jpg",
      estimatedHours: 25,
      status: "PUBLISHED" as const,
      requirements: ["Any programming experience"],
      objectives: [
        "Build Flutter apps",
        "Use widgets",
        "Create layouts",
        "Deploy to mobile",
      ],
    },
    {
      title: "React Native Development — Basic",
      slug: "react-native-basic",
      description:
        "Learn React Native for cross-platform mobile development using React.",
      level: "BASIC" as const,
      difficulty: "MEDIUM" as const,
      categoryId: mobileCat.id,
      languageIcon: "/images/react.png",
      estimatedHours: 25,
      status: "PUBLISHED" as const,
      requirements: ["React basics", "JavaScript proficiency"],
      objectives: [
        "Build React Native apps",
        "Use native components",
        "Handle navigation",
        "Deploy to app stores",
      ],
    },
    {
      title: "Node.js Development — Basic",
      slug: "nodejs-basic",
      description:
        "Learn Node.js fundamentals. Modules, HTTP, Express, databases, and APIs.",
      level: "BASIC" as const,
      difficulty: "BEGINNER" as const,
      categoryId: backendCat.id,
      languageIcon: "/images/nodejs-icon.png",
      estimatedHours: 25,
      status: "PUBLISHED" as const,
      requirements: ["JavaScript basics"],
      objectives: [
        "Build Node.js servers",
        "Create REST APIs",
        "Work with databases",
        "Handle authentication",
      ],
    },
    {
      title: "Nuxt.js Development — Basic",
      slug: "nuxtjs-basic",
      description: "Learn Nuxt.js for server-side rendered Vue applications.",
      level: "BASIC" as const,
      difficulty: "MEDIUM" as const,
      categoryId: frontendCat.id,
      languageIcon: "/images/Nuxt-icon.png",
      estimatedHours: 25,
      status: "PUBLISHED" as const,
      requirements: ["Vue.js basics"],
      objectives: [
        "Build Nuxt.js apps",
        "Use server-side rendering",
        "Create APIs",
        "Deploy applications",
      ],
    },
    {
      title: "C# Programming — Basic",
      slug: "csharp-basic",
      description:
        "Learn C# fundamentals. OOP, LINQ, async/await, and .NET development.",
      level: "BASIC" as const,
      difficulty: "BEGINNER" as const,
      categoryId: backendCat.id,
      languageIcon: "/images/C-Charp-icon.png",
      estimatedHours: 25,
      status: "PUBLISHED" as const,
      requirements: ["Any programming experience"],
      objectives: [
        "Write C# programs",
        "Master OOP",
        "Use LINQ",
        "Build .NET applications",
      ],
    },
    {
      title: "Flask Web Framework — Basic",
      slug: "flask-basic",
      description: "Learn Flask for building Python web applications and APIs.",
      level: "BASIC" as const,
      difficulty: "BEGINNER" as const,
      categoryId: frameworksCat.id,
      languageIcon: "/images/flask-icon.png",
      estimatedHours: 20,
      status: "PUBLISHED" as const,
      requirements: ["Python basics"],
      objectives: [
        "Build Flask apps",
        "Create APIs",
        "Work with templates",
        "Handle databases",
      ],
    },
    {
      title: "Django Web Framework — Basic",
      slug: "django-basic",
      description: "Learn Django for building robust Python web applications.",
      level: "BASIC" as const,
      difficulty: "MEDIUM" as const,
      categoryId: frameworksCat.id,
      languageIcon: "/images/django-icon.png",
      estimatedHours: 30,
      status: "PUBLISHED" as const,
      requirements: ["Python basics"],
      objectives: [
        "Build Django apps",
        "Use the ORM",
        "Create admin panels",
        "Deploy applications",
      ],
    },
  ];

  const courses: { id: string; slug: string; title: string }[] = [];
  for (const data of courseData) {
    const course = await prisma.course.create({
      data: {
        ...data,
        publishedAt: data.status === "PUBLISHED" ? new Date() : null,
      },
    });
    courses.push(course);
  }

  console.log(`✅ ${courses.length} courses created`);

  // ─── Modules & Lessons for Python Basic ───────────────────

  const pyBasic = courses.find((c) => c.slug === "python-basic")!;

  const pyModules = await Promise.all([
    prisma.module.create({
      data: {
        courseId: pyBasic.id,
        title: "Getting Started",
        description: "Introduction to Python and setup",
        order: 1,
      },
    }),
    prisma.module.create({
      data: {
        courseId: pyBasic.id,
        title: "Core Concepts",
        description: "Variables, data types, and operators",
        order: 2,
      },
    }),
    prisma.module.create({
      data: {
        courseId: pyBasic.id,
        title: "Control Flow",
        description: "Conditions and loops",
        order: 3,
      },
    }),
    prisma.module.create({
      data: {
        courseId: pyBasic.id,
        title: "Functions",
        description: "Writing reusable code",
        order: 4,
      },
    }),
  ]);

  const pyLessons1 = await Promise.all([
    prisma.lesson.create({
      data: {
        moduleId: pyModules[0].id,
        title: "What is Python?",
        slug: "what-is-python",
        content:
          '# What is Python?\n\nPython is a high-level, interpreted programming language created by Guido van Rossum in 1991.\n\n## Why Learn Python?\n\n- **Easy to learn**: Simple, readable syntax\n- **Versatile**: Web development, data science, AI, automation\n- **Huge community**: Extensive libraries and support\n\n## Your First Python Program\n\n```python\nprint("Hello, World!")\n```\n\n> Tip: Python uses indentation for code blocks, making it naturally readable.',
        estimatedMinutes: 10,
        order: 1,
        status: "PUBLISHED",
      },
    }),
    prisma.lesson.create({
      data: {
        moduleId: pyModules[0].id,
        title: "Installing Python",
        slug: "installing-python",
        content:
          '# Installing Python\n\n## Download Python\n\nVisit python.org and download the latest version.\n\n## Verify Installation\n\n```bash\npython --version\n```\n\n## Using Python REPL\n\n```python\n>>> 2 + 2\n4\n>>> print("Hello!")\nHello!\n```\n\n## IDE Setup\n\nRecommended editors:\n- **VS Code** with Python extension\n- **PyCharm** (Community Edition)\n- **Jupyter Notebook** for data science',
        estimatedMinutes: 15,
        order: 2,
        status: "PUBLISHED",
      },
    }),
  ]);

  const pyLessons2 = await Promise.all([
    prisma.lesson.create({
      data: {
        moduleId: pyModules[1].id,
        title: "Variables and Data Types",
        slug: "variables-data-types",
        content:
          '# Variables and Data Types\n\n## Variables\n\n```python\nname = "Alice"\nage = 25\nheight = 5.8\nis_student = True\n```\n\n## Data Types\n\n| Type | Example | Description |\n|------|---------|-------------|\n| `str` | "Hello" | Text |\n| `int` | 42 | Integer |\n| `float` | 3.14 | Decimal |\n| `bool` | True/False | Boolean |\n| `list` | [1, 2, 3] | Ordered collection |\n| `dict` | {"key": "val"} | Key-value pairs |\n\n## Type Checking\n\n```python\nx = 10\nprint(type(x))  # <class \'int\'>\n```',
        estimatedMinutes: 20,
        order: 1,
        status: "PUBLISHED",
      },
    }),
    prisma.lesson.create({
      data: {
        moduleId: pyModules[1].id,
        title: "Operators",
        slug: "operators",
        content:
          "# Operators\n\n## Arithmetic Operators\n\n```python\na = 10\nb = 3\nprint(a + b)   # 13\nprint(a - b)   # 7\nprint(a * b)   # 30\nprint(a / b)   # 3.33\nprint(a // b)  # 3\nprint(a % b)   # 1\nprint(a ** b)  # 1000\n```\n\n## Comparison Operators\n\n```python\nprint(5 == 5)   # True\nprint(5 != 3)   # True\nprint(5 > 3)    # True\n```",
        estimatedMinutes: 15,
        order: 2,
        status: "PUBLISHED",
      },
    }),
  ]);

  const pyLessons3 = await Promise.all([
    prisma.lesson.create({
      data: {
        moduleId: pyModules[2].id,
        title: "Conditions",
        slug: "conditions",
        content:
          '# Conditions\n\n## if Statement\n\n```python\nage = 18\nif age >= 18:\n    print("You can vote!")\n```\n\n## if-else\n\n```python\ntemperature = 25\nif temperature > 30:\n    print("It\'s hot!")\nelse:\n    print("It\'s nice outside.")\n```\n\n## elif\n\n```python\nscore = 85\nif score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelif score >= 70:\n    grade = "C"\nelse:\n    grade = "F"\n```',
        estimatedMinutes: 15,
        order: 1,
        status: "PUBLISHED",
      },
    }),
    prisma.lesson.create({
      data: {
        moduleId: pyModules[2].id,
        title: "Loops",
        slug: "loops",
        content:
          '# Loops\n\n## for Loop\n\n```python\nfor i in range(5):\n    print(i)  # 0, 1, 2, 3, 4\n\nfruits = ["apple", "banana", "cherry"]\nfor fruit in fruits:\n    print(fruit)\n```\n\n## while Loop\n\n```python\ncount = 0\nwhile count < 5:\n    print(count)\n    count += 1\n```\n\n## List Comprehension\n\n```python\nsquares = [x**2 for x in range(10)]\nprint(squares)\n```',
        estimatedMinutes: 20,
        order: 2,
        status: "PUBLISHED",
      },
    }),
  ]);

  const pyLessons4 = await Promise.all([
    prisma.lesson.create({
      data: {
        moduleId: pyModules[3].id,
        title: "Functions",
        slug: "functions",
        content:
          '# Functions\n\n## Defining Functions\n\n```python\ndef greet(name):\n    return f"Hello, {name}!"\n\nmessage = greet("Alice")\nprint(message)  # Hello, Alice!\n```\n\n## Default Parameters\n\n```python\ndef greet(name, greeting="Hello"):\n    return f"{greeting}, {name}!"\n```\n\n## Lambda Functions\n\n```python\nsquare = lambda x: x ** 2\nprint(square(5))  # 25\n```',
        estimatedMinutes: 20,
        order: 1,
        status: "PUBLISHED",
      },
    }),
  ]);

  const allPyLessons = [
    ...pyLessons1,
    ...pyLessons2,
    ...pyLessons3,
    ...pyLessons4,
  ];

  // ─── Exercises ────────────────────────────────────────────

  await prisma.exercise.createMany({
    data: [
      {
        lessonId: allPyLessons[0].id,
        title: "Print Your Name",
        description:
          "Write a Python program that prints your name using the print() function.",
        requirements: ["Use the print() function", "Print your actual name"],
        expectedOutput: "Your Name",
        points: 10,
        order: 1,
      },
      {
        lessonId: allPyLessons[2].id,
        title: "Variable Practice",
        description:
          "Create variables for your name, age, and favorite color. Then print them all.",
        requirements: [
          "Create at least 3 variables",
          "Use different data types",
          "Print each variable",
        ],
        points: 15,
        order: 1,
      },
      {
        lessonId: allPyLessons[5].id,
        title: "Grade Calculator",
        description:
          "Write a program that takes a score (0-100) and prints the letter grade.",
        requirements: [
          "90+ = A",
          "80-89 = B",
          "70-79 = C",
          "60-69 = D",
          "Below 60 = F",
        ],
        points: 20,
        order: 1,
      },
      {
        lessonId: allPyLessons[6].id,
        title: "Even Numbers",
        description: "Print all even numbers from 1 to 50 using a loop.",
        requirements: [
          "Use a for loop",
          "Check if each number is even",
          "Print even numbers only",
        ],
        points: 15,
        order: 1,
      },
      {
        lessonId: allPyLessons[6].id,
        title: "Sum Function",
        description:
          "Write a function that takes two numbers and returns their sum.",
        requirements: [
          "Define a function",
          "Accept two parameters",
          "Return the sum",
        ],
        points: 15,
        order: 1,
      },
    ],
  });

  console.log("✅ Exercises created");

  // ─── Quiz ─────────────────────────────────────────────────

  const pyQuiz = await prisma.quiz.create({
    data: {
      lessonId: allPyLessons[6].id,
      title: "Python Basics Quiz",
      description: "Test your knowledge of Python fundamentals",
      passScore: 70,
      timeLimit: 10,
    },
  });

  const quizQuestions = await Promise.all([
    prisma.quizQuestion.create({
      data: {
        quizId: pyQuiz.id,
        question: "What is the correct file extension for Python files?",
        type: "MULTIPLE_CHOICE",
        points: 10,
        order: 1,
      },
    }),
    prisma.quizQuestion.create({
      data: {
        quizId: pyQuiz.id,
        question: "Which keyword is used to define a function in Python?",
        type: "MULTIPLE_CHOICE",
        points: 10,
        order: 2,
      },
    }),
    prisma.quizQuestion.create({
      data: {
        quizId: pyQuiz.id,
        question: "Python uses indentation for code blocks.",
        type: "TRUE_FALSE",
        points: 10,
        order: 3,
      },
    }),
    prisma.quizQuestion.create({
      data: {
        quizId: pyQuiz.id,
        question: "What does the 'len()' function do?",
        type: "MULTIPLE_CHOICE",
        points: 10,
        order: 4,
      },
    }),
  ]);

  await prisma.quizOption.createMany({
    data: [
      {
        questionId: quizQuestions[0].id,
        text: ".py",
        isCorrect: true,
        order: 1,
      },
      {
        questionId: quizQuestions[0].id,
        text: ".python",
        isCorrect: false,
        order: 2,
      },
      {
        questionId: quizQuestions[0].id,
        text: ".pt",
        isCorrect: false,
        order: 3,
      },
      {
        questionId: quizQuestions[1].id,
        text: "def",
        isCorrect: true,
        order: 1,
      },
      {
        questionId: quizQuestions[1].id,
        text: "func",
        isCorrect: false,
        order: 2,
      },
      {
        questionId: quizQuestions[1].id,
        text: "function",
        isCorrect: false,
        order: 3,
      },
      {
        questionId: quizQuestions[2].id,
        text: "True",
        isCorrect: true,
        order: 1,
      },
      {
        questionId: quizQuestions[2].id,
        text: "False",
        isCorrect: false,
        order: 2,
      },
      {
        questionId: quizQuestions[3].id,
        text: "Returns the length of an object",
        isCorrect: true,
        order: 1,
      },
      {
        questionId: quizQuestions[3].id,
        text: "Converts to lowercase",
        isCorrect: false,
        order: 2,
      },
    ],
  });

  console.log("✅ Quiz created");

  // ─── Achievements ─────────────────────────────────────────

  await prisma.achievement.createMany({
    data: [
      {
        name: "First Steps",
        description: "Complete your first lesson",
        icon: "🌟",
        requirement: JSON.stringify({ type: "lessons_completed", count: 1 }),
        xpReward: 10,
      },
      {
        name: "Quiz Master",
        description: "Pass your first quiz",
        icon: "📝",
        requirement: JSON.stringify({ type: "first_quiz" }),
        xpReward: 20,
      },
      {
        name: "Course Graduate",
        description: "Complete your first course",
        icon: "🎓",
        requirement: JSON.stringify({ type: "first_course" }),
        xpReward: 50,
      },
      {
        name: "Dedicated Learner",
        description: "Complete 10 lessons",
        icon: "📚",
        requirement: JSON.stringify({ type: "lessons_completed", count: 10 }),
        xpReward: 30,
      },
      {
        name: "Knowledge Seeker",
        description: "Complete 50 lessons",
        icon: "🏅",
        requirement: JSON.stringify({ type: "lessons_completed", count: 50 }),
        xpReward: 100,
      },
      {
        name: "Master Coder",
        description: "Complete 100 lessons",
        icon: "👑",
        requirement: JSON.stringify({ type: "lessons_completed", count: 100 }),
        xpReward: 200,
      },
      {
        name: "Quiz Champion",
        description: "Pass 5 quizzes",
        icon: "🏆",
        requirement: JSON.stringify({ type: "quizzes_passed", count: 5 }),
        xpReward: 50,
      },
      {
        name: "Practice Makes Perfect",
        description: "Complete 10 exercises",
        icon: "💪",
        requirement: JSON.stringify({ type: "exercises_completed", count: 10 }),
        xpReward: 30,
      },
      {
        name: "Course Collector",
        description: "Complete 5 courses",
        icon: "🎖️",
        requirement: JSON.stringify({ type: "courses_completed", count: 5 }),
        xpReward: 100,
      },
      {
        name: "7-Day Streak",
        description: "Study for 7 consecutive days",
        icon: "🔥",
        requirement: JSON.stringify({ type: "streak_7" }),
        xpReward: 50,
      },
      {
        name: "Python Beginner",
        description: "Complete Python Basic course",
        icon: "🐍",
        requirement: JSON.stringify({ type: "course_python_basic" }),
        xpReward: 50,
      },
      {
        name: "Java Beginner",
        description: "Complete Java Basic course",
        icon: "☕",
        requirement: JSON.stringify({ type: "course_java_basic" }),
        xpReward: 50,
      },
    ],
  });

  console.log("✅ Achievements created");

  // ─── Demo Enrollments ─────────────────────────────────────

  await prisma.enrollment.create({
    data: {
      userId: demoUser.id,
      courseId: pyBasic.id,
      status: "ACTIVE",
      progress: 50,
    },
  });

  console.log("✅ Demo enrollments created");

  // ─── Add Extra Modules for Python Basic & Advanced (inline courses) ───
  console.log("  Adding extra modules for Python Basic...");
  const { pythonBasicExtra } = await import("./content/supplement");
  const { pyAdvExtra } = await import("./content/supplement3");
  for (let modIdx = 0; modIdx < pythonBasicExtra.modules.length; modIdx++) {
    const modData = pythonBasicExtra.modules[modIdx];
    const mod = await prisma.module.create({
      data: {
        courseId: pyBasic.id,
        title: modData.title,
        description: modData.description,
        order: 4 + modIdx + 1,
      },
    });
    for (let lesIdx = 0; lesIdx < modData.lessons.length; lesIdx++) {
      const lesData = modData.lessons[lesIdx];
      await prisma.lesson.create({
        data: {
          moduleId: mod.id,
          title: lesData.title,
          slug: lesData.slug,
          content: lesData.content,
          order: lesIdx + 1,
          estimatedMinutes: lesData.estimatedMinutes,
          status: "PUBLISHED",
        },
      });
    }
    console.log(
      `  ✅ Python Basic — ${modData.title} (${modData.lessons.length} lessons)`,
    );
  }

  // ─── Add Modules for Python Advanced (course exists but has 0 modules) ───
  console.log("  Adding modules for Python Advanced...");
  const pyAdvanced = courses.find((c) => c.slug === "python-advanced")!;
  const { pythonAdvanced } = await import("./content/supplement");
  const pythonAdvancedMerged = {
    ...pythonAdvanced,
    modules: [...pythonAdvanced.modules, ...pyAdvExtra.modules],
  };
  for (let modIdx = 0; modIdx < pythonAdvancedMerged.modules.length; modIdx++) {
    const modData = pythonAdvancedMerged.modules[modIdx];
    const mod = await prisma.module.create({
      data: {
        courseId: pyAdvanced.id,
        title: modData.title,
        description: modData.description,
        order: modIdx + 1,
      },
    });
    for (let lesIdx = 0; lesIdx < modData.lessons.length; lesIdx++) {
      const lesData = modData.lessons[lesIdx];
      await prisma.lesson.create({
        data: {
          moduleId: mod.id,
          title: lesData.title,
          slug: lesData.slug,
          content: lesData.content,
          order: lesIdx + 1,
          estimatedMinutes: lesData.estimatedMinutes,
          status: "PUBLISHED",
        },
      });
    }
    console.log(
      `  ✅ Python Advanced — ${modData.title} (${modData.lessons.length} lessons)`,
    );
  }

  // ─── Create Modules & Lessons for All Other Courses ──────
  console.log("\n📚 Creating modules and lessons for all courses...");
  // Import all course content from separate files
  const {
    pythonIntermediate,
    javaBasic,
    javascriptBasic,
    reactBasic,
    nodejsBasic,
    nextjsBasic,
  } = await import("./seed-content");
  const goBasicMod = await import("./content/go-basic");
  const phpLaravelMod = await import("./content/php-laravel");
  const vueNuxtMod = await import("./content/vue-nuxt");
  const rustCsharpMod = await import("./content/rust-csharp");
  const mobilePythonMod = await import("./content/mobile-python");
  const supplementMod = await import("./content/supplement");
  const supplementMod2 = await import("./content/supplement2");
  const supplementMod3 = await import("./content/supplement3");

  // Merge base content with supplements (supplements add extra modules to existing courses)
  function mergeCourseContent(base: any, supplements: any[]): any {
    const matched = supplements.filter((s) => s.slug === base.slug);
    if (matched.length > 0) {
      const extraModules = matched.flatMap((s) => s.modules);
      return { ...base, modules: [...base.modules, ...extraModules] };
    }
    return base;
  }

  const supplements = [
    ...supplementMod.allSupplements,
    ...supplementMod2.allSupplements2,
    ...supplementMod3.allSupplements3,
  ];

  const baseCourses = [
    pythonIntermediate,
    javaBasic,
    javascriptBasic,
    reactBasic,
    nodejsBasic,
    nextjsBasic,
    goBasicMod.goBasic,
    phpLaravelMod.phpBasic,
    phpLaravelMod.laravelBasic,
    vueNuxtMod.vueBasic,
    vueNuxtMod.nuxtjsBasic,
    rustCsharpMod.rustBasic,
    rustCsharpMod.csharpBasic,
    mobilePythonMod.flutterBasic,
    mobilePythonMod.reactNativeBasic,
    mobilePythonMod.flaskBasic,
    mobilePythonMod.djangoBasic,
  ];

  const allCourseContent = baseCourses.map((c) =>
    mergeCourseContent(c, supplements),
  );

  for (const courseContent of allCourseContent) {
    const course = courses.find((c) => c.slug === courseContent.slug);
    if (!course) {
      console.log(`  ⚠ Course not found: ${courseContent.slug}`);
      continue;
    }

    for (let modIdx = 0; modIdx < courseContent.modules.length; modIdx++) {
      const modData = courseContent.modules[modIdx];
      const mod = await prisma.module.create({
        data: {
          courseId: course.id,
          title: modData.title,
          description: modData.description,
          order: modIdx + 1,
        },
      });

      for (let lesIdx = 0; lesIdx < modData.lessons.length; lesIdx++) {
        const lesData = modData.lessons[lesIdx];
        const lesson = await prisma.lesson.create({
          data: {
            moduleId: mod.id,
            title: lesData.title,
            slug: lesData.slug,
            content: lesData.content,
            order: lesIdx + 1,
            estimatedMinutes: lesData.estimatedMinutes,
            status: "PUBLISHED",
          },
        });

        if (lesData.exercises) {
          for (let exIdx = 0; exIdx < lesData.exercises.length; exIdx++) {
            const ex = lesData.exercises[exIdx];
            await prisma.exercise.create({
              data: {
                lessonId: lesson.id,
                title: ex.title,
                description: ex.description,
                requirements: ex.requirements,
                points: ex.points,
                order: exIdx + 1,
              },
            });
          }
        }

        if (lesData.quiz) {
          const quiz = await prisma.quiz.create({
            data: {
              lessonId: lesson.id,
              title: lesData.quiz.title,
              passScore: 70,
              timeLimit: 10,
            },
          });
          for (let qIdx = 0; qIdx < lesData.quiz.questions.length; qIdx++) {
            const q = lesData.quiz.questions[qIdx];
            const question = await prisma.quizQuestion.create({
              data: {
                quizId: quiz.id,
                question: q.question,
                type: q.type as any,
                points: 10,
                order: qIdx + 1,
              },
            });
            for (let oIdx = 0; oIdx < q.options.length; oIdx++) {
              await prisma.quizOption.create({
                data: {
                  questionId: question.id,
                  text: q.options[oIdx].text,
                  isCorrect: q.options[oIdx].isCorrect,
                  order: oIdx + 1,
                },
              });
            }
          }
        }
      }
      console.log(
        `  ✅ ${course.title} — ${modData.title} (${modData.lessons.length} lessons)`,
      );
    }
  }

  console.log("\n🎉 Seeding complete!");
  console.log("\n📋 Test Accounts:");
  console.log("  Admin:      admin@factlearning.com / password123");
  console.log("  Instructor: instructor@factlearning.com / password123");
  console.log("  Demo:       demo@factlearning.com / password123");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
