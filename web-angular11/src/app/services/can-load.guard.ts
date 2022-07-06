import {Injectable} from '@angular/core';
import {CanLoad, Route, UrlSegment} from '@angular/router';
import {Observable} from 'rxjs';
import {RdAuthService} from './rd-auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanLoadGuard implements CanLoad {
  constructor(private rdAuth: RdAuthService) {

  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    const permissonRegExp = new RegExp(this.rdAuth.prosission);
    return this.rdAuth.prosission == 'true' ? true : new RegExp(permissonRegExp).test(route.data['pcode']);
  }
}
