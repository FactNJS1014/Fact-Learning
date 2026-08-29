import type { CourseContent } from "../seed-content";

// Python Basic: 7 → needs 13 more lessons
export const pythonBasicExtra: CourseContent = {
  slug: "python-basic",
  modules: [
    {
      title: "Lists and Dictionaries",
      description: "Working with collections",
      lessons: [
        { title: "Lists", slug: "py-lists", content: "# Lists\n\n```python\nfruits = [\"apple\", \"banana\", \"cherry\"]\nfruits.append(\"date\")  # Add\nfruits.remove(\"banana\")  # Remove\nprint(fruits[0])  # First item\nprint(len(fruits))  # Length\n\n# Slicing\nfirst_two = fruits[:2]\nreversed_list = fruits[::-1]\n\n# List comprehension\nsquares = [x**2 for x in range(10)]\nevens = [x for x in range(20) if x % 2 == 0]\n```\n\n## List Methods\n\n```python\nnums = [3, 1, 4, 1, 5, 9]\nnums.sort()        # Sort in place\nnums.reverse()     # Reverse in place\nnums.count(1)      # Count occurrences\nnums.index(4)      # Find index\n```\n\n> **Tip:** Lists are mutable — use tuples for immutable sequences.", estimatedMinutes: 20 },
        { title: "Dictionaries", slug: "py-dictionaries", content: "# Dictionaries\n\n```python\nperson = {\n    \"name\": \"Alice\",\n    \"age\": 25,\n    \"email\": \"alice@example.com\"\n}\n\nprint(person[\"name\"])           # Access\nperson[\"phone\"] = \"123-456\"    # Add/update\ndel person[\"email\"]             # Delete\n\n# Safe access\nphone = person.get(\"phone\", \"N/A\")\n\n# Check key\nif \"name\" in person:\n    print(\"Found!\")\n```\n\n## Iterating\n\n```python\nfor key, value in person.items():\n    print(f\"{key}: {value}\")\n\nfor key in person.keys():\n    print(key)\n\nfor value in person.values():\n    print(value)\n```\n\n## Dict Comprehension\n\n```python\nsquares = {x: x**2 for x in range(5)}\n# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}\n```", estimatedMinutes: 20, exercises: [{ title: "Word Counter", description: "Count the frequency of each word in a sentence", requirements: ["Use a dictionary", "Handle punctuation", "Return top 3 words"], points: 20 }] },
        { title: "Tuples and Sets", slug: "py-tuples-sets", content: "# Tuples and Sets\n\n## Tuples (Immutable)\n\n```python\npoint = (3, 4)\nx, y = point  # Unpacking\nprint(x, y)   # 3 4\n\n# Tuples as dict keys\nlocations = {(0, 0): \"origin\", (1, 2): \"point A\"}\n```\n\n## Sets (Unique Values)\n\n```python\na = {1, 2, 3, 4}\nb = {3, 4, 5, 6}\n\nprint(a | b)  # Union: {1, 2, 3, 4, 5, 6}\nprint(a & b)  # Intersection: {3, 4}\nprint(a - b)  # Difference: {1, 2}\nprint(a ^ b)  # Symmetric diff: {1, 2, 5, 6}\n\n# Remove duplicates\nnums = [1, 1, 2, 3, 3, 4]\nunique = list(set(nums))  # [1, 2, 3, 4]\n```", estimatedMinutes: 15 },
      ],
    },
    {
      title: "Error Handling and Modules",
      description: "Handling errors and using modules",
      lessons: [
        { title: "Error Handling", slug: "py-error-handling", content: "# Error Handling\n\n```python\ntry:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print(\"Cannot divide by zero!\")\nexcept Exception as e:\n    print(f\"Error: {e}\")\nelse:\n    print(\"No error occurred\")\nfinally:\n    print(\"Always runs\")\n```\n\n## Raising Exceptions\n\n```python\ndef set_age(age):\n    if age < 0:\n        raise ValueError(\"Age cannot be negative\")\n    return age\n```\n\n## Custom Exceptions\n\n```python\nclass InsufficientFundsError(Exception):\n    def __init__(self, balance, amount):\n        super().__init__(f\"Cannot withdraw {amount}. Balance: {balance}\")\n        self.balance = balance\n        self.amount = amount\n```", estimatedMinutes: 20 },
        { title: "String Methods", slug: "py-string-methods", content: "# String Methods\n\n```python\ns = \"  Hello, World!  \"\n\ns.strip()          # Remove whitespace\ns.lower()          # \"hello, world!\"\ns.upper()          # \"HELLO, WORLD!\"\ns.title()          # \"  Hello, World!  \"\ns.replace(\"World\", \"Python\")  # Replace\ns.split(\",\")       # [\"  Hello\", \" World!  \"]\n\"|\".join([\"a\",\"b\"])  # \"a|b\"\ns.startswith(\"  H\")  # True\ns.endswith(\"!\")      # True\n\n# f-strings\nname = \"Alice\"\nage = 25\nprint(f\"{name} is {age} years old\")\nprint(f\"{age:>5}\")  # Right-aligned\nprint(f\"{3.14159:.2f}\")  # 3.14\n```", estimatedMinutes: 15 },
        { title: "Working with Modules", slug: "py-modules", content: "# Working with Modules\n\n```python\nimport math\nprint(math.sqrt(16))  # 4.0\n\nfrom datetime import datetime\nnow = datetime.now()\nprint(now.strftime(\"%Y-%m-%d\"))\n\nimport os\nfiles = os.listdir(\".\")\n\nimport json\ndata = json.loads('{\"name\": \"Alice\"}')\nprint(data[\"name\"])\n```\n\n## Installing Packages\n\n```bash\npip install requests\npip install -r requirements.txt\n```\n\n## Virtual Environment\n\n```bash\npython -m venv venv\nsource venv/bin/activate    # Mac/Linux\nvenv\\Scripts\\activate       # Windows\npip install requests\npip freeze > requirements.txt\n```", estimatedMinutes: 20 },
      ],
    },
    {
      title: "Working with APIs and Data",
      description: "HTTP requests and data processing",
      lessons: [
        { title: "HTTP Requests with requests", slug: "py-requests", content: "# HTTP Requests\n\n```python\nimport requests\n\n# GET\nresponse = requests.get(\"https://api.example.com/users\")\nusers = response.json()\nprint(response.status_code)\n\n# POST\nresponse = requests.post(\n    \"https://api.example.com/users\",\n    json={\"name\": \"Alice\", \"email\": \"a@b.com\"}\n)\n\n# With headers\nheaders = {\"Authorization\": \"Bearer abc123\"}\nresponse = requests.get(\"https://api.example.com/profile\", headers=headers)\n\n# Error handling\ntry:\n    response = requests.get(url, timeout=5)\n    response.raise_for_status()\nexcept requests.exceptions.RequestException as e:\n    print(f\"Request failed: {e}\")\n```", estimatedMinutes: 25, exercises: [{ title: "API Client", description: "Create a script that fetches and displays user data from a public API", requirements: ["Use requests", "Handle errors", "Display formatted data"], points: 20 }] },
        { title: "File Handling", slug: "py-file-handling", content: "# File Handling\n\n```python\n# Read\nwith open(\"data.txt\", \"r\") as f:\n    content = f.read()\n    lines = f.readlines()\n\n# Write\nwith open(\"output.txt\", \"w\") as f:\n    f.write(\"Hello World\\n\")\n\n# Append\nwith open(\"log.txt\", \"a\") as f:\n    f.write(\"New entry\\n\")\n\n# JSON files\nimport json\nwith open(\"data.json\", \"w\") as f:\n    json.dump({\"name\": \"Alice\"}, f, indent=2)\n\nwith open(\"data.json\") as f:\n    data = json.load(f)\n\n# CSV files\nimport csv\nwith open(\"data.csv\", \"r\") as f:\n    reader = csv.DictReader(f)\n    for row in reader:\n        print(row[\"name\"])\n```", estimatedMinutes: 20 },
      ],
    },
    {
      title: "Object-Oriented Programming Basics",
      description: "Classes and objects introduction",
      lessons: [
        { title: "Classes and Objects", slug: "py-oop-intro", content: "# Classes and Objects\n\n```python\nclass Dog:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\n    def bark(self):\n        return f\"{self.name} says Woof!\"\n\n    def get_info(self):\n        return f\"{self.name}, {self.age} years old\"\n\nmy_dog = Dog(\"Buddy\", 3)\nprint(my_dog.bark())    # Buddy says Woof!\nprint(my_dog.get_info())\n```\n\n## Class Variables\n\n```python\nclass Car:\n    wheels = 4  # Class variable (shared)\n\n    def __init__(self, make):\n        self.make = make  # Instance variable\n```\n\n> **Key Concepts:**\n> - `__init__` is the constructor\n> - `self` refers to the current instance\n> - Methods are functions inside a class", estimatedMinutes: 25, exercises: [{ title: "Bank Account Class", description: "Create a BankAccount class with deposit, withdraw, and balance", requirements: ["__init__ with balance", "deposit method", "withdraw method", "balance property"], points: 25 }] },
        { title: "Inheritance Basics", slug: "py-inheritance-intro", content: "# Inheritance Basics\n\n```python\nclass Animal:\n    def __init__(self, name):\n        self.name = name\n\n    def speak(self):\n        raise NotImplementedError\n\n    def __str__(self):\n        return f\"{self.__class__.__name__}: {self.name}\"\n\nclass Dog(Animal):\n    def speak(self):\n        return f\"{self.name} says Woof!\"\n\nclass Cat(Animal):\n    def speak(self):\n        return f\"{self.name} says Meow!\"\n\n# Usage\nanimals = [Dog(\"Buddy\"), Cat(\"Whiskers\")]\nfor animal in animals:\n    print(animal.speak())\n```\n\n## super()\n\n```python\nclass Person:\n    def __init__(self, name):\n        self.name = name\n\nclass Student(Person):\n    def __init__(self, name, school):\n        super().__init__(name)\n        self.school = school\n```", estimatedMinutes: 20 },
      ],
    },
  ],
};

