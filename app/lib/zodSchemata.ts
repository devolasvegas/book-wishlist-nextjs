import { z } from "zod";

export const bookSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, { message: "Title is required" }),
  author: z.string().min(1, { message: "Author is required" }),
  genre: z.string().min(1, { message: "Genre is required" }),
  is_read: z.boolean().optional(),
  description: z.string().optional(),
});
