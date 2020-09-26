import { Card } from '../card'
import { Serialized } from '../misc'
import { SerializedPlayer } from '../player'

export interface SerializedGame extends Serialized {
  id: string
  players: SerializedPlayer[]
  current_player_index: number
  played_cards: Card[]
  cards: Card[]
  playable_cards_indices: number[]
  market_count: number
  game_over: boolean
  game_winner: SerializedPlayer | null
}
