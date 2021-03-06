import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import ormconfig from '../ormconfig';
import { UserModule } from 'src/modules/user.module';
import { AuthModule } from './modules/auth.module';
import { DashboardModule } from './modules/dashboard.module';
import { AppController } from 'src/controllers/app.controller';
import { ResultsModule } from './modules/results.module';

const imports = [
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
  }),
  TypeOrmModule.forRoot(ormconfig),
  AuthModule,
  UserModule,
  DashboardModule,
  ResultsModule,
];

@Module({
  imports,
  controllers: [AppController],
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
