import mongoose, { Schema, Document } from "mongoose";
import { ContactType } from "../interfaces";

export interface ContactModel extends ContactType, Document { };

const ContactSchema = new Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    subject: { type: String, required: true },
    content: { type: String, required: true },
    isRead: { type: Boolean, required: true }
}, {
    timestamps: true,
    collection: 'contacts'
});

ContactSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

export default mongoose.model<ContactModel>('contact', ContactSchema)