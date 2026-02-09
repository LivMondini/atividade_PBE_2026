import express from 'express';
import ProdutosRoutes from './routes/ProdutosRoutes.js';
import CategoriasRoutes from './routes/CategoriaRoutes.js'; 

const app = express();
app.use(express.json());

// Rotas
app.use("/produtos", ProdutosRoutes);
app.use("/categorias", CategoriasRoutes); 

export default app;