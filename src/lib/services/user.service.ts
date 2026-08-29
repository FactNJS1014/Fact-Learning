import { db } from "../db";

export async function getUserById(id: string) {
  return db.user.findUnique({
    where: { id },
    include: { userStats: true },
  });
}

export async function getUserProfile(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      userStats: true,
      achievements: {
        include: { achievement: true },
      },
      certificates: true,
      _count: {
        select: {
          enrollments: true,
          lessonProgress: { where: { status: "COMPLETED" } },
        },
      },
    },
  });

  return user;
}

export async function updateUserProfile(
  userId: string,
  data: {
    firstName?: string;
    lastName?: string;
    email?: string;
    avatarUrl?: string;
  }
) {
  return db.user.update({
    where: { id: userId },
    data,
  });
}

export async function getDashboardStats(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      firstName: true,
      lastName: true,
      xp: true,
      level: true,
      currentStreak: true,
      longestStreak: true,
    },
  });

  const stats = await db.userStats.findUnique({
    where: { userId },
  });

  const enrollments = await db.enrollment.findMany({
    where: { userId },
    include: {
      course: {
        include: {
          category: true,
          modules: {
            include: {
              lessons: { where: { status: "PUBLISHED" } },
            },
          },
        },
      },
    },
  });

  const activeEnrollments = enrollments.filter(
    (e) => e.status === "ACTIVE"
  );
  const completedEnrollments = enrollments.filter(
    (e) => e.status === "COMPLETED" || e.progress === 100
  );

  // Get continue learning (most recently accessed)
  const continueLearning = activeEnrollments
    .sort(
      (a, b) =>
        new Date(b.lastAccessedAt || 0).getTime() -
        new Date(a.lastAccessedAt || 0).getTime()
    )
    .slice(0, 3);

  // Get recent notifications
  const notifications = await db.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return {
    user,
    stats,
    enrollments,
    activeEnrollments,
    completedEnrollments,
    continueLearning,
    notifications,
  };
}

// Admin services
export async function getAllUsers(params?: {
  search?: string;
  role?: string;
  page?: number;
  limit?: number;
}) {
  const page = params?.page || 1;
  const limit = params?.limit || 20;
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {};

  if (params?.search) {
    where.OR = [
      { firstName: { contains: params.search, mode: "insensitive" } },
      { lastName: { contains: params.search, mode: "insensitive" } },
      { email: { contains: params.search, mode: "insensitive" } },
      { username: { contains: params.search, mode: "insensitive" } },
    ];
  }

  if (params?.role) {
    where.role = params.role;
  }

  const [users, total] = await Promise.all([
    db.user.findMany({
      where,
      include: { userStats: true },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    db.user.count({ where }),
  ]);

  return {
    users: users.map(({ passwordHash, ...u }) => u),
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
}

export async function updateUserRole(
  userId: string,
  role: "USER" | "INSTRUCTOR" | "ADMIN"
) {
  return db.user.update({
    where: { id: userId },
    data: { role },
  });
}

export async function toggleUserActive(userId: string) {
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");

  return db.user.update({
    where: { id: userId },
    data: { isActive: !user.isActive },
  });
}

export async function getAdminStats() {
  const [
    totalUsers,
    activeUsers,
    totalCourses,
    totalLessons,
    totalEnrollments,
    completedEnrollments,
    totalQuizAttempts,
  ] = await Promise.all([
    db.user.count(),
    db.user.count({ where: { isActive: true } }),
    db.course.count(),
    db.lesson.count(),
    db.enrollment.count(),
    db.enrollment.count({ where: { status: "COMPLETED" } }),
    db.quizAttempt.count(),
  ]);

  return {
    totalUsers,
    activeUsers,
    totalCourses,
    totalLessons,
    totalEnrollments,
    completedEnrollments,
    courseCompletionRate:
      totalEnrollments > 0
        ? Math.round((completedEnrollments / totalEnrollments) * 100)
        : 0,
    totalQuizAttempts,
  };
}
