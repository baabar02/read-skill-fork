import { Book } from "../../models/book-model";

export const deleteBook = async (
  _: unknown,
  args: {
    bookId: string;
  }
) => {
  const deleted = await Book.findByIdAndDelete(args.bookId);

  if (!deleted) {
    throw new Error("Book not found or already deleted");
  }

  return {
    success: true,
    message: "Book deleted successfully",
  };
};
