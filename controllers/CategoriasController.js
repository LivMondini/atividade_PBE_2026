import Categoria from '../models/Categoria.js'

class CategoriasController {

  async index(req, res) {
    try {
  
      const result = await Categoria.getAllCategories();
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro ao buscar categorias." });
    }
  }


  async store(req, res) {
    try {
      const novaCategoria = req.body;
      const id = await Categoria.createCategory(novaCategoria);
      res.status(201).json({ message: "Criado com sucesso", id: id });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro ao criar." });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const dados = req.body;
      await Categoria.updateCategory(id, dados);
      res.json({ message: "Atualizado com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro ao atualizar." });
    }
  }

 
  async destroy(req, res) {
    try {
      const { id } = req.params;
      await Categoria.deleteCategory(id);
      res.json({ message: "Deletado com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro ao deletar." });
    }
  }
}

export default new CategoriasController();