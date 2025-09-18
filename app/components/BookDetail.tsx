"use client";

import { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";

import { Button } from "@headlessui/react";

import EditBookModal from "./EditBookModal";

import { useBookStore } from "../providers/book-store-provider";
import { BookStore, type Book } from "../stores/book-store";

const BookDetail = ({
  id,
}: {
  id: Promise<{
    id: string | null;
  }>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [book, setBook] = useState<Book | undefined>(undefined);

  const getBook = useBookStore((state: BookStore) => state.getBookById);

  const { id: bookId } = use(id);

  if (!bookId) {
    notFound();
  }

  useEffect(() => {
    if (bookId) {
      setBook(getBook(bookId));
    }
  }, [bookId, setBook, getBook]);

  return (
    <>
      {book ? (
        <>
          <div className="px-4 py-10 border rounded shadow-sm">
            <div className="mb-9">
              <h1 className="h1">{book.title}</h1>
              <p className="text-gray-500">by {book.author}</p>
              <p className="text-md text-gray-600">Genre: {book.genre}</p>
              <p className="mt-2">
                <span
                  className={`px-2 py-1 text-s rounded ${
                    book.is_read
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {book.is_read ? "Have Read" : "Want to Read"}
                </span>
              </p>
            </div>
            <div className="mb-9">
              {book.description ? (
                <p className="text-md text-gray-600">{book.description}</p>
              ) : null}
            </div>
            <Button
              className="border rounded bg-blue-500 text-white"
              style={{ padding: "0.75em 1em" }}
              onClick={() => setIsOpen(true)}
              type="button"
            >
              Edit Book Details
            </Button>
          </div>
          <EditBookModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            book={book}
            onUpdate={setBook}
          />
        </>
      ) : null}
      {/* {  ? <p>{message}</p> : null} */}
    </>
  );
};

export default BookDetail;
