import SubcategoriesDTO from "../dto/subcategories.dto.js";

import dao from "../dao/index.dao.js";

const { subcategories } = dao;

class SubcategoriesRepository {
  constructor() {
    this.model = subcategories;
  }

  create = async (data) => await this.model.create(new SubcategoriesDTO(data));
  read = async ({ filter, options }) =>
    await this.model.read({ filter, sortAndPaginate: options });
  readOne = async (id) => await this.model.readOne(id);
  update = async (id, data) => await this.model.update(id, data);
  destroy = async (id) => await this.model.destroy(id);
}

const subcategoriesRep = new SubcategoriesRepository();
export default subcategoriesRep;
