import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ProductTableHead } from "./ProductTableHead";
import ProductTableCell from "./ProductTableCell";
import { PriceType, ProductType } from "@/types/product";
import AvailabilityStatus from "./AvailabilityStatus";
import ProductPagination from "./pagination/ProductPagination";

type ProductTableProps = {
    products: ProductType[],
    totalPages: number,
    page: number
}

export default function ProductTable({ products, page, totalPages }: ProductTableProps) {

    const priceFormat = (price: PriceType) =>
        `${price.priceGross.toLocaleString("pl-PL", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })} ${price.currency.name}`;

    return (
        <div className="overflow-hidden border-border md:rounded-[10px] md:border md:shadow-xs">

            <Table className="table-fixed">
                <TableHeader className="hidden md:table-header-group">
                    <TableRow className="bg-gray-50">
                        <ProductTableHead colSpan={2}>Nazwa</ProductTableHead>
                        <ProductTableHead>SKU</ProductTableHead>
                        <ProductTableHead>Kategoria</ProductTableHead>
                        <ProductTableHead>Cena Brutto</ProductTableHead>
                        <ProductTableHead>Status</ProductTableHead>
                        <ProductTableHead>Magazyn</ProductTableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="flex flex-col gap-[0.5em] md:table-row-group">
                    {products.map(({ id, name, sku, category, price, availability }) => (
                        <TableRow key={id} className="bg-white grid grid-cols-3 p-3 border rounded-[12px] mx-4 shadow-xs hover:bg-white md:mx-0 md:border-l-0 md:border-r-0 md:border-t-0 md:p-0 md:shadow-none md:table-row">
                            <ProductTableCell className="mb-xs text-foreground text-base font-medium row-start-1 col-start-1 col-end-3 md:text-sm md:mb-0" colSpan={2} title={name}>
                                {name}
                            </ProductTableCell>
                            <ProductTableCell className="mb-[0.5em] text-xs text-muted-foreground row-start-2 col-start-1 col-end-3 md:mb-0" title={sku}>
                                {sku}
                            </ProductTableCell>
                            <ProductTableCell className="bg-accent rounded-l-[9px] py-3 pl-3 pr-xs md:py-3.5 md:px-4 md:bg-transparent" title={category.name}>
                                <p className="text-muted-foreground text-xs pb-xs md:hidden">Kategoria</p>
                                <p className="text-foreground truncate md:text-muted-foreground">{category.name}</p>
                            </ProductTableCell>
                            <ProductTableCell className="font-medium bg-accent py-3 pr-xs md:py-3.5 md:px-4 md:bg-transparent" title={priceFormat(price)}>
                                <p className="text-muted-foreground text-xs pb-xs md:hidden">Cena Brutto</p>
                                <p className="text-foreground truncate">{priceFormat(price)}</p>
                            </ProductTableCell>
                            <ProductTableCell className="col-start-3 row-start-1 row-end-3 flex justify-end items-center md:table-cell" title={availability.isAvailable ? "Dostępny" : "Niedostępny"}>
                                <AvailabilityStatus isAvailable={availability.isAvailable} />
                            </ProductTableCell>
                            <ProductTableCell className="text-foreground bg-accent py-3 pr-3 rounded-r-[9px] md:py-3.5 md:px-4 md:bg-transparent">
                                <p className="text-muted-foreground text-xs pb-xs md:hidden">Magazyn</p>
                                <p className="text-foreground">{availability.isLimited ? availability.stock : "—"}</p>
                            </ProductTableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={7} className="p-0 block bg-gray-50 md:table-cell ">
                            <div className="flex flex-col items-center justify-center md:flex-row md:justify-between md:px-4 md:py-6">
                                <p className="p-0 pt-6 text-xs text-muted-foreground md:pt-0">Strona {page} z {totalPages} · {products.length} produktów</p>
                                <ProductPagination totalPages={totalPages} page={page}/>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
}