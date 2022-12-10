import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async (config: ConfigService): Promise<TypeOrmModuleOptions> => ({
    type: 'mysql',
    host: config.get('DB_HOST'),
    port: Number(config.get('DB_PORT')),
    database: config.get('MYSQL_DATABASE'),
    username: config.get('MYSQL_USER'),
    password: config.get('MYSQL_ROOT_PASSWORD'),
    migrations: ['/dist/migrations/*.{ts,js}'],
    logging: true,
    synchronize: true, // never use TRUE in production!
    autoLoadEntities: true,
  }),
  inject: [ConfigService],
};

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.MYSQL_DATABASE,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  migrations: ['/dist/migrations/*.{ts,js}'],
  logging: true,
  synchronize: true, // never use TRUE in production!
  autoLoadEntities: true,
};
