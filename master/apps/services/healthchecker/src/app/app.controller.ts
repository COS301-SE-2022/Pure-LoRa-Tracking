import { Controller, Get, Logger } from '@nestjs/common';
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
  // @HealthCheck()
  async check() {
    const mypromise=new Promise((res,rej)=>{
      this.appService.checkServices().then(stuff=>{
        res(stuff)
      }).catch(err=>{
        res(err.response)
      });
    })
    return await mypromise;
  }
}
