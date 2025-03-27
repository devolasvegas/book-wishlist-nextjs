import { Suspense } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getBooks } from "./actions";

import BookList from "./components/BookList";
import { CardsSkeleton } from "./components/skeletons";

export default async function Home() {
  const books = getBooks();

  return (
    <main>
      <div className="container mx-auto p-4">
        <h1 className="h1 text-center">My Book Collection</h1>
        <Suspense fallback={<CardsSkeleton />}>
          <BookList books={books} />
        </Suspense>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </main>
  );
}
