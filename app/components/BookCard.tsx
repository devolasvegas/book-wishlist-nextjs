import Link from "next/link";
import { type Book } from "../store/useBookStore";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <Link href={`/books/${book.id}`}>
      <div className="p-4 border rounded shadow-sm">
        <h2 className="text-lg font-semibold">{book.title}</h2>
        <p className="text-sm text-gray-500">by {book.author}</p>
        <p className="text-sm text-gray-600">Genre: {book.genre}</p>
        <p className="mt-2">
          <span
            className={`px-2 py-1 text-xs rounded ${
              book.is_read
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {book.is_read ? "Have Read" : "Want to Read"}
          </span>
        </p>
      </div>
    </Link>
  );
};

export default BookCard;
