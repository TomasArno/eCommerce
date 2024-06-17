import dbConnection from "../utils/db.utils.js";

import args from "../utils/arguments.utils.js";
const { env } = args;

let dao;
console.log("ENVIRONMENT: " + env);

switch (env) {
  case "test":
    const { default: ordersFS } = await import("./fs/orders.fs.js");
    const { default: usersFS } = await import("./fs/users.fs.js");
    const { default: productsFS } = await import("./fs/products.fs.js");
    const { default: paymentsFS } = await import("./fs/payments.fs.js");

    dao = { users: usersFS, products: productsFS, orders: ordersFS, payments: paymentsFS };

    break;
  default:
    dbConnection();

    const { default: ordersMongo } = await import("./mongo/orders.manager.js");
    const { default: usersMongo } = await import("./mongo/users.manager.js");
    const { default: productsMongo } = await import("./mongo/products.manager.js");
    const { default: paymentsMongo } = await import("./mongo/payments.manager.js");

    dao = { users: usersMongo, products: productsMongo, orders: ordersMongo, payments: paymentsMongo };

    break;
}

export default dao;