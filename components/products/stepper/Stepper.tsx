import { Tabs, TabsList } from "@/components/ui/tabs";
import StepperNumber from "./StepperNumber";
import StepperLine from "./StepperLine";
import { StepperProps } from "@/types/stepper";

export default function Stepper({ step, setStep, steps }: StepperProps) {
    const onValueChange = (value: string) => {
        setStep(Number(value.replace("step-", "")))
    }

    return (
        <Tabs value={`step-${step}`} onValueChange={onValueChange} className="h-auto overflow-hidden relative gap-4 pb-6 flex-1">
            <TabsList className="bg-transparent flex justify-between h-auto! px-0 py-6 border-border border-t border-b w-full">
                {
                    steps.map(({ title, subtitle }, id) => (
                        <StepperNumber totalSteps={steps.length} disabled={!steps[id].isDone && !(id > 0 && steps[id - 1].isDone)} currentStep={step} key={id} step={id + 1} title={title ?? ""} subtitle={subtitle ?? ""} />
                    ))
                }
            </TabsList>
            <div
                style={{
                    clipPath: `inset(0 calc(${100 - ((step - 1) / steps.length) * 100}% - 2rem) 0 0)`
                }}
                className="pointer-events-none flex justify-between h-auto! px-0 py-6 w-full absolute transition-[clip-path] duration-200 ease-in-out md:duration-250"
            >
                {
                    steps.map(({title, subtitle, isDone}, id) => (
                        <StepperLine totalSteps={steps.length} isDone={isDone} key={id} step={id+1} subtitle={subtitle ?? ""} title={title ?? ""}/>
                    ))
                }
            </div>
            <div className={`flex transition ease-in-out duration-500`} style={{ width: `${steps.length}00%`, transform: `translateX(${-(step - 1) / steps.length * 100}%)` }}>
                {
                    steps.map(({ item }, id) => (
                        <div key={id} className="flex-1 md:px-4">
                            {item}
                        </div>
                    ))
                }
            </div>
        </Tabs>
    )
}