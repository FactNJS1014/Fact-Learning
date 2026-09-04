import type { ModuleContent } from "../seed-content";
import { lesson } from "./lesson-builder";

// Modules 13–20 for the Django course (tops the course up to 20 modules).
export const djangoExtraModules: ModuleContent[] = [
  {
    title: "Caching & Performance",
    description: "Speed up Django with caching and query optimization",
    lessons: [
      lesson({
        title: "Caching Basics",
        slug: "django-caching",
        minutes: 20,
        objective: "Cache expensive views and queries.",
        intro:
          "Django's cache framework stores computed results so repeated requests skip expensive work. Backends include in-memory, file, and database/Redis caches.",
        concepts: [
          "- cache_page decorator caches whole views by URL.",
          "- The low-level cache API: cache.set / cache.get.",
          "- Template fragment caching with {% cache %}.",
        ],
        example: {
          lang: "python",
          code: "from django.core.cache import cache\nfrom django.views.decorators.cache import cache_page\n\n@cache_page(60 * 15)  # 15 minutes\n\ndef dashboard(request):\n    ...\n\n# Low-level API\ndef expensive_report():\n    key = 'report:v1'\n    data = cache.get(key)\n    if data is None:\n        data = compute_expensive_report()\n        cache.set(key, data, timeout=3600)\n    return data",
          output: "Repeated requests served from cache.",
        },
        mistakes: [
          "Caching user-specific data without keying by user.",
          "Never invalidating caches after writes.",
        ],
        bestPractices: [
          "Key caches by version + relevant inputs.",
          "Use Redis in production for shared cache.",
        ],
        exerciseTitle: "Cache It",
        exerciseDescription: "Add view-level and low-level caching to a slow page.",
        exerciseRequirements: ["cache_page on a view", "Low-level cache with timeout", "Invalidation on model save"],
        challenge: "Add template fragment caching.",
        summary: "Caching turns expensive work into fast lookups.",
      }),
      lesson({
        title: "Database Performance",
        slug: "django-db-performance",
        minutes: 20,
        objective: "Fix N+1 queries and add indexes.",
        intro:
          "Most Django slowness is database slowness: N+1 queries, missing indexes, and unbounded list queries.",
        concepts: [
          "- select_related for FK joins (one query).",
          "- prefetch_related for M2M and reverse relations.",
          "- indexes in Meta and db_index on hot columns.",
        ],
        example: {
          lang: "python",
          code: "class Post(models.Model):\n    author = models.ForeignKey(User, on_delete=models.CASCADE)\n    tags = models.ManyToManyField('Tag')\n\n    class Meta:\n        indexes = [\n            models.Index(fields=['-created_at']),\n            models.Index(fields=['status', 'created_at']),\n        ]\n\n# Fix N+1: use in views\ndef post_list(request):\n    posts = Post.objects.select_related('author').prefetch_related('tags')\n    return render(request, 'posts/list.html', {'posts': posts})",
          output: "2 queries instead of 1+N.",
        },
        mistakes: [
          "Calling .all() then looping and touching relations.",
          "Indexing every column (write slowdown).",
        ],
        bestPractices: [
          "Profile with django-debug-toolbar first.",
          "Index columns used in filters and order_by.",
        ],
        exerciseTitle: "Optimize",
        exerciseDescription: "Eliminate an N+1 and add an index.",
        exerciseRequirements: ["select_related/prefetch_related", "New index", "Queries counted before/after"],
        challenge: "Use only() and defer() to trim columns.",
        summary: "Eager loading and indexes fix most slow pages.",
      }),
      lesson({
        title: "Query Optimization",
        slug: "django-query-opt",
        minutes: 15,
        objective: "Analyze and optimize queries.",
        intro:
          "EXPLAIN shows how PostgreSQL executes a query. Django's .explain() exposes it, revealing sequential scans and missing indexes.",
        concepts: [
          "- qs.explain() runs EXPLAIN on a queryset.",
          "- Only fetch needed columns with .only().",
          "- Use .values() / .values_list() for lightweight data.",
        ],
        example: {
          lang: "python",
          code: "print(Post.objects.filter(status='published').explain())\n\n# Lightweight projections\ntitles = Post.objects.filter(status='published').values_list('title', flat=True)\n\n# Count without loading rows\ncount = Post.objects.filter(status='published').count()",
          output: "Query plan output and cheaper queries.",
        },
        mistakes: [
          "len(qs) instead of qs.count().",
          "Loading full models for one field.",
        ],
        bestPractices: [
          "EXPLAIN before and after changes.",
          "Profile at scale, not just on tiny datasets.",
        ],
        exerciseTitle: "Explain",
        exerciseDescription: "Run explain() on a slow query and fix it.",
        exerciseRequirements: ["EXPLAIN output", "values() projection", "count() instead of len()"],
        challenge: "Create a covering index.",
        summary: "EXPLAIN and projections keep queries lean.",
      }),
    ],
  },
  {
    title: "Advanced ORM",
    description: "Aggregations, F expressions, transactions",
    lessons: [
      lesson({
        title: "Aggregation & Annotation",
        slug: "django-aggregation",
        minutes: 25,
        objective: "Compute stats in the database.",
        intro:
          "aggregate() returns single values (SUM, AVG); annotate() adds per-row computed fields, both executed in SQL.",
        concepts: [
          "- from django.db.models import Count, Sum, Avg, F.",
          "- qs.aggregate(total=Sum('price')).",
          "- qs.annotate(comment_count=Count('comments')).",
        ],
        example: {
          lang: "python",
          code: "from django.db.models import Count, Sum, Avg\n\n# Overall stats\nstats = Order.objects.aggregate(\n    total=Sum('total'),\n    average=Avg('total'),\n    orders=Count('id'),\n)\n\n# Per-product stats\nproducts = Product.objects.annotate(\n    units_sold=Sum('order_items__quantity'),\n    review_count=Count('reviews'),\n)",
          output: "Aggregates computed in one query each.",
        },
        mistakes: [
          "Looping in Python to compute totals.",
          "Mixing annotate and filter order incorrectly.",
        ],
        bestPractices: [
          "Filter before annotate when counts depend on it.",
          "Use distinct=True for M2M counts.",
        ],
        exerciseTitle: "Stats",
        exerciseDescription: "Add aggregate stats and per-row annotations.",
        exerciseRequirements: ["aggregate()", "annotate()", "One query verified"],
        challenge: "Annotate with conditional Count.",
        summary: "Aggregations keep statistics in the database.",
      }),
      lesson({
        title: "F Expressions & Transactions",
        slug: "django-f-transactions",
        minutes: 25,
        objective: "Atomic updates and safe transactions.",
        intro:
          "F() expressions update values in SQL without read-modify-write races; transaction.atomic() groups operations that must all succeed together.",
        concepts: [
          "- Post.objects.filter(id=pk).update(views=F('views') + 1).",
          "- with transaction.atomic(): ...",
          "- select_for_update() locks rows in transactions.",
        ],
        example: {
          lang: "python",
          code: "from django.db import transaction\nfrom django.db.models import F\n\n# Race-free increment\nPost.objects.filter(id=42).update(views=F('views') + 1)\n\n# All-or-nothing\ndef transfer(sender, receiver, amount):\n    with transaction.atomic():\n        Account.objects.filter(id=sender).update(balance=F('balance') - amount)\n        Account.objects.filter(id=receiver).update(balance=F('balance') + amount)",
          output: "Atomic, race-free balance updates.",
        },
        mistakes: [
          "Read-then-write patterns without F().",
          "Catching exceptions outside transaction.atomic().",
        ],
        bestPractices: [
          "Use F() for counters and balances.",
          "Keep transactions short.",
        ],
        exerciseTitle: "Atomic Ops",
        exerciseDescription: "Rewrite an increment and a transfer atomically.",
        exerciseRequirements: ["F() increment", "transaction.atomic()", "Test concurrency safety"],
        challenge: "Add select_for_update to the transfer.",
        summary: "F() and transactions prevent races and partial writes.",
      }),
      lesson({
        title: "Custom QuerySets",
        slug: "django-querysets",
        minutes: 20,
        objective: "Encapsulate query logic in QuerySet methods.",
        intro:
          "Custom QuerySet methods chain like built-ins and live close to the model, keeping views thin.",
        concepts: [
          "- class PostQuerySet(models.QuerySet) with methods.",
          "- Post.objects = PostQuerySet.as_manager().",
          "- Chainable: Post.objects.published().featured().",
        ],
        example: {
          lang: "python",
          code: "class PostQuerySet(models.QuerySet):\n    def published(self):\n        return self.filter(status='published')\n\n    def by_author(self, user):\n        return self.filter(author=user)\n\n    def with_counts(self):\n        return self.annotate(comment_count=Count('comments'))\n\nclass Post(models.Model):\n    objects = PostQuerySet.as_manager()\n\n# Usage\nposts = Post.objects.published().by_author(request.user).with_counts()",
          output: "Readable, reusable, chainable queries.",
        },
        mistakes: [
          "Duplicating filter chains across views.",
          "Static helper functions instead of QuerySet methods.",
        ],
        bestPractices: [
          "Name methods as filters (published, featured).",
          "Return self from filters for chaining.",
        ],
        exerciseTitle: "QuerySet API",
        exerciseDescription: "Create a custom QuerySet with 3 chainable methods.",
        exerciseRequirements: ["QuerySet subclass", "as_manager()", "Chained usage"],
        challenge: "Add a .search(term) full-text method.",
        summary: "QuerySet methods package query logic into a clean API.",
      }),
    ],
  },
  {
    title: "Internationalization",
    description: "Translations, locales, and timezones",
    lessons: [
      lesson({
        title: "i18n Basics",
        slug: "django-i18n",
        minutes: 20,
        objective: "Translate strings with gettext.",
        intro:
          "Django's i18n machinery wraps user-facing strings in translation functions (gettext, gettext_lazy) and extracts them into .po files.",
        concepts: [
          "- from django.utils.translation import gettext as _.",
          "- {% trans %} and {% blocktranslate %} in templates.",
          "- makemessages / compilemessages commands.",
        ],
        example: {
          lang: "python",
          code: "# Python\nfrom django.utils.translation import gettext as _\n\ndef index(request):\n    return render(request, 'index.html', {\n        'welcome': _('Welcome to our site'),\n    })\n\n# Template\n{% load i18n %}\n<h1>{% trans \"Welcome to our site\" %}</h1>\n<p>{% blocktranslate with name=user.name %}Hello {{ name }}!{% endblocktranslate %}</p>",
          output: "Strings marked for translation.",
        },
        mistakes: [
          "Hardcoding user-facing strings.",
          "Forgetting {% load i18n %} in templates.",
        ],
        bestPractices: [
          "Use gettext_lazy in models/forms.",
          "Wrap blocktranslate for strings with variables.",
        ],
        exerciseTitle: "Translate",
        exerciseDescription: "Mark 5 strings for translation and extract them.",
        exerciseRequirements: ["gettext in Python", "trans in templates", "makemessages runs"],
        challenge: "Compile a French .po file.",
        summary: "gettext marks strings so translators can localize them.",
      }),
      lesson({
        title: "Locale Settings",
        slug: "django-locales",
        minutes: 15,
        objective: "Configure languages and locale middleware.",
        intro:
          "LANGUAGES, LANGUAGE_CODE, and LocaleMiddleware let users pick languages and serve translated content per request.",
        concepts: [
          "- USE_I18N = True and LANGUAGES list.",
          "- LocaleMiddleware detects language from headers/cookies.",
          "- TIME_ZONE and USE_TZ for datetimes.",
        ],
        example: {
          lang: "python",
          code: "# settings.py\nLANGUAGE_CODE = 'en'\nLANGUAGES = [('en', 'English'), ('th', 'ไทย'), ('fr', 'Français')]\nTIME_ZONE = 'Asia/Bangkok'\nUSE_I18N = True\nUSE_TZ = True\n\nMIDDLEWARE = [\n    ...\n    'django.middleware.locale.LocaleMiddleware',\n    ...\n]",
          output: "Multi-language site with correct times.",
        },
        mistakes: [
          "Forgetting LocaleMiddleware (locale never activates).",
          "Timezone-naive datetimes with USE_TZ on.",
        ],
        bestPractices: [
          "Store datetimes in UTC; display in local time.",
          "Provide a language switcher view.",
        ],
        exerciseTitle: "Locales",
        exerciseDescription: "Enable 3 languages and a language switcher.",
        exerciseRequirements: ["LANGUAGES config", "LocaleMiddleware", "Switcher view"],
        challenge: "Add per-language URL prefixes.",
        summary: "Locale settings make a site speak many languages.",
      }),
    ],
  },
  {
    title: "Background Tasks",
    description: "Celery, scheduling, and emails",
    lessons: [
      lesson({
        title: "Celery Setup",
        slug: "django-celery",
        minutes: 25,
        objective: "Run long jobs outside the request cycle.",
        intro:
          "Celery executes tasks asynchronously with a broker (Redis). Emails, reports, and image processing belong in tasks, not views.",
        concepts: [
          "- Celery app in celery.py auto-discovered.",
          "- @shared_task decorator on callables.",
          "- task.delay(...) queues work.",
        ],
        example: {
          lang: "python",
          code: "# celery.py\nfrom celery import Celery\n\napp = Celery('config')\napp.config_from_object('django.conf:settings', namespace='CELERY')\napp.autodiscover_tasks()\n\n# tasks.py\nfrom celery import shared_task\n\n@shared_task\ndef send_welcome_email(user_id):\n    user = User.objects.get(id=user_id)\n    send_mail('Welcome!', 'Thanks for joining.', 'noreply@example.com', [user.email])\n\n# view\nsend_welcome_email.delay(user.id)\n\n# settings.py\nCELERY_BROKER_URL = 'redis://localhost:6379/0'",
          output: "Email sent asynchronously by a worker.",
        },
        mistakes: [
          "Doing slow work in the request cycle.",
          "Passing model instances (not ids) to tasks.",
        ],
        bestPractices: [
          "Pass primary keys, re-fetch inside the task.",
          "Make tasks idempotent.",
        ],
        exerciseTitle: "First Task",
        exerciseDescription: "Set up Celery and move an email into a task.",
        exerciseRequirements: ["Celery app", "shared_task", "delay() used from a view"],
        challenge: "Add task retries with exponential backoff.",
        summary: "Celery moves slow work out of request handling.",
      }),
      lesson({
        title: "Schedules & Emails",
        slug: "django-schedules",
        minutes: 20,
        objective: "Schedule periodic tasks and send emails.",
        intro:
          "Celery Beat runs periodic tasks (daily digests, reminders); Django's email framework sends plain or HTML mail with attachments.",
        concepts: [
          "- CELERY_BEAT_SCHEDULE with crontab.",
          "- send_mail and EmailMultiAlternatives for HTML.",
          "- Configure SMTP via EMAIL_* settings.",
        ],
        example: {
          lang: "python",
          code: "# settings.py\nfrom celery.schedules import crontab\n\nCELERY_BEAT_SCHEDULE = {\n    'daily-digest': {\n        'task': 'accounts.tasks.send_daily_digest',\n        'schedule': crontab(hour=8, minute=0),\n    },\n}\n\n# tasks.py\n@shared_task\ndef send_daily_digest():\n    from django.core.mail import EmailMultiAlternatives\n    for user in User.objects.filter(is_active=True):\n        html = render_to_string('emails/digest.html', {'user': user})\n        msg = EmailMultiAlternatives('Your daily digest', 'plain version', 'noreply@example.com', [user.email])\n        msg.attach_alternative(html, 'text/html')\n        msg.send()",
          output: "A scheduled daily email digest.",
        },
        mistakes: [
          "Sending email inline in views.",
          "Scheduling without testing the task directly.",
        ],
        bestPractices: [
          "Use a mail queue (e.g., django-anymail).",
          "Log failures and retry.",
        ],
        exerciseTitle: "Digest",
        exerciseDescription: "Create a scheduled daily digest email.",
        exerciseRequirements: ["Beat schedule", "HTML email", "Task tested manually"],
        challenge: "Add a weekly report attachment (CSV).",
        summary: "Beat schedules and email templates automate outreach.",
      }),
    ],
  },
  {
    title: "Real-Time with Channels",
    description: "WebSockets and live updates",
    lessons: [
      lesson({
        title: "Channels Intro",
        slug: "django-channels",
        minutes: 25,
        objective: "Add WebSocket support with Channels.",
        intro:
          "Django Channels extends Django to handle WebSockets, letting you push live data instead of polling.",
        concepts: [
          "- ASGI application replaces WSGI for realtime.",
          "- Channels layer (Redis) routes events between processes.",
          "- Consumers handle connect/receive/disconnect.",
        ],
        example: {
          lang: "python",
          code: "# config/asgi.py\nimport os\nfrom django.core.asgi import get_asgi_application\nfrom channels.routing import ProtocolTypeRouter, URLRouter\n\nos.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')\n\napplication = ProtocolTypeRouter({\n    'http': get_asgi_application(),\n    'websocket': URLRouter([path('ws/chat/', ChatConsumer.as_asgi())]),\n})",
          output: "An ASGI app accepting WebSockets.",
        },
        mistakes: [
          "Running Channels with WSGI servers (gunicorn).",
          "Forgetting the channel layer for cross-process events.",
        ],
        bestPractices: [
          "Run Daphne or Uvicorn with ASGI.",
          "Use Redis as the channel layer in production.",
        ],
        exerciseTitle: "ASGI Setup",
        exerciseDescription: "Convert the project to ASGI and route a WebSocket.",
        exerciseRequirements: ["ASGI config", "ProtocolTypeRouter", "One websocket route"],
        challenge: "Add an auth middleware for the socket.",
        summary: "Channels adds realtime to Django via ASGI.",
      }),
      lesson({
        title: "Consumers & Groups",
        slug: "django-consumers",
        minutes: 25,
        objective: "Broadcast messages with channel groups.",
        intro:
          "Consumers handle socket events; channel groups broadcast a message to every connected member.",
        concepts: [
          "- async_to_sync(channel_layer.group_add).",
          "- group_send broadcasts JSON payloads.",
          "- receive() parses messages from clients.",
        ],
        example: {
          lang: "python",
          code: "from channels.generic.websocket import AsyncWebsocketConsumer\nimport json\n\nclass ChatConsumer(AsyncWebsocketConsumer):\n    async def connect(self):\n        self.room = self.scope['url_route']['kwargs']['room']\n        await self.channel_layer.group_add(self.room, self.channel_name)\n        await self.accept()\n\n    async def disconnect(self, code):\n        await self.channel_layer.group_discard(self.room, self.channel_name)\n\n    async def receive(self, text_data):\n        data = json.loads(text_data)\n        await self.channel_layer.group_send(\n            self.room,\n            {'type': 'chat.message', 'message': data['message']},\n        )\n\n    async def chat_message(self, event):\n        await self.send(text_data=json.dumps({'message': event['message']}))",
          output: "Every client in the room receives messages.",
        },
        mistakes: [
          "Sending only to self instead of the group.",
          "Not handling disconnects (stale group members).",
        ],
        bestPractices: [
          "Validate/sanitize incoming socket data.",
          "Name event types with dots (chat.message).",
        ],
        exerciseTitle: "Chat Room",
        exerciseDescription: "Broadcast messages to a room group.",
        exerciseRequirements: ["group_add on connect", "group_send", "Client receives broadcast"],
        challenge: "Persist messages to the database.",
        summary: "Groups turn one-to-one sockets into rooms.",
      }),
      lesson({
        title: "Live Notifications",
        slug: "django-live-notify",
        minutes: 20,
        objective: "Push notifications to logged-in users.",
        intro:
          "Combine Channels with auth: only deliver socket events to the right user by naming groups after user ids.",
        concepts: [
          "- scope['user'] is set by Channels auth middleware.",
          "- Group name per user: user_{id}.",
          "- Trigger sends from models via post_save signals.",
        ],
        example: {
          lang: "python",
          code: "from channels.auth import AuthMiddlewareStack\nfrom channels.routing import URLRouter\n\napplication = ProtocolTypeRouter({\n    'websocket': AuthMiddlewareStack(URLRouter([path('ws/me/', UserConsumer.as_asgi())])),\n})\n\n# Trigger from a signal\ndef notify_on_comment(sender, instance, created, **kwargs):\n    if not created:\n        return\n    channel_layer = get_channel_layer()\n    async_to_sync(channel_layer.group_send)(\n        f'user_{instance.post.author_id}',\n        {'type': 'notify', 'message': f'New comment by {instance.author.username}'},\n    )\n\npost_save.connect(notify_on_comment, sender=Comment)",
          output: "Users get live notifications without polling.",
        },
        mistakes: [
          "Sending sensitive data over unauthenticated sockets.",
          "Trusting client-sent user ids.",
        ],
        bestPractices: [
          "Derive groups from scope['user'], never from the client.",
          "Fall back to polling/email when sockets are closed.",
        ],
        exerciseTitle: "Notify",
        exerciseDescription: "Push a notification to a specific user's socket.",
        exerciseRequirements: ["Auth middleware", "User-scoped group", "Signal triggers send"],
        challenge: "Show a browser notification (toast) on receipt.",
        summary: "Auth-scoped groups deliver private realtime updates.",
      }),
    ],
  },
  {
    title: "Search",
    description: "Full-text search with PostgreSQL",
    lessons: [
      lesson({
        title: "PostgreSQL Full-Text",
        slug: "django-search",
        minutes: 25,
        objective: "Search text with SearchVector.",
        intro:
          "PostgreSQL's full-text search handles stemming, ranking, and language-aware matching — exposed in Django via SearchVector, SearchQuery, and SearchRank.",
        concepts: [
          "- SearchVector('title', 'body') builds the searchable document.",
          "- SearchQuery normalizes the user's terms.",
          "- SearchRank scores results for ordering.",
        ],
        example: {
          lang: "python",
          code: "from django.contrib.postgres.search import SearchVector, SearchQuery, SearchRank\n\nresults = (\n    Post.objects\n    .annotate(search=SearchVector('title', 'body'))\n    .filter(search=SearchQuery('django async'))\n)\n\n# Ranked\nresults = (\n    Post.objects\n    .annotate(rank=SearchRank(SearchVector('title', 'body'), SearchQuery('django')))\n    .filter(rank__gte=0.1)\n    .order_by('-rank')\n)",
          output: "Relevant ranked search results.",
        },
        mistakes: [
          "Using icontains for everything (no ranking, slow).",
          "Searching fields without a GIN index.",
        ],
        bestPractices: [
          "Add a GIN index on the search vector.",
          "Rank and limit results server-side.",
        ],
        exerciseTitle: "Search",
        exerciseDescription: "Add ranked full-text search to posts.",
        exerciseRequirements: ["SearchVector annotation", "Ranked ordering", "GIN index"],
        challenge: "Weight title higher than body.",
        summary: "Postgres full-text search gives fast, ranked results.",
      }),
      lesson({
        title: "Search & Filter UI",
        slug: "django-search-ui",
        minutes: 15,
        objective: "Wire search into a view with pagination.",
        intro:
          "Combine the search queryset with a form, sanitized query, and pagination for a production search page.",
        concepts: [
          "- GET form with q parameter.",
          "- Escape/sanitize before SearchQuery.",
          "- Paginator slices results.",
        ],
        example: {
          lang: "python",
          code: "from django.core.paginator import Paginator\n\ndef search(request):\n    query = request.GET.get('q', '').strip()\n    results = Post.objects.none()\n    if query:\n        vector = SearchVector('title', 'body')\n        results = (\n            Post.objects.annotate(search=vector, rank=SearchRank(vector, SearchQuery(query)))\n            .filter(search=SearchQuery(query))\n            .order_by('-rank')\n        )\n    paginator = Paginator(results, 20)\n    page = paginator.get_page(request.GET.get('page'))\n    return render(request, 'search.html', {'page': page, 'query': query})",
          output: "A paginated search results page.",
        },
        mistakes: [
          "Passing raw user input into SQL.",
          "Ignoring empty/whitespace queries.",
        ],
        bestPractices: [
          "Strip and truncate query length.",
          "Show a friendly empty state.",
        ],
        exerciseTitle: "Search Page",
        exerciseDescription: "Build a paginated search page with an empty state.",
        exerciseRequirements: ["q parameter handling", "Paginator", "Empty state"],
        challenge: "Add filter facets (category, date).",
        summary: "A search view ties full-text power to the UI.",
      }),
    ],
  },
  {
    title: "DevOps & CI/CD",
    description: "Docker, pipelines, monitoring",
    lessons: [
      lesson({
        title: "Docker for Django",
        slug: "django-docker",
        minutes: 25,
        objective: "Containerize a Django app.",
        intro:
          "A Dockerfile plus docker-compose makes the app reproducible: web, worker, and Postgres each in containers.",
        concepts: [
          "- Multi-stage Dockerfile with slim Python base.",
          "- docker-compose services: web, db, redis, worker.",
          "- Environment via env vars, not hardcoded settings.",
        ],
        example: {
          lang: "dockerfile",
          code: "FROM python:3.12-slim\nENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\nEXPOSE 8000\nCMD [\"gunicorn\", \"config.wsgi:application\", \"-b\", \"0.0.0.0:8000\"]\n\n# docker-compose.yml\nservices:\n  web:\n    build: .\n    ports: [\"8000:8000\"]\n    environment:\n      - DATABASE_URL=postgres://...\n  db:\n    image: postgres:16",
          output: "Reproducible containers for the whole stack.",
        },
        mistakes: [
          "Running migrations on every deploy manually.",
          "Committing secrets into images.",
        ],
        bestPractices: [
          "Run collectstatic and migrate in the pipeline.",
          "Use .dockerignore for caches and venvs.",
        ],
        exerciseTitle: "Containerize",
        exerciseDescription: "Dockerize the app with compose services.",
        exerciseRequirements: ["Dockerfile", "docker-compose with db+web", "Runs locally via compose"],
        challenge: "Add a celery worker service.",
        summary: "Docker makes environments identical everywhere.",
      }),
      lesson({
        title: "CI/CD Pipeline",
        slug: "django-ci",
        minutes: 20,
        objective: "Automate test, lint, and deploy.",
        intro:
          "A CI pipeline runs tests and checks on every push; CD deploys after green builds.",
        concepts: [
          "- GitHub Actions workflow: lint, test, build.",
          "- Test against Postgres service container.",
          "- Deploy on main via SSH/container registry.",
        ],
        example: {
          lang: "yaml",
          code: "name: CI\non: [push]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    services:\n      postgres:\n        image: postgres:16\n        env:\n          POSTGRES_PASSWORD: test\n        ports: ['5432:5432']\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-python@v5\n        with: { python-version: '3.12' }\n      - run: pip install -r requirements.txt\n      - run: python manage.py migrate\n      - run: python manage.py test\n      - run: python manage.py check --deploy",
          output: "Every push runs the full test suite.",
        },
        mistakes: [
          "Testing only against SQLite in CI.",
          "Deploying without running migrations.",
        ],
        bestPractices: [
          "Mirror production DB in CI.",
          "Gate deploys on a green pipeline.",
        ],
        exerciseTitle: "Pipeline",
        exerciseDescription: "Create a GitHub Actions workflow that runs tests.",
        exerciseRequirements: ["Workflow YAML", "Postgres service", "Test job passes"],
        challenge: "Add a deploy job for the staging branch.",
        summary: "CI/CD automates quality gates and releases.",
      }),
      lesson({
        title: "Logging & Monitoring",
        slug: "django-monitoring",
        minutes: 15,
        objective: "Log, monitor, and alert.",
        intro:
          "Structured logging, error tracking, and health checks tell you what's happening in production.",
        concepts: [
          "- LOGGING dictConfig with handlers/formatters.",
          "- Sentry for exception tracking.",
          "- /healthz endpoint for load balancers.",
        ],
        example: {
          lang: "python",
          code: "# settings.py\nLOGGING = {\n    'version': 1,\n    'handlers': {'console': {'class': 'logging.StreamHandler'}},\n    'loggers': {\n        'django': {'handlers': ['console'], 'level': 'INFO'},\n    },\n}\n\n# views.py\nfrom django.http import JsonResponse\n\ndef healthz(request):\n    return JsonResponse({'status': 'ok', 'db': check_db()})\n\n# Sentry\nimport sentry_sdk\nsentry_sdk.init(dsn=os.environ['SENTRY_DSN'], traces_sample_rate=1.0)",
          output: "Structured logs and production error visibility.",
        },
        mistakes: [
          "print() instead of logging.",
          "No health endpoint for the orchestrator.",
        ],
        bestPractices: [
          "Log request ids for correlation.",
          "Alert on 5xx spikes, not individual errors.",
        ],
        exerciseTitle: "Observe",
        exerciseDescription: "Add structured logging and a health endpoint.",
        exerciseRequirements: ["LOGGING config", "healthz view", "Sentry or equivalent"],
        challenge: "Add request-id middleware.",
        summary: "Logging and monitoring make production debuggable.",
      }),
    ],
  },
  {
    title: "Real World Project",
    description: "Build and ship a production blog platform",
    lessons: [
      lesson({
        title: "Project Planning",
        slug: "django-project-planning",
        minutes: 25,
        objective: "Plan the blog platform architecture.",
        intro:
          "We build 'DevBlog': a multi-author blog with drafts, comments, search, and an API. Plan the domain before coding.",
        concepts: [
          "- Entities: Author, Post, Category, Comment, Tag.",
          "- App split: accounts, posts, comments, api.",
          "- Milestones: core CRUD → comments → search → API → deploy.",
        ],
        example: {
          lang: "text",
          code: "Entities & relations:\nAuthor (User profile) 1--* Post\nCategory 1--* Post\nPost *--* Tag\nPost 1--* Comment\n\nApps:\n- accounts: profile + avatar\n- posts: Post, Category, Tag, views, templates\n- comments: Comment model + AJAX submit\n- api: DRF endpoints for posts and comments\n\nMilestones:\n1. Models + admin (day 1)\n2. Public list/detail + authoring (day 2)\n3. Comments (day 3)\n4. Full-text search (day 4)\n5. DRF API (day 5)\n6. Tests, Docker, deploy (day 6)",
          output: "A clear blueprint to build against.",
        },
        mistakes: [
          "Starting to code before modeling relations.",
          "Skipping tests because 'it's just a blog'.",
        ],
        bestPractices: [
          "Write the milestone list first.",
          "Keep apps small and domain-focused.",
        ],
        exerciseTitle: "Plan",
        exerciseDescription: "Document the entity model and milestone plan.",
        exerciseRequirements: ["Entity diagram", "App split", "Milestone list"],
        challenge: "Sketch the DRF API surface.",
        summary: "A plan turns a vague idea into buildable milestones.",
      }),
      lesson({
        title: "Building the Core",
        slug: "django-project-core",
        minutes: 30,
        objective: "Implement models, authoring, and comments.",
        intro:
          "Build the milestone core: models with managers, author CRUD views with ownership checks, and an AJAX comment flow.",
        concepts: [
          "- PostQuerySet with published() and by_author().",
          "- LoginRequired + ownership checks in edit/delete.",
          "- Comment creation via form + fetch API.",
        ],
        example: {
          lang: "python",
          code: "class Post(models.Model):\n    title = models.CharField(max_length=200)\n    slug = models.SlugField(unique=True)\n    body = models.TextField()\n    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='posts')\n    category = models.ForeignKey('Category', on_delete=models.SET_NULL, null=True)\n    tags = models.ManyToManyField('Tag', blank=True)\n    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')\n    created_at = models.DateTimeField(auto_now_add=True)\n    objects = PostQuerySet.as_manager()\n\n# ownership check in views\ndef post_edit(request, post_id):\n    post = get_object_or_404(Post, id=post_id)\n    if post.author != request.user:\n        raise PermissionDenied\n    ...",
          output: "A working authoring + commenting core.",
        },
        mistakes: [
          "Allowing any user to edit any post (IDOR).",
          "Authoring without draft/publish workflow.",
        ],
        bestPractices: [
          "Check ownership server-side on every mutation.",
          "Slugify titles on save with uniqueness handling.",
        ],
        exerciseTitle: "Core Build",
        exerciseDescription: "Implement the milestone 1–3 features.",
        exerciseRequirements: ["Models + managers", "Ownership-protected CRUD", "AJAX comments"],
        challenge: "Add a comment moderation queue.",
        summary: "The core delivers real value with security built in.",
      }),
      lesson({
        title: "Launch",
        slug: "django-project-launch",
        minutes: 30,
        objective: "Add search, API, tests, and deploy.",
        intro:
          "Finish the product: full-text search, DRF API, a green test suite, and a production deploy.",
        concepts: [
          "- SearchVector across title + body with GIN index.",
          "- DRF viewset with IsAuthenticatedOrReadOnly.",
          "- Tests for auth, ownership, and search.",
        ],
        example: {
          lang: "python",
          code: "class PostViewSet(viewsets.ModelViewSet):\n    queryset = Post.objects.all()\n    serializer_class = PostSerializer\n    permission_classes = [IsAuthenticatedOrReadOnly]\n    filter_backends = [filters.SearchFilter]\n    search_fields = ['title', 'body']\n\n    def perform_create(self, serializer):\n        serializer.save(author=self.request.user)\n\n# Final commands\npython manage.py makemigrations && python manage.py migrate\npython manage.py test\npython manage.py collectstatic\ngunicorn config.wsgi:application --bind 0.0.0.0:8000",
          output: "A searchable, API-backed blog deployed in production.",
        },
        mistakes: [
          "Launching with failing tests.",
          "Deploying without a rollback plan.",
        ],
        bestPractices: [
          "Green tests are the deploy gate.",
          "Monitor errors after launch (Sentry).",
        ],
        exerciseTitle: "Ship",
        exerciseDescription: "Add search + API, make tests pass, and deploy.",
        exerciseRequirements: ["Full-text search", "DRF API", "Deployed with monitoring"],
        challenge: "Add RSS feeds for readers.",
        summary: "Search, API, tests, and deployment complete the product.",
      }),
    ],
  },
];