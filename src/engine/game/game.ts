import { filter, find, forEach, map, reduce, slice, some } from 'lodash'
import { v4 } from 'uuid'
import { Card } from '../card'
import { Serializable } from '../misc'
import { Player } from '../player'
import { Action, Rule } from '../rules/rule-manager'
import { DefaultAction, DEFAULT_RULE, PickAction } from '../rules/rules'
import { SerializedGame } from './serialized-game'

export class Game implements Serializable {
  public readonly id: string
  public market: Card[]
  public played_cards: Card[]
  public attempted_cards: Card[]
  public players: Player[]
  public last_player?: Player
  public turn_index: number
  public turn_frozen: boolean
  public current_rule: Rule
  public pending_action: Action
  public has_winner: boolean

  public get current_player() {
    return this.players[this.turn_index]
  }

  public get next_player() {
    return this.players[this.peekNextTurn()]
  }

  public get other_players() {
    return filter(this.players, (_, i) => i !== this.turn_index)
  }

  public get center_card() {
    return this.played_cards[this.played_cards.length - 1]
  }

  public get match_card() {
    return this.attempted_cards[0]
  }

  private constructor(players: Player[], deck: Card[]) {
    this.id = v4()
    this.market = deck ?? Card.shuffleCards(deck)
    this.players = players
    this.played_cards = this.drawCards(1)
    this.attempted_cards = []
    this.last_player = undefined
    this.turn_index = 0
    this.turn_frozen = false
    this.current_rule = DEFAULT_RULE
    this.pending_action = new DefaultAction()
    this.has_winner = false
    this.dealCards()
  }

  private reclaimMarket() {
    const reclaimed = slice(this.played_cards, 0, this.played_cards.length - 1)
    this.played_cards = slice(this.played_cards, -1)
    this.market = Card.shuffleCards(this.market.concat(reclaimed))
  }

  public hasWinner() {
    this.has_winner = some(this.players, { 'cards.length': 0 })
  }

  public drawCards(count: number = 1): Card[] {
    if (count > this.market.length) {
      this.reclaimMarket()
    }

    const drawn = slice(this.market, 0, count)
    this.market = slice(this.market, count)
    return drawn
  }

  public dealCards(count: number = 5) {
    forEach(this.players, player => {
      player.collectCards(this.drawCards(count))
    })
  }

  public freezeTurn() {
    this.turn_frozen = true
  }

  public nextTurn() {
    if (this.turn_frozen) {
      this.turn_frozen = false
      return
    }

    this.turn_index = this.peekNextTurn()
  }

  public peekNextTurn() {
    return this.turn_index + 1 === this.players.length ? 0 : this.turn_index + 1
  }

  public canAccept(card: Card) {
    return (
      this.current_rule.canAccept?.(this) ??
      Card.matches(this.center_card, card)
    )
  }

  public checkCards(cards: Card[]) {
    if (!Card.canStack(cards)) {
      console.table(cards)
      throw new Error('You cannot stack these cards together')
    }

    if (!this.canAccept(cards[0])) {
      throw new Error('You cannot play that card')
    }

    this.attempted_cards = cards
  }

  public checkTurn(player: Player) {
    if (player.id !== this.current_player.id) {
      throw new Error('It is not your turn')
    }
  }

  public checkRule() {
    this.current_rule = this.current_rule.nextRule(this)
  }

  public interpret() {
    this.pending_action = this.current_rule.interpret(this)
    this.played_cards.push(...this.attempted_cards)
  }

  public execute() {
    this.pending_action.execute(this)
    this.pending_action = new DefaultAction()
  }

  public play(player: Player) {
    if (player.selected_cards.length === 0) {
      return this.pick(player)
    }

    try {
      const cards = player.selected_cards
      this.checkTurn(player)
      this.checkCards(cards)
      this.checkRule()
      this.interpret()
      this.nextTurn()
      player.releaseCards()
    } catch (error) {
      console.log(error.message)
    }
  }

  public pick(player: Player) {
    try {
      this.checkTurn(player)

      if (!(this.pending_action instanceof PickAction)) {
        player.collectCards(this.drawCards(1))
      }

      this.execute()
      this.nextTurn()
    } catch (error) {
      console.log(error.message)
    }
  }

  public serialize(player_id: string): SerializedGame {
    const player = find(this.players, { id: player_id })

    if (!player) {
      throw new Error('Player not found')
    }

    const playable_cards_indices = reduce(
      player.cards,
      (indices, card, index) =>
        this.canAccept(card) ? indices.concat(index) : indices,
      [] as number[],
    )

    return {
      id: this.id,
      played_cards: this.played_cards,
      players: map(this.players, _ => _.serialize()),
      current_player_index: this.turn_index,
      cards: player.cards,
      playable_cards_indices,
      market_count: this.market.length,
      game_over: this.has_winner,
    }
  }

  public static create(players: Player[], deck: Card[]) {
    return new Game(players, deck)
  }
}
