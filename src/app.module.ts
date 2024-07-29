import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { ExternalModule } from './external/external.module';
import { LogLoginModule } from './log-login/log-login.module';
import { LogExportModule } from './log-export/log-export.module';

@Module({
  imports: [CommonModule, ExternalModule, LogLoginModule, LogExportModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
