import { use } from "react";

import { Book } from "../store/useBookStore";

const BookDetail = ({
  book,
}: {
  book: Promise<{
    book: Book | null;
    message: string | null;
  }>;
}) => {
  const { book: bookDetail, message } = use(book);
  return (
    <>
      {bookDetail ? (
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
                {bookDetail.is_read ? "Read" : "Want to Read"}
              </span>
            </p>
          </div>
          <div>
            {bookDetail.description ? (
              <p className="text-md text-gray-600">{bookDetail.description}</p>
            ) : null}
          </div>
        </div>
      ) : null}
      {message ? <p>{message}</p> : null}
    </>
  );
};

export default BookDetail;
