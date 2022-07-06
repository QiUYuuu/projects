import {Inject, Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpClient} from '@angular/common/http';
import {Observable, of, race} from 'rxjs';
import {finalize, flatMap, tap} from 'rxjs/operators';
import {RdAuthService, RdBrowserStorageService, RdMessageService, RdModalService, RdSysBridgeService} from '../services';
import {Router} from '@angular/router';
import {APP_CONFIG} from '../utils/app.config';
import {RdAppConfig} from '../interfaces';
import { NzModalService } from 'ng-zorro-antd/modal';
import { GLOBAL_CONFIG } from '../utils/globalConfigs';

/** Pass untouched request through to the next request handler. */

@Injectable()
export class HitLocalAgentInterceptor implements HttpInterceptor {
  constructor(private rdSysBridgeService: RdSysBridgeService, @Inject(APP_CONFIG) private appConfig: RdAppConfig) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.has('test')) {
      return next.handle(req);
    }
    if (this.appConfig.SERVER.hosts.includes(req.url)) {
      this.rdSysBridgeService.askRandyLocally(req.url).pipe(resultSet => {
        return of(new HttpResponse({body: resultSet}));
      });
    } else {
      return next.handle(req);
    }
  }
}

@Injectable()
export class CustomUrlInterceptor implements HttpInterceptor {
  constructor(private rdBrowserStorage: RdBrowserStorageService, private http: HttpClient,
              @Inject(APP_CONFIG) private appConfig: RdAppConfig) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let urlTemp = this.appConfig.SERVER.urlTemp;
    if (req.body && !!req.body.checkUrlTemp) {
      urlTemp = this.appConfig.SERVER.checkUrlTemp;
    } else if (req.body && !!req.body.systemUrlTemp) {
      urlTemp = this.appConfig.SERVER.systemUrlTemp;
    }else if (req.body && !!req.body.socketUrlTemp) {
      urlTemp = this.appConfig.SERVER.socketUrlTemp;
    }
    else {
      urlTemp = this.appConfig.SERVER.urlTemp;
    }
    if (req.headers.has('test')) {
      return next.handle(req);
    }
    const host = this.rdBrowserStorage.get('host');
    if (host) {
      return next.handle(/^(http|https):\/\/.+$/.test(req.url) ? req
        : req.clone({
          withCredentials: true,
          url: `${this.appConfig.SERVER.schema}://${host}:${this.appConfig.SERVER.port}/${urlTemp}${req.url}`
        }));
    }
    if (this.appConfig.test) {
      return race(this.appConfig.SERVER.hosts.map(_host =>
        this.http.options<HttpResponse<Object>>(
          `${this.appConfig.SERVER.schema}://${_host}:${this.appConfig.SERVER.port}/${urlTemp}${req.url}`,
          {headers: {'test': 'true'}, withCredentials: true, observe: 'response'})).flat())
        .pipe(
          flatMap((httpResponse: HttpResponse<Object>) => {
              const matchResult = httpResponse.url.match(/(?<=\/\/).*(?=:)/);
              if (matchResult) {
                this.rdBrowserStorage.set('host', matchResult[0]);
                return next.handle(/^(http|https):\/\/.+$/.test(req.url) ? req
                  : req.clone({
                    withCredentials: true,
                    // tslint:disable-next-line: max-line-length
                    url: `${this.appConfig.SERVER.schema}://${matchResult[0]}:${this.appConfig.SERVER.port}/${urlTemp}${req.url}`
                  }));
              }
            }
          )
        );
    } else {
      return next.handle(/^(http|https):\/\/.+$/.test(req.url) ? req
        : req.clone({
          withCredentials: true,
          url: `${this.appConfig.SERVER.schema}://${window.location.host}/${urlTemp}${req.url}`
        }));
    }
  }
}

@Injectable()
export class CustomHeadersInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // tslint:disable-next-line: max-line-length
    const urlArray = [`https://${window.location.host}/${GLOBAL_CONFIG.SERVER.urlTemp}qualifications/uploadimg`, `http://localhost:5800/${GLOBAL_CONFIG.SERVER.urlTemp}qualifications/uploadimg`,
    `http://localhost:5800/${GLOBAL_CONFIG.SERVER.urlTemp}form/uploadimg`, `https://${window.location.host}/${GLOBAL_CONFIG.SERVER.urlTemp}form/uploadimg`];

    if (req.headers.has('test')) {
      return next.handle(req);
    }
    if (urlArray.indexOf(req.url.split('?')[0]) >= 0) {
      return next.handle(req);
    } else {
      return next.handle(req.clone({setHeaders: {'Content-Type': 'application/json'}}));
    }
  }
}

@Injectable()
export class SessionTimeoutInterceptor implements HttpInterceptor {
  constructor(private router: Router, private modal: NzModalService, private rdAuth: RdAuthService,
              private rdBrowserStorage: RdBrowserStorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.headers.has('test')) {
      return next.handle(req);
    }
    return next.handle(req)
      .pipe(
        tap(data => {
          if (data.type === 4 && data['status'] === 200) {
            if (data['body']['respCode'] === 'e301') {
              this.showConfirm({
                title: '用户超时提示',
                  content: '当前用户登录超时，请重新登录！',
                  type: 'SESSION_TIME_OUT'
              });
            }
            if (data['body']['respCode'] === 't301') {
              this.showConfirm({
                title: '入口关闭',
                content: '当前申报入口关闭',
                type: 'SESSION_TIME_OUT'
              });
            }
          }
        }, () => this.rdBrowserStorage.remove('host')));
  }

  showConfirm(modalOption: Object): void {
    const that = this;
    this.modal.confirm({
      nzTitle: `<i>${modalOption['title']}</i>`,
      nzContent: `<b>${modalOption['content']}</b>`,
      nzCancelDisabled: true,
      nzClosable: false,
      nzOnOk: () => that.switchModal(modalOption['type']),
      nzOnCancel: () => console.log('Cancel')
    });
  }

  switchModal(type: string) {
    switch (type) {
      case 'SESSION_TIME_OUT':
        this.router.navigateByUrl('login').then(() => this.rdAuth.isLogin = false).catch(e => console.log(e));
        break;
      case 'dataLimit':
        this.router.navigateByUrl('new-tab').then(() => {
         }).catch(e => console.log(e));
        break;
      case 'denied':
        this.router.navigate(['account/qualification']);
        break;
    }
  }
}

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor(private messenger: RdMessageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.headers.has('test')) {
      return next.handle(req);
    }
    const started = Date.now();
    let ok: string;

    // extend server response observable with logging
    return next.handle(req)
      .pipe(
        tap(
          data => console.log('In http tap, data comes: ', data),
          error1 => console.error('In http tap, error comes: ', error1),
          () => console.log('In http complete, complete invoked!')
        ),
        tap(
          // Succeeds when there is a response; ignore other events
          event => ok = event instanceof HttpResponse ? 'succeeded' : '',
          // Operation failed; error is an HttpErrorResponse
          error2 => ok = error2
        ),
        // Log when response observable either completes or errors
        finalize(() => {
          const elapsed = Date.now() - started;
          const msg = `${req.method} "${req.urlWithParams}"
             ${ok} in ${elapsed} ms.`;
          this.messenger.print(msg);
        })
      );
  }
}
