"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
type SkillAssessment = {
  skill: string;
  subSkill?: string | null;
  score: number;
  level: string;
  feedback?: string | null;
  timeSpent?: number;
  attemptCount?: number;
};

type Props = {
  data: SkillAssessment[];
};

export default function SkillAssessmentChart({ data }: Props) {
  const chartData = data.map((item) => ({
    name: item.subSkill ? `${item.skill} / ${item.subSkill}` : item.skill,
    score: item.score,
  }));

  return (
    <div className="w-full h-64 bg-white p-4 rounded shadow">
      <h1 className="text-lg font-medium mb-2">Чадварын үнэлгээ</h1>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            // angle={-45}
            textAnchor="end"
            interval={0}
            height={60}
          />
          <YAxis
          label={{ value: "Оноо", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="score" fill="#3b82f6" name="Оноо" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
