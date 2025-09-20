import { UserProgress } from "../../models/user-progress-model";
import { Question } from "../../models/question-model";
import { User } from "../../models/user-model";

export const userProgress = async (
  _: unknown,
  args: {
    userId?: string;
    bookId?: string;
    chapterId: string;
    questionId: string;
    answer: string;
    timeDuration: number;
    timeAnswer: number;
  }
) => {
  try {
    const question = await Question.findById(args.questionId);
    if (!question) throw new Error("Асуулт олдсонгүй");

    const isCorrect = question.answer === args.answer;
    const score = isCorrect ? 1 : 0;

    let userName = "Unknown";
    if (args.userId) {
      const user = await User.findById(args.userId);
      if (user) userName = user.name;
    }

    const newProgress = new UserProgress({
      userId: args.userId || undefined,
      userName,
      bookId: args.bookId || undefined,
      chapterId: args.chapterId,
      questionId: args.questionId,
      answer: args.answer,
      score: score,
      completed: true,
      isCorrect: isCorrect,
      timeDuration: args.timeDuration,
      timeAnswer: args.timeAnswer,
    });

    await newProgress.save();

    return {
      success: true,
      isCorrect,
      score,
      explanation: question.option?.explanation || "",
      userName,
      
    };
    
  } catch (error: any) {
    console.error("❌ UserProgress Error:", error);
    throw new Error(error.message);
  }
};
