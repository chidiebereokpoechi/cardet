import { User } from 'cardet/database'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(User)
export class UsersRepository extends Repository<User> {}
