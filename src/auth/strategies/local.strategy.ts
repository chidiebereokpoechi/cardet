import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { User } from 'cardet/database'
import { Strategy } from 'passport-local'
import { AuthService } from '../auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  @Inject(AuthService)
  private readonly auth_service!: AuthService

  constructor() {
    super({
      usernameField: 'id',
      passwordField: 'id',
    })
  }

  public async validate(id: string) {
    return this.auth_service.verify(id)
  }
}
