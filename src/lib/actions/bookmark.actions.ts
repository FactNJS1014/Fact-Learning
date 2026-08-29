"use server";

import { requireAuth } from "../auth";
import { db } from "../db";

export async function toggleBookmarkAction(lessonId: string) {
  const user = await requireAuth();
  const existing = await db.bookmark.findUnique({
    where: { userId_lessonId: { userId: user.id, lessonId } },
  });

  if (existing) {
    await db.bookmark.delete({ where: { id: existing.id } });
    return { bookmarked: false };
  }

  await db.bookmark.create({
    data: { userId: user.id, lessonId },
  });
  return { bookmarked: true };
}

export async function getBookmarksAction() {
  const user = await requireAuth();
  return db.bookmark.findMany({
    where: { userId: user.id },
    include: {
      lesson: {
        include: {
          module: { include: { course: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function isBookmarkedAction(lessonId: string) {
  const user = await requireAuth();
  const bookmark = await db.bookmark.findUnique({
    where: { userId_lessonId: { userId: user.id, lessonId } },
  });
  return { bookmarked: !!bookmark };
}
