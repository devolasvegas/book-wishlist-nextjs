"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type BookStore, createBookStore } from "../stores/book-store";

export type BookStoreApi = ReturnType<typeof createBookStore>;

export const BookStoreContext = createContext<BookStoreApi | undefined>(
  undefined
);

export interface BookStoreProviderProps {
  children: ReactNode;
}

export const BookStoreProvider = ({ children }: BookStoreProviderProps) => {
  const storeRef = useRef<BookStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createBookStore();
  }

  return (
    <BookStoreContext.Provider value={storeRef.current}>
      {children}
    </BookStoreContext.Provider>
  );
};

export const useBookStore = <T,>(selector: (store: BookStore) => T): T => {
  const bookStoreContext = useContext(BookStoreContext);

  if (!bookStoreContext) {
    throw new Error(`useBookStore must be used within BookStoreProvider`);
  }

  return useStore(bookStoreContext, selector);
};
