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
    category: z.number("wymagane").min(1, "Wymagane"),
    features: z
        .array(z.number())
        .min(1, "Wybierz co najmniej jedną cechę"),
});

const moneySchema = z
    .string("Podaj poprawną kwotę")
    .nullable()
    .refine(
        (value) =>
            value === null ||
            /^(0|[1-9]\d*)(\.\d{0,2})?$/.test(value),
        "Podaj poprawną kwotę"
    )


export const step2Schema = z.object({
    priceNet: moneySchema,
    priceGross: moneySchema,
    vat: z
        .string("Wartość musi być liczbą")
        .regex(/^\d+$/, "VAT musi być liczbą całkowitą"),
    currency: z.number().min(1, "Wymagane"),
});

export const schema = z.object({
    step1: step1Schema,
    step2: step2Schema
})