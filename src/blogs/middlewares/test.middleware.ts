import { NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class TestMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      console.log('Message from Test Middleware class based', token);
      return next();
    }
    throw new UnauthorizedException();
  }
}

export function TestMiddleware2(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('Message from Test Middleware function based');
  next();
}
