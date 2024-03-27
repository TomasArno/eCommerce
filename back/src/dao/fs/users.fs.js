import fs from "node:fs/promises";
import { existsSync, writeFileSync } from "node:fs";

class UsersManager {
  static #path = "./src/dao/fs/files/users.json";

  constructor() {
    this.init();
  }

  init() {
    if (!existsSync(UsersManager.#path)) {
      const data = JSON.stringify([], null, 2);

      writeFileSync(UsersManager.#path, data);
    }
  }

  async create(data) {
    try {
      const propsList = ["name", "email"];
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
        const users = await this.read();

        users.push(data);

        await fs.writeFile(UsersManager.#path, JSON.stringify(users, null, 2));

        return users[users.length - 1];
      }
    } catch (e) {
      throw e;
    }
  }

  async read() {
    try {
      const users = JSON.parse(
        await fs.readFile(UsersManager.#path, {
          encoding: "utf-8",
        })
      );

      return users;
    } catch (e) {
      throw e;
    }
  }

  async readOne(id) {
    try {
      const users = await this.read();

      return users.find((el) => el.id == id);
    } catch (e) {
      throw e;
    }
  }

  async update(id, data) {
    try {
      const { idObj, ...restData } = data;

      const users = await this.read();

      const indexUser = users.findIndex((obj) => obj.id == id);

      const searchedUser = users[indexUser];

      users[indexUser] = { ...searchedUser, ...restData };

      await fs.writeFile(UsersManager.#path, JSON.stringify(users, null, 2));

      return true;
    } catch (e) {
      throw e;
    }
  }

  async destroy(id) {
    try {
      const users = await this.read();
      const newList = users.filter((el) => el.id !== id);

      if (users.length == newList.length) return false;

      await fs.writeFile(UsersManager.#path, JSON.stringify(newList, null, 2));

      return true;
    } catch (e) {
      throw e;
    }
  }
}

const users = new UsersManager();

export default users;
