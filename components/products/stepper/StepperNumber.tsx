import { TabsTrigger } from "@/components/ui/tabs";

type StepperNumberProps = {
    step: number
    title: string
    subtitle: string
    currentStep: number
    disabled?: boolean
    totalSteps: number
}

export default function StepperNumber({ step, title, subtitle, currentStep, disabled, totalSteps }: StepperNumberProps) {
    return (
        <TabsTrigger
            disabled={disabled}
            value={`step-${step}`}
            className="disabled:[&_button]:opacity-100! opacity-100! p-0 flex-1 bg-transparent! flex-col justify-between items-start gap-0 h-fit border-none shadow-none!">
            <div className="md:flex gap-3 w-full items-center">
                <div aria-disabled className="w-8 h-8 bg-accent border border-border rounded-full mb-3 relative">
                    <p className="text-muted-foreground text-sm font-semibold absolute top-1/2 left-1/2 -translate-1/2">{step}</p>
                </div>
                <div>
                    <p style={{ color: `${step <= currentStep ? "oklch(0.145 0 0)" : "oklch(0.556 0 0)"}` }} className="transition-colors duration-200 ease-in-out text-sm text-left">{title}</p>
                    <p className="text-muted-foreground text-xs text-left">{subtitle}</p>
                </div>
                {
                    totalSteps > step &&
                    <div className="flex-1 h-px bg-[#E4E4E4] max-w-16.75 ml-xs mr-4 hidden md:block"></div>
                }
            </div>
        </TabsTrigger>
    )
}