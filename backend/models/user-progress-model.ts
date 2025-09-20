import { model, models, Schema } from "mongoose";

type UserProgress = {
  _id: Schema.Types.ObjectId;
  userId?: Schema.Types.ObjectId;
  userName: string;
  bookId?: Schema.Types.ObjectId;
  chapterId?: Schema.Types.ObjectId;
  questionId: Schema.Types.ObjectId;
  answer: string;
  score: number;
  completed: Boolean;
  isCorrect: Boolean;
  timeDuration: Number;
  timeAnswer: Number;
  explanation?: string;
};

const UserProgressSchema = new Schema<UserProgress>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },

    bookId: { type: Schema.Types.ObjectId, required: false, ref: "Book" },
    userName: { type: String },
    chapterId: { type: Schema.Types.ObjectId, required: false, ref: "Chapter" },
    questionId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Question",
    },
    answer: { type: String, required: true },
    score: { type: Number, required: true, ref: "Score" },
    completed: { type: Boolean, required: true },
    isCorrect: { type: Boolean, required: true },
    timeDuration: { type: Number, required: true },
    timeAnswer: { type: Number, required: true },
  },
  { timestamps: true }
);

export const UserProgress = model<UserProgress>(
  "UserProgress",
  UserProgressSchema
);
