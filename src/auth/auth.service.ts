import { Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from 'cardet/database'
import { UsersService } from 'cardet/users'

@Injectable()
export class AuthService {
  @Inject(UsersService)
  protected readonly service!: UsersService

  @Inject(JwtService)
  protected readonly jwt_service!: JwtService

  public async verify(id: string) {
    return await this.service.retrieve(id)
  }

  public logIn(user: User) {
    return {
      access_token: this.jwt_service.sign({ ...user }),
    }
  }
}
