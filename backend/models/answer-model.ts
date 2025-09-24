import { model, models, Schema } from "mongoose";


type SkillAssessment = {
  skill: string; 
  subSkill: string;
  score: number; 
  level: "Дутуу" | "Дундаж" | "Сайн" | "Маш сайн";
  feedback: string; 
};

type AIAnalysis = {
  overallScore: number; 
  skillAssessments: SkillAssessment[]; 
  strengths: string[]; 
  improvements: string[]; 
  recommendations: string[];
  analysisDate: Date; 
  confidence: number;
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


  aiAnalysis?: AIAnalysis;


  answerMetadata?: {
    timeSpent: number; 
    attemptCount: number;
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

    
    option: {
      type: {
        options: { type: [String], required: true },
        explanation: { type: String, required: false },
      },
    },


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


AnswerSchema.index({ userId: 1, createdAt: -1 });
AnswerSchema.index({ questionId: 1, userId: 1 });


AnswerSchema.statics.generateAIAnalysis = async function (userId: string) {

  const recentAnswers = await this.find({
    userId,
    createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
  })
    .populate("questionId")
    .sort({ createdAt: -1 })
    .limit(50);


  return null;
};

export const AnswerModel = model<Answer>("Answer", AnswerSchema);

// TypeScript export хийх
export type { Answer, AIAnalysis, SkillAssessment };
