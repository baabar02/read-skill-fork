import { Book } from "../../models/book-model";

export const addBook = async (
  _: unknown,
  args: {
    title: string;
    chapters?: number;
    author?: string;
    categories?: string[];
    content: string;
    image?: string[];
    audio_url?: string[];
  }
) => {
  const existingBook = await Book.findOne({ title: args.title });

  if (existingBook) {
    throw new Error("Book already exists");
  }

  
  const contentArray = args.content
    .split(/(?<=[.!?])\s+|(?<=\n)\s*/)
    .filter((part) => part.trim().length > 0)
    .map((part) => part.trim());

  console.log("Content array:", contentArray);
  console.log("Number of content parts:", contentArray.length);

  const book = await Book.create({
    title: args.title,
    chapters: args.chapters || 1,
    author: args.author || "Unknown",
    categories: args.categories || [],
    content: contentArray,
    image: args.image || [],
    audio_url: args.audio_url || [],
  });

  if (!book) {
    throw new Error("Book not created");
  }

  return book;
};
