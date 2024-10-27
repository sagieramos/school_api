import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log(`Request... ${req.url}`);
        console.log(`Request... ${req.method}`);
        console.log(`response... ${res.statusCode}`);
        console.log(`response... ${res.statusMessage}`);

        next();
    }
}


// Function middleware
export function logger(req: Request, res: Response, next: NextFunction) {
    console.log(`Request... This is a function middleware ${req.url}`);
    next();
  };