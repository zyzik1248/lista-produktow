import { mockProducts } from "@/data/mockProduct";

const products = [...mockProducts];

export async function GET() {
    try {
        return Response.json(products, { status: 200 });
    } catch {
        return Response.json(
            { error: "Failed to fetch products" },
            { status: 500 }
        );
    }
}