import { merge } from 'lodash'
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({ length: 256 })
  public name: string

  @Column({ length: 256 })
  public room_id: string

  public static create(name: string): User {
    const user = new User()
    user.name = name
    user.room_id = ''
    return user
  }

  public static update(user: User, updates: Partial<User>): User {
    return merge(user, updates)
  }
}
