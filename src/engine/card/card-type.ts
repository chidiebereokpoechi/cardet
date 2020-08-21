export enum CardType {
  ALPHA,
  BRAVO,
  CHARLIE,
  DELTA,
  ECHO,
  FOXTROT,
  // For non-specific cards
  ANY,
}

export const ALL_CARD_TYPES = [
  CardType.ALPHA,
  CardType.BRAVO,
  CardType.CHARLIE,
  CardType.DELTA,
  CardType.ECHO,
  CardType.FOXTROT,
  // Not included in bulk creations
  // CardType.ANY
]
