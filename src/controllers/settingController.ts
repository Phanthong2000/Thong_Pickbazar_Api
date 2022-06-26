import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Setting from '../models/setting';

const getSetting = (req: Request, res: Response, next: NextFunction) => {
    return Setting.aggregate([
        {
            $addFields: {
                id: { $toString: '$_id' },
                shippingObjectId: { $toObjectId: '$shippingId' }
            }
        },
        {
            $match: {
                id: '00000001f81c868d2901954f'
            }
        },
        {
            $lookup: {
                from: 'shippings',
                localField: 'shippingObjectId',
                foreignField: '_id',
                as: 'shipping'
            }
        },
        {
            $unwind: '$shipping'
        }
    ])
        .then((settings) => res.status(200).json({ setting: settings[0] }))
        .catch((error) => res.status(500).json({ error }));
};

const saveSetting = (req: Request, res: Response, next: NextFunction) => {
    const setting = new Setting({
        _id: new mongoose.Types.ObjectId('00000001f81c868d2901954f'),
        ...req.body
    });
    return setting
        .save()
        .then((setting) => res.status(200).json({ setting }))
        .catch((error) => res.status(500).json({ error }));
};

const updateSetting = (req: Request, res: Response, next: NextFunction) => {
    return Setting.findByIdAndUpdate('00000001f81c868d2901954f', { ...req.body }, { returnOriginal: false })
        .then((setting) => res.status(200).json({ setting }))
        .catch((error) => res.status(500).json({ error }));
};

export { getSetting, saveSetting, updateSetting };
