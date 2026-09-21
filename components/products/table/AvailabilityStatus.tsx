import { Badge } from "@/components/ui/badge"

export default function AvailabilityStatus({ isAvailable }: { isAvailable: boolean }) {
    const baseCalss = "text-xs font-medium px-[0.5em] transition transition-colors ease-in-out duration-300"

    return (
        <Badge variant={isAvailable ? "default" : "destructive"}
            className={
                isAvailable
                    ? `text-green-600 bg-green-600/10 ${baseCalss} hover:bg-primary/80`
                    : `${baseCalss} hover:bg-destructive/20 `
            }
        >
            {isAvailable ? "Dostępny" : "Niedostępny"}
        </Badge>
    );
}