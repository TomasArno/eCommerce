import Joi from "joi";

const filterSchema = Joi.object({
  name: Joi.string().trim(),
  price: Joi.object({
    $gt: Joi.number().optional(),
    $lt: Joi.number().optional(),
  }).optional(),
  category: Joi.string().trim(),
  sortBy: Joi.string().valid("name", "price", "createdAt").optional(),
  order: Joi.string().valid("asc", "desc").default("asc"),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
});

const filterMap = {
  name: {
    validate: (value) => Joi.string().trim().validate(value),
    sanitize: (value) => value.trim(),
  },
  category: {
    validate: (value) => Joi.string().trim().validate(value),
    sanitize: (value) => value.trim(),
  },
  price: {
    validate: (value) =>
      Joi.object({
        $gt: Joi.number().optional(),
        $lt: Joi.number().optional(),
      }).validate(value),
    sanitize: (value) => {
      const sanitizedPrice = {};

      if (value.$gt) sanitizedPrice.$gt = value.$gt;
      if (value.$lt) sanitizedPrice.$lt = value.$lt;

      return sanitizedPrice;
    },
  },
  sortBy: {
    validate: (value) =>
      Joi.string().valid("name", "price", "createdAt").validate(value),
    sanitize: (value) => value,
  },
  order: {
    validate: (value) =>
      Joi.string().valid("asc", "desc").default("asc").validate(value),
    sanitize: (value) => value || "asc",
  },
  page: {
    validate: (value) =>
      Joi.number().integer().min(1).default(1).validate(value),
    sanitize: (value) => value || 1,
  },
  limit: {
    validate: (value) =>
      Joi.number().integer().min(1).max(50).default(10).validate(value),
    sanitize: (value) => Math.min(Math.max(value, 1), 50),
  },
};

const validateFilters = (filters) => {
  const { error, value } = filterSchema.validate(filters, {
    allowUnknown: true,
  });

  if (error) {
    throw new Error(`Filtros inválidos: ${error.message}`);
  }

  return value;
};

const sanitizeFilters = (filters) => {
  const sanitized = {};

  for (const [key, value] of Object.entries(filters)) {
    if (filterMap[key]) {
      sanitized[key] = filterMap[key].sanitize(value);
    }
  }

  return sanitized;
};

const processFilters = (filters) => {
  const validatedFilters = validateFilters(filters);
  const sanitizedFilters = sanitizeFilters(validatedFilters);

  return sanitizedFilters;
};

module.exports = {
  processFilters,
  validateFilters,
  sanitizeFilters,
};
