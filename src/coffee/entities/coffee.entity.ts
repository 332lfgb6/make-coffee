import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// +
@Schema()
export class Coffee extends Document {
  // id: number; // -

  @Prop() // +
  name: string;

  @Prop() // +
  brand: string;

  @Prop([String]) // +
  flavors: string[];
}

export const CoffeeSchema = SchemaFactory.createForClass(Coffee); // +
