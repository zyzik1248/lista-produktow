import { CartQuantity, step3Schema } from "@/lib/schema"
import ProductInput from "../../ui/ProductInput"
import { RefObject } from "react"
import ProductSwitch from "../../ui/ProductSwitch"
import ProductCheckbox from "../../ui/ProductCheckbox"
import { PostProduct } from "@/lib/api/products"
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";

type SecondStepProps = {
    form: any
    submitStepRef: RefObject<Record<number, () => void>>
    dialogClear: () => void
}

export default function ThirdStep({
    form,
    submitStepRef,
    dialogClear
}: SecondStepProps) {
    const router = useRouter();

    return (
        <form.FormGroup
            name="step3"
            validators={{
                onDynamic: step3Schema,
                onChange: CartQuantity,
            }}
            onGroupSubmit={async () => {
                try {
                    const values = form.state.values

                    const product = {
                        ...values.step1,
                        price: Object.fromEntries(
                            Object.entries(values.step2).map(([key, value]) => [
                                key,
                                Number(value)
                            ])
                        ),
                        availability: {
                            ...values.step3,
                            maxCartQuantity: Number(values.step3.maxCartQuantity),
                            minCartQuantity: Number(values.step3.minCartQuantity),
                            stack: values.step3.stack === ""
                                ? null
                                : Number(values.step3.stack)
                        }
                    }

                    await PostProduct({ product })
                    form.reset()
                    dialogClear()
                    router.refresh();
                    toast.add({
                        title: "Produkt został dodany",
                        type: "success",
                    })

                } catch (error) {
                    throw Error(`${error}`)
                }


            }}
            children={(group: any) => {

                submitStepRef.current[3] = group.handleSubmit

                return (
                    <form >
                        <div className="flex flex-col gap-4">
                            <ProductSwitch
                                form={form}
                                label="Produkt jest dostępny"
                                name="isAvailable"
                                groupName="step3"
                                schema={step3Schema}
                            />
                            <div className="py-4 border-t border-b border-border">
                                <ProductCheckbox
                                    form={form}
                                    label="Produkt limitowany"
                                    name="isLimited"
                                    groupName="step3"
                                    schema={step3Schema}
                                    onChange={(value) => {
                                        if (value) {

                                        }
                                    }}
                                />
                            </div>
                            <form.Subscribe
                                selector={(state: any) => state.values.step3.isLimited}
                            >
                                {(isLimited: boolean) => (
                                    <div className="md:w-1/2 overflow-hidden" style={{ maxHeight: isLimited ? 60 : 0 }}>
                                        <ProductInput
                                            form={form}
                                            label="Ilość na magazymie"
                                            name="stack"
                                            placeholder="0"
                                            groupName="step3"
                                            schema={step3Schema}
                                            type="number"
                                        />
                                    </div>
                                )}

                            </form.Subscribe>
                            <div>
                                <p className="text-base font-medium pb-4">Limity koszyka</p>
                                <div className="flex flex-col gap-4 md:flex-row">
                                    <ProductInput
                                        form={form}
                                        label="Maksymalna ilość"
                                        name="maxCartQuantity"
                                        placeholder="0"
                                        groupName="step3"
                                        schema={step3Schema}
                                        type="number"
                                    />
                                    <ProductInput
                                        form={form}
                                        label="Minimalna ilość"
                                        name="minCartQuantity"
                                        placeholder="0"
                                        groupName="step3"
                                        schema={step3Schema}
                                        type="number"
                                    />
                                </div>
                            </div>
                        </div>
                    </form >
                )
            }}
        />
    )
}