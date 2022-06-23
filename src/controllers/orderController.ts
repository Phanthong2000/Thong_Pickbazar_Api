import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Order from '../models/order';

const findAllOrders = (req: Request, res: Response, next: NextFunction) => {
    return Order.find()
        .then((orders) => res.status(200).json({ orders }))
        .catch((error) => res.status(500).json({ error }));
};

const createOrder = (req: Request, res: Response, next: NextFunction) => {
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
    });
    return order
        .save()
        .then((order) => res.status(200).json({ order }))
        .catch((error) => res.status(500).json({ error }));
};

const updateOrder = (req: Request, res: Response, next: NextFunction) => {
    const { id, status } = req.body;
    return Order.updateOne({ _id: id }, { orderStatusId: status }, { returnOriginal: false })
        .then((order) => res.status(200).json({ order }))
        .catch((error) => res.status(500).json({ error }));
};

const deleteOrder = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return Order.findByIdAndDelete(id)
        .then((order) => res.status(200).json({ order }))
        .catch((error) => res.status(500).json({ error }));
};

export { findAllOrders, createOrder, updateOrder, deleteOrder };
