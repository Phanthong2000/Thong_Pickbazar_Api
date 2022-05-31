import { AccountType } from './../interfaces';
import mongoose, { Document, Schema } from "mongoose";

export interface AccountModel extends AccountType, Document { };

const AccountSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
}, {
    timestamps: true
});

AccountSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})
export default mongoose.model<AccountModel>('account', AccountSchema);