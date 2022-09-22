import { Body, Controller, Get, Post } from '@nestjs/common';
import { AiAiProcessingService } from './ai-ai-processing.service';

@Controller('ai-ai-processing')
export class AiAiProcessingController {
  constructor(private aiAiProcessingService: AiAiProcessingService) {}

  @Get()
  online() { return "reachable" }

  @Post('ai/perimeter')
  processPerimeter(@Body() content: { location?: any, name?: string, device?: string, newName?: string }) { this.aiAiProcessingService.processPerimeterRequest(content) };
}
