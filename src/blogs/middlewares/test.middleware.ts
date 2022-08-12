import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class TestMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Message from Test Middleware class based');
    next();
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
