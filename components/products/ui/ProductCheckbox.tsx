import { Switch } from "@/components/ui/switch"
import ProductFieldInput from "./ProductFieldInput"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

type ProductCheckboxProps = {
    form: any
    name: any
    label: string
    groupName: string
    schema: any
    onChange?: (value: any) => void
}

export default function ProductCheckbox({
    form,
    name,
    groupName,
    schema,
    label,
    onChange
}: ProductCheckboxProps) {
    return (
        <ProductFieldInput
            form={form}
            name={name}
            groupName={groupName}
            schema={schema}
            orientation="horizontal"
            label={label}
            onChange={onChange}
        >
            {(props) => (
                <Checkbox
                    {...props}
                    checked={props.value ?? false}
                    className="aria-checked:bg-[#2563EB]"
                    style={{ boxShadow: "none" }}
                    onCheckedChange={(checked) => props.onChange(checked)} />
            )}
        </ProductFieldInput>
    )
}