import { step1Schema } from "@/lib/schema"
import ProductInput from "../../ui/ProductInput"
import ProductSelect from "../../ui/ProductSelect"
import ProductTextarea from "../../ui/ProductTextarea"
import ProductToggleGroup from "../../ui/ProductToggleGroup"
import type { OptionType } from "@/types/product"

type FirstStepProps = {
    form: any
    producents: OptionType[]
    categories: OptionType[]
    features: OptionType[]
    submitStepRef: React.MutableRefObject<(() => void) | null>
    setStep: (step: number)=>void
}

export default function FirstStep({
    form,
    producents,
    categories,
    features,
    submitStepRef,
    setStep
}: FirstStepProps) {
    return (
        <form.FormGroup
            name="step1"
            validators={{
                onDynamic: step1Schema
            }}
            onGroupSubmit={() => {
                setStep(2)
            }}
            children={(group: any) => {

                submitStepRef.current = group.handleSubmit

                return (
                    < form >
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-4 md:flex-row">
                                <ProductInput
                                    form={form}
                                    label="Nazwa produktu"
                                    name="name"
                                    placeholder="np. MacBook Pro 14"
                                    groupName="step1"
                                    schema={step1Schema}
                                />
                                <ProductInput
                                    form={form}
                                    label="SKU produktu"
                                    name="sku"
                                    placeholder="np. MBP14M3PRO"
                                    groupName="step1"
                                    schema={step1Schema}
                                />
                            </div>
                            <ProductTextarea
                                form={form}
                                label="Opis produktu"
                                name="description"
                                placeholder="Krótki opis produktu"
                                groupName="step1"
                                schema={step1Schema}
                            />
                            <div className="flex flex-col gap-4 md:flex-row">
                                <ProductSelect
                                    form={form}
                                    items={producents.map(({ id, name }) => ({
                                        label: name,
                                        value: id,
                                    }))}
                                    placeholder="Wybierz producenta"
                                    name="producent"
                                    label="Producent"
                                    groupName="step1"
                                    schema={step1Schema}
                                />
                                <ProductSelect
                                    form={form}
                                    items={categories.map(({ id, name }) => ({
                                        label: name,
                                        value: id,
                                    }))}
                                    placeholder="Wybierz kategorię"
                                    name="category"
                                    label="Kategoria"
                                    groupName="step1"
                                    schema={step1Schema}
                                />
                            </div>
                            <ProductToggleGroup
                                form={form}
                                label="Cechy produktu"
                                name="features"
                                items={features.map(({ id, name }) => ({
                                    label: name,
                                    value: id,
                                }))}
                                groupName="step1"
                                schema={step1Schema}
                            />
                        </div>
                    </form >
                )
            }}
        />
    )
}