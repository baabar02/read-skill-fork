import { AnswerModel } from "../../models/answer-model";
import { Question } from "../../models/question-model";

export const submitAnswer = async (
  _: unknown,
  args: {
    questionId: string; // questions массивын _id
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

    // 1. MongoDB-с тухайн асуултыг агуулсан document-ийг олох
    const questionDoc = await Question.findOne({
      "questions._id": questionId,
    });

    if (!questionDoc) throw new Error("Асуулт олдсонгүй");

    // 2. Массив дотроос тухайн асуултыг олох
    const currentQuestion = questionDoc.questions.find(
      (q) => q._id.toString() === questionId
    );

    if (!currentQuestion) throw new Error("Асуулт олдсонгүй");

    // 3. Зөв хариулттай харьцуулах
    const correctAnswer = currentQuestion.option?.correctAnswer;
    const isCorrect =
      userAnswer.toLowerCase().trim() === correctAnswer?.toLowerCase().trim();

    
    const answer = new AnswerModel({
      questionId,
      userId,
      answer: userAnswer,
      isCorrect,
      selectedOption,
      option: currentQuestion.option || null,
      answerMetadata: metadata
        ? {
            timeSpent: metadata.timeSpent || 0,
            attemptCount: metadata.attemptCount || 1,
            difficulty: metadata.difficulty,
            questionType: metadata.questionType,
          }
        : undefined,
    });

    await answer.save(); // ✅ Энэ алхам нь MongoDB-д хадгалах

    return answer;
  } catch (error: any) {
    console.error("submitAnswer error:", error);
    throw new Error(error.message || "Хариулт хадгалахад алдаа гарлаа");
  }
};
