import { Suspense } from "react";

import { getBooks } from "./actions";

import BookList from "./components/BookList";

export default async function Home() {
  const books = getBooks();

  return (
    <main>
      <div className="container mx-auto p-4">
        <h1 className="h1 text-center">My Book Collection</h1>
        <Suspense fallback={<p>Loadingz...</p>}>
          <BookList books={books} />
        </Suspense>
      </div>
    </main>
  );
}
