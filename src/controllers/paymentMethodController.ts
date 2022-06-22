import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import PaymentMethod from "../models/paymentMethod";

const findAllPaymentMethod = (req: Request, res: Response, next: NextFunction) => {
    return PaymentMethod.
        aggregate([
            {
                $match: {
                    type: "parent"
                }
            },
            {
                $addFields: {
                    id: { $toString: "$_id" }
                }
            },
            {
                $lookup: {
                    from: "paymentMethods",
                    localField: "id",
                    foreignField: "parentId",
                    as: "child"
                }
            },
        ])
        .then((paymentMethods) => res.status(200).json({ paymentMethods })).catch((error) => res.status(500).json({ error }))
}

const createPaymentMethod = (req: Request, res: Response, next: NextFunction) => {
    const coupon = new PaymentMethod({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
    });
    return coupon.save().then((paymentMethod) => res.status(200).json({ paymentMethod })).catch((error) => res.status(500).json({ error }))
}

const deletePaymentMethod = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return PaymentMethod.findByIdAndDelete(id).then((paymentMethod) => res.status(200).json({ paymentMethod })).catch((error) => res.status(500).json({ error }))
}

const findPaymentMethodById = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return PaymentMethod.
        aggregate([
            {
                $addFields: {
                    id: { $toString: "$_id" }
                }
            },
            {
                $match: {
                    id: id
                }
            },
            {
                $lookup: {
                    from: "paymentMethods",
                    localField: "id",
                    foreignField: "parentId",
                    as: "child"
                }
            },
        ])
        .then((paymentMethods) => res.status(200).json({ paymentMethod: paymentMethods.at(0) })).catch((error) => res.status(500).json({ error }))
}

const updatePaymentMethod = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    return PaymentMethod.findByIdAndUpdate(data.id, { ...data }, { returnOriginal: false }).then((paymentMethod) => res.status(200).json({ paymentMethod })).catch((error) => res.status(500).json({ error }))
}

const updateStatusPaymentMethod = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { status } = req.body;
    return PaymentMethod.updateOne({ _id: id }, { status }, { returnOriginal: false }).then((paymentMethod) => res.status(200).json({ paymentMethod })).catch((error) => res.status(500).json({ error }))
}

export {
    createPaymentMethod,
    deletePaymentMethod,
    findPaymentMethodById,
    findAllPaymentMethod,
    updateStatusPaymentMethod,
    updatePaymentMethod
}