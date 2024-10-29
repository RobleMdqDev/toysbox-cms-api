import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de validación global
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('CMS API')
    .setDescription('API para el sistema de gestión de contenido')
    .setVersion('1.0')
    .addTag('projects', 'Gestión de proyectos')
    .addTag('content-types', 'Gestión de tipos de contenido')
    .addTag('components', 'Gestión de componentes')
    .addTag('fields', 'Gestión de campos')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Ruta de salida del archivo Swagger
  const outputPath = '/usr/src/app/swagger/swagger-output.json';

  try {
    // Intento de escritura con confirmación de éxito
    await fs.writeFileSync(outputPath, JSON.stringify(document, null, 2));
    console.log('Archivo de Swagger generado exitosamente en:', outputPath);
  } catch (err) {
    console.error('Error al generar el archivo de Swagger:', err);
  }
  SwaggerModule.setup('api', app, document);

  await app.listen(5000);
}
bootstrap();
