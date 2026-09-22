import Image from "next/image";

type StepperLineProps = {
    step: number
    title: string
    subtitle: string
    isDone?: boolean
    totalSteps: number
}

export default function StepperLine({ step, title, subtitle, isDone, totalSteps }: StepperLineProps) {
    return (
        <div className="p-0 flex-1 bg-transparent! flex-col justify-between items-start gap-0 h-fit border-none shadow-none!">
            <div className="md:flex gap-3 w-full items-center">
                <div className="w-8 h-8 bg-[#2563EB] rounded-full mb-3 relative">
                    <p style={{ scale: isDone ? 0 : 1 }} className="transition duration-300 ease-in-out text-white text-sm font-semibold absolute top-1/2 left-1/2 -translate-1/2">{step}</p>
                    <Image style={{ scale: isDone ? 1 : 0 }} src="/check.png" alt="check" width={16} height={16} className="transition duration-300 ease-in-out absolute top-1/2 left-1/2 -translate-1/2" />
                </div>
                <div className="opacity-0">
                    <p className="text-sm text-foreground text-left">{title}</p>
                    <p className="text-muted-foreground text-xs text-left">{subtitle}</p>
                </div>
                {
                    totalSteps > step &&
                    <div className="flex-1 h-px bg-[#2563EB] max-w-16.75 ml-xs mr-4 hidden md:block"></div>
                }
            </div>
        </div>
    )
}