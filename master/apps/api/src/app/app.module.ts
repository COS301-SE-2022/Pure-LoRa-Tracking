import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiApiRouterModule } from '@lora/apiRouter'
import { DatabaseProxyModule } from '@lora/database'

@Module({
  imports: [ApiApiRouterModule,ConfigModule.forRoot(),
    DatabaseProxyModule
    ],
})
export class AppModule {}
