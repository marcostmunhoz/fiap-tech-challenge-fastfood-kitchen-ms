import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(@Inject() private readonly configService: ConfigService) {}

  getHost(): string {
    return this.configService.get('HOST') || 'localhost';
  }

  getPort(): number {
    return parseInt(this.configService.get('PORT'), 10) || 3000;
  }
}
