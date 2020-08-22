import { Injectable } from '@nestjs/common'
import { Game } from 'cardet/engine/game'
import * as loki from 'lokijs'
import { GameManager } from '../game-manager'
import { GameRoom } from '../rooms'

const store = new loki('game.store', {
  autoload: true,
  autoloadCallback() {
    console.log('Database loaded successfully')
  },
  autosaveInterval: 5000,
  autosave: true,
  autosaveCallback() {
    console.log('Database saved successfully')
  },
})

@Injectable()
export class GameStore {
  public readonly rooms: loki.Collection<GameRoom>
  public readonly games: loki.Collection<Game>
  public readonly game_managers: loki.Collection<GameManager>

  constructor() {
    this.rooms = store.addCollection('rooms')
    this.games = store.addCollection('games')
    this.game_managers = store.addCollection('game-managers')
  }
}
