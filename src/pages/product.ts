import { getOneProduct } from "../api/fetchdata";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const productDiv = document.querySelector("#product") as HTMLDivElement;

async function renderOneProduct() {
  if (id) {
    try {
      const product = await getOneProduct(id);
      if (!product) {
        console.log("Product not found");
        return;
      }

      productDiv.innerHTML = `
        
        <img src="${product.thumbnail}" alt="${product.title}">
        <div>
            <h2>${product.title}</h2>
            <p>${product.description}</p>
        </div>
        <div>
            <span>${product.rating}</span>
            <span>${product.category}</span>
        </div>
        <div>
            <span>$${product.price}</span>
            <span>${product.stock}</span>
        </div>
        <button>Add to Cart</button>
            `;
    } catch (error) {
      console.log(error);
    }
  }
}

renderOneProduct();
