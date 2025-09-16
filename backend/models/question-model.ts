import { model, models, Schema, Document } from "mongoose";

interface QuestionOption {
  options: string[];
  explanation: string;
}

export interface Question extends Document {
  _id: Schema.Types.ObjectId;
  chapterId?: Schema.Types.ObjectId;
  bookId: Schema.Types.ObjectId;
  question: string;
  answer: string;
  option?: QuestionOption;
}

const questionSchema = new Schema<Question>(
  {
    chapterId: { type: Schema.Types.ObjectId, required: false, ref: "Chapter" },
    bookId: { type: Schema.Types.ObjectId, required: true, ref: "Book" },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    option: {
      type: {
        options: [{ type: String, required: true }],
        explanation: { type: String, required: true },
      },
      required: false,
    },
  },
  { timestamps: true }
);

export const Question = model<Question>("Question", questionSchema);
