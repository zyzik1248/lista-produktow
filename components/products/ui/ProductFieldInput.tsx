import { Field, FieldError, FieldLabel } from "@/components/ui/field"

type ProductFieldInputProps = {
    form: any
    name: any;
    label: string
    groupName: string
    placeholder?: string
    schema: any
    children: (props: {
        value: any
        onChange: (value: any) => void
        onBlur: () => void
        name: string
        id: string
        placeholder: string
        "aria-invalid": boolean
        "aria-describedby": string | undefined
    }) => React.ReactNode
}

export default function ProductFieldInput({ form, name, label, placeholder, children, groupName, schema }: ProductFieldInputProps) {
    const fieldName = `${groupName}.${name}`

    function validateField(
        schema: { safeParse: (v: unknown) => any },
        value: unknown,
    ): string | undefined {
        const result = schema.safeParse(value);
        if (result.success) return undefined;
        return result.error.issues[0]?.message;
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
                const hasError = field.state.meta.errors.length > 0;
                const errorMessage = field.state.meta.errors[0];

                return (
                    <Field className="gap-0" data-invalid={hasError}>
                        <FieldLabel
                            className="mb-[0.5rem] block text-sm font-medium"
                            htmlFor={field.name}
                        >
                            {label}
                        </FieldLabel>

                        {children({
                            value: field.state.value,
                            onChange: field.handleChange,
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
                            <FieldError className="text-xs pt-[0.3rem]" id={`${field.name}-error`}>
                                {typeof errorMessage === "string"
                                    ? errorMessage
                                    : errorMessage?.message ?? JSON.stringify(errorMessage)}
                            </FieldError>
                        )}
                    </Field>
                );
            }}
        />
    )
}
