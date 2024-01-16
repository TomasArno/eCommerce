const socket = io();

socket.on("products", (products) => {
  const productCards = products
    .map(
      (product) => `
      <div class="card m-2" style="width: 320px">
        <img
          src=${product.photo}
          style="height: 300px"
          class="card-img-top object-fit-cover"
          alt=""
        />
        <div class="card-body d-flex flex-column justify-content-center">
          <h5 class="card-title text-center">${product.title}</h5>
          <p class="card-text text-center">${product.price}</p>
          <button type="button" class="btn btn-success">ADD TO CART!</button>
        </div>
      </div>
    `
    )
    .join("");

  document.querySelector("#products").innerHTML = productCards;
});
