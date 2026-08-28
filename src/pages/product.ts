import { getOneProduct } from "../api/fetchdata";
import { addToCart } from "../localstorage/cart";
import "../style.css"

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const productDiv = document.querySelector("#product") as HTMLDivElement;
const backBtn = document.querySelector("#back-btn") as HTMLButtonElement;

backBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});

async function renderOneProduct() {
  if (!id) {
    productDiv.innerText = "Product not found";
    return;
  }

  try {
    const product = await getOneProduct(id);

    if (!product) {
      productDiv.innerText = "Product not found";
      return;
    }

    productDiv.innerHTML = `
      
<div class="grid grid-cols-1 lg:grid-cols-2">

  <div class="flex min-h-100 items-center justify-center bg-slate-100 p-8 sm:p-12 lg:min-h-150">
    <img
      src="${product.thumbnail}"
      alt="${product.title}"
      class="max-h-125 w-full object-contain"
    >
  </div>

  <div class="flex flex-col justify-center p-6 sm:p-10 lg:p-14">

    <div class="mb-5 flex flex-wrap items-center gap-3">
      <span
        class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold capitalize text-slate-600"
      >
        ${product.category}
      </span>

      <span class="text-sm font-medium text-amber-500">
        ★ ${product.rating}
      </span>
    </div>

    <h1 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
      ${product.title}
    </h1>

    <p class="mt-5 text-sm leading-7 text-slate-500 sm:text-base">
      ${product.description}
    </p>

    <div class="mt-8">
      <span class="text-3xl font-bold text-slate-900">
        $${product.price}
      </span>
    </div>

    <div class="mt-5 flex items-center gap-2 text-sm">
      <span class="font-medium text-slate-700">Stock:</span>
      <span class="text-slate-500">${product.stock} available</span>
    </div>

    <button
      id="add-to-cart"
      class="mt-8 w-full rounded-xl bg-slate-900 px-6 py-4 text-sm font-semibold text-white transition hover:bg-slate-700 active:scale-[0.98] sm:w-auto"
    >
      Add to Cart
    </button>

  </div>

</div>


    `;

    const addButton = document.querySelector(
      "#add-to-cart",
    ) as HTMLButtonElement;

    addButton.addEventListener("click", () => {
      const loggedIn = localStorage.getItem("logged");
      if (!loggedIn) {
        window.location.href = "login.html";
      } else {
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: 1,
        });

        window.location.href = "cart.html";
      }

    });
  } catch (error) {
    console.log(error);
  }
}

renderOneProduct();
