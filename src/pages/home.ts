import {
  getProducts,
  searchProducts,
  getCategories,
  sortProducts,
} from "../api/fetchdata";

import { addToCart } from "../localstorage/cart";

import type { Products } from "../types";

const productContainer = document.querySelector(
  "#product-container",
) as HTMLDivElement;

const searchInput = document.querySelector(
  "#search-input",
) as HTMLInputElement;

const searchBtn = document.querySelector(
  "#search-btn",
) as HTMLButtonElement;

const categorySelect = document.querySelector(
  "#category-select",
) as HTMLSelectElement;

const sortSelect = document.querySelector(
  "#sort-select",
) as HTMLSelectElement;


function renderProducts(products: Products[]): void {
  if (products.length === 0) {
    productContainer.innerHTML = `
      <div class="col-span-full flex min-h-60 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white">
        <div class="text-center">
          <h2 class="text-lg font-semibold text-slate-800">
            No products found
          </h2>

          <p class="mt-1 text-sm text-slate-500">
            Try searching for something else.
          </p>
        </div>
      </div>
    `;

    return;
  }

  const renderedProducts = products.map((product) => {
    return `
      <article
        class="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
      >
        <a
          href="product.html?id=${product.id}"
          class="flex flex-1 flex-col"
        >
          <div class="flex h-64 items-center justify-center overflow-hidden bg-slate-100 p-6">
            <img
              src="${product.thumbnail}"
              alt="${product.title}"
              class="h-full w-full object-contain transition duration-300 group-hover:scale-105"
            />
          </div>

          <div class="flex flex-1 flex-col p-5">
            <div class="mb-3 flex items-center justify-between gap-3">
              <span
                class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize text-slate-600"
              >
                ${product.category}
              </span>

              <span class="text-sm font-medium text-amber-500">
                ★ ${product.rating}
              </span>
            </div>

            <h2
              class="line-clamp-2 text-base font-semibold text-slate-900 transition group-hover:text-slate-600"
            >
              ${product.title}
            </h2>

            <p
              class="mt-2 line-clamp-2 text-sm leading-6 text-slate-500"
            >
              ${product.description}
            </p>

            <div class="mt-auto pt-5">
              <span class="text-xl font-bold text-slate-900">
                $${product.price}
              </span>
            </div>
          </div>
        </a>

        <div class="px-5 pb-5">
          <button
            data-id = "${product.id}"
            data-action = "add"
            class="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 active:scale-[0.98]"
          >
            Add to Cart
          </button>
        </div>
      </article>
    `;
  });

  productContainer.innerHTML = renderedProducts.join("");
}

productContainer.addEventListener("click", async (event) => {
  const target = event.target as HTMLButtonElement;

  if (target.tagName !== "BUTTON") return;
  if (target.dataset.action !== "add") return;

  const id = Number(target.dataset.id);

  const loggedIn = localStorage.getItem("logged");

  if (!loggedIn) {
    window.location.href = "login.html";
    return;
  }

  const products = await getProducts();

  const product = products.find((product) => product.id === id);

  if (!product) return;

  addToCart({
    id: product.id,
    title: product.title,
    price: product.price,
    quantity: 1,
  });

  target.innerText = "Added ✓";

  setTimeout(() => {
    target.innerText = "Add to Cart";
  }, 1000);
});

async function loadProducts(): Promise<void> {
  const products = await getProducts();
  renderProducts(products);
}


searchBtn.addEventListener("click", async () => {
  const query = searchInput.value.trim();

  if (query === "") {
    loadProducts();
    return;
  }

  const products = await searchProducts(query);
  renderProducts(products);
});


async function loadCategories(): Promise<void> {
  const categories = await getCategories();

  categories.forEach((category) => {
    const option = document.createElement("option");

    option.value = category;
    option.textContent = category.replace(/^./, (c) =>
      c.toUpperCase(),
    );

    categorySelect.appendChild(option);
  });
}


categorySelect.addEventListener("change", async () => {
  const category = categorySelect.value;

  if (category === "") {
    loadProducts();
    return;
  }

  const products = await getProducts(
    `https://dummyjson.com/products/category/${category}`,
  );

  renderProducts(products);
});


sortSelect.addEventListener("change", async () => {
  const value = sortSelect.value;

  if (value === "") {
    loadProducts();
    return;
  }

  const [sortBy, order] = value.split("-");

  const products = await sortProducts(sortBy, order);

  renderProducts(products);
});


loadProducts();
loadCategories();
