import { Question } from "../../models/question-model";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

//
const parseJsonFromText = (text: string) => {
  try {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start !== -1 && end !== -1 && start < end) {
      return JSON.parse(text.slice(start, end + 1));
    }
    return JSON.parse(text);
  } catch (err) {
    console.error("JSON parse failed:", err, "Text length:", text.length);
    throw new Error("AI response parsing failed");
  }
};

export const generateQuestionsFromText = async (
  _: unknown,
  args: {
    title: string;
    text: string;
    skill: string;
    subSkill: string;
    maxQuestions?: number;
  }
) => {
  try {
    // Args-аас утгуудыг задлах
    const { title, text, skill, subSkill, maxQuestions = 8 } = args;

    // Debug мэдээлэл
    console.log("generateQuestionsFromText called with:", {
      title: typeof title,
      text: typeof text,
      maxQuestions,
      titleValue: title,
      textValue: text,
    });

    // Input validation
    if (!title || typeof title !== "string") {
      throw new Error("Title заавал string байх ёстой");
    }

    if (!text || typeof text !== "string") {
      throw new Error("Text заавал string байх ёстой");
    }

    const prompt = `
Чи бол хүүхдийн унших чадварыг үнэлэх мэргэжлийн туслах. 

Таны зорилго:
- Өгөгдсөн текстээс асуулт боловсруулж, **4 төрлийн ур чадвар**-ыг шалгах:
  1. Танин мэдэхүйн чадвар
     - Үг таних чадвар
     - Ой тогтоолт
     - Гол санаа олох
  2. Сэтгэн бодох чадвар
     - Шалтгаан үр дагавар
     - Төсөөлөл
  3. Харилцааны чадвар
     - Үгийн баялаг
     - Өөрийгөө илэрхийлэх
  4. Сэтгэл хөдлөл ба нийгмийн чадвар
     - Сэтгэл хөдлөлийг ойлгох

**Зөвхөн JSON хэлбэрээр буцаана уу.**
- Бусад текст, тайлбар, markdown, тэмдэгт оруулахгүй.
- JSON-н бүтэц яг ийм байх ёстой:

{
  "questions": [
    {
      "question": "<Асуултын текст>",
      "skill": "<Дээд түвшний чадвар>", 
      "subSkill": "<Дэд чадвар>", 
      "option": {
        "options": ["<Сонголт 1>", "<Сонголт 2>", "<Сонголт 3>", "<Сонголт 4>"],
        "correctAnswer": "<Зөв хариулт зөвхөн options-оос сонгогдох>",
        "explanation": "<Яагаад зөв болохыг 1-2 өгүүлбэрээр тайлбарлах>"
      }
    }
  ]
}

### **Шаардлага**
1. **Асуулт**: Өгөгдсөн тексттэй холбоотой, ойлгомжтой, 1 зөв хариулттай.
2. **options**: Заавал 4 сонголт, бүгд боломжит мэт харагдах.  
3. **correctAnswer**: Заавал options-д байгаа нэг утга.  
4. **explanation**: Товч, ойлгомжтой, 1-2 өгүүлбэр.  
5. **JSON зөв бүтцээр** буцаах, нэмэлт текст битгий оруулах.  
6. **Текстүүд бүгд Монгол хэлээр** байх.  

Өгөгдсөн текст: "${text}"

### **Extra зөвлөгөө**
- Бүх subSkill-д дор хаяж 1 асуулт гаргах.
- Сонголтуудыг боломжийн төстэй мэт гаргах, зөвхөн 1 нь зөв.
- JSON-д ямар ч markdown, backticks, коммент оруулахгүй.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You must return ONLY valid JSON format. No explanations, no markdown, no extra text.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 2000,
      temperature: 0.1,
    });

    const aiText = response.choices?.[0]?.message?.content ?? "";
    if (!aiText) throw new Error("Empty AI response");

    console.log("AI Response RAW:", aiText);
    console.log("AI Response length:", aiText.length);

    try {
      const parsed = parseJsonFromText(aiText);
      console.log("Parsed successfully:", parsed);

      if (!parsed?.questions || !Array.isArray(parsed.questions)) {
        throw new Error("AI did not return questions array.");
      }

      const questions = parsed.questions
        .slice(0, maxQuestions)
        .map((q: any) => ({
          question: String(q.question || "").trim(),
          skill: q.skill ? String(q.skill).trim() : skill,
          subSkill: q.subSkill ? String(q.subSkill).trim() : subSkill,
          option: {
            options: (q.option?.options || []).map((o: any) =>
              String(o).trim()
            ),
            explanation: String(q.option?.explanation || "").trim(),
            correctAnswer: String(q.option?.correctAnswer || "").trim(),
          },
        }));

      // Хадгалахын өмнө утгуудыг шалгах
      console.log("Before saving to DB:", {
        title: title.trim(),
        text: text.trim(),
        questionsLength: questions.length,
      });

      const doc = new Question({
        title: title.trim(),
        text: text.trim(),
        skill: skill,
        subSkill: subSkill,
        questions,
      });

      await doc.save();

      console.log("Saved document:", {
        id: doc._id,
        title: doc.title,
        text: doc.text,
        questionsCount: doc.questions.length,
      });

      return doc;
    } catch (parseError) {
      console.error("Parse error details:", parseError);
      console.log("Attempting manual JSON extraction...");

      // Manual JSON extraction attempt
      const lines = aiText.split("\n");
      let jsonStart = -1;
      let jsonEnd = -1;

      // for (let i = 0; i < lines.length; i++) {
      //   if (lines[i].includes('{') && jsonStart === -1) {
      //     jsonStart = i;
      //   }
      //   if (lines[i].includes('}') && jsonStart !== -1) {
      //     jsonEnd = i;
      //   }
      // }

      if (jsonStart !== -1 && jsonEnd !== -1) {
        const jsonText = lines.slice(jsonStart, jsonEnd + 1).join("\n");
        console.log("Extracted JSON:", jsonText);
        try {
          const manualParsed = JSON.parse(jsonText);
          console.log("Manual parse successful:", manualParsed);

          // Manual parse амжилттай бол үргэлжлүүлэх
          if (
            manualParsed &&
            manualParsed.questions &&
            Array.isArray(manualParsed.questions)
          ) {
            const questions = manualParsed.questions
              .slice(0, maxQuestions)
              .map((q: any) => ({
                _id: q._id ? String(q._id) : undefined, 
                question: String(q.question || "").trim(),
                option: {
                  options: (q.option?.options || []).map((o: any) =>
                    String(o).trim()
                  ),
                  explanation: String(q.option?.explanation || "").trim(),
                  correctAnswer: String(q.option?.correctAnswer || "").trim(),
                   
                },
              }));

            const doc = new Question({
              title: title.trim(),
              text: text.trim(),
              skill: skill,
              subSkill: subSkill,
              questions,
            });

            await doc.save();
            return doc;
          }
        } catch (manualError) {
          console.error("Manual parse also failed:", manualError);
        }
      }

      throw new Error("AI response parsing failed");
    }
  } catch (err: any) {
    console.error("generateQuestionsFromText error:", err);
    throw new Error(err.message || "Internal server error");
  }
};
