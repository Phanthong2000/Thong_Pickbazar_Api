import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import Tag from "../models/tag";

const findAllTags = (req: Request, res: Response, next: NextFunction) => {
    return Tag.aggregate([
        {
            $addFields: {
                groupObjectId: { $toObjectId: "$groupId" }
            }
        },
        {

            $lookup: {
                from: "groups",
                localField: "groupObjectId",
                foreignField: "_id",
                as: "group"

            }
        },
        { $unwind: "$group" },
        {
            $project: {
                id: "$_id",
                _id: 0,
                name: 1,
                icon: 1,
                slug: 1,
                detail: 1,
                group: 1
            }
        }
    ])
        .then((tags) => res.status(200).json({ tags })).catch((error) => res.status(500).json({ error }))
}

const createTag = (req: Request, res: Response, next: NextFunction) => {
    const tag = new Tag({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
    });
    return tag.save().then((tag) => res.status(200).json({ tag })).catch((error) => res.status(500).json({ error }))
}

const deleteTag = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return Tag.findByIdAndDelete(id).then((tag) => res.status(200).json({ tag })).catch((error) => res.status(500).json({ error }))
}

const updateTag = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    return Tag.findByIdAndUpdate(data.id, { ...data }, { returnOriginal: false }).then((tag) => res.status(200).json({ tag })).catch((error) => res.status(500).json({ error }))
}
const getTagBySlug = (req: Request, res: Response, next: NextFunction) => {
    const { slug } = req.params;
    return Tag.aggregate([
        {
            $match: {
                slug: slug
            }
        },
        {
            $addFields: {
                id: { $toString: "$_id" },
                groupObjectId: { $toObjectId: "$groupId" }
            }
        },
        {
            $lookup: {
                from: "groups",
                localField: "groupObjectId",
                foreignField: "_id",
                as: "group"
            }
        },
        {
            $unwind: "$group"
        }
    ]).then((tags) => res.status(200).json({ tag: tags.at(0) })).catch((error) => res.status(500).json({ error }))
}
export {
    findAllTags,
    createTag,
    deleteTag,
    getTagBySlug,
    updateTag
}