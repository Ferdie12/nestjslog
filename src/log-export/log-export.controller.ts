import { Body, Controller, Get, Headers, HttpCode, Post } from '@nestjs/common';
import { LogExportService } from './log-export.service';
import { WebResponse } from '../model/web.model';

@Controller('log-export')
export class LogExportController {
  constructor(private readonly exportService: LogExportService) {}

  @Post('/insert')
  @HttpCode(200)
  async registerLog(
    @Body() request: Record<string, any>,
  ): Promise<WebResponse<void>> {
    await this.exportService.create(request);

    return {
      message: 'succes create log',
    };
  }
}
