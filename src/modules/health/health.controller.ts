import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get()
  checkHealth() {
    return { status: 'Healthy' };
  }
}
