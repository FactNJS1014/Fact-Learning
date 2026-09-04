import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const p = new PrismaClient();

const [courses, modules, lessons, exercises, quizzes, questions, options, projects, achievements, users] =
  await Promise.all([
    p.course.count(),
    p.module.count(),
    p.lesson.count(),
    p.exercise.count(),
    p.quiz.count(),
    p.quizQuestion.count(),
    p.quizOption.count(),
    p.project.count(),
    p.achievement.count(),
    p.user.count(),
  ]);

console.log("Courses:", courses);
console.log("Modules:", modules);
console.log("Lessons:", lessons);
console.log("Exercises:", exercises);
console.log("Quizzes:", quizzes);
console.log("Questions:", questions);
console.log("Options:", options);
console.log("Projects:", projects);
console.log("Achievements:", achievements);
console.log("Users:", users);

// modules per course
const perCourse = await p.course.findMany({
  select: {
    title: true,
    _count: { select: { modules: true, projects: true } },
    modules: { select: { _count: { select: { lessons: true } } } },
  },
  orderBy: { title: "asc" },
});
for (const c of perCourse) {
  const lessons = c.modules.reduce((acc, m) => acc + m._count.lessons, 0);
  console.log(`  ${c.title}: ${c._count.modules} modules, ${lessons} lessons, ${c._count.projects} projects`);
}

await p.$disconnect();