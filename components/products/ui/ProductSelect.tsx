import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { step1Schema } from "@/lib/schema"
import ProductFieldInput from "./ProductFieldInput"

type ProductSelectProps = {
    form: any
    name: keyof typeof step1Schema.shape
    label: string
    placeholder: string
    items: { label: string; value: string | number }[]
    groupName: string
    schema: any
}

export default function ProductSelect({
    form,
    name,
    label,
    placeholder,
    items,
    groupName,
    schema
}: ProductSelectProps) {
    const selectItems = [{ label: placeholder, value: null }, ...items]

    return (
        <ProductFieldInput
            groupName={groupName}
            form={form}
            name={name}
            label={label}
            placeholder={placeholder}
            schema={schema}
        >
            {(props) => (
                <Select items={selectItems}
                    value={props.value == 0 ? null : props.value}
                    onValueChange={(v) => props.onChange(v === null ? 0 : Number(v))}
                >
                    <SelectTrigger aria-invalid={props["aria-invalid"]} className="rounded-[50px] px-3 py-[0.125rem] text-sm" style={{ boxShadow: "none" }}>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup className="p-3">
                            {selectItems.map((item) => (
                                <SelectItem className="p-3 py-[0.5rem]" key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

            )}
        </ProductFieldInput>
    )
}