import { toast } from "@/components/ui/toast";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export type FetchType = {
    url: string;
    params?: Record<string, string | number>;
    headers?: HeadersInit;
    options?: {
        method?: RequestInit["method"];
        body?: object;
    };
};

export async function fetcher<T>({
    url,
    params,
    headers,
    options,
}: FetchType): Promise<T> {
    try {
        const searchParams = new URLSearchParams();

        Object.entries(params ?? {}).forEach(([key, value]) => {
            searchParams.set(key, String(value));
        });

        const response = await fetch(
            `${apiUrl}${url}${searchParams.toString() ? `?${searchParams}` : ""}`,
            {
                method: options?.method,
                headers: {
                    "Content-Type": "application/json",
                    ...headers,
                },
                body: options?.body
                    ? JSON.stringify(options.body)
                    : undefined,
                cache: "no-store",
            }
        );

        if (!response.ok) {
            toast.add({
                title: "Coś poszło nie tak",
                type: "error",
            })
            throw new Error(`${response}`);
        }

        return response.json();
    } catch (error) {
        throw new Error(`${error}`);

    }

}