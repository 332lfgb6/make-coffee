import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto/create-book.dto';
import { Coffee } from 'src/coffee/entities/coffee.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
    @InjectModel(Coffee.name) private readonly coffeeModel: Model<Coffee>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const session = await this.connection.startSession(); // 开启会话
    session.startTransaction(); // 开始事务
    try {
      const book = new this.bookModel(createBookDto);
      const coffee = new this.coffeeModel({
        name: '七七咖啡',
        brand: '七七',
        flavors: ['草莓', '葡萄'],
      });
      await book.save();
      throw '7788';
      await coffee.save();

      await session.commitTransaction(); // 提交事务
    } catch (error) {
      await session.abortTransaction(); // 中断事务
    } finally {
      session.endSession(); // 结束会话
      return '创建书本和咖啡成功';
    }
  }
}
