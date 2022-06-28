import mongoose, { Schema, Document } from "mongoose";
import { NotificationType } from "../interfaces";

export interface NotificationModel extends NotificationType, Document { };

const NotificationSchema = new Schema({
    content: { type: String, required: true },
    type: { type: String, required: true },
    isRead: { type: Boolean, required: true },
    senderId: { type: String, required: true },
    messageId: { type: String, required: false },
    orderId: { type: String, required: false },
}, {
    timestamps: true,
    collection: 'notifications'
});
NotificationSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});
export default mongoose.model<NotificationModel>('notification', NotificationSchema);