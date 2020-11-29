import { Inject } from '@nestjs/common'
import { User } from 'cardet/database'
import { UsersService } from 'cardet/users'
import { Collection } from 'lokijs'
import { GameManager } from '../game-manager'
import { GameStore } from '../store'
import { GameRoom } from './room'

export class RoomsService {
  private readonly collection: Collection<GameRoom>
  private readonly game_manager_collection: Collection<GameManager>

  @Inject(UsersService)
  private readonly users_service!: UsersService

  constructor(
    @Inject(GameStore)
    store: GameStore,
  ) {
    this.collection = store.rooms
    this.game_manager_collection = store.game_managers
  }

  public async createRoom(user: User) {
    const { room, game_manager } = GameRoom.create(user)
    this.game_manager_collection.insertOne(game_manager)
    await this.users_service.update(user.id, { room_id: room.id })
    return this.collection.insertOne(room)
  }

  public retrieve(id: string) {
    const room = this.collection.findOne({ id: id.toUpperCase() })

    if (!room) {
      throw new Error(`There was an error retrieving room ${id}`)
    }

    return room
  }

  public async getUserRoom(user: User) {
    try {
      return this.retrieve(user.room_id)
    } catch {
      this.users_service.update(user.id, { room_id: '' })
      return null
    }
  }

  public async joinRoom(user: User, room_id: string) {
    const room = this.retrieve(room_id)

    if (room.containsUser(user)) {
      throw new Error('Error joining room')
    }

    room.addUser(await this.users_service.update(user.id, { room_id: room.id }))
    return this.collection.update(room)
  }

  public async createMessage(user: User, room_id: string, message: string) {
    const room = this.retrieve(room_id)

    if (!room.containsUser(user)) {
      throw new Error('User is not in the room')
    }

    room.createMessage(user, message)
    return this.collection.update(room)
  }

  public async leaveRoom(user: User) {
    const room = this.retrieve(user.room_id)
    room.removeUser(await this.users_service.update(user.id, { room_id: '' }))
    return this.collection.update(room)
  }
}
