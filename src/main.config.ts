import { INestApplication, RequestMethod } from '@nestjs/common';

export const applyGlobalAppConfig = (app: INestApplication) => {
  app.setGlobalPrefix('api/v1', {
    exclude: [
      { path: 'api/docs', method: RequestMethod.GET },
      { path: 'api/docs.json', method: RequestMethod.GET },
      { path: 'health', method: RequestMethod.GET },
    ],
  });
};
