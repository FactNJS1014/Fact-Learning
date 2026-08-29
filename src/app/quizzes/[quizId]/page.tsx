"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface QuizQuestion {
  id: string;
  question: string;
  type: string;
  points: number;
  options: { id: string; text: string; isCorrect: boolean }[];
}

interface QuizData {
  id: string;
  title: string;
  description: string | null;
  passScore: number;
  timeLimit: number | null;
  questions: QuizQuestion[];
}

interface QuizResult {
  score: number;
  totalPoints: number;
  percentage: number;
  passed: boolean;
}

export default function QuizPage({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    params.then(({ quizId }) => {
      fetch(`/api/quizzes/${quizId}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.quiz) {
            setQuiz(data.quiz);
            if (data.quiz.timeLimit) {
              setTimeLeft(data.quiz.timeLimit * 60);
            }
          }
        });
    });
  }, [params]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || submitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  const handleAnswer = (questionId: string, optionId: string, type: string) => {
    setAnswers((prev) => {
      if (type === "MULTIPLE_ANSWER") {
        const current = prev[questionId] || [];
        if (current.includes(optionId)) {
          return { ...prev, [questionId]: current.filter((id) => id !== optionId) };
        }
        return { ...prev, [questionId]: [...current, optionId] };
      }
      return { ...prev, [questionId]: [optionId] };
    });
  };

  const handleSubmit = async () => {
    if (!quiz || isSubmitting) return;
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/quizzes/${quiz.id}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      const data = await res.json();
      setResult(data);
      setSubmitted(true);
    } catch {
      setIsSubmitting(false);
    }
  };

  if (!quiz) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading quiz...</p>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const selectedAnswers = answers[question?.id] || [];
  const formatTime = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  if (submitted && result) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-card border border-border rounded-2xl p-8 text-center">
          <span className="text-5xl block mb-4">
            {result.passed ? "🎉" : "😔"}
          </span>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {result.passed ? "Congratulations!" : "Keep Practicing!"}
          </h1>
          <p className="text-muted-foreground mb-8">
            {result.passed
              ? "You passed the quiz!"
              : `You need ${quiz.passScore}% to pass. Try again!`}
          </p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-secondary rounded-xl p-4">
              <p className="text-2xl font-bold text-foreground">
                {result.percentage.toFixed(0)}%
              </p>
              <p className="text-xs text-muted-foreground">Score</p>
            </div>
            <div className="bg-secondary rounded-xl p-4">
              <p className="text-2xl font-bold text-foreground">
                {result.score}/{result.totalPoints}
              </p>
              <p className="text-xs text-muted-foreground">Points</p>
            </div>
            <div className="bg-secondary rounded-xl p-4">
              <p className="text-2xl font-bold text-foreground">
                {result.passed ? "+30" : "+0"}
              </p>
              <p className="text-xs text-muted-foreground">XP Earned</p>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                setSubmitted(false);
                setResult(null);
                setCurrentQuestion(0);
                setAnswers({});
              }}
              className="px-6 py-2.5 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-secondary"
            >
              Retake Quiz
            </button>
            <button
              onClick={() => router.back()}
              className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"
            >
              Back to Lesson
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold text-foreground">{quiz.title}</h1>
        {timeLeft !== null && (
          <span
            className={`text-sm font-mono font-bold ${
              timeLeft < 60 ? "text-red-400" : "text-muted-foreground"
            }`}
          >
            ⏱ {formatTime(timeLeft)}
          </span>
        )}
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-6">
        <div className="flex-1 bg-secondary rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all"
            style={{
              width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%`,
            }}
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {currentQuestion + 1}/{quiz.questions.length}
        </span>
      </div>

      {/* Question */}
      {question && (
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium">
              {question.type.replace("_", " ")}
            </span>
            <span className="text-xs text-muted-foreground">
              {question.points} points
            </span>
          </div>

          <h2 className="text-lg font-semibold text-foreground mb-6">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option) => {
              const isSelected = selectedAnswers.includes(option.id);
              return (
                <button
                  key={option.id}
                  onClick={() =>
                    handleAnswer(question.id, option.id, question.type)
                  }
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-all text-sm ${
                    isSelected
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border hover:bg-secondary text-foreground"
                  }`}
                >
                  {option.text}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
          disabled={currentQuestion === 0}
          className="px-4 py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-secondary disabled:opacity-50"
        >
          ← Previous
        </button>

        {currentQuestion < quiz.questions.length - 1 ? (
          <button
            onClick={() =>
              setCurrentQuestion((prev) =>
                Math.min(quiz.questions.length - 1, prev + 1)
              )
            }
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Quiz"}
          </button>
        )}
      </div>
    </div>
  );
}
