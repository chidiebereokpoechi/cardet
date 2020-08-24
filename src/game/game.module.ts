import { Global, Module } from '@nestjs/common'
import { UsersModule } from 'cardet/users'
import { GameManagersService } from './game-manager'
import { GameManagersController } from './game-manager/game-managers.controller'
import { RoomsController, RoomsService } from './rooms'
import { RoomsGateway } from './rooms/rooms.gateway'
import { GameStore } from './store'

@Global()
@Module({
  imports: [UsersModule],
  controllers: [GameManagersController, RoomsController],
  providers: [GameManagersService, GameStore, RoomsService, RoomsGateway],
  exports: [GameManagersService, GameStore, RoomsService],
})
export class GameModule {}
