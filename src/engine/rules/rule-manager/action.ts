import { Game } from '../../game'

export interface Action {
  execute(game: Game): void
}
