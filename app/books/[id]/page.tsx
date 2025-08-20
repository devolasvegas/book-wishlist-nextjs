import { Suspense } from "react";

import BookDetail from "@/app/components/BookDetail";
import { BookDetailsSkeleton } from "@/app/components/skeletons";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const getParams = () => params;
  const id = getParams();

  return (
    <main>
      <div className="max-w-7xl mx-auto p-4 relative">
        <h1 className="h1 text-center">Book Details</h1>
        <Suspense fallback={<BookDetailsSkeleton />}>
          <BookDetail id={id} />
        </Suspense>
      </div>
    </main>
  );
}
