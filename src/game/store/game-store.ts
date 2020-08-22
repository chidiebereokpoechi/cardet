import { Injectable } from '@nestjs/common'
import { Game } from 'cardet/engine/game'
import * as loki from 'lokijs'
import { GameManager } from '../game-manager'
import { GameRoom } from '../rooms'

const store = new loki('game.store.db')

@Injectable()
export class GameStore {
  public readonly rooms = store.getCollection<GameRoom>('rooms')
  public readonly games = store.getCollection<Game>('games')
  public readonly game_managers = store.getCollection<GameManager>(
    'game-managers',
  )
}
