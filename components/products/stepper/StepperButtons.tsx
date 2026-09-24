import { Button } from "@/components/ui/button"
import { StepperProps } from "@/types/stepper"
import Image from "next/image"

type StepperButtonsProps = StepperProps & {
    onSubmit: () => void
    submitLabel: string
}

export default function StepperButtons({ step, setStep, steps, onSubmit, submitLabel }: StepperButtonsProps) {
    const nextStep = () => {
        setStep(step + 1)
    }

    const prevStep = () => {
        setStep(step - 1)
    }

    return (
        <div className="p-4 bg-muted/50 rounded-0  w-full">
            <div className="relative flex justify-between flex-row">
                <Button
                    onClick={prevStep}
                    style={{
                        visibility: step > 1 ? "visible" : "hidden",
                        opacity: step > 1 ? 1 : 0
                    }}
                    className="transition-all duration-300 ease-in-out text-sm px-4 cursor-pointer flex gap-1.5 py-[0.5rem] text-foreground bg-transparent hover:bg-transparent rounded-[50px] border border-border w-fit">
                    <Image src="/arrowLeft.png" alt="plus" width={16} height={16} /> Wstecz
                </Button>
                <Button
                    type="button"
                    onClick={nextStep}
                    style={{
                        visibility: step < steps.length ? "visible" : "hidden",
                        opacity: step < steps.length ? 1 : 0,
                        transitionDelay: step < steps.length ? "0ms" : "300ms"
                    }}
                    className="transition-all duration-300 ease-in-out flex gap-1.5 text-sm px-4 cursor-pointer py-[0.5rem] text-primary-foreground bg-[#2563EB] border-0 rounded-[50px] hover:bg-[#2563EB] w-fit">
                    Dalej <Image src="/arrowRight.png" alt="plus" width={16} height={16} />
                </Button>
                <Button
                    onClick={onSubmit}
                    style={{
                        visibility: step == steps.length ? "visible" : "hidden",
                        opacity: step == steps.length ? 1 : 0,
                    }}
                    className="absolute right-0 top-0 transition-all duration-300 ease-in-out text-sm px-4 cursor-pointer py-[0.5rem] text-primary-foreground bg-[#2563EB] border-0 rounded-[50px] hover:bg-[#2563EB] w-fit">
                    {submitLabel}
                </Button>
            </div>
        </div>
    )
}
