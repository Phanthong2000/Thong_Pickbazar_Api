import mongoose, { Mongoose } from 'mongoose';
import { Request, Response, NextFunction } from 'express'
import Group from '../models/group';

const findAllGroup = (req: Request, res: Response, next: NextFunction) => {
    return Group.find().then((groups) => res.status(200).json({ groups })).catch((error) => res.status(500).json({ error }))
}

const createGroup = (req: Request, res: Response, next: NextFunction) => {
    const group = new Group({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
    })
    group.save().then((group) => res.status(200).json({ group })).catch((error) => res.status(500).json({ error }))
}
const deleteGroup = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return Group.findByIdAndDelete(id).then((group) => res.status(200).json({ group })).catch((error) => res.status(500).json({ error }))
}

const getAllGroupsByLangCode = (req: Request, res: Response, next: NextFunction) => {
    const { langcode } = req.headers;
    return Group.aggregate([
        {
            $project: {
                name: `$name_${langcode}`,
                id: `$_id`,
                _id: 0,
                icon: 1,
                layout: 1,
                productCard: 1,
                sliders: 1,
                banner: 1,
            }
        },
        {
            $addFields: {
                "banner.title": `$banner.title_${langcode}`,
                "banner.description": `$banner.description_${langcode}`
            }
        },
        {
            $project: {
                "banner.title_vi": 0,
                "banner.title_en": 0,
                "banner.description_vi": 0,
                "banner.description_en": 0
            }
        }
    ]).then((groups) => res.status(200).json({ groups })).catch((error) => res.status(500).json({ error }))
}

const getGroupByIdAndLangCode = (req: Request, res: Response, next: NextFunction) => {
    const { langcode } = req.headers;
    const { id } = req.params;
    return Group.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(id)
            }
        },
        {
            $project: {
                name: `$name_${langcode}`,
                id: `$_id`,
                _id: 0,
                icon: 1,
                layout: 1,
                productCard: 1,
                sliders: 1,
                banner: 1,
            }
        },
        {
            $addFields: {
                "banner.title": `$banner.title_${langcode}`,
                "banner.description": `$banner.description_${langcode}`
            }
        },
        {
            $project: {
                "banner.title_vi": 0,
                "banner.title_en": 0,
                "banner.description_vi": 0,
                "banner.description_en": 0
            }
        },
    ]).then((groups) => res.status(200).json({ group: groups.at(0) })).catch((error) => res.status(500).json({ error }))
}

export {
    findAllGroup,
    createGroup,
    deleteGroup,
    getAllGroupsByLangCode,
    getGroupByIdAndLangCode
}