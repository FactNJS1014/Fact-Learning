"use server";

import { requireAuth } from "../auth";
import { db } from "../db";
import { noteSchema } from "../validations";

export async function createNoteAction(
  prevState: { error?: string; success?: boolean } | null,
  formData: FormData
) {
  const user = await requireAuth();
  const content = formData.get("content") as string;
  const lessonId = formData.get("lessonId") as string;

  const validated = noteSchema.safeParse({ content, lessonId });
  if (!validated.success) {
    return { error: validated.error.issues[0].message };
  }

  await db.note.create({
    data: {
      userId: user.id,
      lessonId: validated.data.lessonId,
      content: validated.data.content,
    },
  });

  return { success: true };
}

export async function getNotesAction(lessonId: string) {
  const user = await requireAuth();
  return db.note.findMany({
    where: { userId: user.id, lessonId },
    orderBy: { createdAt: "desc" },
  });
}

export async function deleteNoteAction(noteId: string) {
  const user = await requireAuth();
  const note = await db.note.findUnique({ where: { id: noteId } });
  if (!note || note.userId !== user.id) {
    return { error: "Not authorized" };
  }
  await db.note.delete({ where: { id: noteId } });
  return { success: true };
}
