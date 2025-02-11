const API_BASE_URL = "http://lifestealer86.ru/api-shop/";

export async function getProducts() {
    try {
        const response = await fetch(`${API_BASE_URL}products`);
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Ошибка при загрузке товаров:", error);
        return null;
    }
}