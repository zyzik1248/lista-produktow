import { ProductType } from "@/types/product";
import { fetcher } from "../fetcher";

type ProductsResp = {
    products: ProductType[]
    total: number
    limit: number
    page: number
}

type ProductsResq = {
    page: number
}

export async function getProducts({page}: ProductsResq): Promise<ProductsResp> {
    try {
        return await fetcher<ProductsResp>({
            url: "/api/products",
            params: {
                page
            }
        });
    } catch (error) {
        console.error(error);
        return {
            products: [],
            limit: 7,
            page: 1,
            total: 0
        };
    }
}