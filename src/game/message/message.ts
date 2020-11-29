import { User } from '../../database'

export interface Message {
  user: User
  message: string
}
