import Link from "next/link";
import { Button } from "@headlessui/react";
import { toast } from "react-toastify";

import DeleteBookToast from "./DeleteBookToast";

import { deleteBook } from "../actions";

import { useBookStore, type Book } from "../store/useBookStore";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { deleteBook: deleteBookZustand } = useBookStore((state) => state);

  const handleDelete = () => {
    return toast(DeleteBookToast, {
      autoClose: false,
      closeButton: false,
      // remove the padding on the toast wrapper
      // make it 400px width
      // add a thin purple border because I like purple
      className: "p-0 w-[400px] border border-red-600/40",
      ariaLabel: "Email received",
      onClose: (reason?: boolean | string) =>
        handleToastClose(reason as string),
    });
  };

  const handleToastClose = async (reason: string) => {
    if (reason === "delete") {
      console.log("Deleting book with id:", book.id);

      // Returns { data: ... } or { errors: [ { message: string } ] }
      const response = await deleteBook(book.id);

      // Show our error(s) if we have them ...
      if (response.errors) {
        console.error("Error deleting book:", response.errors[0].message);

        toast.error(
          `Failed to delete the book: ${response.errors[0].message}`,
          {
            className: "border border-red-600/40",
          }
        );

        return;
      }

      // ... or process the successful response
      console.log("Delete response:", response);

      // Update Zustand store
      deleteBookZustand(book.id);

      toast.success("Book deleted successfully!");
    } else if (reason === "cancel") {
      toast.info("Book deletion cancelled.", {
        className: "border border-yellow-600/40",
      });
    }
  };

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
            onClick={() => handleDelete && handleDelete()}
          >
            Delete Book
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
