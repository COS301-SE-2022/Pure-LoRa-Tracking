import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AverageInputDocument = AverageInput & Document;
export type DataDocument = DataInput & Document;

class Coordinate {
    @Prop({required:true, type:Number})
    longitude : number;

    @Prop({required:true, type:Number})
    latitude : number;
}

@Schema()
export class AverageInput {
    @Prop({required:true, type:String})
    deviceID : string;

    @Prop({type:MongooseSchema.Types.Array})
    locations : Coordinate[]
}

@Schema()
export class DataInput {
    @Prop({required:true})
    timestamp : number;

    @Prop({required:true})
    deviceID : string;

    @Prop({required:true})
    eventtype : string;

    @Prop({required:true})
    data : string;
}

export const AverageInputSchema = SchemaFactory.createForClass(AverageInput)
export const DataInputSchema = SchemaFactory.createForClass(DataInput)