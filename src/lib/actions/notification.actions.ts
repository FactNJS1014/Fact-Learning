"use server";

import { requireAuth } from "../auth";
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  getUnreadCount,
} from "../services/notification.service";

export async function getNotificationsAction(unreadOnly = false) {
  const user = await requireAuth();
  return getNotifications(user.id, unreadOnly);
}

export async function markNotificationReadAction(id: string) {
  await requireAuth();
  return markNotificationRead(id);
}

export async function markAllReadAction() {
  const user = await requireAuth();
  return markAllNotificationsRead(user.id);
}

export async function getUnreadCountAction() {
  const user = await requireAuth();
  return getUnreadCount(user.id);
}
