import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { step1Schema } from "@/lib/schema"

type ProductFieldInputProps = {
    form: any
    name: keyof typeof step1Schema.shape;
    label: string
    placeholder?: string
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

export default function ProductFieldInput({ form, name, label, placeholder, children }: ProductFieldInputProps) {
    function validateField(
        schema: { safeParse: (v: unknown) => any },
        value: unknown,
    ): string | undefined {
        const result = schema.safeParse(value);
        if (result.success) return undefined;
        return result.error.issues[0]?.message;
    }

    function showErrors(value: string) {
        const error = validateField(step1Schema.shape[name], value)
        if (!error) {
            form.setFieldMeta(name, (prev: any) => ({
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
            name={name}
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
                            <FieldError id={`${field.name}-error`}>
                                {errorMessage}
                            </FieldError>
                        )}
                    </Field>
                );
            }}
        />
    )
}
