import express from "express";


const getBookPage = (req, res) => {
    return res.render("book", {data: {title: 'book', page: 'book'}});
}

const addBook = (req, res) => {
    return res.render("book", {data: {title: 'book', page: 'book'}});
}

const updateBook = (req, res) => {
    return res.render("book", {data: {title: 'book', page: 'book'}});
}

const deleteBook = (req, res) => {
    return res.render("book", {data: {title: 'book', page: 'book'}});
}

export default {getBookPage, addBook, updateBook, deleteBook};