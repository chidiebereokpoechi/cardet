import { Serialized } from '../misc'

export interface SerializedPlayer extends Serialized {
  id: string
  name: string
  cards_count: number
}
