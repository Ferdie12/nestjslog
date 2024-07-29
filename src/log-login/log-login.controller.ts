import { Body, Controller, HttpCode, Post, Put } from '@nestjs/common';
import { LogLoginService } from './log-login.service';
import { WebResponse } from '../model/web.model';

@Controller('/api/log-login')
export class LogLoginController {
  constructor(private readonly loginService: LogLoginService) {}

  @Post('/insert')
  @HttpCode(200)
  async registerLog(
    @Body() request: Record<string, any>,
  ): Promise<WebResponse<void>> {
    await this.loginService.create(request);

    return {
      message: 'succes create log',
    };
  }

  @Put('/updateLogout')
  @HttpCode(200)
  async updateLogout(
    @Body() request: Record<string, any>,
  ): Promise<WebResponse<void>> {
    await this.loginService.updateLogout(request);

    return {
      message: 'succes',
    };
  }
}
