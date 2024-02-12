import { Products } from "../src/data/mongo/mongo.manager.js";
import { socketServer } from "../server.js";

async function socketInit(socket) {
  const opt = { filter: {}, sortAndPaginate: {} };

  const { docs } = await Products.read(opt);

  socket.emit("products", docs);

  socket.on("newProduct", async (productData) => {
    await Products.create(productData);

    const { docs } = await Products.read(opt);

    socketServer.emit("products", docs);
  });
}

export default socketInit;
