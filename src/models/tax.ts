import { TagType, TaxType } from '../interfaces/index';
import mongoose, { Document, Schema } from "mongoose";

export interface TaxModel extends TaxType, Document { };

const TaxSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    rate: { type: Number, required: true },
    status: { type: String, required: true },
    city: { type: String, required: false },
    district: { type: String, required: false },
    ward: { type: String, required: false }
}, {
    timestamps: true,
    collection: "taxes"
});

TaxSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

export default mongoose.model<TaxModel>('tax', TaxSchema)