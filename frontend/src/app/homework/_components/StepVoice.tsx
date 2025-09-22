"use client";

import React, { useEffect, useState } from "react";

interface StepVoiceProps {
  onFinish: () => void;
}

export default function StepVoice({ onFinish }: StepVoiceProps) {
  const [counter, setCounter] = useState(3);
  const [showVoice, setShowVoice] = useState(false);

  // Countdown
  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowVoice(true);
    }
  }, [counter]);

  if (!showVoice) {
    return (
      <div className="max-w-2xl bg-gradient-to-r from-blue-50 to-indigo-50/80 rounded-3xl p-8 shadow-2xl text-center flex flex-col items-center gap-6">
        <p className="text-lg md:text-xl text-gray-800 font-semibold">
          Үлгэрийг уншаад юу ойлгосноо яриарай
        </p>
        <p className="text-5xl font-bold text-gray-700">{counter}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl bg-white/90 rounded-2xl p-6 shadow-lg text-center flex flex-col items-center gap-6">
      {/* Mic icon */}
      <div className="text-6xl text-red-500"></div>

      {/* Tailbar text */}
      <p className="text-lg text-gray-800">
        Үлгэрээс юу ойлгосноо намайд хэлээрэй!
      </p>

      {/* Дууслаа товч */}
      <button
        onClick={onFinish}
        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-2xl shadow transition"
      >
        Дууслаа
      </button>
    </div>
  );
}
