import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status = HttpStatus.BAD_REQUEST;

    let message = 'An error occurred';
    if (exception.code === 'P2002') {
      message = `Unique constraint violation on field(s): ${exception.meta.target}`;
    } else if (exception.code === 'P2003') {
      message = `Cannot create, delete or update: a foreign key constraint fails: ${exception.meta.field_name}`;
    } else if (exception.code === 'P2025') {
      status = HttpStatus.NOT_FOUND;
      message = `${exception.meta.cause} ${exception.meta.modelName}`;
      console.log(exception.meta);
    }

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
