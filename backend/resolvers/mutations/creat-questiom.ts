import { Question } from "../../models/question-model";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const parseJsonFromText = (text: string) => {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start !== -1 && end !== -1) {
    try {
      return JSON.parse(text.slice(start, end + 1));
    } catch {}
  }
  try {
    return JSON.parse(text);
  } catch {
    throw new Error("AI response parsing failed");
  }
};

export const generateQuestionsFromText = async (
  _: unknown,
  args: {
    title: string;
    text: string;
    maxQuestions?: number;
  }
) => {
  try {
    // Args-аас утгуудыг задлах
    const { title, text, maxQuestions = 8 } = args;
    
    // Debug мэдээлэл
    console.log("generateQuestionsFromText called with:", {
      title: typeof title,
      text: typeof text,
      maxQuestions,
      titleValue: title,
      textValue: text
    });

    // Input validation
    if (!title || typeof title !== 'string') {
      throw new Error("Title заавал string байх ёстой");
    }
    
    if (!text || typeof text !== 'string') {
      throw new Error("Text заавал string байх ёстой");
    }

    const prompt = `
Чи бол уншлагын ойлголт болон танин мэдэхүйн шалгалтын асуулт зохиодог туслах. Доорх текстээс 4 төрлийн ур чадварыг шалгах асуултууд үүсгэнэ.

Өгөгдсөн текст: "${text}"

ЗӨВХӨН дараах JSON форматыг буцаа:

{
  "questions": [
    {
      "question": "Асуултын өгүүлбэр?",
      "skill": "Танин мэдэхүй",
      "subSkill": "Үг таних",
      "option": {
        "options": ["Сонголт А", "Сонголт Б", "Сонголт В"],
        "correctAnswer": "Зөв хариулт",
        "explanation": "Яагаад энэ хариулт зөв болохыг тайлбарлана"
      }
    },
    {
      "question": "Асуултын өгүүлбэр?",
      "skill": "Танин мэдэхүй",
      "subSkill": "Ой тогтоолт",
      "option": {
        "options": ["Сонголт А", "Сонголт Б", "Сонголт В"],
        "correctAnswer": "Зөв хариулт", 
        "explanation": "Тайлбар"
      }
    },
    {
      "question": "Асуултын өгүүлбэр?",
      "skill": "Танин мэдэхүй",
      "subSkill": "Гол санаа олох",
      "option": {
        "options": ["Сонголт А", "Сонголт Б", "Сонголт В"],
        "correctAnswer": "Зөв хариулт",
        "explanation": "Тайлбар"
      }
    },
    {
      "question": "Асуултын өгүүлбэр?",
      "skill": "Сэтгэн бодох",
      "subSkill": "Шалтгаан–үр дагавар",
      "option": {
        "options": ["Сонголт А", "Сонголт Б", "Сонголт В"],
        "correctAnswer": "Зөв хариулт",
        "explanation": "Тайлбар"
      }
    },
    {
      "question": "Асуултын өгүүлбэр?",
      "skill": "Сэтгэн бодох", 
      "subSkill": "Төсөөлөл",
      "option": {
        "options": ["Сонголт А", "Сонголт Б", "Сонголт В"],
        "correctAnswer": "Зөв хариулт",
        "explanation": "Тайлбар"
      }
    },
    {
      "question": "Асуултын өгүүлбэр?",
      "skill": "Харилцаа",
      "subSkill": "Үгийн баялаг", 
      "option": {
        "options": ["Сонголт А", "Сонголт Б", "Сонголт В"],
        "correctAnswer": "Зөв хариулт",
        "explanation": "Тайлбар"
      }
    },
    {
      "question": "Асуултын өгүүлбэр?",
      "skill": "Сэтгэл хөдлөл ба нийгмийн",
      "subSkill": "Сэтгэл хөдлөлийг ойлгох",
      "option": {
        "options": ["Сонголт А", "Сонголт Б", "Сонголт В"], 
        "correctAnswer": "Зөв хариулт",
        "explanation": "Тайлбар"
      }
    }
  ]
}

ШААРДЛАГА:
- Бүх асуулт текстын агуулгатай холбоотой байх
- 3 сонголттой, зөвхөн 1 зөв хариулт
- Сонголтууд бүгд боломжит мэт харагдах
- Тайлбар товч, ойлгомжтой байх
- Зөвхөн JSON буцаа, өөр текст битгий нэм
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { 
          role: "system", 
          content: "You must return ONLY valid JSON format. No explanations, no markdown, no extra text." 
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 1000,
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

      const questions = parsed.questions.slice(0, maxQuestions).map((q: any) => ({
        question: String(q.question || "").trim(),
        option: {
          options: (q.option?.options || []).map((o: any) => String(o).trim()),
          explanation: String(q.option?.explanation || "").trim(),
          correctAnswer: String(q.option?.correctAnswer || "").trim(),
        },
      }));

      // Хадгалахын өмнө утгуудыг шалгах
      console.log("Before saving to DB:", {
        title: title.trim(),
        text: text.trim(),
        questionsLength: questions.length
      });

      const doc = new Question({
        title: title.trim(),
        text: text.trim(),
        questions,
      });

      await doc.save();
      
      console.log("Saved document:", {
        id: doc._id,
        title: doc.title,
        text: doc.text,
        questionsCount: doc.questions.length
      });
      
      return doc;
      
    } catch (parseError) {
      console.error("Parse error details:", parseError);
      console.log("Attempting manual JSON extraction...");
      
      // Manual JSON extraction attempt
      const lines = aiText.split('\n');
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
        const jsonText = lines.slice(jsonStart, jsonEnd + 1).join('\n');
        console.log("Extracted JSON:", jsonText);
        try {
          const manualParsed = JSON.parse(jsonText);
          console.log("Manual parse successful:", manualParsed);
          
          // Manual parse амжилттай бол үргэлжлүүлэх
          if (manualParsed && manualParsed.questions && Array.isArray(manualParsed.questions)) {
            const questions = manualParsed.questions.slice(0, maxQuestions).map((q: any) => ({
              question: String(q.question || "").trim(),
              option: {
                options: (q.option?.options || []).map((o: any) => String(o).trim()),
                explanation: String(q.option?.explanation || "").trim(),
                correctAnswer: String(q.option?.correctAnswer || "").trim(),
              },
            }));

            const doc = new Question({
              title: title.trim(),
              text: text.trim(),
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