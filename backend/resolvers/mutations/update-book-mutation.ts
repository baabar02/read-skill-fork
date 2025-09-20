import { Book } from "../../models/book-model";

export const updateBook = async (
  _: unknown,
  args: {
    id: string;
    title?: string;
    chapters?: number;
    author?: string;
    categories?: string[];
    content?: string;
    image?: string[];
    audio_url?: string[];
  }
) => {
  const book = await Book.findById(args.id);
  if (!book) {
    throw new Error("Book not found");
  }

  if (args.title) book.title = args.title;
  if (args.chapters !== undefined) book.chapters = args.chapters;
  if (args.author) book.author = args.author;
  if (args.categories) book.categories = args.categories;

  if (args.content) {
    book.content = args.content
      .split(/(?<=[.!?])\s+|(?<=\n)\s*/)
      .filter((part) => part.trim().length > 0)
      .map((part) => part.trim());
  }

  if (args.image) book.image = args.image;
  if (args.audio_url) book.audio_url = args.audio_url;

  await book.save();

  return book;
};