// Python Advanced: 0 → needs 20 lessons
export const pythonAdvanced: CourseContent = {
  slug: "python-advanced",
  modules: [
    {
      title: "Advanced OOP",
      description: "Metaclasses, descriptors, and design patterns",
      lessons: [
        { title: "Metaclasses", slug: "py-metaclasses", content: "# Metaclasses\n\nA metaclass is the class of a class.\n\n```python\nclass Singleton(type):\n    _instances = {}\n    def __call__(cls, *args, **kwargs):\n        if cls not in cls._instances:\n            cls._instances[cls] = super().__call__(*args, **kwargs)\n        return cls._instances[cls]\n\nclass Database(metaclass=Singleton):\n    def __init__(self):\n        print(\"Connected to database\")\n\ndb1 = Database()  # Connected to database\ndb2 = Database()  # (nothing printed)\nprint(db1 is db2)  # True\n```", estimatedMinutes: 25 },
        { title: "Descriptors", slug: "py-descriptors", content: "# Descriptors\n\n```python\nclass Validated:\n    def __init__(self, min_value=None, max_value=None):\n        self.min_value = min_value\n        self.max_value = max_value\n\n    def __set_name__(self, owner, name):\n        self.name = name\n\n    def __get__(self, obj, objtype=None):\n        if obj is None:\n            return self\n        return obj.__dict__.get(self.name)\n\n    def __set__(self, obj, value):\n        if self.min_value is not None and value < self.min_value:\n            raise ValueError(f\"{self.name} must be >= {self.min_value}\")\n        if self.max_value is not None and value > self.max_value:\n            raise ValueError(f\"{self.name} must be <= {self.max_value}\")\n        obj.__dict__[self.name] = value\n\nclass Student:\n    grade = Validated(min_value=0, max_value=100)\n    age = Validated(min_value=0, max_value=150)\n\ns = Student()\ns.grade = 85  # OK\ns.grade = 150  # ValueError!\n```", estimatedMinutes: 25 },
        { title: "Design Patterns", slug: "py-design-patterns", content: "# Design Patterns\n\n## Factory Pattern\n\n```python\nclass Dog:\n    def speak(self): return \"Woof\"\n\nclass Cat:\n    def speak(self): return \"Meow\"\n\ndef animal_factory(animal_type):\n    animals = {\"dog\": Dog, \"cat\": Cat}\n    return animals[animal_type]()\n\nanimal = animal_factory(\"dog\")\nprint(animal.speak())  # Woof\n```\n\n## Observer Pattern\n\n```python\nclass EventManager:\n    def __init__(self):\n        self.listeners = {}\n\n    def subscribe(self, event, callback):\n        self.listeners.setdefault(event, []).append(callback)\n\n    def publish(self, event, data):\n        for callback in self.listeners.get(event, []):\n            callback(data)\n\nmanager = EventManager()\nmanager.subscribe(\"user_created\", lambda u: print(f\"Welcome {u}\"))\nmanager.publish(\"user_created\", \"Alice\")\n```\n\n## Strategy Pattern\n\n```python\ndef strategy_a(data): return sorted(data)\ndef strategy_b(data): return sorted(data, reverse=True)\n\nclass Sorter:\n    def __init__(self, strategy=strategy_a):\n        self.strategy = strategy\n\n    def sort(self, data):\n        return self.strategy(data)\n```", estimatedMinutes: 30 },
      ],
    },
    {
      title: "Concurrency and Async",
      description: "Threading, asyncio, and parallel programming",
      lessons: [
        { title: "Threading and Multiprocessing", slug: "py-threading", content: "# Threading and Multiprocessing\n\n## Threading\n\n```python\nimport threading\nimport time\n\ndef download(url):\n    print(f\"Downloading {url}\")\n    time.sleep(2)\n    print(f\"Done: {url}\")\n\nthreads = [\n    threading.Thread(target=download, args=(url,))\n    for url in [\"url1\", \"url2\", \"url3\"]\n]\n\nfor t in threads: t.start()\nfor t in threads: t.join()\n```\n\n## Multiprocessing\n\n```python\nfrom multiprocessing import Pool\n\ndef square(n):\n    return n * n\n\nwith Pool(4) as p:\n    results = p.map(square, [1, 2, 3, 4, 5])\n    print(results)  # [1, 4, 9, 16, 25]\n```\n\n> **Tip:** Use threading for I/O-bound tasks, multiprocessing for CPU-bound tasks.", estimatedMinutes: 25 },
        { title: "Asyncio", slug: "py-asyncio", content: "# Asyncio\n\n```python\nimport asyncio\n\nasync def fetch_data(url):\n    print(f\"Fetching {url}\")\n    await asyncio.sleep(2)  # Simulate I/O\n    return f\"Data from {url}\"\n\nasync def main():\n    # Sequential (slow)\n    result1 = await fetch_data(\"url1\")\n    result2 = await fetch_data(\"url2\")\n\n    # Concurrent (fast)\n    results = await asyncio.gather(\n        fetch_data(\"url1\"),\n        fetch_data(\"url2\"),\n        fetch_data(\"url3\"),\n    )\n    print(results)\n\nasyncio.run(main())\n```\n\n## Async HTTP with aiohttp\n\n```python\nimport aiohttp\nimport asyncio\n\nasync def fetch(session, url):\n    async with session.get(url) as response:\n        return await response.json()\n\nasync def main():\n    async with aiohttp.ClientSession() as session:\n        data = await fetch(session, \"https://api.example.com/users\")\n```", estimatedMinutes: 30 },
      ],
    },
    {
      title: "Advanced Python Features",
      description: "Context managers, metaprogramming, and more",
      lessons: [
        { title: "Advanced Decorators", slug: "py-advanced-decorators", content: "# Advanced Decorators\n\n## Decorator with Arguments\n\n```python\ndef retry(max_attempts=3):\n    def decorator(func):\n        def wrapper(*args, **kwargs):\n            for attempt in range(max_attempts):\n                try:\n                    return func(*args, **kwargs)\n                except Exception as e:\n                    if attempt == max_attempts - 1:\n                        raise\n                    print(f\"Attempt {attempt + 1} failed: {e}\")\n        return wrapper\n    return decorator\n\n@retry(max_attempts=5)\ndef unstable_function():\n    import random\n    if random.random() < 0.5:\n        raise ValueError(\"Random failure\")\n    return \"Success!\"\n```\n\n## Class Decorators\n\n```python\ndef singleton(cls):\n    instances = {}\n    def get_instance(*args, **kwargs):\n        if cls not in instances:\n            instances[cls] = cls(*args, **kwargs)\n        return instances[cls]\n    return get_instance\n\n@singleton\nclass Database:\n    pass\n```", estimatedMinutes: 25 },
        { title: "Type Hints and Static Analysis", slug: "py-type-hints", content: "# Type Hints\n\n```python\nfrom typing import Optional, Union, List, Dict, Tuple, Callable\n\ndef greet(name: str) -> str:\n    return f\"Hello, {name}\"\n\ndef process(items: List[str]) -> Dict[str, int]:\n    return {item: len(item) for item in items}\n\ndef divide(a: float, b: float) -> Optional[float]:\n    if b == 0:\n        return None\n    return a / b\n\n# Union types\ndef format_value(value: Union[int, float, str]) -> str:\n    return str(value)\n\n# Callable\ndef apply(func: Callable[[int], int], value: int) -> int:\n    return func(value)\n\n# Type aliases\nVector = List[float]\nMatrix = List[Vector]\n```\n\n## Install mypy for type checking:\n```bash\npip install mypy\nmypy script.py\n```", estimatedMinutes: 20 },
        { title: "Generators and Itertools", slug: "py-generators-advanced", content: "# Advanced Generators\n\n```python\n# Generator pipeline\ndef read_large_file(path):\n    with open(path) as f:\n        for line in f:\n            yield line.strip()\n\ndef filter_comments(lines):\n    for line in lines:\n        if not line.startswith('#'):\n            yield line\n\n# Pipeline\nlines = read_large_file('huge.log')\nclean = filter_comments(lines)\nfor line in clean:\n    print(line)\n```\n\n## Itertools\n\n```python\nimport itertools\n\n# Infinite counter\ncounter = itertools.count(start=1, step=2)\nprint(next(counter))  # 1\nprint(next(counter))  # 3\n\n# Chain\ndata = itertools.chain([1, 2], [3, 4], [5, 6])\nprint(list(data))  # [1, 2, 3, 4, 5, 6]\n\n# Group by\ndata = [('A', 1), ('A', 2), ('B', 3), ('B', 4)]\nfor key, group in itertools.groupby(data, key=lambda x: x[0]):\n    print(key, list(group))\n\n# Product (cartesian product)\nfor a, b in itertools.product([1, 2], ['a', 'b']):\n    print(a, b)\n```", estimatedMinutes: 25 },
        { title: "Performance Optimization", slug: "py-performance", content: "# Performance Optimization\n\n```python\nimport time\nfrom functools import lru_cache\nimport sys\n\n# Measure time\ndef timer(func):\n    def wrapper(*args, **kwargs):\n        start = time.perf_counter()\n        result = func(*args, **kwargs)\n        print(f\"{func.__name__}: {time.perf_counter() - start:.4f}s\")\n        return result\n    return wrapper\n\n# LRU Cache\n@lru_cache(maxsize=128)\ndef fibonacci(n):\n    if n < 2:\n        return n\n    return fibonacci(n - 1) + fibonacci(n - 2)\n\n# Memory optimization\n# Use __slots__ for classes\nimport sys\n\nclass Regular:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\nclass Optimized:\n    __slots__ = ['x', 'y']\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\nprint(sys.getsizeof(Regular(1, 2)))  # Larger\nprint(sys.getsizeof(Optimized(1, 2)))  # Smaller\n```", estimatedMinutes: 25 },
      ],
    },
    {
      title: "Testing and Production",
      description: "Testing strategies and deployment",
      lessons: [
        { title: "Unit Testing with pytest", slug: "py-testing", content: "# Testing with pytest\n\n```python\n# test_calculator.py\nimport pytest\nfrom calculator import add, divide\n\ndef test_add():\n    assert add(2, 3) == 5\n\ndef test_divide():\n    assert divide(10, 3) == pytest.approx(3.333)\n\ndef test_divide_by_zero():\n    with pytest.raises(ZeroDivisionError):\n        divide(10, 0)\n\n# Parametrize\n@pytest.mark.parametrize(\"a,b,expected\", [\n    (1, 1, 2),\n    (2, 3, 5),\n    (0, 0, 0),\n    (-1, 1, 0),\n])\ndef test_add_param(a, b, expected):\n    assert add(a, b) == expected\n```\n\n## Fixtures\n\n```python\n@pytest.fixture\ndef sample_user():\n    return {\"name\": \"Alice\", \"email\": \"a@b.com\"}\n\ndef test_user_name(sample_user):\n    assert sample_user[\"name\"] == \"Alice\"\n```\n\n## Run\n\n```bash\npytest\npytest -v\npytest -k \"test_add\"\npytest --cov=src\n```", estimatedMinutes: 25 },
        { title: "Production Deployment", slug: "py-deployment", content: "# Production Deployment\n\n## Docker\n\n```dockerfile\nFROM python:3.12-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install -r requirements.txt\nCOPY . .\nCMD [\"gunicorn\", \"-w\", \"4\", \"-b\", \"0.0.0.0:8000\", \"app:app\"]\n```\n\n## Environment Variables\n\n```python\nimport os\n\nDEBUG = os.environ.get('DEBUG', 'False') == 'True'\nSECRET_KEY = os.environ.get('SECRET_KEY')\nDATABASE_URL = os.environ.get('DATABASE_URL')\n\n# python-dotenv\nfrom dotenv import load_dotenv\nload_dotenv()\n```\n\n## Logging\n\n```python\nimport logging\n\nlogging.basicConfig(\n    level=logging.INFO,\n    format='%(asctime)s %(levelname)s %(message)s'\n)\nlogger = logging.getLogger(__name__)\n\nlogger.info(\"Application started\")\nlogger.error(\"Something went wrong\", exc_info=True)\n```\n\n## Production Checklist\n- Set DEBUG=False\n- Use environment variables for secrets\n- Configure proper logging\n- Set up error monitoring (Sentry)\n- Use Gunicorn/Uvicorn instead of Flask/Django dev server\n- Enable HTTPS\n- Set up database connection pooling", estimatedMinutes: 25 },
      ],
    },
  ],
};

