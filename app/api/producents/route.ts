import { mockproducers } from "@/data/mockProduct";

const producents = [...mockproducers];

export async function GET() {
    try {
        return Response.json(
            {
                producents,
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