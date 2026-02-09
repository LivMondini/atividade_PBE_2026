import Produto from '../models/Produtos.js'

async function index(req, res) {
    try {
        const produtos = await Produto.getAllProducts();
        res.json(produtos);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Erro ao buscar produtos" });
    }
}

async function store(req, res) {
    try {
        const produto = req.body;
        console.log("Dados recebidos:", produto);
        // O createProduct retorna o ID do novo produto
        const id = await Produto.createProduct(produto);
        
        res.status(201).json({ message: "Produto cadastrado com sucesso", id: id });
    } catch (error) {
        console.log(error); // Bom para ver o erro no terminal
        res.status(500).json({ error: "Erro ao criar produto" });
    }
}

async function update(req, res) {
    try {
        const { id } = req.params;
        const produto = req.body;

        await Produto.updateProduct(id, produto);
        res.status(201).json({ message: "Produto atualizado com sucesso!" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erro ao atualizar produto!" })
    }
}

// AQUI ESTAVA O ERRO: Era (res, req), mudei para (req, res)
async function destroy(req, res) {
    try {
        const { id } = req.params;

        await Produto.deleteProduct(id);
        res.status(200).json({ message: "Produto removido com sucesso!" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro ao remover produto!" })
    }
}

export default { index, store, update, destroy }

