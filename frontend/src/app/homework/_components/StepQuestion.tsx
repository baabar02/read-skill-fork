"use client";

import React, { useEffect, useState } from "react";
import {
  useLatestQuestionQuery,
  useSubmitAnswerMutation,
} from "../../../../graphql/generated";

interface Question {
  _id: string; 
  question: string;
  options: string[];
}

interface StepQuestionProps {
  onFinish: (answers: string[]) => void;
}

export default function StepQuestion({ onFinish }: StepQuestionProps) {
  const { data, loading, error } = useLatestQuestionQuery();
  const [submitAnswer, { loading: submitLoading }] = useSubmitAnswerMutation();


const questions: Question[] =
  data?.latestQuestion?.questions.map((q: any) => ({
    _id: q._id ?? "",
    question: q.question,
    options: q.option?.options || [],
    explanation: q.option?.explanation || "",
    correctAnswer: q.option?.correctAnswer || "",
    skill: q.skill,
    subSkill: q.subSkill,
  })) || [];

  const [counter, setCounter] = useState(3); // таймер
  const [showQuestions, setShowQuestions] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // init answers and persist questions to localStorage for debugging / crash recovery
  useEffect(() => {
    setAnswers(Array(questions.length).fill(""));
    if (questions.length > 0) {
      localStorage.setItem("questions", JSON.stringify(questions));
      // also store the quiz/document id if you want: localStorage.setItem('latestQuestionDocId', data.latestQuestion._id)
      console.log("Saved questions to localStorage:", questions);
    }
  }, [questions.length]);

  // таймер
  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowQuestions(true);
    }
  }, [counter]);

  if (loading) return <p>Ачааллаж байна...</p>;
  if (error) return <p>Алдаа гарлаа: {error.message}</p>;
  if (!questions.length && showQuestions) return <p>Асуулт олдсонгүй.</p>;

  const handleOptionClick = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = option;
    setAnswers(newAnswers);
  };

  const handleNext = async () => {
    if (!answers[currentIndex]) return;

    const storedQuestions = localStorage.getItem("questions");
    if (!storedQuestions) {
      console.error("Асуултууд localStorage-д байхгүй байна");
      // as fallback try to use in-memory questions
    }

    // best: use parsedQuestions from localStorage if available, else use questions from query
    const parsedQuestions: Question[] = storedQuestions
      ? JSON.parse(storedQuestions)
      : questions;

    // Ensure current sub-question has an _id
    const subQuestion = parsedQuestions[currentIndex] || questions[currentIndex];
    const questionId =
      subQuestion?._id ??
      subQuestion?._id ??
      ""; // MUST be sub-question _id (not parent doc id)

    if (!questionId) {
      console.error("Энэ асуултанд тохирох _id олдсонгүй:", {
        index: currentIndex,
        parsedQuestions,
      });
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token олдсонгүй. Хэрэглэгч нэвтрээгүй байна.");
      // optionally redirect to login or show message
      return;
    }

    try {
      const res = await submitAnswer({
        variables: {
          questionId, // sub-question _id
          userAnswer: answers[currentIndex],
          selectedOption: answers[currentIndex],
          metadata: {
            timeSpent: 10,
            attemptCount: 1,
            questionType: "multiple-choice",
          },
        },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      // Debug: show server response if needed
      console.log("submitAnswer response:", res);

    } catch (err: any) {
      // Apollo errors often in graphQLErrors / networkError
      console.error("Хариулт илгээхэд алдаа:", err);
      if (err.graphQLErrors) console.error("graphQLErrors:", err.graphQLErrors);
      if (err.networkError) console.error("networkError:", err.networkError);
      return;
    }

    // proceed to next question or finish
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      onFinish(answers);
    }
  };

  if (!showQuestions) {
    return (
      <div className="max-w-2xl bg-gradient-to-r from-blue-50 to-indigo-50/80 rounded-3xl p-8 shadow-2xl text-center flex flex-col items-center gap-6">
        <p className="text-lg md:text-xl text-gray-800 font-semibold">
          Асуултыг уншиж нэг хариултыг сонго
        </p>
        <p className="text-3xl font-bold text-gray-700">{counter}</p>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="max-w-3xl bg-gradient-to-r from-blue-50 to-indigo-50/80 rounded-3xl p-8 shadow-2xl text-left flex flex-col gap-6">
      <p className="text-lg md:text-xl font-semibold mb-3">
        {currentQuestion.question}
      </p>
      <div className="grid grid-cols-2 gap-4">
        {currentQuestion.options.map((option) => (
          <button
            key={option}
            onClick={() => handleOptionClick(option)}
            className={`px-4 py-3 rounded-xl shadow font-medium transition hover:scale-105 transform
              ${
                answers[currentIndex] === option
                  ? "bg-green-500 text-white"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        onClick={handleNext}
        disabled={answers[currentIndex] === "" || submitLoading}
        className={`mt-4 px-6 py-3 rounded-xl shadow font-semibold transition hover:scale-105 transform
          ${
            answers[currentIndex] === "" || submitLoading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-indigo-500 text-white hover:bg-indigo-600"
          }`}
      >
        {submitLoading ? "Илгээж байна..." : "Дараагийн асуулт"}
      </button>
    </div>
  );
}
