import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import ProductFieldInput from "./ProductFieldInput"

type ProductToggleGroupProps = {
    form: any
    name: any
    label: string
    items: { label: string, value: number | string }[]
    groupName: string
    schema: any
}

export default function ProductToggleGroup({
    form,
    name,
    label,
    items,
    groupName,
    schema
}: ProductToggleGroupProps) {

    return (
        <ProductFieldInput
            form={form}
            name={name}
            label={label}
            groupName={groupName}
            schema={schema}
        >
            {(props) => {
                const selectedValues = Array.isArray(props.value)
                    ? props.value.map((v: any) => String(v))
                    : []
                return (
                    <ToggleGroup
                        multiple
                        value={selectedValues}
                        onValueChange={(values: string[]) => {
                            const parsed = values.map((v) =>
                                isNaN(Number(v)) ? v : Number(v),
                            )
                            props.onChange(parsed)
                        }}
                        className="flex-wrap"
                        size="sm"
                        variant="outline"
                    >
                        {
                            items.map(({ label, value }) => (
                                <ToggleGroupItem className="text-muted-foreground rounded-[26px] data-pressed:text-foreground" key={value} value={`${value}`} aria-label={label}>
                                    {label}
                                </ToggleGroupItem>
                            ))
                        }
                    </ToggleGroup>
                )

            }}
        </ProductFieldInput>
    )
}