import { NextFunction, Request, Response } from 'express';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(err);
  return res.status(500).json({
    status: 'error',
    message: 'Ocorreu um erro interno. Por favor, tente novamente mais tarde.',
  });
};
