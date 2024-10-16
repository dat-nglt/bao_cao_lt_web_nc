import express from "express";


const getCategoryPage = (req, res) => {
    return res.render("category", {data: {title: 'category', page: 'category'}});
}

const addCategory = (req, res) => {
    return res.render("category", {data: {title: 'category', page: 'category'}});
}

const updateCategory = (req, res) => {
    return res.render("category", {data: {title: 'category', page: 'category'}});
}

const deleteCategory = (req, res) => {
    return res.render("category", {data: {title: 'category', page: 'category'}});
}

export default {getCategoryPage, addCategory, updateCategory, deleteCategory};