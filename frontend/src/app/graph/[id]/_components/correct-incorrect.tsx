"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Props = {
  correct: number;
  incorrect: number;
};

const COLORS = ["#4ade80", "#f87171"];

export default function CorrectIncorrectPieChart({
  correct,
  incorrect,
}: Props) {
  const data = [
    { name: "Correct", value: correct },
    { name: "Incorrect", value: incorrect },
  ];

  return (
    <div className="w-72 h-72">
      <h1 className="text-lg font-medium mb-2 text-center">
        Зөв/Буруу Хариултууд
      </h1>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
