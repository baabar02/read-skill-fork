import { UserProgress } from "../../models/user-progress-model";

export const getUserProgress = async (
  _: unknown,
  args: { userId: string; bookId?: string; chapterId?: string }
) => {
  try {
    const query: any = { userId: args.userId };
    if (args.bookId) query.bookId = args.bookId;
    if (args.chapterId) query.chapterId = args.chapterId;

    const progress = await UserProgress.find(query)
      .populate("questionId")
      .populate("userId");

    if (!progress || progress.length === 0) return [];
    if (!progress) {
      console.log("progress is null or undefined");
    }
    if (progress.length === 0) {
      console.log("progress array is empty");
    }

    return progress.map((item) => {
      const question = item.questionId as any;
      const user = item.userId as any;

      return {
        questionId: question?._id?.toString(),
        question: question?.question,
        answer: item.answer,
        isCorrect: item.isCorrect,
        timeDuration: item.timeDuration,
        userName: user?.name ?? "Unknown",
        completed: item.completed,
        score: item.score,
        explanation: question?.option?.explanation ?? "",
        success: true,
      };
    });
  } catch (error) {
    console.error("❌ Failed to fetch user progress:", error);
    throw new Error("User progress олдсонгүй");
  }
};
