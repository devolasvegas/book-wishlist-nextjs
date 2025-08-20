import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Book {
  __typename?: string;
  id: string;
  title: string;
  author: string;
  genre: string;
  description?: string;
  is_read?: boolean;
}

export interface BookStore {
  books: Book[];
  book: Book | null;
  setBook: (book: Book | undefined) => void;
  getBookById: (id: string) => Book | undefined;
  setBooks: (books: Book[]) => void;
  addBook: (book: Book) => void;
  updateBookStatus: (id: string, status: "Want to Read" | "Read") => void;
  deleteBook: (id: string) => void;
}

export const useBookStore = create<BookStore>()(
  persist(
    (set, get) => ({
      books: [],
      book: null,
      setBook: (book) => set({ book }),
      getBookById: (id) =>
        get().books.find((book) => {
          return book.id === id;
        }),
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
    }),
    { name: "book-storage" }
  )
);
