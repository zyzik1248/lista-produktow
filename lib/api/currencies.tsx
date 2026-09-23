import { OptionType } from "@/types/product";
import { fetcher } from "../fetcher";

type CurrenciesResp = {
    currencies: OptionType[]
}

export async function getCurrencies(): Promise<CurrenciesResp> {
    try {
        return await fetcher<CurrenciesResp>({
            url: "/api/currencies",
        });
    } catch (error) {
        console.error(error);
        return {
            currencies: []
        };
    }
}