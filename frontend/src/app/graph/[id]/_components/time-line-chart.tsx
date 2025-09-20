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
  data: { name: string; timeAnswer: number; isCorrect: string }[];
};

export default function TimeLineChart({ data }: Props) {
  return (
    <div className="w-full h-64">
      <h1>Унших хурд</h1>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
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
          {/* <Line type="monotone" dataKey="time" stroke="#3b82f6" /> */}
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
