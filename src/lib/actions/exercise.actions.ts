"use server";

import { requireAuth } from "../auth";
import { completeExercise } from "../services/exercise.service";

export async function completeExerciseAction(exerciseId: string) {
  const user = await requireAuth();
  return completeExercise(user.id, exerciseId);
}
