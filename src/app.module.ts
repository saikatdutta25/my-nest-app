import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogsModule } from './blogs/blogs.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AuthorsModule } from './authors/authors.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/src/config/.env.${process.env.NODE_ENV}`,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          dirname: `${process.cwd()}/logger/info`,
          filename: 'info.log',
          level: 'info',
        }),
        new winston.transports.File({
          dirname: `${process.cwd()}/logger/error`,
          filename: 'error.log',
          level: 'error',
        }),
      ],
    }),
    UsersModule,
    BlogsModule,
    AuthModule,
    AuthorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
