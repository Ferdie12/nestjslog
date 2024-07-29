import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { Connection, createConnection, Schema } from 'mongoose';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { schemas } from '../schemas/index.schema';

@Injectable()
export class MongooseService implements OnModuleInit {
  private readonly connection: Connection;
  public readonly models: { [key: string]: ReturnType<Connection['model']> };

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
    this.connection = createConnection(process.env.DATABASE);
    this.models = {};

    for (const [name, schema] of Object.entries(schemas)) {
      this.models[name] = this.connection.model(name, schema);
    }
  }

  async onModuleInit() {
    this.connection.on('connected', () => {
      this.logger.info('Mongoose connected to the database');
    });

    this.connection.on('error', (err) => {
      this.logger.error('Mongoose connection error:', err);
    });

    this.connection.on('disconnected', () => {
      this.logger.warn('Mongoose disconnected from the database');
    });

    this.connection.on('reconnected', () => {
      this.logger.info('Mongoose reconnected to the database');
    });

    await this.connection;
  }
}
