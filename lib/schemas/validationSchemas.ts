import z from "zod";
import { Icons } from "app/lib/constantValues";

export const categorySchema = z.object({
	name: z.string().min(1, "Category name is required"),
	icon: z.enum(Icons),
	color: z.string(),
});

export type CategoryForm = z.infer<typeof categorySchema>;

export const loginSchema = z.object({
	email: z.email({ error: "Enter a valid email address" }),
	password: z.string().nonempty({ error: "Password is required" }),
});

export type loginSchemaType = z.infer<typeof loginSchema>;

export const registerSchema = z
	.object({
		name: z
			.string()
			.trim()
			.min(1, { error: "Name is required." })
			.regex(/^[a-zA-Z0-9 ]+$/, {
				error: "Name can only contain letters and spaces.",
			}),
		email: z.email({ error: " Please enter a valid email address." }),
		password: z.string().min(1, { error: "Password is required." }),
		confirmPassword: z.string().min(1, { error: "Password is required." }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});
export type registerSchemaType = z.infer<typeof registerSchema>;
