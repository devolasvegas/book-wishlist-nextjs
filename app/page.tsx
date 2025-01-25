import BookList from "./components/BookList";

export default function Home() {
  return (
    <main>
      <div className="container mx-auto p-4">
        <h1 className="h1 text-center">My Book Collection</h1>
        <BookList />
      </div>
    </main>
  );
}
