import AddProductDialog from "./stepper/AddProductDialog";

export default function ProductHeader() {
    return (
        <div className="flex justify-between items-center px-4 pb-6">
            <div>
                <h1 className="pb-xs text-xl font-semibold">Produkty</h1>
                <p className="text-sm text-muted-foreground">7 produktów w katalogu</p>
            </div>
            <AddProductDialog/>
        </div>
    )
}