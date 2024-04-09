import ProductsDTO from "../dto/products.dto.js";

import dao from "../dao/index.dao.js";

const { products } = dao;

class ProductsRepositorie {
  constructor() {
    this.model = products;
  }

  create = async (data) => await this.model.create(new ProductsDTO(data));
  read = async ({ filter, options }) => await this.model.read({ filter, options });
  readOne = async (id) => await this.model.readOne(id);
  update = async (id, data) => await this.model.update(id, data);
  destroy = async (id) => await this.model.destroy(id);
}

const productsRep = new ProductsRepositorie();
export default productsRep;