import Link from "next/link";
import { type Book } from "../store/useBookStore";
import { Button } from "@headlessui/react";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div className="p-4 border rounded shadow-sm">
      <div className="grid gap-6">
        <div className="mb-4">
          <h2
            className="text-3xl font-semibold"
            style={{ marginBottom: "0.5em" }}
          >
            {book.title}
          </h2>
          <p className="text-xl text-gray-500">by {book.author}</p>
          <p className="text-xl text-gray-600">Genre: {book.genre}</p>
          <p className="mt-6">
            <span
              className={`px-2 py-1 text-lg rounded ${
                book.is_read
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {book.is_read ? "Have Read" : "Want to Read"}
            </span>
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            className="border rounded bg-blue-500 text-white text-lg"
            style={{ padding: "0.75em 1em" }}
            href={`/books/${book.id}`}
          >
            View Book Details
          </Link>
          <Button
            className="border rounded bg-red-600 text-white text-lg"
            style={{ padding: "0.75em 1em" }}
          >
            Delete Book
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
