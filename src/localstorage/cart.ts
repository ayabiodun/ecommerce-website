import type { CartItem } from "../types";


let arrCart: CartItem[] = JSON.parse(
  localStorage.getItem("cart") || "[]"
);


function saveCart(): void {
  localStorage.setItem("cart", JSON.stringify(arrCart));
}


export function addToCart(product: CartItem): void {
  const existingProduct = arrCart.find(
    (item) => item.id === product.id
  );


  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    arrCart.push({
      ...product,
      quantity: 1,
    });
  }


  saveCart();
}


export function getCart(): CartItem[] {
  return arrCart;
}


export function increaseQuantity(id: number): void {
  const product = arrCart.find((item) => item.id === id);


  if (product) {
    product.quantity += 1;
    saveCart();
  }
}


export function decreaseQuantity(id: number): void {
  const product = arrCart.find((item) => item.id === id);


  if (!product) return;


  if (product.quantity > 1) {
    product.quantity -= 1;
  } else {
    arrCart = arrCart.filter((item) => item.id !== id);
  }


  saveCart();
}


export function removeFromCart(id: number): void {
  arrCart = arrCart.filter((item) => item.id !== id);
  saveCart();
}

const HST_RATE = 0.13;

export function getSubtotal(): number {
  return arrCart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}

export function getTax(): number {
  return getSubtotal() * HST_RATE;
}

export function getCartTotal(): number {
  return getSubtotal() + getTax();
}