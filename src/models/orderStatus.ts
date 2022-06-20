import mongoose, { Document, Schema } from "mongoose";
import { OrderStatusType } from "../interfaces";

export interface OrderStatusModel extends OrderStatusType, Document { };

const OrderStatusSchema = new Schema({
    name: { type: String, required: true },
    serial: { type: Number, required: true },
    color: { type: String, required: true }
}, {
    timestamps: true,
    collection: 'orderStatuses'
});

OrderStatusSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

export default mongoose.model<OrderStatusModel>('orderStatuses', OrderStatusSchema)