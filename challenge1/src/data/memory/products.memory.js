import crypto from "node:crypto";

class ProductsManager {
  static #products = [];

  id;
  title;
  photo;
  price;
  stock;

  create(data) {
    try {
      const propsList = ["title", "photo", "price", "stock"];
      const keyList = Object.keys(data);

      const missingProps = [];

      for (let i = 0; i < propsList.length; i++) {
        !keyList.includes(propsList[i])
          ? missingProps.push(propsList[i])
          : null;
      }

      if (missingProps.length) {
        return `Propiedades faltantes: ${missingProps.join()}`;
      } else {
        const { title, photo, price, stock } = data;

        ProductsManager.#products.push({
          id: crypto.randomBytes(12).toString("hex"),
          title,
          photo,
          price,
          stock,
        });

        const index = ProductsManager.#products.length - 1;
        return ProductsManager.#products[index];
      }
    } catch (e) {
      throw e;
    }
  }

  read() {
    try {
      return ProductsManager.#products;
    } catch (e) {
      throw e;
    }
  }

  readOne(id) {
    try {
      return ProductsManager.#products.find((el) => el.id == id);
    } catch (e) {
      throw e;
    }
  }

  update(pId, data) {
    try {
      const { id, ...restData } = data;

      const products = ProductsManager.#products;

      const indexProduct = products.findIndex((obj) => obj.id == pId);

      const searchedProduct = products[indexProduct];
      if (!searchedProduct) return null;

      products[indexProduct] = { ...searchedProduct, ...restData };

      return true;
    } catch (e) {
      throw e;
    }
  }

  destroy(id) {
    try {
      const products = ProductsManager.#products;
      const newList = products.filter((el) => el.id !== id);

      if (products.length == newList.length) return null;

      ProductsManager.#products = newList;

      return true;
    } catch (e) {
      throw e;
    }
  }
}

const Products = new ProductsManager();
