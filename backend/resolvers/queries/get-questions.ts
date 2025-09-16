import { Question } from "../../models/question-model";

// Get questions for a book/chapter
export const getQuestionsForBook = async (
  _: unknown,
  args: {
    bookId?: string;
    chapterId?: string;
  }
) => {
  try {
    let query: any = {};
    if (args.bookId) {
      query.bookId = args.bookId;
    }
    if (args.chapterId) {
      query.chapterId = args.chapterId;
    }

    const questions = await (Question )
      .find(query)
      .populate("bookId")
      .populate("chapterId");
    return questions;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw new Error("Failed to fetch questions");
  }
};
