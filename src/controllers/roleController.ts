import { Response, Request, NextFunction } from 'express';
import mongoose from 'mongoose';
import Role from '../models/role';

const createRole = (req: Request, res: Response, next: NextFunction) => {
    const role = new Role({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
    })
    role.save().then((role) => res.status(200).json({ role })).catch((error) => res.status(500).json({ error }))
}

const findAllRoles = (req: Request, res: Response, next: NextFunction) => {
    return Role.find().then((roles) => res.status(200).json({ roles })).catch((error) => res.status(500).json({ error }))
}

export {
    createRole,
    findAllRoles
}
