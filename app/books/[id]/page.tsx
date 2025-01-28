import { Suspense } from "react";
import { notFound } from "next/navigation";

import BookDetail from "@/app/components/BookDetail";

import { getBook } from "@/app/actions";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const book = getBook(id);

  if (!book) {
    notFound();
  }

  return (
    <main>
      <div className="container mx-auto p-4">
        <Suspense fallback={<p>Loading...</p>}>
          <BookDetail book={book} />
        </Suspense>
      </div>
    </main>
  );
}
