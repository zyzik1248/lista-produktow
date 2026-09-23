'use client'

import { useRef, useState } from "react";
import Stepper from "./Stepper";
import { revalidateLogic, useForm } from "@tanstack/react-form";
import FirstStep from "./steps/FirstStep";
import { schema } from "@/lib/schema";
import { OptionType } from "@/types/product";
import { DialogFooter } from "@/components/ui/dialog";
import StepperButtons from "./StepperButtons";
import { StepItems } from "@/types/stepper";
import SecondStep from "./steps/SecondStep";

type AddProductStepperProps = {
    producents: OptionType[]
    categories: OptionType[]
    features: OptionType[]
    currencies: OptionType[]
}

export default function AddProductStepper({ producents, categories, features, currencies }: AddProductStepperProps) {
    const [step, setStep] = useState(1)
    const submitStepRef = useRef<Record<number, () => void>>({})

    const form = useForm({
        defaultValues: {
            step1: {
                name: "",
                sku: "",
                description: "",
                producent: 0,
                category: 0,
                features: [] as number[],
            },
            step2: {
                priceNet: null as string | null,
                priceGross: null as string | null,
                vat: "23",
                currency: 1
            }
        },
        validationLogic: revalidateLogic(),
        validators: {
            onDynamic: schema,
        },
        listeners: {
            onChange: ({ formApi }) => {
                const values = formApi.state.values

                const stepName = `step${step}` as keyof typeof schema.shape
                const stepSchema = schema.shape[stepName]

                const result = stepSchema.safeParse(values[stepName])

                const stepIndex = step - 1

                if (result.success) {
                    steps[stepIndex].isDone = true
                    setSteps([...steps])
                } else if (steps[stepIndex].isDone) {
                    steps[stepIndex].isDone = false
                    setSteps([...steps])
                }
            },
        },

    })

    const stepsList: StepItems[] = [
        {
            title: "Informacje",
            subtitle: "Dane podstawowe",
            item:
                <FirstStep
                    setStep={setStep}
                    producents={producents}
                    categories={categories}
                    features={features}
                    submitStepRef={submitStepRef}
                    form={form}
                />,
        },
        {
            title: "Cena",
            subtitle: "Dane cenowe",
            item:
                <SecondStep
                    setStep={setStep}
                    currencies={currencies}
                    submitStepRef={submitStepRef}
                    form={form}
                />,
        },
        {
            title: "Dostępność",
            subtitle: "Stany magazynowe",
            item: <>sdd vdsdd</>
        }
    ]

    const [steps, setSteps] = useState([...stepsList])

    const handleChangeStep = async (newStep: number) => {
        if (newStep > step) {
            await submitStepRef.current[step]?.()
        } else {
            setStep(newStep)
        }
    }

    return (
        <>
            <div className="px-4 flex-1 md:flex-none">
                <Stepper setStep={setStep} step={step} steps={steps} />
            </div>
            <DialogFooter className="p-0 m-0">
                <StepperButtons setStep={handleChangeStep} step={step} steps={steps} submitLabel="Zapisz Produkt" onSubmit={() => { }} />
            </DialogFooter>
        </>
    )
}