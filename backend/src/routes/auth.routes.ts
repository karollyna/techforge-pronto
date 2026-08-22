import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { requireUser } from '../middlewares/auth.js';

const controller = new AuthController();
export const authRoutes = Router();

authRoutes.post('/signup', controller.signUp);
authRoutes.post('/signin', controller.signIn);
authRoutes.put('/users/me', requireUser, controller.updateUser);