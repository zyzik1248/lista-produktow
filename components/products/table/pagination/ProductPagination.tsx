import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationNext, PaginationPrevious } from "../../../ui/pagination";
import ProductPaginationLink from "./ProductPaginationLink";

type ProductPaginationProps = {
    page: number
    totalPages: number
}

export default function ProductPagination({ page, totalPages }: ProductPaginationProps) {
    const firstPage = page === totalPages && totalPages > 2 ? (page - 2) : page > 1 ? (page - 1) : 1
    const secondPage = page === totalPages && totalPages > 2 ? (page - 1) : page > 1 ? page : 2
    const thirdPage = page === totalPages ? page : page > 1 ? (page + 1) : 3

    return (
        <>
            {totalPages > 1 &&
                <Pagination className="gap-[0.125rem] p-0 pt-4 m-0 w-fit md:pt-0">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious aria-disabled={page === 1} className="[&_span]:!inline text-sm aria-disabled:pointer-events-none aria-disabled:text-muted-foreground" href={`?page=${(page - 1)}`} text="Wstecz" />
                        </PaginationItem>
                        {
                            page >= 3 && totalPages > 3 &&
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        }
                        {
                            totalPages >= 1 && <ProductPaginationLink page={page} paginationNumber={firstPage} />
                        }
                        {
                            totalPages >= 2 && <ProductPaginationLink page={page} paginationNumber={secondPage} />
                        }
                        {
                            totalPages >= 3 && <ProductPaginationLink page={page} paginationNumber={thirdPage} />
                        }
                        {
                            thirdPage < totalPages && totalPages > 3 &&
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        }
                        <PaginationItem>
                            <PaginationNext aria-disabled={page === totalPages} href={`?page=${(page + 1)}`} text="Dalej" className="[&_span]:!inline text-sm aria-disabled:pointer-events-none aria-disabled:text-muted-foreground" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            }
        </>
    )
}