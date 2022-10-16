export default {
  type: 'mysql',
  host: process.env.DB_HOST || '127.0.0.1',
  port: 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'db_test',
  synchronize: process.env.NODE_ENV === 'test',
  logging: process.env.NODE_ENV !== 'production' ? 'all' : 'error',
  entities: [
    'src/entity/**/*.ts',
  ],
  migrations: [
    'src/migration/**/*.ts',
  ],
  subscribers: [
    'src/subscriber/**/*.ts',
  ],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
  connectTimeout: 30000,
  acquireTimeout: 30000,
};
