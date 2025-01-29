"use client";

import { use, useState } from "react";
import { Button, Input, Label, Field, Switch } from "@headlessui/react";

import { type Book } from "../store/useBookStore";
import Modal from "./Modal";

import { updateBook } from "../actions";

const BookDetail = ({
  book,
}: {
  book: Promise<{
    book: Book | null;
    message: string | null;
  }>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { book: bookDetail, message } = use(book);

  return (
    <>
      {bookDetail ? (
        <>
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
            <div className="mb-9">
              {bookDetail.description ? (
                <p className="text-md text-gray-600">
                  {bookDetail.description}
                </p>
              ) : null}
            </div>
            <Button
              className="border rounded bg-blue-500 text-white"
              style={{ padding: "0.75em 1em" }}
              onClick={() => setIsOpen(true)}
              type="button"
            >
              Edit Book Details
            </Button>
          </div>
          <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className="px-10 py-10 border rounded shadow-sm bg-white w-96 max-w-full">
              <div className="mb-9">
                <h1 className="h1">Edit Book Details</h1>
                <form action={updateBook}>
                  <Field className="mb-8">
                    <Label className="text-lg/3" htmlFor="title">
                      Title
                    </Label>
                    <Input
                      className="mt-3 block w-full rounded-lg border py-1.5 px-3 text-lg/3"
                      id="title"
                      name="title"
                      type="text"
                      defaultValue={bookDetail.title}
                    />
                  </Field>
                  <Field className="mb-8">
                    <Label className="text-lg/3" htmlFor="author">
                      Author
                    </Label>
                    <Input
                      className="mt-3 block w-full rounded-lg border py-1.5 px-3 text-lg/3"
                      id="author"
                      name="author"
                      type="text"
                      defaultValue={bookDetail.author}
                    />
                  </Field>
                  <Field className="mb-8">
                    <Label className="text-lg/3" htmlFor="genre">
                      Genre
                    </Label>
                    <Input
                      className="mt-3 block w-full rounded-lg border py-1.5 px-3 text-lg/3"
                      id="genre"
                      name="genre"
                      type="text"
                      defaultValue={bookDetail.genre}
                    />
                  </Field>
                  <Field className="mb-8">
                    <Label className="text-lg/3" htmlFor="is_read">
                      Status
                    </Label>
                    <div className="flex flex-row gap-2 items-center justify-start mt-3">
                      <Switch
                        id="is_read"
                        name="is_read"
                        onChange={() => console.log("toggled")}
                        className="border group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
                      >
                        <span
                          aria-hidden="true"
                          className="border pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
                        />
                      </Switch>
                      <p className="text-lg/3 text-gray-600" aria-live="polite">
                        {bookDetail.is_read ? "Read" : "Want to Read"}
                      </p>
                    </div>
                  </Field>
                  <Button
                    className="border rounded bg-green-500 text-white"
                    style={{ padding: "0.75em 1em" }}
                    type="submit"
                  >
                    Update Book Details
                  </Button>
                </form>
              </div>
            </div>
          </Modal>
        </>
      ) : null}
      {message ? <p>{message}</p> : null}
    </>
  );
};

export default BookDetail;
