import {
  getCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  getCartTotal,
  getTax,
  getSubtotal,
} from "../localstorage/cart";
const backBtn = document.querySelector('#back-btn') as HTMLButtonElement;
backBtn.addEventListener('click', () => {
    window.location.href = "http://localhost:5173/"
})


const cartItems = document.querySelector(
  "#cart-items"
) as HTMLDivElement;


const cartTotal = document.querySelector(
  "#cart-total"
) as HTMLSpanElement;


function renderCart(): void {
  const cart = getCart();


  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.innerText = "0";
    return;
  }


  cartItems.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
          <h2>${item.title}</h2>


          <p>Price: $${item.price}</p>


          <div>
            <button data-action="decrease" data-id="${item.id}">
              -
            </button>


            <span>${item.quantity}</span>


            <button data-action="increase" data-id="${item.id}">
              +
            </button>
          </div>


          <p>
            Subtotal: $${getSubtotal()}
          </p>

          <p>
            HST_RATE: $${getTax()}
          </p>


          <button data-action="remove" data-id="${item.id}">
            Remove
          </button>
        </div>
      `
    )
    .join("");


  cartTotal.innerText = getCartTotal().toFixed(2);
}


cartItems.addEventListener("click", (event) => {
  const target = event.target as HTMLButtonElement;


  if (target.tagName !== "BUTTON") return;


  const id = Number(target.dataset.id);
  const action = target.dataset.action;


  if (action === "increase") {
    increaseQuantity(id);
  }


  if (action === "decrease") {
    decreaseQuantity(id);
  }


  if (action === "remove") {
    removeFromCart(id);
  }


  renderCart();
});


renderCart();
