import { QuestionModel } from "../../models/text-model";
import { Types } from "mongoose";
import { OpenAI } from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const createQuestion = async (
  _: unknown,
  {
    title,
    text,
    type,
    question,
    option,
    createdBy,
    assignedTo,
  }: {
    title: string;
    text: string;
    type: "mcq" | "open";
    question?: string;
    option?: {
      options: string[];
      answer: string;
      explanation?: string;
    };
    createdBy: string;
    assignedTo?: string;
  }
) => {
  try {
    // Input validation
    if (!title?.trim() || !text?.trim()) {
      throw new Error("Title болон текст хоосон байна");
    }

    if (!type || !["mcq", "open"].includes(type)) {
      throw new Error("Type заавал 'mcq' эсвэл 'open' байх ёстой");
    }

    let finalQuestion = question?.trim();
    let finalOption = option;

    // AI-ээр асуулт үүсгэх
    if (!finalQuestion) {
      console.log("No question provided, generating with AI...");

      const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
Чи боловсролын салбарын AI туслах. Өгөгдсөн текст дээр үндэслэн ${
              type === "mcq" ? "MCQ" : "нээлттэй"
            } асуулт үүсгэ.

ЗӨВХӨН дараах JSON форматыг буцаах:
{
  "question": "Асуулт текст"${
    type === "mcq"
      ? ',\n  "options": ["option1","option2","option3","option4"],\n  "answer": "Зөв хариулт"'
      : ""
  }
}
            `,
          },
          { role: "user", content: `Title: ${title}\nText: ${text}` },
        ],
      });

      const aiResponse = completion.choices[0]?.message?.content;
      if (!aiResponse) throw new Error("AI-гаас хоосон хариу ирсэн байна");

      try {
        const cleanResponse = aiResponse.replace(/```json\n?|```\n?/g, "").trim();
        const parsed = JSON.parse(cleanResponse);

        finalQuestion = parsed.question;
        if (type === "mcq" && parsed.options && parsed.answer) {
          finalOption = {
            options: parsed.options,
            answer: parsed.answer,
            explanation: parsed.explanation || "",
          };
        }
      } catch (parseError) {
        console.error("AI JSON Parse Error:", parseError);
        finalQuestion = aiResponse;
      }
    }

    if (!finalQuestion?.trim()) {
      throw new Error("Асуулт үүсгэж чадсангүй");
    }

    if (type === "mcq" && (!finalOption || !finalOption.options || !finalOption.answer)) {
      throw new Error("MCQ асуултад options болон answer заавал байх ёстой");
    }

    // MongoDB-д хадгалах объект
    const newQ = new QuestionModel({
      title: title.trim(),
      text: text.trim(),
      type,
      question: finalQuestion.trim(),
      option:
        type === "mcq" && finalOption
          ? {
              options: finalOption.options,
              answer: finalOption.answer,
              explanation: finalOption.explanation || "",
            }
          : undefined,
      createdBy: new Types.ObjectId(createdBy),
      assignedTo: assignedTo ? new Types.ObjectId(assignedTo) : undefined,
    });

    const savedQuestion = await newQ.save();

  
    const questionObj = savedQuestion.toObject(); 

    return {
       id: (questionObj._id as Types.ObjectId).toString(),
      title: questionObj.title,
      text: questionObj.text,
      type: questionObj.type,
      question: questionObj.question,
      option: questionObj.option,
      createdBy: questionObj.createdBy.toString(),
      assignedTo: questionObj.assignedTo?.toString() || null,
    //   createdAt: questionObj.createdAt.toISOString(),
    //   updatedAt: questionObj.updatedAt.toISOString(),
    };
  } catch (error: any) {
    console.error("Create Question Error:", error);
    throw new Error(error.message || "Асуулт үүсгэхэд алдаа гарлаа");
  }
};
