import { z } from "zod";

export const loginSchema = z.object({
	username: z.string().min(1, { message: "Username can't be empty" }),
	password: z.string(),
});
