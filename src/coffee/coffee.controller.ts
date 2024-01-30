import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';

@Controller('coffee')
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}

  //   @Get()
  //   findAll(@Query() query) {
  //     const { offset, limit } = query;
  //     return `你正在查询咖啡列表... offset: ${offset} limit: ${limit}`;
  //   }

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.coffeeService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeeService.findOne(id);
  }

  @Get('category')
  categoryLs() {
    return 'coffee category list.';
  }

  @Post()
  //   @HttpCode(HttpStatus.GONE)
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeeService.create(createCoffeeDto);
  }

  @Patch(':id')
  update(@Body() updateCoffeeDto: UpdateCoffeeDto, @Param('id') id: string) {
    return this.coffeeService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.coffeeService.delete(id);
  }

  // @Post()
  // create1(@Body('name') name: string) {
  //   return name;
  // }
}
