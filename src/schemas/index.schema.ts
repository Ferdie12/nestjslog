import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({
  collection: 'External',
  timestamps: true,
  versionKey: false,
  strict: false,
})
class External extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  public_key: string;

  @Prop({ required: true })
  private_key: string;
}

@Schema({
  collection: 'LogLogin',
  timestamps: true,
  versionKey: false,
  strict: false,
})
class LogLogin extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  deviceName: string;

  @Prop({ required: true })
  browserName: string;

  @Prop({ required: true })
  ipAddress: string;
}

@Schema({ collection: 'LogExport', timestamps: true, versionKey: false })
export class LogExport extends Document {
  @Prop({ required: true })
  userId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  hospitalId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  ipAddress: string;

  @Prop({ required: true })
  deviceName: string;

  @Prop({ required: true })
  browserName: string;

  @Prop({ required: true })
  successful: boolean;

  @Prop({ type: MongooseSchema.Types.Mixed, required: true })
  export: Record<string, any>;

  @Prop({ type: MongooseSchema.Types.Mixed, required: true })
  filter: Record<string, any>;
}

export const schemas: { [key: string]: MongooseSchema } = {
  External: SchemaFactory.createForClass(External),
  LogLogin: SchemaFactory.createForClass(LogLogin),
  LogExport: SchemaFactory.createForClass(LogExport),
  // Tambahkan skema lain di sini
};
