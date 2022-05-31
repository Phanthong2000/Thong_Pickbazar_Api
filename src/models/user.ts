import { AccountType } from './../interfaces';

import mongoose, { Schema, Document } from "mongoose";
import { UserType } from '../interfaces/index';

export interface UserModel extends UserType, Document { };

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    accountId: {
        type: String, required: true
    },
}, { timestamps: true })
UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})
export default mongoose.model<UserModel>('user', UserSchema);