import { TableHead } from "@/components/ui/table";

type ProductTableHeadProps = React.ComponentProps<typeof TableHead>;

export function ProductTableHead({
    className = "",
    ...props
}: ProductTableHeadProps) {
    return (
        <TableHead
            className={`px-4 py-3.5 text-muted-foreground font-medium ${className}`}
            {...props}
        />
    );
}