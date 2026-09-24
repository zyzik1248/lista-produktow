import { CartQuantity, step3Schema } from "@/lib/schema"
import ProductInput from "../../ui/ProductInput"
import ProductSelect from "../../ui/ProductSelect"
import type { OptionType } from "@/types/product"
import { RefObject } from "react"
import ProductSwitch from "../../ui/ProductSwitch"
import ProductCheckbox from "../../ui/ProductCheckbox"

type SecondStepProps = {
    form: any
    submitStepRef: RefObject<Record<number, () => void>>
}

export default function ThirdStep({
    form,
    submitStepRef,
}: SecondStepProps) {
    return (
        <form.FormGroup
            name="step3"
            validators={{
                onDynamic: step3Schema,
                onChange: CartQuantity,
            }}
            onGroupSubmit={() => {
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
                                    <div className="md:w-1/2 overflow-hidden" style={{maxHeight: isLimited ? 60 : 0}}>
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