import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common'
import { User } from 'cardet/database'
import { UsersService } from 'cardet/users'
import { Socket } from 'socket.io'

@Injectable()
export class WsAuthGuard implements CanActivate {
  @Inject(UsersService)
  private readonly service!: UsersService

  public async canActivate(context: ExecutionContext) {
    const request = context.switchToWs()
    const { user }: { user: User } = request.getClient<Socket>().handshake.query
    const retrieved = await this.service.retrieve(user.id)

    if (!retrieved) {
      return false
    }

    request.getClient().handshake.query.user = retrieved
    return true
  }
}
