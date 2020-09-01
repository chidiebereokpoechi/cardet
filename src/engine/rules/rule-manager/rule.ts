import { Card } from 'cardet/engine/card'
import { Game } from 'cardet/engine/game'
import { Action } from './action'
import { RuleProps } from './rule-props'

export interface Rule {
  props: RuleProps
  canAccept?(game: Game, card?: Card): boolean
  nextRule(game: Game, card?: Card): Rule
  interpret(game: Game): Action
}
