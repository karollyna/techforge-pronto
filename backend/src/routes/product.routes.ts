import { Router } from 'express';
import { ProductController } from '../controllers/product.controller.js';
import { uploadMiddleware } from '../middlewares/upload.js';
import { requireUser, requireAdmin } from '../middlewares/auth.js';

const controller = new ProductController();
export const productRoutes = Router();

productRoutes.get('/', controller.list);
productRoutes.get('/:id', controller.getById);
productRoutes.post('/', controller.create);
productRoutes.put('/:id', controller.update);
productRoutes.delete('/:id', controller.remove);

// Rota de Upload de Imagem (Protegida)
productRoutes.post('/upload', requireUser, requireAdmin, uploadMiddleware.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
  }

  return res.status(201).json({
    message: 'Imagem do produto enviada com sucesso!',
    filename: req.file.filename,
    path: `/uploads/${req.file.filename}`,
  });
});