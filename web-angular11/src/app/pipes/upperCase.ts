
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Pipe({
  name: 'upper'
})
export class UpperCasePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {

  }
  transform(value: any, args?: any): any {
    // 允许通过不安全的 url
    return value.toUpperCase();
  }

}
