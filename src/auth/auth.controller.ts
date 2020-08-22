import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common'
import { User } from 'cardet/database'
import { ServiceResponse } from 'cardet/util'
import { AuthService } from './auth.service'
import { ConnectedUser } from './decorators'
import { LoggedInGuard, LogInGuard } from './guards'

@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  public readonly service!: AuthService

  @HttpCode(HttpStatus.OK)
  @UseGuards(LogInGuard)
  @Post()
  public logIn(@ConnectedUser() user: User) {
    return ServiceResponse.create({
      data: this.service.logIn(user),
      message: 'User logged in',
    })
  }

  @UseGuards(LoggedInGuard)
  @Get()
  public getUser(@ConnectedUser() user: User) {
    return ServiceResponse.create({
      data: user,
      message: 'User details retrieved',
    })
  }
}
