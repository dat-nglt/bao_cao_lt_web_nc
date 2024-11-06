import pool from '../configs/connectDB.js'

const getAllCategory = async () => {
    const [rows, fields] = await pool.execute('SELECT * FROM category ORDER BY id DESC;')
    return rows
}

const createCategory = async (data) => {
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

export default { getAllCategory, createCategory, updateCategory, deleteCategory} 