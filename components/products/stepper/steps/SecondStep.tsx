import { step1Schema, step2Schema } from "@/lib/schema"
import ProductInput from "../../ui/ProductInput"
import ProductSelect from "../../ui/ProductSelect"
import type { OptionType } from "@/types/product"
import { RefObject } from "react"

type SecondStepProps = {
    form: any
    currencies: OptionType[]
    submitStepRef: RefObject<Record<number, () => void>>
    setStep: (step: number) => void
}

export default function SecondStep({
    form,
    currencies,
    submitStepRef,
    setStep
}: SecondStepProps) {
    return (
        <form.FormGroup
            name="step1"
            validators={{
                onDynamic: step1Schema
            }}
            onGroupSubmit={() => {
                setStep(3)
            }}
            children={(group: any) => {

                submitStepRef.current[2] = group.handleSubmit

                return (
                    <form >
                        <form.Subscribe
                            selector={(state: any) => state.values.step2}
                        >
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-4 md:flex-row">
                                    <ProductInput
                                        form={form}
                                        label="Cena netto"
                                        name="priceNet"
                                        placeholder="0.0"
                                        groupName="step2"
                                        schema={step2Schema}
                                        onChange={(e) => {
                                            const value = String(e).replace(/[^0-9.]/g, "")

                                            if (value === "") {
                                                form.setFieldValue("step2.priceGross", null)
                                                form.setFieldValue("step2.priceNet", null)
                                                return
                                            }

                                            const net = Number(value)
                                            const vat = Number(form.getFieldValue("step2.vat"))

                                            form.setFieldValue(
                                                "step2.priceGross",
                                                String(
                                                    Math.round((net * (1 + vat / 100)) * 100) / 100
                                                )
                                            )
                                        }}
                                    />
                                    <ProductInput
                                        form={form}
                                        label="Cena brutto"
                                        name="priceGross"
                                        placeholder="0.0"
                                        groupName="step2"
                                        schema={step2Schema}
                                        onChange={(e) => {
                                            const value = String(e).replace(/[^0-9.]/g, "")

                                            if (value === "") {
                                                form.setFieldValue("step2.priceGross", null)
                                                form.setFieldValue("step2.priceNet", null)
                                                return
                                            }

                                            const gross = Number(value)
                                            const vat = Number(form.getFieldValue("step2.vat"))

                                            form.setFieldValue(
                                                "step2.priceNet",
                                                String(
                                                    Math.round((gross / (1 + vat / 100)) * 100) / 100
                                                )
                                            )
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col gap-4 md:flex-row">
                                    <ProductInput
                                        form={form}
                                        label="Stawka VAT"
                                        name="vat"
                                        placeholder="23%"
                                        groupName="step2"
                                        schema={step2Schema}
                                        suffix="%"
                                        onChange={(e) => {
                                            const value = String(e).replace(/[^0-9.]/g, "")

                                            const vat = Number(value)
                                            const net = Number(form.getFieldValue("step2.priceNet"))

                                            form.setFieldValue(
                                                "step2.priceGross",
                                                String(net * (1 + vat / 100))
                                            )
                                        }}
                                    />
                                    <ProductSelect
                                        form={form}
                                        label="Waluta"
                                        name="currency"
                                        placeholder="PLN"
                                        groupName="step2"
                                        schema={step2Schema}
                                        items={currencies.map(({ id, name }) => ({ label: name, value: id }))}
                                    />
                                </div>
                            </div>
                        </form.Subscribe>
                    </form >
                )
            }}
        />
    )
}