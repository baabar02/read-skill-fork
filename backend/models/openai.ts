import { Schema, model, Document } from "mongoose";

export interface AIQuestion extends Document {
  text: string; // хэрэглэгчийн оруулсан текст
  questions: string[]; // AI-аас үүссэн асуултууд
  createdAt: Date;
}

const QuestionSchema = new Schema<AIQuestion>(
  {
    text: { type: String, required: true },
    questions: [{ type: String, required: true }],
  },
  { timestamps: true }
);
