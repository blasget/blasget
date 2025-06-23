async function makeApiRequest(method: string, endpoint: string, data?: any) {
    try {
        const requestOptions = {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        const response = await fetch(`/api/${endpoint}`, requestOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error: any) {
        console.error(`Fetch error: ${error?.response}`);
        return { error: error };
    }
}

export async function getIngredients() {
    return makeApiRequest("GET", `ingredients`);
}