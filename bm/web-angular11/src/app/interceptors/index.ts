/* "Barrel" of Http Interceptors */
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {
  CustomUrlInterceptor,
  CustomHeadersInterceptor,
  LoggingInterceptor,
  HitLocalAgentInterceptor,
  SessionTimeoutInterceptor
} from './http-interceptors';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  // {provide: HTTP_INTERCEPTORS, useClass: HitLocalAgentInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: CustomUrlInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: CustomHeadersInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: SessionTimeoutInterceptor, multi: true}
];
