import { User } from 'cardet/database'
import { reduce } from 'lodash'
import {
  ALL_CARD_TYPES,
  ALL_CARD_VALUES,
  Card,
  CardType,
  CardValue,
} from './card'
import { Game } from './game'
import { Player } from './player'

export function testEngine() {
  const fry = Player.create(User.create('fry'))
  const leela = Player.create(User.create('leela'))
  const amy = Player.create(User.create('amy'))
  const players = [fry, leela, amy]

  const deck = [
    Card.create([CardType.ALPHA, CardValue.EIGHT]),
    ...[...new Array(5)].map(() =>
      Card.create([CardType.ALPHA, CardValue.PICK_TWO]),
    ),
    ...[...new Array(5)].map(() =>
      Card.create([CardType.ALPHA, CardValue.BLOCK]),
    ),
    ...[...new Array(5)].map(() =>
      Card.create([CardType.ALPHA, CardValue.GENERAL_MARKET]),
    ),
  ]

  const game = Game.create(players, deck)

  fry.selectCards(0, 2, 3)
  leela.selectCards(0, 1)
  amy.selectCards(0, 1, 2, 3)

  game.play(fry)
  game.play(leela)
  game.play(amy)
}
