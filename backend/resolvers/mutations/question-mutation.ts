import {
  Question,
  type Question as QuestionType,
} from "../../models/question-model";
import { Book } from "../../models/book-model";
import { Chapter } from "../../models/chapter-model";
import {
  generateQuestions,
  type QuestionGenerationRequest,
} from "../../utils/ai-service";

export const generateQuestionsForBook = async (
  _: unknown,
  args: {
    bookId: string;
    chapterId?: string;
    difficulty?: "easy" | "medium" | "hard";
    questionType?: "multiple_choice" | "open_ended" | "true_false";
    numberOfQuestions?: number;
    language?: string;
  }
) => {
  try {
    const book = await Book.findById(args.bookId);
    if (!book) {
      throw new Error("Book not found");
    }

    let content = "";
    if (args.chapterId) {
      const chapter = await Chapter.findById(args.chapterId);
      if (!chapter) {
        throw new Error("Chapter not found");
      }
      content = chapter.content.join(" ");
    } else {
      content = book.content.join(" ");
    }

    if (!content.trim()) {
      throw new Error("No content available to generate questions from");
    }

    // Prepare AI request
    const aiRequest: QuestionGenerationRequest = {
      content,
      difficulty: args.difficulty || "medium",
      questionType: args.questionType || "multiple_choice",
      numberOfQuestions: args.numberOfQuestions || 5,
      language: args.language || "Mongolian",
    };

    // Generate questions using AI
    const generatedQuestions = await generateQuestions(aiRequest);

    // Save questions to database
    const savedQuestions = [];
    for (const q of generatedQuestions) {
      const question = new Question({
        chapterId: args.chapterId || null,
        bookId: args.bookId,
        question: q.question,
        answer: q.answer,
        option: q.options ? JSON.stringify(q.options) : null,
      });
      await question.save();
      savedQuestions.push(question);
    }

    return savedQuestions;
  } catch (error) {
    console.error("Error generating questions:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to generate questions: ${errorMessage}`);
  }
};

export const getQuestionsForBook = async (
  _: unknown,
  args: {
    bookId: string;
    chapterId?: string;
  }
) => {
  try {
    let query: any = {
      bookId: args.bookId,
    };
    if (args.chapterId) {
      query.chapterId = args.chapterId;
    }

    const questions = await (Question as any)
      .find(query)
      .populate("bookId")
      .populate("chapterId");
    return questions;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw new Error("Failed to fetch questions");
  }
};
