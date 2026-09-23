import { Textarea } from "@/components/ui/textarea"
import { step1Schema } from "@/lib/schema"
import ProductFieldInput from "./ProductFieldInput"

type ProductTextareaProps = {
    form: any
    name: keyof typeof step1Schema.shape
    label: string
    placeholder: string
}

export default function ProductTextarea({
    form,
    name,
    label,
    placeholder,
}: ProductTextareaProps) {

    return (
        <ProductFieldInput
            form={form}
            name={name}
            label={label}
            placeholder={placeholder}
        >
            {(props) => (
                <Textarea
                    {...props}
                    className="w-full min-w-0 rounded-[10px] px-3 py-[0.5rem] field-sizing-fixed resize-none break-words whitespace-pre-wrap overflow-y-auto overflow-x-hidden text-sm text-foreground"
                    style={{ boxShadow: "none" }}
                    onChange={(e) => props.onChange(e.target.value)}
                />
            )}
        </ProductFieldInput>
    )
}