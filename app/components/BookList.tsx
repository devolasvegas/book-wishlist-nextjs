"use client";

import { useBookStore, type BookStore, type Book } from "../store/useBookStore";
import BookCard from "./BookCard";

const BookList = () => {
  const books = useBookStore((state: BookStore) => state.books);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book: Book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
