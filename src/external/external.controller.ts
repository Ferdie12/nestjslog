import { Body, Controller, Get, Headers, HttpCode, Post } from '@nestjs/common';
import { ExternalService } from './external.service';
import { WebResponse } from '../model/web.model';

@Controller('/secret/external')
export class ExternalController {
  constructor(private readonly externalService: ExternalService) {}

  @Post('/create')
  @HttpCode(200)
  async registerExternal(
    @Body() request: Record<string, any>,
    @Headers('log-key') key: string,
  ): Promise<WebResponse<Record<string, any>>> {
    const result = await this.externalService.create(request, key);

    return {
      message: 'succes create external',
      data: result,
    };
  }
}
