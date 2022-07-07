import {AbstractControl, ValidatorFn, ValidationErrors} from '@angular/forms';
import {isChineseIDCardNumber} from './snippets/cnid';
import {isChinesePhoneNumber} from './snippets/phone';
import {isNameValueLegal} from './snippets/name';
import {bankCardAttribution} from './snippets/bank';

export function userNameValidator(control: AbstractControl): ValidationErrors | null {
  return isNameValueLegal(control.value) ? null : {msg: control.value + 'not match this pattern'};
}

export function cnIdValidator(control: AbstractControl): ValidationErrors | null {
  return isChineseIDCardNumber(control.value) ? null : {msg: control.value + 'not match this pattern'};
}

export function phoneValidator(control: AbstractControl): ValidationErrors | null {
  return isChinesePhoneNumber(control.value) ? null : {msg: control.value + 'not match this pattern'};
}

export function DateValidator(control: AbstractControl): ValidationErrors | null {
  return !isNaN(Date.parse(control.value)) ? null : {msg: control.value + 'not match this pattern'};
}

export function creditCodeValidator(control: AbstractControl): ValidationErrors | null {
  return String(control.value).length === 18 ? null : {msg: control.value + 'not match this pattern'};
}

export function bankCardValidator(control: AbstractControl): ValidationErrors | null {
  return bankCardAttribution(control.value) ? null : {msg: control.value + 'not match this pattern'};
}

// /[^A-Za-z0-9\u4e00-\u9fa5]+/;
// 全角字符  /[^\uFF00-\uFFFF]/
// 数字+英文 /[/W]/
export function specialStringValidator(control: AbstractControl): ValidationErrors | null {
  const Reg = /[^A-Za-z0-9\u4e00-\u9fa5·]+/;
  return !Reg.test(control.value) ? null : {msg: control.value + 'not match this pattern'};
}

export function NumberAndLetterValidator(control: AbstractControl): ValidationErrors | null {
  const Reg = /[\W]/g;
  return !Reg.test(control.value) ? null : {msg: control.value + 'not match this pattern'};
}

export function NumberValidator(control: AbstractControl): ValidationErrors | null {
  const Reg = /^[0-9]\d*$/;
  return Reg.test(control.value) ? null : {msg: control.value + 'not match this pattern'};
}

export function AddressValidator(control: AbstractControl): ValidationErrors | null {
  const Reg = /[^\u4E00-\u9FA5A-Za-z0-9()[]\-#]/g;
  return !Reg.test(control.value) ? null : {msg: control.value + 'not match this pattern'};
}
