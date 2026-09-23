import { Input } from "@/components/ui/input"
import { step1Schema } from "@/lib/schema"
import ProductFieldInput from "./ProductFieldInput"

type ProductInputProps = {
    form: any
    name: keyof typeof step1Schema.shape;
    label: string
    placeholder: string
}

export default function ProductInput({ form, name, label, placeholder }: ProductInputProps) {
    return (
        <ProductFieldInput
            form={form}
            name={name}
            label={label}
            placeholder={placeholder}
        >
            {(props) => (
                <Input
                    {...props}
                    className="rounded-[50px] px-3 py-[0.125rem] text-sm text-foreground"
                    style={{ boxShadow: "none" }}
                    onChange={(e) => props.onChange(e.target.value)}
                />
            )}
        </ProductFieldInput>
    )
}
