import { Injectable } from '@nestjs/common';
import { GRPCHealthIndicator, HealthCheck, HealthCheckService, HttpHealthIndicator, MemoryHealthIndicator, MongooseHealthIndicator } from '@nestjs/terminus';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';

@Injectable()
export class AppService {
  constructor(
    private healthcheck: HealthCheckService,
    private http: HttpHealthIndicator,
    private memory: MemoryHealthIndicator,
    private grpc:GRPCHealthIndicator,
    private mongo:MongooseHealthIndicator
    ){
      
    }


  getData(): { message: string } {
    return { message: 'Welcome to healthchecker!' };
  }

  async checkServices() {
    const healthcheck=await this.healthcheck.check([
      () => this.http.pingCheck("Thingsboard API", "http://localhost:9090/api",{
        validateStatus:(input)=>{
          if(input==401||input==200) return true;
          return false
        }
      }),
      () => this.http.pingCheck("Chirpstack API","http://localhost:8080/api"),
      () => this.http.pingCheck("Chirpstack Client","http://localhost:8080"),
      () => this.http.pingCheck("RabbitMQ Client","http://localhost:15672"),
      () => this.http.pingCheck("Chirpstack Application health check (Postgres,Redis)","http://localhost:8085/health"),
      () => this.http.pingCheck("Chirpstack Network server health check","http://localhost:8086/health"),
      () => this.mongo.pingCheck("MongoDB"),
    ]);

    return healthcheck;
  }
}
