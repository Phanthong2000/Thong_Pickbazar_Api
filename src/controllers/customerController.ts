import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
const bcrypt = require('bcryptjs');
import Customer from '../models/customer';
import Role from '../models/role';
import { generateToken } from '../utils/JWT';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    // const user = new User({
    //     _id: new mongoose.Types.ObjectId(),
    //     ...req.body
    // });
    // return user
    //     .save()
    //     .then((user) => res.status(200).json({ user }))
    //     .catch((error) => res.status(500).json({ error }));
    const roleName = "CUSTOMER";
    const role = await Role.aggregate([
        {
            $match: {
                name: roleName
            }
        }
    ]);
    const customer = new Customer({
        _id: new mongoose.Types.ObjectId(),
        ...req.body,
        roleId: role[0]._id
    })
    return customer
        .save()
        .then((customer) => res.status(200).json({ customer }))
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


// db.users.aggregate([{ $addFields: { accountObjectId: { $toObjectId: "$accountId" } } }, { $lookup: { from: "accounts", localField: "accountObjectId", foreignField: "_id", as: "account" } }, { $unwind: "$account" }, { $addFields: { "account.roleObjectId": { $toObjectId: "$account.roleId" } } }, { $lookup: { from: "roles", localField: "account.roleObjectId", foreignField: "_id", as: "account.role" } }, { $unwind: "$account.role" }])
const findAllUser = (req: Request, res: Response, next: NextFunction) => {
    bcrypt.genSalt(10, (err: any, salt: any) => {
        bcrypt.hash('123456', salt, function (err: any, hash: any) {
            console.log(hash);
        });
    });
    bcrypt.compare('123456', '$2a$10$suhLi3wh8TcML4MFooYrJ.9qZW9.9WUaUWARcoahbBAjXvdLShty6', function (err: any, res: any) {
        console.log(res);
    });
    return Customer.aggregate([
        {
            $addFields: {
                roleObjectId: { $toObjectId: '$roleId' },
                id: "$_id"
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
            $addFields: {
                "role.id": "$roleId"
            }
        },
        {
            $project: {
                roleId: 0,
                roleObjectId: 0,
                _id: 0,
                "role._id": 0
            }
        }
    ])
        .then((customers) => res.status(200).json({ customers }))
        .catch((error) => res.status(error).json({ error }));
};

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return Customer.findByIdAndDelete(id)
        .then((customer) => res.status(200).json({ customer }))
        .catch((error) => res.status(500).json(error));
};

const findById = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return Customer.findById(id)
        .then((customer) => res.status(200).json({ customer }))
        .catch((error) => res.status(500).json({ error }));
};
const updateUser = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    return Customer.findByIdAndUpdate(data.id, { ...data }, { returnOriginal: false })
        .then((customer) => res.status(200).json({ customer }))
        .catch((error) => res.status(500).json({ error }));
};

const findUserByUsernameAndPassword = (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    return Customer.aggregate([
        {
            $match:
                { username, password }
        },
        {
            $addFields:
            {
                roleObjectId: { $toObjectId: "$roleId" },
                id: "$_id"
            }
        },
        { $lookup: { from: "roles", localField: "roleObjectId", foreignField: "_id", as: "role" } },
        { $unwind: "$role" },
        {
            $addFields: {
                "role.id": "$roleId"
            }
        },
        { $project: { roleObjectId: 0, roleId: 0, _id: 0, "role._id": 0 } }])
        .then(async (customers) => {
            const token = await generateToken(customers.at(0), process.env.TOKEN_SECRET_KEY, process.env.ACCESS_TOKEN_LIFE);
            console.log(token);
            res.status(200).json({
                customer: {
                    ...customers.at(0),
                    accessToken: token
                }
            })
        })
        .catch((error) => res.status(error).json({ error }));
};
export { findById, createUser, deleteUser, updateUser, findUserByUsernameAndPassword };
