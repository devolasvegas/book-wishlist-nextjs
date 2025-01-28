"use server";

import { type Book } from "./store/useBookStore";

interface BooksEdge {
  node: Book;
}

export async function getBooks(): Promise<{
  books: Book[];
  message: string | null;
}> {
  const query = {
    query:
      "{ booksCollection { edges { node { id title author genre is_read } } } }",
    variables: {},
  };

  const response = await fetch(
    process.env.SUPABASE_GRAPHQL_ENDPOINT as string,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.SUPABASE_ANON_KEY as string,
      },
      body: JSON.stringify(query),
    }
  ).then((res) => res.json());

  if (!response.data) {
    console.warn(
      new Error(`Failed to fetch Book List: ${response.errors[0]?.message}`)
    );

    return { books: [], message: "Failed to fetch Book List" };
  }

  return {
    books: response.data.booksCollection.edges.map(
      (edge: BooksEdge) => edge.node
    ),
    message: null,
  };
}

export async function getBook(id: string): Promise<{
  book: Book | null;
  message: string | null;
}> {
  const query = {
    query: `{
      bookById(bookId: $id) {
        id
        title
        author
        genre
        is_read
        description
      }
    }`,
    variables: {
      id,
    },
  };

  const response = await fetch(
    process.env.SUPABASE_GRAPHQL_ENDPOINT as string,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.SUPABASE_ANON_KEY as string,
      },
      body: JSON.stringify(query),
    }
  ).then((res) => res.json());

  if (!response.data) {
    console.warn(
      new Error(`Failed to fetch Book: ${response.errors[0]?.message}`)
    );

    return { book: null, message: "Failed to fetch Book" };
  }

  return {
    book: response.data.bookById,
    message: null,
  };
}
