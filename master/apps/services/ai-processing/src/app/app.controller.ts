import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('ai/perimeter')
  processPerimeter(@Body() content : { location?: any, name?: string, device?: string, newName?:string }) {this.appService.processPerimeterRequest(content)};
}
