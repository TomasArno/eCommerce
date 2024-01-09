import crypto from "node:crypto";

class UsersManager {
  static #users = [];

  id;
  name;
  photo;
  email;

  create(data) {
    try {
      const propsList = ["name", "photo", "email"];
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
        const { name, photo, email } = data;

        UsersManager.#users.push({
          id: crypto.randomBytes(12).toString("hex"),
          name,
          photo,
          email,
        });

        const index = UsersManager.#users.length - 1;
        return UsersManager.#users[index];
      }
    } catch (e) {
      throw e;
    }
  }

  read() {
    try {
      return UsersManager.#users;
    } catch (e) {
      throw e;
    }
  }

  readOne(id) {
    try {
      return UsersManager.#users.find((el) => el.id == id);
    } catch (e) {
      throw e;
    }
  }

  update(pId, data) {
    try {
      const { id, ...restData } = data;

      const users = UsersManager.#users;

      const indexProduct = users.findIndex((obj) => obj.id == pId);

      const searchedProduct = users[indexProduct];
      if (!searchedProduct) return null;

      users[indexProduct] = { ...searchedProduct, ...restData };

      return true;
    } catch (e) {
      throw e;
    }
  }

  destroy(id) {
    try {
      const users = UsersManager.#users;
      const newList = users.filter((el) => el.id !== id);

      if (users.length == newList.length) return null;

      UsersManager.#users = newList;

      return true;
    } catch (e) {
      throw e;
    }
  }
}

const Users = new UsersManager();
