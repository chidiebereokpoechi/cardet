import { User } from 'cardet/database'
import { omit, reduce } from 'lodash'
import {
  ALL_CARD_TYPES,
  ALL_CARD_VALUES,
  Card,
  CardType,
  CardValue,
  NUMERIC_CARD_VALUES,
} from './card'
import { Game } from './game'
import { Player } from './player'

export function testEngine() {
  const fry = Player.create(User.create('fry'))
  const leela = Player.create(User.create('leela'))
  const amy = Player.create(User.create('amy'))
  const players = [fry, leela, amy]

  const deck = [
    ...[...new Array(56)].map(() =>
      Card.create([CardType.ALPHA, CardValue.ONE]),
    ),
  ]

  const game = Game.create(players, deck)

  fry.cards = [Card.create([CardType.ALPHA, CardValue.PICK_THREE])]
  fry.selectCards(0)
  // console.log(fry.selected_cards.map(card => ({ name: card.name })))
  game.play(fry)

  leela.cards = [...Card.createManyOfType(CardType.ALPHA, [CardValue.BLOCK])]

  const playable_cards_indices = reduce(
    leela.cards.slice(0, 1),
    (indices, card, index) =>
      game.canAccept(card) ? indices.concat(index) : indices,
    [] as number[],
  )
  console.table(playable_cards_indices)
}
