import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RdMessageService {
  print(message: any) {
    console.log(message);
  }
}
