import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Order from '../models/order';
import Product from '../models/product';

const findAllOrders = (req: Request, res: Response, next: NextFunction) => {
    return Order.aggregate([
        {
            $addFields: {
                id: { $toString: '$_id' },
                customerObjectId: { $toObjectId: '$customerId' },
                orderDate: { $toLong: '$createdAt' }
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'customerObjectId',
                foreignField: '_id',
                as: 'customer'
            }
        },
        {
            $lookup: {
                from: 'orderStatuses',
                localField: 'orderStatus',
                foreignField: 'serial',
                as: 'orderStatusOrder'
            }
        },
        {
            $unwind: '$customer'
        },
        {
            $unwind: '$orderStatusOrder'
        },
        {
            $sort: {
                orderDate: -1
            }
        }
    ])
        .then((orders) => res.status(200).json({ orders }))
        .catch((error) => res.status(500).json({ error }));
};

const getOrderById = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return Order.aggregate([
        {
            $addFields: {
                id: { $toString: '$_id' },
                customerObjectId: { $toObjectId: '$customerId' },
                orderDate: { $toLong: '$createdAt' }
            }
        },
        {
            $match: {
                id
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'customerObjectId',
                foreignField: '_id',
                as: 'customer'
            }
        },
        {
            $lookup: {
                from: 'orderStatuses',
                localField: 'orderStatus',
                foreignField: 'serial',
                as: 'orderStatusOrder'
            }
        },
        {
            $unwind: '$customer'
        },
        {
            $unwind: '$orderStatusOrder'
        }
    ])
        .then(async (orders) => {
            const data: any[] = [];
            await orders[0].products.forEach(async (item: any) => {
                const result = await Product.findById(item.productId);
                data.push({
                    ...item,
                    product: result
                });
                if (data.length === orders[0].products.length) {
                    return res.status(200).json({
                        order: {
                            ...orders[0],
                            products: data
                        }
                    });
                }
            });
        })
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

export { findAllOrders, createOrder, updateOrder, deleteOrder, getOrderById };
