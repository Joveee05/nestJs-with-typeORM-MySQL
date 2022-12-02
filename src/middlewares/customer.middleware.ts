import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ValidateCustomerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Jovi');

    const { authorization } = req.headers;
    if (!authorization)
      return res.status(403).json({
        status: 'failed',
        message: 'No Authorization Token',
      });

    if (authorization === '123') {
      next();
    } else {
      return res.status(403).send({ error: 'Invalid Authorization Token.' });
    }
  }
}
