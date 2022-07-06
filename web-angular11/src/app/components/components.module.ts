import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import {MatStepperModule} from '@angular/material/stepper';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { IconsProviderModule } from '../icons-provider.module';
import { TrustUrlPipe } from '../pipes/testUrl';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { QRCodeModule } from 'angular2-qrcode';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NZ_ICONS } from 'ng-zorro-antd/icon'
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { LightboxModule } from 'ngx-lightbox';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key]);

@NgModule({
  declarations: [
    TrustUrlPipe,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    NzStepsModule,
    NzDrawerModule,
    NzSelectModule,
    NzToolTipModule,
    IconsProviderModule,
    NzPopoverModule,
    MatStepperModule,
    NzTimePickerModule,
    QRCodeModule,
    NzDescriptionsModule,
    NzUploadModule,
    NzModalModule,
    NzInputModule,
    NzFormModule,
    NzDatePickerModule,
    NzButtonModule,
    NzCheckboxModule,
    NzSwitchModule,
    NzIconModule,
    LightboxModule
  ],
  exports: [
  ],
  providers   : [ { provide: NZ_ICONS, useValue: icons }]
})
export class ComponentsModule { }
