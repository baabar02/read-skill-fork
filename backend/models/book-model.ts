import { model, models, Schema, Document, Model } from "mongoose";

export interface Book extends Document {
  _id: Schema.Types.ObjectId;
  title: string;
  author: string;
  image: string[];
  chapters: number;
  categories: string[];
  audio_url: string[];
  content: string[];
}

const bookSchema = new Schema<Book>(
  {
    title: { type: String, required: false, ref: "Chapter" },
    author: { type: String, required: false },
    image: { type: [String], required: false },
    chapters: { type: Number, required: false, ref: "Chapter" },
    categories: { type: [String], required: false },
    audio_url: { type: [String], required: false },
    content: { type: [String], required: false },
  },
  { timestamps: true }
);

export const Book: Model<Book> = models.Book || model<Book>("Book", bookSchema);
