import { Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';

@Injectable()
export class CoffeeService {
  constructor(
    @InjectModel(Coffee.name) private readonly coffeeModel: Model<Coffee>,
  ) {}

  findAll({ limit, offset }: PaginationQueryDto) {
    return this.coffeeModel.find().skip(offset).limit(limit);
  }

  findOne(id: string) {
    return this.coffeeModel.findOne({ _id: id });
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    // const coffee = new this.coffeeModel(createCoffeeDto);
    // return coffee.save(); // 返回值是行

    return this.coffeeModel.insertMany([createCoffeeDto]);
  }

  update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeeModel.findByIdAndUpdate(
      id,
      { $set: updateCoffeeDto },
      { new: true },
    ); // 如果没有指定new: true，返回值是修改前的行；指定new: true后，返回值是修改后的行
  }

  delete(_id: string) {
    const coffee = this.findOne(_id);
    return coffee.deleteOne();

    // return this.coffeeModel.findOneAndDelete({ _id });
  }
}
