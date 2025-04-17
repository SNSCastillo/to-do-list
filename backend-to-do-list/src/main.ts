import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("prueba/v1");
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  app.enableCors({
    origin: ['http://localhost:3000',],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Cookies o auth con sesiones
  });
  const config = new DocumentBuilder()
    .setTitle("To-do-list API")
    .setDescription("Prueba técnica")
    .setVersion("1.0")
    .addBearerAuth()
    .addTag("Tareas")
    .addTag("Usuarios")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("documentacion", app, document);

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
