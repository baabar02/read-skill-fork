import { OpenAI } from "openai";
import { Question } from "../../models/question-model";
import { Book } from "../../models/book-model";
import { Chapter } from "../../models/chapter-model";
import { sanitizeJsonFromAI } from "./sanitaze-json-mutation";

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
    option: {
      options: string[];
      explanation: string;
    };
  }
) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OpenAI API key is not configured");
    }

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

      contentToUse = book.content.join("\n");
    }

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
          
          Object форматаар хариулна уу:
          [{question: "...", options: ["A", "B", "C", "D"], correctAnswer: "A", explanation: "..."}]
         ONLY respond with valid JSON array, no explanations, no markdown, no extra text, no trailing commas, and use double quotes.
`,
        },
        {
          role: "user",
          content: contentToUse,
        },
      ],
    });

    const result = completion.choices[0]?.message?.content;
    console.log("AI-ийн хариу: ", result);

    if (!result) throw new Error("AI-гаас хоосон хариу ирсэн байна");
    console.log(result);

    const jsonMatch = result.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error("AI-аас буруу форматаар хариу ирсэн байна");
    }
    let questionsData;
    try {
      questionsData = JSON.parse(jsonMatch[0]);
    } catch (err) {
      console.error("❌ JSON Parse Error:", err);
      throw new Error(
        "AI-аас ирсэн JSON буруу байна. Магадгүй JSON массив бүрэн биш."
      );
    }

    // const result = completion.choices[0]?.message?.content;
    if (!result) throw new Error("AI-гаас хоосон хариу ирсэн байна");

    // let questionsData;
    // try {
    //   const cleanJson = sanitizeJsonFromAI(result);
    //   questionsData = JSON.parse(cleanJson);
    // } catch (err) {
    //   console.error("❌ JSON Parse Error:", err);
    //   throw new Error("AI-аас ирсэн JSON буруу байна. Засвар шаардлагатай.");
    // }

    // const questionsData = JSON.parse(jsonMatch[0]);

    const savedQuestions = [];
    for (const q of questionsData) {
      const question = new Question({
        // bookId: args.bookId ?? "",
        // chapterId: args.chapterId ?? "",
        question: q.question,
        answer: q.correctAnswer,
        option: {
          options: q.options,
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
