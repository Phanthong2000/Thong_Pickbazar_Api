import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import Category from '../models/category';

const findAllCategories = (req: Request, res: Response, next: NextFunction) => {
    return Category.aggregate([
        {
            $addFields: {
                groupObjectId: { $toObjectId: '$groupId' },
                id: { $toString: '$_id' }
            }
        },
        {
            $lookup: {
                from: 'groups',
                localField: 'groupObjectId',
                foreignField: '_id',
                as: 'group'
            }
        },
        {
            $unwind: '$group'
        },
        {
            $lookup: {
                from: 'categories',
                localField: 'id',
                foreignField: 'parentId',
                as: 'child'
            }
        },
        {
            $match: {
                type: 'parent'
            }
        }
    ])
        .then((categories) => res.status(200).json({ categories }))
        .catch((error) => res.status(500).json({ error }));
};

const createCategory = (req: Request, res: Response, next: NextFunction) => {
    const category = new Category({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
    });
    return category
        .save()
        .then((category) => res.status(200).json({ category }))
        .catch((error) => res.status(500).json({ error }));
};

const deleteCategory = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return Category.findByIdAndDelete(id)
        .then((category) => res.status(200).json({ category }))
        .catch((error) => res.status(500).json({ error }));
};

const findCategoryById = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return Category.findById(id)
        .then((category) => res.status(200).json({ category }))
        .catch((error) => res.status(500).json({ error }));
};

const updateCategory = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    return Category.findByIdAndUpdate(data.id, { ...data }, { returnOriginal: false })
        .then((category) => res.status(200).json({ category }))
        .catch((error) => res.status(500).json({ error }));
};

const getAllCategoriesByGroupAndLangCode = (req: Request, res: Response, next: NextFunction) => {
    const { langcode } = req.headers;
    const { groupId } = req.params;
    return Category.aggregate([
        {
            $match: {
                groupId: groupId,
                type: 'parent'
            }
        },
        {
            $addFields: {
                groupObjectId: { $toObjectId: '$groupId' },
                id: { $toString: '$_id' }
            }
        },
        {
            $lookup: {
                from: 'groups',
                localField: 'groupObjectId',
                foreignField: '_id',
                as: 'group'
            }
        },
        {
            $unwind: '$group'
        },
        {
            $lookup: {
                from: 'categories',
                localField: 'id',
                foreignField: 'parentId',
                as: 'child'
            }
        },
        {
            $project: {
                name: `$name_${langcode}`,
                id: 1,
                _id: 0,
                group: 1,
                child: 1,
                type: 1,
                detail: 1,
                image: 1,
                icon: 1
            }
        }
    ])
        .then((categories) => {
            const data = [] as any[];
            categories.forEach((category) => {
                const children = [] as any[];
                category.child.forEach((item: any) => {
                    let name = item.name_en;
                    if (langcode === 'vi') name = item.name_vi;
                    children.push({
                        ...item,
                        name,
                        id: item._id
                    });
                });
                data.push({
                    ...category,
                    child: children
                });
            });
            return res.status(200).json({ categories: data });
        })
        .catch((error) => res.status(500).json({ error }));
};

export { findAllCategories, createCategory, deleteCategory, findCategoryById, updateCategory, getAllCategoriesByGroupAndLangCode };
