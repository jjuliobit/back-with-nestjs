import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException } from "@nestjs/common";

@Catch(HttpException)
export class MyExceptionFilter<T extends HttpException> implements ExceptionFilter {
    catch(exception: T, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        const req = ctx.getRequest();

        const statusCode = exception.getStatus();
        const exceptionResponse = exception.getResponse();

        const error =
            typeof res === 'string'
                ? {
                    message: exceptionResponse,
                } : (exceptionResponse as object);

        res.status(statusCode).json({
            ...error,
            data:new Date().toISOString(),
            path: req.url,
        })
    }
}