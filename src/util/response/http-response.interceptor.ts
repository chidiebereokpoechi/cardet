import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Response } from 'express'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { HttpApiResponse } from './api-response'
import { ServiceResponse } from './service-response'

@Injectable()
export class HttpResponseInterceptor<T extends any>
  implements NestInterceptor<T, HttpApiResponse<T>> {
  public transform_http(response: Response) {
    const response_params = { ok: true, status: response.statusCode }

    return (obj: T): HttpApiResponse<T> => {
      if (obj instanceof ServiceResponse) {
        return {
          ...response_params,
          data: obj.data,
          message: obj.message,
        }
      }

      return {
        ...response_params,
        data: obj,
        message: 'Action successful',
      }
    }
  }

  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const ctx = context.switchToHttp()
    const response = ctx.getResponse<Response>()
    return next.handle().pipe(map(this.transform_http(response)))
  }
}
