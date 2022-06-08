import mongoose, { Schema, Document } from 'mongoose';
import { UserType } from '../interfaces/index';

export interface UserModel extends UserType, Document { }

const CustomerSchema: Schema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    roleId: { type: String, required: true },
    accessToken: { type: String, default: "" },
    refreshToken: { type: String, default: "" }
}, {
    timestamps: true,
    collection: 'customers'
});
CustomerSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});
export default mongoose.model<UserModel>('customer', CustomerSchema);
