import { db } from "../db";
import { v4 as uuidv4 } from "uuid";

export async function generateCertificate(userId: string, courseId: string) {
  // Check if already has certificate
  const existing = await db.certificate.findFirst({
    where: { userId, courseId },
  });

  if (existing) {
    return { certificate: existing, alreadyExists: true };
  }

  // Verify course is completed
  const enrollment = await db.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId } },
  });

  if (!enrollment || enrollment.status !== "COMPLETED") {
    return { error: "Course not completed" };
  }

  const user = await db.user.findUnique({ where: { id: userId } });
  const course = await db.course.findUnique({ where: { id: courseId } });

  if (!user || !course) {
    return { error: "User or course not found" };
  }

  const certificate = await db.certificate.create({
    data: {
      userId,
      courseId,
      certificateId: `FL-${uuidv4().slice(0, 8).toUpperCase()}`,
    },
  });

  // Create notification
  await db.notification.create({
    data: {
      userId,
      type: "CERTIFICATE_READY",
      title: "Certificate Ready!",
      message: `Congratulations! You've earned a certificate for completing ${course.title}`,
    },
  });

  return { certificate };
}

export async function getUserCertificates(userId: string) {
  return db.certificate.findMany({
    where: { userId },
    orderBy: { completedAt: "desc" },
  });
}
