import { ProductType } from "@/types/product";
import { fetcher } from "../fetcher";

export async function getProducts(): Promise<ProductType[]> {
    try {
        return await fetcher<ProductType[]>({
            url: "/api/products",
        });
    } catch (error) {
        console.error(error);
        return [];
    }
}