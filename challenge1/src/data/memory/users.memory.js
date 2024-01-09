import crypto from "node:crypto";

class UserManager {
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
        console.log(`Propiedades faltantes: ${missingProps.join()}`);
      } else {
        const { name, photo, email } = data;

        UserManager.#users.push({
          id: crypto.randomBytes(12).toString("hex"),
          name,
          photo,
          email,
        });

        const index = UserManager.#users.length - 1;
        return UserManager.#users[index];
      }
    } catch (e) {
      throw e.message;
    }
  }

  read() {
    try {
      return UserManager.#users;
    } catch (e) {
      throw e.message;
    }
  }

  readOne(id) {
    try {
      return UserManager.#users.find((el) => el.id == id);
    } catch (e) {
      throw e.message;
    }
  }

  update(pId, data) {
    try {
      const { id, ...restData } = data;

      const users = UserManager.#users;

      const indexProduct = users.findIndex((obj) => obj.id == pId);

      const searchedProduct = users[indexProduct];
      if (!searchedProduct) return null;

      users[indexProduct] = { ...searchedProduct, ...restData };

      return true;
    } catch (e) {
      throw e.message;
    }
  }

  destroy(id) {
    try {
      const users = UserManager.#users;
      const newList = users.filter((el) => el.id !== id);

      if (users.length == newList.length) return null;

      UserManager.#users = newList;

      return true;
    } catch (e) {
      throw e.message;
    }
  }
}

const UsersManager = new UserManager();

UsersManager.create({
  name: "tomas",
  email: "lala@gmail.com",
  photo: "img",
});

UsersManager.create({
  name: "Matias",
  email: "mati@gmail.com",
  photo: "img2",
});
