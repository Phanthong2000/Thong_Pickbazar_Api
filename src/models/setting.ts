import mongoose, { Schema, Document } from 'mongoose';
import { SettingType } from '../interfaces';

export interface SettingModel extends SettingType, Document { }

const SettingSchema = new Schema(
    {
        logo: { type: String, required: true },
        title: { type: String, required: true },
        subTitle: { type: String, required: true },
        currency: { type: String, required: true },
        minimumOrderAmount: { type: Number, required: true },
        otpCheckOut: { type: Boolean, required: true },
        shippingId: { type: String, required: true },
        seo: {
            metaTitle: { type: String, required: true },
            metaDescription: { type: String, required: true },
            metaTags: { type: String, required: true },
            canonicalUrl: { type: String, required: true },
            ogTitle: { type: String, required: true },
            ogDescription: { type: String, required: true },
            ogImage: { type: String, required: true },
            twitterHandle: { type: String, required: true },
            twitterCardType: { type: String, required: true }
        },
        deliverySchedule: [
            {
                title: { type: String, required: true },
                description: { type: String, required: true }
            }
        ],
        shop: {
            address: { type: String, required: true },
            phone: { type: String, required: true },
            website: { type: String, required: true },
            social: [
                {
                    icon: { type: String, required: true },
                    name: { type: String, required: true },
                    url: { type: String, required: true }
                }
            ]
        }
    },
    {
        timestamps: true,
        collection: 'setting'
    }
);

SettingSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

export default mongoose.model<SettingModel>('setting', SettingSchema);
