import { RoleType } from './../interfaces/index';
import mongoose, { Document, Schema } from "mongoose";

export interface RoleModel extends RoleType, Document { };

const RoleSchema = new Schema({
    name: { type: String, required: true },
}, {
    timestamps: true,
    collection: 'roles'
})

RoleSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

export default mongoose.model<RoleModel>('role', RoleSchema)