import { Request, Response, NextFunction } from 'express';
import moment from 'moment';
import mongoose from 'mongoose';
import Order from '../models/order';
import Product from '../models/product';
import User from '../models/user';
import { convertDateToNumber, isLeap } from '../utils/convertDateToNumber';

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
    return Order.updateOne({ _id: id }, { orderStatus: status }, { returnOriginal: false })
        .then((order) => res.status(200).json({ order }))
        .catch((error) => res.status(500).json({ error }));
};

const deleteOrder = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return Order.findByIdAndDelete(id)
        .then((order) => res.status(200).json({ order }))
        .catch((error) => res.status(500).json({ error }));
};

const getAnalyticDashboard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const startToday = Date.parse(
            moment(new Date().getTime()).format(`YYYY/MM/DD`)
        );
        const endToday = startToday + 86400000;
        const last30Day = startToday - 2592000000;
        const todayRevenue = await Order.aggregate([
            {
                $addFields: {
                    orderDate: { $toLong: "$createdAt" }
                }
            },
            {
                $match: {
                    $and: [
                        {
                            orderDate: {
                                $gte: startToday
                            },
                        },
                        {
                            orderDate: {
                                $lte: endToday
                            }
                        }
                    ]
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$total" }
                }
            }
        ]);
        const orders30Day = await Order.aggregate([
            {
                $addFields: {
                    orderDate: { $toLong: "$createdAt" }
                }
            },
            {
                $match: {
                    $and: [
                        {
                            orderDate: {
                                $gte: last30Day
                            },
                        },
                        {
                            orderDate: {
                                $lte: endToday
                            }
                        }
                    ]
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: 1 }
                }
            }
        ])
        const revenue30Day = await Order.aggregate([
            {
                $addFields: {
                    orderDate: { $toLong: "$createdAt" }
                }
            },
            {
                $match: {
                    $and: [
                        {
                            orderDate: {
                                $gte: last30Day
                            },
                        },
                        {
                            orderDate: {
                                $lte: endToday
                            }
                        }
                    ]
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$total" }
                }
            }
        ]);

        const totalUser = await User.aggregate([
            {
                $addFields: {
                    roleObjectId: { $toObjectId: '$roleId' },
                    id: { $toString: '$_id' }
                }
            },
            {
                $lookup: {
                    from: 'roles',
                    localField: 'roleObjectId',
                    foreignField: '_id',
                    as: 'role'
                }
            },
            {
                $unwind: '$role'
            },
            {
                $match: {
                    'role.name': 'CUSTOMER',
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: 1 }
                }
            }
        ]);
        const year = new Date().getFullYear();
        const start1 = convertDateToNumber(year, 1, 1, 0, 1);
        const end1 = convertDateToNumber(year, 1, 31, 23, 59);
        const start2 = convertDateToNumber(year, 2, 1, 0, 1);
        let end2 = convertDateToNumber(year, 2, 28, 23, 59);
        if (isLeap(year)) end2 = convertDateToNumber(year, 2, 29, 23, 59);
        const start3 = convertDateToNumber(year, 3, 1, 0, 1);
        const end3 = convertDateToNumber(year, 3, 31, 23, 59);
        const start4 = convertDateToNumber(year, 4, 1, 0, 1);
        const end4 = convertDateToNumber(year, 4, 30, 23, 59);
        const start5 = convertDateToNumber(year, 5, 1, 0, 1);
        const end5 = convertDateToNumber(year, 5, 31, 23, 59);
        const start6 = convertDateToNumber(year, 6, 1, 0, 1);
        const end6 = convertDateToNumber(year, 6, 30, 23, 59);
        const start7 = convertDateToNumber(year, 7, 1, 0, 1);
        const end7 = convertDateToNumber(year, 7, 31, 23, 59);
        const start8 = convertDateToNumber(year, 8, 1, 0, 1);
        const end8 = convertDateToNumber(year, 8, 31, 23, 59);
        const start9 = convertDateToNumber(year, 9, 1, 0, 1);
        const end9 = convertDateToNumber(year, 9, 30, 23, 59);
        const start10 = convertDateToNumber(year, 10, 1, 0, 1);
        const end10 = convertDateToNumber(year, 10, 31, 23, 59);
        const start11 = convertDateToNumber(year, 11, 1, 0, 1);
        const end11 = convertDateToNumber(year, 11, 30, 23, 59);
        const start12 = convertDateToNumber(year, 12, 1, 0, 1);
        const end12 = convertDateToNumber(year, 12, 31, 23, 59);
        const saleHistory = await Order.aggregate([
            {
                $addFields: {
                    orderDate: { $toLong: "$createdAt" },
                }
            },
            {
                $addFields: {
                    month: {
                        $switch: {
                            branches: [
                                {
                                    case: {
                                        $and: [
                                            {
                                                $gte: ["$orderDate", start1]
                                            },
                                            {
                                                $lte: ["$orderDate", end1]
                                            }
                                        ]
                                    },
                                    then: 1
                                },
                                {
                                    case: {
                                        $and: [
                                            {
                                                $gte: ["$orderDate", start2]
                                            },
                                            {
                                                $lte: ["$orderDate", end2]
                                            }
                                        ]
                                    },
                                    then: 2
                                },
                                {
                                    case: {
                                        $and: [
                                            {
                                                $gte: ["$orderDate", start3]
                                            },
                                            {
                                                $lte: ["$orderDate", end3]
                                            }
                                        ]
                                    },
                                    then: 3
                                },
                                {
                                    case: {
                                        $and: [
                                            {
                                                $gte: ["$orderDate", start4]
                                            },
                                            {
                                                $lte: ["$orderDate", end4]
                                            }
                                        ]
                                    },
                                    then: 4
                                },
                                {
                                    case: {
                                        $and: [
                                            {
                                                $gte: ["$orderDate", start5]
                                            },
                                            {
                                                $lte: ["$orderDate", end5]
                                            }
                                        ]
                                    },
                                    then: 5
                                },
                                {
                                    case: {
                                        $and: [
                                            {
                                                $gte: ["$orderDate", start6]
                                            },
                                            {
                                                $lte: ["$orderDate", end6]
                                            }
                                        ]
                                    },
                                    then: 6
                                },
                                {
                                    case: {
                                        $and: [
                                            {
                                                $gte: ["$orderDate", start7]
                                            },
                                            {
                                                $lte: ["$orderDate", end7]
                                            }
                                        ]
                                    },
                                    then: 7
                                },
                                {
                                    case: {
                                        $and: [
                                            {
                                                $gte: ["$orderDate", start8]
                                            },
                                            {
                                                $lte: ["$orderDate", end8]
                                            }
                                        ]
                                    },
                                    then: 8
                                },
                                {
                                    case: {
                                        $and: [
                                            {
                                                $gte: ["$orderDate", start9]
                                            },
                                            {
                                                $lte: ["$orderDate", end9]
                                            }
                                        ]
                                    },
                                    then: 9
                                },
                                {
                                    case: {
                                        $and: [
                                            {
                                                $gte: ["$orderDate", start10]
                                            },
                                            {
                                                $lte: ["$orderDate", end10]
                                            }
                                        ]
                                    },
                                    then: 10
                                },
                                {
                                    case: {
                                        $and: [
                                            {
                                                $gte: ["$orderDate", start11]
                                            },
                                            {
                                                $lte: ["$orderDate", end11]
                                            }
                                        ]
                                    },
                                    then: 11
                                },
                                {
                                    case: {
                                        $and: [
                                            {
                                                $gte: ["$orderDate", start12]
                                            },
                                            {
                                                $lte: ["$orderDate", end12]
                                            }
                                        ]
                                    },
                                    then: 12
                                }
                            ],
                            default: 0
                        }
                    }
                }
            },
            {
                $group: {
                    _id: "$month",
                    order: { $sum: 1 },
                    revenue: { $sum: "$total" }
                }
            },
            {
                $sort: {
                    _id: 1
                }
            }
        ]);
        const saleHistoryOrder = [];
        const saleHistoryRevenue = [];
        for (let i = 1; i <= 12; i++) {
            let flag = false;
            saleHistory.forEach((item) => {
                if (item._id === i) {
                    saleHistoryOrder.push(item.order);
                    saleHistoryRevenue.push(item.revenue)
                    flag = true
                }
            })
            if (!flag) {
                saleHistoryOrder.push(0);
                saleHistoryRevenue.push(0)
            }
        }
        console.log(saleHistoryOrder, saleHistoryRevenue)
        return res.status(200).json({
            dashboard: {
                todayRevenue: todayRevenue[0].total,
                orders30Day: orders30Day[0].total,
                revenue30Day: revenue30Day[0].total,
                totalUser: totalUser[0].total,
                saleHistory: {
                    orders: saleHistoryOrder,
                    revenue: saleHistoryRevenue
                }
            }
        })
    } catch (error) {
        return res.status(500).json({ error })
    }

}


export { findAllOrders, createOrder, updateOrder, deleteOrder, getOrderById, getAnalyticDashboard };
