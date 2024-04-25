import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppDataSource } from './db/db.data-source';
import { PostModule } from './post/post.module';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource.options), PostModule],
})
export class AppModule {}
