import { Inject } from '@nestjs/common'
import { User } from 'cardet/database'
import { UsersService } from 'cardet/users'
import { Collection } from 'lokijs'
import { GameManager } from '../game-manager'
import { GameRoom } from '../rooms'
import { GameStore } from '../store'

export class GameManagersService {
  private readonly collection: Collection<GameManager>
  private readonly game_rooms_collection: Collection<GameRoom>

  @Inject(UsersService)
  private readonly users_service!: UsersService

  constructor(
    @Inject(GameStore)
    store: GameStore,
  ) {
    this.collection = store.game_managers
    this.game_rooms_collection = store.rooms
  }

  public retrievePairByRoomId(room_id: string) {
    const room = this.game_rooms_collection.findOne({
      id: room_id,
    })

    const game_manager = this.collection.findOne({ id: room?.game_manager_id })

    if (!room || !game_manager) {
      throw new Error('There was a problem retrieving the game manager')
    }

    return {
      room,
      game_manager,
    }
  }

  public retrievePair(id: string) {
    const room = this.game_rooms_collection.findOne({
      game_manager_id: id,
    })
    const game_manager = this.collection.findOne({ id })

    if (!room || !game_manager) {
      throw new Error('There was a problem retrieving the game manager')
    }

    return {
      room,
      game_manager,
    }
  }

  public startGame(id: string, user: User) {
    const { room, game_manager } = this.retrievePair(id)
    game_manager.startGame(room.members)
    this.collection.update(game_manager)
    return game_manager.getGameState(user)
  }

  public endGame(id: string) {
    const { game_manager } = this.retrievePair(id)
    game_manager.endGame()
    return this.collection.update(game_manager)
  }

  public getGameState(id: string, user: User) {
    const { game_manager } = this.retrievePair(id)
    return game_manager.getGameState(user)
  }

  public play(id: string, user: User, indices: number[]) {
    const { game_manager } = this.retrievePair(id)
    game_manager.play(user, indices)
    this.collection.update(game_manager)
    return game_manager.getGameState(user)
  }

  public pick(id: string, user: User) {
    const { game_manager } = this.retrievePair(id)
    game_manager.pick(user)
    this.collection.update(game_manager)
    return game_manager.getGameState(user)
  }

  public sort(id: string, user: User) {
    const { game_manager } = this.retrievePair(id)
    game_manager.sort(user)
    this.collection.update(game_manager)
    return game_manager.getPlayer(user)
  }
}
