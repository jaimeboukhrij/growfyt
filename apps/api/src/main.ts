import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = process.env.PORT || configService.get('PORT') || 3001;
  const corsOrigin = configService.get('CORS_ORIGIN') || 'http://localhost:3000';
  const nodeEnv = process.env.NODE_ENV || 'development';

  // Enable CORS
  app.enableCors({
    origin: corsOrigin,
    credentials: true,
  });

  // Global prefix
  app.setGlobalPrefix('api');

  await app.listen(port, '0.0.0.0');

  const baseUrl = nodeEnv === 'production' 
    ? `https://api.growfyt.com` 
    : `http://localhost:${port}`;
  
  console.log(`🚀 Growfit API running on ${baseUrl}`);
  console.log(`📚 API endpoints: ${baseUrl}/api`);
  console.log(`🌍 Environment: ${nodeEnv}`);
  console.log(`🔌 Port: ${port}`);
  console.log(`🔐 CORS Origin: ${corsOrigin}`);
}

bootstrap();
