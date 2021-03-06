export enum CardValue {
  // Number cards
  ZERO,
  ONE,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
  TEN,
  // Action cards
  ANY,
  PICK_TWO,
  PICK_THREE,
  GENERAL_MARKET,
  BLOCK,
  FREEZE,
}

export const NUMERIC_CARD_VALUES = [
  CardValue.ZERO,
  CardValue.ONE,
  CardValue.TWO,
  CardValue.THREE,
  CardValue.FOUR,
  CardValue.FIVE,
  CardValue.SIX,
  CardValue.SEVEN,
  CardValue.EIGHT,
  CardValue.NINE,
  CardValue.TEN,
]

export const ACTION_CARD_VALUES = [
  CardValue.ANY,
  CardValue.PICK_TWO,
  CardValue.PICK_THREE,
  CardValue.GENERAL_MARKET,
  CardValue.BLOCK,
  CardValue.FREEZE,
]

export const DISTRIBUTED_VALUES = [
  ...NUMERIC_CARD_VALUES,
  ...NUMERIC_CARD_VALUES,
  ...NUMERIC_CARD_VALUES,
  ...ACTION_CARD_VALUES,
]
