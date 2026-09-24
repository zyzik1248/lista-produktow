import { Switch } from "@/components/ui/switch"
import ProductFieldInput from "./ProductFieldInput"

type ProductSwitchProps = {
    form: any
    name: any
    label: string
    groupName: string
    schema: any
}

export default function ProductSwitch({
    form,
    name,
    groupName,
    schema,
    label
}: ProductSwitchProps) {
    return (
        <ProductFieldInput
            form={form}
            name={name}
            groupName={groupName}
            schema={schema}
            orientation="horizontal"
            label={label}
        >
            {(props) => (
                <Switch
                    {...props}
                    checked={props.value ?? false}
                    className="aria-checked:bg-[#2563EB]"
                    style={{ boxShadow: "none" }}
                    onCheckedChange={(checked) => props.onChange(checked)} />
            )}
        </ProductFieldInput>
    )
}