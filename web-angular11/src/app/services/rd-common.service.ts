import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GLOBAL_CONFIG } from '../utils/globalConfigs';

@Injectable({
  providedIn: 'root'
})
export class RdCommonService {

  public globalVar: BehaviorSubject<object> = new BehaviorSubject({});
  public globalShowLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
  }

  private changeGlobalVar(resObj: object) {
    this.globalVar.next(resObj);
  }

  public createBatchString(): string {
    const nowDate = new Date();
    const year = nowDate.getFullYear();
    const month = nowDate.getMonth() + 1;
    const jidu = this.getQuarterStartMonth(month);
    // return `${year}-${jidu}`;
    return '2022-1';
  }

  private getQuarterStartMonth(month) {
    let quarterStartMonth = 0;
    if (month < 4) {
      quarterStartMonth = 1;
    }
    if (3 < month && month < 7) {
      quarterStartMonth = 2;
    }
    if (6 < month && month < 10) {
      quarterStartMonth = 3;
    }
    if (month > 9) {
      quarterStartMonth = 4;
    }
    return quarterStartMonth;
  }

  public showLoading(){
    setTimeout(()=>{
      this.globalShowLoading.next(true);
    },1)
  }
  public hideLoading(){
    setTimeout(()=>{
      this.globalShowLoading.next(false);
    },1)
  }

  public getDate () {
    const startDate = '2022-06-14';
    const shutDownDate = '2022-06-23';
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    const hour = now.getHours();
    const dateStr = `${year}-${month + 1 > 9 ? month + 1 : '0' + (month + 1)}-${day > 9 ? day : '0' + day}`;
    return (dateStr >= startDate) && (dateStr < shutDownDate) ;
  }

  public newWebSocket(uuid: string) {
    const that = this;
    let ishttps = 'https:' == document.location.protocol;
    let ws = "";
    if (ishttps) {
      ws = "wss://";
    } else {
      ws = "ws://";
    }
    let http = '';
    if (!GLOBAL_CONFIG.test) {
      http = ws + window.location.host + `/socket-webSocket?uuid=${uuid}`;
    } else {
      http = ws + "localhost:443";
    }
    let websocket = new WebSocket(http);
    // 连接成功建立的回调方法
    websocket.onopen = function (e) {
      console.log("webSocket链接成功！");
      websocket.send(uuid);
      // 成功建立连接后，重置心跳检测
    }
    // 连接发生错误，连接错误时会继续尝试发起连接（尝试5次）
    websocket.onerror = function () {
      console.log("onerror连接发生错误")
    }
    // 接受到消息的回调方法
    // 接受到服务端关闭连接时的回调方法
    websocket.onclose = function (e) {
      try {
        websocket.close();
      } catch (e) {
      }
      console.log('websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean)
    }
    // 监听窗口事件，当窗口关闭时，主动断开websocket连接，防止连接没断开就关闭窗口，server端报错
    window.onbeforeunload = function () {
      websocket.close();
    }
    setTimeout(() => {
      websocket.close();
    }, 1000 * 60);

    return websocket;

    // let obj  = setInterval(() => {
    //   console.log(websocket.readyState)
    //   if (websocket.readyState == 1) {
    //     console.log("连接状态，发送消息保持连接");
    //     websocket.send("ping");
    //   } else {
    //     console.log("断开状态，尝试重连");
    //     clearInterval(obj);
    //     that.newWebSocket();
    //
    //   }
    // }, 1000 * 60)

  }
}
