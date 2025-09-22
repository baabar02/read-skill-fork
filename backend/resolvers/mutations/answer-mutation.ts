import { AnswerModel } from "../../models/answer-model";
import { Question } from "../../models/question-model";

export const submitAnswer = async (
  _: unknown,
  args: {
    questionId: string;
    userAnswer: string;
    selectedOption?: string;
    metadata?: {
      timeSpent?: number;
      attemptCount?: number;
      difficulty?: string;
      questionType?: string;
    };
  },
  context: { userId: string }
) => {
  try {
    const { questionId, userAnswer, selectedOption, metadata } = args;
    const { userId } = context;

    // Question-г олох
    const question = await Question.findById(questionId);
    if (!question) {
      throw new Error("Асуулт олдсонгүй");
    }

    // Зөв хариулттай тулгах
    const correctAnswer = question.questions?.[0]?.option?.correctAnswer;
    const isCorrect =
      userAnswer.toLowerCase().trim() === correctAnswer?.toLowerCase().trim();

    const option = question.questions?.[0]?.option;

    // Option эсвэл correctAnswer байхгүй бол null эсвэл тохирсон утга буцаах
    const safeOption = option && option.correctAnswer ? option : null;

    const answer = new AnswerModel({
      questionId,
      userId,
      answer: userAnswer,
      isCorrect,
      selectedOption,
      option: safeOption,
      answerMetadata: metadata
        ? {
            timeSpent: metadata.timeSpent || 0,
            attemptCount: metadata.attemptCount || 1,
            difficulty: metadata.difficulty,
            questionType: metadata.questionType,
          }
        : undefined,
    });

    await answer.save();

    return answer;
  } catch (error: any) {
    console.error("submitAnswer error:", error);
    throw new Error(error.message || "Хариулт хадгалахад алдаа гарлаа");
  }
};
