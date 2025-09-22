"use client";
import React, { useEffect, useState } from "react";

interface StepReadProps {
  onFinish: () => void;
}

export default function StepRead({ onFinish }: StepReadProps) {
  const [counter, setCounter] = useState(3); // Tailbar 5 секунд
  const [showStory, setShowStory] = useState(false);
  const [minutes, setMinutes] = useState(0); // Үлгэр унших минут
  const [seconds, setSeconds] = useState(0); // Үлгэр унших секунд

  // Tailbar countdown
  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowStory(true);
    }
  }, [counter]);

  // Үлгэр унших цаг
  useEffect(() => {
    if (showStory) {
      const interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev + 1 === 60) {
            setMinutes((m) => m + 1);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [showStory]);

  // Tailbar буюу эхлэхээс өмнөх анхааруулга
  if (!showStory) {
    return (
      <div className="max-w-2xl bg-gradient-to-r from-blue-50 to-indigo-50/80 rounded-3xl p-8 shadow-2xl text-center flex flex-col items-center gap-6">
        <p className="text-lg md:text-xl text-gray-800 font-semibold">
          Үлгэрийг сайн уншиж ойлгоорой...
        </p>
        <p className="text-3xl font-bold text-gray-700">{counter}</p>
      </div>
    );
  }

  // Үлгэр гарч ирэх хэсэг
  return (
    <div className="max-w-2xl bg-gradient-to-r from-blue-50 to-indigo-50/80 rounded-3xl p-8 shadow-2xl text-center flex flex-col items-center gap-6">
      {/* Минут:секунд цаг */}
      <div className="self-end text-sm text-gray-600 mb-2">
        ⏱ Цаг: {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </div>

      <p className="text-lg md:text-xl text-gray-900 leading-relaxed">
        Нэгэн цагт алс холын нутагт ухаантай жижигхэн хулгана амьдардаг байжээ.
        Тэр өдөр бүр шинэ зүйлс сурч, найзуудтайгаа тоглож, амьдралаа хөгжилтэй
        өнгөрүүлдэг байв.
      </p>

      <button
        onClick={onFinish}
        className="px-8 py-3 bg-indigo-700 text-white font-bold rounded-2xl shadow-lg hover:scale-105 transform transition duration-300"
      >
        📖 Уншиж дууслаа
      </button>
    </div>
  );
}
