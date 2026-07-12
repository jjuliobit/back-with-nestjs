import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";

@Injectable()
export class AddHeaderInterceptor implements NestInterceptor {

    async intercept(context: ExecutionContext, next: CallHandler<any>) {
        console.log('AddHeaderInterceptor, executando.');
        const response = context.switchToHttp().getResponse();

        response.setHeader('X-Custom-Header', 'o valor do cabeçalho');
        return next.handle();
    }
}