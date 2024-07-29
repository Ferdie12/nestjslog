import { Module } from '@nestjs/common';
import { LogLoginController } from './log-login.controller';
import { LogLoginService } from './log-login.service';

@Module({
  controllers: [LogLoginController],
  providers: [LogLoginService]
})
export class LogLoginModule {}
