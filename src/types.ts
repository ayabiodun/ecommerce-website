export interface Products {
    id: number,
    description: string,
    title: string,
    thumbnail: string,
    category: string,
    price: string,
    rating: string,
    stock: string,
}

export interface ProductsShape{
    products: Products[],
    total: string,
    skip: string,
    limit: string
}