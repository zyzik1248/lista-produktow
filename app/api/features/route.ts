import { mockfeatures } from "@/data/mockProduct";

const features = [...mockfeatures];

export async function GET() {
    try {
        return Response.json(
            {
                features,
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