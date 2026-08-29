import { getCourses, getCategories } from "@/lib/services/course.service";
import { Metadata } from "next";
import Link from "next/link";
import { LanguageLogo } from "@/components/ui/language-logo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Manage Courses" };

export default async function AdminCoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const search = typeof params.search === "string" ? params.search : undefined;

  const { courses, total } = await getCourses({
    search,
    status: undefined, // Get all statuses for admin
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          Courses ({total})
        </h1>
      </div>

      {/* Search */}
      <form className="mb-6" method="get">
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Search courses..."
          className="w-full max-w-md px-4 py-2 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </form>

      {/* Courses Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Course
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Level
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Enrollments
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Created
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-secondary/50">
                  <td className="px-4 py-3">
                    <Link
                      href={`/courses/${course.slug}`}
                      className="flex items-center gap-3"
                    >
                      <LanguageLogo src={course.languageIcon} alt={course.title} size="md" />
                      <div>
                        <p className="font-medium text-foreground hover:text-primary">
                          {course.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {course.category.name}
                        </p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        course.level === "BASIC"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : course.level === "INTERMEDIATE"
                          ? "bg-amber-500/10 text-amber-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {course.level}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        course.status === "PUBLISHED"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : course.status === "DRAFT"
                          ? "bg-amber-500/10 text-amber-400"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {course.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {course._count.enrollments}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
