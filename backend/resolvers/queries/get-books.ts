
import { Book } from "../../models/book-model";

export const getBooks = async () => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return books;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw new Error("Failed to fetch books");
  }
}
