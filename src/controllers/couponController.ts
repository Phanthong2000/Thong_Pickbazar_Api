import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Coupon from '../models/coupon';

const findAllCoupons = (req: Request, res: Response, next: NextFunction) => {
    return Coupon.find().then((coupons) => res.status(200).json({ coupons })).catch((error) => res.status(500).json({ error }))
}

const createCoupon = (req: Request, res: Response, next: NextFunction) => {
    const coupon = new Coupon({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
    });
    return coupon.save().then((coupon) => res.status(200).json({ coupon })).catch((error) => res.status(500).json({ error }))
}

const deleteCoupon = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return Coupon.findByIdAndDelete(id).then((coupon) => res.status(200).json({ coupon })).catch((error) => res.status(500).json({ error }))
}

const findCouponById = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return Coupon.findById(id).then((coupon) => res.status(200).json({ coupon })).catch((error) => res.status(500).json({ error }))
}

const updateCoupon = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    return Coupon.findByIdAndUpdate(data.id, { ...data }, { returnOriginal: false }).then((coupon) => res.status(200).json({ coupon })).catch((error) => res.status(500).json({ error }))
}

const getCouponByCode = (req: Request, res: Response, next: NextFunction) => {
    const { code } = req.params;
    return Coupon.findOne({ code: code }).then((coupon) => res.status(200).json({ coupon })).catch((error) => res.status(500).json({ error }))
}

export {
    findAllCoupons,
    createCoupon,
    deleteCoupon,
    findCouponById,
    updateCoupon,
    getCouponByCode
}