import categories from "../repositories/categories.rep.js";

class CategoriesService {
  constructor() {
    this.manager = categories;
  }

  async create(data) {
    try {
      const response = await this.manager.create(data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async read({ filter, options }) {
    try {
      const response = await this.manager.read({ filter, options });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async readOne(id) {
    try {
      const response = await this.manager.readOne(id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const response = await this.manager.update(id, data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      const response = await this.manager.destroy(id);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

const categoriesService = new CategoriesService();

export default categoriesService;
