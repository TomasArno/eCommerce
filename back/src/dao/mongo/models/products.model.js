import { model, Schema, Types } from 'mongoose';

import moongosePaginate from 'mongoose-paginate-v2';

const collection = 'products';

const productsSchema = new Schema(
	{
		title: { type: String, required: true, unique: true, index: true },
		photo: { type: String, required: true },
		price: { type: Number, required: true, index: true },
		stock: { type: Number, default: 0 },
		ownerId: { type: Types.ObjectId, required: true, ref: "users" }
	},
	{ timestamps: true }
);

productsSchema.plugin(moongosePaginate);

productsSchema.pre("find", function () {
	this.populate("ownerId", "-createdAt -updatedAt -__v");
});

const Products = model(collection, productsSchema);

export default Products;
