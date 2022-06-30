import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Contact from '../models/contact'

const findAllContacts = (req: Request, res: Response, next: NextFunction) => {
    return Contact.find()
        .then((contacts) => res.status(200).json({ contacts }))
        .catch((error) => res.status(500).json({ error }));
};

const createContact = (req: Request, res: Response, next: NextFunction) => {
    const contact = new Contact({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
    });
    return contact
        .save()
        .then((contact) => res.status(200).json({ contact }))
        .catch((error) => res.status(500).json({ error }));
};

const deleteContact = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return Contact.findByIdAndDelete(id)
        .then((contact) => res.status(200).json({ contact }))
        .catch((error) => res.status(500).json({ error }));
};

const findContactById = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return Contact.findById(id)
        .then((contact) => res.status(200).json({ contact }))
        .catch((error) => res.status(500).json({ error }));
};

export {
    findAllContacts,
    createContact,
    deleteContact,
    findContactById
}