import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  public readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function errorMiddleware(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const status = err.statusCode || 500;
  const message = err.message || 'Erro interno do servidor';
  return res.status(status).json({ error: message });
}