import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import { NextFunction, Response } from 'express';
import * as session from 'express-session';
import { config } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(morgan('dev')); // or 'tiny', 'short', 'dev', etc.

  // CORS
  app.enableCors({
    origin: '*', // Adjust this according to your needs
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    exposedHeaders: 'Content-Count, Content-Disposition, Content-Type',
  });

  app.use(
    session({
      secret: config.jwt.secret,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: process.env.NODE_ENV === 'production' },
    }),
  );

  await app.listen(3000);
}
bootstrap();
