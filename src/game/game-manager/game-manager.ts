import { User } from 'cardet/database'
import {
  ACTION_CARD_VALUES,
  ALL_CARD_VALUES,
  Card,
  CardType,
} from 'cardet/engine/card'
import { Game } from 'cardet/engine/game'
import { Player } from 'cardet/engine/player'
import { find, map } from 'lodash'
import { v4 } from 'uuid'

export class GameManager {
  public id: string
  public previous_game: Game | null
  public game: Game | null
  public play_count: number

  private constructor() {
    this.id = v4()
    this.previous_game = null
    this.game = null
    this.play_count = 0
  }

  public getPlayer(user: User) {
    const player = find(this.game?.players, _ => _.user.id === user.id)

    if (!player) {
      throw new Error('Player not found')
    }

    return player
  }

  public startGame(users: User[]) {
    const STANDARD_DECK = [
      ...Card.createManyOfType(CardType.ALPHA, ALL_CARD_VALUES),
      ...Card.createManyOfType(CardType.BRAVO, ALL_CARD_VALUES),
      ...Card.createManyOfType(CardType.CHARLIE, ALL_CARD_VALUES),
      ...Card.createManyOfType(CardType.DELTA, ALL_CARD_VALUES),
      ...Card.createManyOfType(CardType.ECHO, ALL_CARD_VALUES),
      ...Card.createManyOfType(CardType.FOXTROT, ALL_CARD_VALUES),
      ...Card.createManyOfType(CardType.ANY, ACTION_CARD_VALUES),
    ]

    this.previous_game = this.game
    this.game = Game.create(GameManager.createPlayers(users), STANDARD_DECK)
  }

  public endGame() {
    this.previous_game = this.game
    this.game = null
  }

  public getGameState(user: User) {
    const player = this.getPlayer(user)
    return {
      play_count: this.play_count,
      ...this.game?.serialize(player.id),
    }
  }

  public play(user: User, indices: number[]) {
    const player = this.getPlayer(user)
    player.selectCards(...indices)
    this.game?.play(player)
    this.play_count++
  }

  public pick(user: User) {
    const player = this.getPlayer(user)
    this.game?.pick(player)
    this.play_count++
  }

  public sort(user: User) {
    const player = this.getPlayer(user)
    player.sortCards()
  }

  public static create() {
    return new GameManager()
  }

  public static createPlayers(users: User[]) {
    return map(users, Player.create)
  }
}
