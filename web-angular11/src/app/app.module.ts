import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {LocationStrategy, HashLocationStrategy, ViewportScroller} from '@angular/common';
import {RouteReuseStrategy} from '@angular/router';
import {RdReuseStrategy} from './services/rd-reuse-strategy';
import {APP_CONFIG} from './utils/app.config';
import {GLOBAL_CONFIG} from './utils/globalConfigs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { LoginComponent } from './views/system/login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {ComponentsModule } from './components/components.module';
import {httpInterceptorProviders} from './interceptors';
import {DragulaModule} from 'ng2-dragula';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IconsProviderModule } from './icons-provider.module';
import { registerLocaleData } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import zh from '@angular/common/locales/zh';
import { QRCodeModule } from 'angular2-qrcode';
import { NzResultModule } from 'ng-zorro-antd/result';
import { CommonModule } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzConfig, NZ_CONFIG } from 'ng-zorro-antd/core/config';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';
import { RouterModule } from '@angular/router';
import {BsModalService} from 'ngx-bootstrap';
import {ModalModule, TooltipModule} from 'ngx-bootstrap';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgxLoadingModule } from 'ngx-loading';

registerLocaleData(zh);


const ngZorroConfig: NzConfig = {
  // 注意组件名称没有 nz 前缀
  message: { nzTop: 120, nzDuration: 2000 },
  notification: { nzTop: 240 }
};


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  entryComponents: [
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    AppRoutingModule,
    DragulaModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    NzFormModule,
    NzSpinModule,
    NzModalModule,
    IconsProviderModule,
    NzCardModule,
    QRCodeModule,
    NzResultModule,
    NzListModule,
    NzButtonModule,
    NzBreadCrumbModule,
    RouterModule,
    NzToolTipModule,
    NzLayoutModule,
    NzPageHeaderModule,
    NzIconModule,
    NzCollapseModule,
    NzMenuModule,
    NzDropDownModule,
    NgxLoadingModule
  ],
  providers: [
    BsModalService,
    NzMessageService,
    httpInterceptorProviders,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    // {provide: RouteReuseStrategy, useClass: RdReuseStrategy},
    {provide: APP_CONFIG, useValue: GLOBAL_CONFIG},
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: NZ_CONFIG, useValue: ngZorroConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
