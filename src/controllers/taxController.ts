import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Tax from '../models/tax';

const findAllTaxes = (req: Request, res: Response, next: NextFunction) => {
    return Tax.find().then((taxes) => res.status(200).json({ taxes })).catch((error) => res.status(500).json({ error }))
}

const createTax = (req: Request, res: Response, next: NextFunction) => {
    const coupon = new Tax({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
    });
    return coupon.save().then((tax) => res.status(200).json({ tax })).catch((error) => res.status(500).json({ error }))
}

const deleteTax = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return Tax.findByIdAndDelete(id).then((tax) => res.status(200).json({ tax })).catch((error) => res.status(500).json({ error }))
}

const findTaxById = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return Tax.findById(id).then((tax) => res.status(200).json({ tax })).catch((error) => res.status(500).json({ error }))
}

const updateTax = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    return Tax.findByIdAndUpdate(data.id, { ...data }, { returnOriginal: false }).then((tax) => res.status(200).json({ tax })).catch((error) => res.status(500).json({ error }))
}

const getTaxByName = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.params;
    return Tax.findOne({ name: name }).then((tax) => res.status(200).json({ tax })).catch((error) => res.status(500).json({ error }))
}

const updateStatus = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { status } = req.body;
    return Tax.updateOne({ _id: id }, { status }, { returnOriginal: false }).then((tax) => res.status(200).json({ tax })).catch((error) => res.status(500).json({ error }))
}

export {
    findAllTaxes,
    createTax,
    deleteTax,
    findTaxById,
    updateTax,
    getTaxByName,
    updateStatus
}