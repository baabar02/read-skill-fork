import { Answer } from "../../models/answer-model";

export const getUserAnswers = async (
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

    const answers = await (Answer as any)
      .find(query)
      .populate("questionId")
      .populate("bookId")
      .populate("chapterId");

    return answers;
  } catch (error: any) {
    console.error("Error fetching user answers:", error);
    throw new Error("Failed to fetch user answers");
  }
};
