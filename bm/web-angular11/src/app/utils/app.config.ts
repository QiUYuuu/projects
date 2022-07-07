import {InjectionToken} from '@angular/core';
import {RdAppConfig} from '../interfaces';

export const APP_CONFIG = new InjectionToken<RdAppConfig>('app.config');
