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
    private grpc: GRPCHealthIndicator,
    private mongo: MongooseHealthIndicator
  ) {

  }


  getData(): { message: string } {
    return { message: 'Welcome to healthchecker!' };
  }

  async checkServices() {
    return this.healthcheck.check([
      () => this.http.pingCheck(JSON.stringify({name: "Pure Lora client",url:"https://loratracking.co.za"}), "http://localhost:4200"),
      () => this.http.pingCheck(JSON.stringify({name: "Pure Lora API"}), "http://localhost:3333/api", {
        validateStatus: (input) => {
          if (input == 400 || input == 200) return true;
          return false
        }
      }),
      () => this.http.pingCheck(JSON.stringify({
        name: "Thingsboard API",
      }), "http://localhost:9090/api", {
        validateStatus: (input) => {
          if (input == 401 || input == 200) return true;
          return false
        }}),
      // () => this.http.pingCheck(JSON.stringify({name: "Thingsboard Client",url:"http://thingsboard.loratracking.co.za"}), "http://localhost:9090"),
      () => this.http.pingCheck(JSON.stringify({name: "Chirpstack API"}), "http://localhost:8080/api"),
      () => this.http.pingCheck(JSON.stringify({name: "Chirpstack Client",url: "https://chirpstack.loratracking.co.za"}), "http://localhost:8080"),
      () => this.http.pingCheck(JSON.stringify({ name: "RabbitMQ Client", url: "https://rabbitmq.loratracking.co.za" }), "http://localhost:15672"),
      () => this.http.pingCheck(JSON.stringify({name: "Chirpstack Application health check (Postgres,Redis)"}), "http://localhost:8085/health"),
      () => this.http.pingCheck(JSON.stringify({name: "Chirpstack Network server health check"}), "http://localhost:8086/health"),
      () => this.mongo.pingCheck(JSON.stringify({name: "MongoDB"})),
    ]);
  }
}
