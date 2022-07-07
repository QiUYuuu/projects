export interface RdAppConfig {
  SERVER: {
    schema: string;
    hosts: Array<string>;
    port: string;
    urlTemp: string;
    checkUrlTemp: string;
    systemUrlTemp: string;
    socketUrlTemp: string;
  };
  REQUEST: {
    retry: number;
    timeout: number;
    debounceTime: number;
  };
  SQLITE: {
    fileName: string;
    tbManage: string;
    tbData: string;
    tbdicname: string;
    partKey: string
  };
  REQUESTS_HIT_LOCAL: object;
  test: boolean;
  isCheck: boolean;
}
