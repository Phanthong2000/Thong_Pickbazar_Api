import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Attribute from '../models/attribute';

const findAllAttributes = (req: Request, res: Response, next: NextFunction) => {
    return Attribute.find().then((attributes) => res.status(200).json({ attributes })).catch((error) => res.status(500).json({ error }));
}
const createAttribute = (req: Request, res: Response, next: NextFunction) => {
    const attribute = new Attribute({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
    });
    return attribute.save().then((attribute) => res.status(200).json({ attribute })).catch((error) => res.status(500).json({ error }))
}

const deleteAttribute = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return Attribute.findByIdAndDelete(id).then((attribute) => res.status(200).json({ attribute })).catch((error) => res.status(500).json({ error }))
}

const updateAttribute = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    return Attribute.findByIdAndUpdate(data.id, { ...data }, { returnOriginal: false })
        .then((attribute) => res.status(200).json({ attribute })).catch((error) => res.status(500).json({ error }))
}

const getAttributeByName = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.params;
    return Attribute.aggregate([
        {
            $addFields: {
                name: { $toLower: "$name_en" },
                id: "$_id"
            }
        },
        {
            $match: {
                name: name.toLowerCase()
            }
        }
    ]).then((attributes) => res.status(200).json({ attribute: attributes.at(0) })).catch((error) => res.status(500).json({ error }))
}
export {
    findAllAttributes,
    createAttribute,
    deleteAttribute,
    updateAttribute,
    getAttributeByName
}