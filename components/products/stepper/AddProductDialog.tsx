'use client'

import { DialogContent, DialogHeader, DialogTrigger, Dialog, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import AddProductStepper from "./AddProductStepper";
import { OptionType } from "@/types/product";
import { useState } from "react";

type AddProductDialogProps = {
    producents: OptionType[]
    categories: OptionType[]
    features: OptionType[]
    currencies: OptionType[]
}

export default function AddProductDialog({
    producents,
    categories,
    features,
    currencies
}: AddProductDialogProps) {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="text-sm px-4 cursor-pointer flex gap-1.5 py-[0.5rem] text-primary-foreground bg-[#2563EB] border-0 rounded-[50px] hover:bg-[#2563EB]">
                <Image src="/Plus.png" alt="plus" width={16} height={16} />
                Dodaj produkt
            </DialogTrigger>

            <DialogContent className="gap-0 transition-all duration-700 overflow-y-auto flex flex-col translate-0 data-open:animate-[animation-in_0.5s_ease-in-out] [&:not([data-open])]:animate-[animation-out_0.5s_ease-in-out] max-w-none! rounded-none top-0 left-0 bottom-0 right-0 pt-6 pb-0 px-0 md:max-w-180! md:top-1/2 md:bottom-auto md:left-1/2 md:right-auto md:-translate-1/2 md:rounded-[14px] [&>button:last-child]:hidden md:data-open:animate-[animation-in-2_0.5s_ease-in-out] md:[&:not([data-open])]:animate-[animation-out-2_0.1s_ease-in-out]">
                <DialogHeader className="pb-4 h-fit px-4 ">
                    <DialogTitle className="font-geist text-foreground text-base font-medium">
                        Dodaj nowy produkt
                    </DialogTitle>
                </DialogHeader>

                <AddProductStepper
                    setOpenDialog={setOpen}
                    producents={producents}
                    categories={categories}
                    features={features}
                    currencies={currencies}
                />
            </DialogContent>
        </Dialog>
    )
}
