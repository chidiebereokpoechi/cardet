import { CardValue } from 'cardet/engine/card'
import {
  BLOCK_RULE,
  DEFAULT_RULE,
  GENERAL_MARKET_RULE,
  PICK_THREE_RULE,
  PICK_TWO_RULE,
} from '../rules'
import { Rule } from './rule'

export class RuleManager {
  public static getRuleForValue(value: CardValue): Rule {
    switch (value) {
      case CardValue.PICK_TWO:
        return PICK_TWO_RULE
      case CardValue.PICK_THREE:
        return PICK_THREE_RULE
      case CardValue.GENERAL_MARKET:
        return GENERAL_MARKET_RULE
      case CardValue.BLOCK:
        return BLOCK_RULE
      default:
        return DEFAULT_RULE
    }
  }
}
