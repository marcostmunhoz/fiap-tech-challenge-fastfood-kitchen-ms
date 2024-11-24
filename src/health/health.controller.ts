import { Controller, Get } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
@ApiExcludeController()
export class HealthController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly httpHealthIndicator: HttpHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  public check() {
    return this.healthCheckService.check([
      () => this.httpHealthIndicator.pingCheck('http', 'https://google.com'),
    ]);
  }
}
