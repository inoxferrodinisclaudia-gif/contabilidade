import { Request, Response } from 'express';

export const healthController = (_req: Request, res: Response) => {
  return res.status(200).json({
    status: 'ok',
    service: 'Inox Ferro Orçamentos API',
    message: 'Serviço backend disponível',
  });
};
