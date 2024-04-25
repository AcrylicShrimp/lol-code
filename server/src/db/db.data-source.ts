import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { join } from 'path';

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [join(__dirname, 'entity/**/*.{ts,js}')],
  migrations: [join(__dirname, 'migration/**/*.{ts,js}')],
  subscribers: [],
  dateStrings: true,
});
