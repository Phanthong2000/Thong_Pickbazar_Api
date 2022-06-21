import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Shipping from '../models/shipping';

const findAllShippings = (req: Request, res: Response, next: NextFunction) => {
    return Shipping.find()
        .then((shippings) => res.status(200).json({ shippings }))
        .catch((error) => res.status(500).json({ error }));
};

const createShipping = (req: Request, res: Response, next: NextFunction) => {
    const shipping = new Shipping({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
    });
    return shipping
        .save()
        .then((shipping) => res.status(200).json({ shipping }))
        .catch((error) => res.status(500).json({ error }));
};

const deleteShipping = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return Shipping.findByIdAndDelete(id)
        .then((shipping) => res.status(200).json({ shipping }))
        .catch((error) => res.status(500).json({ error }));
};

const updateShipping = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    return Shipping.findByIdAndUpdate(data.id, { ...data }, { returnOriginal: false })
        .then((shipping) => res.status(200).json({ shipping }))
        .catch((error) => res.status(500).json({ error }));
};

const getShippingByName = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.params;
    return Shipping.findOne({ name: name })
        .then((shipping) => res.status(200).json({ shipping }))
        .catch((error) => res.status(500).json({ error }));
};

export { findAllShippings, createShipping, deleteShipping, updateShipping, getShippingByName };
