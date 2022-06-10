import { GroupType } from './../interfaces/index';
import mongoose, { Document, Schema } from "mongoose";

export interface GroupModel extends GroupType, Document { }

const GroupSchema = new Schema({
    name_vi: { type: String, required: true },
    name_en: { type: String, required: true },
    icon: { type: String, required: true },
    layout: { type: String, required: true },
    productCard: { type: String, required: true },
    sliders: { type: Array, required: true },
    banner:
    {
        title_vi: { type: String, required: false },
        title_en: { type: String, required: false },
        description_vi: { type: String, required: false },
        description_en: { type: String, required: false },
        gallery: { type: String, required: false }
    }
}, {
    timestamps: true,
    collection: "groups"
})
GroupSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});
export default mongoose.model<GroupModel>("group", GroupSchema);