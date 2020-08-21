import { Game } from 'cardet/engine/game'
import { Action } from '../../rule-manager'

export class DefaultAction implements Action {
  public execute(game: Game) {
    // Do nothing
  }
}
