import mongoose, { Document, Schema } from "mongoose";
import { ProductType } from "../interfaces";

export interface ProductModel extends ProductType, Document { };

const ProductSchema = new Schema({
    name_vi: { type: String, required: true },
    name_en: { type: String, required: true },
    unit: { type: String, required: true },
    description: { type: String, required: false },
    status: { type: String, required: true },
    featureImage: { type: String, required: true },
    galleries: { type: Array, required: true },
    groupId: { type: String, required: true },
    categories: { type: Array, required: true },
    tags: { type: Array, required: true },
    type: { type: String, required: true },
    simple: { type: Object, required: false },
    variable: { type: Object, required: false }
}, {
    timestamps: true,
    collection: 'products'
})

ProductSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

export default mongoose.model<ProductModel>('product', ProductSchema)