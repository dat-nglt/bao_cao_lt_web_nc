import express from "express";
import bookModel from "../models/BookModels.js";

const getAllBooks = async (req, res) => {
    try {
        const books = await bookModel.findAll();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Có lỗi xảy ra.' });
    }
}

const getBookById = async (req, res) => {
    const { id } = req.params; // Lấy ID từ tham số URL
    
    try {
        const book = await bookModel.findByPk(id);

        if (!book) {
            return res.status(404).json({ error: 'Sách không tìm thấy.' });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: 'Có lỗi xảy ra.' });
    }
}

const getBooksByCategory = async (req, res) => {
    try {
        const books = await bookModel.findAll({
            where: { id_Category: req.params.id },
        });
        if (books.length > 0) {
            res.json(books);
        } else {
            res.status(404).json({ error: 'No books found for this category' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Database query error' });
    }
}

export default { getAllBooks, getBookById, getBooksByCategory};