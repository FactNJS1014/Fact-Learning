"use server";

import { registerSchema, loginSchema } from "../validations";
import { registerUser, loginUser, logoutUser } from "../services/auth.service";
import { redirect } from "next/navigation";

export async function registerAction(
  prevState: { error?: string } | null,
  formData: FormData
) {
  const rawData = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  const validated = registerSchema.safeParse(rawData);
  if (!validated.success) {
    return { error: validated.error.issues[0].message };
  }

  try {
    const result = await registerUser(validated.data);
    if ("error" in result) {
      return { error: result.error };
    }
  } catch (err) {
    // Check if it's a redirect (Next.js uses this for navigation)
    if (err && typeof err === "object" && "digest" in err) {
      throw err;
    }
    console.error("Register action error:", err);
    return { error: "An unexpected error occurred. Please try again." };
  }

  redirect("/dashboard");
}

export async function loginAction(
  prevState: { error?: string } | null,
  formData: FormData
) {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validated = loginSchema.safeParse(rawData);
  if (!validated.success) {
    return { error: validated.error.issues[0].message };
  }

  try {
    const result = await loginUser(validated.data);
    if ("error" in result) {
      return { error: result.error };
    }
  } catch (err) {
    if (err && typeof err === "object" && "digest" in err) {
      throw err;
    }
    console.error("Login action error:", err);
    return { error: "An unexpected error occurred. Please try again." };
  }

  const redirectTo = formData.get("redirect") as string | null;
  redirect(redirectTo || "/dashboard");
}

export async function logoutAction() {
  await logoutUser();
  redirect("/login");
}
