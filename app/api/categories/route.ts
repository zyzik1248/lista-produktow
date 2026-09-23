import { mockcategory } from "@/data/mockProduct";

const categories = [...mockcategory];

export async function GET() {
    try {
        return Response.json(
            {
                categories,
            },
            { status: 200 }
        );
    } catch {
        return Response.json(
            { error: "Failed to fetch categories" },
            { status: 500 }
        );
    }
}