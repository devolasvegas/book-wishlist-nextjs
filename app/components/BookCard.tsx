import Link from "next/link";
import { Button } from "@headlessui/react";
import { BookCheck, BookAlert } from "lucide-react";
import { toast } from "react-toastify";

import DeleteBookToast from "./DeleteBookToast";

import { deleteBook } from "../actions";

import { useBookStore } from "../providers/book-store-provider";
import { type Book } from "../stores/book-store";

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
    <div className="pt-8 px-12 pb-6 border border-blueberrywhip rounded shadow-sm">
      <div className="grid gap-6">
        <div className="mb-4">
          <div className="mb-2">
            {book.is_read ? (
              <div title="Have Read">
                <BookCheck color="#00D390" />
              </div>
            ) : (
              <div title="Want to Read">
                <BookAlert color="#E0A82E" />
              </div>
            )}
          </div>
          <h2
            className="text-2xl font-semibold"
            style={{ marginBottom: "0.5em" }}
          >
            {book.title}
          </h2>
          <p className="text-lg">Author {book.author}</p>
          <p className="text-lg">Genre: {book.genre}</p>
        </div>
        <div className="flex gap-2">
          <Link
            className="border border-driedgoldenrod rounded bg-transparent text-driedgoldenrod text-lg"
            style={{ padding: "0.75em 1em" }}
            href={`/books/${book.id}`}
          >
            View Details
          </Link>
          <Button
            className="border border-fusionred rounded bg-transparent text-fusionred text-lg"
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
