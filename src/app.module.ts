import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import ormconfig from 'ormconfig';

const imports = [
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
  }),
  TypeOrmModule.forRoot(ormconfig),
];

@Module({
  imports,
  controllers: [],
  providers: [],
})
export class AppModule {
  onModuleInit(): void {
    console.log('Initializing server');
  }

  onApplicationBootstrap(): void {
    console.log('Server started');
  }
}
