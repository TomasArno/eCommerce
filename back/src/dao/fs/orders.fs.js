import fs from "node:fs/promises";
import { existsSync, writeFileSync } from "node:fs";


class OrdersManager {
  static #path = "./src/dao/fs/files/orders.json";

  constructor() {
    this.init();
  }

  init() {
    if (!existsSync(OrdersManager.#path)) {
      const data = JSON.stringify([], null, 2);

      writeFileSync(OrdersManager.#path, data);
    }
  }

  async create(data) {
    try {
      const propsList = ["pId", "uId", "quantity", "state"];
      const keyList = Object.keys(data);

      const missingProps = [];

      for (let i = 0; i < propsList.length; i++) {
        !keyList.includes(propsList[i])
          ? missingProps.push(propsList[i])
          : null;
      }

      if (missingProps.length) {
        const error = new Error(
          `Propiedades faltantes: ${missingProps.join()}`
        );
        error.statusCode = 400;

        throw error;
      } else {

        const orders = await this.read();

        orders.push(data);

        await fs.writeFile(
          OrdersManager.#path,
          JSON.stringify(orders, null, 2)
        );

        return orders[orders.length - 1];
      }
    } catch (e) {
      throw e;
    }
  }

  async read() {
    try {
      const orders = JSON.parse(
        await fs.readFile(OrdersManager.#path, {
          encoding: "utf-8",
        })
      );

      return orders;
    } catch (e) {
      throw e;
    }
  }

  async readOne(oId) {
    try {
      const orders = await this.read();

      const searchedOrder = orders.find((el) => el.id == oId);

      return searchedOrder;
    } catch (e) {
      throw e;
    }
  }

  async readByUser(uId) {
    try {
      const orders = await this.read();

      const searchedOrders = orders.filter((el) => el.uId == uId);

      return searchedOrders;
    } catch (e) {
      throw e;
    }
  }

  async update(oId, quantity, state) {
    try {
      const orders = await this.read();

      const indexOrder = orders.findIndex((obj) => obj.id == oId);

      const searchedOrder = orders[indexOrder];
      if (!searchedOrder) return null;

      if (quantity) orders[indexOrder] = { ...orders[indexOrder], quantity };
      if (state) orders[indexOrder] = { ...orders[indexOrder], state };

      await fs.writeFile(OrdersManager.#path, JSON.stringify(orders, null, 2));

      return true;
    } catch (e) {
      throw e;
    }
  }

  async destroy(oId) {
    try {
      const orders = await this.read();
      const newList = orders.filter((el) => el.id !== oId);

      if (orders.length == newList.length) return null;

      await fs.writeFile(OrdersManager.#path, JSON.stringify(newList, null, 2));

      return true;
    } catch (e) {
      throw e;
    }
  }
}

const orders = new OrdersManager();

export default orders;
