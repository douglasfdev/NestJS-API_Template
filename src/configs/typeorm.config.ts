import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { getEnvPath } from '../common/helpers/env.helper';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async (config: ConfigService): Promise<TypeOrmModuleOptions> => ({
    type: 'mysql',
    host: config.get('DB_HOST'),
    port: Number(config.get('DB_PORT')),
    database: config.get('MYSQL_DATABASE'),
    username: config.get('MYSQL_USER'),
    password: config.get('MYSQL_ROOT_PASSWORD'),
    migrations: ['dist/migrations/*.{ts,js}'],
    entities: ['dist/entities/**/*{.js,.ts}'],
    logging: true,
    synchronize: false, // never use TRUE in production!
  }),
  inject: [ConfigService],
};

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
