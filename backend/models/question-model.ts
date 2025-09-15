import { model, models, Schema } from "mongoose";
import type { InferSchemaType } from "mongoose";

export interface Question {
  _id: Schema.Types.ObjectId;
  chapterId?: Schema.Types.ObjectId;
  bookId: Schema.Types.ObjectId;
  question: string;
  answer: string;
  option?: {
    options: string[];
    explanation?: string;
  };
}

const questionSchema = new Schema<Question>(
  {
    chapterId: { type: Schema.Types.ObjectId, required: false, ref: "Chapter" },
    bookId: { type: Schema.Types.ObjectId, required: true, ref: "Book" },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    option: {
      type: {
        options: { type: [String], required: true },
        explanation: { type: String, required: false },
      },
    },
  },
  { timestamps: true }
);
export type Questions = InferSchemaType<typeof questionSchema>;

export const QuestionModel = model<Question>("Question", questionSchema);
