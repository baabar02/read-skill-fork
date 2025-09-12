import { model, models, Schema } from "mongoose";

type Chapter = {
    _id: Schema.Types.ObjectId;
    bookId: Schema.Types.ObjectId;
    contentId: Schema.Types.ObjectId;
    title: string;
    audio_url: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

const chapterSchema = new Schema<Chapter>({
    bookId: { type: Schema.Types.ObjectId, required: true, ref: "Book" },
    contentId: { type: Schema.Types.ObjectId, required: true, ref: "Content" },
    title: { type: String, required: true },
    audio_url: { type: String, required: false },
    content: { type: String, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
}, { timestamps: true });

export const Chapter = models.Chapter || model<Chapter>("Chapter", chapterSchema);