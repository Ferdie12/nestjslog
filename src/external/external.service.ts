import { HttpException, Inject, Injectable } from '@nestjs/common';
import * as CryptoJS from 'crypto-js';
import { ValidationService } from '../common/validation.service';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ExternalValidation } from './external.validation';
import { MongooseService } from '../common/mongoose.service';

@Injectable()
export class ExternalService {
  constructor(
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private mongooseService: MongooseService,
  ) {}

  async create(
    request: Record<string, any>,
    key: String,
  ): Promise<Record<string, any>> {
    this.logger.debug(`Register new External ${JSON.stringify(request)}`);
    if (!key || key !== process.env.LOG_KEY) {
      throw new HttpException('Unauthorized', 401);
    }
    const registerRequest = this.validationService.validate(
      ExternalValidation.CREATE,
      request,
    );

    const check = await this.mongooseService.models.External.countDocuments({
      name: registerRequest.name,
    }).exec();

    if (check != 0) {
      throw new HttpException('Name already exists', 400);
    }

    registerRequest.public_key = CryptoJS.AES.encrypt(
      registerRequest.private_key,
      process.env.PRIVATE_KEY,
    ).toString();

    // Simpan dokumen
    const savedDocument = await new this.mongooseService.models.External(
      registerRequest,
    ).save();

    // Hapus _id dari hasil
    const { _id, ...result } = savedDocument.toObject();

    return result;
  }
}
