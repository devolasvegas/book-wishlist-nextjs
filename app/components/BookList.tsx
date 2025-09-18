"use client";

import { use, useEffect, useState } from "react";
import { Button } from "@headlessui/react";

import { useBookStore } from "../providers/book-store-provider";
import { type BookStore, type Book } from "../stores/book-store";

import BookCard from "./BookCard";
import EditBookModal from "./EditBookModal";

const BookList = ({
  books,
}: {
  books: Promise<{ books: Book[]; message: string | null }>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { books: allBooks, message } = use(books);

  const setBooks = useBookStore((state: BookStore) => state.setBooks);

  useEffect(() => {
    setBooks(allBooks);
  }, [allBooks, setBooks]);

  const bookList = useBookStore((state) => state.books);

  const handleAddBook = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <div className="mb-6 md:text-right">
        <Button
          className="border rounded bg-green-500 text-white text-lg"
          style={{ padding: "0.75em 1em" }}
          onClick={() => handleAddBook()}
        >
          Add New Book
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookList?.length
          ? allBooks.map((book: Book) => <BookCard key={book.id} book={book} />)
          : null}
        {message ? <p>{message}</p> : null}
      </div>
      <EditBookModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isUpdate={false}
      />
    </div>
  );
};

export default BookList;
