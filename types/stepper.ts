export type StepperProps = {
    step: number,
    setStep: (step: number) => void
    steps: StepItems[]
}

export type StepItems = {
    title?: string
    subtitle?: string
    isDone?: boolean
    item: React.ReactNode
}