import __dirname from "./dirname.utils.js";

const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "E-COMMERCE API",
      description: "Documentation of my API",
    },
  },
  apis: [`${__dirname}/docs/*.yaml`],
};

export default options;