export interface Products {
    id: number,
    description: string,
    title: string,
    thumbnail: string,
    category: string,
    price: number,
    rating: string,
    stock: string,
}

export interface ProductsShape{
    products: Products[],
    total: string,
    skip: string,
    limit: string
}

export interface CartItem{
    id: number,
    title: string,
    price: number,
    quantity: number
}