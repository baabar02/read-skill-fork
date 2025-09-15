import { Content } from "../../models/content-model";
import { Chapter } from "../../models/chapter-model";

export const addContentWithChapter = async (
  _: unknown,
  args: {
    chapterId: string;
    title: string;
    audio_url: string;
    content: string[];
  }
) => {

  const chapter = await Chapter.create({
    bookId: args.chapterId, 
    title: args.title,
    audio_url: args.audio_url,
    content: args.content,
  });


  const content = await Content.create({
    chapterId: chapter._id,
    chapter: {
      title: chapter.title,
      content: chapter.content,
      audio_url: chapter.audio_url,
    },
  });

  return content;
};
