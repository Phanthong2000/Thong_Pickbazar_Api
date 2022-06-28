import { Request, Response, NextFunction } from 'express';
import Notification from '../models/notification';
import mongoose from 'mongoose';

const findAllNotification = (req: Request, res: Response, next: NextFunction) => {
    return Notification.find().then((notifications) => res.status(200).json({ notifications })).catch((error) => res.status(500).json({ error }))
}

const createNotification = (req: Request, res: Response, next: NextFunction) => {
    const notification = new Notification({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
    })
    notification.save().then((notification) => res.status(200).json({ notification })).catch((error) => res.status(500).json({ error }))
}

export {
    findAllNotification,
    createNotification
}