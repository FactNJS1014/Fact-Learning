import { getBookmarksAction } from "@/lib/actions/bookmark.actions";
import { getSessionUser } from "@/lib/auth";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = { title: "Bookmarks" };

export default async function BookmarksPage() {
  const user = await getSessionUser();
  if (!user) return null;

  const bookmarks = await getBookmarksAction();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-8">Bookmarks</h1>

      {bookmarks.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-xl">
          <span className="text-4xl block mb-3">🔖</span>
          <p className="text-muted-foreground">No bookmarks yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Bookmark lessons to find them quickly later
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {bookmarks.map((bookmark) => (
            <Link
              key={bookmark.id}
              href={`/courses/${bookmark.lesson.module.course.slug}/lessons/${bookmark.lessonId}`}
              className="block bg-card border border-border rounded-xl p-4 hover:border-primary/50 transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-foreground text-sm">
                    {bookmark.lesson.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {bookmark.lesson.module.course.title}
                  </p>
                </div>
                <span className="text-muted-foreground">→</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
