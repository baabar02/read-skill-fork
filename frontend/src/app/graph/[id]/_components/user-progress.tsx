"use client";
import React from "react";
import TimeLineChart from "./time-line-chart";
import CorrectIncorrectPieChart from "./correct-incorrect";
import SkillAssessmentChart from "./skill-assessment-chart";

type ProgressItem = {
  questionId: string;
  isCorrect: boolean;
  timeDuration: number;
  timeAnswer: number;
  answer: string;
  userId: string;
};

type SkillAssessment = {
  skill: string;
  subSkill: string;
  score: number;
  level: "Дутуу" | "Дундаж" | "Сайн" | "Маш сайн";
  feedback: string;
};

type AnswerMetadata = {
  timeSpent: number;
  attemptCount: number;
  difficulty: "Амархан" | "Дунд" | "Хэцүү";
  questionType: string;
  isCorrect: boolean;
};

type Props = {
  progressData: AnswerMetadata[];
  skillAssessments: SkillAssessment[];
  recommendations: string[];
};

export default function UserProgressChart({
  progressData,
  skillAssessments,
  recommendations,
}: Props) {
  const formattedData = progressData.map((item, index) => ({
    name: `Q${index + 1}`,
    timeSpent: item.timeSpent,
    attemptCount: item.attemptCount,
    isCorrect: item.isCorrect ? "Correct" : "Incorrect",
  }));

  const correctCount = progressData.filter((p) => p.isCorrect).length;
  const incorrectCount = progressData.length - correctCount;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <h2 className="text-2xl font-semibold text-center">Сурагчын үзүүлэлт</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start justify-center">
        <CorrectIncorrectPieChart
          correct={correctCount}
          incorrect={incorrectCount}
        />

        <SkillAssessmentChart data={skillAssessments} />

        <div className="md:col-span-2">
          <TimeLineChart data={formattedData} />
        </div>
      </div>

     
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-2">Сайжруулах зөвөлгөө</h3>
        <ul className="list-disc list-inside space-y-1">
          {recommendations.map((rec, i) => (
            <li key={i}>{rec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
