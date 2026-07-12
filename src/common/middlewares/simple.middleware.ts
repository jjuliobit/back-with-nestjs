// cliente (navegador) -> (servidor) -> Middleware -> (resquest, response)
// -> NestJs (Guards, Interceptors, Pipes, filters)
import { BadRequestException, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export class SimpleMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('SimpleMiddleware, executando.');
        const authorization = req.headers?.authorization;

        if (authorization) {
            res['user'] = {
                nome: 'João',
                sobrenome: 'Silva',
                role: 'admin',
            };
        }

        res.setHeader('CABECALHO', 'Do Middleware');

        // return res.status(404).json({
        //     message: 'Página não encontrada.'
        // })

        next(); // proximo middleware

        res.on('finish', () => {
            console.log('SimpleMiddleware: Terminou.');
        })
    }
}