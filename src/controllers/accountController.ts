import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import Account from '../models/account';

const createAccount = (req: Request, res: Response, next: NextFunction) => {
    const account = new Account({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
    });
    return account
        .save()
        .then((account) => res.status(200).json({ account }))
        .catch((error) => res.status(500).json({ error }));
};

const findAllAccount = (req: Request, res: Response, next: NextFunction) => {
    return Account.find()
        .then((accounts) => res.status(200).json({ accounts }))
        .catch((error) => res.status(500).json({ error }));
};

const findAccountById = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return Account.findById(id)
        .then((account) => res.status(200).json({ account }))
        .catch((error) => res.status(500).json({ error }));
};

const updateAccount = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    return Account.findByIdAndUpdate(data.id, { ...data }, { returnOriginal: false })
        .then((account) => res.status(200).json({ account }))
        .catch((error) => res.status(500).json({ error }));
};

const deleteAccount = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return Account.findByIdAndDelete(id)
        .then((account) => res.status(200).json({ account }))
        .catch((error) => res.status(500).json({ error }));
};

const findAccountByUsernamePassword = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    return Account.aggregate([
        {
            $match: { username: data.username, password: data.password }
        }
    ])
        .then((account) => res.status(200).json({ account }))
        .catch((error) => res.status(500).json({ error }));
};

export { createAccount, findAllAccount, findAccountById, deleteAccount, updateAccount, findAccountByUsernamePassword };
