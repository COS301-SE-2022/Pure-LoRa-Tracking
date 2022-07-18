/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { raw } from 'body-parser';
import { DataAppModule } from './data-process/data-process.module';
import { ConfigService } from '@nestjs/config';
// import { CookieManagementInterceptor } from '@master/middleware/cookie-management';

async function bootstrap() {
  let app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  if(config.get<boolean>('DATA_PROCESS')==true)
    app = await NestFactory.create(DataAppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  // app.useGlobalInterceptors(new CookieManagementInterceptor())
  app.use(raw());

  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
