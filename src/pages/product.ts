import { getOneProduct } from "../api/fetchdata";
import { addToCart } from "../localstorage/cart";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const productDiv = document.querySelector("#product") as HTMLDivElement;

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

      <button id="add-to-cart">Add to Cart</button>
    `;

    const addButton = document.querySelector(
      "#add-to-cart",
    ) as HTMLButtonElement;

    addButton.addEventListener("click", () => {
      const loggedIn = localStorage.getItem("logged");
      if (!loggedIn) {
        alert("Please login before adding products to your cart.");
      } else {
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: 1,
        });

        alert("Product added to cart!");
        window.location.href = "http://localhost:5173/cart.html"
      }

      // if (loggedInObj.loggedIn !== true) {
      //   alert("Please login before adding products to your cart.");
      //   return;
      // }
    });
  } catch (error) {
    console.log(error);
  }
}

renderOneProduct();
