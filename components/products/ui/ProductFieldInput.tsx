import { Field, FieldError, FieldLabel } from "@/components/ui/field"

type ProductFieldInputProps = {
    form: any
    name: any
    label: string
    groupName: string
    placeholder?: string
    schema: any
    suffix?: string
    type?: "number" | "text"
    onChange?: (value: any) => void
    orientation?: "horizontal" | "vertical"
    children: (props: {
        value: any
        onChange: (value: any) => void
        onBlur: () => void
        name: string
        id: string
        placeholder: string
        "aria-invalid": boolean
        "aria-describedby": string | undefined
        type?: "number" | "text"
    }) => React.ReactNode
}

export default function ProductFieldInput({
    form,
    name,
    label,
    placeholder,
    children,
    groupName,
    schema,
    onChange,
    suffix,
    type = "text",
    orientation = "vertical"
}: ProductFieldInputProps) {
    const fieldName = `${groupName}.${name}`

    function validateField(
        schema: { safeParse: (v: unknown) => any },
        value: unknown,
    ): string | undefined {
        const result =
            ((schema as any)._def as any).type === "object"
                ? schema.safeParse({
                    ...form.getFieldValue(groupName),
                    [name]: value,
                })
                : schema.safeParse(value)


        if (result.success) return undefined

        return result.error.issues[0]?.message
    }

    function showErrors(value: string) {
        const error = validateField(schema.shape[name], value)

        if (!error) {
            form.setFieldMeta(fieldName, (prev: any) => ({
                ...prev,
                errorMap: {},
                errorSourceMap: {},
                errors: [],
            }))
        }

        return error
    }

    return (
        <form.Field
            name={fieldName}
            validators={{
                onChange: ({ value }: { value: string }) => showErrors(value),
                onBlur: ({ value }: { value: string }) => showErrors(value),
            }}
            children={(field: any) => {
                const hasError = field.state.meta.errors.length > 0
                const errorMessage = field.state.meta.errors[0]

                return (
                    <Field className="gap-0 data-[orientation=horizontal]:flex-row-reverse data-[orientation=horizontal]:items-center data-[orientation=horizontal]:justify-end" data-invalid={hasError} orientation={orientation}>
                        <FieldLabel
                            className={`mb-[0.5rem] w-fit block text-sm font-medium ${orientation == "horizontal" ? "mb-0 pl-[0.5rem] leading-[1]" : ""}`}
                            htmlFor={field.name}
                        >
                            {label}
                        </FieldLabel>

                        {children({
                            value: suffix
                                ? `${field.state.value ?? ""}${suffix}`
                                : field.state.value,

                            onChange: (value) => {
                                const stringValue = String(value)

                                const cleanValue = suffix
                                    ? stringValue.replace(suffix, "")
                                    : value

                                field.handleChange(cleanValue)
                                onChange?.(cleanValue)

                                if (suffix) {
                                    requestAnimationFrame(() => {
                                        const input = document.getElementById(field.name) as HTMLInputElement | null

                                        if (!input) return

                                        const position = input.value.length - suffix.length

                                        input.setSelectionRange(position, position)
                                    })
                                }
                            },
                            type,
                            onBlur: field.handleBlur,
                            id: field.name,
                            name: field.name,
                            placeholder: placeholder ?? "",
                            "aria-invalid": hasError,
                            "aria-describedby": hasError
                                ? `${field.name}-error`
                                : undefined,
                        })}

                        {hasError && (
                            <FieldError
                                className="text-xs pt-[0.3rem]"
                                id={`${field.name}-error`}
                            >
                                {typeof errorMessage === "string"
                                    ? errorMessage
                                    : errorMessage?.message ??
                                    JSON.stringify(errorMessage)}
                            </FieldError>
                        )}
                    </Field>
                )
            }}
        />
    )
}