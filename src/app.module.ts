import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogsModule } from './blogs/blogs.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './envs/env.helper'
import { connectionPoolProvider } from './data/db.msssql.provider';
import SampleDal from './data/sample.dal';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nestApp'),
    BlogsModule,
    AuthModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService, connectionPoolProvider,SampleDal],
})
export class AppModule { }
