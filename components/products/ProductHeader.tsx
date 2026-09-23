import { OptionType } from "@/types/product";
import AddProductDialog from "./stepper/AddProductDialog";

type ProductHeaderProps = {
    producents: OptionType[]
    categories: OptionType[]
    features: OptionType[]
    currencies: OptionType[]
}

export default function ProductHeader({ producents, categories, features, currencies }: ProductHeaderProps) {
    return (
        <div className="flex justify-between items-center px-4 pb-6">
            <div>
                <h1 className="pb-xs text-xl font-semibold">Produkty</h1>
                <p className="text-sm text-muted-foreground">7 produktów w katalogu</p>
            </div>
            <AddProductDialog producents={producents} categories={categories} features={features} currencies={currencies}/>
        </div>
    )
}