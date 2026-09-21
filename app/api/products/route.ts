import { mockProducts } from "@/data/mockProduct";

const products = [...mockProducts];

export async function GET(request: Request) {
    try {
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
    } catch {
        return Response.json(
            { error: "Failed to fetch products" },
            { status: 500 }
        );
    }
}