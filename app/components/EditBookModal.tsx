"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";

import {
  Button,
  Input,
  Label,
  Field,
  Switch,
  Textarea,
} from "@headlessui/react";

import Modal from "./Modal";

import { updateBook } from "../actions";
import { Book, BookStore, useBookStore } from "../store/useBookStore";
import { bookSchema } from "../lib/zodSchemata";

const EditBookModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [formValues, setFormValues] = useState<Book>({
    id: "",
    title: "",
    author: "",
    genre: "",
    description: "",
    is_read: false,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>();
  const bookDetail = useBookStore((state: BookStore) => state.book);
  const setBook = useBookStore((state: BookStore) => state.setBook);

  useEffect(() => {
    if (bookDetail) {
      setFormValues(bookDetail);
    }
  }, [bookDetail]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | { target: { name: string; value: boolean } }
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    formValues: Book
  ) => {
    e.preventDefault();

    setLoading(true);
    // Clear previous errors
    setErrors({});

    const { id, ...book } = formValues;

    try {
      // Validate the book data
      // This will throw an error if the data is invalid
      // and we can catch it
      // and set the errors state
      bookSchema.parse(formValues);

      const response = await updateBook(id, book as Book);

      if (!response.message) {
        setBook({ id, ...response.book } as Book);

        toast("Book details updated successfully!", {
          type: "success",
        });
      } else {
        toast(response.message, { type: "error" });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle Zod validation errors
        const fieldErrors: { [key: string]: string } = {};
        // Add each error to our errors object
        // The error object has a path property that is an array of strings
        // The first element of the array is the field name
        // and the second element is the error message
        error.errors.forEach((err) => {
          const field = err.path[0];
          fieldErrors[field] = err.message;
        });
        setErrors(fieldErrors);
      }
    }

    setLoading(false);
  };

  const ErrorMessage = ({ message }: { message: string | undefined }) => {
    return <div className="text-red-500 text-sm mt-1">{message}</div>;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="px-10 py-10 border rounded shadow-sm bg-white max-w-3xl mx-auto relative">
        <div className="absolute right-10 top-6">
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        {bookDetail ? (
          <div className="mb-9">
            {loading && (
              <div
                className="absolute inset-0"
                style={{ backdropFilter: "blur(3px)" }}
              />
            )}
            <h2 className="h1">Edit Book Details</h2>
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
                  onChange={handleChange}
                />
                <ErrorMessage message={errors?.title} />
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
                  onChange={handleChange}
                />
                <ErrorMessage message={errors?.author} />
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
                  onChange={handleChange}
                />
                <ErrorMessage message={errors?.genre} />
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
                      handleChange({
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
                <ErrorMessage message={errors?.is_read} />
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
                  onChange={handleChange}
                />
                <ErrorMessage message={errors?.description} />
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
        ) : (
          <div className="mb-9">
            <h2 className="h1 text-center">Book Details Unavailable</h2>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default EditBookModal;
