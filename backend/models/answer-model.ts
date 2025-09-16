import { model, models, Schema } from "mongoose";

type Answer = {
  _id: Schema.Types.ObjectId;
  bookId: Schema.Types.ObjectId;
  chapterId?: Schema.Types.ObjectId;
  questionId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  answer: string;
  isCorrect: boolean;

  selectedOption?: string;
  option?: {
    options: string[];
    explanation?: string;
  };
};

const AnswerSchema = new Schema<Answer>(
  {
    bookId: { type: Schema.Types.ObjectId, required: true, ref: "Book" },
    chapterId: { type: Schema.Types.ObjectId, required: false, ref: "Chapter" },
    questionId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Question",
    },
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    answer: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },

    selectedOption: { type: String, required: false },
    option: {
      type: {
        options: { type: [String], required: true },
        explanation: { type: String, required: false },
      },
    },
  },
  { timestamps: true }
);

export const Answer = models.Answer || model<Answer>("Answer", AnswerSchema);
