import { BlockRule } from './block'
import { DefaultRule } from './default'
import { PickRule, PickType } from './pick'

export const DEFAULT_RULE = new DefaultRule()
export const PICK_TWO_RULE = new PickRule(2, PickType.NEXT_PLAYER)
export const PICK_THREE_RULE = new PickRule(3, PickType.NEXT_PLAYER)
export const BLOCK_RULE = new BlockRule()
export const GENERAL_MARKET_RULE = new PickRule(1, PickType.OTHER_PLAYERS, {
  blockable: false,
  should_freeze_turn: true,
  transferrable: false,
})
