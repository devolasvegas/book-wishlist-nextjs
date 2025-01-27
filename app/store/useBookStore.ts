import { create } from "zustand";

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  description?: string;
  is_read?: boolean;
}

export interface BookStore {
  books: Book[];
  setBooks: (books: Book[]) => void;
  addBook: (book: Book) => void;
  updateBookStatus: (id: string, status: "Want to Read" | "Read") => void;
  deleteBook: (id: string) => void;
}

export const useBookStore = create<BookStore>((set) => ({
  books: [],
  setBooks: (books) => set({ books }),
  addBook: (book) => set((state) => ({ books: [...state.books, book] })),
  updateBookStatus: (id, status) =>
    set((state) => ({
      books: state.books.map((book) =>
        book.id === id ? { ...book, status } : book
      ),
    })),
  deleteBook: (id) =>
    set((state) => ({
      books: state.books.filter((book) => book.id !== id),
    })),
}));
