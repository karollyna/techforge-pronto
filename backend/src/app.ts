import express from 'express';
import cors from 'cors';
import path from 'path';
import { authRoutes } from './routes/auth.routes.js';
import { categoryRoutes } from './routes/category.routes.js';
import { productRoutes } from './routes/product.routes.js';
import { orderRoutes } from './routes/order.routes.js';
import { requireUser } from './middlewares/auth.js';
import { errorMiddleware } from './middlewares/error.js';

export const app = express();

app.use(cors());
app.use(express.json());

// Servir arquivos estáticos de upload
app.use('/uploads', express.static(path.resolve('uploads')));

app.get('/health', (_req, res) => res.json({ message: 'API online' }));
app.use('/auth', authRoutes);
app.use('/categories', requireUser, categoryRoutes);
app.use('/products', requireUser, productRoutes);
app.use('/orders', requireUser, orderRoutes);
app.use(errorMiddleware);