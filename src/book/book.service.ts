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
    const session = await this.connection.startSession(); // start session
    session.startTransaction(); // start transaction
    try {
      const book = new this.bookModel(createBookDto);
      const coffee = new this.coffeeModel({
        name: 'dd coffee',
        brand: 'dd',
        flavors: ['apple', 'orange'],
      });
      // ×：No newly created books and coffees were found in the database,
      // but this code should be successful in creating books and coffee
      // await book.save({ session });
      // await coffee.save({ session });

      // √: after removing { session }, I found the newly created book
      // and coffee in the database, proving that the code I wrote was OK
      await book.save();
      await coffee.save();

      await session.commitTransaction(); // commit transaction
    } catch (error) {
      await session.abortTransaction(); // abort transaction
    } finally {
      session.endSession(); // end session
      return 'create a book and a coffee successfully.';
    }
  }
}
