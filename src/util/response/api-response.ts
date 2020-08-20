export interface WsApiResponse<T = never> {
  ok: boolean
  data: T
  message?: string
}

export interface HttpApiResponse<T = never> extends WsApiResponse<T> {
  status: number
}
