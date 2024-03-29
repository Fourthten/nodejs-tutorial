import 'reflect-metadata';
import { createConnection } from 'typeorm';

import logger from './config/logger';
import app from './config/express';

const PORT = process.env.PORT || 3000;

createConnection().then(async () => {
  logger.info('database connection created');
  app.listen(PORT, () => {
    logger.info(`Server running at ${PORT}`);
  });
}).catch((error: Error) => {
  logger.info(`Database connection failed with error ${error}`);
});
