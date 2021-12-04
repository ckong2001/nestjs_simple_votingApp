// export let Config =  {
//     type: 'mysql',
//     host: process.env.DATABASE_HOST,
//     port: parseInt(process.env.DATABASE_PORT),
//     username: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE_DB,
//     autoLoadEntities: true,
//     synchronize: true,
// }


import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: configService.get('DATABASE_HOST') || 'localhost',
      port: configService.get<number>('DATABASE_PORT') || 4406,
      username: configService.get('DATABASE_USER'),
      password: configService.get('DATABASE_PASSWORD'),
      database: configService.get('DATABASE_NAME'),
      synchronize:configService.get<boolean>('TYPEORM_SYNCHRONIZE') || false,
      autoLoadEntities: configService.get<boolean>('AUTO_LOAD_ENTITIES'),
    };
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService]
};
