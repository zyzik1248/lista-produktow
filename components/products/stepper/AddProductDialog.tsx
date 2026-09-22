import { DialogContent, DialogHeader, DialogTrigger, Dialog, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import AddProductStepper from "./AddProductStepper";

export default function AddProductDialog() {
    return (
        <Dialog>
            <DialogTrigger className="text-sm px-4 cursor-pointer flex gap-1.5 py-[0.5rem] text-primary-foreground bg-[#2563EB] border-0 rounded-[50px] hover:bg-[#2563EB]"> <Image src="/Plus.png" alt="plus" width={16} height={16} /> Dodaj produkt</DialogTrigger>
            <DialogContent className="flex flex-col translate-0 data-open:animate-[animation-in_0.5s_ease-in-out] [&:not([data-open])]:animate-[animation-out_0.5s_ease-in-out] max-w-none rounded-none top-0 left-0 bottom-0 right-0 py-6 px-4 md:max-w-180 md:top-1/2 md:bottom-auto md:left-1/2 md:right-auto md:-translate-1/2 md:rounded-[14px] [&>button]:right-4 [&>button]:top-6 md:data-open:animate-[animation-in-2_0.5s_ease-in-out] md:[&:not([data-open])]:animate-[animation-out-2_0.1s_ease-in-out] md:px-0">
                <DialogHeader className="pb-4 h-fit md:px-4">
                    <DialogTitle className="font-geist text-foreground text-base font-medium">Dodaj nowy produkt</DialogTitle>
                </DialogHeader>
                <AddProductStepper/>
            </DialogContent>
        </Dialog>
    )
}