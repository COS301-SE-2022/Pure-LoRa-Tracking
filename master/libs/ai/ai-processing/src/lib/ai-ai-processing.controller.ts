import { Body, Controller, Get, Post } from '@nestjs/common';
import { AiAiProcessingService } from './ai-ai-processing.service';

@Controller('ai')
export class AiAiProcessingController {
  constructor(private aiAiProcessingService: AiAiProcessingService) {}

  @Get()
  online() { return "reachable" }

  @Post('perimeter')
  processPerimeter(@Body() content: {data:{ location?: any, name?: string, device?: string, newName?: string, action : string }}) { return this.aiAiProcessingService.processPerimeterRequest(content) };
}
