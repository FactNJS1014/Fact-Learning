import type { CourseContent } from "../seed-content";

export const javaBasic20Modules: CourseContent = {
  slug: "java-basic",
  modules: [
    // Module 1: Introduction
    {
      title: "Introduction to Java",
      description: "What is Java, history, and getting started",
      lessons: [
        {
          title: "What is Java?",
          slug: "java-intro",
          content: `# What is Java?

Java is a class-based, object-oriented programming language developed by Sun Microsystems in 1995.

## Why Learn Java?
- **Platform Independent**: Write once, run anywhere (WORA)
- **Strong OOP**: Everything is an object
- **Huge Ecosystem**: Android, web, enterprise, desktop
- **High Demand**: One of the most in-demand languages

## Your First Program

\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

## Compiling and Running

\`\`\`bash
javac HelloWorld.java    # Compile
java HelloWorld          # Run
\`\`\`

> **Key:** Java programs are organized into classes. The \`main\` method is the entry point.`,
          estimatedMinutes: 15,
          exercises: [
            {
              title: "Hello Java",
              description: "Create a program that prints your name and age",
              requirements: ["Use System.out.println", "Print at least 2 values"],
              points: 10,
            },
          ],
        },
        {
          title: "Java Development Environment",
          slug: "java-setup",
          content: `# Setting Up Java

## Install JDK
Download from oracle.com or use OpenJDK.

## Verify Installation
\`\`\`bash
java -version
javac -version
\`\`\`

## IDEs
- **IntelliJ IDEA** (recommended)
- **Eclipse**
- **VS Code** with Java extensions

## Project Structure
\`\`\`
MyProject/
├── src/
│   └── Main.java
├── bin/
└── build.gradle (or pom.xml)
\`\`\``,
          estimatedMinutes: 10,
        },
      ],
    },
    // Module 2: Variables
    {
      title: "Variables and Data Types",
      description: "Declaring variables, primitive types, and constants",
      lessons: [
        {
          title: "Variables in Java",
          slug: "java-variables",
          content: `# Variables

## Declaration and Initialization
\`\`\`java
String name = "Alice";      // String
int age = 25;                // int
double height = 5.8;         // double
boolean isStudent = true;    // boolean
char grade = 'A';            // char
long population = 7_900_000_000L;
float pi = 3.14f;
\`\`\`

## Naming Rules
- Must start with letter, _ or $
- Case-sensitive
- No reserved keywords
- Use camelCase for variables

## Final (Constants)
\`\`\`java
final double PI = 3.14159;
final String APP_NAME = "MyApp";
// PI = 3.0;  // ERROR: cannot reassign
\`\`\`

## Type Casting
\`\`\`java
// Widening (implicit)
int x = 10;
double y = x;  // int -> double

// Narrowing (explicit)
double d = 9.78;
int i = (int) d;  // 9
\`\`\``,
          estimatedMinutes: 20,
          exercises: [
            {
              title: "Variable Practice",
              description: "Declare variables for different data types and print them",
              requirements: ["Use all primitive types", "Use final for constants", "Print each variable"],
              points: 15,
            },
          ],
        },
      ],
    },
    // Module 3: Data Types
    {
      title: "Data Types Deep Dive",
      description: "Primitive types, String, and type conversion",
      lessons: [
        {
          title: "Primitive Data Types",
          slug: "java-primitives",
          content: `# Primitive Data Types

| Type | Size | Range | Default |
|------|------|-------|---------|
| byte | 1 byte | -128 to 127 | 0 |
| short | 2 bytes | -32768 to 32767 | 0 |
| int | 4 bytes | -2^31 to 2^31-1 | 0 |
| long | 8 bytes | -2^63 to 2^63-1 | 0L |
| float | 4 bytes | ±3.4e38 | 0.0f |
| double | 8 bytes | ±1.7e308 | 0.0 |
| char | 2 bytes | 0 to 65535 | '\\u0000' |
| boolean | 1 bit | true/false | false |

\`\`\`java
byte small = 127;
int number = 100000;
long big = 9999999999L;
float decimal = 3.14f;
double precise = 3.141592653589793;
\`\`\`

## String (Not a primitive, but special)
\`\`\`java
String name = "Alice";
String greeting = "Hello, " + name + "!";
int len = name.length();  // 5
char first = name.charAt(0);  // 'A'
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 4: Operators
    {
      title: "Operators",
      description: "Arithmetic, comparison, logical, and assignment operators",
      lessons: [
        {
          title: "Arithmetic Operators",
          slug: "java-arithmetic",
          content: `# Arithmetic Operators

\`\`\`java
int a = 10, b = 3;

System.out.println(a + b);   // 13 (addition)
System.out.println(a - b);   // 7  (subtraction)
System.out.println(a * b);   // 30 (multiplication)
System.out.println(a / b);   // 3  (integer division)
System.out.println(a % b);   // 1  (modulus/remainder)
System.out.println(a++);     // 10 (post-increment)
System.out.println(++a);     // 12 (pre-increment)
\`\`\`

## Compound Assignment
\`\`\`java
int x = 10;
x += 5;   // x = x + 5 = 15
x -= 3;   // x = x - 3 = 12
x *= 2;   // x = x * 2 = 24
x /= 4;   // x = x / 4 = 6
x %= 4;   // x = x % 4 = 2
\`\`\`

> **Note:** Integer division truncates decimal. Use double for decimal results.`,
          estimatedMinutes: 15,
        },
        {
          title: "Comparison and Logical Operators",
          slug: "java-comparison-logical",
          content: `# Comparison & Logical Operators

## Comparison Operators
\`\`\`java
int a = 10, b = 20;

System.out.println(a == b);  // false (equal)
System.out.println(a != b);  // true  (not equal)
System.out.println(a > b);   // false (greater than)
System.out.println(a < b);   // true  (less than)
System.out.println(a >= 10); // true  (greater or equal)
System.out.println(a <= 5);  // false (less or equal)
\`\`\`

## Logical Operators
\`\`\`java
boolean x = true, y = false;

System.out.println(x && y);  // false (AND)
System.out.println(x || y);  // true  (OR)
System.out.println(!x);      // false (NOT)
\`\`\`

## Ternary Operator
\`\`\`java
int age = 20;
String status = (age >= 18) ? "Adult" : "Minor";
\`\`\``,
          estimatedMinutes: 15,
          exercises: [
            {
              title: "Age Classifier",
              description: "Classify age into categories using operators",
              requirements: ["Use comparison operators", "Use logical operators", "Handle edge cases"],
              points: 15,
            },
          ],
        },
      ],
    },
    // Module 5: if Statement
    {
      title: "If Statement",
      description: "Single if condition",
      lessons: [
        {
          title: "If Statement Basics",
          slug: "java-if",
          content: `# If Statement

\`\`\`java
int age = 20;

if (age >= 18) {
    System.out.println("You can vote!");
}
\`\`\`

## Multiple Conditions
\`\`\`java
int score = 85;

if (score >= 90) {
    System.out.println("Grade: A");
}

if (score >= 80) {
    System.out.println("Grade: B");
}
\`\`\`

## Nested If
\`\`\`java
boolean isMember = true;
int age = 25;

if (isMember) {
    if (age >= 18) {
        System.out.println("Welcome to the club!");
    }
}
\`\`\`

> **Best Practice:** Avoid deeply nested ifs. Use guard clauses instead.`,
          estimatedMinutes: 15,
        },
      ],
    },
    // Module 6: if-else and if-else-if
    {
      title: "If-Else and If-Else-If",
      description: "Conditional branching with else and else-if",
      lessons: [
        {
          title: "If-Else Statement",
          slug: "java-if-else",
          content: `# If-Else Statement

\`\`\`java
int temperature = 25;

if (temperature > 30) {
    System.out.println("It's hot outside!");
} else {
    System.out.println("It's nice outside.");
}
\`\`\`

## Guard Clause Pattern
\`\`\`java
public void processOrder(int quantity) {
    if (quantity <= 0) {
        System.out.println("Invalid quantity");
        return;  // Guard clause
    }
    
    // Process valid order
    System.out.println("Processing order of " + quantity);
}
\`\`\``,
          estimatedMinutes: 15,
        },
        {
          title: "If-Else-If Chain",
          slug: "java-if-else-if",
          content: `# If-Else-If Chain

\`\`\`java
int score = 75;
String grade;

if (score >= 90) {
    grade = "A";
} else if (score >= 80) {
    grade = "B";
} else if (score >= 70) {
    grade = "C";
} else if (score >= 60) {
    grade = "D";
} else {
    grade = "F";
}

System.out.println("Grade: " + grade);  // C
\`\`\`

## Real-World Example: BMI Calculator
\`\`\`java
double bmi = 22.5;

if (bmi < 18.5) {
    System.out.println("Underweight");
} else if (bmi < 25) {
    System.out.println("Normal weight");
} else if (bmi < 30) {
    System.out.println("Overweight");
} else {
    System.out.println("Obese");
}
\`\`\``,
          estimatedMinutes: 20,
          exercises: [
            {
              title: "Grade Calculator",
              description: "Calculate letter grade from numeric score",
              requirements: ["Use if-else-if", "Handle all ranges", "Include F grade"],
              points: 20,
            },
          ],
        },
      ],
    },
    // Module 7: Switch Case
    {
      title: "Switch Statement",
      description: "Switch-case for multiple conditions",
      lessons: [
        {
          title: "Switch Statement",
          slug: "java-switch",
          content: `# Switch Statement

\`\`\`java
String day = "Monday";
String dayType;

switch (day) {
    case "Monday":
    case "Tuesday":
    case "Wednesday":
    case "Thursday":
    case "Friday":
        dayType = "Weekday";
        break;
    case "Saturday":
    case "Sunday":
        dayType = "Weekend";
        break;
    default:
        dayType = "Unknown";
}

System.out.println(dayType);  // Weekday
\`\`\`

## Switch with Expressions (Java 14+)
\`\`\`java
String dayType = switch (day) {
    case "Monday", "Tuesday", "Wednesday", "Thursday", "Friday" -> "Weekday";
    case "Saturday", "Sunday" -> "Weekend";
    default -> "Unknown";
};
\`\`\`

> **Important:** Always use \`break\` to prevent fall-through!`,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 8: For Loop
    {
      title: "For Loop",
      description: "Traditional and enhanced for loops",
      lessons: [
        {
          title: "For Loop",
          slug: "java-for",
          content: `# For Loop

## Basic For Loop
\`\`\`java
for (int i = 0; i < 5; i++) {
    System.out.println(i);  // 0, 1, 2, 3, 4
}
\`\`\`

## Enhanced For Loop (for-each)
\`\`\`java
int[] numbers = {1, 2, 3, 4, 5};

for (int num : numbers) {
    System.out.println(num);
}
\`\`\`

## Nested Loops
\`\`\`java
// Multiplication table
for (int i = 1; i <= 5; i++) {
    for (int j = 1; j <= 5; j++) {
        System.out.printf("%4d", i * j);
    }
    System.out.println();
}
\`\`\`

## Loop with Strings
\`\`\`java
String word = "Hello";
for (int i = 0; i < word.length(); i++) {
    System.out.println(word.charAt(i));
}
\`\`\``,
          estimatedMinutes: 20,
          exercises: [
            {
              title: "FizzBuzz",
              description: "Print 1-100: multiples of 3=Fizz, 5=Buzz, both=FizzBuzz",
              requirements: ["Use for loop", "Use modulo operator", "Handle all cases"],
              points: 15,
            },
          ],
        },
      ],
    },
    // Module 9: While and Do-While Loop
    {
      title: "While and Do-While Loop",
      description: "Looping with while and do-while",
      lessons: [
        {
          title: "While Loop",
          slug: "java-while",
          content: `# While Loop

\`\`\`java
int count = 0;
while (count < 5) {
    System.out.println(count);
    count++;
}
\`\`\`

## Do-While Loop
\`\`\`java
int num = 1;
do {
    System.out.println(num);
    num *= 2;
} while (num <= 16);
// Output: 1, 2, 4, 8, 16
\`\`\`

## Key Difference
- **while**: Checks condition before execution
- **do-while**: Executes at least once, then checks condition

## Infinite Loop
\`\`\`java
// Intentional infinite loop (with break)
while (true) {
    String input = scanner.nextLine();
    if (input.equals("quit")) break;
}
\`\`\``,
          estimatedMinutes: 15,
        },
      ],
    },
    // Module 10: Loop Control
    {
      title: "Loop Control (break & continue)",
      description: "Breaking and continuing loops",
      lessons: [
        {
          title: "Break and Continue",
          slug: "java-loop-control",
          content: `# Break and Continue

## Break
\`\`\`java
for (int i = 0; i < 100; i++) {
    if (i == 5) break;
    System.out.println(i);  // 0, 1, 2, 3, 4
}
\`\`\`

## Continue
\`\`\`java
for (int i = 0; i < 10; i++) {
    if (i % 2 == 0) continue;  // Skip even numbers
    System.out.println(i);  // 1, 3, 5, 7, 9
}
\`\`\`

## Labeled Break (Nested Loops)
\`\`\`java
outer:
for (int i = 0; i < 5; i++) {
    for (int j = 0; j < 5; j++) {
        if (j == 3) break outer;
        System.out.println(i + "," + j);
    }
}
\`\`\``,
          estimatedMinutes: 15,
        },
      ],
    },
    // Module 11: Arrays
    {
      title: "Arrays",
      description: "Creating and working with arrays",
      lessons: [
        {
          title: "Array Basics",
          slug: "java-arrays",
          content: `# Arrays

## Declaration and Initialization
\`\`\`java
// Method 1
int[] numbers = new int[5];  // [0, 0, 0, 0, 0]

// Method 2
int[] nums = {10, 20, 30, 40, 50};

// Method 3
String[] names = new String[]{"Alice", "Bob", "Charlie"};
\`\`\`

## Accessing Elements
\`\`\`java
int[] scores = {90, 85, 95, 80, 88};

System.out.println(scores[0]);   // 90
System.out.println(scores.length); // 5
\`\`\`

## Modifying Elements
\`\`\`java
scores[2] = 100;  // Change third element
\`\`\`

## Looping Through Arrays
\`\`\`java
// For loop
for (int i = 0; i < scores.length; i++) {
    System.out.println(scores[i]);
}

// Enhanced for
for (int score : scores) {
    System.out.println(score);
}
\`\`\``,
          estimatedMinutes: 20,
          exercises: [
            {
              title: "Array Statistics",
              description: "Find min, max, and average of an array",
              requirements: ["Create array", "Find min", "Find max", "Calculate average"],
              points: 20,
            },
          ],
        },
        {
          title: "Array Methods",
          slug: "java-array-methods",
          content: `# Array Methods

## Java Arrays Class
\`\`\`java
import java.util.Arrays;

int[] arr = {3, 1, 4, 1, 5, 9, 2, 6};

// Sort
Arrays.sort(arr);

// Search (requires sorted array)
int index = Arrays.binarySearch(arr, 5);

// Fill
int[] filled = new int[5];
Arrays.fill(filled, 10);

// Copy
int[] copy = Arrays.copyOf(arr, arr.length);

// toString
System.out.println(Arrays.toString(arr));
\`\`\`

## Multi-Dimensional Arrays
\`\`\`java
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

// Access
System.out.println(matrix[1][2]);  // 6

// Loop
for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[i].length; j++) {
        System.out.print(matrix[i][j] + " ");
    }
    System.out.println();
}
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 12: Advanced Arrays
    {
      title: "Advanced Arrays",
      description: "Searching, sorting, and 2D arrays",
      lessons: [
        {
          title: "Array Algorithms",
          slug: "java-array-algorithms",
          content: `# Array Algorithms

## Linear Search
\`\`\`java
public static int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}
\`\`\`

## Binary Search
\`\`\`java
public static int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left <= right) {
        int mid = (left + right) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
\`\`\`

## Bubble Sort
\`\`\`java
public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}
\`\`\``,
          estimatedMinutes: 25,
        },
      ],
    },
    // Module 13: Objects
    {
      title: "Objects and Classes",
      description: "Creating objects and using classes",
      lessons: [
        {
          title: "Classes and Objects",
          slug: "java-classes-objects",
          content: `# Classes and Objects

## Defining a Class
\`\`\`java
public class Person {
    // Fields
    private String name;
    private int age;
    
    // Constructor
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    // Methods
    public String greet() {
        return "Hi, I'm " + name + "!";
    }
    
    // Getters and Setters
    public String getName() { return name; }
    public int getAge() { return age; }
}
\`\`\`

## Creating Objects
\`\`\`java
Person alice = new Person("Alice", 25);
System.out.println(alice.greet());  // Hi, I'm Alice!
\`\`\`

## toString Method
\`\`\`java
@Override
public String toString() {
    return "Person{name='" + name + "', age=" + age + "}";
}
\`\`\``,
          estimatedMinutes: 25,
          exercises: [
            {
              title: "Bank Account Class",
              description: "Create a BankAccount class with deposit and withdraw",
              requirements: ["Private balance", "Constructor", "Deposit method", "Withdraw with validation"],
              points: 25,
            },
          ],
        },
      ],
    },
    // Module 14: Advanced Objects
    {
      title: "Advanced Objects",
      description: "Inheritance, polymorphism, and encapsulation",
      lessons: [
        {
          title: "Inheritance and Polymorphism",
          slug: "java-inheritance",
          content: `# Inheritance and Polymorphism

## Inheritance
\`\`\`java
public class Animal {
    protected String name;
    
    public Animal(String name) { this.name = name; }
    
    public void speak() {
        System.out.println(name + " makes a sound");
    }
}

public class Dog extends Animal {
    public Dog(String name) { super(name); }
    
    @Override
    public void speak() {
        System.out.println(name + " barks!");
    }
}
\`\`\`

## Polymorphism
\`\`\`java
Animal myAnimal = new Dog("Rex");
myAnimal.speak();  // Rex barks! (runtime polymorphism)
\`\`\`

## Abstract Classes
\`\`\`java
abstract class Shape {
    abstract double area();
    
    void describe() {
        System.out.println("Area: " + area());
    }
}

class Circle extends Shape {
    double radius;
    Circle(double r) { this.radius = r; }
    double area() { return Math.PI * radius * radius; }
}
\`\`\`

## Interfaces
\`\`\`java
interface Drawable {
    void draw();
}

class Rectangle implements Drawable {
    public void draw() {
        System.out.println("Drawing rectangle");
    }
}
\`\`\``,
          estimatedMinutes: 25,
        },
      ],
    },
    // Module 15: Objects - Properties
    {
      title: "Object Properties",
      description: "Getters, setters, and static members",
      lessons: [
        {
          title: "Encapsulation and Static Members",
          slug: "java-encapsulation",
          content: `# Encapsulation and Static

## Getters and Setters
\`\`\`java
public class Student {
    private String name;
    private double gpa;
    
    // Getter
    public String getName() { return name; }
    
    // Setter with validation
    public void setGpa(double gpa) {
        if (gpa >= 0 && gpa <= 4.0) {
            this.gpa = gpa;
        } else {
            throw new IllegalArgumentException("GPA must be 0-4.0");
        }
    }
}
\`\`\`

## Static Members
\`\`\`java
public class Counter {
    private static int count = 0;
    
    public Counter() {
        count++;  // Shared across all instances
    }
    
    public static int getCount() {
        return count;
    }
}

Counter c1 = new Counter();
Counter c2 = new Counter();
System.out.println(Counter.getCount());  // 2
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 16: Functions (Methods)
    {
      title: "Functions (Methods)",
      description: "Defining and using methods",
      lessons: [
        {
          title: "Methods in Java",
          slug: "java-methods",
          content: `# Methods

## Method Syntax
\`\`\`java
public class Calculator {
    // Method with return value
    public static int add(int a, int b) {
        return a + b;
    }
    
    // Method without return value
    public static void greet(String name) {
        System.out.println("Hello, " + name);
    }
    
    // Method with default behavior
    public static double power(double base, int exp) {
        double result = 1;
        for (int i = 0; i < exp; i++) {
            result *= base;
        }
        return result;
    }
}
\`\`\`

## Method Overloading
\`\`\`java
public static int add(int a, int b) { return a + b; }
public static double add(double a, double b) { return a + b; }
public static String add(String a, String b) { return a + b; }
\`\`\`

## Varargs
\`\`\`java
public static int sum(int... numbers) {
    int total = 0;
    for (int n : numbers) total += n;
    return total;
}

sum(1, 2, 3);      // 6
sum(1, 2, 3, 4);   // 10
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 17: Advanced Functions
    {
      title: "Advanced Functions",
      description: "Recursion, lambda, and functional interfaces",
      lessons: [
        {
          title: "Recursion and Lambda",
          slug: "java-recursion-lambda",
          content: `# Recursion

## Recursive Factorial
\`\`\`java
public static long factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
\`\`\`

# Lambda Expressions

## Basic Lambda
\`\`\`java
// Functional interface
@FunctionalInterface
interface MathOperation {
    int operate(int a, int b);
}

MathOperation add = (a, b) -> a + b;
MathOperation multiply = (a, b) -> a * b;

System.out.println(add.operate(3, 4));      // 7
System.out.println(multiply.operate(3, 4)); // 12
\`\`\`

## Lambda with Collections
\`\`\`java
List<String> names = List.of("Alice", "Bob", "Charlie");

// Sort by length
names.sort((a, b) -> a.length() - b.length());

// Filter
List<String> longNames = names.stream()
    .filter(name -> name.length() > 3)
    .toList();

// Map
List<String> upper = names.stream()
    .map(String::toUpperCase)
    .toList();
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 18: Exception Handling
    {
      title: "Exception Handling",
      description: "Try-catch-finally and custom exceptions",
      lessons: [
        {
          title: "Exception Handling",
          slug: "java-exceptions",
          content: `# Exception Handling

## Try-Catch-Finally
\`\`\`java
try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Error: " + e.getMessage());
} finally {
    System.out.println("Always executes");
}
\`\`\`

## Multiple Catch Blocks
\`\`\`java
try {
    String text = null;
    System.out.println(text.length());
} catch (NullPointerException e) {
    System.out.println("Null pointer!");
} catch (Exception e) {
    System.out.println("Other error");
}
\`\`\`

## Custom Exceptions
\`\`\`java
public class InsufficientFundsException extends Exception {
    private double amount;
    
    public InsufficientFundsException(double amount) {
        super("Insufficient funds: needed " + amount);
        this.amount = amount;
    }
}

// Using
public void withdraw(double amount) throws InsufficientFundsException {
    if (amount > balance) {
        throw new InsufficientFundsException(amount);
    }
    balance -= amount;
}
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 19: Collections
    {
      title: "Collections Framework",
      description: "ArrayList, HashMap, and Iterator",
      lessons: [
        {
          title: "ArrayList and HashMap",
          slug: "java-collections",
          content: `# Collections

## ArrayList
\`\`\`java
import java.util.ArrayList;

ArrayList<String> names = new ArrayList<>();
names.add("Alice");
names.add("Bob");
names.get(0);      // "Alice"
names.remove("Bob");
names.size();      // 1
names.contains("Alice");  // true

for (String name : names) {
    System.out.println(name);
}
\`\`\`

## HashMap
\`\`\`java
import java.util.HashMap;

HashMap<String, Integer> scores = new HashMap<>();
scores.put("Alice", 95);
scores.put("Bob", 87);

scores.get("Alice");       // 95
scores.containsKey("Bob"); // true
scores.remove("Bob");

for (String key : scores.keySet()) {
    System.out.println(key + ": " + scores.get(key));
}
\`\`\``,
          estimatedMinutes: 20,
        },
      ],
    },
    // Module 20: Project Application
    {
      title: "Project — Student Management System",
      description: "Build a complete application using all concepts",
      lessons: [
        {
          title: "Student Management System",
          slug: "java-project-student",
          content: `# Student Management System

## Complete Application

\`\`\`java
import java.util.ArrayList;
import java.util.Scanner;

class Student {
    private int id;
    private String name;
    private double gpa;
    
    public Student(int id, String name, double gpa) {
        this.id = id;
        this.name = name;
        this.gpa = gpa;
    }
    
    // Getters
    public int getId() { return id; }
    public String getName() { return name; }
    public double getGpa() { return gpa; }
    
    public String toString() {
        return id + " | " + name + " | GPA: " + gpa;
    }
}

public class StudentManager {
    private static ArrayList<Student> students = new ArrayList<>();
    private static Scanner scanner = new Scanner(System.in);
    private static int nextId = 1;
    
    public static void main(String[] args) {
        while (true) {
            System.out.println("\\n1. Add Student");
            System.out.println("2. View All");
            System.out.println("3. Search by Name");
            System.out.println("4. Statistics");
            System.out.println("5. Exit");
            System.out.print("Choice: ");
            
            int choice = scanner.nextInt();
            
            switch (choice) {
                case 1 -> addStudent();
                case 2 -> viewAll();
                case 3 -> searchByName();
                case 4 -> showStats();
                case 5 -> { System.out.println("Goodbye!"); return; }
                default -> System.out.println("Invalid choice");
            }
        }
    }
    
    static void addStudent() {
        System.out.print("Name: ");
        String name = scanner.next();
        System.out.print("GPA: ");
        double gpa = scanner.nextDouble();
        
        students.add(new Student(nextId++, name, gpa));
        System.out.println("Student added!");
    }
    
    static void viewAll() {
        if (students.isEmpty()) {
            System.out.println("No students yet.");
            return;
        }
        students.forEach(System.out::println);
    }
    
    static void searchByName() {
        System.out.print("Search: ");
        String query = scanner.next().toLowerCase();
        students.stream()
            .filter(s -> s.getName().toLowerCase().contains(query))
            .forEach(System.out::println);
    }
    
    static void showStats() {
        if (students.isEmpty()) {
            System.out.println("No data.");
            return;
        }
        double avgGpa = students.stream()
            .mapToDouble(Student::getGpa)
            .average()
            .orElse(0);
        System.out.println("Total: " + students.size());
        System.out.printf("Average GPA: %.2f%n", avgGpa);
    }
}
\`\`\`

## Concepts Used
✅ Variables and Data Types
✅ Operators
✅ if/else-if/switch
✅ for, while loops
✅ Arrays (ArrayList)
✅ Objects and Classes
✅ Methods/Functions
✅ Exception Handling
✅ Collections`,
          estimatedMinutes: 40,
          exercises: [
            {
              title: "Extend the System",
              description: "Add delete, update, and sort functionality",
              requirements: ["Add delete by ID", "Add update GPA", "Add sort by GPA", "Handle invalid input"],
              points: 30,
            },
          ],
        },
      ],
    },
  ],
};
