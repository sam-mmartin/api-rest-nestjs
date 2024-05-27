import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DbConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres',
      host: 'db-pg',
      port: 5432,
      username: 'mainUser',
      password: '123456',
      database: 'db_site',
      entities: [__dirname + '/../../**/*.entity{.js,.ts}'],
      synchronize: true,
    };
  }
}
