import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import Account from '../models/account';

const createAccount = (req: Request, res: Response, next: NextFunction) => {
    const account = new Account({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
    });
    return account.save().then((account) => res.status(200).json({ account })).catch((error) => res.status(500).json({ error }))
}

const findAllAccount = (req: Request, res: Response, next: NextFunction) => {
    return Account.find().then((accounts) => res.status(200).json({ accounts })).catch((error) => res.status(500).json({ error }))
}

export {
    createAccount,
    findAllAccount
}