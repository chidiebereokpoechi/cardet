import { Game } from 'cardet/engine/game'
import { Player } from 'cardet/engine/player'
import { forEach } from 'lodash'
import { Action } from '../../rule-manager/action'

export interface PickActionProps {
  multiplier: number
}

export class PickAction implements Action {
  public pick_count: number
  public players: Player[]
  public props: PickActionProps

  constructor(
    pick_count: number,
    players: Player[],
    props?: Partial<PickActionProps>,
  ) {
    this.pick_count = pick_count
    this.players = players
    this.props = {
      multiplier: props?.multiplier ?? 1,
    }
  }

  public execute(game: Game) {
    forEach(this.players, player =>
      player.collectCards(
        game.drawCards(this.pick_count * this.props.multiplier),
      ),
    )
  }
}
