import { Suspense } from "react";

import { getBooks } from "./actions";

import Logo from "./components/Logo";
import BookList from "./components/BookList";
import { CardsSkeleton } from "./components/skeletons";

export default async function Home() {
  const books = getBooks();

  return (
    <main>
      <div className="container mx-auto px-4 py-24">
        <div className="mb-8">
          <Logo />
        </div>
        <h1 className="h1 text-center sr-only">Story Shelf Reading List App</h1>
        <Suspense fallback={<CardsSkeleton />}>
          <BookList books={books} />
        </Suspense>
      </div>
    </main>
  );
}
