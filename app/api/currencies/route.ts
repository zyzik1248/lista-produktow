import {  mockcurrencies } from "@/data/mockProduct";

const currencies = [...mockcurrencies];

export async function GET() {
    try {
        return Response.json(
            {
                currencies,
            },
            { status: 200 }
        );
    } catch {
        return Response.json(
            { error: "Failed to fetch currencies" },
            { status: 500 }
        );
    }
}