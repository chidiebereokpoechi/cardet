import { Module } from '@nestjs/common'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { AuthModule } from 'cardet/auth'
import { UsersModule } from 'cardet/users'
import { get } from 'config'
import { GameModule } from './game/game.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...get<TypeOrmModuleOptions>('database') }),
    AuthModule,
    UsersModule,
    GameModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
