import express from 'express';
import CategoriasController from '../controllers/CategoriasController.js';

const router = express.Router();

router.get("/", CategoriasController.index);    
router.post("/", CategoriasController.store);   
router.put("/:id", CategoriasController.update);
router.delete("/:id", CategoriasController.destroy);

export default router;