import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common'
import { ServiceResponse } from 'cardet/util'
import { UpdateUserModel } from './models'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  @Inject(UsersService)
  public readonly service!: UsersService

  @Post()
  public create() {
    return ServiceResponse.create({
      data: this.service.create(),
      message: 'User created successfully',
    })
  }

  @Get(':id')
  public retrieve(@Param('id', ParseUUIDPipe) id: string) {
    return ServiceResponse.create({
      data: this.service.retrieve(id),
      message: 'User retrieved successfully',
    })
  }

  @Patch(':id')
  public update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() model: UpdateUserModel,
  ) {
    return ServiceResponse.create({
      data: this.service.update(id, model),
      message: 'User updated successfully',
    })
  }
}
