import { Module } from '@nestjs/common'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { AuthModule } from 'cardet/auth'
import { UsersModule } from 'cardet/users'
import { get } from 'config'

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...get<TypeOrmModuleOptions>('database') }),
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
