import { getProducts, searchProducts, getCategories, sortProducts } from "../api/fetchdata";
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
  "#category-select"
) as HTMLSelectElement;

const sortSelect = document.querySelector(
  "#sort-select"
) as HTMLSelectElement;


function renderProducts(products: Products[]): void {
  if (products.length === 0) {
    productContainer.innerText = "No products found.";
    return;
  }

  const renderedProducts = products.map((product) => {
    return `
      <div>
        <a href="product.html?id=${product.id}">
          <img src="${product.thumbnail}" alt="${product.title}">
          <h2>${product.title}</h2>
          <p>${product.description}</p>
          <div>
            <span>${product.rating}</span>
            <span>${product.category.replace(/^./, c => c.toUpperCase())}</span>
          </div>
          <div>
            <h3>$${product.price}</h3>
          </div>
        </a>

        <button>Add to Cart</button>
      </div>
    `;
  });

  productContainer.innerHTML = renderedProducts.join("");
}

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

loadProducts();

async function loadCategories(): Promise<void> {
  const categories = await getCategories();

  categories.forEach((category) => {
    const option = document.createElement("option");

    option.value = category;
    option.textContent = category.replace(/^./, (c) =>
      c.toUpperCase()
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
    `https://dummyjson.com/products/category/${category}`
  );

  renderProducts(products);
});

loadCategories();

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