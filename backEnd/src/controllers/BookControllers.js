import express from "express";
import bookModel from "../models/BookModels.js";

const getBookPage = async (req, res) => {
   
    return res.render("layout", {data: {title: 'Sách', page: 'book'}});
}

const getAllBooks = async (req, res) => {
    try {
        const books = await bookModel.findAll();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Có lỗi xảy ra.' });
    }
}

export default {getBookPage, getAllBooks};