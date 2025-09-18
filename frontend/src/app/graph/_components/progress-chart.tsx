"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

type ProgressItem = {
  questionId: string;
  isCorrect: boolean;
  timeDuration: number;
  answer: string;
  userId:string
};

type Props = {
  progressData: ProgressItem[];
};

const COLORS = ["#4ade80", "#f87171"];

export default function UserProgressChart({ progressData }: Props) {
  const formattedData = progressData.map((item, index) => ({
    name: `Q${index + 1}`,
    time: item.timeDuration,
    isCorrect: item.isCorrect ? "Correct" : "Incorrect",
  }));

  const correctCount = progressData.filter((p) => p.isCorrect).length;
  const incorrectCount = progressData.length - correctCount;

  const pieData = [
    { name: "Correct", value: correctCount },
    { name: "Incorrect", value: incorrectCount },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <h2 className="text-2xl font-semibold text-center">
        User Progress Overview
      </h2>

      {/* 1. Time taken per question */}
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              label={{
                value: "Time (sec)",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="time" stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 2. Correct vs Incorrect */}
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="w-72 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 3. Bar chart (time per question) */}
        <div className="w-full md:w-[400px] h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={formattedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="time" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
