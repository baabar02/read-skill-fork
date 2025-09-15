import { OpenAI } from "openai";
import { QuestionModel } from "../../models/question-model";
import { Book } from "../../models/book-model";
import { Chapter } from "../../models/chapter-model";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateMCQQuestions = async (
  _: unknown,
  args: {
    content?: string;
    bookId?: string;
    chapterId?: string;
    difficulty?: "easy" | "medium" | "hard";
    numberOfQuestions?: number;
    language?: string;
  }
) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OpenAI API key is not configured");
    }

    // ---- Агуулга ачаалж авах ---- //
    let contentToUse = args.content?.trim();

    if (!contentToUse) {
      if (!args.bookId) {
        throw new Error("content эсвэл bookId заавал байх ёстой");
      }

      const book = await Book.findById(args.bookId).lean();
      if (!book) {
        throw new Error("Book not found");
      }

      if (
        !book.content ||
        !Array.isArray(book.content) ||
        book.content.length === 0
      ) {
        throw new Error("Номын контент олдсонгүй");
      }

      contentToUse = book.content.join("\n"); // массив байвал нэгтгэх
    }

    // ---- chapterId шалгах (хэрвээ өгөгдсөн бол) ---- //
    if (args.chapterId) {
      const chapter = await Chapter.findById(args.chapterId);
      if (!chapter) {
        throw new Error("Chapter not found");
      }
    }

    // ---- OpenAI-гаар олон сонголттой асуулт үүсгэх ---- //
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Чи сургалтын туслах. Хэрэглэгчийн өгсөн текст дээр үндэслэж ${
            args.numberOfQuestions || 5
          } олон сонголттой асуулт зохио. 
          
          Хэмжээ: ${args.difficulty || "medium"}
          Хэл: ${args.language || "Mongolian"}
          
          Асуулт бүрт дараах зүйлсийг оруулна уу:
          1. Асуулт
          2. 4 сонголт (A, B, C, D)
          3. Зөв хариулт (A, B, C, эсвэл D)
          4. Тайлбар (яагаад энэ хариулт зөв болохыг тайлбарлана)
          
          JSON форматаар хариулна уу:
          [{"question": "...", "options": ["A", "B", "C", "D"], "correctAnswer": "A", "explanation": "..."}]`,
        },
        {
          role: "user",
          content: contentToUse,
        },
      ],
    });

    const result = completion.choices[0]?.message?.content;
    if (!result) throw new Error("AI-гаас хоосон хариу ирсэн байна");

    // ---- JSON parse хийх ---- //
    const jsonMatch = result.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error("AI-аас буруу форматаар хариу ирсэн байна");
    }

    const questionsData = JSON.parse(jsonMatch[0]);

    // ---- DB-д хадгалах ---- //
    const savedQuestions = [];
    for (const q of questionsData) {
      const question = new QuestionModel({
        bookId: args.bookId || null,
        chapterId: args.chapterId || null,
        question: q.question,
        answer: q.correctAnswer,
        options: {
          option: q.options,
          explanation: q.explanation,
        },
      });
      await question.save();
      savedQuestions.push(question);
    }

    return savedQuestions;
  } catch (error: any) {
    console.error("MCQ Generation Error:", error);
    throw new Error(error.message || "MCQ асуулт үүсгэхэд алдаа гарлаа");
  }
};
