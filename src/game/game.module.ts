import { Global, Module } from '@nestjs/common'
import { UsersModule } from 'cardet/users'
import { GameManagersService } from './game-manager'
import { GameManagersController } from './game-manager/game-managers.controller'
import { RoomsService } from './rooms'
import { GameStore } from './store'

@Global()
@Module({
  imports: [UsersModule],
  controllers: [GameManagersController],
  providers: [GameManagersService, GameStore, RoomsService],
  exports: [GameManagersService, GameStore, RoomsService],
})
export class GameModule {}
