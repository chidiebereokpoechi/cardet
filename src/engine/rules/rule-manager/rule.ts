import { Game } from 'cardet/engine/game'
import { Action } from './action'
import { RuleProps } from './rule-props'

export interface Rule {
  props: RuleProps
  canAccept?(game: Game): boolean
  nextRule(game: Game): Rule
  interpret(game: Game): Action
}
