import { TableCell } from "../ui/table";

export default function ProductTableCell({
    children,
    className = "",
    ...props
}: React.ComponentProps<typeof TableCell>) {
    return (
        <TableCell
            className={`md:px-4 md:py-3.5 p-0 truncate overflow-hidden ${className}`}
            {...props}
        >
            {children}
        </TableCell>
    );
}