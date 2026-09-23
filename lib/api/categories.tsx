import { OptionType } from "@/types/product";
import { fetcher } from "../fetcher";

type CategoriessResp = {
    categories: OptionType[]
}

export async function getCategories(): Promise<CategoriessResp> {
    try {
        return await fetcher<CategoriessResp>({
            url: "/api/categories",
        });
    } catch (error) {
        console.error(error);
        return {
            categories: []
        };
    }
}