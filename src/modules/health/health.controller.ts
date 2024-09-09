import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Health') // Tag for grouping endpoints in Swagger
@Controller()
export class HealthController {
  @Get()
  @ApiOperation({
    summary: 'Health check, needed for deployment',
  })
  checkHealth() {
    return { status: 'Healthy' };
  }
}
