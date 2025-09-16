"use client";

import { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";

import { Button } from "@headlessui/react";

import EditBookModal from "./EditBookModal";

import { BookStore, useBookStore } from "../store/useBookStore";

const BookDetail = ({
  id,
}: {
  id: Promise<{
    id: string | null;
  }>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const getBook = useBookStore((state: BookStore) => state.getBookById);
  const setBook = useBookStore((state: BookStore) => state.setBook);
  const bookDetail = useBookStore((state: BookStore) => state.book);

  const { id: bookId } = use(id);

  if (!bookId) {
    notFound();
  }

  useEffect(() => {
    if (bookId) {
      const book = getBook(bookId);
      setBook(book);
    }
  }, [bookId, setBook, getBook]);

  return (
    <>
      {bookDetail ? (
        <>
          <div className="px-4 py-10 border rounded shadow-sm">
            <div className="mb-9">
              <h1 className="h1">{bookDetail.title}</h1>
              <p className="text-gray-500">by {bookDetail.author}</p>
              <p className="text-md text-gray-600">Genre: {bookDetail.genre}</p>
              <p className="mt-2">
                <span
                  className={`px-2 py-1 text-s rounded ${
                    bookDetail.is_read
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {bookDetail.is_read ? "Have Read" : "Want to Read"}
                </span>
              </p>
            </div>
            <div className="mb-9">
              {bookDetail.description ? (
                <p className="text-md text-gray-600">
                  {bookDetail.description}
                </p>
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
          <EditBookModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
      ) : null}
      {/* {message ? <p>{message}</p> : null} */}
    </>
  );
};

export default BookDetail;
