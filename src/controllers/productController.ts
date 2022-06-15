import mongoose from 'mongoose';
import { Request, Response, NextFunction } from "express";
import Product from '../models/product';

const findAllProducts = (req: Request, res: Response, next: NextFunction) => {
    return Product
        .aggregate([
            {
                $addFields: {
                    groupObjectId: { $toObjectId: "$groupId" },
                    id: { $toString: "$_id" }
                }
            },
            {
                $lookup: {
                    from: "groups",
                    localField: "groupObjectId",
                    foreignField: "_id",
                    as: "group"
                }
            },
            {
                $unwind: "$group"
            },
            {
                $project: {
                    groupId: 0,
                    _id: 0,
                    groupObjectId: 0,
                }
            }
        ]).then((products) => res.status(200).json({ products })).catch((error) => res.status(500).json({ error }))
}

const createProduct = (req: Request, res: Response, next: NextFunction) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
    });
    return product.save().then((product) => res.status(200).json({ product })).catch((error) => res.status(500).json({ error }))
}

const deleteProduct = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return Product.findByIdAndDelete(id).then((product) => res.status(200).json({ product })).catch((error) => res.status(500).json({ error }))
}

export {
    findAllProducts,
    createProduct,
    deleteProduct
}