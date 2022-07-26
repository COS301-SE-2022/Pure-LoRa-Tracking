import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type InputDataDocument = DataInput & Document;

@Schema()
export class DataInput {
    @Prop()
    gateway : string;

    
    @Prop()
    latitude : number;

    @Prop()
    longitude : number;

    @Prop()
    FirstPoint : number;

    @Prop()
    SecondPoint : number;

    @Prop()
    ThirdPoint : number;
}

export const InputDataSchema = SchemaFactory.createForClass(DataInput);