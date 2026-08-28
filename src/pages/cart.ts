import {
  getCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  getCartTotal,
  getTax,
  getSubtotal,
} from "../localstorage/cart";

import "../style.css";

const backBtn = document.querySelector("#back-btn") as HTMLButtonElement;
const cartItems = document.querySelector("#cart-items") as HTMLDivElement;

const subtotalPrice = document.querySelector(
  "#subtotal-price"
) as HTMLSpanElement;

const taxPrice = document.querySelector(
  "#tax-price"
) as HTMLSpanElement;

const cartTotal = document.querySelector(
  "#cart-total"
) as HTMLSpanElement;

backBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});

function renderCart(): void {
  const cart = getCart();

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
        <h2 class="text-xl font-semibold text-slate-800">
          Your cart is empty 🛒
        </h2>

        <p class="mt-2 text-sm text-slate-500">
          Add some products to your cart and they'll appear here.
        </p>

        <a
          href="index.html"
          class="mt-6 inline-block rounded-xl bg-slate-900 px-5 py-3 text-white hover:bg-slate-700"
        >
          Continue Shopping
        </a>
      </div>
    `;

    subtotalPrice.innerText = "$0.00";
    taxPrice.innerText = "$0.00";
    cartTotal.innerText = "$0.00";
    return;
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
      <article
        class="flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between"
      >
        <div class="flex-1">
          <h2 class="text-lg font-semibold text-slate-900">
            ${item.title}
          </h2>

          <p class="mt-1 text-sm text-slate-500">
            $${item.price} each
          </p>
        </div>

        <div class="flex items-center gap-3">

          <button
            data-action="decrease"
            data-id="${item.id}"
            class="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-lg font-bold hover:bg-slate-100"
          >
            −
          </button>

          <span class="w-8 text-center font-semibold">
            ${item.quantity}
          </span>

          <button
            data-action="increase"
            data-id="${item.id}"
            class="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-lg font-bold hover:bg-slate-100"
          >
            +
          </button>

        </div>

        <div class="text-right">
          <p class="text-lg font-bold text-slate-900">
            $${(item.price * item.quantity).toFixed(2)}
          </p>

          <button
            data-action="remove"
            data-id="${item.id}"
            class="mt-2 text-sm font-medium text-red-500 hover:text-red-600"
          >
            Remove
          </button>
        </div>
      </article>
    `
    )
    .join("");

  subtotalPrice.innerText = `$${getSubtotal().toFixed(2)}`;
  taxPrice.innerText = `$${getTax().toFixed(2)}`;
  cartTotal.innerText = `$${getCartTotal().toFixed(2)}`;
}

cartItems.addEventListener("click", (event) => {
  const target = event.target as HTMLButtonElement;

  if (target.tagName !== "BUTTON") return;

  const id = Number(target.dataset.id);
  const action = target.dataset.action;

  if (action === "increase") increaseQuantity(id);
  if (action === "decrease") decreaseQuantity(id);
  if (action === "remove") removeFromCart(id);

  renderCart();
});

renderCart();