// Java: 13 → needs 7 more
export const javaBasicExtra: CourseContent = {
  slug: "java-basic",
  modules: [
    {
      title: "Collections Framework",
      description: "ArrayList, HashMap, and more",
      lessons: [
        { title: "ArrayList and LinkedList", slug: "java-arraylist", content: "# Collections\n\n## ArrayList\n\n```java\nimport java.util.ArrayList;\n\nArrayList<String> names = new ArrayList<>();\nnames.add(\"Alice\");\nnames.add(\"Bob\");\nnames.add(1, \"Charlie\");\n\nString first = names.get(0);\nint size = names.size();\nboolean has = names.contains(\"Alice\");\nnames.remove(\"Bob\");\n\nfor (String name : names) {\n    System.out.println(name);\n}\n```\n\n## HashMap\n\n```java\nimport java.util.HashMap;\n\nHashMap<String, Integer> scores = new HashMap<>();\nscores.put(\"Alice\", 95);\nscores.put(\"Bob\", 87);\n\nint aliceScore = scores.get(\"Alice\");\nboolean hasKey = scores.containsKey(\"Bob\");\n\nfor (Map.Entry<String, Integer> entry : scores.entrySet()) {\n    System.out.println(entry.getKey() + \": \" + entry.getValue());\n}\n```", estimatedMinutes: 20 },
        { title: "Streams API", slug: "java-streams", content: "# Streams API\n\n```java\nimport java.util.*;\nimport java.util.stream.*;\n\nList<String> names = Arrays.asList(\"Alice\", \"Bob\", \"Charlie\", \"Diana\");\n\n// Filter\nList<String> longNames = names.stream()\n    .filter(n -> n.length() > 4)\n    .collect(Collectors.toList());\n\n// Map\nList<String> upper = names.stream()\n    .map(String::toUpperCase)\n    .collect(Collectors.toList());\n\n// Reduce\nint sum = IntStream.rangeClosed(1, 100).sum();\n\n// Sort\nList<String> sorted = names.stream()\n    .sorted()\n    .collect(Collectors.toList());\n```\n\n## Collectors\n\n```java\n// Joining\nString joined = names.stream().collect(Collectors.joining(\", \"));\n\n// Grouping\nMap<Integer, List<String>> grouped = names.stream()\n    .collect(Collectors.groupingBy(String::length));\n```", estimatedMinutes: 25 },
      ],
    },
    {
      title: "File I/O and Lambda",
      description: "Modern Java features",
      lessons: [
        { title: "Lambdas and Functional Interfaces", slug: "java-lambdas", content: "# Lambdas\n\n```java\n// Lambda expression\n(a, b) -> a + b\n\n// Functional interfaces\n@FunctionalInterface\ninterface MathOperation {\n    int operate(int a, int b);\n}\n\nMathOperation add = (a, b) -> a + b;\nMathOperation subtract = (a, b) -> a - b;\n\nSystem.out.println(add.operate(3, 4));  // 7\n```\n\n## Method Reference\n\n```java\n// These are equivalent:\nlist.forEach(s -> System.out.println(s));\nlist.forEach(System.out::println);\n\n// Static method reference\nFunction<String, Integer> parser = Integer::parseInt;\n\n// Instance method reference\nlist.sort(String::compareToIgnoreCase);\n```", estimatedMinutes: 20 },
        { title: "File I/O", slug: "java-file-io", content: "# File I/O\n\n```java\nimport java.nio.file.*;\nimport java.io.*;\n\n// Read all lines\nList<String> lines = Files.readAllLines(Path.of(\"data.txt\"));\nString content = Files.readString(Path.of(\"data.txt\"));\n\n// Write\nFiles.writeString(Path.of(\"output.txt\"), \"Hello World\");\n\n// BufferedReader (large files)\ntry (BufferedReader br = Files.newBufferedReader(Path.of(\"data.txt\"))) {\n    String line;\n    while ((line = br.readLine()) != null) {\n        System.out.println(line);\n    }\n}\n\n// Paths\nPath path = Path.of(\"src\", \"main\", \"java\");\nSystem.out.println(path.toAbsolutePath());\n```", estimatedMinutes: 20 },
      ],
    },
  ],
};

