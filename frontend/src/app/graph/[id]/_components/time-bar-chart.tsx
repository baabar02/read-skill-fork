
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
  data: { name: string; timeAnswer: number; timeDuration: number }[];
};

export default function TimeBarChart({ data }: Props) {
  return (
    <div className="w-full h-64">
      <h1 className="text-lg font-medium mb-2">Хариулах хугацаа Бичилттэй</h1>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            label={{ value: "Time (сек)", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="timeAnswer" fill="#3b82f6" name="Answer Time" />
          <Bar dataKey="timeDuration" fill="#10b981" name="Reading Time" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
