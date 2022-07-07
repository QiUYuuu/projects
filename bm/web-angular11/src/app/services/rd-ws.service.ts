import {Inject, Injectable} from '@angular/core';
import {interval, Subscription, Subject} from 'rxjs';
import {APP_CONFIG} from '../utils/app.config';
import {RdAppConfig} from '../interfaces';
import {RdBrowserStorageService} from './rd-browser-storage.service';
import {RdAuthService} from './rd-auth.service';

@Injectable({
  providedIn: 'root'
})
export class RdWsService {
  private ws: WebSocket = null;
  private wsInterval = interval(3000);
  private wsHealthCheck: Subscription;
  private host: string;
  public proxySubject: Subject<string>;
  private readonly schema: string;
  private readonly port: string;

  constructor(@Inject(APP_CONFIG) private appConfig: RdAppConfig, private rdBrowserStorage: RdBrowserStorageService,
              private rdAuth: RdAuthService) {
    this.schema = this.appConfig.SERVER.schema.endsWith('s') ? 'wss' : 'ws';
    // this.port = this.appConfig.SERVER.port;
    this.port = '3458';
    this.proxySubject = new Subject<string>();
  }

  public connect() {
    console.log('Into connect');
    this.wsHealthCheck = this.wsInterval.subscribe(() => {
      this.host = this.rdAuth.isLogin ? this.rdBrowserStorage.get('host') : '';
      if (!!this.host) {
        if (!this.ws || this.ws.readyState === WebSocket.CLOSED) {
          try {

            this.ws = new WebSocket(`${this.schema}://${this.host}:${this.port}/ws`);

            this.ws.onopen = () => {
            };
            this.ws.onmessage = event => {
              if (event.data !== '0') {
                const {_id, msgContent} = JSON.parse(event.data);
                this.ws.send(JSON.stringify({_id}));
                this.proxySubject.next(msgContent);
              }
            };
            this.ws.onerror = event => {
              this.ws = null;
            };
            this.ws.onclose = msg => {
              if ([4001, 4002, 4003].includes(msg.code)) {
                this.wsHealthCheck.unsubscribe();
                this.rdAuth.permissonRegExp = null;
                this.rdAuth.isLogin = false;
              }
              this.ws = null;
            };
          } catch (e) {
            console.log(e);
          }
        } else if (this.ws && this.ws.readyState === WebSocket.OPEN) {
          this.ws.send('0');
        }
      }
    });
  }

  public close() {
    if (this.ws) {
      this.ws.close();
    }
  }
}
