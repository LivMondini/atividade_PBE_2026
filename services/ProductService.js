import ProdutoModel from "../models/ProductModel.js";
import ProdutoRepository from "../repositories/ProductRepository.js";
import CategoriaRepository from "../repositories/CategoryRepository.js"
import { validarCamposObrigatorios, validarPreco, validarEstoque } from "../validators/product.validator.js"

class ProductService {
  async getAll() {
    return await ProdutoRepository.getAll();
  }

  async getById(id) {
    if (!id) {
      throw new Error("ID do Produto é obrigatório")
    }

    const produto = await ProdutoRepository.getById(id)

    if (!produto) {
      throw new Error("Produto não encontrado")
    }

    return {
      produto
    };
  }

  async create(data) {
    validarCamposObrigatorios(data);
    validarPreco(data);
    validarEstoque(data);

    let categoria = await CategoriaRepository.getById(data.categoria_id);

    if (!categoria) {
      throw new Error("Categoria não existe!")
    }

    if (categoria.status === 0) {
      throw new Error("Não é possível cadastrar produto em categoria desativada!")
    }

    if (data.destaque) {
      const totalDestaques = await ProdutoRepository.countDestaques();

      if (totalDestaques >= 5) {
        throw new Error("Limite de produtos em destaque foi atingido!")
      }
    }

    // Model -> Cuida da estrutura dos dados
    const produto = new ProdutoModel(data);

    // Repository -> Cuida do banco (INSERT, UPDATE, SELECT)
    await ProdutoRepository.createProduct(produto);

    return {
      message: "Produto criado com sucesso",
    };
  }

  async update(id, data) {
    if (!id) {
      throw new Error("ID do Produto é obrigatório")
    }

    const produtoAtual = await ProdutoRepository.getById(id);

    if (!produtoAtual) {
      throw new Error("Produto não encontrado!")
    }

    if (data.categoria_id) {
      const categoria = await CategoriaRepository.getById(data.categoria_id)

      if (!categoria || categoria.status === 0) {
        throw new Error("Categoria inválida ou desativada!")
      }
    }

    validarCamposObrigatorios(data);
    validarPreco(data);
    validarEstoque(data);

    if (data.destaque && !produtoAtual.destaque) {
      const totalDestaques = await ProdutoRepository.countDestaques();

      if (totalDestaques >= 5) {
        throw new Error("Limite de produtos em destaque foi atingido!")
      }
    }

    // Model -> Cuida da estrutura dos dados
    const produto = new ProdutoModel(data);

    // Repository -> Cuida do banco (INSERT, UPDATE, SELECT)
    await ProdutoRepository.updateProduct(id, produto);

    return {
      message: "Produto atualizado com sucesso",
    };
  }

  async delete(id) {
    if (!id) {
      throw new Error("ID do Produto é obrigatório")
    }

    const produto = await ProdutoRepository.getById(id)

    if (!produto) {
      throw new Error("Produto não encontrado")
    }

    await ProdutoRepository.deleteProduct(id)

    return {
      message: "Produto deletado com sucesso",
    };
  }
}

export default new ProductService();