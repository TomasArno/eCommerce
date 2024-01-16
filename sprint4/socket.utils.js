import ProductsManager from "./src/data/fs/products.fs.js";
import { socketServer } from "./server.js";

async function socketInit(socket) {
  console.log(socket.id);
  const products = await ProductsManager.read();

  socket.emit("products", products);

  socket.on("newProduct", async (productData) => {
    await ProductsManager.create(productData);

    const products = await ProductsManager.read();

    socketServer.emit("products", products);
  });
}

export default socketInit;
