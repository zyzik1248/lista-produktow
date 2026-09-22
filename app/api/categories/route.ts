import { mockcategory } from "@/data/mockProduct";

const category = [...mockcategory];

export async function GET() {
    try {
        return Response.json(
            {
                category,
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