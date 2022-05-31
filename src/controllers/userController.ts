import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
const bcrypt = require('bcryptjs');
import User from '../models/user';
import Account from '../models/account';
import { getAccountById } from '../services';

const createUser = (req: Request, res: Response, next: NextFunction) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
    });
    return user
        .save()
        .then((user) => res.status(200).json({ user }))
        .catch((error) => res.status(500).json({ error }));
};
// const findAllUser = async (req: Request, res: Response, next: NextFunction) => {
//     return User.find()
//         .then(async (users) => {
//             if (users.length === 0) return res.status(200).json({ users });
//             const result: any = [];
//             await users.forEach(async (user) => {
//                 console.log('first');
//                 const item = await getAccountById(user.accountId);
//                 result.push({
//                     id: user.id,
//                     name: user.name,
//                     age: user.age,
//                     createAt: user.createAt,
//                     account: {
//                         id: user.accountId,
//                         username: item?.username,
//                         password: item?.password,
//                         createAt: item?.createAt
//                     }
//                 });
//                 if (result.length === users.length) {
//                     res.status(200).json({ users: result });
//                 }
//             });
//         })
//         .catch((error) => res.status(500).json({ error }));
// };

const findAllUser = (req: Request, res: Response, next: NextFunction) => {
    bcrypt.genSalt(10, (err: any, salt: any) => {
        bcrypt.hash('123456', salt, function (err: any, hash: any) {
            console.log(hash);
        });
    });
    bcrypt.compare('123456', '$2a$10$suhLi3wh8TcML4MFooYrJ.9qZW9.9WUaUWARcoahbBAjXvdLShty6', function (err: any, res: any) {
        console.log(res);
    });
    return User.aggregate([
        {
            $addFields: {
                accountObjectId: { $toObjectId: '$accountId' }
            }
        },
        {
            $lookup: {
                from: 'accounts',
                localField: 'accountObjectId',
                foreignField: '_id',
                as: 'account'
            }
        },
        {
            $unwind: '$account'
        },
        {
            $addFields: {
                id: '$_id',
                'account.id': '$account._id'
            }
        },
        {
            $project: {
                accountId: 0,
                _id: 0,
                accountObjectId: 0,
                'account._id': 0
            }
        }
    ])
        .then((users) => res.status(200).json({ users }))
        .catch((error) => res.status(error).json({ error }));
};

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return User.findByIdAndDelete(id)
        .then((user) => res.status(200).json({ user }))
        .catch((error) => res.status(500).json(error));
};

const findById = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return User.findById(id)
        .then((user) => res.status(200).json({ user }))
        .catch((error) => res.status(500).json({ error }));
};
const updateUser = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    return User.findByIdAndUpdate(data.id, { ...data }, { returnOriginal: false })
        .then((user) => res.status(200).json({ user }))
        .catch((error) => res.status(500).json({ error }));
};

const findUserByUsernameAndPassword = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    return User.aggregate([
        {
            $addFields: {
                accountObjectId: { $toObjectId: '$accountId' }
            }
        },
        {
            $lookup: {
                from: 'accounts',
                localField: 'accountObjectId',
                foreignField: '_id',
                as: 'account'
            }
        },
        {
            $unwind: '$account'
        },
        {
            $match: {
                'account.username': data.username,
                'account.password': data.password
            }
        },
        {
            $addFields: {
                id: '$_id',
                'account.id': '$account._id'
            }
        },
        {
            $project: {
                accountId: 0,
                _id: 0,
                accountObjectId: 0,
                'account._id': 0
            }
        }
    ])
        .then((users) => res.status(200).json({ user: users.at(0) }))
        .catch((error) => res.status(error).json({ error }));
};
export { findById, createUser, findAllUser, deleteUser, updateUser, findUserByUsernameAndPassword };
