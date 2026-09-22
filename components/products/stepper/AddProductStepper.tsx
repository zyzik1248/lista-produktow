'use client'

import { useState } from "react";
import Stepper from "./Stepper";

export default function AddProductStepper() {
    const stepsList = [
        {
            title: "Informacje",
            subtitle: "Dane podstawowe",
            item: <>sddd</>,
            isDone: true
        },
        {
            title: "Cena",
            subtitle: "Dane cenowe",
            item: <>sd vsdvs fvdsdd</>
        },
        {
            title: "Dostępność",
            subtitle: "Stany magazynowe",
            item: <>sdd vdsdd</>
        }
    ]

    const [step, setStep] = useState(1)
    const [steps, setSteps] = useState([...stepsList])

    return (
        <Stepper setStep={setStep} step={step} steps={steps} />
    )
}