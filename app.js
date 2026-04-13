import express from 'express';
import cors from 'cors';
import product from './routes/product.routes.js';
import category from './routes/category.routes.js'; 
import errorHandler from './middlewares/errorHandler.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(errorHandler);

// Rotas
// http://localhost:3000/produtos
app.use("/produtos", product);
app.use("/categorias", category); 

export default app;