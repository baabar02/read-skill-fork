"use client";

import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import Confetti from "react-confetti";
import StepRead from "./_components/StepRead";
import StepQuestion from "./_components/StepQuestion";

import StepVoice from "./_components/StepVoice";
import RobotAnim from "@/assets/illustrations/Robot-Bot-3D.json";
import Link from "next/link";

export default function HomeWorkPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/user-bg.jpg')" }}
    >
      <div className="min-h-screen bg-black/40 flex flex-col items-center justify-center text-center px-4">
        {step === 0 && (
          <>
            <div className="flex items-center justify-center gap-3 mb-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                Сайн уу, найз аа
              </h1>
              <div className="w-16 h-16">
                <Lottie animationData={RobotAnim} loop={true} />
              </div>
            </div>

            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Даалгаварт нь амжилт хүсье
            </p>

            <button
              onClick={() => setStep(1)}
              className="px-6 py-3 bg-indigo-700 hover:bg-blue-700 text-white font-semibold rounded-2xl shadow-lg transition"
            >
              Эхлэх
            </button>
          </>
        )}

        {step === 1 && <StepRead onFinish={() => setStep(2)} />}

        {step === 2 && (
          <StepQuestion
            onFinish={(ans) => {
              setAnswers(ans);
              setStep(3);
            }}
          />
        )}

       

        {step === 3 && <StepVoice onFinish={() => setStep(4)} />}

        {step === 4 && (
          <>
            <Confetti
              width={windowSize.width}
              height={windowSize.height}
              numberOfPieces={250}
              gravity={0.3}
            />

            <div className="relative z-10 max-w-2xl rounded-2xl p-6 shadow-lg text-center ">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
                🎉 Амжилттай дууслаа!
              </h2>

              <div className="flex flex-col md:flex-row justify-center gap-4">
                <Link href="/user">
                  <button
                    onClick={() => "GO товч дарагдлаа!"}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow transition"
                  >
                    Урагшаа
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
