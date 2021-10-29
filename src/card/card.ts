import { v4 } from 'uuid'
import { CardType } from './card-type'
import { CardValue } from './card-value'

export class Card {
    public readonly id: string
    public type: CardType
    public readonly value: CardValue
    public readonly name: string

    constructor(type: CardType, value: CardValue) {
        this.id = v4()
        this.type = type
        this.value = value
        this.name = `${CardType[type]} ${CardValue[value]}`
    }

    public matches(card: Card): boolean {
        return (
            card.type === CardType.ANY ||
            card.value === this.value ||
            card.type === this.type
        )
    }

    public static canStack(cards: Card[]): boolean {
        return cards.every((card) => card.value === cards[0].value)
    }
}
