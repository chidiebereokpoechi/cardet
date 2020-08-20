export class ServiceResponse<T = never> {
  public readonly data: T
  public readonly message: string

  constructor(data: T, message: string) {
    this.data = data
    this.message = message
  }

  public static async create<T>({
    data,
    message,
  }: {
    data: T | Promise<T>
    message: string
  }) {
    return new ServiceResponse(await data, message)
  }
}
