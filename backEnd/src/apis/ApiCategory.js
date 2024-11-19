import express from "express";
import categoryModel from "../models/CategoryModels.js";

const getAllCategory = async (req, res) => {
    try {
        const category = await categoryModel.findAll();
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: 'Có lỗi xảy ra.' });
    }
}

export default { getAllCategory };