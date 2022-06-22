import { PaymentMethodType } from './../interfaces/index';
import mongoose, { Document, Schema } from "mongoose";

export interface PaymentMethodModel extends PaymentMethodType, Document { };

const PaymentMethodSchema = new Schema({
    name: { type: String, required: true },
    status: { type: String, required: true },
    image: { type: String, required: true },
    type: { type: String, required: true },
    parentId: { type: String, required: false }
}, {
    timestamps: true,
    collection: 'paymentMethods'
})

PaymentMethodSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

export default mongoose.model<PaymentMethodModel>('paymentMethod', PaymentMethodSchema)