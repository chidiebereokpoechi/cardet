import { Controller, DefaultValuePipe, Get, UsePipes } from '@nestjs/common'

@Controller('ping')
export class AppController {
  @Get()
  @UsePipes(new DefaultValuePipe('hi'))
  public respond() {
    return 'hi!'
  }
}
