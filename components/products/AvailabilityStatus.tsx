export default function AvailabilityStatus({ isAvailable }: { isAvailable: boolean }) {
    const baseCalss = "text-xs font-medium px-[8px] py-[2px] rounded-[26px]" 

    return (
        <span
            className={
                isAvailable
                    ? `text-green-600 bg-green-600/10 ${baseCalss}`
                    : `text-destructive  bg-destructive/10 ${baseCalss}`
            }
        >
            {isAvailable ? "Dostępny" : "Niedostępny"}
        </span>
    );
}