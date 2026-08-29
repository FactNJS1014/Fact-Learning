import { db } from "../db";

export async function createNotification(
  userId: string,
  type: "COURSE_UPDATE" | "QUIZ_RESULT" | "ACHIEVEMENT" | "COURSE_COMPLETED" | "CERTIFICATE_READY" | "SYSTEM",
  title: string,
  message: string,
  link?: string
) {
  return db.notification.create({
    data: {
      userId,
      type,
      title,
      message,
      link,
    },
  });
}

export async function getNotifications(userId: string, unreadOnly = false) {
  return db.notification.findMany({
    where: {
      userId,
      ...(unreadOnly ? { isRead: false } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
}

export async function markNotificationRead(id: string) {
  return db.notification.update({
    where: { id },
    data: { isRead: true },
  });
}

export async function markAllNotificationsRead(userId: string) {
  return db.notification.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true },
  });
}

export async function getUnreadCount(userId: string) {
  return db.notification.count({
    where: { userId, isRead: false },
  });
}
