import dbConnection from "../utils/db.utils.js";

import Logger from "../utils/winston.utils.js";

import args from "../utils/arguments.utils.js";
const { env } = args;

Logger.info("ENVIRONMENT: " + env);

let dao;

switch (env) {
  case "test":
    const { default: ordersFS } = await import("./fs/orders.fs.js");
    const { default: usersFS } = await import("./fs/users.fs.js");
    const { default: productsFS } = await import("./fs/products.fs.js");
    const { default: paymentsFS } = await import("./fs/payments.fs.js");

    dao = {
      users: usersFS,
      products: productsFS,
      orders: ordersFS,
      payments: paymentsFS,
    };

    break;
  default:
    dbConnection();

    const { default: ordersMongo } = await import("./mongo/orders.manager.js");
    const { default: usersMongo } = await import("./mongo/users.manager.js");
    const { default: productsMongo } = await import(
      "./mongo/products.manager.js"
    );
    const { default: categoriesMongo } = await import(
      "./mongo/categories.manager.js"
    );
    const { default: subcategoriesMongo } = await import(
      "./mongo/subcategories.manager.js"
    );
    const { default: paymentsMongo } = await import(
      "./mongo/payments.manager.js"
    );

    dao = {
      users: usersMongo,
      products: productsMongo,
      orders: ordersMongo,
      payments: paymentsMongo,
      categories: categoriesMongo,
      subcategories: subcategoriesMongo,
    };

    break;
}

export default dao;
