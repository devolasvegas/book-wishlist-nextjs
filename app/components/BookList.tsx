"use client";

import { use, useEffect } from "react";
import { useBookStore, type BookStore, type Book } from "../store/useBookStore";

import BookCard from "./BookCard";

const BookList = ({
  books,
}: {
  books: Promise<{ books: Book[]; message: string | null }>;
}) => {
  const { books: allBooks, message } = use(books);

  const setBooks = useBookStore((state: BookStore) => state.setBooks);

  useEffect(() => {
    setBooks(allBooks);
  }, [allBooks, setBooks]);

  const bookList = useBookStore((state) => state.books);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookList?.length
        ? allBooks.map((book: Book) => <BookCard key={book.id} book={book} />)
        : null}
      {message ? <p>{message}</p> : null}
    </div>
  );
};

export default BookList;
