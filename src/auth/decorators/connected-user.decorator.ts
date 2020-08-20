import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from 'cardet/database'
import { getRepository } from 'typeorm'

export const ConnectedUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const user = request.user as User
    return getRepository(User).findOne(user.id)
  },
)
