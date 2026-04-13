import database from "../database/connection.js";

class CategoryRepository {
  async getAllCategories() {
    const [rows] = await database.query("SELECT * FROM categorias");
    return rows;
  }

  async getById(id) {
    const [rows] = await database.query(
      "SELECT * FROM categorias WHERE id = ?",
      [id],
    );
    return rows[0];
  }

  async createCategory(categoria) {
    const { nome, descricao } = categoria;
    const [result] = await database.query(
      `INSERT INTO categorias (nome, descricao) VALUES (?, ?)`,
      [nome, descricao],
    );
    return result.insertId;
  }

  async updateCategory(id, categoria) {
    const { nome, descricao } = categoria;
    const [result] = await database.query(
      `UPDATE categorias SET nome = ?, descricao = ? WHERE id = ?`,
      [nome, descricao, id],
    );
    return result.affectedRows;
  }

  async deleteCategory(id) {
    const [result] = await database.query(
      `DELETE FROM categorias WHERE id = ?`,
      [id],
    );
    return result.affectedRows;
  }

  async updateStatus(id, status) {
    const [rows] = await database.query(
      "UPDATE categorias SET status = ? WHERE id = ?",
      [status, id],
    );
    return rows;
  }
}

export default new CategoryRepository();
