import { AnswerModel } from "../../models/answer-model";

export const getUserScore = async (
  _: unknown,
  args: {
    userId: string;
    bookId?: string;
    chapterId?: string;
  }
) => {
  try {
    let query: any = { userId: args.userId };
    if (args.bookId) {
      query.bookId = args.bookId;
    }
    if (args.chapterId) {
      query.chapterId = args.chapterId;
    }

    const answers = await (AnswerModel as any).find(query);

    const totalQuestions = answers.length;
    const correctAnswers = answers.filter(
      (answer: any) => answer.isCorrect
    ).length;
    const score =
      totalQuestions > 0
        ? Math.round((correctAnswers / totalQuestions) * 100)
        : 0;

    return {
      userId: args.userId,
      bookId: args.bookId,
      chapterId: args.chapterId,
      totalQuestions,
      correctAnswers,
      score,
      percentage: score,
    };
  } catch (error: any) {
    console.error("Error calculating user score:", error);
    throw new Error("Failed to calculate user score");
  }
};
