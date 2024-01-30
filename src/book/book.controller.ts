import { Body, Controller, Post } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto/create-book.dto';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    return await this.bookService.create(createBookDto);
  }
}
