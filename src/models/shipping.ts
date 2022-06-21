import mongoose, { Schema, Document } from 'mongoose';
import { ShippingType } from '../interfaces';

export interface ShippingModel extends ShippingType, Document {}

const ShippingSchema = new Schema(
    {
        name: { type: String, required: true },
        fee: { type: Number, required: true }
    },
    {
        timestamps: true,
        collection: 'shippings'
    }
);

ShippingSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});
export default mongoose.model<ShippingModel>('shipping', ShippingSchema);
