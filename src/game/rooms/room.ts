import { User } from 'cardet/database'
import { find, remove } from 'lodash'
import { v4 } from 'uuid'
import { GameManager } from '../game-manager'
import { Message } from '../message'

export enum RoomState {
  LOBBY,
  PLAYING,
}

export class GameRoom {
  public id: string
  public members: User[]
  public creator: User
  public messages: Message[]
  public room_state: RoomState
  public game_manager_id!: string

  private constructor(creator: User) {
    this.id = v4()
      .slice(0, 4)
      .toUpperCase()
    this.creator = creator
    this.members = [creator]
    this.messages = []
    this.room_state = RoomState.LOBBY
  }

  public containsUser(user: User) {
    return find(this.members, { id: user.id })
  }

  public addUser(user: User) {
    this.members.push(user)
  }

  public removeUser(user: User) {
    remove(this.members, { id: user.id })
  }

  public createMessage(user: User, message: string) {
    this.messages.push({ user, message })
  }

  public static create(creator: User) {
    const room = new GameRoom(creator)
    const game_manager = GameManager.create()
    room.game_manager_id = game_manager.id
    return { room, game_manager }
  }
}
