import { model, models, Schema, Model } from "mongoose";

type Chapter = {
  _id: Schema.Types.ObjectId;
  bookId: Schema.Types.ObjectId;
  contentId?: Schema.Types.ObjectId;
  title: string;
  audio_url: string;
  content: string[];
};

const chapterSchema = new Schema<Chapter>(
  {
    bookId: { type: Schema.Types.ObjectId, required: true, ref: "Book" },
    contentId: { type: Schema.Types.ObjectId, required: false, ref: "Content" },
    title: { type: String, required: false },
    audio_url: { type: String, required: false },
    content: { type: [String], required: true },
  },
  { timestamps: true }
);

export const Chapter: Model<Chapter> =
  models.Chapter || model<Chapter>("Chapter", chapterSchema);
