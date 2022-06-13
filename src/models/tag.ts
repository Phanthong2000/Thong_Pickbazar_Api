import { TagType } from '../interfaces/index';
import mongoose, { Document, Schema } from "mongoose";

export interface TagModel extends TagType, Document { };

const TagSchema = new Schema({
    name: { type: String, required: true },
    icon: { type: String, required: true },
    slug: { type: String, required: true },
    detail: { type: String, required: false },
    groupId: { type: String, required: true }
}, {
    timestamps: true,
    collection: "tags"
});

TagSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

export default mongoose.model<TagModel>('tag', TagSchema)