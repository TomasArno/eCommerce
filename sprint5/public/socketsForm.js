const socket = io();

const btnNewProduct = document.querySelector("#newProduct");

btnNewProduct.addEventListener("click", (e) => {
  e.preventDefault();

  const productData = {};

  const title = document.querySelector("#title").value;
  const photo = document.querySelector("#photo").value;
  const price = document.querySelector("#price").value;
  const stock = document.querySelector("#stock").value;

  if (title) productData.title = title;
  if (photo) productData.photo = photo;
  if (price) productData.price = price;
  if (stock) productData.stock = stock;

  socket.emit("newProduct", productData);
});
