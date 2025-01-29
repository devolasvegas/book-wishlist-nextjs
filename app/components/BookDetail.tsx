"use client";

import { use, useEffect, useState } from "react";
import {
  Button,
  Input,
  Label,
  Field,
  Switch,
  Textarea,
} from "@headlessui/react";

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
  const [formValues, setFormValues] = useState<Book>({
    id: "",
    title: "",
    author: "",
    genre: "",
    description: "",
    is_read: false,
  });
  const [isOpen, setIsOpen] = useState(false);
  const { book: bookDetail, message } = use(book);

  useEffect(() => {
    if (bookDetail) {
      setFormValues(bookDetail);
    }
  }, [bookDetail]);

  const handleOnChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | { target: { name: string; value: boolean } }
  ) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    formValues: Book
  ) => {
    e.preventDefault();
    updateBook(formValues);
  };

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
            <div className="px-10 py-10 border rounded shadow-sm bg-white max-w-3xl mx-auto relative">
              <div className="absolute right-10 top-6">
                <button
                  className="modal-close is-large"
                  aria-label="close"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
              </div>
              <div className="mb-9">
                <h1 className="h1">Edit Book Details</h1>
                <form onSubmit={(e) => handleSubmit(e, formValues)}>
                  <input type="hidden" name="id" value={bookDetail.id} />
                  <Field className="mb-8">
                    <Label className="text-lg/3" htmlFor="title">
                      Title
                    </Label>
                    <Input
                      className="mt-3 block w-full rounded-lg border py-1.5 px-3 text-lg/3"
                      id="title"
                      name="title"
                      type="text"
                      value={formValues.title}
                      onChange={handleOnChange}
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
                      value={formValues.author}
                      onChange={handleOnChange}
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
                      value={formValues.genre}
                      onChange={handleOnChange}
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
                        checked={formValues.is_read}
                        onChange={(checked) =>
                          handleOnChange({
                            target: { name: "is_read", value: checked },
                          })
                        }
                        className="border group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-green-200"
                      >
                        <span
                          aria-hidden="true"
                          className="border pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
                        />
                      </Switch>
                      <p className="text-lg/3 text-gray-600" aria-live="polite">
                        {formValues.is_read ? "Read" : "Want to Read"}
                      </p>
                    </div>
                  </Field>
                  <Field className="mb-8">
                    <Label className="text-lg/3" htmlFor="description">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      className="mt-3 block w-full rounded-lg border py-1.5 px-3 text-lg"
                      rows={7}
                      value={formValues.description}
                      onChange={handleOnChange}
                    />
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
