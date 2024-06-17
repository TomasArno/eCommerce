import UsersDTO from "../dto/users.dto.js";

import dao from "../dao/index.dao.js";
const { users } = dao;

const alwaysExclude = "-verifyCode -password -isVerified -id";
class UsersRepositorie {
  constructor() {
    this.model = users;
  }

  create = async (data) => await this.model.create(new UsersDTO(data));
  read = async ({ filter, options = {} }) => await this.model.read({ filter, sortAndPaginate: options }, alwaysExclude);
  readOne = async (id) => await this.model.readOne({ id }, alwaysExclude);
  readByEmail = async (email) => await this.model.readByEmail(email);
  update = async (id, data) => await this.model.update(id, data);
  destroy = async (id) => await this.model.destroy(id);
}

const usersRep = new UsersRepositorie();
export default usersRep;
