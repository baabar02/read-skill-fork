"use client";

import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserProgressDocument } from "../../../../graphql/generated";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Loader2, CheckCircle, XCircle, BookOpen, Brain } from "lucide-react";

import {
  GenerateMcqQuestionsDocument,
  SubmitAnswerDocument,
} from "../../../../graphql/generated";
import { useUser } from "@/app/providers/UserProvider";

type Question = {
  id: string;
  question: string;
  answer: string;
  option: {
    options: string[];
    explanation: string;
  };
  bookId?: string;
  chapterId?: string;
};

type AnswerResult = {
  timeDuration: number;
  id: string;
  questionId: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  options: {
    options: string[];
    explanation: string;
  };
  explanation: string;
};

export default function BackendConnectedQuiz() {
  function useAuth() {
    const { user } = useUser();
    return { user, userId: user?.id };
  }

  const { userId, user } = useAuth();
  console.log(user, "user");

  const [bookId, setBookId] = useState<string>("");

  const [content, setContent] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [language, setLanguage] = useState("Mongolian");

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [submittedAnswers, setSubmittedAnswers] = useState<
    Record<string, AnswerResult>
  >({});
  const [showResults, setShowResults] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  const [currentTimer, setCurrentTimer] = useState(0);

  const [generateMCQQuestions, { loading: generatingQuestions }] = useMutation(
    GenerateMcqQuestionsDocument
  );

  const [recordUserProgress] = useMutation(UserProgressDocument);

  const [submitAnswer, { loading: submittingAnswer }] =
    useMutation(SubmitAnswerDocument);

  useEffect(() => {
    setCurrentTimer(0);
    const interval = setInterval(() => {
      setCurrentTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [currentQuestionIndex]);

  const handleGenerateQuestions = async () => {
    if (!content.trim()) return alert("Please enter some content.");

    setIsGenerating(true);
    setStartTime(Date.now());

    try {
      const result = await generateMCQQuestions({
        variables: {
          content: content.trim(),
          difficulty,
          numberOfQuestions,
          language,
          bookId,
        },
      });

      if (result.data?.generateMCQQuestions) {
        setQuestions(result.data.generateMCQQuestions);
        setCurrentQuestionIndex(0);
        setSelectedAnswers({});
        setSubmittedAnswers({});
        setShowResults(false);
      }
      console.log(result.data?.generateMCQQuestions, "generate questions");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate questions.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmitAnswer = async (questionId: string, userAnswer: string) => {
    if (!user) {
      alert("Та эхлээд нэвтэрсэн байх шаардлагатай.");
      return;
    }

    try {
      const result = await submitAnswer({
        variables: {
          questionId,
          userId,
          userAnswer,
        },
      });

      const question = questions[currentQuestionIndex];
      const answerResult = result.data?.submitAnswer;

      if (answerResult) {
        await recordUserProgress({
          variables: {
            userId,
            bookId: question.bookId,
            chapterId: question.chapterId ?? "",
            questionId,
            answer: userAnswer,
            timeDuration: currentTimer,
          },
        });

        setSubmittedAnswers((prev) => ({
          ...prev,
          [questionId]: {
            ...answerResult,
            timeDuration: currentTimer,
          },
        }));

        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex((prev) => prev + 1);
        } else {
          setShowResults(true);
        }
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  const handleOptionSelect = (questionId: string, option: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const correctAnswers = Object.values(submittedAnswers).filter(
    (answer) => answer.isCorrect
  ).length;
  const totalQuestions = questions.length;
  const scorePercentage =
    totalQuestions > 0
      ? Math.round((correctAnswers / totalQuestions) * 100)
      : 0;

  const totalTime = Object.values(submittedAnswers).reduce(
    (acc, cur) => acc + cur.timeDuration,
    0
  );

  if (questions.length === 0) {
    return (
      <Card className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
        <CardContent className="space-y-6">
          <div className="text-center">
            <Brain className="w-16 h-16 mx-auto text-blue-600 mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              AI Question Generator
            </h2>
            <p className="text-gray-600">
              Generate intelligent questions from any text content
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="content">Text Content</Label>
              <Textarea
                id="content"
                placeholder="Enter the text content you want to generate questions from..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[120px]"
              />
              {/* <p onClick={}></p> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
                <Label htmlFor="book">Select Book</Label>
                <Select value={bookId} onValueChange={setBookId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Book" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="68c7a4a33571925f591602ea">
                      Book 1
                    </SelectItem>
                    <SelectItem value="68c8d45bfbe94c8fdaae725e">
                      Book 2
                    </SelectItem>
                    {/* Бодит bookId-г ашиглана */}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="questions">Number of Questions</Label>
                <Input
                  id="questions"
                  type="number"
                  min="1"
                  max="10"
                  value={numberOfQuestions}
                  onChange={(e) =>
                    setNumberOfQuestions(parseInt(e.target.value) || 5)
                  }
                />
              </div>

              <div>
                <Label htmlFor="language">Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mongolian">Mongolian</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleGenerateQuestions}
              disabled={isGenerating || !content.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating Questions...
                </>
              ) : (
                <>
                  <BookOpen className="w-5 h-5 mr-2" />
                  Generate Questions
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (showResults) {
    return (
      <Card className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-green-50 to-emerald-100">
        <CardContent className="space-y-6">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 mx-auto text-green-600 mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Quiz Complete!
            </h2>
            <p className="text-gray-600">Here are your results</p>
            <p className="text-gray-600">
              {correctAnswers} / {totalQuestions} correct
            </p>
            <p className="text-lg text-blue-700 font-semibold">
              Total Time: {totalTime} seconds
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {scorePercentage}%
              </div>
              <div className="text-lg text-gray-600">
                {correctAnswers} out of {totalQuestions} correct
              </div>
            </div>

            <div className="space-y-4">
              {questions.map((question, index) => {
                const answerResult = submittedAnswers[question.id];
                return (
                  <div key={question.id} className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">
                      {index + 1}. {question.question}
                    </h3>
                    <div className="space-y-2">
                      {question.option.options.map((option, optionIndex) => {
                        const isCorrect = option === question.answer;
                        const isSelected = answerResult?.userAnswer === option;
                        const letter = String.fromCharCode(65 + optionIndex);

                        return (
                          <div
                            key={optionIndex}
                            className={`p-3 rounded-lg border-2 ${
                              isCorrect
                                ? "bg-green-100 border-green-500 text-green-800"
                                : isSelected && !isCorrect
                                ? "bg-red-100 border-red-500 text-red-800"
                                : "bg-gray-50 border-gray-200"
                            }`}
                          >
                            <span className="font-medium">
                              {letter}. {option}
                            </span>
                            {isCorrect && (
                              <CheckCircle className="w-5 h-5 inline ml-2 text-green-600" />
                            )}
                            {isSelected && !isCorrect && (
                              <XCircle className="w-5 h-5 inline ml-2 text-red-600" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                    {answerResult?.options?.explanation && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Explanation:</strong>{" "}
                          {answerResult.options.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 text-center">
              <Button
                onClick={() => {
                  setQuestions([]);
                  setCurrentQuestionIndex(0);
                  setSelectedAnswers({});
                  setSubmittedAnswers({});
                  setShowResults(false);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Generate New Questions
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = selectedAnswers[currentQuestion.id];

  return (
    <Card className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
      <CardContent className="space-y-6">
        {/* Progress */}
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-700 mb-2">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{
                width: `${
                  ((currentQuestionIndex + 1) / questions.length) * 100
                }%`,
              }}
            />
          </div>
        </div>
        <div className="text-center mt-4 text-gray-600">
          Total Reading Time:{" "}
          <span className="font-semibold text-blue-700">
            {Object.values(submittedAnswers).reduce(
              (acc, curr) => acc + (curr.timeDuration || 0),
              0
            )}{" "}
            seconds
          </span>
        </div>

        {/* Question */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            {currentQuestion.question}
          </h2>

          <div className="space-y-3">
            {currentQuestion.option.options.map((option, index) => {
              const letter = String.fromCharCode(65 + index);
              const isSelected = selectedAnswer === option;

              return (
                <Button
                  key={index}
                  onClick={() => handleOptionSelect(currentQuestion.id, option)}
                  className={`w-full justify-start p-4 text-left h-auto ${
                    isSelected
                      ? "bg-blue-600 text-white border-blue-700"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-300"
                  }`}
                  variant="outline"
                >
                  <span className="font-medium mr-3">{letter}.</span>
                  <span>{option}</span>
                </Button>
              );
            })}
          </div>

          <div className="mt-6 text-center">
            <Button
              onClick={() =>
                handleSubmitAnswer(currentQuestion.id, selectedAnswer)
              }
              disabled={!selectedAnswer || submittingAnswer}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
            >
              {submittingAnswer ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Answer"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
