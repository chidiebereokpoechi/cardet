import 'module-alias/register'

import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { HttpResponseInterceptor } from 'cardet/util'
import { get } from 'config'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api')
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )
  app.useGlobalInterceptors(new HttpResponseInterceptor())
  app.enableCors()

  await app.listen(get<number>('app.port'))
}

bootstrap()
