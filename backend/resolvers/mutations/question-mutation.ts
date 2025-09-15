import { OpenAI } from "openai";

import { Book } from "../../models/book-model";
import { Chapter } from "../../models/chapter-model";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateQuestionsWithContent = async (
  _: unknown,
  args: {
    content: string;
    bookId?: string;
    chapterId?: string;
    difficulty?: "easy" | "medium" | "hard";
    numberOfQuestions?: number;
  }
) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OpenAI API key is not configured");
    }

    if (!args.content || args.content.trim() === "") {
      throw new Error("Текст хоосон байна");
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Чи сургалтын туслах. Хэрэглэгчийн өгсөн текст дээр үндэслэж ${
            args.numberOfQuestions || 5
          } асуулт зохио. Хэмжээ: ${args.difficulty || "medium"}.`,
        },
        {
          role: "user",
          content: args.content,
        },
      ],
    });

    const result = completion.choices[0]?.message?.content;
    if (!result) throw new Error("AI-гаас хоосон хариу ирсэн байна");

    const questions = result
      .split("\n")
      .map((q) => q.trim().replace(/^\d+\.\s*/, ""))
      .filter((q) => q.length > 0);

    return {
      questions,
      bookId: args.bookId || null,
      chapterId: args.chapterId || null,
      content: args.content,
      difficulty: args.difficulty || "medium",
      numberOfQuestions: questions.length,
    };
  } catch (error: any) {
    console.error("OpenAI Error:", error);
    throw new Error(error.message || "Асуулт үүсгэхэд алдаа гарлаа");
  }
};

// Generate MCQ questions and save to database
