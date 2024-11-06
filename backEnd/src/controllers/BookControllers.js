import express from "express";
import bookModel from "../models/BookModels";

const getBookPage = async (req, res) => {
    let listBook = await bookModel.getAllBook();
    return res.render("layout", {data: {title: 'Sách', page: 'book', row: listBook}});
}

const addBook = async (req, res) => {
    
    await bookModel.createBook(req.body);
    
    res.redirect("/sach");
}

const updateBook = (req, res) => {
    return res.render("layout", {data: {title: 'book', page: 'book'}});
}

const deleteBook = (req, res) => {
    return res.render("layout", {data: {title: 'book', page: 'book'}});
}

export default {getBookPage, addBook, updateBook, deleteBook};