import { model, Schema, Document } from "mongoose";

interface QuestionOption {
  options: string[];
  explanation: string;
  correctAnswer: string;
}

interface GeneratedQuestion {
  question: string;
  skill: string;
  subSkill: string;
  option: QuestionOption;
}

export interface QuestionDoc extends Document {
  _id: Schema.Types.ObjectId;
  title: string;
  text: string;
  questions: GeneratedQuestion[];
}

const questionSchema = new Schema<QuestionDoc>(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    questions: [
      {
        question: { type: String, required: true },
        option: {
          options: [{ type: String, required: true }],
          explanation: { type: String, required: true },
          correctAnswer: { type: String, required: true },
        },
      },
    ],
  },
  { timestamps: true }
);

export const Question = model<QuestionDoc>("Question", questionSchema);
