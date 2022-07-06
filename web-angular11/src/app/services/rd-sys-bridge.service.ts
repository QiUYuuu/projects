import {Inject, Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {RdAppConfig, RdHttpResponseStructure} from '../interfaces';
import {APP_CONFIG} from '../utils/app.config';

declare const nw: any;

declare function execSQLQueryIncPhase1(
  filename: string,
  route: string,
  uid: string,
  tbmanage: string,
  partkey: string
): Promise<Array<any> | string>;

declare function execSQLQueryIncPhase2(
  filename: string,
  route: string,
  uid: string,
  tbmanage: string,
  tbdata: string,
  partkey: string,
  ndata: string,
  mdata: string,
  orderBy: string
): Promise<RdHttpResponseStructure>;

declare function execSQLQueryIncPhase1Rx(
  filename: string,
  route: string,
  uid: string,
  tbmanage: string,
  partkey: string
): Observable<Array<any> | string>;

declare function execSQLQueryIncPhase2Rx(
  filename: string,
  route: string,
  uid: string,
  tbmanage: string,
  tbdata: string,
  partkey: string,
  ndata: string,
  mdata: string,
  orderBy: string
): Observable<RdHttpResponseStructure>;

declare function askRandyLocally(route: string, filename: string, tbdicname: string): Observable<RdHttpResponseStructure>;

@Injectable({
  providedIn: 'root'
})
export class RdSysBridgeService {
  private readonly container: any;

  constructor(@Inject(APP_CONFIG) private appConfig: RdAppConfig) {
    try {
      this.container = nw;
    } catch (e) {
      this.container = null;
    }
  }

  public execSQLQueryIncPhase1(route: string, uid: string,
                               filename: string = this.appConfig.SQLITE.fileName,
                               tbmanage: string = this.appConfig.SQLITE.tbManage,
                               partkey: string = this.appConfig.SQLITE.partKey): Promise<Array<any> | string> {
    return this.container ? execSQLQueryIncPhase1(filename, route, uid, tbmanage, partkey)
      : Promise.reject('THE CONTAINER IS BROWER, CANNOT EXECUTE INCREMENTAL DATA QUERY!');

  }

  public execSQLQueryIncPhase2(route: string, uid: string, ndata: string, mdata: string,
                               filename: string = this.appConfig.SQLITE.fileName,
                               tbmanage: string = this.appConfig.SQLITE.tbManage,
                               tbdata: string = this.appConfig.SQLITE.tbData,
                               partkey: string = this.appConfig.SQLITE.partKey,
                               orderBy: string = ''): Promise<RdHttpResponseStructure> {
    return this.container ? execSQLQueryIncPhase2(filename, route, uid, tbmanage, tbdata, partkey, ndata, mdata, orderBy)
      : Promise.reject({respCode: 'THE CONTAINER IS BROWER, CANNOT EXECUTE INCREMENTAL DATA QUERY!'});
  }

  public execSQLQueryIncPhase1Rx(route: string, uid: string,
                                 filename: string = this.appConfig.SQLITE.fileName,
                                 tbmanage: string = this.appConfig.SQLITE.tbManage,
                                 partkey: string = this.appConfig.SQLITE.partKey): Observable<Array<any> | string> {
    return this.container ? execSQLQueryIncPhase1Rx(filename, route, uid, tbmanage, partkey)
      : throwError('THE CONTAINER IS BROWER, CANNOT EXECUTE INCREMENTAL DATA QUERY!');
  }

  public execSQLQueryIncPhase2Rx(route: string, uid: string, ndata: string, mdata: string,
                                 filename: string = this.appConfig.SQLITE.fileName,
                                 tbmanage: string = this.appConfig.SQLITE.tbManage,
                                 tbdata: string = this.appConfig.SQLITE.tbData,
                                 partkey: string = this.appConfig.SQLITE.partKey,
                                 orderBy: string = ''): Observable<RdHttpResponseStructure> {
    return this.container ? execSQLQueryIncPhase2Rx(filename, route, uid, tbmanage, tbdata, partkey, ndata, mdata, orderBy)
      : throwError({respCode: 'THE CONTAINER IS BROWER, CANNOT EXECUTE INCREMENTAL DATA QUERY!'});
  }

  public askRandyLocally(route: string, filename: string = this.appConfig.SQLITE.fileName,
                         tbdicname: string = this.appConfig.SQLITE.tbdicname): Observable<RdHttpResponseStructure> {
    return askRandyLocally(route, filename, tbdicname);
  }
}
