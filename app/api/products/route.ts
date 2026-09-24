import { getStore } from "@netlify/blobs";
import {
  mockcategory,
  mockcurrencies,
  mockfeatures,
  mockproducers,
  mockProducts,
} from "@/data/mockProduct";
import { productSchema } from "@/lib/schema";
import { ProductType } from "@/types/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const productsDev = [...mockProducts]

export async function GET(request: Request) {
  try {
    let products = []

    if (process.env.NODE_ENV == "development") {
      products = productsDev
    } else {
      const store = getStore("products");

      products = await store.get("products", {
        type: "json",
        consistency: "strong",
      });

      if (!products) {
        products = mockProducts;

        await store.setJSON("products", products);
      }
    }

    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = 7;

    const start = (page - 1) * limit;

    const paginatedProducts = products.slice(start, start + limit);

    return NextResponse.json({
      products: paginatedProducts,
      total: products.length,
      page,
      limit,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    let products: ProductType[];

    if (process.env.NODE_ENV === "development") {
      products = productsDev;
    } else {
      const store = getStore("products");

      products =
        ((await store.get("products", {
          type: "json",
          consistency: "strong",
        })) as ProductType[] | null) ?? [];
    }

    const data = await request.json();

    const producer = mockproducers.find((item) => item.id === data.producer);

    const category = mockcategory.find((item) => item.id === data.category);

    const features = data.features.map((id: string | number) => {
      const feature = mockfeatures.find((item) => item.id === id);

      return {
        id,
        name: feature?.name ?? "",
      };
    });

    const currency = mockcurrencies.find(
      (item) => item.id === data.price.currency
    );

    const product: ProductType = {
      id: crypto.randomUUID(),

      name: data.name,
      sku: data.sku,
      description: data.description,

      producer: {
        id: data.producer,
        name: producer?.name ?? "",
      },

      category: {
        id: data.category,
        name: category?.name ?? "",
      },

      features,

      price: {
        ...data.price,
        currency: {
          id: data.price.currency,
          name: currency?.name ?? "",
        },
      },

      availability: data.availability,
    };

    const result = productSchema.safeParse(product);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    products.push(product);

    if (process.env.NODE_ENV !== "development") {
      const store = getStore("products");
      await store.setJSON("products", products);
    }

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
