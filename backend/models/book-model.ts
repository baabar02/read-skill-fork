import { model, models, Schema } from "mongoose";

type Book = {
    _id: Schema.Types.ObjectId;
    title: string;
    author: string;
    image: string;
    chapters: number;
    categories: string[];
    audio_url: string;
    createdAt: Date;
    updatedAt: Date;
}

const bookSchema = new Schema<Book>({
    title: { type: String, required: true, ref: "Chapter" },
    author: { type: String, required: true },
    image: { type: String, required: true },    
    chapters: { type: Number, required: true, ref: "Chapter" },
    categories: { type: [String], required: true },
    audio_url: { type: String, required: false },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
}, { timestamps: true });

export const Book = models.Book || model<Book>("Book", bookSchema);