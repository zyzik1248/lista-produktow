import Image from "next/image";
import { Button } from "../ui/button";

export default function ProductHeader() {
    return (
        <div className="flex justify-between items-center px-4 pb-6">
            <div>
                <h1 className="pb-xs text-xl font-semibold">Produkty</h1>
                <p className="text-sm text-muted-foreground">7 produktów w katalogu</p>
            </div>
            <Button className="text-sm py-4 cursor-pointer px-[0.5rem] text-primary-foreground bg-[#2563EB] border-0 rounded-[50px] hover:bg-[#2563EB]"> <Image src="/Plus.png" alt="plus" width={16} height={16}/> Dodaj produkt</Button>
        </div>
    )
}