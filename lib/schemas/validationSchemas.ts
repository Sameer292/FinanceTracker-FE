import z from "zod"
import { Icons } from "app/lib/constantValues"

export const categorySchema = z.object({
    name: z.string().min(1, 'Category name is required'),
    icon: z.enum(Icons),
    color: z.string(),
})

export type CategoryForm = z.infer<typeof categorySchema>