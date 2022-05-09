import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiApiRouterModule } from '@lora/apiRouter'

@Module({
  imports: [ApiApiRouterModule,ConfigModule.forRoot()],
})
export class AppModule {}
