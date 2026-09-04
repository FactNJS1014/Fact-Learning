import type { CourseContent } from "../seed-content";
import { lesson } from "./lesson-builder";

export const flaskBasic20Modules: CourseContent = {
  slug: "flask-basic",
  modules: [
    {
      title: "Introduction to Flask",
      description: "What Flask is and environment setup",
      lessons: [
        lesson({
          title: "What is Flask?",
          slug: "flask-intro",
          minutes: 12,
          objective: "Understand Flask and when to choose it.",
          intro:
            "Flask is a lightweight Python web framework. It gives you routing, templates, and request handling with minimal magic — you add what you need.",
          concepts: [
            "- **Micro-framework**: small core, batteries optional.",
            "- **WSGI**: Flask apps run on WSGI servers (gunicorn).",
            "- **Extensions**: Flask-SQLAlchemy, Flask-Login, Flask-Migrate.",
            "- **Great for**: APIs, small-to-medium web apps, prototypes.",
          ],
          example: {
            lang: "python",
            code: "from flask import Flask\n\napp = Flask(__name__)\n\n@app.route('/')\ndef home():\n    return 'Hello, Flask!'\n\nif __name__ == '__main__':\n    app.run(debug=True)",
            output: "GET / returns 'Hello, Flask!'.",
          },
          mistakes: [
            "Choosing Flask for a giant monolithic app (Django suits better).",
            "Running app.run() directly in production.",
          ],
          bestPractices: [
            "Use an application factory for bigger apps.",
            "Run debug=True only in development.",
          ],
          exerciseTitle: "Hello Flask",
          exerciseDescription: "Create a Flask app with a home route.",
          exerciseRequirements: [
            "Minimal app",
            "One route",
            "Runs in debug mode",
          ],
          challenge: "Add a /about route and link between them.",
          summary:
            "Flask is a minimal, extensible Python web framework.",
        }),
        lesson({
          title: "Environment Setup",
          slug: "flask-setup",
          minutes: 15,
          objective: "Set up a virtual environment and install Flask.",
          intro:
            "Isolate dependencies with venv, install Flask and friends, and organize the project from the start.",
          concepts: [
            "- python -m venv .venv activates a virtual environment.",
            "- pip install flask flask-sqlalchemy ...",
            "- .flaskenv sets FLASK_APP and FLASK_DEBUG.",
          ],
          syntax: {
            lang: "bash",
            code: "python -m venv .venv\nsource .venv/bin/activate  # Windows: .venv\\Scripts\\activate\npip install flask python-dotenv\npip freeze > requirements.txt\nflask run",
          },
          example: {
            lang: "python",
            code: "# .flaskenv\nFLASK_APP=app.py\nFLASK_DEBUG=1",
            output: "flask run starts the app in debug mode.",
          },
          mistakes: [
            "Installing packages globally.",
            "Forgetting requirements.txt for reproducibility.",
          ],
          bestPractices: [
            "Always use a virtual environment.",
            "Pin dependency versions.",
          ],
          exerciseTitle: "Environment",
          exerciseDescription: "Set up venv, install Flask, and create requirements.txt.",
          exerciseRequirements: [
            "Virtual environment",
            "Flask installed",
            "Requirements file",
          ],
          challenge: "Add a Makefile or script to automate setup.",
          summary:
            "venv + requirements.txt give a reproducible Flask environment.",
        }),
        lesson({
          title: "App Structure",
          slug: "flask-structure",
          minutes: 15,
          objective: "Organize Flask projects as packages.",
          intro:
            "Small apps live in one file; anything serious becomes a package with an application factory.",
          concepts: [
            "- app/ package with __init__.py factory.",
            "- Blueprints split routes by domain.",
            "- config.py separates settings.",
          ],
          example: {
            lang: "text",
            code: "app/\n  __init__.py      # create_app() factory\n  routes/\n    __init__.py\n    main.py        # blueprint\n    api.py\n  models.py\n  templates/\n  static/\nconfig.py\nrun.py",
            output: "A scalable Flask layout.",
          },
          mistakes: [
            "A single app.py growing to thousands of lines.",
            "Circular imports from factory misuse.",
          ],
          bestPractices: [
            "Use create_app() and blueprints early.",
            "Import extensions inside the factory.",
          ],
          exerciseTitle: "Package Refactor",
          exerciseDescription: "Convert a single-file app into a package with a factory.",
          exerciseRequirements: [
            "create_app factory",
            "1 blueprint",
            "Runs identically",
          ],
          challenge: "Split routes into two blueprints.",
          summary:
            "Factories and blueprints keep Flask apps organized.",
        }),
      ],
    },
    {
      title: "Routing",
      description: "URLs, views, and responses",
      lessons: [
        lesson({
          title: "Routing Basics",
          slug: "flask-routing",
          minutes: 20,
          objective: "Define routes with methods and parameters.",
          intro:
            "The @app.route decorator maps URLs to view functions, with support for HTTP methods and dynamic URL parameters.",
          concepts: [
            "- methods=['GET', 'POST'] on a route.",
            "- <int:post_id> converters type URL params.",
            "- url_for() generates URLs from endpoint names.",
          ],
          example: {
            lang: "python",
            code: "from flask import Flask, url_for\n\napp = Flask(__name__)\n\n@app.route('/posts/<int:post_id>')\ndef show_post(post_id):\n    return f'Post {post_id}'\n\n@app.route('/submit', methods=['POST'])\ndef submit():\n    return 'Submitted', 201\n\n# url_for('show_post', post_id=42) -> '/posts/42'",
            output: "Typed URL params and method-restricted routes.",
          },
          mistakes: [
            "Forgetting the int converter — 'abc' crashes string math.",
            "Hardcoding URLs instead of url_for.",
          ],
          bestPractices: [
            "Use converters (int, float, path).",
            "Return status codes explicitly where needed.",
          ],
          exerciseTitle: "Routes",
          exerciseDescription: "Create routes with params, methods, and url_for.",
          exerciseRequirements: [
            "Dynamic param route",
            "POST-only route",
            "url_for usage",
          ],
          challenge: "Add a catch-all route with the path converter.",
          summary:
            "Routes map URLs to views with methods and typed params.",
        }),
        lesson({
          title: "Views & Responses",
          slug: "flask-responses",
          minutes: 15,
          objective: "Return strings, templates, and JSON.",
          intro:
            "Views return strings, render_template results, or Response objects. jsonify creates JSON responses for APIs.",
          concepts: [
            "- render_template('index.html', name=name).",
            "- jsonify(data) sets Content-Type: application/json.",
            "- abort(404) triggers error handlers.",
          ],
          example: {
            lang: "python",
            code: "from flask import Flask, render_template, jsonify, abort\n\n@app.route('/')\ndef home():\n    return render_template('index.html', name='Ada')\n\n@app.route('/api/user/<int:user_id>')\ndef user_api(user_id):\n    user = find_user(user_id)\n    if user is None:\n        abort(404, description='User not found')\n    return jsonify(id=user.id, name=user.name)",
            output: "HTML templates for pages, JSON for APIs.",
          },
          mistakes: [
            "Returning dicts directly (old Flask did; modern needs jsonify).",
            "Leaking tracebacks via default error pages.",
          ],
          bestPractices: [
            "Use jsonify for APIs.",
            "Register custom error handlers.",
          ],
          exerciseTitle: "Responses",
          exerciseDescription: "Build a page route and an API route in one app.",
          exerciseRequirements: [
            "Template response",
            "JSON response",
            "404 abort + handler",
          ],
          challenge: "Add a custom 404 error handler template.",
          summary:
            "Views choose the response type: HTML, JSON, or errors.",
        }),
        lesson({
          title: "Blueprints",
          slug: "flask-blueprints",
          minutes: 20,
          objective: "Split the app into blueprints.",
          intro:
            "Blueprints group related routes, templates, and static files — the standard way to modularize Flask.",
          concepts: [
            "- Blueprint('auth', __name__, url_prefix='/auth').",
            "- Register with app.register_blueprint().",
            "- url_prefix scopes all routes.",
          ],
          example: {
            lang: "python",
            code: "# app/routes/auth.py\nfrom flask import Blueprint\n\nauth_bp = Blueprint('auth', __name__, url_prefix='/auth')\n\n@auth_bp.route('/login')\ndef login():\n    return 'Login form'\n\n# app/__init__.py\ndef create_app():\n    app = Flask(__name__)\n    from .routes.auth import auth_bp\n    app.register_blueprint(auth_bp)\n    return app\n\n# Now GET /auth/login works",
            output: "Modular route groups with URL prefixes.",
          },
          mistakes: [
            "Blueprint name collisions (use __name__).",
            "Registering blueprints outside the factory.",
          ],
          bestPractices: [
            "One blueprint per domain (auth, posts, api).",
            "Register all blueprints in create_app.",
          ],
          exerciseTitle: "Blueprint Split",
          exerciseDescription: "Split routes into auth and posts blueprints.",
          exerciseRequirements: [
            "2 blueprints",
            "url_prefix on one",
            "Registered in factory",
          ],
          challenge: "Move templates and static into blueprint folders.",
          summary:
            "Blueprints modularize routes and enable app growth.",
        }),
      ],
    },
    {
      title: "Templates & Static",
      description: "Jinja2 rendering",
      lessons: [
        lesson({
          title: "Jinja2 Basics",
          slug: "flask-jinja",
          minutes: 20,
          objective: "Render dynamic HTML with Jinja2.",
          intro:
            "Jinja2 is Flask's templating engine: {{ }} outputs values (auto-escaped), {% %} runs logic.",
          concepts: [
            "- {{ name }} auto-escapes (XSS-safe).",
            "- {% for %}, {% if %}, {% set %} control flow.",
            "- Filters: |length, |upper, |default.",
          ],
          example: {
            lang: "jinja",
            code: "<h1>Courses</h1>\n<ul>\n  {% for course in courses %}\n    <li>\n      {{ course.title }} —\n      {% if course.lessons|length > 10 %}Long{% else %}Short{% endif %}\n    </li>\n  {% else %}\n    <li>No courses yet.</li>\n  {% endfor %}\n</ul>",
            output: "A dynamic list with an empty state.",
          },
          mistakes: [
            "Using |safe on user content (XSS).",
            "Writing logic-heavy templates.",
          ],
          bestPractices: [
            "Auto-escaping is your friend.",
            "Keep templates presentation-only.",
          ],
          exerciseTitle: "Template",
          exerciseDescription: "Render a course list template with a loop and empty state.",
          exerciseRequirements: [
            "Loop with else",
            "A filter",
            "Escaped output",
          ],
          challenge: "Add a macro for rendering course badges.",
          summary:
            "Jinja2 renders safe, dynamic HTML.",
        }),
        lesson({
          title: "Template Inheritance",
          slug: "flask-inheritance",
          minutes: 15,
          objective: "Share layout with template inheritance.",
          intro:
            "A base template defines the shell; child templates override blocks.",
          concepts: [
            "- {% extends 'base.html' %}.",
            "- {% block content %}...{% endblock %}.",
            "- {% include %} for partials.",
          ],
          example: {
            lang: "jinja",
            code: "<!-- templates/base.html -->\n<!DOCTYPE html>\n<html>\n<head><title>{% block title %}My App{% endblock %}</title></head>\n<body>\n  <nav>{% include 'nav.html' %}</nav>\n  <main>{% block content %}{% endblock %}</main>\n</body>\n</html>\n\n<!-- templates/posts.html -->\n{% extends 'base.html' %}\n{% block title %}Posts{% endblock %}\n{% block content %}\n  <h1>All Posts</h1>\n{% endblock %}",
            output: "Every page shares the shell.",
          },
          mistakes: [
            "Duplicating head/nav markup.",
            "Block name typos (silent failures).",
          ],
          bestPractices: [
            "One base template per layout region.",
            "Use include for small partials.",
          ],
          exerciseTitle: "Inheritance",
          exerciseDescription: "Create a base template and extend it in two pages.",
          exerciseRequirements: [
            "Base with 2+ blocks",
            "2 child templates",
            "One include",
          ],
          challenge: "Add a sidebar block with a default.",
          summary:
            "Inheritance keeps layouts DRY.",
        }),
        lesson({
          title: "Forms in Templates",
          slug: "flask-template-forms",
          minutes: 15,
          objective: "Build forms with CSRF protection.",
          intro:
            "Forms need CSRF tokens in Flask too — Flask-WTF provides them along with form classes.",
          concepts: [
            "- Flask-WTF CSRFProtect(app) enables global CSRF.",
            "- {{ form.hidden_tag() }} renders the token.",
            "- form validation errors render per field.",
          ],
          example: {
            lang: "jinja",
            code: "<form method=\"POST\">\n  {{ form.hidden_tag() }}\n  <p>\n    {{ form.email.label }}\n    {{ form.email(size=40) }}\n    {% for error in form.email.errors %}\n      <span class=\"error\">{{ error }}</span>\n    {% endfor %}\n  </p>\n  <p>{{ form.password.label }} {{ form.password(size=40) }}</p>\n  <p><button type=\"submit\">Login</button></p>\n</form>",
            output: "A CSRF-protected form with field errors.",
          },
          mistakes: [
            "Forgetting hidden_tag — 400 CSRF errors.",
            "Manually writing token inputs.",
          ],
          bestPractices: [
            "Enable CSRFProtect globally.",
            "Let the form class render fields.",
          ],
          exerciseTitle: "Safe Form",
          exerciseDescription: "Add Flask-WTF and build a login form template.",
          exerciseRequirements: [
            "CSRFProtect enabled",
            "hidden_tag in form",
            "Error display",
          ],
          challenge: "Style errors with CSS classes.",
          summary:
            "Flask-WTF handles CSRF and form rendering.",
        }),
      ],
    },
    {
      title: "Requests & Responses",
      description: "Working with HTTP",
      lessons: [
        lesson({
          title: "Request Object",
          slug: "flask-request",
          minutes: 20,
          objective: "Read query params, forms, and JSON.",
          intro:
            "The global request object exposes everything the client sent: args, form, json, headers, files.",
          concepts: [
            "- request.args for query strings.",
            "- request.form for form data, request.json for JSON.",
            "- request.files for uploads.",
          ],
          example: {
            lang: "python",
            code: "from flask import request\n\n@app.route('/search')\ndef search():\n    q = request.args.get('q', '')\n    page = request.args.get('page', 1, type=int)\n    return f'Searching for {q!r} on page {page}'\n\n@app.route('/api/notes', methods=['POST'])\ndef create_note():\n    data = request.get_json()\n    if not data or 'title' not in data:\n        return {'error': 'title required'}, 400\n    return {'ok': True, 'title': data['title']}, 201",
            output: "Typed query params and validated JSON bodies.",
          },
          mistakes: [
            "request.data vs request.json confusion.",
            "Trusting unvalidated input.",
          ],
          bestPractices: [
            "Use type= for arg conversion.",
            "Always validate JSON payloads.",
          ],
          exerciseTitle: "Request Reading",
          exerciseDescription: "Build search and note-creation endpoints reading input.",
          exerciseRequirements: [
            "Query params with type",
            "JSON body validation",
            "400 on bad input",
          ],
          challenge: "Handle file uploads with request.files.",
          summary:
            "The request object reads all input types safely.",
        }),
        lesson({
          title: "Response Objects",
          slug: "flask-responses-object",
          minutes: 15,
          objective: "Control status codes, headers, and cookies.",
          intro:
            "make_response builds full Response objects: custom status, headers, and cookies.",
          concepts: [
            "- response = make_response(body, status).",
            "- response.headers['X-Custom'] = 'value'.",
            "- set_cookie with httponly and samesite.",
          ],
          example: {
            lang: "python",
            code: "from flask import make_response\n\n@app.route('/download')\ndef download():\n    content = 'some, csv, data'\n    response = make_response(content)\n    response.headers['Content-Disposition'] = 'attachment; filename=report.csv'\n    response.headers['Content-Type'] = 'text/csv'\n    return response",
            output: "A file-download response with correct headers.",
          },
          mistakes: [
            "Returning strings when you need headers.",
            "Setting cookies without httponly for tokens.",
          ],
          bestPractices: [
            "Use make_response for header manipulation.",
            "Set secure cookie flags on auth cookies.",
          ],
          exerciseTitle: "CSV Download",
          exerciseDescription: "Generate a CSV and serve it as a download.",
          exerciseRequirements: [
            "make_response",
            "2 headers set",
            "Correct content type",
          ],
          challenge: "Add a cache-control header.",
          summary:
            "Response objects give full control over HTTP output.",
        }),
      ],
    },
    {
      title: "Databases with SQLAlchemy",
      description: "Models, queries, and migrations",
      lessons: [
        lesson({
          title: "Flask-SQLAlchemy",
          slug: "flask-sqlalchemy",
          minutes: 25,
          objective: "Define models and query the database.",
          intro:
            "Flask-SQLAlchemy integrates SQLAlchemy ORM with Flask: models map to tables, queries are Python expressions.",
          concepts: [
            "- db = SQLAlchemy(app) in the factory.",
            "- Models inherit db.Model; columns are typed.",
            "- db.session.commit() persists changes.",
          ],
          example: {
            lang: "python",
            code: "from flask_sqlalchemy import SQLAlchemy\nfrom datetime import datetime\n\ndb = SQLAlchemy()\n\nclass User(db.Model):\n    id = db.Column(db.Integer, primary_key=True)\n    email = db.Column(db.String(255), unique=True, nullable=False)\n    username = db.Column(db.String(80), unique=True, nullable=False)\n    created_at = db.Column(db.DateTime, default=datetime.utcnow)\n\n# Queries\nuser = User.query.filter_by(email='ada@example.com').first_or_404()\nusers = User.query.order_by(User.created_at.desc()).limit(10).all()",
            output: "Typed models with unique constraints and queries.",
          },
          mistakes: [
            "Creating models before init_app — circular imports.",
            "Ignoring unique constraints.",
          ],
          bestPractices: [
            "Initialize db in the factory.",
            "Use relationships for related data.",
          ],
          exerciseTitle: "User Model",
          exerciseDescription: "Set up SQLAlchemy and a User model with queries.",
          exerciseRequirements: [
            "Extension wired",
            "Model with 3+ columns",
            "2 queries",
          ],
          challenge: "Add a Post model with a foreign key.",
          summary:
            "SQLAlchemy models make database access typed and safe.",
        }),
        lesson({
          title: "Relationships",
          slug: "flask-relationships",
          minutes: 25,
          objective: "Define and query relationships.",
          intro:
            "db.relationship and foreign keys express relations; lazy loading and joinedload control query behavior.",
          concepts: [
            "- db.Column(db.ForeignKey('users.id')).",
            "- relationship('Post', backref='author').",
            "- Query with .options(joinedload(...)) to avoid N+1.",
          ],
          example: {
            lang: "python",
            code: "class Post(db.Model):\n    id = db.Column(db.Integer, primary_key=True)\n    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)\n    title = db.Column(db.String(200), nullable=False)\n    body = db.Column(db.Text, nullable=False)\n\n    author = db.relationship('User', backref='posts')\n\n# Usage\nuser = User.query.get(1)\nuser.posts          # all posts by user\n\n# Eager load to avoid N+1\nfrom sqlalchemy.orm import joinedload\nposts = Post.query.options(joinedload(Post.author)).all()",
            output: "Relations with eager-loading options.",
          },
          mistakes: [
            "N+1 queries in loops.",
            "Backref name collisions.",
          ],
          bestPractices: [
            "Eager load list views.",
            "Name relationships clearly.",
          ],
          exerciseTitle: "Relations",
          exerciseDescription: "Add a Post model related to User and query with eager loading.",
          exerciseRequirements: [
            "FK + relationship",
            "Backref usage",
            "joinedload on a list query",
          ],
          challenge: "Add a many-to-many tag relationship.",
          summary:
            "Relationships + eager loading keep queries efficient.",
        }),
        lesson({
          title: "Migrations with Flask-Migrate",
          slug: "flask-migrate",
          minutes: 20,
          objective: "Version schema changes with Alembic.",
          intro:
            "Flask-Migrate (Alembic) tracks schema changes as migrations, applied with flask db commands.",
          concepts: [
            "- migrate = Migrate(app, db).",
            "- flask db init / migrate / upgrade.",
            "- Each change becomes a versioned migration.",
          ],
          syntax: {
            lang: "bash",
            code: "pip install flask-migrate\nflask db init\nflask db migrate -m 'create users table'\nflask db upgrade",
          },
          example: {
            lang: "python",
            code: "# app/__init__.py\nfrom flask_migrate import Migrate\nmigrate = Migrate(app, db)",
            output: "Schema changes become tracked migrations.",
          },
          mistakes: [
            "Editing old migrations after applying.",
            "Running flask db upgrade on production without backup.",
          ],
          bestPractices: [
            "Commit migrations with the code.",
            "Test migrations against a copy first.",
          ],
          exerciseTitle: "Migration",
          exerciseDescription: "Init migrations and create the users table via migration.",
          exerciseRequirements: [
            "flask db init",
            "Create migration",
            "Apply upgrade",
          ],
          challenge: "Add a column in a second migration.",
          summary:
            "Migrations make schema changes reviewable and reversible.",
        }),
      ],
    },
    {
      title: "REST APIs",
      description: "Building JSON APIs with Flask",
      lessons: [
        lesson({
          title: "API Design",
          slug: "flask-api-design",
          minutes: 20,
          objective: "Design clean REST endpoints.",
          intro:
            "REST APIs use resources and HTTP verbs: GET list/show, POST create, PUT/PATCH update, DELETE remove.",
          concepts: [
            "- Nouns, not verbs: /api/posts, not /api/get_posts.",
            "- Status codes: 200, 201, 400, 401, 404, 422.",
            "- Pagination via limit/offset or page params.",
          ],
          example: {
            lang: "python",
            code: "@bp.route('/api/posts')\ndef list_posts():\n    page = request.args.get('page', 1, type=int)\n    per_page = request.args.get('per_page', 20, type=int)\n    posts = Post.query.paginate(page=page, per_page=per_page, error_out=False)\n    return {\n        'items': [serialize(p) for p in posts.items],\n        'total': posts.total,\n        'page': page,\n        'pages': posts.pages,\n    }",
            output: "A paginated, consistent list response.",
          },
          mistakes: [
            "REST verbs in URLs.",
            "Inconsistent response shapes.",
          ],
          bestPractices: [
            "Paginate list endpoints.",
            "Serialize consistently.",
          ],
          exerciseTitle: "Posts API",
          exerciseDescription: "Design list and detail endpoints with pagination.",
          exerciseRequirements: [
            "Pagination",
            "Consistent shape",
            "Proper status codes",
          ],
          challenge: "Add filters via query params.",
          summary:
            "Clean REST design makes APIs predictable.",
        }),
        lesson({
          title: "Validation in APIs",
          slug: "flask-api-validation",
          minutes: 20,
          objective: "Validate API input with marshmallow.",
          intro:
            "marshmallow schemas validate input and serialize output — a clean layer between requests and models.",
          concepts: [
            "- Schema with fields and validators.",
            "- load() validates and converts; dump() serializes.",
            "- Return 422 with field errors on failure.",
          ],
          example: {
            lang: "python",
            code: "from marshmallow import Schema, fields, validate\n\nclass PostSchema(Schema):\n    id = fields.Int(dump_only=True)\n    title = fields.Str(required=True, validate=validate.Length(min=1, max=200))\n    body = fields.Str(required=True)\n    published = fields.Bool(missing=False)\n\n@bp.route('/api/posts', methods=['POST'])\ndef create_post():\n    schema = PostSchema()\n    data = schema.load(request.get_json() or {})\n    post = Post(**data)\n    db.session.add(post)\n    db.session.commit()\n    return schema.dump(post), 201",
            output: "Validated input, clean serialization, 422 on errors.",
          },
          mistakes: [
            "Validating manually in every view.",
            "Returning model objects directly.",
          ],
          bestPractices: [
            "One schema per resource.",
            "Raise ValidationError to return 422.",
          ],
          exerciseTitle: "Schema",
          exerciseDescription: "Add a PostSchema and use it in create and list views.",
          exerciseRequirements: [
            "Schema with validators",
            "load on input",
            "dump on output",
          ],
          challenge: "Handle ValidationError with a JSON error response.",
          summary:
            "marshmallow schemas formalize API input and output.",
        }),
      ],
    },
    {
      title: "Authentication",
      description: "Sessions, tokens, and passwords",
      lessons: [
        lesson({
          title: "Password Hashing",
          slug: "flask-passwords",
          minutes: 20,
          objective: "Hash passwords with werkzeug.",
          intro:
            "Werkzeug (bundled with Flask) provides secure password hashing: generate_password_hash and check_password_hash.",
          concepts: [
            "- generate_password_hash(password) uses PBKDF2 by default.",
            "- check_password_hash(hash, password) verifies.",
            "- Never store plain text.",
          ],
          example: {
            lang: "python",
            code: "from werkzeug.security import generate_password_hash, check_password_hash\n\nclass User(db.Model):\n    id = db.Column(db.Integer, primary_key=True)\n    email = db.Column(db.String(255), unique=True, nullable=False)\n    password_hash = db.Column(db.String(255), nullable=False)\n\n    def set_password(self, password):\n        self.password_hash = generate_password_hash(password)\n\n    def check_password(self, password):\n        return check_password_hash(self.password_hash, password)",
            output: "Salted, hashed passwords with a verify method.",
          },
          mistakes: [
            "Rolling custom hashing.",
            "Storing plain text 'for now'.",
          ],
          bestPractices: [
            "Use werkzeug's helpers.",
            "Reject weak passwords at registration.",
          ],
          exerciseTitle: "Password Model",
          exerciseDescription: "Add hashed passwords to the User model.",
          exerciseRequirements: [
            "set_password",
            "check_password",
            "Unique email",
          ],
          challenge: "Add password strength validation.",
          summary:
            "Werkzeug hashing keeps passwords safe.",
        }),
        lesson({
          title: "Sessions",
          slug: "flask-sessions",
          minutes: 20,
          objective: "Implement login/logout with session cookies.",
          intro:
            "Flask sessions store a signed cookie; login sets session['user_id'] and logout pops it. For real apps use Flask-Login.",
          concepts: [
            "- app.secret_key signs session cookies.",
            "- session['user_id'] = user.id on login.",
            "- current_user via Flask-Login for convenience.",
          ],
          example: {
            lang: "python",
            code: "from flask import session, redirect, url_for\n\n@app.route('/login', methods=['POST'])\ndef login():\n    user = User.query.filter_by(email=request.form['email']).first()\n    if user and user.check_password(request.form['password']):\n        session['user_id'] = user.id\n        return redirect(url_for('dashboard'))\n    return 'Invalid credentials', 401\n\n@app.route('/logout')\ndef logout():\n    session.pop('user_id', None)\n    return redirect(url_for('home'))",
            output: "Cookie-based login and logout.",
          },
          mistakes: [
            "Missing or weak secret_key.",
            "Storing the whole user in the session.",
          ],
          bestPractices: [
            "Store only the id.",
            "Regenerate sessions on login.",
          ],
          exerciseTitle: "Session Auth",
          exerciseDescription: "Implement login/logout with sessions.",
          exerciseRequirements: [
            "Login sets session",
            "Logout clears",
            "Protected route checks session",
          ],
          challenge: "Add Flask-Login's current_user pattern.",
          summary:
            "Signed session cookies manage login state.",
        }),
        lesson({
          title: "JWT APIs",
          slug: "flask-jwt",
          minutes: 25,
          objective: "Authenticate APIs with JWT tokens.",
          intro:
            "APIs use bearer tokens. PyJWT issues and verifies JWTs; decorators protect endpoints.",
          concepts: [
            "- jwt.encode(payload, secret, algorithm='HS256').",
            "- Authorization: Bearer <token> header.",
            "- Verify + decode in a decorator.",
          ],
          example: {
            lang: "python",
            code: "import jwt\nfrom functools import wraps\nfrom datetime import datetime, timedelta\nfrom flask import request, jsonify\n\nSECRET = app.config['JWT_SECRET']\n\n@app.route('/api/login', methods=['POST'])\ndef api_login():\n    user = User.query.filter_by(email=request.json['email']).first()\n    if not user or not user.check_password(request.json['password']):\n        return jsonify(error='Invalid credentials'), 401\n\n    token = jwt.encode({\n        'sub': str(user.id),\n        'exp': datetime.utcnow() + timedelta(hours=24),\n    }, SECRET, algorithm='HS256')\n    return jsonify(token=token)\n\ndef token_required(f):\n    @wraps(f)\n    def wrapper(*args, **kwargs):\n        auth = request.headers.get('Authorization', '')\n        token = auth.removeprefix('Bearer ')\n        try:\n            payload = jwt.decode(token, SECRET, algorithms=['HS256'])\n        except jwt.InvalidTokenError:\n            return jsonify(error='Invalid or expired token'), 401\n        return f(payload, *args, **kwargs)\n    return wrapper",
            output: "Login returns a 24h token; protected views verify it.",
          },
          mistakes: [
            "Hardcoding the secret.",
            "Not checking exp.",
          ],
          bestPractices: [
            "Read the secret from config/env.",
            "Use short expiries + refresh.",
          ],
          exerciseTitle: "JWT Auth",
          exerciseDescription: "Build login + a protected notes API with JWT.",
          exerciseRequirements: [
            "Token issuance",
            "Decorator guard",
            "401 on bad token",
          ],
          challenge: "Add refresh tokens.",
          summary:
            "JWT bearer tokens authenticate stateless APIs.",
        }),
      ],
    },
    {
      title: "Authorization & Roles",
      description: "Permissions and ownership",
      lessons: [
        lesson({
          title: "Role-Based Access",
          slug: "flask-roles",
          minutes: 20,
          objective: "Enforce roles with decorators.",
          intro:
            "Roles (user, admin) gate features. A decorator checks the current user's role before the view runs.",
          concepts: [
            "- User.role column with defaults.",
            "- @admin_required decorator wrapper.",
            "- Return 403 with a friendly message.",
          ],
          example: {
            lang: "python",
            code: "from functools import wraps\nfrom flask import abort\nfrom flask_login import current_user\n\nclass User(db.Model):\n    role = db.Column(db.String(20), default='user')\n\n    @property\n    def is_admin(self):\n        return self.role == 'admin'\n\ndef admin_required(f):\n    @wraps(f)\n    def wrapper(*args, **kwargs):\n        if not current_user.is_authenticated:\n            abort(401)\n        if not current_user.is_admin:\n            abort(403)\n        return f(*args, **kwargs)\n    return wrapper\n\n@app.route('/admin')\n@admin_required\ndef admin_panel():\n    return render_template('admin.html')",
            output: "Admin-only views enforced server-side.",
          },
          mistakes: [
            "Hiding buttons client-side only.",
            "Forgetting the decorator on new routes.",
          ],
          bestPractices: [
            "Enforce roles in views, not templates.",
            "Default to the least-privilege role.",
          ],
          exerciseTitle: "Roles",
          exerciseDescription: "Add roles and an admin_required decorator.",
          exerciseRequirements: [
            "Role column",
            "Decorator",
            "403 handling",
          ],
          challenge: "Add a staff role with partial access.",
          summary:
            "Role decorators centralize authorization.",
        }),
        lesson({
          title: "Ownership Checks",
          slug: "flask-ownership",
          minutes: 20,
          objective: "Prevent IDOR with ownership checks.",
          intro:
            "Users must only touch their own resources: scope every query by current_user before mutating.",
          concepts: [
            "- Query with user_id == current_user.id.",
            "- 404 (not 403) hides existence.",
            "- Never trust ids from the client.",
          ],
          example: {
            lang: "python",
            code: "@app.route('/notes/<int:note_id>/edit', methods=['POST'])\n@login_required\ndef edit_note(note_id):\n    note = Note.query.filter_by(\n        id=note_id,\n        user_id=current_user.id,\n    ).first_or_404()\n\n    note.body = request.form['body']\n    db.session.commit()\n    return redirect(url_for('view_note', note_id=note.id))",
            output: "Editing another user's note returns 404.",
          },
          mistakes: [
            "Fetching by id then checking after (races).",
            "Returning 403 which reveals existence.",
          ],
          bestPractices: [
            "Scope the query itself.",
            "Use first_or_404 for clean handling.",
          ],
          exerciseTitle: "Ownership",
          exerciseDescription: "Scope note queries by the current user.",
          exerciseRequirements: [
            "Scoped query",
            "first_or_404",
            "Edit + delete views",
          ],
          challenge: "Test that user B cannot edit user A's note.",
          summary:
            "Query-scoped ownership blocks IDOR.",
        }),
      ],
    },
    {
      title: "Testing",
      description: "Flask test client and pytest",
      lessons: [
        lesson({
          title: "Test Client",
          slug: "flask-testing",
          minutes: 25,
          objective: "Test routes with Flask's test client.",
          intro:
            "app.test_client() exercises routes without a server; pytest structures the suite.",
          concepts: [
            "- client.get/post with follow_redirects.",
            "- Assert status codes and content.",
            "- Fixtures create an app + db per test.",
          ],
          example: {
            lang: "python",
            code: "import pytest\nfrom app import create_app\nfrom app.models import db\n\n@pytest.fixture()\ndef app():\n    app = create_app({'TESTING': True, 'SQLALCHEMY_DATABASE_URI': 'sqlite://'})\n    with app.app_context():\n        db.create_all()\n    yield app\n\n@pytest.fixture()\ndef client(app):\n    return app.test_client()\n\ndef test_home(client):\n    response = client.get('/')\n    assert response.status_code == 200\n    assert b'Hello' in response.data\n\ndef test_register(client):\n    response = client.post('/register', data={\n        'email': 'a@b.com',\n        'password': 'secret123',\n    }, follow_redirects=True)\n    assert response.status_code == 200\n    assert b'Welcome' in response.data",
            output: "Route-level tests with an isolated database.",
          },
          mistakes: [
            "Testing against the dev database.",
            "No fixtures — tests depend on each other.",
          ],
          bestPractices: [
            "In-memory SQLite per test.",
            "Test auth flows end to end.",
          ],
          exerciseTitle: "Route Tests",
          exerciseDescription: "Write tests for home, register, and login.",
          exerciseRequirements: [
            "Fixtures",
            "3 tests",
            "Database assertions",
          ],
          challenge: "Test 404 and 403 responses.",
          summary:
            "The test client verifies routes fast and safely.",
        }),
        lesson({
          title: "API Tests",
          slug: "flask-api-tests",
          minutes: 20,
          objective: "Test JSON APIs with tokens.",
          intro:
            "API tests POST JSON, assert status and body shape, and pass tokens where required.",
          concepts: [
            "- client.post('/api/login', json={...}).",
            "- Assert response.get_json().",
            "- Pass Authorization headers.",
          ],
          example: {
            lang: "python",
            code: "def test_api_login(client):\n    create_user('a@b.com', 'secret123')\n    res = client.post('/api/login', json={\n        'email': 'a@b.com',\n        'password': 'secret123',\n    })\n    assert res.status_code == 200\n    assert 'token' in res.get_json()\n\ndef test_api_notes_requires_token(client):\n    res = client.get('/api/notes')\n    assert res.status_code == 401",
            output: "Auth-gated API behavior verified.",
          },
          mistakes: [
            "Testing with a real external API.",
            "Not testing the 401 path.",
          ],
          bestPractices: [
            "Mock external services.",
            "Cover success and failure paths.",
          ],
          exerciseTitle: "API Tests",
          exerciseDescription: "Test login and a protected endpoint.",
          exerciseRequirements: [
            "Login test",
            "401 test",
            "Token header test",
          ],
          challenge: "Test validation returns 422.",
          summary:
            "JSON API tests lock down auth and validation.",
        }),
      ],
    },
    {
      title: "Security",
      description: "Hardening Flask apps",
      lessons: [
        lesson({
          title: "Security Headers",
          slug: "flask-security-headers",
          minutes: 15,
          objective: "Add security headers with after_request.",
          intro:
            "Set security headers on every response: CSP, X-Frame-Options, nosniff, and Referrer-Policy.",
          concepts: [
            "- @app.after_request hook.",
            "- Headers on every response.",
            "- CSP is the strongest protection.",
          ],
          example: {
            lang: "python",
            code: "@app.after_request\ndef add_security_headers(response):\n    response.headers['X-Frame-Options'] = 'DENY'\n    response.headers['X-Content-Type-Options'] = 'nosniff'\n    response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'\n    response.headers['Content-Security-Policy'] = (\n        \"default-src 'self'; style-src 'self' 'unsafe-inline'; \"\n        \"img-src 'self' data:\"\n    )\n    return response",
            output: "Every response carries the headers.",
          },
          mistakes: [
            "Setting headers per-view (missed routes).",
            "CSP too strict breaking the app.",
          ],
          bestPractices: [
            "Apply globally via after_request.",
            "Test with securityheaders.com.",
          ],
          exerciseTitle: "Headers",
          exerciseDescription: "Add the security header hook.",
          exerciseRequirements: [
            "after_request hook",
            "4+ headers",
            "Verified with curl",
          ],
          challenge: "Add a Content-Security-Policy-Report-Only mode.",
          summary:
            "Global headers harden every response.",
        }),
        lesson({
          title: "Common Attacks",
          slug: "flask-attacks",
          minutes: 20,
          objective: "Defend against XSS, CSRF, SQLi, IDOR.",
          intro:
            "Flask's defaults plus good habits cover the OWASP basics: escaping templates, CSRF tokens, parameterized ORM queries, ownership checks.",
          concepts: [
            "- XSS: Jinja escapes; avoid |safe on user data.",
            "- CSRF: Flask-WTF tokens on all POST forms.",
            "- SQLi: SQLAlchemy parameterizes; never f-strings in raw SQL.",
            "- IDOR: scope queries by current_user.",
          ],
          example: {
            lang: "python",
            code: "# GOOD: parameterized via ORM\nposts = Post.query.filter_by(user_id=current_user.id).all()\n\n# BAD: raw SQL with interpolation\n# rows = db.session.execute(\n#     text(f\"SELECT * FROM posts WHERE user_id = {user_id}\")\n# )\n\n# Use bind params if raw SQL is unavoidable:\nfrom sqlalchemy import text\nrows = db.session.execute(\n    text('SELECT * FROM posts WHERE user_id = :uid'),\n    {'uid': user_id},\n)",
            output: "Parameterized queries everywhere.",
          },
          mistakes: [
            "Building SQL strings with user input.",
            "Rendering user HTML unescaped.",
          ],
          bestPractices: [
            "Prefer the ORM.",
            "Sanitize any rich text.",
          ],
          exerciseTitle: "Hardening",
          exerciseDescription: "Audit and fix XSS, CSRF, and SQLi risks in an app.",
          exerciseRequirements: [
            "Template escape audit",
            "CSRF coverage",
            "Raw SQL review",
          ],
          challenge: "Add input length limits and rate limiting.",
          summary:
            "Defaults + ownership checks + parameterized queries close the main gaps.",
        }),
        lesson({
          title: "Rate Limiting",
          slug: "flask-rate-limit",
          minutes: 15,
          objective: "Limit login attempts and API abuse.",
          intro:
            "Flask-Limiter applies rate limits per endpoint or globally, keyed by IP or user.",
          concepts: [
            "- limiter = Limiter(key_func=get_remote_address).",
            "- @limiter.limit('5 per minute') on login.",
            "- Global defaults with per-route overrides.",
          ],
          example: {
            lang: "python",
            code: "from flask_limiter import Limiter\nfrom flask_limiter.util import get_remote_address\n\nlimiter = Limiter(key_func=get_remote_address)\nlimiter.init_app(app)\n\n@app.route('/login', methods=['POST'])\n@limiter.limit('5 per minute')\ndef login():\n    ...\n\n# API tier\n@app.route('/api/search')\n@limiter.limit('30 per minute')\ndef search():\n    ...",
            output: "Brute force and abuse throttled.",
          },
          mistakes: [
            "Limiting only login (search/APIs too).",
            "Keying by IP behind a proxy without the real IP header.",
          ],
          bestPractices: [
            "Set storage (Redis) for multi-worker apps.",
            "Return a clear 429 with retry-after.",
          ],
          exerciseTitle: "Limits",
          exerciseDescription: "Add rate limits to login and an API endpoint.",
          exerciseRequirements: [
            "Limiter configured",
            "Login limit",
            "API limit",
          ],
          challenge: "Key limits by user id when authenticated.",
          summary:
            "Rate limiting blocks brute force and API abuse.",
        }),
      ],
    },
    {
      title: "Production & Deployment",
      description: "Serving Flask in production",
      lessons: [
        lesson({
          title: "WSGI Servers",
          slug: "flask-wsgi",
          minutes: 15,
          objective: "Serve Flask with gunicorn.",
          intro:
            "Flask's dev server is for development. Production uses a WSGI server like gunicorn with multiple workers.",
          concepts: [
            "- gunicorn 'app:create_app()' --workers 4.",
            "- Workers handle concurrency; threads within.",
            "- Nginx proxies and serves static files.",
          ],
          syntax: {
            lang: "bash",
            code: "pip install gunicorn\ngunicorn -w 4 -b 0.0.0.0:8000 'app:create_app()'",
          },
          example: {
            lang: "bash",
            code: "# With systemd or a process manager\nExecStart=/home/app/.venv/bin/gunicorn -w 4 -b 127.0.0.1:8000 'app:create_app()'",
            output: "A managed multi-worker production server.",
          },
          mistakes: [
            "Running app.run() in production.",
            "No workers — single-threaded bottleneck.",
          ],
          bestPractices: [
            "4+ workers for multi-core boxes.",
            "Serve static via Nginx/CDN.",
          ],
          exerciseTitle: "Gunicorn",
          exerciseDescription: "Run the app with gunicorn and verify responses.",
          exerciseRequirements: [
            "Gunicorn installed",
            "4 workers",
            "Health check passes",
          ],
          challenge: "Add gunicorn config in a Procfile or systemd unit.",
          summary:
            "gunicorn + Nginx serve Flask reliably.",
        }),
        lesson({
          title: "Configuration & Env",
          slug: "flask-config",
          minutes: 15,
          objective: "Manage environment configuration safely.",
          intro:
            "Config comes from environment variables: database URLs, secrets, and debug flags never hardcoded.",
          concepts: [
            "- os.environ.get with defaults.",
            "- python-dotenv loads .env locally.",
            "- FLASK_DEBUG, DATABASE_URL, SECRET_KEY.",
          ],
          example: {
            lang: "python",
            code: "import os\n\nclass Config:\n    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-only'\n    SQLALCHEMY_DATABASE_URI = os.environ.get(\n        'DATABASE_URL',\n        'sqlite:///dev.db',\n    )\n    JWT_SECRET = os.environ.get('JWT_SECRET', SECRET_KEY)\n\nclass ProductionConfig(Config):\n    DEBUG = False\n\nconfig = {\n    'development': Config,\n    'production': ProductionConfig,\n}\n\n# app = create_app(os.environ.get('FLASK_ENV', 'development'))",
            output: "Environment-driven configuration.",
          },
          mistakes: [
            "Committing .env with secrets.",
            "Hardcoding prod database URLs.",
          ],
          bestPractices: [
            "Validate required vars at startup.",
            "Keep .env.example documented.",
          ],
          exerciseTitle: "Config",
          exerciseDescription: "Refactor config into classes with env vars.",
          exerciseRequirements: [
            "Env-driven settings",
            "Dev/prod classes",
            "Secrets out of code",
          ],
          challenge: "Fail fast when SECRET_KEY is missing in production.",
          summary:
            "Environment variables drive configuration safely.",
        }),
        lesson({
          title: "Containerizing & Deploying",
          slug: "flask-deploy",
          minutes: 20,
          objective: "Deploy Flask with Docker.",
          intro:
            "Docker packages the app with its dependencies for consistent deploys on any platform.",
          concepts: [
            "- Multi-stage Dockerfile: deps then runtime.",
            "- Non-root user for security.",
            "- Healthcheck endpoint for orchestrators.",
          ],
          example: {
            lang: "docker",
            code: "FROM python:3.12-slim\n\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\n\nCOPY . .\n\nRUN useradd -m appuser\nUSER appuser\n\nEXPOSE 8000\nCMD [\"gunicorn\", \"-w\", \"4\", \"-b\", \"0.0.0.0:8000\", \"app:create_app()\"]",
            output: "A hardened, portable image.",
          },
          mistakes: [
            "Running as root in the container.",
            "Copying .env into the image.",
          ],
          bestPractices: [
            "Pass env at runtime, not build time.",
            "Pin base image tags.",
          ],
          exerciseTitle: "Deploy",
          exerciseDescription: "Containerize and deploy the app to a host.",
          exerciseRequirements: [
            "Dockerfile",
            "Non-root user",
            "Deployed + health check",
          ],
          challenge: "Add a docker-compose with a database service.",
          summary:
            "Docker standardizes Flask deploys anywhere.",
        }),
      ],
    },
    {
      title: "Real World Project — Task Manager API",
      description: "Build a full task API with auth",
      lessons: [
        lesson({
          title: "Project Planning",
          slug: "flask-project-plan",
          minutes: 25,
          objective: "Plan a task manager: models, endpoints, auth.",
          intro:
            "The final module builds a task manager API: users with JWT auth, tasks CRUD with ownership, and validation.",
          concepts: [
            "- Models: User, Task (user_id, title, done, due).",
            "- Endpoints: auth + task CRUD.",
            "- Ownership scoping everywhere.",
          ],
          example: {
            lang: "text",
            code: "app/\n  models.py       # User, Task\n  schemas.py      # marshmallow\n  routes/\n    auth.py       # /api/register, /api/login\n    tasks.py      # /api/tasks CRUD\n  security.py     # token_required, role checks\nconfig.py\ntests/",
            output: "A clear project map.",
          },
          mistakes: [
            "Skipping schemas — ad hoc validation.",
            "Forgetting the ownership scope.",
          ],
          bestPractices: [
            "Design endpoints before writing code.",
            "Plan tests alongside features.",
          ],
          exerciseTitle: "Plan & Models",
          exerciseDescription: "Create the models, schemas, and route structure.",
          exerciseRequirements: [
            "2 models",
            "2 schemas",
            "Blueprint structure",
          ],
          challenge: "Add tags as a many-to-many relation.",
          summary:
            "Plan-first: models, schemas, and routes mapped.",
        }),
        lesson({
          title: "Core Implementation",
          slug: "flask-project-core",
          minutes: 35,
          objective: "Implement auth and task CRUD.",
          intro:
            "Build register/login with JWT, then task CRUD with the token_required decorator and ownership-scoped queries.",
          concepts: [
            "- JWT login + decorator.",
            "- CRUD endpoints returning 201/200/204.",
            "- Ownership in every query.",
          ],
          example: {
            lang: "python",
            code: "@tasks_bp.route('', methods=['POST'])\n@token_required\n@limiter.limit('30 per minute')\ndef create_task(payload):\n    data = TaskSchema().load(request.get_json() or {})\n    task = Task(user_id=int(payload['sub']), **data)\n    db.session.add(task)\n    db.session.commit()\n    return TaskSchema().dump(task), 201\n\n@tasks_bp.route('/<int:task_id>', methods=['PUT'])\n@token_required\ndef update_task(payload):\n    task = Task.query.filter_by(\n        id=task_id,\n        user_id=int(payload['sub']),\n    ).first_or_404()\n    for key, value in TaskSchema().load(request.get_json() or {}).items():\n        setattr(task, key, value)\n    db.session.commit()\n    return TaskSchema().dump(task)",
            output: "Authenticated, ownership-scoped CRUD.",
          },
          mistakes: [
            "Updating by id without user scope.",
            "Not limiting creation rate.",
          ],
          bestPractices: [
            "Scope + validate + limit.",
            "Return consistent status codes.",
          ],
          exerciseTitle: "CRUD",
          exerciseDescription: "Implement all task endpoints with auth.",
          exerciseRequirements: [
            "5 endpoints",
            "Ownership everywhere",
            "Validation via schema",
          ],
          challenge: "Add filtering and pagination to the list.",
          summary:
            "Auth + ownership + validation make the API solid.",
        }),
        lesson({
          title: "Testing & Shipping",
          slug: "flask-project-ship",
          minutes: 30,
          objective: "Test the API and deploy it.",
          intro:
            "Finish with API tests covering auth and ownership, then deploy with gunicorn or Docker.",
          concepts: [
            "- Tests: register, login, CRUD, cross-user 404.",
            "- Test DB isolation via fixtures.",
            "- Deploy with env config.",
          ],
          example: {
            lang: "python",
            code: "def test_cross_user_blocked(app, client):\n    token_a = register_and_login(client, 'a@b.com')\n    token_b = register_and_login(client, 'b@b.com')\n\n    # A creates a task\n    res = client.post('/api/tasks', json={'title': 'A task'},\n                      headers={'Authorization': 'Bearer ' + token_a})\n    task_id = res.get_json()['id']\n\n    # B tries to edit it -> 404\n    res = client.put(f'/api/tasks/{task_id}', json={'done': True},\n                     headers={'Authorization': 'Bearer ' + token_b})\n    assert res.status_code == 404",
            output: "Ownership is proven by tests.",
          },
          mistakes: [
            "Only happy-path tests.",
            "Testing against the live database.",
          ],
          bestPractices: [
            "Test security properties explicitly.",
            "Run tests in CI.",
          ],
          exerciseTitle: "Ship",
          exerciseDescription: "Write the API test suite and deploy.",
          exerciseRequirements: [
            "Auth + ownership tests",
            "Deployment config",
            "Live health check",
          ],
          challenge: "Add Swagger/OpenAPI docs.",
          summary:
            "Security tests and a real deploy finish the project.",
        }),
      ],
    },
    {
      title: "Session Management",
      description: "Cookies, flash messages, and session security",
      lessons: [
        lesson({
          title: "Cookies & Flash Messages",
          slug: "flask-cookies-flash",
          minutes: 20,
          objective: "Read cookies and use flash messages.",
          intro:
            "Cookies persist small data client-side; flash messages show one-time notifications after redirects — both are core Flask patterns.",
          concepts: [
            "- `request.cookies.get('theme')` reads; `make_response().set_cookie()` writes.",
            "- `flash('Saved!', 'success')` queues a message for the next request.",
            "- Templates render flashed messages via `get_flashed_messages()`.",
          ],
          example: {
            lang: "python",
            code: "from flask import flash, make_response, redirect, render_template, request, url_for\n\n@app.route('/settings/theme', methods=['POST'])\ndef set_theme():\n    theme = request.form.get('theme', 'light')\n    response = make_response(redirect(url_for('settings')))\n    response.set_cookie('theme', theme, max_age=60 * 60 * 24 * 30, httponly=True, samesite='Lax')\n    flash('Theme updated!', 'success')\n    return response\n\n# Template:\n# {% with messages = get_flashed_messages(with_categories=true) %}\n#   {% for category, message in messages %}\n#     <div class=\"{{ category }}\">{{ message }}</div>\n#   {% endfor %}\n# {% endwith %}",
            output: "Theme persists via cookie; the next page shows the flash.",
          },
          mistakes: [
            "Not setting httponly on cookies that carry state.",
            "Storing secrets in cookies without signing.",
          ],
          bestPractices: [
            "Keep cookie payloads small and non-sensitive.",
            "Use flash for post-redirect notifications.",
          ],
          exerciseTitle: "Theme Cookie",
          exerciseDescription: "Build a theme toggle that persists in a cookie with a flash confirmation.",
          exerciseRequirements: ["Set + read cookie", "Flash message", "Secure flags"],
          challenge: "Apply the theme to the page via a template variable.",
          summary:
            "Cookies and flash messages handle persistence and one-time notices.",
        }),
        lesson({
          title: "Signed Sessions",
          slug: "flask-signed-sessions",
          minutes: 20,
          objective: "Understand how Flask sessions are signed.",
          intro:
            "Flask's session is a signed cookie: the payload is visible but tamper-proof thanks to its secret key.",
          concepts: [
            "- `session['user_id'] = ...` stores into a signed cookie.",
            "- `app.secret_key` signs and verifies every session.",
            "- Never store sensitive data — the payload is only base64-encoded.",
          ],
          example: {
            lang: "python",
            code: "from flask import Flask, session\n\napp = Flask(__name__)\napp.secret_key = os.environ['SECRET_KEY']  # never hardcode\n\n@app.route('/visit')\ndef visit():\n    session['visits'] = session.get('visits', 0) + 1\n    return f'Visits: {session['visits']}'",
            output: "A tamper-proof visit counter across requests.",
          },
          mistakes: [
            "Storing passwords or tokens in the session payload.",
            "Using a weak or committed secret_key.",
          ],
          bestPractices: [
            "Store only ids and small flags.",
            "Rotate the secret key in production.",
          ],
          exerciseTitle: "Visit Counter",
          exerciseDescription: "Track visits in a signed session.",
          exerciseRequirements: ["Env secret key", "Session read/write", "Tamper test"],
          challenge: "Invalidate all sessions by rotating the secret.",
          summary:
            "Signed sessions give tamper-proof, stateless login state.",
        }),
        lesson({
          title: "Session Security",
          slug: "flask-session-security",
          minutes: 15,
          objective: "Protect sessions from fixation and theft.",
          intro:
            "Session hardening: regenerate ids on privilege change, set cookie flags, and expire sessions.",
          concepts: [
            "- `session.clear()` then re-set on login to prevent fixation.",
            "- SESSION_COOKIE_HTTPONLY and SESSION_COOKIE_SAMESITE config.",
            "- SESSION_COOKIE_SECURE in production.",
          ],
          example: {
            lang: "python",
            code: "# config.py\nclass Config:\n    SESSION_COOKIE_HTTPONLY = True\n    SESSION_COOKIE_SAMESITE = 'Lax'\n    SESSION_COOKIE_SECURE = os.environ.get('ENV') == 'production'\n    PERMANENT_SESSION_LIFETIME = timedelta(hours=24)\n\n# On login:\n@app.route('/login', methods=['POST'])\ndef login():\n    user = authenticate(...)\n    if user:\n        session.clear()          # prevent fixation\n        session['user_id'] = user.id\n        session.permanent = True  # apply the lifetime\n        return redirect(url_for('dashboard'))",
            output: "Fixation-safe, flagged, 24-hour sessions.",
          },
          mistakes: [
            "Not clearing the session on login.",
            "Sending session cookies over http in production.",
          ],
          bestPractices: [
            "Clear + re-set on login/logout.",
            "Set the lifetime to match your policy.",
          ],
          exerciseTitle: "Harden Sessions",
          exerciseDescription: "Apply the session config flags and fixation prevention.",
          exerciseRequirements: ["All cookie flags", "Lifetime set", "session.clear on login"],
          challenge: "Add an idle-timeout sliding window.",
          summary:
            "Flags, lifetimes, and regeneration keep sessions secure.",
        }),
      ],
    },
    {
      title: "Background Tasks",
      description: "Celery, threads, and async work",
      lessons: [
        lesson({
          title: "Why Background Tasks",
          slug: "flask-background-intro",
          minutes: 15,
          objective: "Move slow work out of the request.",
          intro:
            "Emails, reports, and uploads shouldn't block responses. Background tasks return quickly and finish asynchronously.",
          concepts: [
            "- Requests should return in milliseconds, not seconds.",
            "- Options: threads, the `background` param, or Celery.",
            "- Celery scales: queues, retries, scheduling.",
          ],
          example: {
            lang: "python",
            code: "from flask import Response\n\n@app.route('/reports/generate', methods=['POST'])\ndef generate_report():\n    # Offload with a thread pool executor\n    executor.submit(build_report, request.json['report_id'])\n    return Response(status=202)  # Accepted — work is queued",
            output: "The request returns immediately; the report builds in the background.",
          },
          mistakes: [
            "Doing 30-second work synchronously in a view.",
            "Using threads for CPU-heavy work on a single worker.",
          ],
          bestPractices: [
            "Return 202 with a job id.",
            "Prefer Celery when you need retries and scheduling.",
          ],
          exerciseTitle: "Async Pattern",
          exerciseDescription: "Convert a slow endpoint to the 202 + background pattern.",
          exerciseRequirements: ["Background execution", "202 response", "Job status endpoint"],
          challenge: "Add a job status table.",
          summary:
            "Background tasks keep responses fast and work reliable.",
        }),
        lesson({
          title: "Celery Basics",
          slug: "flask-celery",
          minutes: 25,
          objective: "Set up Celery with Flask.",
          intro:
            "Celery runs tasks in worker processes with a broker (Redis) and result backend, adding retries and scheduling.",
          concepts: [
            "- Broker Redis holds the queue; workers consume tasks.",
            "- `@celery.task` decorates functions; `send_task.delay(...)` queues.",
            "- Workers run `celery -A app.celery_app worker`.",
          ],
          example: {
            lang: "python",
            code: "# tasks.py\nfrom celery import Celery\n\ncelery_app = Celery('app', broker='redis://localhost:6379/0')\n\n@celery_app.task(bind=True, max_retries=3)\ndef send_welcome_email(self, email):\n    try:\n        mailer.send(email)\n    except Exception as exc:\n        raise self.retry(exc=exc, countdown=30)\n\n# In a view:\n# send_welcome_email.delay(user.email)",
            output: "Emails send in workers with automatic retries.",
          },
          mistakes: [
            "Forgetting the worker process is separate from Flask.",
            "No retry policy for flaky tasks.",
          ],
          bestPractices: [
            "Design tasks idempotent — they can run twice.",
            "Use countdown backoff for retries.",
          ],
          exerciseTitle: "Email Task",
          exerciseDescription: "Queue a welcome email with Celery and run a worker.",
          exerciseRequirements: ["Celery app", "Task with retry", "Worker run"],
          challenge: "Add a beat schedule for daily digests.",
          summary:
            "Celery brings queues, retries, and schedules to Flask.",
        }),
      ],
    },
    {
      title: "Logging & Monitoring",
      description: "Observing your application",
      lessons: [
        lesson({
          title: "Structured Logging",
          slug: "flask-logging",
          minutes: 20,
          objective: "Log structured, searchable records.",
          intro:
            "Good logs answer 'what happened, when, and to whom'. Structured JSON logs make them searchable in any log platform.",
          concepts: [
            "- Python's `logging` module with handlers per level.",
            "- JSON formatters for machine-readable logs.",
            "- Log with context: user id, request id, latency.",
          ],
          example: {
            lang: "python",
            code: "import logging\nfrom flask import request\n\nlogger = logging.getLogger('app')\n\n@app.before_request\ndef start_timer():\n    request._start = time.time()\n\n@app.after_request\ndef log_request(response):\n    latency = (time.time() - request._start) * 1000\n    logger.info(\n        'request',\n        extra={\n            'method': request.method,\n            'path': request.path,\n            'status': response.status_code,\n            'latency_ms': round(latency, 2),\n            'user_id': getattr(g, 'user_id', None),\n        },\n    )\n    return response",
            output: "Every request logs method, path, status, and latency.",
          },
          mistakes: [
            "Logging sensitive data (passwords, tokens).",
            "Using print() instead of the logging module.",
          ],
          bestPractices: [
            "Log at the right level (info vs warning vs error).",
            "Never log secrets.",
          ],
          exerciseTitle: "Request Logger",
          exerciseDescription: "Add before/after request logging with context.",
          exerciseRequirements: ["Structured fields", "Latency tracking", "Levels used"],
          challenge: "Send logs to a JSON formatter.",
          summary:
            "Structured logs make debugging and monitoring fast.",
        }),
        lesson({
          title: "Error Tracking",
          slug: "flask-error-tracking",
          minutes: 20,
          objective: "Capture and alert on errors.",
          intro:
            "Logging alone misses silent failures. Error trackers (Sentry) capture exceptions with stack traces and context.",
          concepts: [
            "- Sentry SDK init with DSN from env.",
            "- Unhandled exceptions auto-report.",
            "- Set user context for issue attribution.",
          ],
          example: {
            lang: "python",
            code: "import sentry_sdk\nfrom sentry_sdk.integrations.flask import FlaskIntegration\n\nsentry_sdk.init(\n    dsn=os.environ.get('SENTRY_DSN'),\n    integrations=[FlaskIntegration()],\n    traces_sample_rate=0.2,\n)\n\n@app.before_request\ndef set_user_context():\n    if hasattr(g, 'user'):\n        sentry_sdk.set_user({'id': g.user.id, 'email': g.user.email})",
            output: "Exceptions and slow traces land in Sentry with user context.",
          },
          mistakes: [
            "Committing the DSN in the repo.",
            "Reporting every 4xx as an error.",
          ],
          bestPractices: [
            "Set environment tags (production, staging).",
            "Sample traces in high-traffic apps.",
          ],
          exerciseTitle: "Sentry Setup",
          exerciseDescription: "Initialize Sentry and verify an exception is captured.",
          exerciseRequirements: ["SDK init", "User context", "Test capture"],
          challenge: "Add performance tracing for slow endpoints.",
          summary:
            "Error tracking surfaces failures before users do.",
        }),
      ],
    },
  ],
};