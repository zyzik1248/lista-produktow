import { z } from "zod";

export const step1Schema = z.object({
    name: z.string().min(3, "Wymagane, min. 3 znaki"),
    sku: z
        .string()
        .min(1, "Wymagane")
        .max(24, "Maks. 24 znaki")
        .regex(/^[a-zA-Z0-9]+$/, "Tylko litery i cyfry"),
    description: z.string(),
    producer: z.number("wymagane").min(1, "Wymagane"),
    category: z.number("wymagane").min(1, "Wymagane"),
    features: z
        .array(z.number())
        .min(1, "Wybierz co najmniej jedną cechę"),
});

const moneySchema = z
    .string("Podaj poprawną kwotę")
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

export const CartQuantity = z.object({
    minCartQuantity: z.string(),
    maxCartQuantity: z.string(),
}).refine(
    (data) => Number(data.minCartQuantity) <= Number(data.maxCartQuantity),
    {
        path: ["minCartQuantity"],
        message: "Min. ilość nie może być większa od maksymalnej",
    }
).refine(
    (data) => Number(data.minCartQuantity) <= Number(data.maxCartQuantity),
    {
        path: ["maxCartQuantity"],
        message: "Max. ilość nie może być mniejsza od minimalnej",
    }
)

export const step3Schema = z
    .object({
        isAvailable: z.boolean(),
        isLimited: z.boolean(),

        minCartQuantity: z
            .string("Musi być liczbą całkowitą większą od 0")
            .regex(/^[1-9]\d*$/, "Musi być liczbą całkowitą większą od 0"),

        maxCartQuantity: z
            .string("Musi być liczbą całkowitą większą od 0")
            .regex(/^[1-9]\d*$/, "Musi być liczbą całkowitą większą od 0"),

        stack: z
            .string("Musi być liczbą całkowitą większą od 0"),
    })
    .refine(
        (data) => data.stack == null || !data.isLimited || /^[1-9]\d*$/.test(data.stack),
        {
            path: ["stack"],
            message: "Musi być liczbą całkowitą większą od 0",
        }
    )


export const schema = z.object({
    step1: step1Schema,
    step2: step2Schema,
    step3: step3Schema
})

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  sku: z.string(),
  description: z.string(),

  producer: z.object({
    id: z.number(),
    name: z.string(),
  }),

  category: z.object({
    id: z.number(),
    name: z.string(),
  }),

  features: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),

  price: z.object({
    priceNet: z.number(),
    priceGross: z.number(),
    vat: z.number(),
    currency: z.object({
      id: z.number(),
      name: z.string(),
    }),
  }),

  availability: z.object({
    isAvailable: z.boolean(),
    isLimited: z.boolean(),
    stock: z.number().nullable().optional(),
    minCartQuantity: z.number(),
    maxCartQuantity: z.number(),
  }),
});