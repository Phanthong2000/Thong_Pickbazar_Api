import mongoose, { Document, Schema } from 'mongoose';
import { OrderType } from '../interfaces';

export interface OrderModel extends OrderType, Document {}

const OrderSchema = new Schema(
    {
        customerId: { type: String, required: true },
        phone: { type: String, required: true },
        billAddress: { type: String, required: true },
        shippingAddress: { type: String, required: true },
        deliverySchedule: {
            title: { type: String, required: true },
            description: { type: String, required: true }
        },
        products: [
            {
                productId: { type: String, required: true },
                price: { type: Number, required: true },
                quantity: { type: Number, required: true }
            }
        ],
        taxId: { type: String, required: true },
        shippingId: { type: String, required: true },
        couponId: { type: String, required: true },
        orderStatusId: { type: String, required: true },
        paymentMethodId: { type: String, required: true },
        internetBankingImage: { type: String, required: false },
        total: { type: Number, required: true }
    },
    {
        timestamps: true,
        collection: 'orders'
    }
);

OrderSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

export default mongoose.model<OrderModel>('order', OrderSchema);
