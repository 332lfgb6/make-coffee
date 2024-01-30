import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeeModule } from './coffee/coffee.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BookController } from './book/book.controller';
import { BookService } from './book/book.service';
import { BookModule } from './book/book.module';

@Module({
  imports: [
    CoffeeModule,
    MongooseModule.forRoot('mongodb://localhost:27017/study_nest'),
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
