// cliente (navegador) -> (servidor) -> Middleware -> (resquest, response)
// -> NestJs (Guards, Interceptors, Pipes, filters)
import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export class OutroMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('OutroMiddleware, executando.');
        const authorization = req.headers?.authorization;

        if (authorization) {
            res['user'] = {
                nome: 'João',
                sobrenome: 'Silva',
            };
        }
        // res.setHeader('Authorization', '123456');

        // return res.status(404).json({
        //     message: 'Página não encontrada.'
        // })

        next();
    }
}