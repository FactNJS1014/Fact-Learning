import { getNotificationsAction, markAllReadAction } from "@/lib/actions/notification.actions";
import { getSessionUser } from "@/lib/auth";
import { markNotificationRead } from "@/lib/services/notification.service";

export const dynamic = "force-dynamic";

export const metadata = { title: "Notifications" };

export default async function NotificationsPage() {
  const user = await getSessionUser();
  if (!user) return null;

  const notifications = await getNotificationsAction(false);

  async function markAllRead() {
    "use server";
    await markAllReadAction();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
        {notifications.some((n) => !n.isRead) && (
          <form action={markAllRead}>
            <button
              type="submit"
              className="text-sm text-primary hover:underline"
            >
              Mark all as read
            </button>
          </form>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-xl">
          <span className="text-4xl block mb-3">🔔</span>
          <p className="text-muted-foreground">No notifications</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`bg-card border border-border rounded-xl p-4 ${
                !notif.isRead ? "border-l-4 border-l-primary" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">
                  {notif.type === "ACHIEVEMENT"
                    ? "🏆"
                    : notif.type === "QUIZ_RESULT"
                    ? "📝"
                    : notif.type === "COURSE_COMPLETED"
                    ? "🎓"
                    : notif.type === "CERTIFICATE_READY"
                    ? "📜"
                    : "🔔"}
                </span>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground text-sm">
                    {notif.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {notif.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(notif.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
