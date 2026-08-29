import { db } from "../db";

export async function checkAndAwardAchievements(userId: string) {
  const stats = await db.userStats.findUnique({ where: { userId } });
  if (!stats) return [];

  const achievements = await db.achievement.findMany();
  const unlocked = await db.userAchievement.findMany({
    where: { userId },
    select: { achievementId: true },
  });
  const unlockedIds = new Set(unlocked.map((u) => u.achievementId));

  const newAchievements: { id: string; userId: string; achievementId: string; unlockedAt: Date; achievement: { id: string; name: string; description: string; icon: string | null; category: string | null; requirement: string; xpReward: number } }[] = [];

  for (const achievement of achievements) {
    if (unlockedIds.has(achievement.id)) continue;

    const rule = JSON.parse(achievement.requirement) as {
      type: string;
      count?: number;
    };
    let earned = false;

    switch (rule.type) {
      case "lessons_completed":
        earned = stats.lessonsCompleted >= (rule.count || 1);
        break;
      case "courses_completed":
        earned = stats.coursesCompleted >= (rule.count || 1);
        break;
      case "quizzes_passed":
        earned = stats.quizzesPassed >= (rule.count || 1);
        break;
      case "exercises_completed":
        earned = stats.exercisesCompleted >= (rule.count || 1);
        break;
      case "first_lesson":
        earned = stats.lessonsCompleted >= 1;
        break;
      case "first_quiz":
        earned = stats.quizzesPassed >= 1;
        break;
      case "first_course":
        earned = stats.coursesCompleted >= 1;
        break;
    }

    if (earned) {
      const userAchievement = await db.userAchievement.create({
        data: {
          userId,
          achievementId: achievement.id,
        },
      });

      // Award XP
      if (achievement.xpReward > 0) {
        await db.user.update({
          where: { id: userId },
          data: { xp: { increment: achievement.xpReward } },
        });
      }

      newAchievements.push({ ...userAchievement, achievement });
    }
  }

  return newAchievements;
}

export async function getUserAchievements(userId: string) {
  return db.userAchievement.findMany({
    where: { userId },
    include: { achievement: true },
    orderBy: { unlockedAt: "desc" },
  });
}

export async function getAllAchievements() {
  return db.achievement.findMany({
    orderBy: { name: "asc" },
  });
}
