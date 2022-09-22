import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, HttpHealthIndicator, MemoryHealthIndicator } from '@nestjs/terminus';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private healthcheck: HealthCheckService,
    private http: HttpHealthIndicator,
    private memory:MemoryHealthIndicator) { }

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('checkSystems')
  @HealthCheck()
  check() {
   return this.appService.checkServices();
  }
}
