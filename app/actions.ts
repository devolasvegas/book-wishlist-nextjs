"use server";

import { gql } from "@apollo/client";

import client from "./lib/apolloClient";

import { type Book } from "./store/useBookStore";

export async function getBooks(): Promise<{
  books: Book[];
  message: string | null;
}> {
  const query = gql`
    query {
      books {
        author
        description
        genre
        id
        is_read
        title
      }
    }
  `;

  const response = await client.query({ query, fetchPolicy: "no-cache" });

  if (!response.data) {
    console.warn(
      new Error(`Failed to fetch Book List: ${response.errors?.[0].message}`)
    );

    return { books: [], message: "Failed to fetch Book List" };
  }

  return {
    books: response.data.books,
    message: null,
  };
}

export async function getBook(id: string): Promise<{
  book: Book | null;
  message: string | null;
}> {
  const query = gql`
    query getBook($id: uuid!) {
      books(where: { id: { _eq: $id } }) {
        id
        title
        author
        genre
        is_read
        description
      }
    }
  `;

  const response = await client.query({
    query,
    variables: { id },
  });

  if (!response.data) {
    console.warn(
      new Error(`Failed to fetch Book: ${response.errors?.[0]?.message}`)
    );

    return { book: null, message: "Failed to fetch Book" };
  }

  // Destructuring the __typename field from the response here to remove it from the response data
  const { __typename, ...book } = response.data.books[0]; // eslint-disable-line

  return {
    book: book,
    message: null,
  };
}

export async function updateBook(
  id: string,
  formValues: Book
): Promise<{ message: string | null; book: Book | null }> {
  console.log("Updating book with ID:", id);
  const mutation = gql`
    mutation updateBook($id: uuid!, $updates: books_set_input!) {
      update_books_by_pk(pk_columns: { id: $id }, _set: $updates) {
        id
        title
        author
        description
        genre
        is_read
      }
    }
  `;

  const { __typename, ...updates } = formValues; // eslint-disable-line

  const response = await client.mutate({
    mutation,
    variables: { id: id, updates },
    errorPolicy: "all",
  });

  if (!response.data) {
    console.warn(
      new Error(`Failed to update Book: ${response.errors?.[0]?.message}`)
    );

    return { message: "Failed to update Book", book: null };
  }

  return {
    message: null,
    book: response.data.update_books_by_pk,
  };
}

export async function deleteBook(id: string) {
  const mutation = gql`
    mutation deleteBook($id: uuid!) {
      delete_books_by_pk(id: $id) {
        id
      }
    }
  `;

  return await client.mutate({
    mutation,
    variables: { id },
    errorPolicy: "all",
  });
}
