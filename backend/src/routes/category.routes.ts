import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller.js';
import { requireAdmin } from '../middlewares/auth.js';

const controller = new CategoryController();
export const categoryRoutes = Router();

categoryRoutes.get('/', controller.list);
categoryRoutes.get('/:id', controller.getById);

// Rotas restritas apenas para perfil de Administrador
categoryRoutes.post('/', requireAdmin, controller.create);
categoryRoutes.put('/:id', requireAdmin, controller.update);
categoryRoutes.delete('/:id', requireAdmin, controller.remove);