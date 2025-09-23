import { AnswerModel } from "../../models/answer-model";
import { Question } from "../../models/question-model";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// AI дүгнэлт үүсгэх функц
export const generateUserAnalysis = async (
  _: unknown,
  args: { userId: string }
) => {
  try {
    const { userId } = args;

    console.log("Generating AI analysis for user:", userId);

    // 1. Хэрэглэгчийн сүүлийн 50 хариултыг авах
    const userAnswers = await AnswerModel.find({ userId })
      .populate("questionId")
      .sort({ createdAt: -1 })
      .limit(50);

    if (userAnswers.length === 0) {
      return {
        success: false,
        message: "Хэрэглэгч асуултанд хариулаагүй байна",
        analysis: null,
      };
    }

    console.log(`Found ${userAnswers.length} answers for analysis`);

    // 2. Skills-ийн дагуу ангилах
    const skillsData = userAnswers.reduce((acc, answer: any) => {
      const question = answer.questionId;
      if (!question?.questions) return acc;

      question.questions.forEach((q: any) => {
        const { skill, subSkill } = q;
        const key = `${skill}:${subSkill}`;

        if (!acc[key]) {
          acc[key] = {
            skill,
            subSkill,
            total: 0,
            correct: 0,
            answers: [],
          };
        }

        acc[key].total++;
        if (answer.isCorrect) acc[key].correct++;
        acc[key].answers.push({
          question: q.question,
          userAnswer: answer.answer,
          isCorrect: answer.isCorrect,
          timeSpent: answer.answerMetadata?.timeSpent || 0,
        });
      });

      return acc;
    }, {} as any);

    // 3. OpenAI-д дүгнэлт хийлгэх
    const analysisPrompt = `
Та бол боловсролын AI дүгнэлт хийгч. Доорх хэрэглэгчийн хариултуудыг шинжилж дүгнэлт гаргана уу.

Хэрэглэгчийн мэдээлэл:
- Нийт хариулсан асуулт: ${userAnswers.length}
- Зөв хариулт: ${userAnswers.filter((a) => a.isCorrect).length}
- Нийт амжилт: ${(
      (userAnswers.filter((a) => a.isCorrect).length / userAnswers.length) *
      100
    ).toFixed(1)}%

Skills-ийн дэлгэрэнгүй:
${Object.values(skillsData)
  .map(
    (skill: any) => `
- ${skill.skill} > ${skill.subSkill}: ${skill.correct}/${skill.total} (${(
      (skill.correct / skill.total) *
      100
    ).toFixed(1)}%)
`
  )
  .join("")}

Сүүлийн хариултууд:
${userAnswers
  .slice(0, 10)
  .map(
    (answer: any, i: number) => `
${i + 1}. Асуулт: ${
      answer.questionId?.questions?.[0]?.question?.substring(0, 100) || "N/A"
    }...
   Хариулт: ${answer.answer}
   Үр дүн: ${answer.isCorrect ? "Зөв" : "Буруу"}
`
  )
  .join("")}

ЗӨВХӨН дараах JSON форматыг буцаана уу:

{
  "overallScore": 85,
  "skillAssessments": [
    {
      "skill": "Танин мэдэхүй",
      "subSkill": "Үг таних",
      "score": 90,
      "level": "Сайн",
      "feedback": "Үг танихад маш сайн гарч байна. Үргэлжлүүлээрэй."
    }
  ],
  "strengths": ["Үг танихад сайн", "Ой тогтоолтод давуу тал"],
  "improvements": ["Шалтгаан-үр дагаврыг сайжруулах хэрэгтэй", "Түргэн хариулах чадвар"],
  "recommendations": ["Өдөр бүр 10 минут уншиж дасгал хийх", "Шалтгаан-үр дагавар сургуулилт хийх"],
  "confidence": 0.85
}

Тайлбар:
- overallScore: 0-100 хооронд
- level: "Дутуу", "Дундаж", "Сайн", "Маш сайн"-аас сонгох
- confidence: 0-1 хооронд AI итгэлцэл
- Монгол хэлээр бичих
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Та боловсролын AI дүгнэлт хийгч. Зөвхөн JSON буцаана, өөр текст бичихгүй.",
        },
        { role: "user", content: analysisPrompt },
      ],
      max_tokens: 1500,
      temperature: 0.1,
    });

    const aiText = response.choices?.[0]?.message?.content ?? "";
    if (!aiText) throw new Error("AI хариулт хоосон байна");

    console.log("AI Analysis Response:", aiText);

    // 4. JSON parse хийх
    const analysisData = parseJsonFromText(aiText);

    if (!analysisData) {
      throw new Error("AI хариултыг JSON болгож чадсангүй");
    }

    // 5. Analysis-ыг хадгалах
    const aiAnalysis = {
      overallScore: analysisData.overallScore || 0,
      skillAssessments: analysisData.skillAssessments || [],
      strengths: analysisData.strengths || [],
      improvements: analysisData.improvements || [],
      recommendations: analysisData.recommendations || [],
      analysisDate: new Date(),
      confidence: analysisData.confidence || 0.5,
    };

    // AI analysis хадгалахад алдаа гарвал
    try {
      if (userAnswers.length > 0) {
        const latestAnswer = userAnswers[0];
        if (latestAnswer) {
          latestAnswer.aiAnalysis = aiAnalysis;
          await latestAnswer.save();
          console.log("AI analysis saved successfully");
        }
      }
    } catch (saveError) {
      console.warn("Failed to save AI analysis to answer:", saveError);
      // Гэхдээ analysis-ыг буцаана
    }

    return {
      success: true,
      message: "AI дүгнэлт амжилттай үүссэн",
      analysis: aiAnalysis,
    };
  } catch (error: any) {
    console.error("generateUserAnalysis error:", error);
    return {
      success: false,
      message: error.message || "AI дүгнэлт үүсгэхэд алдаа гарлаа",
      analysis: null,
    };
  }
};

// Enhanced submitAnswer resolver

// Helper function - JSON parse (танай хуучин функцээс)
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
    return null;
  }
};

