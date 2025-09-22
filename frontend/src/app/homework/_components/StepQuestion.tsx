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

interface Question {
  question: string;
  options: string[];
}

interface StepQuestionProps {
  onFinish: (answers: string[]) => void;
}

export default function StepQuestion({ onFinish }: StepQuestionProps) {
  const questions: Question[] = [
    {
      question: "Хулгана хаана амьдардаг байсан бэ?",
      options: ["Ойд", "Хотоор", "Гэртээ", "Усан сан"],
    },
    {
      question: "Хулгана юу хийдэг байсан бэ?",
      options: ["Найзуудтай болдог", "Унтдаг", "Ном уншдаг", "Тоглодог"],
    },
  ];

  const [counter, setCounter] = useState(3); // tailbar countdown
  const [showQuestions, setShowQuestions] = useState(false);
  const [answers, setAnswers] = useState<string[]>(
    Array(questions.length).fill("")
  );
  const [currentIndex, setCurrentIndex] = useState(0); // Одоогийн асуултын индекс

  // Tailbar countdown
  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowQuestions(true);
    }
  }, [counter]);

  const handleOptionClick = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = option;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (answers[currentIndex] === "") return; // Хариулт сонгоогүй бол дарахгүй

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Бүх асуултанд хариулсан бол дуусгах
      onFinish(answers);
    }
  };

  // Tailbar буюу эхлэхээс өмнөх анхааруулга
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

  // Одоогийн асуулт
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
        className={`mt-4 px-6 py-3 rounded-xl shadow font-semibold transition hover:scale-105 transform
          ${
            answers[currentIndex] === ""
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-indigo-500 text-white hover:bg-indigo-600"
          }`}
      >
        Дараагийн асуулт
      </button>
    </div>
  );
}
