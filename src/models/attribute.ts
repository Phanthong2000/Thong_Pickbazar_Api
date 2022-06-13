import mongoose, { Document, Schema } from "mongoose";
import { AttributeType } from "../interfaces";

export interface AttributeModel extends AttributeType, Document { };

const AttributeSchema = new Schema({
    name_vi: { type: String, required: true },
    name_en: { type: String, required: true },
    values: [
        {
            value: { type: String, required: true },
            meta: { type: String, required: false }
        }
    ]
}, {
    timestamps: true,
    collection: 'attributes'
})

AttributeSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

export default mongoose.model<AttributeModel>('attribute', AttributeSchema)