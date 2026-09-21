const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export type FetchType = {
    url: string;
    headers?: HeadersInit;
    options?: {
        method?: RequestInit["method"];
        body?: object;
    };
};

export async function fetcher<T>({
    url,
    headers,
    options,
}: FetchType): Promise<T> {
    try {
        const response = await fetch(`${apiUrl}${url}`, {
            method: options?.method,
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            body: options?.body
                ? JSON.stringify(options.body)
                : undefined,
        });

        if (!response.ok) {
            throw new Error(`${response}`);
        }

        return response.json();
    } catch (error) {
        throw new Error(`${error}`);
    }
}