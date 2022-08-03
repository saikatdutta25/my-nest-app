import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class TestMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Message from Test Middleware', process.env.JWT_SECRET);
    next();
  }
}

export function TestMiddleware2(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('Message from Test Middleware');
  next();
}
