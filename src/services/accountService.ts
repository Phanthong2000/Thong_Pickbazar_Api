import Account from "../models/account"
import { Response, Request, NextFunction } from "express"

export const getAccountById = async (id: string) => {
    try {
        const result = await Account.findById("629604f7caba0c2354925b06");
        return result;
    } catch (error) {
        console.log(error)
    }
}