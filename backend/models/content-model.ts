import { model, models, Schema, Model } from "mongoose";

type Content = {
  _id: Schema.Types.ObjectId;
  chapterId: Schema.Types.ObjectId;
  chapter: {
    title: string;
    content: string[];
    audio_url?: string;
  };
};

const contentSchema = new Schema<Content>(
  {
    chapterId: { type: Schema.Types.ObjectId, required: false, ref: "Chapter" },
    chapter: {
      title: { type: String, required: true },
      content: { type: [String], required: true },
      audio_url: { type: String, required: false },
    },
  },
  { timestamps: true }
);

export const Content: Model<Content> =
  models.Content || model<Content>("Content", contentSchema);
