import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';

/**
 * Aceita a lista do `.env` e o par localhost/127.0.0.1 (o browser trata
 * os dois como origens diferentes; cookies + CORS quebram se só um passar).
 */
function corsOrigins(raw?: string): string[] {
  const listed = (raw || 'http://localhost:5190,http://127.0.0.1:5190')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
  const twins = listed.flatMap((origin) => {
    if (origin.includes('localhost')) {
      return [origin.replace('localhost', '127.0.0.1')];
    }
    if (origin.includes('127.0.0.1')) {
      return [origin.replace('127.0.0.1', 'localhost')];
    }
    return [];
  });
  return [...new Set([...listed, ...twins])];
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.use(
    helmet({
      contentSecurityPolicy:
        config.get('NODE_ENV') === 'production' ? undefined : false,
    }),
  );
  app.use(cookieParser());
  app.enableCors({
    origin: corsOrigins(config.get<string>('CORS_ORIGIN')),
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.setGlobalPrefix('api');

  const swagger = new DocumentBuilder()
    .setTitle('Portal FM Transportes')
    .setDescription(
      'API do portal de operações FM (NestJS). Auth via cookies httpOnly (`access_token` / `refresh_token`). ' +
        'Use o botão Authorize apenas se testar Bearer; neste projeto o fluxo padrão é cookie. ' +
        'Emissão no GW Webtrans não está habilitada neste protótipo.',
    )
    .setVersion('1.0')
    .addCookieAuth('access_token')
    .addTag('auth', 'Login / refresh / logout / me')
    .addTag('users')
    .addTag('shipments')
    .addTag('dashboard')
    .addTag('health')
    .build();
  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  const port = Number(config.get('PORT') || 3000);
  await app.listen(port);
  console.log(`FM API   em http://localhost:${port}/api`);
  console.log(`Swagger  em http://localhost:${port}/api/docs`);
}
bootstrap();
