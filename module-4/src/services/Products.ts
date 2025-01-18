
const api = import.meta.env.VITE_API_URL;

export const getProducts = async () => {
    try {
        const response = await fetch(`${api}/products`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const result = response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

export const getProductsById = async (productId?: string) => {
    try {
        const response = await fetch(`${api}/products/${productId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const result = response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}