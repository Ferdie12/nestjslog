import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ValidationService } from '../common/validation.service';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ExportValidation } from './log-export.validation';
import { MongooseService } from '../common/mongoose.service';
import { Types } from 'mongoose';

@Injectable()
export class LogExportService {
  constructor(
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private mongooseService: MongooseService,
  ) {}

  async create(request: Record<string, any>): Promise<Boolean> {
    this.logger.debug(`Create Log Export ${JSON.stringify(request)}`);

    if (request.userId && request.hospitalId) {
      request.userId = new Types.ObjectId(request.userId);
      request.hospitalId = new Types.ObjectId(request.hospitalId);
    }
    const createRequest = this.validationService.validate(
      ExportValidation.CREATE,
      request,
    );

    // Simpan dokumen
    const savedDocument = await new this.mongooseService.models.LogExport(
      createRequest,
    ).save();

    if (!savedDocument) {
      throw new HttpException('failed create logging', 400);
    }

    return true;
  }
}
