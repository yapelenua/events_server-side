import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    errorHttpStatusCode: 422,
    exceptionFactory: (errors) => {
      const formattedErrors = errors.map(err => {
        return {
          property: err.property,
          constraints: err.constraints,
          children: err.children,
        };
      });
      return new BadRequestException(formattedErrors);
    },
  }));

  app.useGlobalFilters(new AllExceptionsFilter());

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });

  await app.listen(8888);
}
bootstrap();
