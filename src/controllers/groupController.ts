import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express'
import Group from '../models/group';

const findAllGroup = (req: Request, res: Response, next: NextFunction) => {
    const { langcode } = req.headers;
    console.log('langcode', langcode)
    return Group.find().then((groups) => res.status(200).json({ groups })).catch((error) => res.status(500).json({ error }))
}

const createGroup = (req: Request, res: Response, next: NextFunction) => {
    const group = new Group({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
    })
    group.save().then((group) => res.status(200).json({ group })).catch((error) => res.status(500).json({ error }))
}

export {
    findAllGroup,
    createGroup
}