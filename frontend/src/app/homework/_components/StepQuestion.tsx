// "use client";

// import React, { useEffect, useState } from "react";

// interface Question {
//   question: string;
//   options: string[];
// }

// interface StepQuestionProps {
//   onFinish: (answers: string[]) => void;
// }

// export default function StepQuestion({ onFinish }: StepQuestionProps) {
//   const questions: Question[] = [
//     {
//       question: "Хулгана хаана амьдардаг байсан бэ?",
//       options: ["Ойд", "Хотоор", "Гэртээ", "Усан сан"]
//     },
//     {
//       question: "Хулгана юу хийдэг байсан бэ?",
//       options: ["Найзуудтай болдог", "Унтдаг", "Ном уншдаг", "Тоглодог"]
//     }
//   ];

//   const [counter, setCounter] = useState(3); // tailbar countdown
//   const [showQuestions, setShowQuestions] = useState(false);
//   const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill("")); // undefined-г засав

//   // Tailbar countdown
//   useEffect(() => {
//     if (counter > 0) {
//       const timer = setTimeout(() => setCounter(counter - 1), 1000);
//       return () => clearTimeout(timer);
//     } else {
//       setShowQuestions(true);
//     }
//   }, [counter]);

//   const handleOptionClick = (qIndex: number, option: string) => {
//     const newAnswers = [...answers];
//     newAnswers[qIndex] = option;
//     setAnswers(newAnswers);

//     // Бүх асуултанд хариулсан бол дуусгах
//     if (newAnswers.every((ans) => ans !== "")) {
//       onFinish(newAnswers);
//     }
//   };

//   // Tailbar буюу эхлэхээс өмнөх анхааруулга
//   if (!showQuestions) {
//     return (
//       <div className="max-w-2xl bg-gradient-to-r from-yellow-50 to-yellow-100/80 rounded-3xl p-8 shadow-2xl text-center flex flex-col items-center gap-6">
//         <p className="text-lg md:text-xl text-gray-800 font-semibold">
//           асуултыг уншиж нэг хариултыг сонго
//         </p>
//         <p className="text-3xl font-bold text-gray-700">{counter}</p>
//       </div>
//     );
//   }

//   // Бүх асуулт зэрэг grid-д
//   return (
//     <div className="max-w-3xl bg-gradient-to-r from-blue-50 to-indigo-50/80 rounded-3xl p-8 shadow-2xl text-left flex flex-col gap-6">
//       {questions.map((q, index) => (
//         <div key={index}>
//           <p className="text-lg md:text-xl font-semibold mb-3">{q.question}</p>
//           <div className="grid grid-cols-2 gap-4">
//             {q.options.map((option) => (
//               <button
//                 key={option}
//                 onClick={() => handleOptionClick(index, option)}
//                 className={`px-4 py-3 rounded-xl shadow font-medium transition hover:scale-105 transform
//                   ${answers[index] === option ? "bg-green-500 text-white" : "bg-blue-500 text-white hover:bg-blue-600"}`}
//               >
//                 {option}
//               </button>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import {
  useLatestQuestionQuery,
  useSubmitAnswerMutation,
} from "../../../../graphql/generated";

interface Question {
  _id: string; // асуултын ID
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
    data?.latestQuestion?.questions.map((q, index) => ({
      _id: (q as any).id ?? "", // хэрэв id байгаа бол аваад, байхгүй бол түр зуурын id өгнө
      question: q.question,
      options: q.option?.options || [],
    })) || [];

  const [counter, setCounter] = useState(3); // таймер
  const [showQuestions, setShowQuestions] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Асуултуудыг localStorage-д хадгалах ба хариултуудыг бэлдэх
  useEffect(() => {
    setAnswers(Array(questions.length).fill(""));
    if (questions.length > 0) {
      localStorage.setItem("questions", JSON.stringify(questions));
    }
  }, [questions.length]);

  // Таймерын useEffect
  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowQuestions(true);
    }
  }, [counter]);

  if (loading) return <p>Ачааллаж байна...</p>;
  if (error) return <p>Алдаа гарлаа: {error.message}</p>;
  if (!questions.length && showQuestions) return <p>Асуулт олдсонгүй.</p>;

  // Хариулт сонгох функц
  const handleOptionClick = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = option;
    setAnswers(newAnswers);
  };

  // Дараагийн асуултруу шилжих, submit хийх функц
  const handleNext = async () => {
    if (answers[currentIndex] === "") return;

    const storedQuestions = localStorage.getItem("questions");
    const latestStoryId = localStorage.getItem("latestStoryId");

    const token = localStorage.getItem("token");

    if (!storedQuestions) {
      console.error("Асуултууд localStorage-д байхгүй байна");
      return;
    }
    if (!latestStoryId) {
      console.error("latestStoryId localStorage-д байхгүй байна");
      return;
    }

    const parsedQuestions: Question[] = JSON.parse(storedQuestions);
    // Одоо асуултын ID-д latestStoryId-г ашиглана
    const questionId = latestStoryId;

    try {
      await submitAnswer({
        variables: {
          questionId,
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
    } catch (err) {
      console.error("Хариулт илгээхэд алдаа:", err);
      return;
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
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
