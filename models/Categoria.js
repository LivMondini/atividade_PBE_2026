import pool from "../database/connection.js";

async function getAllCategories() {
   const [rows] = await pool.query('SELECT * FROM categorias');
   return rows;
}

async function createCategory(categoria) {
   const { nome, descricao } = categoria;

   const [result] = await pool.query(
      `INSERT INTO categorias (nome, descricao) VALUES (?, ?)`, 
      [nome, descricao]
   );
   
   return result.insertId;
}

async function updateCategory(id, categoria) {
   const { nome, descricao } = categoria;

   const [result] = await pool.query(
      `UPDATE categorias SET nome = ?, descricao = ? WHERE id = ?`, 
      [nome, descricao, id]
   );
   
   return result.affectedRows;
}

async function deleteCategory(id) {
   const [result] = await pool.query(`DELETE FROM categorias WHERE id = ?`, [id]);
   
   return result.affectedRows;
}

export default { getAllCategories, createCategory, updateCategory, deleteCategory };