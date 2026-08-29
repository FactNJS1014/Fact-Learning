"use server";

import { requireAuth } from "../auth";
import {
  enrollCourse,
  getCourseProgress,
} from "../services/course.service";
import { markLessonComplete, updateStreak } from "../services/lesson.service";
import { checkAndAwardAchievements } from "../services/achievement.service";

export async function enrollCourseAction(courseId: string) {
  const user = await requireAuth();
  const result = await enrollCourse(user.id, courseId);
  return result;
}

export async function completeLessonAction(lessonId: string) {
  const user = await requireAuth();
  const result = await markLessonComplete(user.id, lessonId);
  await updateStreak(user.id);
  await checkAndAwardAchievements(user.id);
  return result;
}

export async function getCourseProgressAction(courseId: string) {
  const user = await requireAuth();
  return getCourseProgress(user.id, courseId);
}
