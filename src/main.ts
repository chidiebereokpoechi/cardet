import 'module-alias/register'

import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { HttpResponseInterceptor } from 'cardet/util'
import { get } from 'config'
import { AppModule } from './app.module'
import { testEngine } from './engine/test-engine'

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

function runTest() {
  testEngine()
}

bootstrap()
// runTest()
