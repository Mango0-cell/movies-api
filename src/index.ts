import app from './app';
import { env } from './config/env';
import { logger } from './utils/logger';

app.listen(env.PORT, () => {
  logger.info(`TMDb API server running on port ${env.PORT}`);
  logger.info(`Swagger docs at http://localhost:${env.PORT}/api/docs`);
});
