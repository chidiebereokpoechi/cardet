import { Inject, Injectable } from '@nestjs/common'
import { User } from 'cardet/database'
import { getRandomName } from 'cardet/util'
import { UsersRepository } from './users.repository'

@Injectable()
export class UsersService {
  @Inject(UsersRepository)
  protected readonly repository: UsersRepository

  public async create(): Promise<User> {
    return this.repository.save(User.create(getRandomName()))
  }

  public async retrieve(id: string) {
    return this.repository.findOne(id)
  }

  public async update(id: string, model: Partial<User>) {
    const player = await this.retrieve(id)
    return this.repository.save(User.update(player, model))
  }
}
