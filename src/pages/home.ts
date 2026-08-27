import { getProducts } from "../api/fetchdata";
const productContainer = document.querySelector(
  "#product-container",
) as HTMLDivElement;

async function fetchedProducts() {
  try {
    const products = await getProducts();

    if (products.length === 0) {
      productContainer.innerText = "No Products found";
      return;
    }

    const renderedProducts = products.map((product) => {
      return ` <div>
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
        </div>`
    });

    productContainer.innerHTML = renderedProducts.join('');
  } catch (error) {
    console.log(error);
  }
}

fetchedProducts();
