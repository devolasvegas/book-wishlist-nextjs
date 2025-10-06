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
      <div className="flex flex-col md:flex-row md:justify-between mb-10 gap-8">
        <div>
          <p className="text-xl leading-relaxed" style={{ maxWidth: "40em" }}>
            Keep track of the books you love, the ones you own, and the stories
            still on your wishlist. Build your personal library on StoryShelf —
            your collection, all in one place.
          </p>
        </div>
        <Button
          className="border border-caribbeangreen rounded bg-transparent text-caribbeangreen text-lg"
          style={{ padding: "0.75em 1em" }}
          onClick={() => handleAddBook()}
        >
          Add New Book
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookList?.length
          ? bookList.map((book: Book) => <BookCard key={book.id} book={book} />)
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
