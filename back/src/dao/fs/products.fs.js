import fs from "node:fs/promises";
import { existsSync, writeFileSync } from "node:fs";

class ProductManager {
  static #path = "./src/dao/fs/files/products.json";

  constructor() {
    this.init();
  }

  init() {
    if (!existsSync(ProductManager.#path)) {
      const data = JSON.stringify([], null, 2);

      writeFileSync(ProductManager.#path, data);
    }
  }

  async create(data) {
    const propsList = ["title", "photo", "price", "stock"];
    const keyList = Object.keys(data);

    const missingProps = [];

    for (let i = 0; i < propsList.length; i++) {
      !keyList.includes(propsList[i]) ? missingProps.push(propsList[i]) : null;
    }

    if (missingProps.length) {
      const error = new Error(`Propiedades faltantes: ${missingProps.join()}`);

      error.statusCode = 400;

      throw error;
    } else {
      const products = await this.read();

      products.push(data);

      try {
        await fs.writeFile(
          ProductManager.#path,
          JSON.stringify(products, null, 2)
        );

        return products[products.length - 1];
      } catch (e) {
        throw e;
      }
    }
  }

  async read() {
    try {
      const products = JSON.parse(
        await fs.readFile(ProductManager.#path, {
          encoding: "utf-8",
        })
      );

      return products;
    } catch (e) {
      throw e;
    }
  }

  async readOne(id) {
    try {
      const products = await this.read();

      return products.find((el) => el.id == id);
    } catch (e) {
      throw e;
    }
  }

  async update(pId, data) {
    try {
      const { id, ...restData } = data;

      const products = await this.read();

      const indexProduct = products.findIndex((obj) => obj.id == pId);

      const searchedProduct = products[indexProduct];

      products[indexProduct] = { ...searchedProduct, ...restData };

      await fs.writeFile(
        ProductManager.#path,
        JSON.stringify(products, null, 2)
      );

      return true;
    } catch (e) {
      throw e;
    }
  }

  async destroy(id) {
    try {
      const products = await this.read();
      const newList = products.filter((el) => el.id !== id);

      if (products.length == newList.length) return null;

      await fs.writeFile(
        ProductManager.#path,
        JSON.stringify(newList, null, 2)
      );

      return true;
    } catch (e) {
      throw e;
    }
  }
}

const products = new ProductManager();

export default products;
