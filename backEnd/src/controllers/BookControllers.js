import express from "express";
import bookModel from "../models/BookModels";

const getBookPage = async (req, res) => {
   
    return res.render("layout", {data: {title: 'Sách', page: 'book'}});
}

export default {getBookPage};