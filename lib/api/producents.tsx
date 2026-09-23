import { OptionType } from "@/types/product";
import { fetcher } from "../fetcher";

type ProducentsResp = {
    producents: OptionType[]
}

export async function getProducents(): Promise<ProducentsResp> {
    try {
        return await fetcher<ProducentsResp>({
            url: "/api/producents",
        });
    } catch (error) {
        console.error(error);
        return {
            producents: []
        };
    }
}