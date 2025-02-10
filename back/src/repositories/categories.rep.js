import CategoriesDTO from "../dto/categories.dto.js";

import dao from "../dao/index.dao.js";

const { categories } = dao;

class CategoriesRepository {
  constructor() {
    this.model = categories;
  }

  create = async (data) => await this.model.create(new CategoriesDTO(data));
  read = async ({ filter, options }) =>
    await this.model.read({ filter, sortAndPaginate: options });
  readOne = async (id) => await this.model.readOne(id);
  update = async (id, data) => await this.model.update(id, data);
  destroy = async (id) => await this.model.destroy(id);
}

const categoriesRep = new CategoriesRepository();
export default categoriesRep;
