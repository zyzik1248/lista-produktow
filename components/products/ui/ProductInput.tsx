import { Input } from "@/components/ui/input"
import ProductFieldInput from "./ProductFieldInput"

type ProductInputProps = {
    form: any
    name: any;
    label: string
    placeholder: string
    groupName: string
    schema: any
    suffix?: string
    onChange?: (value: any) => void
}

export default function ProductInput({ form, name, label, placeholder, groupName, schema, onChange, suffix }: ProductInputProps) {
    return (
        <ProductFieldInput
            schema={schema}
            form={form}
            name={name}
            label={label}
            placeholder={placeholder}
            groupName={groupName}
            onChange={onChange}
            suffix={suffix}
        >
            {(props) => (
                <Input
                    {...props}
                    value={props.value ?? ""}
                    className="rounded-[50px] px-3 py-[0.125rem] text-sm text-foreground"
                    style={{ boxShadow: "none" }}
                    onChange={(e) => props.onChange(e.target.value)}
                />
            )}
        </ProductFieldInput>
    )
}
