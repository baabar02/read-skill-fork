"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: { name: string; timeSpent: number; attemptCount: number }[];
};

export default function TimeLineChart({ data }: Props) {
  return (
    <div className="w-full h-64">
      <h1 className="text-lg font-medium mb-2">Унших болон Хариулах хугацаа</h1>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            label={{ value: "Time (сек)", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="attemptCount"
            stroke="#3b82f6"
            name="Answer Attempts"
          />
          <Line
            type="monotone"
            dataKey="timeSpent"
            stroke="#10b981"
            name="Time Spent (сек)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
