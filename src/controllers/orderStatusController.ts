import { Request, Response, NextFunction } from 'express';
import OrderStatus from '../models/orderStatus';
import mongoose from 'mongoose';

const findAllOrderStatus = (req: Request, res: Response, next: NextFunction) => {
    return OrderStatus.find().then((orderStatuses) => res.status(200).json({ orderStatuses })).catch((error) => res.status(500).json({ error }));
}

const createOrderStatus = (req: Request, res: Response, next: NextFunction) => {
    const orderStatus = new OrderStatus({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
    });
    return orderStatus.save().then((orderStatus) => res.status(200).json({ orderStatus })).catch((error) => res.status(500).json({ error }))
}

const findOrderStatusById = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return OrderStatus.findById(id).then((orderStatus) => res.status(200).json({ orderStatus })).catch((error) => res.status(500).json({ error }))
}

const updateOrderStatus = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    return OrderStatus.findByIdAndUpdate(data.id, { ...data }, { returnOriginal: false }).then((orderStatus) => res.status(200).json({ orderStatus })).catch((error) => res.status(500).json({ error }))
}

export {
    findAllOrderStatus,
    createOrderStatus,
    findOrderStatusById,
    updateOrderStatus
}