import mongoose, { Schema, Document } from "mongoose";
import { CouponType } from "../interfaces";

export interface CouponModel extends CouponType, Document { };

const CouponSchema = new Schema({
    code: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: false },
    type: { type: String, required: true },
    amount: { type: Number, required: true },
    from: { type: Date, required: true },
    to: { type: Date, required: true }
}, {
    timestamps: true,
    collection: 'coupons'
})

CouponSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

export default mongoose.model<CouponModel>('coupon', CouponSchema)