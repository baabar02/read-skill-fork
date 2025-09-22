import { model, models, Schema } from "mongoose";

// AI дүгнэлтийн төрөл
type SkillAssessment = {
  skill: string; // "Танин мэдэхүй", "Сэтгэн бодох" гэх мэт
  subSkill: string; // "Үг таних", "Шалтгаан-үр дагавар" гэх мэт
  score: number; // 0-100 оноо
  level: "Дутуу" | "Дундаж" | "Сайн" | "Маш сайн";
  feedback: string; // AI-ын санал зөвлөмж
};

type AIAnalysis = {
  overallScore: number; // Нийт оноо (0-100)
  skillAssessments: SkillAssessment[]; // Skill тус бүрийн дүгнэлт
  strengths: string[]; // Давуу талууд
  improvements: string[]; // Сайжруулах зүйлс
  recommendations: string[]; // Зөвлөмжүүд
  analysisDate: Date; // Шинжилгээ хийсэн огноо
  confidence: number; // AI-ын итгэлцлийн түвшин (0-1)
};

type Answer = {
  _id: Schema.Types.ObjectId;
  questionId: Schema.Types.ObjectId;
  userId?: string;
  answer: string;
  isCorrect: boolean;
  selectedOption?: string;

  // Хуучин option
  option?: {
    options: string[];
    explanation?: string;
  };

  // ШИНЭ: AI дүгнэлт
  aiAnalysis?: AIAnalysis;

  // ШИНЭ: Хариултын дэлгэрэнгүй мэдээлэл
  answerMetadata?: {
    timeSpent: number; // Хариулахад зарцуулсан хугацаа (секунд)
    attemptCount: number; // Оролдлогын тоо
    difficulty: "Амархан" | "Дунд" | "Хэцүү";
    questionType: string; // Асуултын төрөл
  };
};

const SkillAssessmentSchema = new Schema<SkillAssessment>({
  skill: { type: String, required: true },
  subSkill: { type: String, required: true },
  score: { type: Number, required: true, min: 0, max: 100 },
  level: {
    type: String,
    required: true,
    enum: ["Дутуу", "Дундаж", "Сайн", "Маш сайн"],
  },
  feedback: { type: String, required: true },
});

const AIAnalysisSchema = new Schema<AIAnalysis>({
  overallScore: { type: Number, required: true, min: 0, max: 100 },
  skillAssessments: [SkillAssessmentSchema],
  strengths: [{ type: String }],
  improvements: [{ type: String }],
  recommendations: [{ type: String }],
  analysisDate: { type: Date, default: Date.now },
  confidence: { type: Number, required: true, min: 0, max: 1 },
});

export const AnswerSchema = new Schema<Answer>(
  {
    questionId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Question",
    },
    userId: { type: String, required: false, ref: "User" },
    answer: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
    selectedOption: { type: String, required: false },

    // Хуучин option (үргэлжлүүлэх)
    option: {
      type: {
        options: { type: [String], required: true },
        explanation: { type: String, required: false },
      },
    },

    // ШИНЭ талбарууд
    aiAnalysis: {
      type: AIAnalysisSchema,
      required: false,
    },

    answerMetadata: {
      type: {
        timeSpent: { type: Number, required: false, default: 0 },
        attemptCount: { type: Number, required: false, default: 1 },
        difficulty: {
          type: String,
          required: false,
          enum: ["Амархан", "Дунд", "Хэцүү"],
        },
        questionType: { type: String, required: false },
      },
      required: false,
    },
  },
  { timestamps: true }
);

// Index нэмэх - хэрэглэгчийн хариултуудыг хурдан олохын тулд
AnswerSchema.index({ userId: 1, createdAt: -1 });
AnswerSchema.index({ questionId: 1, userId: 1 });

// ШИНЭ: AI дүгнэлт хийх static метод
AnswerSchema.statics.generateAIAnalysis = async function (userId: string) {
  // Хэрэглэгчийн сүүлийн хариултуудыг авах
  const recentAnswers = await this.find({
    userId,
    createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }, // Сүүлийн 30 хоног
  })
    .populate("questionId")
    .sort({ createdAt: -1 })
    .limit(50);

  // AI дүгнэлт хийх логик энд бичнэ
  // (Дараагийн алхамд энэ функцийг бүрэн бичнэ)
  return null;
};

export const AnswerModel = model<Answer>("Answer", AnswerSchema);

// TypeScript export хийх
export type { Answer, AIAnalysis, SkillAssessment };
