import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { UsersModule } from 'cardet/users'
import { get } from 'config'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy, LocalStrategy } from './strategies'

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: get<string>('app.secret'),
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
