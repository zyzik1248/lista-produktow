import { mockproducers } from "@/data/mockProduct";

const producers = [...mockproducers];

export async function GET() {
    try {
        return Response.json(
            {
                producers,
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