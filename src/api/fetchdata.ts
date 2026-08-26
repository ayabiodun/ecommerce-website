import type { Products, ProductsShape } from "../types";

const endPoint = "https://dummyjson.com/products"

export async function getProducts(URL: string = endPoint): Promise<Products[]>{

    try {
        const response = await fetch(URL);
        if(!response.ok) return [];

        const result: ProductsShape = await response.json();
        return result.products;
    
    } catch (error) {
        console.error(error);
        return [];
    }
}
