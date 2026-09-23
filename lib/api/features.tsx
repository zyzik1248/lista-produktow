import { OptionType } from "@/types/product";
import { fetcher } from "../fetcher";

type CategoriessResp = {
    features: OptionType[]
}

export async function getFeatures(): Promise<CategoriessResp> {
    try {
        return await fetcher<CategoriessResp>({
            url: "/api/features",
        });
    } catch (error) {
        console.error(error);
        return {
            features: []
        };
    }
}