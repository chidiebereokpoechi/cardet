import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common'
import { ConnectedUser, LoggedInGuard } from 'cardet/auth'
import { User } from 'cardet/database'
import { ServiceResponse } from 'cardet/util'
import { RoomsService } from './rooms.service'

@UseGuards(LoggedInGuard)
@Controller('rooms')
export class RoomsController {
  @Inject(RoomsService)
  private readonly service!: RoomsService

  @HttpCode(HttpStatus.OK)
  @Get()
  public retrieve(@ConnectedUser() user: User) {
    return ServiceResponse.create({
      data: this.service.getUserRoom(user),
      message: 'User room retrieved succesfully',
    })
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  public create(@ConnectedUser() user: User) {
    return ServiceResponse.create({
      data: this.service.createRoom(user),
      message: 'Room created successfully',
    })
  }

  @HttpCode(HttpStatus.CREATED)
  @Post(':id')
  public join(@Param('id') id: string, @ConnectedUser() user: User) {
    return ServiceResponse.create({
      data: this.service.joinRoom(user, id),
      message: 'Room joined successfully',
    })
  }

  @HttpCode(HttpStatus.OK)
  @Delete()
  public leaveRoom(@ConnectedUser() user: User) {
    return ServiceResponse.create({
      data: this.service.leaveRoom(user),
      message: 'Room exited successfully',
    })
  }
}
