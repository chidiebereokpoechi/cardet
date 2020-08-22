import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common'
import { ConnectedUser, LoggedInGuard } from 'cardet/auth'
import { User } from 'cardet/database'
import { ServiceResponse } from 'cardet/util'
import { GameManagersService } from './game-managers.service'
import { PlayCardsModel } from './models'

@UseGuards(LoggedInGuard)
@Controller('game-managers')
export class GameManagersController {
  @Inject(GameManagersService)
  private readonly service!: GameManagersService

  @Get(':id')
  public async getGameState(
    @Param('id', ParseUUIDPipe) id: string,
    @ConnectedUser() user: User,
  ) {
    return ServiceResponse.create({
      data: this.service.getGameState(id, user),
      message: 'Game state fetched successfully',
    })
  }

  @Post(':id/play')
  public async play(
    @Param('id', ParseUUIDPipe) id: string,
    @ConnectedUser() user: User,
    @Body() model: PlayCardsModel,
  ) {
    return ServiceResponse.create({
      data: this.service.play(id, user, model.indices),
      message: 'Cards played successfully',
    })
  }

  @Post(':id/pick')
  public async pick(
    @Param('id', ParseUUIDPipe) id: string,
    @ConnectedUser() user: User,
  ) {
    return ServiceResponse.create({
      data: this.service.pick(id, user),
      message: 'Cards picked successfully',
    })
  }

  @Post(':id/sort')
  public async sort(
    @Param('id', ParseUUIDPipe) id: string,
    @ConnectedUser() user: User,
  ) {
    return ServiceResponse.create({
      data: this.service.sort(id, user),
      message: 'Cards sorted successfully',
    })
  }
}
