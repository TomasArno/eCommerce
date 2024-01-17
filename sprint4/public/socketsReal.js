const socket = io();

socket.on("products", (products) => {
  const productCards = products
    .map(
      (product) => `
       <div class="card">
      <img src=${product.photo} class="card_img" alt="product image" />
      <div class="card_data">
        <h5 class="card_data-title">${product.title}</h5>
        <p class="card_data-price">$${product.price}</p>
      </div>
      <button type="button" class="btn">ADD TO CART!</button>
    </div>
    `
    )
    .join("");

  document.querySelector(".cards_container").innerHTML = productCards;
});
