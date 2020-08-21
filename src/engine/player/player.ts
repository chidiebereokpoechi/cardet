import { User } from 'cardet/database'
import { filter, forEach, includes, map, sortBy, uniqueId } from 'lodash'
import { Card } from '../card'
import { Serializable } from '../misc'
import { SerializedPlayer } from './serialized-player'

export class Player implements Serializable {
  private selected_indices: number[]
  public readonly id: string
  public readonly user: User
  public cards: Card[]

  private get cards_count() {
    return this.cards.length
  }

  public get selected_cards() {
    return map(this.selected_indices, index => this.cards[index])
  }

  private constructor(user: User) {
    this.id = uniqueId()
    this.selected_indices = []
    this.user = user
    this.cards = []
  }

  public selectCard(index: number) {
    if (index < 0 || index > this.cards_count - 1) {
      throw new Error('Invalid card selection')
    }

    if (!includes(this.selected_indices, index)) {
      this.selected_indices.push(index)
    }
  }

  public selectCards(...indices: number[]) {
    forEach(indices, index => this.selectCard(index))
  }

  public clearSelection() {
    this.selected_indices = []
  }

  public releaseCards(): Card[] {
    const cards = this.selected_cards

    this.cards = filter(
      this.cards,
      (_, index) => !includes(this.selected_indices, index),
    )

    this.selected_indices = []
    return cards
  }

  public collectCards(cards: Card[]) {
    this.cards.push(...cards)
  }

  public sortCards(by: keyof Card = 'value') {
    this.cards = sortBy(this.cards, by)
  }

  public serialize(): SerializedPlayer {
    return {
      id: this.user.id,
      name: this.user.name,
      cards_count: this.cards_count,
    }
  }

  public static create(user: User) {
    return new Player(user)
  }
}
