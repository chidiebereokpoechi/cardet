import { merge } from 'lodash'
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  public readonly id!: string

  @Column({ length: 256 })
  public name: string

  @Column({ length: 256 })
  public room_id: string

  private constructor(name: string) {
    this.name = name
    this.room_id = ''
  }

  public static create(name: string): User {
    return new User(name)
  }

  public static update(user: User, updates: Partial<User>): User {
    return merge(user, updates)
  }
}
