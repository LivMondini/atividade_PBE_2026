
import pool from "../database/connection.js";

class CategoryModel {
  
  async getAllCategories() {
    const [rows] = await pool.query('SELECT * FROM categorias');
    return rows;
  }

  async createCategory(categoria) {
    const { nome, descricao } = categoria;

    const [result] = await pool.query(
      `INSERT INTO categorias (nome, descricao) VALUES (?, ?)`, 
      [nome, descricao]
    );
    
    return result.insertId;
  }

  async updateCategory(id, categoria) {
    const { nome, descricao } = categoria;

    const [result] = await pool.query(
      `UPDATE categorias SET nome = ?, descricao = ? WHERE id = ?`, 
      [nome, descricao, id]
    );
    
    return result.affectedRows;
  }

  async deleteCategory(id) {
    const [result] = await pool.query(`DELETE FROM categorias WHERE id = ?`, [id]);
    
    return result.affectedRows;
  }

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM categorias WHERE id = ?', [id]);
    return rows[0];
  }

  async updateStatus(id, status) {
    const [rows] = await pool.query('UPDATE categorias SET status = ? WHERE id = ?', [status, id]);
    return rows;
  }
}

export default new CategoryModel();