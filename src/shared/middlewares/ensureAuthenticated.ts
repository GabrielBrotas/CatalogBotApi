import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '../../config/constants';
import { AppError } from '../errors/AppError';
import { Logger } from './logger';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}
const logger = new Logger('ENSURE AUTH');

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // pegar o token do header

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    logger.error('JWT token is missing');
    throw new AppError('JWT token is missing', 429);
  }

  // Bearer asdhksau, pegar apenas o token e ignorar o Bearer
  const [, token] = authHeader.split(' ');

  try {
    // verificar se o token do usuario é um token valido
    const decoded = verify(token, SECRET_KEY as string);

    const { sub } = decoded as ITokenPayload;

    // depois que esse middleware for executado uma vez, todas as rotas que forem autenticadas vao ter acesso ao user dentro do request
    request.user = {
      _id: sub,
    };
    return next();
  } catch (err) {
    logger.error('Invalid JWT token', err);
    throw new AppError('token.expired', 429);
  }
}
