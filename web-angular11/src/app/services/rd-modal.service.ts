import { Injectable } from '@angular/core';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RdModalService {
  private modalRef: NzModalRef<any>;

  constructor(private router: Router, private modal: NzModalService) {

  }

  showConfirm(modalOption: Object) {
    const that = this;
    return this.modal.confirm({
      nzTitle: `<i>${modalOption['title']}</i>`,
      nzContent: `<b>${modalOption['content']}</b>`,
      nzCancelDisabled: !modalOption['isCancelDisabled'],
      nzClosable: false,
      nzOnOk: () => {return that.switchModal(modalOption['type'])},
      nzOnCancel: () => console.log('Cancel')
    });
  }

  switchModal(type: string) {
    switch (type) {
      case 'dataLimit':
        this.router.navigateByUrl('new-tab').then(() => {
        }).catch(e => console.log(e));
        break;
      case 'denied':
        this.router.navigate(['account/qualification'], {skipLocationChange: true});
        break;
      case 'error':
        this.router.navigateByUrl('login').then(() => {
        }).catch(e => console.log(e));
        break;
    }
    return new Promise(resolve => resolve(type));
  }
}
