import type { CourseContent } from "../seed-content";

export const flutterBasic20Modules: CourseContent = {
  slug: "flutter-basic",
  modules: [
    // Module 1: Introduction
    {
      title: "Introduction to Flutter",
      description: "What is Flutter, setup, and first app",
      lessons: [
        {
          title: "What is Flutter?",
          slug: "flutter-intro",
          content: `# What is Flutter?

Flutter is Google's UI toolkit for building natively compiled apps for mobile, web, and desktop.

## Why Learn Flutter?
- **Single codebase** — iOS + Android + Web
- **Hot reload** — fast development
- **Beautiful UI** — Material Design + Cupertino
- **Growing community**

## Setup
\`\`\`bash
flutter create my_app
cd my_app
flutter run
\`\`\`

## First Widget
\`\`\`dart
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text('Hello Flutter')),
        body: const Center(child: Text('Welcome!')),
      ),
    );
  }
}
\`\`\``,
          estimatedMinutes: 15,
        },
        {
          title: "Flutter Development Setup",
          slug: "flutter-setup",
          content: `# Setting Up Flutter

## Install
- Download Flutter SDK
- Add to PATH
- Run \`flutter doctor\`

## IDE
- **VS Code** with Flutter extension
- **Android Studio** with Flutter plugin

## Commands
\`\`\`bash
flutter create my_app   # New project
flutter run              # Run on device
flutter build apk       # Build Android
flutter build ios       # Build iOS
flutter pub get          # Install dependencies
\`\`\``,
          estimatedMinutes: 10,
        },
      ],
    },
    // Module 2: Variables (Dart)
    {
      title: "Dart Variables",
      description: "Variables, types, and null safety",
      lessons: [
        {
          title: "Dart Variables",
          slug: "dart-variables",
          content: `# Dart Variables

## Variables
\`\`\`dart
var name = 'Alice';        // inferred String
String email = 'a@b.com';  // explicit
int age = 25;
double height = 5.8;
bool isActive = true;
final id = 42;             // compile-time constant
const pi = 3.14;           // const
\`\`\`

## Null Safety
\`\`\`dart
String? nullable = null;     // can be null
String nonNullable = 'hi';  // cannot be null

// Null-aware operators
int length = nullable?.length ?? 0;
\`\`\`

## Type Casting
\`\`\`dart
var x = 42;
String numStr = x.toString();
int parsed = int.parse('42');
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 3: Data Types
    {
      title: "Data Types in Dart",
      description: "Strings, lists, maps, and sets",
      lessons: [
        {
          title: "Dart Data Types",
          slug: "dart-datatypes",
          content: `# Data Types

## Strings
\`\`\`dart
var name = "Alice";
var greeting = "Hello, \$name!";  // interpolation
var multi = '''
This is
a multi-line
string
''';
\`\`\`

## Lists
\`\`\`dart
var numbers = [1, 2, 3, 4, 5];
numbers.add(6);
numbers.remove(3);
print(numbers.first);
print(numbers.last);
\`\`\`

## Maps
\`\`\`dart
var person = {
  'name': 'Alice',
  'age': 25,
  'email': 'a@b.com'
};

print(person['name']);  // Alice
\`\`\`

## Sets
\`\`\`dart
var uniqueNumbers = {1, 2, 3, 4, 5};
uniqueNumbers.add(3);  // no duplicate
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 4: Operators
    {
      title: "Operators in Dart",
      description: "Arithmetic, comparison, logical operators",
      lessons: [
        {
          title: "Dart Operators",
          slug: "dart-operators",
          content: `# Operators

## Arithmetic
\`\`\`dart
var a = 10, b = 3;
print(a + b);   // 13
print(a - b);   // 7
print(a * b);   // 30
print(a / b);   // 3.333
print(a ~/ b);  // 3 (integer division)
print(a % b);   // 1 (modulus)
\`\`\`

## Comparison
\`\`\`dart
print(5 == 5);  // true
print(5 != 3);  // true
print(5 > 3);   // true
print(5 <= 5);  // true
\`\`\`

## Logical
\`\`\`dart
print(true && false);  // false
print(true || false);  // true
print(!true);          // false
\`\`\`

## Ternary
\`\`\`dart
var age = 20;
var status = age >= 18 ? 'Adult' : 'Minor';
\`\`\`

## Cascade
\`\`\`dart
var button = Button()
  ..color = Colors.blue
  ..text = 'Click Me'
  ..onPressed = () => print('Clicked');
\`\`\``,
          estimatedMinutes: 15,
        },
      ],
    },
    // Module 5: if
    {
      title: "If Statement",
      description: "Single if condition",
      lessons: [
        {
          title: "If in Dart",
          slug: "dart-if",
          content: `# If Statement

\`\`\`dart
var age = 20;

if (age >= 18) {
  print('You can vote!');
}
\`\`\`

## Nested If
\`\`\`dart
var isMember = true;
var age = 25;

if (isMember) {
  if (age >= 18) {
    print('Welcome to the club!');
  }
}
\`\`\`

## If in Expression
\`\`\`dart
var score = 85;
var grade = score >= 90 ? 'A' : (score >= 80 ? 'B' : 'C');
\`\`\``,
          estimatedMinutes: 15,
        },
      ],
    },
    // Module 6: if-else
    {
      title: "If-Else and If-Else-If",
      description: "Conditional branching",
      lessons: [
        {
          title: "If-Else in Dart",
          slug: "dart-if-else",
          content: `# If-Else

\`\`\`dart
var temperature = 25;

if (temperature > 30) {
  print("It's hot!");
} else {
  print("It's nice outside.");
}
\`\`\`

## If-Else-If Chain
\`\`\`dart
var score = 75;
var grade;

if (score >= 90) {
  grade = 'A';
} else if (score >= 80) {
  grade = 'B';
} else if (score >= 70) {
  grade = 'C';
} else if (score >= 60) {
  grade = 'D';
} else {
  grade = 'F';
}

print('Grade: \$grade');  // C
\`\`\``,
          estimatedMinutes: 15,
        },
      ],
    },
    // Module 7: Switch
    {
      title: "Switch Statement",
      description: "Switch-case in Dart",
      lessons: [
        {
          title: "Switch in Dart",
          slug: "dart-switch",
          content: `# Switch Statement

\`\`\`dart
var day = 'Monday';

switch (day) {
  case 'Monday':
    print('Start of week');
    break;
  case 'Friday':
    print('TGIF!');
    break;
  case 'Saturday':
  case 'Sunday':
    print('Weekend!');
    break;
  default:
    print('Regular day');
}
\`\`\`

## Switch Expression (Dart 3+)
\`\`\`dart
var dayType = switch (day) {
  'Monday' || 'Tuesday' || 'Wednesday' || 'Thursday' || 'Friday' => 'Weekday',
  'Saturday' || 'Sunday' => 'Weekend',
  _ => 'Unknown',
};
\`\`\``,
          estimatedMinutes: 15,
        },
      ],
    },
    // Module 8: For Loop
    {
      title: "For Loop",
      description: "Traditional and enhanced for loops",
      lessons: [
        {
          title: "For Loop in Dart",
          slug: "dart-for",
          content: `# For Loop

## Basic For
\`\`\`dart
for (var i = 0; i < 5; i++) {
  print(i);  // 0, 1, 2, 3, 4
}
\`\`\`

## For-in
\`\`\`dart
var fruits = ['Apple', 'Banana', 'Cherry'];

for (var fruit in fruits) {
  print(fruit);
}
\`\`\`

## Nested Loops
\`\`\`dart
for (var i = 1; i <= 5; i++) {
  for (var j = 1; j <= i; j++) {
    print('* ');
  }
  print('');
}
\`\`\`

## forEach
\`\`\`dart
fruits.forEach((fruit) {
  print(fruit);
});
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 9: While and Do-While
    {
      title: "While and Do-While",
      description: "Looping with while and do-while",
      lessons: [
        {
          title: "While and Do-While in Dart",
          slug: "dart-while",
          content: `# While Loop

\`\`\`dart
var count = 0;
while (count < 5) {
  print(count);
  count++;
}
\`\`\`

# Do-While Loop

\`\`\`dart
var num = 1;
do {
  print(num);
  num *= 2;
} while (num <= 16);
// Output: 1, 2, 4, 8, 16
\`\`\`

## Infinite Loop
\`\`\`dart
while (true) {
  // do something
  if (condition) break;
}
\`\`\``,
          estimatedMinutes: 15,
        },
      ],
    },
    // Module 10: Loop Control
    {
      title: "Loop Control",
      description: "Break, continue, and labeled loops",
      lessons: [
        {
          title: "Break and Continue",
          slug: "dart-loop-control",
          content: `# Break and Continue

## Break
\`\`\`dart
for (var i = 0; i < 100; i++) {
  if (i == 5) break;
  print(i);  // 0, 1, 2, 3, 4
}
\`\`\`

## Continue
\`\`\`dart
for (var i = 0; i < 10; i++) {
  if (i % 2 == 0) continue;  // skip even
  print(i);  // 1, 3, 5, 7, 9
}
\`\`\`

## Labeled Loops
\`\`\`dart
outer:
for (var i = 0; i < 5; i++) {
  for (var j = 0; j < 5; j++) {
    if (j == 3) break outer;
    print('\$i,\$j');
  }
}
\`\`\``,
          estimatedMinutes: 15,
        },
      ],
    },
    // Module 11: Arrays (Lists)
    {
      title: "Lists in Dart",
      description: "Working with lists",
      lessons: [
        {
          title: "List Basics",
          slug: "dart-lists",
          content: `# Lists

## Creation
\`\`\`dart
var numbers = [1, 2, 3, 4, 5];
var empty = <String>[];
var filled = List.filled(5, 0);
\`\`\`

## Operations
\`\`\`dart
numbers.add(6);
numbers.insert(0, 0);
numbers.remove(3);
numbers.removeAt(0);
numbers.contains(5);  // true
numbers.indexOf(3);    // 2
\`\`\`

## Iterating
\`\`\`dart
for (var num in numbers) {
  print(num);
}

numbers.forEach((num) => print(num));
\`\`\`

## Sorting
\`\`\`dart
var nums = [3, 1, 4, 1, 5, 9];
nums.sort();
print(nums);  // [1, 1, 3, 4, 5, 9]
\`\`\``,
          estimatedMinutes: 25,
        },
      ],
    },
    // Module 12: Advanced Lists
    {
      title: "Advanced List Operations",
      description: "Map, filter, reduce, and spread",
      lessons: [
        {
          title: "Advanced List Operations",
          slug: "dart-advanced-lists",
          content: `# Advanced Operations

## Map
\`\`\`dart
var numbers = [1, 2, 3, 4, 5];
var doubled = numbers.map((n) => n * 2).toList();
// [2, 4, 6, 8, 10]
\`\`\`

## Filter
\`\`\`dart
var evens = numbers.where((n) => n % 2 == 0).toList();
// [2, 4]
\`\`\`

## Reduce
\`\`\`dart
var sum = numbers.reduce((a, b) => a + b);
// 15
\`\`\`

## Spread Operator
\`\`\`dart
var list1 = [1, 2];
var list2 = [3, 4];
var combined = [...list1, ...list2];
// [1, 2, 3, 4]
\`\`\`

## Null-safe Spread
\`\`\`dart
var nullableList = null;
var list = [1, 2, ...?nullableList];
// [1, 2]
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 13: Objects (Classes)
    {
      title: "Classes and Objects",
      description: "Creating classes and objects in Dart",
      lessons: [
        {
          title: "Classes in Dart",
          slug: "dart-classes",
          content: `# Classes

## Basic Class
\`\`\`dart
class Person {
  String name;
  int age;
  
  Person(this.name, this.age);
  
  String greet() => 'Hi, I'm \$name!';
}

var person = Person('Alice', 25);
print(person.greet());
\`\`\`

## Named Constructors
\`\`\`dart
class Person {
  String name;
  int age;
  
  Person(this.name, this.age);
  
  Person.anonymous() : name = 'Anonymous', age = 0;
}
\`\`\`

## Getters and Setters
\`\`\`dart
class Rectangle {
  double _width, _height;
  
  Rectangle(this._width, this._height);
  
  double get area => _width * _height;
  
  set width(double w) {
    if (w > 0) _width = w;
  }
}
\`\`\``,
          estimatedMinutes: 25,
        },
      ],
    },
    // Module 14: Advanced Objects
    {
      title: "Inheritance and Mixins",
      description: "OOP advanced concepts",
      lessons: [
        {
          title: "Inheritance and Mixins",
          slug: "dart-inheritance",
          content: `# Inheritance

\`\`\`dart
class Animal {
  String name;
  Animal(this.name);
  void speak() => print('...');
}

class Dog extends Animal {
  Dog(String name) : super(name);
  @override
  void speak() => print('\$name barks!');
}
\`\`\`

# Mixins

\`\`\`dart
mixin Swimmer {
  void swim() => print('Swimming...');
}

mixin Flyer {
  void fly() => print('Flying...');
}

class Duck extends Animal with Swimmer, Flyer {
  Duck(String name) : super(name);
}
\`\`\`

# Abstract Classes

\`\`\`dart
abstract class Shape {
  double area();
  void describe() => print('Area: \${area()}');
}

class Circle extends Shape {
  double radius;
  Circle(this.radius);
  @override
  double area() => 3.14159 * radius * radius;
}
\`\`\``,
          estimatedMinutes: 25,
        },
      ],
    },
    // Module 15: Functions
    {
      title: "Functions in Dart",
      description: "Defining functions, arrow functions, and callbacks",
      lessons: [
        {
          title: "Functions in Dart",
          slug: "dart-functions",
          content: `# Functions

## Basic Functions
\`\`\`dart
String greet(String name) => 'Hello, \$name!';

int add(int a, int b) => a + b;

// Optional params
void printInfo(String name, [int? age]) {
  print('\$name, age: \$age');
}
\`\`\`

## Named Parameters
\`\`\`dart
void createUser({required String name, int age = 0, String? email}) {
  print('\$name, \$age');
}

createUser(name: 'Alice', age: 25);
\`\`\`

## First-class Functions
\`\`\`dart
var double = (int x) => x * 2;
print(double(5));  // 10

var numbers = [1, 2, 3, 4, 5];
var evens = numbers.where((n) => n % 2 == 0).toList();
\`\`\`

## Async Functions
\`\`\`dart
Future<String> fetchData() async {
  var response = await http.get(Uri.parse('https://api.example.com'));
  return response.body;
}
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 16: Advanced Functions
    {
      title: "Closures and Callbacks",
      description: "Closures, callbacks, and higher-order functions",
      lessons: [
        {
          title: "Closures and Callbacks",
          slug: "dart-closures",
          content: `# Closures

\`\`\`dart
Function makeCounter() {
  var count = 0;
  return () {
    count++;
    return count;
  };
}

var counter = makeCounter();
print(counter());  // 1
print(counter());  // 2
\`\`\`

# Callbacks

\`\`\`dart
void fetchData(Function onComplete) {
  // async work...
  onComplete('Data loaded!');
}

fetchData((data) {
  print(data);
});
\`\`\`

# Higher-Order Functions

\`\`\`dart
List<T> filter<T>(List<T> list, bool Function(T) predicate) {
  var result = <T>[];
  for (var item in list) {
    if (predicate(item)) result.add(item);
  }
  return result;
}

var evens = filter([1, 2, 3, 4, 5], (n) => n % 2 == 0);
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 17: Widgets
    {
      title: "Flutter Widgets",
      description: "Stateless and stateful widgets",
      lessons: [
        {
          title: "Flutter Widgets",
          slug: "flutter-widgets",
          content: `# StatelessWidget

\`\`\`dart
class Greeting extends StatelessWidget {
  final String name;
  const Greeting({super.key, required this.name});
  
  @override
  Widget build(BuildContext context) {
    return Text('Hello, \$name!');
  }
}
\`\`\`

# StatefulWidget

\`\`\`dart
class Counter extends StatefulWidget {
  const Counter({super.key});
  @override
  State<Counter> createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int _count = 0;
  
  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Text('Count: \$_count'),
      ElevatedButton(
        onPressed: () => setState(() => _count++),
        child: const Text('Increment'),
      ),
    ]);
  }
}
\`\`\``,
          estimatedMinutes: 25,
        },
      ],
    },
    // Module 18: Layouts
    {
      title: "Flutter Layouts",
      description: "Row, Column, Stack, and ListView",
      lessons: [
        {
          title: "Layout Widgets",
          slug: "flutter-layouts",
          content: `# Common Layouts

## Row (Horizontal)
\`\`\`dart
Row(children: [Text('A'), Text('B'), Text('C')])
\`\`\`

## Column (Vertical)
\`\`\`dart
Column(children: [Text('A'), Text('B'), Text('C')])
\`\`\`

## Stack (Overlay)
\`\`\`dart
Stack(children: [
  Image.network('url'),
  Positioned(bottom: 0, child: Text('Title'))
])
\`\`\`

## ListView
\`\`\`dart
ListView.builder(
  itemCount: items.length,
  itemBuilder: (ctx, i) => ListTile(
    title: Text(items[i]),
  ),
)
\`\`\`

## Container with Styling
\`\`\`dart
Container(
  padding: EdgeInsets.all(16),
  margin: EdgeInsets.symmetric(horizontal: 20),
  decoration: BoxDecoration(
    color: Colors.white,
    borderRadius: BorderRadius.circular(12),
    boxShadow: [BoxShadow(blurRadius: 10)],
  ),
  child: Text('Styled Container'),
)
\`\`\``,
          estimatedMinutes: 25,
        },
      ],
    },
    // Module 19: Navigation
    {
      title: "Navigation and Routing",
      description: "Moving between screens",
      lessons: [
        {
          title: "Navigation",
          slug: "flutter-navigation",
          content: `# Navigation

## Push/Pop
\`\`\`dart
// Go to new page
Navigator.push(context, MaterialPageRoute(
  builder: (ctx) => const DetailsPage(),
));

// Go back
Navigator.pop(context);

// Pass data
Navigator.push(context, MaterialPageRoute(
  builder: (ctx) => DetailsPage(userId: 42),
));
\`\`\`

## Named Routes
\`\`\`dart
MaterialApp(
  routes: {
    '/': (ctx) => const HomePage(),
    '/login': (ctx) => const LoginPage(),
    '/profile': (ctx) => const ProfilePage(),
  },
)

Navigator.pushNamed(context, '/login');
\`\`\`

## Return Data
\`\`\`dart
final result = await Navigator.push<String>(context, MaterialPageRoute(
  builder: (ctx) => const SearchPage(),
));
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 20: Project Application
    {
      title: "Project — Note Taking App",
      description: "Build a complete note-taking application",
      lessons: [
        {
          title: "Note Taking App",
          slug: "flutter-project-notes",
          content: `# Note Taking App

## Complete App

\`\`\`dart
import 'package:flutter/material.dart';

void main() => runApp(const NotesApp());

class NotesApp extends StatelessWidget {
  const NotesApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Notes',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: const NotesPage(),
    );
  }
}

class NotesPage extends StatefulWidget {
  const NotesPage({super.key});
  @override
  State<NotesPage> createState() => _NotesPageState();
}

class _NotesPageState extends State<NotesPage> {
  final List<Map<String, String>> _notes = [];
  final _titleController = TextEditingController();
  final _contentController = TextEditingController();

  void _addNote() {
    if (_titleController.text.isNotEmpty) {
      setState(() {
        _notes.add({
          'title': _titleController.text,
          'content': _contentController.text,
        });
      });
      _titleController.clear();
      _contentController.clear();
      Navigator.pop(context);
    }
  }

  void _deleteNote(int index) {
    setState(() => _notes.removeAt(index));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('My Notes')),
      body: _notes.isEmpty
          ? const Center(child: Text('No notes yet'))
          : ListView.builder(
              itemCount: _notes.length,
              itemBuilder: (ctx, i) => ListTile(
                title: Text(_notes[i]['title']!),
                subtitle: Text(_notes[i]['content']!),
                trailing: IconButton(
                  icon: const Icon(Icons.delete),
                  onPressed: () => _deleteNote(i),
                ),
              ),
            ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _showAddDialog(context),
        child: const Icon(Icons.add),
      ),
    );
  }

  void _showAddDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Add Note'),
        content: Column(mainAxisSize: MainAxisSize.min, children: [
          TextField(controller: _titleController, decoration: const InputDecoration(labelText: 'Title')),
          TextField(controller: _contentController, decoration: const InputDecoration(labelText: 'Content')),
        ]),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx), child: const Text('Cancel')),
          TextButton(onPressed: _addNote, child: const Text('Add')),
        ],
      ),
    );
  }
}
\`\`\`

## Concepts Used
✅ Variables and Types
✅ Operators
✅ if/else
✅ Lists (dynamic array)
✅ Objects (Classes)
✅ Methods/Functions
✅ StatefulWidget (state)
✅ Layouts (ListView, Column)
✅ Navigation (Dialog)`,
          estimatedMinutes: 40,
          exercises: [
            {
              title: "Extend Notes App",
              description: "Add categories, search, and local storage",
              requirements: ["Add category", "Search functionality", "Save locally", "Edit notes"],
              points: 30,
            },
          ],
        },
      ],
    },
  ],
};
