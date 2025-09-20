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

type Props = {
  data: {
    name: string;
    timeAnswer: number;
    timeDuration: number;
    isCorrect: string;
  }[];
};

export default function TimeBarChart({ data }: Props) {
  return (
    <div className="w-full md:w-[400px] h-64">
      <h1>Хариултанд зарцуулсан хугацаа</h1>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar dataKey="timeAnswer" fill="#6366f1" name="Answer Time" />
          <Bar dataKey="timeDuration" fill="#10b981" name="Reading Time" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
