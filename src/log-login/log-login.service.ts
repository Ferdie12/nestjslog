import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ValidationService } from '../common/validation.service';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { LoginValidation } from './log-login.validation';
import { MongooseService } from '../common/mongoose.service';
import { Types } from 'mongoose';

@Injectable()
export class LogLoginService {
  constructor(
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private mongooseService: MongooseService,
  ) {}

  async create(request: Record<string, any>): Promise<Boolean> {
    this.logger.debug(`Create Log Login ${JSON.stringify(request)}`);

    if (request.userId && request.hospitalId) {
      request.userId = new Types.ObjectId(request.userId);
      request.hospitalId = new Types.ObjectId(request.hospitalId);
    }

    const createRequest = this.validationService.validate(
      LoginValidation.CREATE,
      request,
    );

    if (createRequest.loginAt && typeof createRequest.loginAt === 'string') {
        createRequest.loginAt = new Date(createRequest.loginAt);
      }

    // Simpan dokumen
    const savedDocument = await new this.mongooseService.models.LogLogin(
      createRequest,
    ).save();

    if (!savedDocument) {
      throw new HttpException('failed create logging', 400);
    }

    return true;
  }

  async updateLogout(request: Record<string, any>): Promise<Boolean> {
    this.logger.debug(`Update Logout Login ${JSON.stringify(request)}`);

    if (typeof request.logoutAt === 'string') {
        request.logoutAt = new Date(request.logoutAt);
      }

    const updateRequest = this.validationService.validate(
      LoginValidation.UPDATE,
      request,
    );

    const result = await this.mongooseService.models.LogLogin.findOneAndUpdate(
      { userId: new Types.ObjectId(request.id) }, // Filter pencarian
      { logoutAt: updateRequest.logoutAt }, // Update
      {
        new: true, // Mengembalikan dokumen yang sudah diperbarui
        sort: { loginAt: -1 }, // Urutkan berdasarkan loginAt dalam urutan menurun
      },
    ).exec();


    if (!result) {
      throw new HttpException('Log entry not found', 404);
    }

    return true;
  }
}
