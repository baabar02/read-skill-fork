"use client";
import React from "react";
import TimeLineChart from "./time-line-chart";
import CorrectIncorrectPieChart from "./correct-incorrect";
import TimeBarChart from "./time-bar-chart";

type ProgressItem = {
  questionId: string;
  isCorrect: boolean;
  timeDuration: number;
  timeAnswer: number;
  answer: string;
  userId: string;
};

type Props = {
  progressData: ProgressItem[];
};

export default function UserProgressChart({ progressData }: Props) {
  const formattedData = progressData.map((item, index) => ({
    name: `Q${index + 1}`,
    timeAnswer: item.timeAnswer,
    timeDuration: item.timeDuration,
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
        <TimeBarChart data={formattedData} />
        <div className="md:col-span-2">
          <TimeLineChart data={formattedData} />
        </div>
      </div>
    </div>
  );
}
