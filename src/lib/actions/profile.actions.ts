"use server";

import { requireAuth } from "../auth";
import { updateUserProfile } from "../services/user.service";
import { profileSchema } from "../validations";

export async function updateProfileAction(
  prevState: { error?: string; success?: boolean } | null,
  formData: FormData
) {
  const user = await requireAuth();

  const rawData = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
  };

  const validated = profileSchema.safeParse(rawData);
  if (!validated.success) {
    return { error: validated.error.issues[0].message };
  }

  try {
    await updateUserProfile(user.id, validated.data);
    return { success: true };
  } catch {
    return { error: "Failed to update profile" };
  }
}
