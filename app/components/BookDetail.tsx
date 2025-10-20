"use client";

import { Button } from "@headlessui/react";

import BookStatusIcon from "./BookStatusIcon";

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
            <h1 className="h1">Book details.</h1>
            <h2 className="h2">{book.title}</h2>
            <div className="mb-3">
              <BookStatusIcon isRead={book.is_read} />
            </div>
            <p className="text-lg text-gray-500 mb-1">Author: {book.author}</p>
            <p className="text-lg text-gray-600">Genre: {book.genre}</p>
          </div>
          <div className="mb-16">
            {book.description ? (
              <p className="text-md text-gray-600 leading-loose">
                {book.description}
              </p>
            ) : null}
          </div>
          <Button
            className="border border-driedgoldenrod rounded bg-transparent text-driedgoldenrod text-lg hover:bg-driedgoldenrod hover:text-white transition-all duration-300"
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
