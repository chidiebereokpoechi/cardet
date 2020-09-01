import { every, flatten, map, shuffle, times, uniq } from 'lodash'
import { v4 } from 'uuid'
import { CardDefinition } from './card-pair'
import { CardType } from './card-type'
import { CardValue } from './card-value'

export class Card {
  public readonly id: string
  public readonly type: CardType
  public readonly value: CardValue
  public readonly name: string

  private constructor([type, value]: CardDefinition) {
    this.id = v4()
    this.type = type
    this.value = value
    this.name = `${CardType[type]} ${CardValue[value]}`
  }

  public static create(card: CardDefinition) {
    return new Card(card)
  }

  public static createMany(cards: CardDefinition[]) {
    return map(cards, card => this.create(card))
  }

  public static createManyOfType(
    type: CardType,
    values: CardValue[],
    n: number = 1,
  ) {
    const mapped = () => map(uniq(values), value => this.create([type, value]))
    const nested = times(n, mapped)
    return flatten(nested)
  }

  public static createManyOfValue(
    value: CardValue,
    types: CardType[],
    n: number = 1,
  ) {
    const mapped = () => map(uniq(types), type => this.create([type, value]))
    const nested = times(n, mapped)
    return flatten(nested)
  }

  public static matches(bottom: Card, top: Card) {
    return (
      bottom.type === top.type ||
      bottom.value === top.value ||
      bottom.value === CardValue.ANY
    )
  }

  public static canStack(cards: Card[]) {
    return every(cards, { value: cards[0].value })
  }

  public static shuffleCards(cards: Card[]) {
    return shuffle(cards)
  }
}
