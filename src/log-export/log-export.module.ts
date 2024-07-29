import { Module } from '@nestjs/common';
import { LogExportController } from './log-export.controller';
import { LogExportService } from './log-export.service';

@Module({
  controllers: [LogExportController],
  providers: [LogExportService]
})
export class LogExportModule {}
