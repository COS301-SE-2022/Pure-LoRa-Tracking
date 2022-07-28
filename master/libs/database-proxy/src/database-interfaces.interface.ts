import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AverageInputDocument = AverageInput & Document;

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

export const AverageInputSchema = SchemaFactory.createForClass(AverageInput)