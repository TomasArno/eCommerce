import dbConnection from "../utils/db.utils.js";

const persistence = process.env.PERSISTENCE || "MONGO";

let dao;

switch (persistence) {
  case "MEMORY":
    const { default: ordersFS } = await import("./memory/orders.memory.js");
    const { default: usersFS } = await import("./memory/users.memory.js");
    const { default: productsFS } = await import("./memory/products.memory.js");

    dao = { users: usersFS, products: productsFS, orders: ordersFS };


    break;
  case "FS":
    const { default: ordersMemory } = await import("./fs/orders.fs.js");
    const { default: usersMemory } = await import("./fs/users.fs.js");
    const { default: productsMemory } = await import("./fs/products.fs.js");

    dao = { users: usersMemory, products: productsMemory, orders: ordersMemory };

    break;
  default:
    dbConnection();

    const { default: ordersMongo } = await import("./mongo/orders.manager.js");
    const { default: usersMongo } = await import("./mongo/users.manager.js");
    const { default: productsMongo } = await import("./mongo/products.manager.js");

    dao = { users: usersMongo, products: productsMongo, orders: ordersMongo };

    break;
}

export default dao;