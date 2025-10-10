import { useState } from "react";
import { Button } from "@headlessui/react";
import { BookCheck, BookAlert } from "lucide-react";
import { toast } from "react-toastify";

import BookModal from "./BookModal";
import BookDetail from "./BookDetail";
import DeleteBookToast from "./DeleteBookToast";

import { deleteBook } from "../actions";

import { useBookStore } from "../providers/book-store-provider";
import { type Book } from "../stores/book-store";
import BookForm from "./BookForm";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [bookDetail, setBookDetail] = useState<Book>(book);
  const [viewMode, setViewMode] = useState<"view" | "edit">("view");
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
      console.log("Deleting book with id:", bookDetail.id);

      // Returns { data: ... } or { errors: [ { message: string } ] }
      const response = await deleteBook(bookDetail.id);

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
      deleteBookZustand(bookDetail.id);

      toast.success("Book deleted successfully!");
    } else if (reason === "cancel") {
      toast.info("Book deletion cancelled.", {
        className: "border border-yellow-600/40",
      });
    }
  };

  // Close the modal and reset view mode to "view"
  // so that when we open it again, we don't get the form
  const handleModalClose = () => {
    setIsOpen(false);
    setViewMode("view");
  };

  return (
    bookDetail && (
      <div className="pt-8 px-12 pb-6 border border-blueberrywhip rounded shadow-sm">
        <div className="grid gap-6">
          <div className="mb-4">
            <div className="mb-4">
              {bookDetail.is_read ? (
                <div title="Have Read">
                  <BookCheck color="#00D390" size={"32px"} />
                </div>
              ) : (
                <div title="Want to Read">
                  <BookAlert color="#E0A82E" size={"32px"} />
                </div>
              )}
            </div>
            <h2
              className="text-2xl font-semibold"
              style={{ marginBottom: "0.5em" }}
            >
              {bookDetail.title}
            </h2>
            <p className="text-lg">Author {bookDetail.author}</p>
            <p className="text-lg">Genre: {bookDetail.genre}</p>
          </div>
          <div className="flex gap-2">
            <Button
              className="border border-driedgoldenrod rounded bg-transparent text-driedgoldenrod text-lg hover:bg-driedgoldenrod hover:text-white transition-all duration-300"
              style={{ padding: "0.75em 1em" }}
              onClick={() => setIsOpen(true)}
            >
              View Details
            </Button>
            <Button
              className="border border-fusionred rounded bg-transparent text-fusionred text-lg hover:bg-fusionred hover:text-white transition-all duration-300"
              style={{ padding: "0.75em 1em" }}
              onClick={() => handleDelete && handleDelete()}
            >
              Delete Book
            </Button>
            <BookModal isOpen={isOpen} onClose={handleModalClose}>
              {viewMode === "view" ? (
                <BookDetail
                  book={bookDetail}
                  viewModeHandler={() => setViewMode("edit")}
                />
              ) : (
                <BookForm
                  isUpdate={true}
                  book={bookDetail}
                  onUpdate={setBookDetail}
                />
              )}
            </BookModal>
          </div>
        </div>
      </div>
    )
  );
};

export default BookCard;
