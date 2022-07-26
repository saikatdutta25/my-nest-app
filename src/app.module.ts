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
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsersModule,
    BlogsModule,
    AuthModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: `${process.cwd()}/src/config/.env.${process.env.NODE_ENV}`,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, connectionPoolProvider,SampleDal],
})
export class AppModule { }
