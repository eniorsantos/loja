import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const jwtverify = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const token = request.headers?.authorization;
    

    if (!token) {
      return response.status(500).json({ message: 'Usuario não autorizado ' });
    }

    const validador = jwt.verify(token, process.env.SECRET_KEY || '');

    

    if (!validador) {
      return response.status(500).json({ message: 'Usuario não autorizado ' });
    }

    next();
  } catch (error) {
    return response
      .status(500)
      .json({ message: 'Erro ao carregar dados ' + error });
  }
};
