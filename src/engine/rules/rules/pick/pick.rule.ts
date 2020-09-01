import { Card } from 'cardet/engine/card'
import { Game } from 'cardet/engine/game'
import { RuleManager } from '../../rule-manager'
import { Action } from '../../rule-manager/action'
import { Rule } from '../../rule-manager/rule'
import { RuleProps } from '../../rule-manager/rule-props'
import { BlockRule } from '../block'
import { DefaultAction } from '../default'
import { PickType } from './pick-type'
import { PickAction } from './pick.action'

interface PickRuleProps extends RuleProps {
  stackable: boolean
  blockable: boolean
  transferrable: boolean
}

export class PickRule implements Rule {
  public pick_count: number
  public pick_type: PickType
  public props: PickRuleProps

  constructor(
    pick_count: number,
    pick_type: PickType,
    props?: Partial<PickRuleProps>,
  ) {
    this.pick_count = pick_count
    this.pick_type = pick_type
    this.props = {
      stackable: props?.stackable ?? true,
      blockable: props?.blockable ?? true,
      transferrable: props?.transferrable ?? true,
      should_freeze_turn: props?.should_freeze_turn ?? false,
    }
  }

  public canAccept(game: Game, card?: Card): boolean {
    const { pending_action, center_card } = game
    const match_card = card ?? game.match_card
    const rule = RuleManager.getRuleForValue(match_card.value)

    if (!(pending_action instanceof PickAction)) {
      const matches = Card.matches(center_card, match_card)
      return Card.matches(center_card, match_card)
    }

    if (
      !(rule instanceof BlockRule) &&
      !(rule instanceof PickRule && this.pick_count === rule.pick_count)
    ) {
      return false
    }

    return true
  }

  public nextRule(game: Game, card?: Card): Rule {
    const { pending_action } = game
    const match_card = card ?? game.match_card
    const rule = RuleManager.getRuleForValue(match_card.value)

    if (!(pending_action instanceof PickAction)) {
      return rule
    }

    if (
      !(rule instanceof BlockRule) &&
      !(rule instanceof PickRule && this.pick_count === rule.pick_count)
    ) {
      throw new Error('You must block this')
    }

    return rule
  }

  public interpret(game: Game): Action {
    const { pending_action, next_player, other_players, attempted_cards } = game
    let multiplier = (this.props.stackable && attempted_cards.length) || 1

    if (pending_action instanceof PickAction) {
      multiplier += pending_action.props.multiplier
    }

    let action: Action = new PickAction(
      this.pick_count,
      this.pick_type === PickType.NEXT_PLAYER ? [next_player] : other_players,
      { multiplier },
    )

    if (!this.props.blockable) {
      action.execute(game)
      action = new DefaultAction()
    }

    if (this.props.should_freeze_turn) {
      game.freezeTurn()
    }

    return action
  }
}
