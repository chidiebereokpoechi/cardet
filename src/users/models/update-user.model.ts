import { IsString } from 'class-validator'

export class UpdateUserModel {
  @IsString()
  public name!: string
}
