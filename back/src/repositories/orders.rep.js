import OrdersDTO from "../dto/orders.dto.js";

import dao from "../dao/index.dao.js";

const { orders } = dao;

class OrdersRepositorie {
  constructor() {
    this.model = orders;
  }

  create = async (data) => await this.model.create(new OrdersDTO(data));
  read = async ({ filter, options }) => await this.model.read({ filter, sortAndPaginate: options });
  report = async (userId) => await this.model.report(userId);
  readOne = async (id) => await this.model.readOne(id);
  update = async (id, data) => await this.model.update(id, data);
  destroy = async (id) => await this.model.destroy(id);
}

const ordersRep = new OrdersRepositorie();
export default ordersRep;