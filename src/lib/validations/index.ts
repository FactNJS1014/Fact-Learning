import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username must be at most 30 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores"
      ),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().min(1, "Email or username is required"),
  password: z.string().min(1, "Password is required"),
});

export const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
});

export const courseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  categoryId: z.string().min(1, "Category is required"),
  level: z.enum(["BASIC", "INTERMEDIATE", "ADVANCED"]),
  difficulty: z.enum(["BEGINNER", "EASY", "MEDIUM", "HARD", "EXPERT"]),
  estimatedHours: z.number().positive().optional(),
  requirements: z.array(z.string()).optional(),
  objectives: z.array(z.string()).optional(),
});

export const lessonSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  moduleId: z.string().min(1, "Module is required"),
  estimatedMinutes: z.number().positive().optional(),
  videoUrl: z.string().url().optional().or(z.literal("")),
});

export const quizSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  lessonId: z.string().min(1, "Lesson is required"),
  passScore: z.number().min(0).max(100).default(70),
  timeLimit: z.number().positive().optional(),
});

export const quizQuestionSchema = z.object({
  question: z.string().min(1, "Question is required"),
  type: z.enum(["MULTIPLE_CHOICE", "TRUE_FALSE", "MULTIPLE_ANSWER"]),
  points: z.number().positive().default(10),
  options: z
    .array(
      z.object({
        text: z.string().min(1, "Option text is required"),
        isCorrect: z.boolean(),
      })
    )
    .min(2, "At least 2 options required"),
});

export const exerciseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  requirements: z.array(z.string()).optional(),
  example: z.string().optional(),
  expectedOutput: z.string().optional(),
  hint: z.string().optional(),
  solution: z.string().optional(),
  points: z.number().positive().default(10),
});

export const noteSchema = z.object({
  content: z.string().min(1, "Note content is required"),
  lessonId: z.string().min(1, "Lesson ID is required"),
});

export const moduleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  courseId: z.string().min(1, "Course is required"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CourseInput = z.infer<typeof courseSchema>;
export type LessonInput = z.infer<typeof lessonSchema>;
export type QuizInput = z.infer<typeof quizSchema>;
export type ExerciseInput = z.infer<typeof exerciseSchema>;
export type NoteInput = z.infer<typeof noteSchema>;
