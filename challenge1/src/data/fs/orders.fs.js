import fs from "node:fs/promises";
import { existsSync, writeFileSync } from "node:fs";
import crypto from "node:crypto";

class OrdersManager {
  static #path = "./src/data/fs/files/orders.json";

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
    const propsList = ["pId", "uId", "quantity", "state"];
    const keyList = Object.keys(data);

    const missingProps = [];

    for (let i = 0; i < propsList.length; i++) {
      !keyList.includes(propsList[i]) ? missingProps.push(propsList[i]) : null;
    }

    if (missingProps.length) {
      return `Propiedades faltantes: ${missingProps.join()}`;
    } else {
      const { pId, uId, quantity, state } = data;

      const orders = await this.read();

      orders.push({
        id: crypto.randomBytes(12).toString("hex"),
        pId,
        uId,
        quantity,
        state,
      });

      try {
        await fs.writeFile(
          OrdersManager.#path,
          JSON.stringify(orders, null, 2)
        );

        return orders[orders.length - 1];
      } catch (e) {
        throw e.message;
      }
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
      throw e.message;
    }
  }

  async readByUser(uId) {
    try {
      const orders = await this.read();

      return orders.filter((el) => el.uId == uId);
    } catch (e) {
      throw e.message;
    }
  }

  async update(oId, quantity, state) {
    //opcional?
    try {
      const orders = await this.read();

      const indexOrder = orders.findIndex((obj) => obj.id == oId);

      const searchedOrder = orders[indexOrder];
      if (!searchedOrder) return null;

      orders[indexOrder] = { ...searchedOrder };

      await fs.writeFile(OrdersManager.#path, JSON.stringify(orders, null, 2));

      return true;
    } catch (e) {
      throw e.message;
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
      throw e.message;
    }
  }
}

const ordersManager = new OrdersManager();

export default ordersManager;
