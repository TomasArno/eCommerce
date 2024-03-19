import { model, Schema } from 'mongoose';

import moongosePaginate from 'mongoose-paginate-v2';

const collection = 'products';

const productsSchema = new Schema(
	{
		title: { type: String, required: true, unique: true, index: true },
		photo: { type: String, required: true },
		price: { type: Number, required: true, index: true },
		stock: { type: Number, default: 0 },
	},
	{ timestamps: true }
);
productsSchema.plugin(moongosePaginate);

const Products = model(collection, productsSchema);

export default Products;
