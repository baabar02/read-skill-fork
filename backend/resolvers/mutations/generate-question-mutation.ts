import { OpenAI } from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateQuestions = async (
  _: unknown,
  { chapter }: { chapter: string }
) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OpenAI API key is not configured");
    }

    if (!chapter || chapter.trim() === "") {
      throw new Error("Текст хоосон байна");
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Чи сургалтын туслах. Хэрэглэгчийн өгсөн текст дээр үндэслэж 3-5 асуулт зохио.",
        },
        {
          role: "user",
          content: chapter,
        },
      ],
    });

    const result = completion.choices[0]?.message?.content;
    if (!result) throw new Error("AI-гаас хоосон хариу ирсэн байна");

    const questions = result
      .split("\n")
      .map((q) => q.trim().replace(/^\d+\.\s*/, ""))
      .filter((q) => q.length > 0);

    return questions;
  } catch (error: any) {
    console.error("OpenAI Error:", error);
    throw new Error(error.message || "Асуулт үүсгэхэд алдаа гарлаа");
  }
};
