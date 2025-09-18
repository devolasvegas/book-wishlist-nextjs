import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

export type Book = {
  __typename?: string;
  id: string;
  title: string;
  author: string;
  genre: string;
  description?: string;
  is_read?: boolean;
};

export type BooksState = {
  books: Book[];
};

export type BooksActions = {
  getBookById: (id: string) => Book | undefined;
  setBooks: (books: Book[]) => void;
  addBook: (book: Book) => void;
  updateBookStatus: (id: string, status: "Want to Read" | "Read") => void;
  deleteBook: (id: string) => void;
};

export type BookStore = BooksState & BooksActions;

export const defaultInitState = {
  books: [],
};

export const createBookStore = (initState: BooksState = defaultInitState) => {
  return createStore<BookStore>()(
    persist(
      (set, get) => ({
        ...initState,
        getBookById: (id) =>
          get().books.find((book) => {
            return book.id === id;
          }),
        setBooks: (books) => set({ books }),
        addBook: (book) =>
          set((state) => ({ ...state, books: [...state.books, book] })),
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
};
