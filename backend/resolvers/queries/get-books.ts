import mongoose from "mongoose";
import { Book } from "../../models/book-model";

export const getBookById = async (_: unknown, args: { bookId: string }) => {
  if (!mongoose.Types.ObjectId.isValid(args.bookId)) {
    throw new Error("Invalid book ID");
  }

  const book = await Book.findById(args.bookId);

  if (!book) {
    throw new Error("Book not found");
  }

  return book;
};
