import mongoose, { Schema, Document } from 'mongoose';
import { UserType } from '../interfaces';

export interface UserModel extends UserType, Document {}

const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        avatar: { type: String, required: true },
        birthday: { type: Date, required: false },
        status: { type: String, required: true },
        address: { type: Object, required: true },
        username: { type: String, required: true },
        password: { type: String, required: true },
        roleId: { type: String, required: true },
        refreshToken: { type: String, required: false }
    },
    {
        timestamps: true,
        collection: 'users'
    }
);

UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});
export default mongoose.model<UserModel>('user', UserSchema);
