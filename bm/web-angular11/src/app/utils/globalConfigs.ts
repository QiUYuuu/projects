const isTest = false;    // 是否为测试环境
const isCheck = false;    // 是否为审核系统
export const GLOBAL_CONFIG = {
  SERVER: {
    schema: isCheck ? 'http' : isTest ? 'http' : 'https',
    // hosts: ['192.168.1.65', '192.168.1.64'],
    hosts: isTest ? ['localhost'] : [''],

    port: isTest ? '5800' : '',
    urlTemp: 'ccsyb-',
    // urlTemp: 'ccsybTest-',

    checkUrlTemp: 'ccsyb-shenhe-',
    systemUrlTemp: 'ccsyb-system-',
    socketUrlTemp: 'socket-'
  },
  REQUEST: {
    retry: 1,
    timeout: 10000,
    debounceTime: 2000
  },
  SQLITE: {
    fileName: '_.db',
    tbManage: 'tb_manage',
    tbData: 'tb_data',
    tbdicname: 'tb_dic',
    partKey: '123465'
  },
  REQUESTS_HIT_LOCAL: {},
  test: isTest,
  isCheck: isCheck
};
