import { PaginationItem, PaginationLink } from "@/components/ui/pagination";

type ProductPaginationLinkProps ={
    page: number
    paginationNumber: number
}

export default function ProductPaginationLink({page, paginationNumber}: ProductPaginationLinkProps) {
    return (
        <PaginationItem>
            <PaginationLink href={`?page=${paginationNumber}`} isActive={paginationNumber === page} className={`${paginationNumber === page ? "bg-blue-600 text-white" : ""} border-0 transition-colors ease-in-out duration-300`}>
                {paginationNumber}
            </PaginationLink>
        </PaginationItem>
    )
}