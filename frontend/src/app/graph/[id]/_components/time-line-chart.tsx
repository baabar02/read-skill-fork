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
  data: { name: string; timeAnswer: number; timeDuration: number }[];
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
            dataKey="timeAnswer"
            stroke="#3b82f6"
            name="Answer Time"
          />
          <Line
            type="monotone"
            dataKey="timeDuration"
            stroke="#10b981"
            name="Reading Time"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
