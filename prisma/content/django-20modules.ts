import type { CourseContent } from "../seed-content";
import { lesson } from "./lesson-builder";

export const djangoBasic20Modules: CourseContent = {
  slug: "django-basic",
  modules: [
    {
      title: "Introduction to Django",
      description: "What Django is and setup",
      lessons: [
        lesson({
          title: "What is Django?",
          slug: "django-intro",
          minutes: 12,
          objective: "Understand Django and its strengths.",
          intro:
            "Django is a high-level Python web framework that includes everything: ORM, admin, auth, forms, and templates — 'batteries included'.",
          concepts: [
            "- **MVT**: Model-View-Template architecture.",
            "- **ORM**: database access without SQL.",
            "- **Admin**: auto-generated admin interface.",
            "- **Security**: CSRF, XSS, SQLi protections built in.",
          ],
          example: {
            lang: "python",
            code: "# polls/views.py\ndef index(request):\n    return HttpResponse('Hello, Django!')",
            output: "GET / returns 'Hello, Django!'.",
          },
          mistakes: [
            "Treating Django like a microframework — it's opinionated by design.",
            "Skipping the admin — it's one of Django's superpowers.",
          ],
          bestPractices: [
            "Follow the project/app structure conventions.",
            "Use the framework's built-in features instead of reinventing them.",
          ],
          exerciseTitle: "First View",
          exerciseDescription: "Create a Django project and app with a hello view.",
          exerciseRequirements: [
            "django-admin startproject",
            "startapp",
            "Wire the view to a URL",
          ],
          challenge: "Add a second view with a template.",
          summary:
            "Django ships the full stack: ORM, admin, auth, and security.",
        }),
        lesson({
          title: "Environment Setup",
          slug: "django-setup",
          minutes: 15,
          objective: "Set up Django with venv and install it.",
          intro:
            "Create a virtual environment, install Django, and scaffold the project structure.",
          concepts: [
            "- python -m venv + pip install django.",
            "- django-admin startproject config .",
            "- python manage.py runserver starts development.",
          ],
          syntax: {
            lang: "bash",
            code: "python -m venv .venv\nsource .venv/bin/activate\npip install django\npip install psycopg[binary]  # postgres driver\ndjango-admin startproject config .\npython manage.py runserver",
          },
          example: {
            lang: "bash",
            code: "python manage.py migrate   # apply built-in migrations\npython manage.py createsuperuser",
            output: "A running project with a superuser for the admin.",
          },
          mistakes: [
            "Installing Django globally.",
            "Forgetting the initial migrate.",
          ],
          bestPractices: [
            "Use a requirements.txt.",
            "Name the config folder 'config' to avoid app name clashes.",
          ],
          exerciseTitle: "Setup",
          exerciseDescription: "Create a project, run migrations, and create a superuser.",
          exerciseRequirements: [
            "venv + install",
            "startproject",
            "migrate + createsuperuser",
          ],
          challenge: "Point settings at SQLite then switch to Postgres.",
          summary:
            "venv + manage.py get Django running in minutes.",
        }),
        lesson({
          title: "Project vs Apps",
          slug: "django-project-apps",
          minutes: 15,
          objective: "Understand projects, apps, and settings.",
          intro:
            "A project is the whole site; apps are reusable modules within it. Each app holds models, views, and templates for one domain.",
          concepts: [
            "- python manage.py startapp polls.",
            "- Add 'polls' to INSTALLED_APPS.",
            "- settings.py configures the site; urls.py routes.",
          ],
          example: {
            lang: "python",
            code: "# config/settings.py\nINSTALLED_APPS = [\n    'django.contrib.admin',\n    'django.contrib.auth',\n    ...\n    'polls',          # our app\n]\n\n# config/urls.py\nfrom django.urls import include, path\n\nurlpatterns = [\n    path('admin/', admin.site.urls),\n    path('', include('polls.urls')),\n]",
            output: "The app wired into the project.",
          },
          mistakes: [
            "Putting everything in one giant app.",
            "Forgetting to register apps in INSTALLED_APPS.",
          ],
          bestPractices: [
            "One app per domain: accounts, courses, payments.",
            "Reuse apps across projects where possible.",
          ],
          exerciseTitle: "Apps",
          exerciseDescription: "Create two apps and register both.",
          exerciseRequirements: [
            "2 apps",
            "Registered in settings",
            "Both have a URL route",
          ],
          challenge: "Create a reusable app with its own templates folder.",
          summary:
            "Apps modularize Django projects by domain.",
        }),
      ],
    },
    {
      title: "URLs & Views",
      description: "Routing and request handling",
      lessons: [
        lesson({
          title: "URL Patterns",
          slug: "django-urls",
          minutes: 20,
          objective: "Define URL patterns with converters.",
          intro:
            "urls.py maps paths to views. Path converters type URL parameters: <int:id>, <slug:slug>, <str:name>.",
          concepts: [
            "- path('posts/', views.post_list).",
            "- path('posts/<int:post_id>/', views.post_detail).",
            "- Namespacing with app_name and include.",
          ],
          example: {
            lang: "python",
            code: "# polls/urls.py\nfrom django.urls import path\nfrom . import views\n\napp_name = 'polls'\n\nurlpatterns = [\n    path('', views.index, name='index'),\n    path('posts/', views.post_list, name='post_list'),\n    path('posts/<int:post_id>/', views.post_detail, name='post_detail'),\n]\n\n# Reverse: reverse('polls:post_detail', args=[42])\n# Template: {% url 'polls:post_detail' post.id %}",
            output: "Typed URL params and reversible names.",
          },
          mistakes: [
            "Using regex re_path when path() suffices.",
            "Hardcoding URLs instead of {% url %}.",
          ],
          bestPractices: [
            "Namespace your app's URLs.",
            "Use typed converters.",
          ],
          exerciseTitle: "URLs",
          exerciseDescription: "Create URL patterns with params and names.",
          exerciseRequirements: [
            "3 patterns",
            "int and slug converters",
            "Named + namespaced",
          ],
          challenge: "Add a fallback 404 pattern.",
          summary:
            "Typed, named URL patterns power clean routing.",
        }),
        lesson({
          title: "Views & Responses",
          slug: "django-views",
          minutes: 20,
          objective: "Write function and class-based views.",
          intro:
            "Views handle requests and return responses: HttpResponse, render, redirect, or JsonResponse for APIs.",
          concepts: [
            "- Function-based views (FBVs) for simple logic.",
            "- Class-based views (CBVs) for reusable patterns.",
            "- render() with templates; JsonResponse for JSON.",
          ],
          example: {
            lang: "python",
            code: "from django.shortcuts import render, redirect, get_object_or_404\nfrom django.http import JsonResponse\nfrom .models import Post\n\ndef post_list(request):\n    posts = Post.objects.filter(status='published')\n    return render(request, 'posts/list.html', {'posts': posts})\n\ndef post_detail(request, post_id):\n    post = get_object_or_404(Post, id=post_id)\n    return render(request, 'posts/detail.html', {'post': post})\n\ndef api_post_list(request):\n    posts = list(Post.objects.values('id', 'title'))\n    return JsonResponse({'items': posts})",
            output: "HTML pages plus a JSON endpoint.",
          },
          mistakes: [
            "Business logic crammed into views.",
            "Not using get_object_or_404.",
          ],
          bestPractices: [
            "Thin views; logic in models/services.",
            "get_object_or_404 for detail views.",
          ],
          exerciseTitle: "Views",
          exerciseDescription: "Build list, detail, and JSON views.",
          exerciseRequirements: [
            "render with template",
            "get_object_or_404",
            "JsonResponse",
          ],
          challenge: "Convert the detail view to a CBV (DetailView).",
          summary:
            "Views bridge requests to data and responses.",
        }),
        lesson({
          title: "Class-Based Views",
          slug: "django-cbv",
          minutes: 25,
          objective: "Use generic CBVs for CRUD.",
          intro:
            "Django's generic views (ListView, DetailView, CreateView, UpdateView, DeleteView) implement common patterns with configuration.",
          concepts: [
            "- model, template_name, context_object_name.",
            "- LoginRequiredMixin for protected CBVs.",
            "- success_url after form submits.",
          ],
          example: {
            lang: "python",
            code: "from django.views.generic import ListView, DetailView, CreateView\nfrom django.contrib.auth.mixins import LoginRequiredMixin\nfrom django.urls import reverse_lazy\nfrom .models import Post\n\nclass PostListView(ListView):\n    model = Post\n    template_name = 'posts/list.html'\n    context_object_name = 'posts'\n    paginate_by = 10\n\nclass PostDetailView(DetailView):\n    model = Post\n    template_name = 'posts/detail.html'\n\nclass PostCreateView(LoginRequiredMixin, CreateView):\n    model = Post\n    fields = ['title', 'body']\n    template_name = 'posts/form.html'\n    success_url = reverse_lazy('post_list')",
            output: "CRUD views with minimal code.",
          },
          mistakes: [
            "Forgetting LoginRequiredMixin on protected CBVs.",
            "Using reverse_lazy incorrectly in class attributes.",
          ],
          bestPractices: [
            "Start with generic views; override methods when needed.",
            "Mix in permissions before the view class.",
          ],
          exerciseTitle: "CBV CRUD",
          exerciseDescription: "Implement list/detail/create with generic views.",
          exerciseRequirements: [
            "3 generic views",
            "Login mixin",
            "Pagination",
          ],
          challenge: "Add an UpdateView with ownership checks.",
          summary:
            "Generic CBVs turn CRUD into configuration.",
        }),
      ],
    },
    {
      title: "Templates",
      description: "Django template language",
      lessons: [
        lesson({
          title: "Template Basics",
          slug: "django-templates",
          minutes: 20,
          objective: "Render dynamic HTML with Django templates.",
          intro:
            "Django's template language: {{ }} outputs (auto-escaped), {% %} runs logic, and filters transform values.",
          concepts: [
            "- {{ post.title }} escapes output.",
            "- {% for %}, {% if %}, {% with %} control flow.",
            "- Filters: |date, |truncatechars, |pluralize.",
          ],
          example: {
            lang: "html",
            code: "<h1>Posts</h1>\n<ul>\n  {% for post in posts %}\n    <li>\n      <a href=\"{% url 'post_detail' post.id %}\">{{ post.title }}</a>\n      — {{ post.created_at|date:\"M d, Y\" }}\n    </li>\n  {% empty %}\n    <li>No posts yet.</li>\n  {% endfor %}\n</ul>",
            output: "A dynamic list with an empty state.",
          },
          mistakes: [
            "Using |safe on user content (XSS).",
            "Doing heavy logic in templates.",
          ],
          bestPractices: [
            "Auto-escaping is on by default — keep it.",
            "Use custom template tags for repeated logic.",
          ],
          exerciseTitle: "Templates",
          exerciseDescription: "Render a post list template with loop, empty, and filters.",
          exerciseRequirements: [
            "Loop + empty",
            "2 filters",
            "url tag",
          ],
          challenge: "Create a custom template filter.",
          summary:
            "Django templates render safe, dynamic HTML.",
        }),
        lesson({
          title: "Template Inheritance",
          slug: "django-inheritance",
          minutes: 15,
          objective: "Share layouts with inheritance.",
          intro:
            "A base template defines the shell; children override blocks with their content.",
          concepts: [
            "- {% extends 'base.html' %}.",
            "- {% block content %}...{% endblock %}.",
            "- {% include %} for partials; {% load %} for tag libraries.",
          ],
          example: {
            lang: "html",
            code: "<!-- templates/base.html -->\n<!DOCTYPE html>\n<html>\n<head><title>{% block title %}My Site{% endblock %}</title></head>\n<body>\n  {% include 'partials/nav.html' %}\n  <main>{% block content %}{% endblock %}</main>\n</body>\n</html>\n\n<!-- templates/posts/list.html -->\n{% extends 'base.html' %}\n{% block title %}Posts{% endblock %}\n{% block content %}\n  <h1>All Posts</h1>\n{% endblock %}",
            output: "Every page shares nav and shell.",
          },
          mistakes: [
            "Duplicating the nav on every page.",
            "Block name typos (silently empty pages).",
          ],
          bestPractices: [
            "One base per layout region.",
            "Use blocks for title, content, and scripts.",
          ],
          exerciseTitle: "Inheritance",
          exerciseDescription: "Create a base template and extend it in two pages.",
          exerciseRequirements: [
            "Base with 3 blocks",
            "2 children",
            "1 include",
          ],
          challenge: "Add a {% block extra_css %} hook.",
          summary:
            "Inheritance keeps Django templates DRY.",
        }),
      ],
    },
    {
      title: "Models & ORM",
      description: "The database layer",
      lessons: [
        lesson({
          title: "Models & Migrations",
          slug: "django-models",
          minutes: 25,
          objective: "Define models and create migrations.",
          intro:
            "Models describe tables in Python. Migrations translate model changes into database changes.",
          concepts: [
            "- Model fields map to column types.",
            "- python manage.py makemigrations / migrate.",
            "- Meta options: ordering, unique_together.",
          ],
          example: {
            lang: "python",
            code: "from django.db import models\n\nclass Post(models.Model):\n    title = models.CharField(max_length=200)\n    slug = models.SlugField(unique=True)\n    body = models.TextField()\n    status = models.CharField(\n        max_length=20,\n        choices=[('draft', 'Draft'), ('published', 'Published')],\n        default='draft',\n    )\n    created_at = models.DateTimeField(auto_now_add=True)\n\n    class Meta:\n        ordering = ['-created_at']\n\n    def __str__(self):\n        return self.title",
            output: "A typed model with choices and ordering.",
          },
          mistakes: [
            "Forgetting makemigrations after model edits.",
            "CharField without max_length.",
          ],
          bestPractices: [
            "Add __str__ for readable admin rows.",
            "Commit migrations with code.",
          ],
          exerciseTitle: "Post Model",
          exerciseDescription: "Create a Post model and migrate it.",
          exerciseRequirements: [
            "5+ fields",
            "Unique slug",
            "Migration applied",
          ],
          challenge: "Add a Status model with a FK to Post.",
          summary:
            "Models + migrations version the schema in Python.",
        }),
        lesson({
          title: "Queries & Managers",
          slug: "django-queries",
          minutes: 25,
          objective: "Query with the ORM and custom managers.",
          intro:
            "The ORM translates Python to SQL: filter, exclude, order_by, and custom managers encapsulate reusable query logic.",
          concepts: [
            "- Post.objects.filter(status='published').",
            "- Chained filters and Q objects for OR logic.",
            "- Custom managers: Post.published.all().",
          ],
          example: {
            lang: "python",
            code: "from django.db import models\n\nclass PublishedManager(models.Manager):\n    def get_queryset(self):\n        return super().get_queryset().filter(status='published')\n\nclass Post(models.Model):\n    ...\n    objects = models.Manager()\n    published = PublishedManager()\n\n# Usage\nPost.published.all()\nPost.objects.filter(title__icontains='django')\nPost.objects.filter(Q(status='published') | Q(featured=True))",
            output: "Readable, reusable queries.",
          },
          mistakes: [
            "N+1 queries — use select_related/prefetch_related.",
            "Raw SQL when the ORM suffices.",
          ],
          bestPractices: [
            "Use custom managers for common filters.",
            "Eager load with select_related.",
          ],
          exerciseTitle: "Queries",
          exerciseDescription: "Write filtered queries and a custom manager.",
          exerciseRequirements: [
            "3 query patterns",
            "Custom manager",
            "Q object OR query",
          ],
          challenge: "Add select_related on a list query.",
          summary:
            "The ORM and managers make queries expressive and safe.",
        }),
        lesson({
          title: "Relationships",
          slug: "django-relationships",
          minutes: 25,
          objective: "Model relations: FK, M2M, one-to-one.",
          intro:
            "ForeignKey, ManyToManyField, and OneToOneField express relations; related_name provides reverse access.",
          concepts: [
            "- ForeignKey('User', on_delete=models.CASCADE).",
            "- post.author, user.posts (via related_name).",
            "- ManyToManyField with a through model for extra data.",
          ],
          example: {
            lang: "python",
            code: "class Post(models.Model):\n    author = models.ForeignKey(\n        settings.AUTH_USER_MODEL,\n        on_delete=models.CASCADE,\n        related_name='posts',\n    )\n    category = models.ForeignKey(\n        'Category', on_delete=models.SET_NULL, null=True\n    )\n    tags = models.ManyToManyField('Tag', blank=True)\n\nclass Category(models.Model):\n    name = models.CharField(max_length=100)\n\nclass Tag(models.Model):\n    name = models.CharField(max_length=50)\n\n# Usage\nuser.posts.all()\npost.tags.add(tag)\nPost.objects.filter(tags__name='python')",
            output: "FK, nullable FK, and M2M with reverse access.",
          },
          mistakes: [
            "Forgetting related_name collisions.",
            "on_delete choices without thought.",
          ],
          bestPractices: [
            "Always set related_name.",
            "Use through models for M2M metadata.",
          ],
          exerciseTitle: "Relations",
          exerciseDescription: "Add author, category, and tags to Post.",
          exerciseRequirements: [
            "3 relation types",
            "Reverse queries",
            "M2M usage",
          ],
          challenge: "Add a through model with timestamps.",
          summary:
            "Relationships model the domain and enable rich queries.",
        }),
      ],
    },
    {
      title: "Forms & Validation",
      description: "Handling user input",
      lessons: [
        lesson({
          title: "Django Forms",
          slug: "django-forms",
          minutes: 25,
          objective: "Build forms with validation.",
          intro:
            "ModelForm generates forms from models with built-in validation and CSRF protection.",
          concepts: [
            "- forms.ModelForm with Meta.model and fields.",
            "- {{ form.as_p }} renders fields; errors render automatically.",
            "- is_valid() runs all validators.",
          ],
          example: {
            lang: "python",
            code: "# forms.py\nfrom django import forms\nfrom .models import Post\n\nclass PostForm(forms.ModelForm):\n    class Meta:\n        model = Post\n        fields = ['title', 'body', 'status']\n        widgets = {\n            'body': forms.Textarea(attrs={'rows': 6}),\n        }\n\n# views.py\ndef post_create(request):\n    if request.method == 'POST':\n        form = PostForm(request.POST)\n        if form.is_valid():\n            post = form.save(commit=False)\n            post.author = request.user\n            post.save()\n            return redirect('post_detail', post.id)\n    else:\n        form = PostForm()\n    return render(request, 'posts/form.html', {'form': form})",
            output: "Validated, author-attached creation.",
          },
          mistakes: [
            "Hand-rolling forms instead of ModelForm.",
            "Forgetting CSRF token in templates.",
          ],
          bestPractices: [
            "Use ModelForm for model-backed forms.",
            "commit=False before setting owner fields.",
          ],
          exerciseTitle: "Post Form",
          exerciseDescription: "Build a ModelForm-based create view.",
          exerciseRequirements: [
            "ModelForm",
            "CSRF token in template",
            "Author assignment",
          ],
          challenge: "Add clean_ method validation.",
          summary:
            "ModelForms give validated, CSRF-safe input handling.",
        }),
        lesson({
          title: "Validation & Errors",
          slug: "django-validation",
          minutes: 20,
          objective: "Write custom validators and clean methods.",
          intro:
            "Beyond field types: validators on fields, clean_<field> for single-field checks, and clean() for cross-field logic.",
          concepts: [
            "- Field.validators list or validators.py module.",
            "- def clean_title(self) raises ValidationError.",
            "- Errors render per field in templates.",
          ],
          example: {
            lang: "python",
            code: "from django.core.exceptions import ValidationError\n\ndef validate_not_swearwords(value):\n    banned = ['spam', 'v1agra']\n    if any(word in value.lower() for word in banned):\n        raise ValidationError('Please avoid inappropriate language.')\n\nclass PostForm(forms.ModelForm):\n    title = forms.CharField(validators=[validate_not_swearwords])\n\n    class Meta:\n        model = Post\n        fields = ['title', 'body']\n\n    def clean(self):\n        cleaned = super().clean()\n        # cross-field rule\n        if cleaned.get('status') == 'published' and not cleaned.get('body'):\n            raise ValidationError('Published posts need a body.')\n        return cleaned",
            output: "Custom, testable validation rules.",
          },
          mistakes: [
            "Validation only in views.",
            "Forgetting super().clean().",
          ],
          bestPractices: [
            "Put validators in a validators.py module.",
            "Test validation rules directly.",
          ],
          exerciseTitle: "Validators",
          exerciseDescription: "Add a custom validator and a clean() rule.",
          exerciseRequirements: [
            "Field validator",
            "Cross-field clean",
            "Test the failure path",
          ],
          challenge: "Add an async-check uniqueness validator.",
          summary:
            "Validators and clean methods enforce business rules.",
        }),
      ],
    },
    {
      title: "Admin",
      description: "Django's superpower",
      lessons: [
        lesson({
          title: "Customizing the Admin",
          slug: "django-admin-custom",
          minutes: 20,
          objective: "Register and customize models in admin.",
          intro:
            "The admin is generated from models; admin.py customization controls listing, search, filters, and inline editing.",
          concepts: [
            "- admin.site.register(Post, PostAdmin).",
            "- list_display, list_filter, search_fields.",
            "- readonly_fields, prepopulated_fields.",
          ],
          example: {
            lang: "python",
            code: "from django.contrib import admin\nfrom .models import Post\n\n@admin.register(Post)\nclass PostAdmin(admin.ModelAdmin):\n    list_display = ('title', 'author', 'status', 'created_at')\n    list_filter = ('status', 'category')\n    search_fields = ('title', 'body')\n    prepopulated_fields = {'slug': ('title',)}\n    readonly_fields = ('created_at',)\n    list_editable = ('status',)\n    date_hierarchy = 'created_at'",
            output: "A searchable, filterable admin list.",
          },
          mistakes: [
            "Registering models with no customization.",
            "Exposing sensitive fields.",
          ],
          bestPractices: [
            "Prepopulate slugs.",
            "Restrict admin access by role.",
          ],
          exerciseTitle: "Admin",
          exerciseDescription: "Register Post with rich admin options.",
          exerciseRequirements: [
            "list_display + filter",
            "Search fields",
            "Slug prepopulation",
          ],
          challenge: "Add inline editing of comments.",
          summary:
            "The admin turns models into a CMS with little code.",
        }),
        lesson({
          title: "Admin Permissions",
          slug: "django-admin-permissions",
          minutes: 15,
          objective: "Control who sees what in admin.",
          intro:
            "Django's permission system gates admin access per model per user/group.",
          concepts: [
            "- is_staff gates admin access.",
            "- Permissions: add/change/delete per model.",
            "- Groups bundle permissions.",
          ],
          example: {
            lang: "python",
            code: "from django.contrib import admin\n\n@admin.register(Post)\nclass PostAdmin(admin.ModelAdmin):\n    def has_delete_permission(self, request, obj=None):\n        # Only superusers can delete\n        return request.user.is_superuser\n\n    def get_queryset(self, request):\n        qs = super().get_queryset(request)\n        # Editors see all; authors see only theirs\n        if request.user.is_superuser:\n            return qs\n        return qs.filter(author=request.user)",
            output: "Scoped admin visibility per role.",
          },
          mistakes: [
            "Giving everyone superuser.",
            "Forgetting queryset scoping for multi-tenant data.",
          ],
          bestPractices: [
            "Scope admin querysets by user.",
            "Use groups for role bundles.",
          ],
          exerciseTitle: "Admin Rules",
          exerciseDescription: "Scope the Post admin queryset and restrict deletion.",
          exerciseRequirements: [
            "Queryset scoping",
            "has_delete_permission",
            "Verified with two users",
          ],
          challenge: "Add an export action for admins.",
          summary:
            "Permissions and queryset scoping keep admin safe.",
        }),
      ],
    },
    {
      title: "Authentication",
      description: "Users, login, and permissions",
      lessons: [
        lesson({
          title: "Built-in Auth",
          slug: "django-auth",
          minutes: 25,
          objective: "Use Django's authentication system.",
          intro:
            "Django ships full auth: User model, login/logout views, password hashing, and session cookies.",
          concepts: [
            "- LoginView/LogoutView from django.contrib.auth.views.",
            "- authenticate() + login() for manual flows.",
            "- @login_required decorator.",
          ],
          example: {
            lang: "python",
            code: "from django.contrib.auth.forms import AuthenticationForm\nfrom django.contrib.auth.views import LoginView\nfrom django.urls import path\n\nurlpatterns = [\n    path('login/', LoginView.as_view(template_name='accounts/login.html'), name='login'),\n    path('logout/', LogoutView.as_view(), name='logout'),\n]\n\n# views.py\nfrom django.contrib.auth.decorators import login_required\n\n@login_required\ndef dashboard(request):\n    return render(request, 'dashboard.html', {'user': request.user})",
            output: "Login, logout, and protected views built in.",
          },
          mistakes: [
            "Rolling custom auth from scratch.",
            "Forgetting @login_required on protected views.",
          ],
          bestPractices: [
            "Use the built-in auth system.",
            "Set LOGIN_URL and LOGIN_REDIRECT_URL.",
          ],
          exerciseTitle: "Auth",
          exerciseDescription: "Wire login/logout URLs and protect a dashboard.",
          exerciseRequirements: [
            "Login/logout views",
            "login_required",
            "Custom template",
          ],
          challenge: "Add password reset via built-in views.",
          summary:
            "Django's auth covers users, sessions, and permissions.",
        }),
        lesson({
          title: "Custom User Model",
          slug: "django-custom-user",
          minutes: 20,
          objective: "Extend or replace the default User model.",
          intro:
            "The default User works for many apps; customizing early (email login, profiles) avoids painful migrations later.",
          concepts: [
            "- Extend via OneToOne profile model (safe post-launch).",
            "- Replace AUTH_USER_MODEL at project start for full control.",
            "- AbstractUser for custom fields.",
          ],
          example: {
            lang: "python",
            code: "# accounts/models.py\nfrom django.contrib.auth.models import AbstractUser\n\nclass User(AbstractUser):\n    bio = models.TextField(blank=True)\n    xp = models.IntegerField(default=0)\n\n    @property\n    def level(self):\n        return self.xp // 100 + 1\n\n# settings.py\nAUTH_USER_MODEL = 'accounts.User'",
            output: "A custom user with app-specific fields.",
          },
          mistakes: [
            "Swapping AUTH_USER_MODEL after the first migration.",
            "Duplicating User fields in a profile model.",
          ],
          bestPractices: [
            "Decide the user model on day one.",
            "Use AbstractUser for easy customization.",
          ],
          exerciseTitle: "Custom User",
          exerciseDescription: "Create a custom user with extra fields (in a fresh project).",
          exerciseRequirements: [
            "AUTH_USER_MODEL set",
            "2 extra fields",
            "Migration works",
          ],
          challenge: "Add email login support.",
          summary:
            "A custom user model from the start saves migration pain.",
        }),
        lesson({
          title: "Permissions & Groups",
          slug: "django-permissions",
          minutes: 20,
          objective: "Enforce roles with permissions.",
          intro:
            "Django's permission framework (users, groups, permissions) plus decorators control feature access.",
          concepts: [
            "- @permission_required('polls.add_post').",
            "- request.user.has_perm(...).",
            "- Groups bundle permissions for roles.",
          ],
          example: {
            lang: "python",
            code: "from django.contrib.auth.decorators import permission_required\n\n@permission_required('polls.change_post')\ndef post_edit(request, post_id):\n    post = get_object_or_404(Post, id=post_id)\n    ...\n\n# In views\nif request.user.groups.filter(name='Editors').exists():\n    ...\n\n# Or programmatic check\nif request.user.has_perm('polls.delete_post'):\n    ...",
            output: "Fine-grained feature permissions.",
          },
          mistakes: [
            "Role checks as hardcoded strings everywhere.",
            "Checking groups when permissions exist.",
          ],
          bestPractices: [
            "Use permissions, not role-name strings.",
            "Bundle permissions into groups.",
          ],
          exerciseTitle: "Permissions",
          exerciseDescription: "Add permission_required to edit/delete views.",
          exerciseRequirements: [
            "Permission decorators",
            "A group seeded",
            "403 behavior verified",
          ],
          challenge: "Add a custom permission via Meta.permissions.",
          summary:
            "Permissions and groups provide role-based access control.",
        }),
      ],
    },
    {
      title: "REST APIs",
      description: "Django REST Framework",
      lessons: [
        lesson({
          title: "DRF Setup",
          slug: "django-drf-setup",
          minutes: 20,
          objective: "Install DRF and build a serializer.",
          intro:
            "Django REST Framework is the standard API toolkit: serializers, viewsets, routers, and authentication.",
          concepts: [
            "- pip install djangorestframework.",
            "- Serializers convert models ↔ JSON with validation.",
            "- Viewsets + routers generate standard endpoints.",
          ],
          syntax: {
            lang: "bash",
            code: "pip install djangorestframework\n# settings.py\nINSTALLED_APPS += ['rest_framework']",
          },
          example: {
            lang: "python",
            code: "# serializers.py\nfrom rest_framework import serializers\nfrom .models import Post\n\nclass PostSerializer(serializers.ModelSerializer):\n    class Meta:\n        model = Post\n        fields = ['id', 'title', 'body', 'status', 'author']\n        read_only_fields = ['author']\n\n# views.py\nfrom rest_framework import viewsets\nfrom .models import Post\nfrom .serializers import PostSerializer\n\nclass PostViewSet(viewsets.ModelViewSet):\n    queryset = Post.objects.all()\n    serializer_class = PostSerializer\n\n# urls.py\nfrom rest_framework.routers import DefaultRouter\nrouter = DefaultRouter()\nrouter.register('posts', PostViewSet)",
            output: "A complete posts API from one viewset.",
          },
          mistakes: [
            "Returning model instances from APIs.",
            "Forgetting read_only fields.",
          ],
          bestPractices: [
            "Use viewsets + routers.",
            "Serializer for every resource.",
          ],
          exerciseTitle: "Posts API",
          exerciseDescription: "Build a posts API with serializer and viewset.",
          exerciseRequirements: [
            "DRF installed",
            "Serializer",
            "Router-registered viewset",
          ],
          challenge: "Nest the author in the serializer.",
          summary:
            "DRF turns models into full REST APIs quickly.",
        }),
        lesson({
          title: "API Auth & Permissions",
          slug: "django-api-auth",
          minutes: 25,
          objective: "Secure APIs with token auth.",
          intro:
            "DRF's IsAuthenticated + TokenAuthentication protect APIs; JWT via SimpleJWT adds stateless tokens.",
          concepts: [
            "- rest_framework.authtoken for tokens.",
            "- Permission classes on views.",
            "- SimpleJWT for expiring tokens.",
          ],
          example: {
            lang: "python",
            code: "from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly\n\nclass PostViewSet(viewsets.ModelViewSet):\n    queryset = Post.objects.all()\n    serializer_class = PostSerializer\n    permission_classes = [IsAuthenticatedOrReadOnly]\n\n    def perform_create(self, serializer):\n        serializer.save(author=self.request.user)\n\n    def get_queryset(self):\n        if self.request.user.is_staff:\n            return Post.objects.all()\n        return Post.objects.filter(status='published')",
            output: "Read-public, write-auth API with owner assignment.",
          },
          mistakes: [
            "Open write endpoints.",
            "Not setting author from the request.",
          ],
          bestPractices: [
            "IsAuthenticatedOrReadOnly as a base.",
            "Scope querysets by user for ownership.",
          ],
          exerciseTitle: "API Security",
          exerciseDescription: "Protect the posts API and assign authors.",
          exerciseRequirements: [
            "Permission classes",
            "Author auto-assign",
            "Queryset scoping",
          ],
          challenge: "Add SimpleJWT login endpoint.",
          summary:
            "Permissions and tokens secure DRF APIs.",
        }),
        lesson({
          title: "Filtering & Pagination",
          slug: "django-api-filtering",
          minutes: 20,
          objective: "Filter, search, and paginate APIs.",
          intro:
            "DRF's filtering backends and pagination classes make list endpoints production-ready.",
          concepts: [
            "- django-filter for field filters.",
            "- SearchFilter with search_fields.",
            "- PageNumberPagination.",
          ],
          example: {
            lang: "python",
            code: "from rest_framework import filters\nfrom rest_framework.pagination import PageNumberPagination\n\nclass StandardPagination(PageNumberPagination):\n    page_size = 20\n    max_page_size = 100\n\nclass PostViewSet(viewsets.ModelViewSet):\n    queryset = Post.objects.all()\n    serializer_class = PostSerializer\n    pagination_class = StandardPagination\n    filter_backends = [filters.SearchFilter, filters.OrderingFilter]\n    search_fields = ['title', 'body']\n    ordering_fields = ['created_at', 'title']\n\n# GET /api/posts?search=django&ordering=-created_at&page=2",
            output: "Searchable, orderable, paginated endpoints.",
          },
          mistakes: [
            "Returning every row unfiltered.",
            "Ignoring pagination on list endpoints.",
          ],
          bestPractices: [
            "Paginate by default.",
            "Expose search only on safe fields.",
          ],
          exerciseTitle: "List Power",
          exerciseDescription: "Add search, ordering, and pagination to the API.",
          exerciseRequirements: [
            "SearchFilter",
            "OrderingFilter",
            "Custom pagination",
          ],
          challenge: "Add django-filter field filtering.",
          summary:
            "Filters and pagination make APIs usable at scale.",
        }),
      ],
    },
    {
      title: "Testing",
      description: "Automated tests",
      lessons: [
        lesson({
          title: "Test Client",
          slug: "django-testing",
          minutes: 25,
          objective: "Test views with Django's test client.",
          intro:
            "Django's test framework creates a test database and provides a client for simulating requests.",
          concepts: [
            "- TestCase with setUp creating fixtures.",
            "- self.client.get/post with assert status.",
            "- django.test.Client follows redirects optionally.",
          ],
          example: {
            lang: "python",
            code: "from django.test import TestCase\nfrom django.urls import reverse\nfrom .models import Post\nfrom django.contrib.auth.models import User\n\nclass PostViewTests(TestCase):\n    def setUp(self):\n        self.user = User.objects.create_user(username='ada', password='secret123')\n        self.post = Post.objects.create(\n            title='Hello', body='World', author=self.user, status='published',\n        )\n\n    def test_list_shows_posts(self):\n        response = self.client.get(reverse('post_list'))\n        self.assertEqual(response.status_code, 200)\n        self.assertContains(response, 'Hello')\n\n    def test_detail_404_for_missing(self):\n        response = self.client.get(reverse('post_detail', args=[999]))\n        self.assertEqual(response.status_code, 404)\n\n    def test_create_requires_login(self):\n        response = self.client.post(reverse('post_create'), {'title': 'X'})\n        self.assertEqual(response.status_code, 302)  # redirect to login",
            output: "Behavioral tests for the main flows.",
          },
          mistakes: [
            "Testing against the real database.",
            "Not isolating tests (each test is in a transaction).",
          ],
          bestPractices: [
            "Use factories or setUp for fixtures.",
            "Test auth and error paths too.",
          ],
          exerciseTitle: "View Tests",
          exerciseDescription: "Write tests for list, detail, and auth-required create.",
          exerciseRequirements: [
            "3 tests",
            "setUp fixtures",
            "Status + content assertions",
          ],
          challenge: "Add form validation tests.",
          summary:
            "Django's test client verifies views and auth.",
        }),
        lesson({
          title: "API Tests",
          slug: "django-api-tests",
          minutes: 20,
          objective: "Test DRF endpoints.",
          intro:
            "DRF's APITestCase and APIClient test JSON endpoints with token auth.",
          concepts: [
            "- rest_framework.test.APITestCase.",
            "- client.force_authenticate(user).",
            "- Assert response.data and status codes.",
          ],
          example: {
            lang: "python",
            code: "from rest_framework.test import APITestCase, APIClient\nfrom rest_framework import status\nfrom django.contrib.auth.models import User\nfrom .models import Post\n\nclass PostApiTests(APITestCase):\n    def setUp(self):\n        self.user = User.objects.create_user(username='ada', password='x')\n\n    def test_requires_auth_to_create(self):\n        response = self.client.post('/api/posts/', {'title': 'Hi'}, format='json')\n        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)\n\n    def test_authenticated_create(self):\n        self.client.force_authenticate(self.user)\n        response = self.client.post('/api/posts/', {'title': 'Hi', 'body': 'B'}, format='json')\n        self.assertEqual(response.status_code, status.HTTP_201_CREATED)\n        self.assertEqual(response.data['author'], self.user.id)",
            output: "API auth and creation verified.",
          },
          mistakes: [
            "Not authenticating in happy-path tests.",
            "Asserting on hardcoded response strings.",
          ],
          bestPractices: [
            "Test both auth and data paths.",
            "Assert response.data structure.",
          ],
          exerciseTitle: "API Tests",
          exerciseDescription: "Test auth-gated creation and listing.",
          exerciseRequirements: [
            "APITestCase",
            "force_authenticate",
            "Status + data assertions",
          ],
          challenge: "Test pagination metadata.",
          summary:
            "APITestCase makes API testing straightforward.",
        }),
      ],
    },
    {
      title: "Security",
      description: "Django's built-in defenses",
      lessons: [
        lesson({
          title: "Security Defaults",
          slug: "django-security-defaults",
          minutes: 20,
          objective: "Leverage Django's built-in protections.",
          intro:
            "Django prevents the OWASP top risks by default: CSRF tokens, XSS escaping, SQL injection protection, and secure cookie settings.",
          concepts: [
            "- {% csrf_token %} required on all POST forms.",
            "- Auto-escaping templates block XSS.",
            "- ORM parameterizes all queries.",
            "- Security middleware checks headers.",
          ],
          example: {
            lang: "python",
            code: "# settings.py — production security settings\nSECURE_SSL_REDIRECT = True\nSESSION_COOKIE_SECURE = True\nCSRF_COOKIE_SECURE = True\nSECURE_HSTS_SECONDS = 31536000\nSECURE_HSTS_INCLUDE_SUBDOMAINS = True\nSECURE_CONTENT_TYPE_NOSNIFF = True\nSECURE_REFERRER_POLICY = 'strict-origin-when-cross-origin'\nX_FRAME_OPTIONS = 'DENY'",
            output: "HTTPS and secure cookies configured.",
          },
          mistakes: [
            "Disabling CSRF protection.",
            "Running production with debug=True.",
          ],
          bestPractices: [
            "Keep the defaults.",
            "Run check --deploy to audit settings.",
          ],
          exerciseTitle: "Hardening",
          exerciseDescription: "Apply the production security settings and run check --deploy.",
          exerciseRequirements: [
            "Secure cookie settings",
            "HSTS + SSL redirect",
            "check --deploy clean",
          ],
          challenge: "Add a security middleware custom check.",
          summary:
            "Django's defaults plus secure settings block most attacks.",
        }),
        lesson({
          title: "Rate Limiting & Abuse",
          slug: "django-rate-limit",
          minutes: 15,
          objective: "Throttle login and API abuse.",
          intro:
            "Django throttles API clients via DRF; login brute force needs an extra layer like django-axes or a cache-based limiter.",
          concepts: [
            "- DRF Throttle classes per view.",
            "- django-axes locks accounts after failures.",
            "- Cache keyed rate limits.",
          ],
          example: {
            lang: "python",
            code: "from rest_framework.throttling import AnonRateThrottle, UserRateThrottle\n\nclass PostViewSet(viewsets.ModelViewSet):\n    throttle_classes = [AnonRateThrottle, UserRateThrottle]\n    throttle_scope = 'posts'\n\n# settings.py\nREST_FRAMEWORK = {\n    'DEFAULT_THROTTLE_RATES': {\n        'anon': '30/hour',\n        'user': '300/hour',\n        'posts': '100/hour',\n    },\n}",
            output: "API requests throttled per identity.",
          },
          mistakes: [
            "Throttling only authenticated users.",
            "No limit on anon write endpoints.",
          ],
          bestPractices: [
            "Rate limit anon and user separately.",
            "Lock accounts after repeated login failures.",
          ],
          exerciseTitle: "Throttling",
          exerciseDescription: "Add DRF throttles and configure rates.",
          exerciseRequirements: [
            "Throttle classes",
            "Rates in settings",
            "429 verified",
          ],
          challenge: "Add django-axes for login brute force.",
          summary:
            "Throttles and lockouts curb brute force and abuse.",
        }),
      ],
    },
    {
      title: "Production & Deployment",
      description: "Serving Django in production",
      lessons: [
        lesson({
          title: "Static & Media Files",
          slug: "django-static",
          minutes: 20,
          objective: "Serve static files and uploads.",
          intro:
            "collectstatic gathers app static files; media files store uploads. In production, a CDN or Nginx serves both.",
          concepts: [
            "- python manage.py collectstatic.",
            "- STATIC_URL, MEDIA_URL, MEDIA_ROOT.",
            "- WhiteNoise serves static from Django itself.",
          ],
          syntax: {
            lang: "bash",
            code: "pip install whitenoise\n# settings.py\nMIDDLEWARE.insert(1, 'whitenoise.middleware.WhiteNoiseMiddleware')\nSTATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'\npython manage.py collectstatic",
          },
          example: {
            lang: "python",
            code: "# settings.py\nSTATIC_URL = 'static/'\nSTATIC_ROOT = BASE_DIR / 'staticfiles'\nMEDIA_URL = 'media/'\nMEDIA_ROOT = BASE_DIR / 'media'",
            output: "Static and media served correctly.",
          },
          mistakes: [
            "Serving static from the dev server in production.",
            "Storing uploads on ephemeral disks.",
          ],
          bestPractices: [
            "Use WhiteNoise or a CDN.",
            "Move media to S3 for scale.",
          ],
          exerciseTitle: "Static Setup",
          exerciseDescription: "Add WhiteNoise and collectstatic.",
          exerciseRequirements: [
            "Middleware added",
            "collectstatic runs",
            "Assets load in production",
          ],
          challenge: "Switch media storage to an S3-compatible service.",
          summary:
            "Static and media configuration is the deploy prerequisite.",
        }),
        lesson({
          title: "Gunicorn & Nginx",
          slug: "django-gunicorn",
          minutes: 20,
          objective: "Serve Django with gunicorn and Nginx.",
          intro:
            "Gunicorn runs Django app workers; Nginx proxies, terminates TLS, and serves static files.",
          concepts: [
            "- gunicorn config.wsgi:application.",
            "- Nginx proxy_pass to gunicorn.",
            "- ALLOWED_HOSTS must include the domain.",
          ],
          syntax: {
            lang: "bash",
            code: "pip install gunicorn\ngunicorn config.wsgi:application --workers 4 --bind 127.0.0.1:8000",
          },
          example: {
            lang: "nginx",
            code: "server {\n    listen 80;\n    server_name example.com;\n\n    location /static/ {\n        alias /app/staticfiles/;\n    }\n\n    location / {\n        proxy_pass http://127.0.0.1:8000;\n        proxy_set_header Host $host;\n        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n        proxy_set_header X-Forwarded-Proto $scheme;\n    }\n}",
            output: "Nginx fronting gunicorn with static serving.",
          },
          mistakes: [
            "Missing ALLOWED_HOSTS — 400s in production.",
            "No X-Forwarded headers (broken redirects/HTTPS).",
          ],
          bestPractices: [
            "Run 2-4 workers per core.",
            "Terminate TLS at Nginx or the host.",
          ],
          exerciseTitle: "Serve",
          exerciseDescription: "Run with gunicorn behind a reverse proxy.",
          exerciseRequirements: [
            "Gunicorn serving",
            "ALLOWED_HOSTS set",
            "Static proxied",
          ],
          challenge: "Add a systemd unit for gunicorn.",
          summary:
            "Gunicorn + Nginx is the classic production stack.",
        }),
        lesson({
          title: "Deploying with Docker",
          slug: "django-docker",
          minutes: 20,
          objective: "Containerize and deploy Django.",
          intro:
            "Docker packages Django with its runtime; docker-compose ties together web, database, and background services.",
          concepts: [
            "- Multi-stage Dockerfile.",
            "- Run migrations on startup or deploy.",
            "- Non-root user and healthchecks.",
          ],
          example: {
            lang: "docker",
            code: "FROM python:3.12-slim\n\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\n\nCOPY . .\nRUN python manage.py collectstatic --noinput\n\nRUN useradd -m appuser\nUSER appuser\n\nEXPOSE 8000\nCMD [\"gunicorn\", \"config.wsgi:application\", \"-w\", \"4\", \"-b\", \"0.0.0.0:8000\"]",
            output: "A self-contained Django image.",
          },
          mistakes: [
            "Running migrations manually everywhere.",
            "Root user in the container.",
          ],
          bestPractices: [
            "Run migrations as a deploy step.",
            "Keep secrets out of images.",
          ],
          exerciseTitle: "Dockerize",
          exerciseDescription: "Build the Docker image and run it locally.",
          exerciseRequirements: [
            "Dockerfile",
            "collectstatic in build",
            "Non-root user",
          ],
          challenge: "Add docker-compose with Postgres.",
          summary:
            "Docker standardizes Django deploys across environments.",
        }),
      ],
    },
    {
      title: "Real World Project — Blog Platform",
      description: "Build a full blog with DRF API",
      lessons: [
        lesson({
          title: "Project Design",
          slug: "django-project-design",
          minutes: 25,
          objective: "Plan the blog: models, views, API, admin.",
          intro:
            "The final module builds a blog: posts with comments, author profiles, an admin CMS, and a DRF API for a frontend.",
          concepts: [
            "- Apps: posts, comments, accounts.",
            "- Models with relations and managers.",
            "- Templates + admin + DRF endpoints.",
          ],
          example: {
            lang: "python",
            code: "class Post(models.Model):\n    title = models.CharField(max_length=200)\n    slug = models.SlugField(unique=True)\n    body = models.TextField()\n    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='posts')\n    category = models.ForeignKey('Category', on_delete=models.SET_NULL, null=True)\n    tags = models.ManyToManyField('Tag', blank=True)\n    status = models.CharField(max_length=20, choices=STATUS, default='draft')\n    created_at = models.DateTimeField(auto_now_add=True)\n\n    objects = models.Manager()\n    published = PublishedManager()",
            output: "The core content model.",
          },
          mistakes: [
            "Skipping slug prepopulation.",
            "No published manager.",
          ],
          bestPractices: [
            "Plan apps and relations first.",
            "Managers for common query filters.",
          ],
          exerciseTitle: "Design",
          exerciseDescription: "Create the models for posts, categories, tags, and comments.",
          exerciseRequirements: [
            "4 models",
            "Relations",
            "Migrations",
          ],
          challenge: "Add draft preview for authors.",
          summary:
            "A planned data model supports the whole feature set.",
        }),
        lesson({
          title: "Core Features",
          slug: "django-project-features",
          minutes: 35,
          objective: "Build blog pages, comments, and search.",
          intro:
            "Implement the site: published post lists with search, detail with comments, and the author dashboard.",
          concepts: [
            "- ListView with search via query params.",
            "- Comments with a ModelForm.",
            "- Author dashboard scoped to request.user.",
          ],
          example: {
            lang: "python",
            code: "class PostListView(ListView):\n    model = Post\n    template_name = 'posts/list.html'\n    context_object_name = 'posts'\n    paginate_by = 10\n\n    def get_queryset(self):\n        qs = Post.published.all()\n        q = self.request.GET.get('q')\n        if q:\n            qs = qs.filter(Q(title__icontains=q) | Q(body__icontains=q))\n        return qs\n\nclass PostDetailView(DetailView):\n    model = Post\n    template_name = 'posts/detail.html'\n\n    def get_queryset(self):\n        # authors may preview drafts\n        if self.request.user.is_authenticated and self.request.user.is_staff:\n            return Post.objects.all()\n        return Post.published.all()",
            output: "Searchable public pages with draft previews.",
          },
          mistakes: [
            "Leaking drafts to the public.",
            "No pagination.",
          ],
          bestPractices: [
            "Scope public queries to published.",
            "Paginate lists.",
          ],
          exerciseTitle: "Features",
          exerciseDescription: "Implement search, detail, comments, and dashboard.",
          exerciseRequirements: [
            "Search",
            "Comment form",
            "Author dashboard",
          ],
          challenge: "Add related-posts by shared tags.",
          summary:
            "Scoped queries and forms build the core blog.",
        }),
        lesson({
          title: "Ship & Harden",
          slug: "django-project-ship",
          minutes: 30,
          objective: "Add DRF API, tests, and deploy.",
          intro:
            "Finish: a DRF API for the frontend, tests for critical flows, and a production deployment.",
          concepts: [
            "- PostSerializer + viewset with permissions.",
            "- Tests for auth, ownership, and search.",
            "- Deploy with gunicorn/Nginx or Docker.",
          ],
          example: {
            lang: "python",
            code: "class PostSerializer(serializers.ModelSerializer):\n    class Meta:\n        model = Post\n        fields = ['id', 'title', 'slug', 'body', 'author', 'created_at']\n        read_only_fields = ['author']\n\nclass PostViewSet(viewsets.ModelViewSet):\n    queryset = Post.published.all()\n    serializer_class = PostSerializer\n    permission_classes = [IsAuthenticatedOrReadOnly]\n\n    def perform_create(self, serializer):\n        serializer.save(author=self.request.user)\n\n    def get_queryset(self):\n        qs = super().get_queryset()\n        if self.request.user.is_staff:\n            return Post.objects.all()\n        return qs",
            output: "A secure, ownership-aware API.",
          },
          mistakes: [
            "Public write endpoints.",
            "Skipping tests before deploy.",
          ],
          bestPractices: [
            "Test the security properties.",
            "Run check --deploy before release.",
          ],
          exerciseTitle: "Ship",
          exerciseDescription: "Add the API, tests, and deploy the blog.",
          exerciseRequirements: [
            "DRF endpoint",
            "Test suite green",
            "Production deploy",
          ],
          challenge: "Add a newsletter signup with rate limiting.",
          summary:
            "API, tests, and deployment complete the Django project.",
        }),
      ],
    },
  ],
};