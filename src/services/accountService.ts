import Account from '../models/account';
import { Response, Request, NextFunction } from 'express';

export const getAccountById = async (id: string) => {
    try {
        const result = await Account.findById(id);
        return result;
    } catch (error) {
        console.log(error);
    }
};
