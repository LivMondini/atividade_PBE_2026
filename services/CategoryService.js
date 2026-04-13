import CategoryRepository from "../repositories/CategoryRepository.js";
import ProdutoRepository from "../repositories/ProductRepository.js";

class CategoryService {
 async getAllCategories() {
 return await CategoryRepository.getAllCategories();
 }

 async getById(id) {
 return await CategoryRepository.getById(id);
 }

 async createCategory(dados) {
 return await CategoryRepository.createCategory(dados);
 }

 async updateCategory(id, dados) {
 return await CategoryRepository.updateCategory(id, dados);
 }

 async desativar(id) {
 if (!id || isNaN(id)) {
 throw new Error("ID da categoria é obrigatório!");
 }

 const categoria = await CategoryRepository.getById(id);

 if (!categoria) {
 throw new Error("Categoria não encontrada!");
 }

 await CategoryRepository.updateStatus(id, 0);
 await ProdutoRepository.desativarPorCategoria(id);

 return { message: "Categoria e produtos desativados com sucesso!" };
 }

 async deleteCategory(id) {
 const totalProdutos = await ProdutoRepository.countByCategoria(id);

 if (totalProdutos > 0) {
 throw new Error("Não é possível excluir categoria com produtos vinculados");
 }

 return await CategoryRepository.deleteCategory(id);
 }
}

export default new CategoryService();