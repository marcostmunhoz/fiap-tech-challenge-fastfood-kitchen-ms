import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import 'reflect-metadata';
import { AppModule } from './app.module';
import { applyGlobalAppConfig } from './main.config';
import { AppConfigService } from './shared/infrastructure/config/app-config.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(AppConfigService);

  applyGlobalAppConfig(app);

  await app.listen(config.getPort(), config.getHost());
}
bootstrap();
