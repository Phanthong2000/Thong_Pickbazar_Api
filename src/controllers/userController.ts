import { Request, Response, NextFunction } from "express";
import User from '../models/user';
import mongoose from "mongoose";

const findAllUsers = (req: Request, res: Response, next: NextFunction) => {
    return User.find().then((users) => res.status(200).json({ users })).catch((error) => res.status(500).json({ error }))
}

export {
    findAllUsers
}