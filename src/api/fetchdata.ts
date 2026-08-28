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


export async function getOneProduct(id: string): Promise<Products | null>{

    try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if(!response.ok) return null;

        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }

}

export async function searchProducts(query: string): Promise<Products[]> {
  try {
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${query}`
    );

    if (!response.ok) return [];

    const result: ProductsShape = await response.json();

    return result.products;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const response = await fetch(
      "https://dummyjson.com/products/category-list"
    );

    if (!response.ok) return [];

    const result: string[] = await response.json();

    return result;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function sortProducts(
  sortBy: string,
  order: string
): Promise<Products[]> {
  try {
    const response = await fetch(
      `https://dummyjson.com/products?sortBy=${sortBy}&order=${order}`
    );

    if (!response.ok) return [];

    const result: ProductsShape = await response.json();

    return result.products;
  } catch (error) {
    console.error(error);
    return [];
  }
}