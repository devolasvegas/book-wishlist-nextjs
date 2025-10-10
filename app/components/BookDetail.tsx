"use client";

import { Button } from "@headlessui/react";

import { type Book } from "../stores/book-store";

const BookDetail = ({
  book,
  viewModeHandler,
}: {
  book?: Book;
  viewModeHandler: () => void;
}) => {
  return (
    <>
      {book ? (
        <>
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
            onClick={viewModeHandler}
            type="button"
          >
            Edit Book Details
          </Button>
        </>
      ) : null}
      {/* {  ? <p>{message}</p> : null} */}
    </>
  );
};

export default BookDetail;
