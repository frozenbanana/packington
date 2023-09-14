import { Request, Response } from "express";
import PackingList from "../models/PackingList";

export const create = async (req: Request, res: Response) => {
    const {user, title, items} = req.body;

    try {
        const newPackingList = new PackingList({
            user,
            title,
            items
        });

        const savedPackingList = await newPackingList.save();

        res.json(savedPackingList);
    } catch (error) {
        console.error('Error during packing-list creation: ', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};
  
export const fetchAll = (req: Request, res: Response) => {
    const packingLists = PackingList.find();

    return res.status(200).json(packingLists);
    
};