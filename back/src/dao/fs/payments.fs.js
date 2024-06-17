import fs from "node:fs/promises";
import { existsSync, writeFileSync } from "node:fs";


class PaymentsManager {
  static #path = "./src/dao/fs/files/payments.json";

  constructor() {
    this.init();
  }

  init() {
    if (!existsSync(PaymentsManager.#path)) {
      const data = JSON.stringify([], null, 2);

      writeFileSync(PaymentsManager.#path, data);
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

        const payments = await this.read();

        payments.push(data);

        await fs.writeFile(
          PaymentsManager.#path,
          JSON.stringify(payments, null, 2)
        );

        return payments[payments.length - 1];
      }
    } catch (e) {
      throw e;
    }
  }

  async read() {
    try {
      const payments = JSON.parse(
        await fs.readFile(PaymentsManager.#path, {
          encoding: "utf-8",
        })
      );

      return payments;
    } catch (e) {
      throw e;
    }
  }

  async readOne(oId) {
    try {
      const payments = await this.read();

      const searchedOrder = payments.find((el) => el.id == oId);

      return searchedOrder;
    } catch (e) {
      throw e;
    }
  }

  async readByUser(uId) {
    try {
      const payments = await this.read();

      const searchedpayments = payments.filter((el) => el.uId == uId);

      return searchedpayments;
    } catch (e) {
      throw e;
    }
  }

  async update(oId, quantity, state) {
    try {
      const payments = await this.read();

      const indexOrder = payments.findIndex((obj) => obj.id == oId);

      const searchedOrder = payments[indexOrder];
      if (!searchedOrder) return null;

      if (quantity) payments[indexOrder] = { ...payments[indexOrder], quantity };
      if (state) payments[indexOrder] = { ...payments[indexOrder], state };

      await fs.writeFile(PaymentsManager.#path, JSON.stringify(payments, null, 2));

      return true;
    } catch (e) {
      throw e;
    }
  }

  async destroy(oId) {
    try {
      const payments = await this.read();
      const newList = payments.filter((el) => el.id !== oId);

      if (payments.length == newList.length) return null;

      await fs.writeFile(PaymentsManager.#path, JSON.stringify(newList, null, 2));

      return true;
    } catch (e) {
      throw e;
    }
  }
}

const payments = new PaymentsManager();

export default payments;
