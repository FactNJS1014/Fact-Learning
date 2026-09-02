import { getCourses, getCategories } from "@/lib/services/course.service";
import { COURSE_LEVELS } from "@/lib/utils";
import Link from "next/link";
import { LanguageLogo } from "@/components/ui/language-logo";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Courses",
};

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const category =
    typeof params.category === "string" ? params.category : undefined;
  const level = typeof params.level === "string" ? params.level : undefined;
  const search = typeof params.search === "string" ? params.search : undefined;
  const page = typeof params.page === "string" ? parseInt(params.page, 10) : 1;

  const { courses, total, totalPages, currentPage } = await getCourses({
    category,
    level,
    search,
    page,
    status: "PUBLISHED",
  });

  const categories = await getCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Courses
        </h1>
        <p className="text-muted-foreground mt-1">
          Browse {total} courses across {categories.length} categories
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Level:</span>
          <div className="flex gap-1">
            <Link
              href="/courses"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                !level
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              All
            </Link>
            {COURSE_LEVELS.map((l) => (
              <Link
                key={l}
                href={`/courses?level=${l}`}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  level === l
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Search */}
      <form className="mb-8" action="/courses" method="get">
        {level && <input type="hidden" name="level" value={level} />}
        <div className="relative max-w-md">
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Search courses..."
            className="w-full px-4 py-2.5 pl-10 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            🔍
          </span>
        </div>
      </form>

      {/* Course Grid */}
      {courses.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-4xl block mb-4">📚</span>
          <h3 className="text-lg font-medium text-foreground mb-2">
            No courses found
          </h3>
          <p className="text-muted-foreground text-sm">
            Try adjusting your filters or search terms.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.slug}`}
              className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all group"
            >
              {/* Thumbnail */}
              <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <LanguageLogo
                  src={course.languageIcon}
                  alt={course.title}
                  size="xl"
                  className="drop-shadow-lg"
                />
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      course.level === "BASIC"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : course.level === "INTERMEDIATE"
                          ? "bg-amber-500/10 text-amber-400"
                          : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {course.level}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {course.category.name}
                  </span>
                </div>

                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                  {course.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {course.description}
                </p>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{course.lessonCount} lessons</span>
                  <span>
                    {course.estimatedHours
                      ? `${course.estimatedHours}h`
                      : "~4h"}
                  </span>
                </div>

                <div className="mt-3 pt-3 border-t border-border">
                  <span className="text-sm text-primary font-medium group-hover:underline">
                    Start Learning →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/courses?${new URLSearchParams({
                ...(category ? { category } : {}),
                ...(level ? { level } : {}),
                ...(search ? { search } : {}),
                page: String(p),
              }).toString()}`}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium ${
                p === currentPage
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
