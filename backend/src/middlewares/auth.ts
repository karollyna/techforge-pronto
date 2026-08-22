import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: 'ADMIN' | 'USER';
  };
}

// Middleware de autorização para Administrador
export const requireAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const userRole = req.user?.role || req.headers['x-user-role'];

  if (!userRole) {
    return res.status(401).json({ error: 'Não autorizado. Usuário não identificado.' });
  }

  if (userRole !== 'ADMIN') {
    return res.status(403).json({ error: 'Acesso negado. Requer perfil de Administrador.' });
  }

  next();
};

// Middleware para Usuário autenticado
export const requireUser = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const userRole = req.user?.role || req.headers['x-user-role'];

  if (!userRole) {
    return res.status(401).json({ error: 'Não autorizado. Faça login para continuar.' });
  }

  next();
};