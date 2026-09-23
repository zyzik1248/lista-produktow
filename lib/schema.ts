import { z } from "zod";

export const step1Schema = z.object({
    name: z.string().min(3, "Wymagane, min. 3 znaki"),
    sku: z
        .string()
        .min(1, "Wymagane")
        .max(24, "Maks. 24 znaki")
        .regex(/^[a-zA-Z0-9]+$/, "Tylko litery i cyfry"),
    description: z.string(),
    producent: z.number("wymagane").min(1, "Wymagane"),
    category: z.number("wymagane"). min(1, "Wymagane"),
    features: z
        .array(z.number())
        .min(1, "Wybierz co najmniej jedną cechę"),
});

export const schema = z.object({
    step1: step1Schema,
})