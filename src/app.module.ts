import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [SharedModule, HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
