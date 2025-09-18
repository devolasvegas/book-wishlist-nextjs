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

import { updateBook, addBook as addBookAction } from "../actions";
import { useBookStore } from "../providers/book-store-provider";
import { type Book, BookStore } from "../stores/book-store";
import { bookSchema } from "../lib/zodSchemata";

const EditBookModal = ({
  isOpen,
  onClose,
  isUpdate = true,
  book,
  onUpdate,
}: {
  isOpen: boolean;
  onClose: () => void;
  isUpdate?: boolean;
  book?: Book;
  onUpdate?: (book: Book) => void;
}) => {
  const defaultFormValues = {
    id: "",
    title: "",
    author: "",
    genre: "",
    description: "",
    is_read: false,
  };
  const [formValues, setFormValues] = useState<Book>(defaultFormValues);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const addBook = useBookStore((state: BookStore) => state.addBook);

  const formTitle = isUpdate ? "Edit Book Details" : "Add NewBook";
  const buttonText = isUpdate ? "Update Book Details" : "Add Book";

  useEffect(() => {
    if (book) {
      setFormValues(book);
    }
  }, [book]);

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

      // If validation passes, proceed to update the book

      let response;

      if (!isUpdate) {
        // Handle adding a new book
        response = await addBookAction(book as Book);
      } else {
        // Handle updating an existing book
        response = await updateBook(id, book as Book);
      }

      // Successful database operation
      if (!response.message && response.book) {
        // add new book to Zustand store and show success toast
        if (!isUpdate) {
          addBook(response.book as Book);
          toast("New book added successfully!", {
            type: "success",
          });

          setLoading(false);

          // Keep users from submitting the same book multiple times
          setIsSubmitDisabled(true);

          return;
        }

        // Update local state for BookDetail component and show success toast
        if (onUpdate) {
          onUpdate(response.book as Book);
        }

        toast("Book details updated successfully!", {
          type: "success",
        });

        setLoading(false);
      } else {
        // Failed database operation
        toast(response.message, { type: "error" });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
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
  };

  const handleClose = () => {
    console.log("Closing modal");
    // Reset form state on close
    if (!isUpdate) {
      setFormValues(defaultFormValues);
    }
    setErrors({});
    setIsSubmitDisabled(false);
    onClose();
  };

  const ErrorMessage = ({ message }: { message: string | undefined }) => {
    return <div className="text-red-500 text-sm mt-1">{message}</div>;
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="px-10 py-10 border rounded shadow-sm bg-white max-w-3xl mx-auto relative">
        <div className="absolute right-10 top-6">
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
        <div className="mb-9">
          {loading && (
            <div
              className="absolute inset-0"
              style={{ backdropFilter: "blur(3px)" }}
            />
          )}
          <h2 className="h1">{formTitle}</h2>
          <form onSubmit={(e) => handleSubmit(e, formValues)}>
            {isUpdate && formValues.id ? (
              <input type="hidden" name="id" value={formValues.id} />
            ) : null}
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
              className={`border rounded bg-green-500 text-white${
                loading || isSubmitDisabled
                  ? " opacity-50 bg-green-700 cursor-not-allowed"
                  : ""
              }`}
              style={{ padding: "0.75em 1em" }}
              type="submit"
              disabled={loading || isSubmitDisabled}
            >
              {buttonText}
            </Button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default EditBookModal;
