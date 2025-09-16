import { Book } from "../../models/book-model";

export const getBooks = async (_: unknown, args: { bookId: string }) => {
  const allBook = Book.find({});

  return allBook;
};
