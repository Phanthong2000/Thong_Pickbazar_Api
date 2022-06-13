import mongoose, { Document, Schema } from 'mongoose';
import { CategoryType } from '../interfaces';

export interface CategoryModel extends CategoryType, Document {}

const CategorySchema = new Schema(
    {
        name_en: { type: String, required: true },
        name_vi: { type: String, required: true },
        icon: { type: String, required: true },
        image: { type: String, required: true },
        groupId: { type: String, required: true },
        parentId: { type: String, required: false },
        type: { type: String, required: true },
        detail: { type: String, required: false }
    },
    {
        timestamps: true,
        collection: 'categories'
    }
);

CategorySchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});
export default mongoose.model<CategoryModel>('category', CategorySchema);
