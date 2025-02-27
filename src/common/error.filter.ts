import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ZodError } from 'zod';

@Catch(ZodError, HttpException)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    if (exception instanceof HttpException) {
      response.status(exception.getStatus()).json({
        errors: exception.getResponse(),
      });
    } else if (exception instanceof ZodError) {
      const errors = exception.errors.map((err) => 
        `Path: ${err.path.join('.')}, Message: ${err.message}`
      ).join('; ');

      response.status(400).json({
        errors,
      });
    } else {
      response.status(500).json({
        errors: exception.message,
      });
    }
  }
}
