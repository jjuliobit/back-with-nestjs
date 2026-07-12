import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class AuthTokenInterceptor implements NestInterceptor {

    async intercept(context: ExecutionContext, next: CallHandler<any>) {
        console.log('AuthTokenInterceptor, executando.');
        const resquest = context.switchToHttp().getRequest();
        const token = resquest.headers.authorization?.split(' ')[1];

        //CHECAR SE O TOKEN É VÁLIDO
        if (!token || token != '123456') {
            throw new UnauthorizedException('Usuário não autorizado.');
        }

        return next.handle();
    }
}