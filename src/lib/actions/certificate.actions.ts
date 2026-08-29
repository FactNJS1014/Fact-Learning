"use server";

import { requireAuth } from "../auth";
import { generateCertificate, getUserCertificates } from "../services/certificate.service";

export async function generateCertificateAction(courseId: string) {
  const user = await requireAuth();
  return generateCertificate(user.id, courseId);
}

export async function getCertificatesAction() {
  const user = await requireAuth();
  return getUserCertificates(user.id);
}
