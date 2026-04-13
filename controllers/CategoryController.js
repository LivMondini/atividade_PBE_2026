import CategoryService from "../services/CategoryService.js";

class CategoryController {
  async index(req, res) {
    try {
      const result = await CategoryService.getAllCategories();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar categorias." });
    }
  }

  async store(req, res) {
    try {
      const id = await CategoryService.createCategory(req.body);
      res.status(201).json({ message: "Criado com sucesso", id: id });
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar." });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      await CategoryService.updateCategory(id, req.body);
      res.json({ message: "Atualizado com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar." });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      await CategoryService.deleteCategory(id);
      res.json({ message: "Deletado com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new CategoryController();
