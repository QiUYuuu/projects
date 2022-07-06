import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpEventType} from '@angular/common/http';
import {RdAppConfig, RdHttpRequestParams, RdHttpResponseStructure} from '../interfaces';
import {Observable, throwError} from 'rxjs';
import {catchError, retry, timeout, debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {RdModalService} from './rd-modal.service';
import { RdCommonService } from './rd-common.service';
import {APP_CONFIG} from '../utils/app.config';
import { ObserveOnMessage } from 'rxjs/internal/operators/observeOn';
import {NzMessageService} from 'ng-zorro-antd/message';

enum Method {
  GET = 'params', DELETE = 'params', HEAD = 'params', OPTIONS = 'params',
  POST = 'body', PUT = 'body', PATCH = 'body'
}

@Injectable({
  providedIn: 'root'
})
export class RdHttpService {

  constructor(private http: HttpClient, private rdModalService: RdModalService, @Inject(APP_CONFIG) private appConfig: RdAppConfig,
              private rdCommonService: RdCommonService, private message: NzMessageService) {
  }

  public get(url: string, requsetParams?: RdHttpRequestParams, options?: object): Observable<RdHttpResponseStructure> {
    return this.request(url, 'GET', requsetParams || {}, options || {});
  }

  public patch(url: string, requsetParams?: RdHttpRequestParams, options?: object): Observable<RdHttpResponseStructure> {
    return this.request(url, 'PATCH', requsetParams || {}, options || {});
  }

  // tslint:disable-next-line: max-line-length
  public post(url: string, requsetData: RdHttpRequestParams | FormData, options?: object, hasFile: boolean = false): Observable<RdHttpResponseStructure> {
    return !hasFile ? this.request(url, 'POST', requsetData as RdHttpRequestParams, options || {})
      : this.http.post(url, requsetData, {reportProgress: true, observe: 'events', withCredentials: true})
        .pipe(map(this.handleHttpWithUpload), catchError((error: HttpErrorResponse) => {
          console.log(error);
          // this.showModal();
          this.rdCommonService.hideLoading();
          return throwError('Something bad happened; please try again later.');
        }));
  }

  private handleHttpWithUpload(event: HttpEvent<any>) {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        return {status: 'progress', message: Math.round(100 * event.loaded / event.total)};
      case HttpEventType.Response:
        return event.body;
      default:
        return `Unhandled event: ${event.type}`;
    }
  }

  private request(url: string, method: string, requsetParams: RdHttpRequestParams, options: object): Observable<RdHttpResponseStructure> {
    const quarterDate = this.rdCommonService.createBatchString();
    const requsetParamsObj = Object.assign(requsetParams, {quarter: quarterDate});
    return this.http.request<RdHttpResponseStructure>(method, url, {[Method[method]]: requsetParamsObj}).pipe(
      timeout(this.appConfig.REQUEST.timeout || options['timeout']),
      retry(this.appConfig.REQUEST.retry || options['retry']),
      debounceTime(this.appConfig.REQUEST.debounceTime || options['debounceTime']),
      distinctUntilChanged(),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        // this.showModal();
        this.rdCommonService.hideLoading();
        this.message.create('error', error.message);
        return throwError('Something bad happened; please try again later.');
      }));
  }

}
