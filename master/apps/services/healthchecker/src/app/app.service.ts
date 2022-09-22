import { Injectable } from '@nestjs/common';
import { HealthCheck, HealthCheckService, HttpHealthIndicator, MemoryHealthIndicator } from '@nestjs/terminus';

@Injectable()
export class AppService {
  constructor(private healthcheck: HealthCheckService,
    private http: HttpHealthIndicator,
    private memory: MemoryHealthIndicator){
      
    }


  getData(): { message: string } {
    return { message: 'Welcome to healthchecker!' };
  }

  checkServices() {
    return this.healthcheck.check([
      () => this.http.pingCheck("test", "https://google.com"),
      // () => this.memory.checkHeap();
    ]);
  }
}
