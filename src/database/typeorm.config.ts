import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async (config: ConfigService): Promise<TypeOrmModuleOptions> => ({
    type: 'mysql',
    host: config.get('VDT_DB_HOST'),
    port: config.get('VDT_DB_PORT'),
    database: config.get('VDT_DB_DATABASE'),
    username: config.get('VDT_DB_USER'),
    password: config.get('VDT_DB_PASSWORD'),
    migrations: ['dist/migration/*.{ts,js}'],
    migrationsTableName: 'UserMigration',
    logging: true,
    synchronize: false,
    autoLoadEntities: true,
  }),
  inject: [ConfigService],
};

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.VDT_DB_HOST,
  port: Number(process.env.VDT_DB_PORT),
  database: process.env.VDT_DB_DATABASE,
  username: process.env.VDT_DB_USER,
  password: process.env.VDT_DB_PASSWORD,
  migrations: [__dirname + '/dist/migration'],
  charset: 'utf8mb4_unicode_ci',
  logging: true,
  autoLoadEntities: true,
};
