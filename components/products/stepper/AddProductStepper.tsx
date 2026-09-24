'use client'

import { useRef, useState } from "react";
import Stepper from "./Stepper";
import { revalidateLogic, useForm } from "@tanstack/react-form";
import FirstStep from "./steps/FirstStep";
import { schema } from "@/lib/schema";
import { OptionType } from "@/types/product";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import StepperButtons from "./StepperButtons";
import { StepItems } from "@/types/stepper";
import SecondStep from "./steps/SecondStep";
import ThirdStep from "./steps/ThirdStep";

type AddProductStepperProps = {
    producents: OptionType[]
    categories: OptionType[]
    features: OptionType[]
    currencies: OptionType[]
    setOpenDialog: (open: boolean) => void
}

export default function AddProductStepper({
    producents,
    categories,
    features,
    currencies,
    setOpenDialog
}: AddProductStepperProps) {

    const [step, setStep] = useState(1)
    const [stepsDone, setStepsDone] = useState([false, false, false])

    const submitStepRef = useRef<Record<number, () => void>>({})

    const form = useForm({
        defaultValues: {
            step1: {
                name: "",
                sku: "",
                description: "",
                producer: 0,
                category: 0,
                features: [] as number[],
            },
            step2: {
                priceNet: null as string | null,
                priceGross: null as string | null,
                vat: "23",
                currency: 1
            },
            step3: {
                isAvailable: false,
                isLimited: false,
                minCartQuantity: "1",
                maxCartQuantity: "10",
                stack: "1",
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

                setStepsDone(prev => {
                    const next = [...prev]
                    next[stepIndex] = result.success
                    return next
                })
            },
        },
    })

    const dialogClear = () => {
        setStep(1)
        setStepsDone([false, false, false])
        setOpenDialog(false)
    }

    const stepsList: StepItems[] = [
        {
            title: "Informacje",
            subtitle: "Dane podstawowe",
            item: (
                <FirstStep
                    setStep={setStep}
                    producents={producents}
                    categories={categories}
                    features={features}
                    submitStepRef={submitStepRef}
                    form={form}
                />
            ),
        },
        {
            title: "Cena",
            subtitle: "Dane cenowe",
            item: (
                <SecondStep
                    setStep={setStep}
                    currencies={currencies}
                    submitStepRef={submitStepRef}
                    form={form}
                />
            ),
        },
        {
            title: "Dostępność",
            subtitle: "Stany magazynowe",
            item: (
                <ThirdStep
                    submitStepRef={submitStepRef}
                    form={form}
                    dialogClear={dialogClear}
                />
            )
        }
    ]

    const steps: StepItems[] = stepsList.map((item, index) => ({
        ...item,
        isDone: stepsDone[index],
    }))

    const handleChangeStep = async (newStep: number) => {
        if (newStep > step) {
            await submitStepRef.current[step]?.()
        } else {
            setStep(newStep)
        }
    }

    const onSubmit = async () => {
        try {
            await submitStepRef.current[3]?.()
        } catch (error) {
            console.log("error")
        }
    }

    return (
        <>
            <DialogClose className="absolute right-4 top-6 font-geist text-foreground text-base font-medium" onClick={dialogClear}>
                x
            </DialogClose>

            <div className="px-4 flex-1 md:flex-none">
                <Stepper
                    setStep={setStep}
                    step={step}
                    steps={steps}
                />
            </div>

            <DialogFooter className="p-0 m-0">
                <StepperButtons
                    setStep={handleChangeStep}
                    step={step}
                    steps={steps}
                    submitLabel="Zapisz Produkt"
                    onSubmit={onSubmit}
                />
            </DialogFooter>
        </>
    )
}