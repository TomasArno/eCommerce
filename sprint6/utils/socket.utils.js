import { Products, Users } from "../src/data/mongo/mongo.manager.js";

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

  socket.on("userRegister", async (userData) => {
    await Users.create(userData);
  });

  socket.on("userLogin", async (userData) => {
    console.log(userData);
  });
}

export default socketInit;
