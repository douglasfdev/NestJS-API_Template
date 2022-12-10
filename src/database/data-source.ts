import { getEnvPath } from 'src/common/helpers/env.helper';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

const envFilePath = getEnvPath(`${__dirname}/../common/envs`);
dotenv.config({ path: envFilePath });

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  migrations: ['dist/database/migrations/*.js'],
  entities: ['dist/**/*.entity.js'],
};

export const datatasource = new DataSource(dataSourceOptions);