// JavaScript: 16 → needs 4 more
export const javascriptBasicExtra: CourseContent = {
  slug: "javascript-basic",
  modules: [
    {
      title: "Error Handling and Modules",
      description: "Try/catch and module systems",
      lessons: [
        { title: "Error Handling", slug: "js-error-handling", content: "# Error Handling\n\n```javascript\ntry {\n    const data = JSON.parse(invalidJson);\n} catch (error) {\n    console.error(\"Parse error:\", error.message);\n} finally {\n    console.log(\"Always runs\");\n}\n\n// Custom errors\nclass ValidationError extends Error {\n    constructor(field, message) {\n        super(message);\n        this.field = field;\n    }\n}\n\nfunction validateEmail(email) {\n    if (!email.includes(\"@\")) {\n        throw new ValidationError(\"email\", \"Invalid email\");\n    }\n}\n```\n\n## Error Handling in Promises\n\n```javascript\nfetchData()\n    .then(data => process(data))\n    .catch(error => console.error(error))\n    .finally(() => loading = false);\n```", estimatedMinutes: 20 },
        { title: "Modules (ES Modules)", slug: "js-modules", content: "# ES Modules\n\n```javascript\n// math.js — Named exports\nexport function add(a, b) { return a + b; }\nexport function subtract(a, b) { return a - b; }\nexport const PI = 3.14159;\n\n// main.js — Import\nimport { add, subtract, PI } from './math.js';\nimport * as math from './math.js';\n\nconsole.log(add(2, 3));\nconsole.log(math.PI);\n\n// Default export\nclass User {\n    constructor(name) { this.name = name; }\n}\nexport default User;\n\n// Import default\nimport User from './user.js';\n```\n\n## Dynamic Import\n\n```javascript\nconst module = await import('./heavy-module.js');\nmodule.doSomething();\n```", estimatedMinutes: 20 },
      ],
    },
  ],
};

