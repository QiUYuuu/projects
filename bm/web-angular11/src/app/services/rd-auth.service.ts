import {Injectable} from '@angular/core';
import {RdBrowserStorageService} from './rd-browser-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RdAuthService {

  constructor(private rdBrowserStorage: RdBrowserStorageService) {
  }

  set isLogin(login: boolean) {
    login ? this.rdBrowserStorage.set('isLogin', '🙂') : this.rdBrowserStorage.remove('isLogin');
  }

  get isLogin(): boolean {
    return !!this.rdBrowserStorage.get('isLogin');
  }

  set creditCode(creditCode: string) {
    creditCode ? this.rdBrowserStorage.set('creditCode', creditCode) : this.rdBrowserStorage.remove('creditCode');
  }

  get creditCode(): string {
    return this.rdBrowserStorage.get('creditCode') || '';
  }

  set permissonRegExp(permissonRegExp: string) {
    permissonRegExp ? this.rdBrowserStorage.set('permissonRegExp', permissonRegExp) : this.rdBrowserStorage.remove('permissonRegExp');
  }

  get permissonRegExp(): string {
    return this.rdBrowserStorage.get('permissonRegExp') || '';
  }

  set cmyName(cmyName: string) {
    cmyName ? this.rdBrowserStorage.set('cmyName', cmyName) : this.rdBrowserStorage.remove('cmyName');
  }

  get cmyName(): string {
    return this.rdBrowserStorage.get('cmyName') || '';
  }

  set type(type: string) {
    type ? this.rdBrowserStorage.set('type', type) : this.rdBrowserStorage.remove('type');
  }

  get type(): string {
    return this.rdBrowserStorage.get('type') || '';
  }

  set prosission(prosission: string) {
    prosission ? this.rdBrowserStorage.set('prosission', prosission) : this.rdBrowserStorage.remove('prosission');
  }

  get prosission(): string {
    return this.rdBrowserStorage.get('prosission') || '';
  }

  set companyInfo(companyInfo: string) {
    companyInfo ? this.rdBrowserStorage.set('companyInfo', JSON.stringify(companyInfo)) : this.rdBrowserStorage.remove('companyInfo');
  }

  get companyInfo(): string {
    return this.rdBrowserStorage.get('companyInfo') || '';
  }

  set staffInfo(staffInfo: string) {
    staffInfo ? this.rdBrowserStorage.set('staffInfo', JSON.stringify(staffInfo)) : this.rdBrowserStorage.remove('staffInfo');
  }

  get staffInfo(): string {
    return this.rdBrowserStorage.get('staffInfo') || '';
  }

  set serviceItem(serviceItem: string) {
    serviceItem ? this.rdBrowserStorage.set('serviceItem', JSON.stringify(serviceItem)) : this.rdBrowserStorage.remove('serviceItem');
  }

  get serviceItem(): string {
    return this.rdBrowserStorage.get('serviceItem') || '';
  }

  set status(status: string) {
    status ? this.rdBrowserStorage.set('status', JSON.stringify(status)) : this.rdBrowserStorage.remove('status');
  }

  get status(): string {
    return this.rdBrowserStorage.get('status') || '';
  }

  set timestamp(timestamp: string) {
    timestamp ? this.rdBrowserStorage.set('timestamp', JSON.stringify(timestamp)) : this.rdBrowserStorage.remove('timestamp');
  }

  get timestamp(): string {
    return this.rdBrowserStorage.get('timestamp') || '';
  }

  set preparationInfo(preparationInfo: string) {
    preparationInfo ? this.rdBrowserStorage.set('preparationInfo', JSON.stringify(preparationInfo)) : this.rdBrowserStorage.remove('preparationInfo');
  }

  get preparationInfo(): string {
    return this.rdBrowserStorage.get('preparationInfo') || '';
  }

  set defaultPageType(defaultPageType: string) {
    defaultPageType ? this.rdBrowserStorage.set('defaultPageType', JSON.stringify(defaultPageType)) : this.rdBrowserStorage.remove('defaultPageType');
  }

  get defaultPageType(): string {
    return this.rdBrowserStorage.get('defaultPageType') || '';
  }

  set clientName(clientName: string) {
    clientName ? this.rdBrowserStorage.set('clientName', JSON.stringify(clientName)) : this.rdBrowserStorage.remove('clientName');
  }

  get clientName(): string {
    return this.rdBrowserStorage.get('clientName') || '';
  }
  set preparationNum(preparationNum: string) {
    preparationNum ? this.rdBrowserStorage.set('preparationNum', JSON.stringify(preparationNum)) : this.rdBrowserStorage.remove('preparationNum');
  }

  get preparationNum(): string {
    return this.rdBrowserStorage.get('preparationNum') || '';
  }
  set clientPhone(clientPhone: string) {
    clientPhone ? this.rdBrowserStorage.set('clientPhone', JSON.stringify(clientPhone)) : this.rdBrowserStorage.remove('clientPhone');
  }

  get clientPhone(): string {
    return this.rdBrowserStorage.get('clientPhone') || '';
  }

  set channel(channel: string) {
    channel ? this.rdBrowserStorage.set('channel', JSON.stringify(channel)) : this.rdBrowserStorage.remove('channel');
  }

  get channel(): string {
    return this.rdBrowserStorage.get('channel') || '';
  }

  set state(state: string) {
    state ? this.rdBrowserStorage.set('state', JSON.stringify(state)) : this.rdBrowserStorage.remove('state');
  }

  get state(): string {
    return this.rdBrowserStorage.get('state') || '';
  }

  set unionid(unionid: string) {
    unionid ? this.rdBrowserStorage.set('unionid', JSON.stringify(unionid)) : this.rdBrowserStorage.remove('unionid');
  }

  get unionid(): string {
    return this.rdBrowserStorage.get('unionid') || '';
  }

}
