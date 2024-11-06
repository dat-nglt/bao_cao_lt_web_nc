import pool from '../configs/connectDB.js'

const getAllBook = async () => {
    const [rows, fields] = await pool.execute(`SELECT name, image, author, publisher, DATE_FORMAT(yearOfRelease, '%d/%m/%Y') AS yearOfRelease, count, category, description FROM book ORDER BY id DESC;`)
    return rows
}

const createBook = async (data) => {
    const { name, img, author, publisher, yearOfRelease, count, category, description} = data;
    const [result] = await pool.execute(
        'INSERT INTO book (name, image, author, publisher, yearOfRelease, count, category, description ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [name, img, author, publisher, yearOfRelease, count, category, description]
    );
    return result;
}

const updateBook = async (id, data) => {
    const { name, description } = data;
    
    const [result] = await pool.execute(
        'UPDATE book SET name = ?, description = ? WHERE id = ?',
        [name, description, id]
    );
    
    return result;
}

const deleteBook = async (id) => {
    const [result] = await pool.execute(
        'DELETE FROM book WHERE id = ?',
        [id]
    );
    return result;
}

export default { getAllBook, createBook, updateBook, deleteBook} 