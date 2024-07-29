import {
  Injectable,
  NestMiddleware,
  HttpException,
  Inject,
} from '@nestjs/common';
import { MongooseService } from './mongoose.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import * as CryptoJS from 'crypto-js';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly mongooseService: MongooseService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async use(req: any, res: any, next: (error?: any) => void) {
    const token = req.headers['x-assist-id-signature'] as string;   
    if (!token) {
      throw new HttpException('Forbiden', 403);
    }


    const bytes = CryptoJS.AES.decrypt(token, process.env.PRIVATE_KEY);
    const private_key = bytes.toString(CryptoJS.enc.Utf8);
    if (!private_key) {
      throw new HttpException('Unauthorized', 401);
    }

    const check = await this.mongooseService.models.External.findOne({
      private_key,
    }).exec();

    if (!check) {
      throw new HttpException('Unauthorized', 401);
    } else {
      next();
    }
  }
}
