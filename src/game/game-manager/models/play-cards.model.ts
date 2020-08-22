import { IsInt } from 'class-validator'

export class PlayCardsModel {
  @IsInt({ each: true })
  public indices!: number[]
}
