import { getEnvPath } from '@helpers/env.helper';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

const envFilePath = getEnvPath(`${__dirname}/../common/envs`);
config({ path: envFilePath });

const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.MYSQL_DATABASE,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
};

export const datataSourceConfig = new DataSource(dataSourceOptions);
