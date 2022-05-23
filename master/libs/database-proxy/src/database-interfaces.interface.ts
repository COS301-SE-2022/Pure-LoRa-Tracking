import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type RSSIdataDocument = rssiData & Document;

@Schema()
export class rssiData {
    @Prop()
    gateway : string;

    @Prop()
    gatewayCoord : {
        latitude : number;
        longitude : number;
    };

    @Prop()
    FirstPoint : number;

    @Prop()
    SecondPoint : number;

    @Prop()
    ThirdPoint : number;
}

export const rssiDataSchema = SchemaFactory.createForClass(rssiData);