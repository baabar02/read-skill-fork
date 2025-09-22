"use client";

import React, { useEffect, useState } from "react";

interface StepPuzzleProps {
  onFinish: () => void;
}

export default function StepPuzle({ onFinish }: StepPuzzleProps) {
  const [counter, setCounter] = useState(3); // tailbar 5 секунд
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  // Tailbar countdown
  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowPuzzle(true);
    }
  }, [counter]);

  // Puzzle өгөгдөл
  const puzzleText = ["Нэгэн", "________", "олон", "найзтай", "хулгана"];
  const words = ["хулгана", "тоглодог", "ойд", "ном", "найзуудтай"];

  const handleWordClick = (index: number, word: string) => {
    setAnswers((prev) => ({ ...prev, [index]: word }));
  };

  // Tailbar буюу эхлэхээс өмнөх анхааруулга
  if (!showPuzzle) {
    return (
      <div className="max-w-2xl bg-gradient-to-r from-blue-50 to-indigo-50/80 rounded-3xl p-8 shadow-2xl text-center flex flex-col items-center gap-6">
        <p className="text-lg md:text-xl text-gray-800 font-semibold">
          Өгүүлбэрийг зөв бүтэцд оруул..
        </p>
        <p className="text-5xl font-bold text-gray-700">{counter}</p>
      </div>
    );
  }

  // Puzzle UI
  return (
    <div className="max-w-2xl bg-gradient-to-r from-blue-50 to-indigo-50/80 rounded-3xl p-8 shadow-2xl text-left flex flex-col gap-6">
      {/* Puzzle текст */}
      <p className="text-lg md:text-xl mb-6">
        {puzzleText.map((word, idx) =>
          word === "________" ? (
            <span
              key={idx}
              className="inline-block w-24 border-b-2 border-gray-700 mx-1 text-center cursor-pointer hover:bg-gray-200 rounded"
            >
              {answers[idx] || "____"}
            </span>
          ) : (
            <span key={idx} className="mx-1">
              {word}
            </span>
          )
        )}
      </p>

      {/* Холилдсон үгс */}
      <div className="flex flex-wrap gap-3 mb-6">
        {words.map((word, idx) => (
          <button
            key={idx}
            onClick={() => {
              const blankIndex = puzzleText.findIndex((w) => w === "________");
              handleWordClick(blankIndex, word);
            }}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow font-medium transition hover:scale-105 transform"
          >
            {word}
          </button>
        ))}
      </div>

      {/* Дууслаа товч */}
      <button
        onClick={onFinish}
        className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-2xl shadow-lg transition hover:scale-105 transform"
      >
        🎉 Дууслаа
      </button>
    </div>
  );
}
