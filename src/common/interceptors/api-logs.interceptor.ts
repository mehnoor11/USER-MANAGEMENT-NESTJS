import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap, catchError, from, throwError } from 'rxjs';
import { InjectModel } from '@nestjs/sequelize';
import { ApiLog } from '../../apilogs/models/apilogs.model';

@Injectable()
export class ApiLogsInterceptor implements NestInterceptor {
  constructor(
    @InjectModel(ApiLog)
    private readonly apiLogModel: typeof ApiLog,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const { method, originalUrl, body, ip, headers, query } = request;
    const startTime = Date.now();

    console.log(' ApiLogsInterceptor triggered for:', method, originalUrl);

    return next.handle().pipe(
      tap((data) => {
        // fire-and-forget async log
        this.apiLogModel
          .create({
            method,
            requestUrl: originalUrl,
            payload: body,
            response: data,
            statusCode: response.statusCode,
            ip,
            headers,
            query,
            durationMs: Date.now() - startTime,
          } as any)
          .catch((err) =>
            console.error('Error saving API log:', err.message),
          );
      }),
      catchError((err) => {
        this.apiLogModel
          .create({
            method,
            requestUrl: originalUrl,
            payload: body,
            response: { error: err.message },
            statusCode: response.statusCode || 500,
            ip,
            headers,
            query,
            durationMs: Date.now() - startTime,
          } as any)
          .catch((logErr) =>
            console.error('Error saving API error log:', logErr.message),
          );

        return throwError(() => err);
      }),
    );
  }
}
