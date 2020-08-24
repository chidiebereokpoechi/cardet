import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from 'cardet/database'
import { Socket } from 'socket.io'
import { getRepository } from 'typeorm'

export const ConnectedUser = createParamDecorator(
  (_data: string, ctx: ExecutionContext) => {
    if (ctx.getType() === 'http') {
      const request = ctx.switchToHttp().getRequest()
      const user = request.user as User
      return getRepository(User).findOne(user.id)
    }

    const client = ctx.switchToWs().getClient() as Socket
    const user_id = client.handshake.query.user_id as string
    return getRepository(User).findOne(user_id)
  },
)
