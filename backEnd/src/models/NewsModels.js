import pool from '../configs/connectDB.js'

const getAllNews = async (search = '', sort = 'desc', start = 0, end = 10) => {
    const [rows, fields] = await pool.execute(
        'SELECT * FROM news WHERE title LIKE ? ORDER BY id ' + sort + ' LIMIT ?, ?',
        [`%${search}%`, start, end]
    );
    return rows;
}

const getTotalNews = async (search = '', sort = 'desc') => {
    const [rows, fields] = await pool.execute(
        'SELECT count(id) FROM news WHERE title LIKE ? ORDER BY id ' + sort ,
        [`%${search}%`]
    );
    return rows;
}

const createNews = async (data) => {
    const { name, description } = data;
    const [result] = await pool.execute(
        'INSERT INTO category (name, description) VALUES (?, ?)',
        [name, description]
    );
    return result;
}

const updateCategory = async (id, data) => {
    const { name, description } = data;
    
    const [result] = await pool.execute(
        'UPDATE category SET name = ?, description = ? WHERE id = ?',
        [name, description, id]
    );
    
    return result;
}

const deleteCategory = async (id) => {
    const [result] = await pool.execute(
        'DELETE FROM category WHERE id = ?',
        [id]
    );
    return result;
}

export default { getAllNews, getTotalNews, createNews} 