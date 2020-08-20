import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { User } from 'cardet/database'
import { get } from 'config'
import { pick } from 'lodash'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: get<string>('app.secret'),
    })
  }

  public async validate(payload: User) {
    return { ...pick(payload, 'id', 'name', 'room_id') }
  }
}
