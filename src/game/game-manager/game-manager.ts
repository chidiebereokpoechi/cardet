import { User } from 'cardet/database'
import { Card, CardType, DISTRIBUTED_VALUES } from 'cardet/engine/card'
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
      ...Card.createManyOfType(CardType.ALPHA, DISTRIBUTED_VALUES),
      ...Card.createManyOfType(CardType.BRAVO, DISTRIBUTED_VALUES),
      ...Card.createManyOfType(CardType.CHARLIE, DISTRIBUTED_VALUES),
      ...Card.createManyOfType(CardType.DELTA, DISTRIBUTED_VALUES),
      ...Card.createManyOfType(CardType.ECHO, DISTRIBUTED_VALUES),
      ...Card.createManyOfType(CardType.FOXTROT, DISTRIBUTED_VALUES),
    ]

    this.previous_game = this.game
    this.game = Game.create(GameManager.createPlayers(users), STANDARD_DECK)
  }

  public endGame() {
    this.previous_game = this.game
    this.game = null
  }

  public getGameState(user: User) {
    if (!this.game) return null
    const player = this.getPlayer(user)
    const state = {
      play_count: this.play_count,
      ...this.game?.serialize(player.id),
    }

    return state
  }

  public checkGameOver() {
    if (this.game?.has_winner) {
      throw new Error('Game is over')
    }
  }

  public play(user: User, indices: number[]) {
    this.checkGameOver()
    const player = this.getPlayer(user)
    player.selectCards(...indices)
    this.game?.play(player)
    this.play_count++
  }

  public pick(user: User) {
    this.checkGameOver()
    const player = this.getPlayer(user)
    this.game?.pick(player)
    this.play_count++
  }

  public sort(user: User) {
    this.checkGameOver()
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
