import { AnswerModel } from "../../models/answer-model";
import { Question } from "../../models/question-model";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Helper function - JSON parse
const parseJsonFromText = (text: string) => {
  // Markdown code block арилгах
  const cleanText = text.replace(/```json\n?|```\n?/g, '').trim();
  
  const start = cleanText.indexOf("{");
  const end = cleanText.lastIndexOf("}");
  
  if (start !== -1 && end !== -1) {
    try {
      return JSON.parse(cleanText.slice(start, end + 1));
    } catch (error) {
      console.error("JSON parse error:", error);
    }
  }
  
  try {
    return JSON.parse(cleanText);
  } catch (error) {
    console.error("Fallback JSON parse error:", error);
    return null;
  }
};

// AI дүгнэлт үүсгэх функц
export const generateUserAnalysis = async (
  _: unknown,
  args: { userId: string }
) => {
  try {
    const { userId } = args;

    console.log("Generating AI analysis for user:", userId);

    // 1. Хэрэглэгчийн БҮХ хариултуудыг авах
    const userAnswers = await AnswerModel.find({ userId })
      .populate("questionId")
      .sort({ createdAt: -1 });

    if (userAnswers.length === 0) {
      return {
        success: false,
        message: "Хэрэглэгч асуултанд хариулаагүй байна",
        analysis: null,
      };
    }

    console.log(`Found ${userAnswers.length} total answers for comprehensive analysis`);

    // 2. Skills-ийн дагуу статистик гаргах
    const skillsStats = userAnswers.reduce((acc, answer: any) => {
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
            totalTime: 0,
            answers: [],
          };
        }

        acc[key].total++;
        if (answer.isCorrect) acc[key].correct++;
        acc[key].totalTime += answer.answerMetadata?.timeSpent || 0;
        acc[key].answers.push({
          question: q.question,
          userAnswer: answer.answer,
          correctAnswer: q.option?.correctAnswer,
          isCorrect: answer.isCorrect,
          timeSpent: answer.answerMetadata?.timeSpent || 0,
        });
      });

      return acc;
    }, {} as any);

    // 3. AI-д илгээх статистикийн мэдээлэл бэлтгэх
    const analysisData = Object.values(skillsStats).map((stat: any) => {
      const accuracy = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
      const avgTime = stat.total > 0 ? Math.round(stat.totalTime / stat.total) : 0;
      
      return {
        skill: stat.skill,
        subSkill: stat.subSkill,
        accuracy: accuracy,
        totalQuestions: stat.total,
        correctAnswers: stat.correct,
        averageTime: avgTime,
        recentMistakes: stat.answers
          .filter((a: any) => !a.isCorrect)
          .slice(0, 3)
          .map((a: any) => ({
            question: a.question,
            userAnswer: a.userAnswer,
            correctAnswer: a.correctAnswer
          }))
      };
    });

    console.log("Skills analysis data:", analysisData);

    // 4. AI prompt - нарийвчилсан дүгнэлт
    const prompt = `
Та бол хүүхдийн уншлагын чадварыг дүгнэх боловсролын мэргэжилтэн. Доорх статистик дээр үндэслэн ДЭЛГЭРЭНГҮЙ дүгнэлт хийнэ үү.

ЧАДВАРЫН БҮТЭЦ:
1. ТАНИН МЭДЭХҮЙН ЧР ЧАДВАР
   1.1 Үг таних чадвар - текст дэх үгсийн утга, ялгаа тодорхойлох
   1.2 Ой тогтоолт - тодорхой мэдээллийг санах, эргэж олох
   1.3 Гол санаа олох - текстийн гол утга, зорилгыг ойлгох

2. СЭТГЭН БОДОХ ЧР ЧАДВАР  
   2.1 Шалтгаан-үр дагавар - үйл явдлын хоорондын хамаарлыг ойлгох
   2.2 Төсөөлөл - текстээс харагдахгүй зүйлийг төсөөлөх, дүгнэх

3. ХАРИЛЦААНЫ ЧР ЧАДВАР
   3.1 Үгийн баялаг - үгсийн нөхцөл, сайшаалын утгыг ойлгох  
   3.2 Өөрийгөө илэрхийлэх - өөрийн бодол санааг илэрхийлэх

4. СЭТГЭЛ ХӨДЛӨЛ БА НИЙГМИЙН ЧР ЧАДВАР
   4.1 Сэтгэл хөдлөлийг ойлгох - дүрийн сэтгэл хөдлөлийг таних
   4.2 Өөртөө итгэх итгэл - өөрийн чадварт итгэх, өөрийгөө үнэлэх

ХЭРЭГЛЭГЧИЙН СТАТИСТИК:
${JSON.stringify(analysisData, null, 2)}

ЗӨВХӨН дараах JSON FORMAT-аар хариула (өөр юу ч битгий нэм):

{
  "overallScore": 85,
  "skillAssessments": [
    {
      "skill": "Танин мэдэхүйн ур чадвар",
      "subSkill": "Үг таних чадвар",
      "score": 75,
      "level": "Сайн", 
      "feedback": "Үгсийн утгыг зөв тодорхойлох чадвар сайн хөгжсөн. Үргэлжлүүлэн дасгал хийх нь чухал.",
      "questionCount": 12,
      "correctCount": 9,
      "accuracy": 75,
      "recommendations": ["Өдөр бүр 5 шинэ үг сурах", "Үгсийг өгүүлбэрт хэрэглэх дасгал"]
    },
    {
      "skill": "Танин мэдэхүйн ур чадвар", 
      "subSkill": "Ой тогтоолт",
      "score": 80,
      "level": "Сайн",
      "feedback": "Текстээс тодорхой мэдээллийг олж авах чадвар маш сайн. Нарийн ширийн зүйлд анхаарал хандуулах хэрэгтэй.",
      "questionCount": 15,
      "correctCount": 12, 
      "accuracy": 80,
      "recommendations": ["Урт текст уншиж дүгнэх", "Тэмдэглэл авах дасгал"]
    },
    {
      "skill": "Танин мэдэхүйн ур чадвар",
      "subSkill": "Гол санаа олох", 
      "score": 70,
      "level": "Сайн",
      "feedback": "Текстийн үндсэн санааг ойлгож байна. Дэд санаануудыг илүү сайн ялгах хэрэгтэй.",
      "questionCount": 10,
      "correctCount": 7,
      "accuracy": 70, 
      "recommendations": ["Параграф бүрийн гол санааг тодорхойлох", "Өгүүлбэрийн холбоосыг олох"]
    },
    {
      "skill": "Сэтгэн бодох ур чадвар",
      "subSkill": "Шалтгаан–үр дагавар",
      "score": 65,
      "level": "Дундаж", 
      "feedback": "Шинж тэмдэг, шалтгаан, үр дагаврын хамаарлыг ойлгоход бэрхшээл тулгарч байна. Практик дасгал шаардлагатай.",
      "questionCount": 8,
      "correctCount": 5,
      "accuracy": 65,
      "recommendations": ["'Учир нь', 'тиймээс' гэх мэт холбоос үгсийг анхаарах", "Шалтгаан-үр дагаврын сүлжээ зурах"]
    },
    {
      "skill": "Сэтгэн бодох ур чадвар",
      "subSkill": "Төсөөлөл",
      "score": 78,
      "level": "Сайн",
      "feedback": "Текстээс харагдахгүй зүйлсийг төсөөлөх чадвар сайн. Логик сэтгэлгээг илүү хөгжүүлэх хэрэгтэй.",
      "questionCount": 9,
      "correctCount": 7, 
      "accuracy": 78,
      "recommendations": ["Дараагийн үйл явдлыг таамаглах дасгал", "Дүрийн зан авирыг шинжлэх"]
    },
    {
      "skill": "Харилцааны ур чадвар", 
      "subSkill": "Үгийн баялаг",
      "score": 72,
      "level": "Сайн",
      "feedback": "Үгсийн янз бүрийн утгыг ойлгож байна. Зэрэглэлийн утга, сайшаалыг илүү сайн ойлгох хэрэгтэй.",
      "questionCount": 11,
      "correctCount": 8,
      "accuracy": 72,
      "recommendations": ["Ижил утгатай өөр өөр үгсийг сурах", "Зэрэглэлийн утга бүхий үгсийг судлах"]
    },
    {
      "skill": "Харилцааны ур чадвар",
      "subSkill": "Өөрийгөө илэрхийлэх",
      "score": 68,
      "level": "Дундаж",
      "feedback": "Өөрийн санаа бодлыг илэрхийлэх чадварыг хөгжүүлэх шаардлагатай. Илүү олон үг ашиглан дэлгэрэнгүй хариулах.",
      "questionCount": 6,
      "correctCount": 4,
      "accuracy": 68, 
      "recommendations": ["Өөрийн санаа бодлыг бичих дасгал", "Тодорхой жишээ ашиглан тайлбарлах"]
    },
    {
      "skill": "Сэтгэл хөдлөл ба нийгмийн ур чадвар",
      "subSkill": "Сэтгэл хөдлөлийг ойлгох",
      "score": 74,
      "level": "Сайн", 
      "feedback": "Дүрийн сэтгэл хөдлөлийг ойлгох чадвар сайн хөгжсөн. Сэтгэл хөдлөлийн шалтгааныг илүү гүнзгий ойлгох.",
      "questionCount": 7,
      "correctCount": 5,
      "accuracy": 74,
      "recommendations": ["Сэтгэл хөдлөлийн үг хэллэгийг анхаарах", "Дүрийн байдлаас сэтгэл хөдлөл таних"]
    }
  ],
  "strengths": [
    "Ой тогтоолтын чадвар маш сайн - текстээс мэдээлэл зөв олж авч байна",
    "Төсөөллийн чадвар хөгжсөн - текстийн цаанаасаа ойлгож байна", 
    "Үгийн баялаг сайн - олон төрлийн үгсийг ойлгож байна"
  ],
  "improvements": [
    "Шалтгаан-үр дагаврын хамаарлыг илүү сайн ойлгох шаардлагатай",
    "Өөрийгөө илэрхийлэх чадварыг хөгжүүлэх хэрэгтэй",
    "Гол санаа олоход илүү нарийвчлалтай хандах"
  ],
  "recommendations": [
    "Өдөр бүр 15-20 минут уншлагын дасгал хийх - үг таних, ой тогтоолтод анхаарах",
    "Шалтгаан-үр дагаврын холбоосыг олох дасгал давтах - 'учир', 'тиймээс' гэх үгсийг анхаарах",
    "Өөрийн санаа бодлыг илэрхийлэх бичгийн дасгал - өдөр бүр 2-3 өгүүлбэр бичих",
    "Дүрийн сэтгэл хөдлөл, зан төлөвийг ажиглах дасгал - яагаад тэгж байгааг бодох"
  ],
  "confidence": 0.85,
  "analysisNotes": "Нийт ${userAnswers.length} хариулт дээр үндэслэн дүгнэлт хийсэн. Хэрэглэгч ерөнхийдөө сайн түвшинд байгаа ч зарим чадварт илүү анхаарал хандуулах шаардлагатай."
}

ШААРДЛАГА:
- Статистик дээр үндэслэн бодит дүгнэлт хий
- Бүх 8 дэд чадварыг заавал дүгнэ  
- score = accuracy percentage
- level: 0-49="Дутуу", 50-69="Дундаж", 70-84="Сайн", 85-100="Маш сайн"
- feedback: тухайн чадварын талаар дэлгэрэнгүй тайлбар (30-50 үг)
- recommendations: практик, хэрэгжүүлэхэд хялбар зөвлөмж (чадвар бүрт 2)
- strengths: хамгийн сайн 3 чадвар (статистикаас)
- improvements: хамгийн муу 3 чадвар (статистикаас)  
- recommendations: ерөнхий зөвлөмж 4-5 зүйл
- confidence: статистикийн хэмжээ, найдвартай байдлаас хамааруулан
- ЗӨВХӨН JSON буцаа, өөр текст битгий нэм!
    `;

    // 5. OpenAI API дуудах
    const response = await openai.chat.completions.create({
      model: "gpt-4o", 
      messages: [
        {
          role: "system",
          content: "You return ONLY valid JSON. No explanations, no markdown, no extra text."
        },
        {
          role: "user", 
          content: prompt
        }
      ],
      max_tokens: 2000,
      temperature: 0.1, // Тогтвортой хариу
    });

    const aiText = response.choices?.[0]?.message?.content ?? "";
    if (!aiText) throw new Error("AI хариулт хоосон байна");

    console.log("Raw AI Response:", aiText);

    // 6. JSON parse хийх
    const analysisResult = parseJsonFromText(aiText);

    if (!analysisResult) {
      throw new Error("AI хариултыг JSON болгож чадсангүй");
    }

    console.log("Parsed Analysis:", analysisResult);

    // 7. Validation хийх - структурыг шалгах  
    const validatedAnalysis = {
      overallScore: Number(analysisResult.overallScore) || 0,
      skillAssessments: Array.isArray(analysisResult.skillAssessments) 
        ? analysisResult.skillAssessments.map((skill: any) => ({
            skill: String(skill.skill || ""),
            subSkill: String(skill.subSkill || ""),
            score: Number(skill.score) || 0,
            level: String(skill.level || "Дундаж"),
            feedback: String(skill.feedback || ""),
            questionCount: Number(skill.questionCount) || 0,
            correctCount: Number(skill.correctCount) || 0,
            accuracy: Number(skill.accuracy) || 0,
            recommendations: Array.isArray(skill.recommendations) 
              ? skill.recommendations.map((r: any) => String(r))
              : []
          }))
        : [],
      strengths: Array.isArray(analysisResult.strengths) 
        ? analysisResult.strengths.map((s: any) => String(s)) 
        : [],
      improvements: Array.isArray(analysisResult.improvements)
        ? analysisResult.improvements.map((i: any) => String(i))
        : [],
      recommendations: Array.isArray(analysisResult.recommendations)
        ? analysisResult.recommendations.map((r: any) => String(r))
        : [],
      analysisDate: new Date(),
      confidence: Number(analysisResult.confidence) || 0.5,
      totalQuestionsAnalyzed: userAnswers.length,
      skillsAnalyzed: Object.keys(skillsStats).length,
      analysisNotes: String(analysisResult.analysisNotes || "")
    };

    // 8. Database-д хадгалах (optional)
    try {
      if (userAnswers.length > 0) {
        const latestAnswer = userAnswers[0];
        if (latestAnswer) {
          latestAnswer.aiAnalysis = validatedAnalysis;
          await latestAnswer.save();
          console.log("AI analysis saved to database");
        }
      }
    } catch (saveError) {
      console.warn("Failed to save AI analysis:", saveError);
      // Алдаа гарсан ч analysis-ыг буцаана
    }

    return {
      success: true,
      message: "AI дүгнэлт амжилттай үүссэн",
      analysis: validatedAnalysis,
      metadata: {
        totalAnswers: userAnswers.length,
        skillsAnalyzed: Object.keys(skillsStats).length,
        analysisDate: new Date().toISOString()
      }
    };

  } catch (error: any) {
    console.error("generateUserAnalysis error:", error);
    
    return {
      success: false,
      message: error.message || "AI дүгнэлт үүсгэхэд алдаа гарлаа",
      analysis: null,
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    };
  }
};

