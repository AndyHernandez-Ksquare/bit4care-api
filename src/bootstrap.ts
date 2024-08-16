import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import { NextFunction, Response } from 'express';
import { config } from './config';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(morgan('dev')); // or 'tiny', 'short', 'dev', etc.

  // CORS
  app.use(function (_, res: Response, next: NextFunction) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );
    res.header(
      'Access-Control-Expose-Headers',
      'Content-Count, Content-Disposition, Content-Type',
    );
    next();
  });
  await app.listen(config.api.port);
  console.info(`Application is running on: ${await app.getUrl()}`);
}
