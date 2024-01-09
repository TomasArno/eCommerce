import crypto from "node:crypto";

class ProductManager {
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
        console.log(`Propiedades faltantes: ${missingProps.join()}`);
      } else {
        const { title, photo, price, stock } = data;

        ProductManager.#products.push({
          id: crypto.randomBytes(12).toString("hex"),
          title,
          photo,
          price,
          stock,
        });

        const index = ProductManager.#products.length - 1;
        return ProductManager.#products[index];
      }
    } catch (e) {
      throw e.message;
    }
  }

  read() {
    try {
      return ProductManager.#products;
    } catch (e) {
      throw e.message;
    }
  }

  readOne(id) {
    try {
      return ProductManager.#products.find((el) => el.id == id);
    } catch (e) {
      throw e.message;
    }
  }

  update(pId, data) {
    try {
      const { id, ...restData } = data;

      const products = ProductManager.#products;

      const indexProduct = products.findIndex((obj) => obj.id == pId);

      const searchedProduct = products[indexProduct];
      if (!searchedProduct) return null;

      products[indexProduct] = { ...searchedProduct, ...restData };

      return true;
    } catch (e) {
      throw e.message;
    }
  }

  destroy(id) {
    try {
      const products = ProductManager.#products;
      const newList = products.filter((el) => el.id !== id);

      if (products.length == newList.length) return null;

      ProductManager.#products = newList;

      return true;
    } catch (e) {
      throw e.message;
    }
  }
}

const ProductsManager = new ProductManager();

ProductsManager.create({
  title: "product web",
  price: 500,
  stock: 2,
  photo: "img",
});

ProductsManager.create({
  title: "product web 2",
  price: 500,
  stock: 2,
  photo: "img",
});
