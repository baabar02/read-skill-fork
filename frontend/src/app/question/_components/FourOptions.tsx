"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Question = {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
};

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Монгол Улсын нийслэл аль вэ?",
    options: ["Улаанбаатар", "Эрдэнэт", "Дархан", "Хархорин"],
    correctIndex: 0,
  },
  {
    id: 2,
    text: "Нар ямар өнгөтэй вэ?",
    options: ["Цэнхэр", "Шар", "Ногоон", "Хар"],
    correctIndex: 1,
  },
  {
    id: 3,
    text: "Монгол бичгийн алдартай хүн хэн бэ?",
    options: ["Гуталчин Чимэд", "Чингис хаан", "Сүхбаатар", "Жанлав"],
    correctIndex: 1,
  },
];

export default function FourOptions() {

  // const {data} = 
  const [selected, setSelected] = useState<Record<number, number | null>>(() => {
    const init: Record<number, number | null> = {};
    QUESTIONS.forEach((q) => (init[q.id] = null));
    return init;
  });

  const [revealed, setRevealed] = useState<Record<number, boolean>>(() => {
    const init: Record<number, boolean> = {};
    QUESTIONS.forEach((q) => (init[q.id] = false));
    return init;
  });

  const correctCount = QUESTIONS.reduce(
    (acc, q) => (revealed[q.id] && selected[q.id] === q.correctIndex ? acc + 1 : acc),
    0
  );

  function handleSelect(q: Question, optionIndex: number) {
    if (revealed[q.id]) return;
    setSelected((s) => ({ ...s, [q.id]: optionIndex }));
    setRevealed((r) => ({ ...r, [q.id]: true }));
  }

  function optionClasses(q: Question, idx: number) {
    const sel = selected[q.id];
    const isRevealed = revealed[q.id];

    let base =
      "justify-between text-lg font-semibold rounded-2xl py-3 shadow-md hover:scale-105 transition-transform w-full flex px-5 ";

    if (!isRevealed) {
      base += "bg-blue-400 hover:bg-blue-100 border-2 border-blue-100 text-black";
    } else {
      if (idx === q.correctIndex) base += "bg-green-400 border-green-500 text-white";
      else if (sel === idx && idx !== q.correctIndex) base += "bg-red-400 border-red-500 text-white line-through";
      else base += "bg-yellow-50 border-yellow-200 text-black";
    }

    return base;
  }

  const batteryPercent = Math.round((correctCount / QUESTIONS.length) * 100);

  return (
    <Card className="max-w-3xl mx-auto p-4 space-y-6 bg-blue-400">
      {/* Гарчиг */}
      <h2 className="text-3xl font-extrabold text-center ">🔍 Асуулт & Хариулт </h2>

      {/* Battery progress */}
      <div className="w-full bg-gray-300 h-6 rounded-full overflow-hidden relative shadow-inner">
        <div
          className="h-6 rounded-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
          style={{ width: `${batteryPercent}%` }}
        ></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-sm font-bold text-black">
          {batteryPercent}%
        </div>
      </div>

      {/* Асуултууд */}
      {QUESTIONS.map((q) => (
        <Card key={q.id} className="bg-blue-300 shadow-lg rounded-3xl border-2 border-blue-200">
          <CardContent className="space-y-4 ">
            <h3 className="text-xl font-bold ">
              {q.id}. {q.text}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ">
              {q.options.map((opt, idx) => (
                <Button
                  key={idx}
                  className={optionClasses(q, idx)}
                  onClick={() => handleSelect(q, idx)}
                >
                  <span>{String.fromCharCode(65 + idx)}. {opt}</span>
                  {revealed[q.id] && (
                    <span className="ml-2 text-xl">
                      {idx === q.correctIndex
                        ? "✅"
                        : selected[q.id] === idx
                        ? "❌"
                        : ""}
                    </span>
                  )}
                </Button>
              ))}
            </div>

            {revealed[q.id] && (
              <div
                className={`mt-1 text-md font-medium ${
                  selected[q.id] === q.correctIndex ? "text-green-600" : "text-red-600"
                }`}
              >
                {selected[q.id] === q.correctIndex
                  ? "👍 сайн байна — зөв хариуллаа!"
                  : `😅 Алдаатай: зөв хариулт — ${String.fromCharCode(
                      65 + q.correctIndex
                    )}. ${q.options[q.correctIndex]}`}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </Card>
  );
}
