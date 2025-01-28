import { getBook } from "@/app/actions";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const { book, message } = await getBook(id);

  console.log(book, message);

  return <div>My Book {id}</div>;
}
