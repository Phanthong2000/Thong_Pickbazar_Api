import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import Product from '../models/product';

const findAllProducts = (req: Request, res: Response, next: NextFunction) => {
    return Product.aggregate([
        {
            $addFields: {
                groupObjectId: { $toObjectId: '$groupId' },
                id: { $toString: '$_id' }
            }
        },
        {
            $lookup: {
                from: 'groups',
                localField: 'groupObjectId',
                foreignField: '_id',
                as: 'group'
            }
        },
        {
            $unwind: '$group'
        },
        {
            $project: {
                groupId: 0,
                _id: 0,
                groupObjectId: 0
            }
        }
    ])
        .then((products) => res.status(200).json({ products }))
        .catch((error) => res.status(500).json({ error }));
};

const createProduct = (req: Request, res: Response, next: NextFunction) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
    });
    return product
        .save()
        .then((product) => res.status(200).json({ product }))
        .catch((error) => res.status(500).json({ error }));
};

const deleteProduct = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return Product.findByIdAndDelete(id)
        .then((product) => res.status(200).json({ product }))
        .catch((error) => res.status(500).json({ error }));
};

const getProductsByGroupId = (req: Request, res: Response, next: NextFunction) => {
    const { groupId } = req.params;
    const { langcode } = req.headers;
    return Product.aggregate([
        {
            $addFields: {
                quantity: {
                    $switch: {
                        branches: [
                            {
                                case: {
                                    $eq: ['$type', 'simple']
                                },
                                then: '$simple.quantity'
                            },
                            {
                                case: {
                                    $eq: ['$type', 'variable']
                                },
                                then: '$variable.quantity'
                            }
                        ],
                        default: 0
                    }
                }
            }
        },
        {
            $match: {
                groupId,
                status: 'public',
                quantity: { $gt: 0 }
            }
        },
        {
            $unwind: '$categories'
        },
        {
            $addFields: {
                categoryObjectId: { $toObjectId: '$categories' }
            }
        },
        {
            $lookup: {
                from: 'categories',
                localField: 'categoryObjectId',
                foreignField: '_id',
                as: 'category'
            }
        },
        {
            $unwind: '$category'
        },
        {
            $group: {
                _id: '$_id',
                arrCategories: {
                    $push: '$category'
                }
            }
        },
        {
            $addFields: {
                productObjectId: { $toObjectId: '$_id' }
            }
        },
        {
            $lookup: {
                from: 'products',
                localField: 'productObjectId',
                foreignField: '_id',
                as: 'product'
            }
        },
        {
            $unwind: '$product'
        },
        {
            $addFields: {
                'product.name': `$product.name_${langcode}`,
                'product.groupObjectId': { $toObjectId: '$product.groupId' },
                "product.toInt": { $toLong: '$product.createdAt' }
            }
        },
        {
            $sort: {
                "product.toInt": 1
            }
        },
        {
            $lookup: {
                from: 'groups',
                localField: 'product.groupObjectId',
                foreignField: '_id',
                as: 'product.group'
            }
        },
        {
            $unwind: '$product.group'
        },
    ])
        .then((products) => res.status(200).json({ products }))
        .catch((error) => res.status(500).json({ error }));
};

const getProductsByCategoryId = (req: Request, res: Response, next: NextFunction) => {
    const { categoryId } = req.params;
    const { langcode } = req.headers;
    return Product.aggregate([
        {
            $addFields: {
                quantity: {
                    $switch: {
                        branches: [
                            {
                                case: {
                                    $eq: ['$type', 'simple']
                                },
                                then: '$simple.quantity'
                            },
                            {
                                case: {
                                    $eq: ['$type', 'variable']
                                },
                                then: '$variable.quantity'
                            }
                        ],
                        default: 0
                    }
                }
            }
        },
        {
            $match: {
                status: 'public',
                quantity: { $gt: 0 }
            }
        },
        {
            $unwind: "$categories"
        },
        {
            $match: {
                categories: categoryId
            }
        },
        {
            $project: {
                _id: 1
            }
        },
        {
            $addFields: {
                productObjectId: { $toObjectId: '$_id' }
            }
        },
        {
            $lookup: {
                from: 'products',
                localField: 'productObjectId',
                foreignField: '_id',
                as: 'product'
            }
        },
        {
            $unwind: '$product'
        },
        {
            $unwind: '$product.categories'
        },
        {
            $addFields: {
                "product.categoryObjectId": { $toObjectId: '$product.categories' }
            }
        },
        {
            $lookup: {
                from: 'categories',
                localField: 'product.categoryObjectId',
                foreignField: '_id',
                as: 'product.category'
            }
        },
        {
            $unwind: '$product.category'
        },
        {
            $group: {
                _id: '$_id',
                arrCategories: {
                    $push: '$product.category'
                }
            }
        },
        {
            $addFields: {
                productObjectId: { $toObjectId: '$_id' }
            }
        },
        {
            $lookup: {
                from: 'products',
                localField: 'productObjectId',
                foreignField: '_id',
                as: 'product'
            }
        },
        {
            $unwind: '$product'
        },
        {
            $addFields: {
                'product.name': `$product.name_${langcode}`,
                'product.groupObjectId': { $toObjectId: '$product.groupId' },
                "product.toInt": { $toLong: '$product.createdAt' }
            }
        },
        {
            $sort: {
                "product.toInt": 1
            }
        },
        {
            $lookup: {
                from: 'groups',
                localField: 'product.groupObjectId',
                foreignField: '_id',
                as: 'product.group'
            }
        },
        {
            $unwind: '$product.group'
        },
    ]).then((products) => res.status(200).json({ products }))
        .catch((error) => res.status(500).json({ error }));
}

export { findAllProducts, createProduct, deleteProduct, getProductsByGroupId, getProductsByCategoryId };
