import {
  mockcategory,
  mockcurrencies,
  mockfeatures,
  mockproducers,
  mockProducts,
} from "@/data/mockProduct";
import { productInputSchema } from "@/lib/schema";
import { ProductType } from "@/types/product";
import { NextResponse } from "next/server";
import { getStore } from "@netlify/blobs";

export const dynamic = "force-dynamic";

const STORE_NAME = "lista-produktow";
const KEY = "all";

export async function GET(request: Request) {
  try {
    const store = getStore({ name: STORE_NAME, consistency: "strong" });
    const existing = await store.get(KEY, { type: "json" });

    let products: ProductType[];

    if (existing && Array.isArray(existing) && existing.length > 0) {
      products = existing as ProductType[];
    } else {
      products = [...mockProducts];
      await store.setJSON(KEY, products);
    }

    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = 7;
    const start = (page - 1) * limit;
    const paginatedProducts = products.slice(start, start + limit);

    return Response.json(
      {
        products: paginatedProducts,
        total: products.length,
        page,
        limit,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("GET /api/products error:", err);
    return Response.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const store = getStore({ name: STORE_NAME, consistency: "strong" });
    const data = await request.json();

    const existing = await store.get(KEY, { type: "json" });
    const products: ProductType[] = existing && Array.isArray(existing) && existing.length > 0
      ? (existing as ProductType[])
      : [...mockProducts];

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
      id: products.length + 1,
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

    const result = productInputSchema.safeParse(product);

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
    await store.setJSON(KEY, products);

    return NextResponse.json({ status: 201 });
  } catch (err) {
    console.error("POST /api/products error:", err);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}