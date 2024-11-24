import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './infrastructure/config/app-config.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [],
  providers: [AppConfigService],
})
export class SharedModule {}