// React: 12 → needs 8 more
export const reactBasicExtra: CourseContent = {
  slug: "react-basic",
  modules: [
    {
      title: "Context and Performance",
      description: "Context API, memoization, and optimization",
      lessons: [
        { title: "Context API", slug: "react-context", content: "# Context API\n\n```jsx\nimport { createContext, useContext, useState } from 'react';\n\nconst ThemeContext = createContext();\n\nfunction ThemeProvider({ children }) {\n    const [theme, setTheme] = useState('dark');\n    const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark');\n    return (\n        <ThemeContext.Provider value={{ theme, toggle }}>\n            {children}\n        </ThemeContext.Provider>\n    );\n}\n\nfunction Button() {\n    const { theme, toggle } = useContext(ThemeContext);\n    return <button onClick={toggle}>Theme: {theme}</button>;\n}\n\nfunction App() {\n    return (\n        <ThemeProvider>\n            <Button />\n        </ThemeProvider>\n    );\n}\n```", estimatedMinutes: 25 },
        { title: "useReducer Hook", slug: "react-usereducer", content: "# useReducer\n\n```jsx\nimport { useReducer } from 'react';\n\nfunction reducer(state, action) {\n    switch (action.type) {\n        case 'increment': return { count: state.count + 1 };\n        case 'decrement': return { count: state.count - 1 };\n        case 'reset': return { count: 0 };\n        default: throw new Error('Unknown action');\n    }\n}\n\nfunction Counter() {\n    const [state, dispatch] = useReducer(reducer, { count: 0 });\n    return (\n        <div>\n            <p>Count: {state.count}</p>\n            <button onClick={() => dispatch({ type: 'increment' })}>+</button>\n            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>\n            <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>\n        </div>\n    );\n}\n```", estimatedMinutes: 20 },
        { title: "Performance with useMemo and useCallback", slug: "react-performance", content: "# Performance Hooks\n\n```jsx\nimport { useMemo, useCallback } from 'react';\n\nfunction ExpensiveList({ items, onSelect }) {\n    // useMemo — cache expensive calculations\n    const sorted = useMemo(() => {\n        return [...items].sort((a, b) => a.name.localeCompare(b.name));\n    }, [items]);\n\n    // useCallback — stable function reference\n    const handleClick = useCallback((id) => {\n        onSelect(id);\n    }, [onSelect]);\n\n    return (\n        <ul>\n            {sorted.map(item => (\n                <li key={item.id} onClick={() => handleClick(item.id)}>\n                    {item.name}\n                </li>\n            ))}\n        </ul>\n    );\n}\n```\n\n## React.memo\n\n```jsx\nconst MemoizedChild = React.memo(function Child({ data }) {\n    console.log('Child rendered');\n    return <div>{data}</div>;\n});\n```", estimatedMinutes: 25 },
      ],
    },
    {
      title: "Testing React",
      description: "Unit and integration testing",
      lessons: [
        { title: "Testing with React Testing Library", slug: "react-testing", content: "# Testing\n\n```jsx\nimport { render, screen, fireEvent } from '@testing-library/react';\nimport Counter from './Counter';\n\ntest('increments count', () => {\n    render(<Counter />);\n    const button = screen.getByRole('button', { name: /increment/i });\n    fireEvent.click(button);\n    expect(screen.getByText('Count: 1')).toBeInTheDocument();\n});\n\ntest('displays initial count', () => {\n    render(<Counter />);\n    expect(screen.getByText('Count: 0')).toBeInTheDocument();\n});\n```\n\n## Async Tests\n\n```jsx\ntest('fetches data', async () => {\n    render(<UserProfile userId={1} />);\n    expect(await screen.findByText('Alice')).toBeInTheDocument();\n});\n```", estimatedMinutes: 25 },
        { title: "Storybook for Components", slug: "react-storybook", content: "# Storybook\n\n## Setup\n\n```bash\nnpx storybook@latest init\n```\n\n## Writing Stories\n\n```jsx\n// Button.stories.jsx\nimport Button from './Button';\n\nexport default {\n    title: 'UI/Button',\n    component: Button,\n};\n\nexport const Primary = {\n    args: { label: 'Click Me', variant: 'primary' },\n};\n\nexport const Secondary = {\n    args: { label: 'Cancel', variant: 'secondary' },\n};\n\nexport const Disabled = {\n    args: { label: 'Disabled', disabled: true },\n};\n```\n\n## Benefits\n- Visual component library\n- Isolated development\n- Document component variations\n- Visual regression testing", estimatedMinutes: 20 },
      ],
    },
  ],
};

// Export all supplements
export const allSupplements: CourseContent[] = [
  pythonBasicExtra,
  pythonAdvanced,
  javaBasicExtra,
  javascriptBasicExtra,
  reactBasicExtra,
];
