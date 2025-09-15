import { Chapter } from "../../models/chapter-model";

export const addContent = async (
  _: unknown,
  args: {
    bookId: string;
    title: string;
    audio_url: string;
    content: string[];
  }
) => {
  const existingContent = await Chapter.findOne({ title: args.title });
  if (existingContent) {
    throw new Error("Content already exists");
  }

  const content = await Chapter.create({
    bookId: args.bookId,
    title: args.title,
    audio_url: args.audio_url,
    content: args.content,
  });

  return content;
};
