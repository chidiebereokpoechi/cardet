import { Game } from 'cardet/engine/game'
import { Action, Rule, RuleManager, RuleProps } from '../../rule-manager'
import { DefaultAction } from './default.action'

export class DefaultRule implements Rule {
  public props: RuleProps

  constructor(props?: Partial<RuleProps>) {
    this.props = {
      should_freeze_turn: props?.should_freeze_turn ?? false,
    }
  }

  public nextRule(game: Game): Rule {
    const { match_card } = game
    return RuleManager.getRuleForValue(match_card.value)
  }

  public interpret(game: Game): Action {
    if (this.props.should_freeze_turn) {
      game.freezeTurn()
    }

    return new DefaultAction()
  }
}
