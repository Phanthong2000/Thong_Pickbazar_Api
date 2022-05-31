import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import User from '../models/user';
import Account from '../models/account';
import { getAccountById } from '../services'

const createUser = (req: Request, res: Response, next: NextFunction) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
    });
    return user.save().then((user) => res.status(200).json({ user })).catch((error) => res.status(500).json({ error }))
}
const findAllUser = async (req: Request, res: Response, next: NextFunction) => {
    return User.find().then(async (users) => {
        const result: any = [];
        await users.forEach(async (user) => {
            const item = await getAccountById(user.accountId);
            result.push({
                ...user,
                account: {
                    id: user.accountId,
                }
            });
        })
        setTimeout(() => res.status(200).json({ users: result }), 100)
        // console.log('result', result)
    }).catch((error) => res.status(500).json({ error }))
}

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return User.findByIdAndDelete(id).then((user) => res.status(200).json({ user })).catch((error) => res.status(500).json(error))
}

const findById = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return User.findById(id).then((user) => res.status(200).json({ user })).catch((error) => res.status(500).json({ error }))
}
const updateUser = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    return User.findByIdAndUpdate(data.id, { ...data }, { returnOriginal: false }).then((user) => res.status(200).json({ user })).catch((error) => res.status(500).json({ error }))
}
export {
    findById,
    createUser,
    findAllUser,
    deleteUser,
    updateUser
}