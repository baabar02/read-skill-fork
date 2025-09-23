model;
import { model, Schema, models, Model } from "mongoose";

type TranscriptionType = {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  bookId: Schema.Types.ObjectId;
  text: String;
  wordCount: number;
  duration: number;
  isCorrect: boolean;
  score: number;
};
const TranscriptionSchema = new Schema<TranscriptionType>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    bookId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Question", // 'Book' гэсэн цуглуулгатай холбоно.
    },
    text: {
      type: String,
      required: true,
    },
    wordCount: {
      type: Number,
      required: true,
      default: 0,
    },
    duration: {
      type: Number,
      required: true,
      default: 0,
    },
    isCorrect: {
      type: Boolean,
      required: true,
      default: false,
    },
    score: 
    { type: Number, 
      required: true,
    },
  },
  { timestamps: true }
);
export const Transcription: Model<TranscriptionType> =
  models.Transcription ||
  model<TranscriptionType>("Transcription", TranscriptionSchema);
