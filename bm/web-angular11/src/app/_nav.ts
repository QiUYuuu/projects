interface NavAttributes {
  [propName: string]: any;
}

interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}

interface NavBadge {
  text: string;
  variant: string;
}

interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  pcode?: string;
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

let navItemsAll = [];
const navItemsShenbao = [
  {
    name: '账户管理',
    url: '/account',
    pcode: '001',
    icon: 'iconfont icon-editor',
    children: [
      {
        name: '医保联系人认证',
        url: '/account/qualification',
        pcode: '001001',
        icon: 'iconfont icon-yiwuyaodian'
      },
    ]
  },
  {
    name: '市本级医药机构新增',
    url: '/declaration',
    pcode: '002',
    icon: 'iconfont icon-editor',
    children: [
      {
        name: '基本零售药店申报',
        url: '/declaration/drugstore',
        pcode: '002001',
        icon: 'iconfont icon-yiwuyaodian'
      },
      {
        name: '双通道零售药店申报',
        url: '/declaration/drugstore-sp',
        pcode: '002002',
        icon: 'iconfont icon-yiwuyaodian'
      },
      {
        name: '基本医疗机构申报',
        url: '/declaration/medical',
        pcode: '002002',
        icon: 'iconfont icon-yiwuyaodian'
      },
      {
        name: '双通道医疗机构申报',
        url: '/declaration/medical-sp',
        pcode: '002002',
        icon: 'iconfont icon-yiwuyaodian'
      },
    ]
  },
  {
    name: '外六县医药机构新增',
    url: '/declaration-out',
    pcode: '003',
    icon: 'iconfont icon-editor',
    children: [
      {
        name: '基本零售药店申报',
        url: '/declaration-out/drugstore',
        pcode: '003001',
        icon: 'iconfont icon-yiwuyaodian'
      },
      {
        name: '双通道零售药店申报',
        url: '/declaration-out/drugstore-sp',
        pcode: '003002',
        icon: 'iconfont icon-yiwuyaodian'
      },
      {
        name: '基本医疗机构申报',
        url: '/declaration-out/medical',
        pcode: '003002',
        icon: 'iconfont icon-yiwuyaodian'
      },
      {
        name: '双通道医疗机构申报',
        url: '/declaration-out/medical-sp',
        pcode: '003002',
        icon: 'iconfont icon-yiwuyaodian'
      },
    ]
  },
  {
    name: '市本级医药机构变更',
    url: '/change',
    pcode: '004',
    icon: 'iconfont icon-editor',
    children: [
      {
        name: '市本级零售药店变更',
        url: '/change/change-in-drug',
        pcode: '002001',
        icon: 'iconfont icon-yiwuyaodian'
      },
      {
        name: '市本级医疗机构变更',
        url: '/change/change-in-medical',
        pcode: '002001',
        icon: 'iconfont icon-yiwuyaodian'
      },
    ]
  },
  {
    name: '外六县医药机构变更',
    url: '/change',
    pcode: '004',
    icon: 'iconfont icon-editor',
    children: [
      {
        name: '外六县零售药店变更',
        url: '/change/change-out-drug',
        pcode: '002001',
        icon: 'iconfont icon-yiwuyaodian'
      },
      {
        name: '外六县医疗机构变更',
        url: '/change/change-out-medical',
        pcode: '002001',
        icon: 'iconfont icon-yiwuyaodian'
      },
    ]
  },
  {
    name: '机构管理',
    url: '/myorgan',
    pcode: '004',
    icon: 'iconfont icon-tubiaolunkuo-',
    children: [
      // {
      //   name: '我的机构',
      //   url: '/myorgan/organBinding',
      //   pcode: '004002',
      //   icon: 'iconfont icon-yiwuyaodian'
      // },
      // {
      //   name: '故障上报',
      //   url: '/404',
      //   pcode: '004005',
      //   icon: 'iconfont icon-yiwuyaodian'
      // },
      // {
      //   name: '营业时间修改',
      //   url: '/404',
      //   pcode: '004006',
      //   icon: 'iconfont icon-yiwuyaodian'
      // },
      {
        name: '医保电子凭证占比',
        url: '/myorgan/voucher',
        pcode: '004007',
        icon: 'iconfont icon-yiwuyaodian'
      },
      {
        name: '工商信息维护',
        url: '/myorgan/infoUpload',
        pcode: '004008',
        icon: 'iconfont icon-yiwuyaodian'
      },
      {
        name: '审批进度查询',
        url: '/myorgan/mine',
        pcode: '004004',
        icon: 'iconfont icon-yiwuyaodian'
      },
    ]
  },
  {
    name: '总数',
    url: '/link',
    pcode: '014',
    icon: 'iconfont icon-editor',
    children: [
      {
        name: '总数',
        url: '/link/total',
        pcode: '014001',
        icon: 'iconfont icon-yiwuyaodian'
      },
    ]

  },
];

const navItemsShenhe = [
  {
    name: '资质审核',
    url: '/qualification-examine',
    pcode: '009',
    icon: 'iconfont icon-tubiaolunkuo-',
    children: [
      {
        name: '资质审核',
        url: '/qualification-examine/examine',
        pcode: '009001',
        icon: 'iconfont icon-chakan'
      },
    ]
  },
  {
    name: '材料审核',
    url: '/examine',
    pcode: '010',
    icon: 'iconfont icon-tubiaolunkuo-',
    children: [
      {
        name: '初审审核',
        url: '/examine/manage',
        pcode: '010001',
        icon: 'iconfont icon-chakan'
      },
      {
        name: '复审审核',
        url: '/review/manage-review',
        pcode: '010002',
        icon: 'iconfont icon-chakan'
      },
    ]
  },
  {
    name: '数据统计',
    url: '/statistics',
    pcode: '012',
    icon: 'iconfont icon-tubiaolunkuo-',
    children: [
      {
        name: '实地评估机构',
        url: '/assess/assessment',
        pcode: '011001',
           },
      {
        name: '实地评估打分',
        url: '/assess/score',
        pcode: '011002',
        icon: 'iconfont icon-chakan'
      },
      {
        name: '统计详情',
        url: '/statistics/details',
        pcode: '012001',
        icon: 'iconfont icon-chakan'
      },
      {
        name: '分数统计',
        url: '/statistics/score-level',
        pcode: '012002',
        icon: 'iconfont icon-chakan'
      },
    ]
  },
];

const isCheck = !true;

if (isCheck) {
  navItemsAll = navItemsShenhe;
} else {
  navItemsAll = navItemsShenbao;

}

export const navItems = navItemsAll;

// export const navItems = [
//   {
//     name: '账户管理',
//     url: '/account',
//     pcode: '001',
//     icon: 'iconfont icon-editor',
//     children: [
//       {
//         name: '医保联系人认证',
//         url: '/account/qualification',
//         pcode: '001001',
//         organType: 'base',
//         icon: 'iconfont icon-yiwuyaodian'
//       },
//       {
//         name: '医保联系人变更',
//         url: '/account/accountChange',
//         pcode: '001002',
//         icon: 'iconfont icon-yiwuyaodian'
//       },
//     ]
//   },
//   {
//     name: '市本级医药机构新增',
//     url: '/declaration',
//     pcode: '002',
//     icon: 'iconfont icon-editor',
//     children: [
//       {
//         name: '基本零售药店申报',
//         url: '/declaration/drugstore',
//         pcode: '002001',
//         icon: 'iconfont icon-yiwuyaodian'
//       },
//       {
//         name: '特药零售药店申报',
//         url: '/declaration/drugstore-sp',
//         pcode: '002002',
//         icon: 'iconfont icon-yiwuyaodian'
//       },
//       {
//         name: '基本医疗机构申报',
//         url: '/declaration/medical',
//         pcode: '002002',
//         icon: 'iconfont icon-yiwuyaodian'
//       },
//       {
//         name: '特药医疗机构申报',
//         url: '/declaration/medical-sp',
//         pcode: '002002',
//         icon: 'iconfont icon-yiwuyaodian'
//       },
//     ]
//   },
//   {
//     name: '外六县医药机构新增',
//     url: '/declaration-out',
//     pcode: '003',
//     icon: 'iconfont icon-editor',
//     children: [
//       {
//         name: '基本零售药店申报',
//         url: '/declaration-out/drugstore',
//         pcode: '003001',
//         icon: 'iconfont icon-yiwuyaodian'
//       },
//       {
//         name: '特药零售药店申报',
//         url: '/declaration-out/drugstore-sp',
//         pcode: '003002',
//         icon: 'iconfont icon-yiwuyaodian'
//       },
//       {
//         name: '基本医疗机构申报',
//         url: '/declaration-out/medical',
//         pcode: '003002',
//         icon: 'iconfont icon-yiwuyaodian'
//       },
//       {
//         name: '特药医疗机构申报',
//         url: '/declaration-out/medical-sp',
//         pcode: '003002',
//         icon: 'iconfont icon-yiwuyaodian'
//       },
//     ]
//   },
//   {
//     name: '市本级机构信息变更',
//     url: '/change',
//     pcode: '004',
//     icon: 'iconfont icon-editor',
//     children: [
//       {
//         name: '市本级零售药店变更',
//         url: '/change/change-in-drug',
//         pcode: '002001',
//         icon: 'iconfont icon-yiwuyaodian'
//       },
//       {
//         name: '市本级医疗机构变更',
//         url: '/change/change-in-medical',
//         pcode: '002001',
//         icon: 'iconfont icon-yiwuyaodian'
//       },
//     ]
//   },
//   {
//     name: '外六县机构信息变更',
//     url: '/change',
//     pcode: '004',
//     icon: 'iconfont icon-editor',
//     children: [
//       {
//         name: '外六县零售药店变更',
//         url: '/change/change-out-drug',
//         pcode: '002001',
//         icon: 'iconfont icon-yiwuyaodian'
//       },
//       {
//         name: '外六县医疗机构变更',
//         url: '/change/change-out-medical',
//         pcode: '002001',
//         icon: 'iconfont icon-yiwuyaodian'
//       },
//     ]
//   },
//   // {
//   //   name: '店长',
//   //   url: '/owner',
//   //   pcode: '098003',
//   //   icon: 'iconfont icon-tubiaolunkuo-',
//   //   children: [
//   //     {
//   //       name: '机构信息维护',
//   //       url: '/owner/info',
//   //       pcode: '098001',
//   //       icon: 'iconfont icon-yiwuyaodian'
//   //     },
//   //     {
//   //       name: '故障上报',
//   //       url: '/owner/report',
//   //       pcode: '098002',
//   //       icon: 'iconfont icon-yiwuyaodian'
//   //     },
//   //     {
//   //       name: '故障查询',
//   //       url: '/owner/my-order',
//   //       pcode: '098003',
//   //       icon: 'iconfont icon-yiwuyaodian'
//   //     },
//   //   ]
//   // },
//   {
//     name: '机构管理',
//     url: '/myorgan',
//     pcode: '004',
//     icon: 'iconfont icon-tubiaolunkuo-',
//     children: [
//       // {
//       //   name: '我的机构',
//       //   url: '/myorgan/organBinding',
//       //   pcode: '004002',
//       //   icon: 'iconfont icon-yiwuyaodian'
//       // },
//       // {
//       //   name: '故障上报',
//       //   url: '/404',
//       //   pcode: '004005',
//       //   icon: 'iconfont icon-yiwuyaodian'
//       // },
//       // {
//       //   name: '营业时间修改',
//       //   url: '/404',
//       //   pcode: '004006',
//       //   icon: 'iconfont icon-yiwuyaodian'
//       // },
//       {
//         name: '医保电子凭证占比',
//         url: '/myorgan/voucher',
//         pcode: '004007',
//         icon: 'iconfont icon-yiwuyaodian'
//       },
//       {
//         name: '审批进度查询',
//         url: '/myorgan/mine',
//         pcode: '004004',
//         icon: 'iconfont icon-yiwuyaodian'
//       },
//     ]
//   },
//   {
//     name: '总数',
//     url: '/link',
//     pcode: '014',
//     icon: 'iconfont icon-editor',
//     children: [
//       {
//         name: '总数',
//         url: '/link/total',
//         pcode: '014001',
//         icon: 'iconfont icon-yiwuyaodian'
//       },
//     ]
//   },
//   // {
//   //   name: '年度履约能力评估',
//   //   url: '/account1',
//   //   pcode: '005',
//   //   icon: 'iconfont icon-editor',
//   //   children: [
//   //     {
//   //       name: '年度履约能力评估',
//   //       url: '/404',
//   //       pcode: '005001',
//   //       icon: 'iconfont icon-yiwuyaodian'
//   //     },
//   //   ]
//   // },
//   // {
//   //   name: '对账',
//   //   url: '/account2',
//   //   pcode: '006',
//   //   icon: 'iconfont icon-editor',
//   //   children: [
//   //     {
//   //       name: '对账',
//   //       url: '/404',
//   //       pcode: '006001',
//   //       icon: 'iconfont icon-yiwuyaodian'
//   //     },
//   //   ]
//   // },
//   // {
//   //   name: '专线服务商',
//   //   url: '/account3',
//   //   pcode: '007',
//   //   icon: 'iconfont icon-editor',
//   //   children: [
//   //     {
//   //       name: '专线服务商',
//   //       url: '/404',
//   //       pcode: '007001',
//   //       icon: 'iconfont icon-yiwuyaodian'
//   //     },
//   //   ]
//   // },
//   // {
//   //   name: '软件服务商',
//   //   url: '/account4',
//   //   pcode: '008',
//   //   icon: 'iconfont icon-editor',
//   //   children: [
//   //     {
//   //       name: '软件服务商',
//   //       url: '/404',
//   //       pcode: '008001',
//   //       icon: 'iconfont icon-yiwuyaodian'
//   //     },
//   //   ]
//   // },
//   {
//     name: '资质审核',
//     url: '/qualification-examine',
//     pcode: '009',
//     icon: 'iconfont icon-tubiaolunkuo-',
//     children: [
//       {
//         name: '资质审核',
//         url: '/qualification-examine/examine',
//         pcode: '009001',
//         icon: 'iconfont icon-chakan'
//       },
//     ]
//   },
//   {
//     name: '材料审核',
//     url: '/examine',
//     pcode: '010',
//     icon: 'iconfont icon-tubiaolunkuo-',
//     children: [
//       {
//         name: '初审审核',
//         url: '/examine/manage',
//         pcode: '010001',
//         icon: 'iconfont icon-chakan'
//       },
//       {
//         name: '复审审核',
//         url: '/review/manage-review',
//         pcode: '010002',
//         icon: 'iconfont icon-chakan'
//       },
//     ]
//   },
//   // {
//   //   name: '实地评估',
//   //   url: '/assess',
//   //   pcode: '011',
//   //   icon: 'iconfont icon-tubiaolunkuo-',
//   //   children: [
//   //     {
//   //       name: '实地评估机构',
//   //       url: '/assess/assessment',
//   //       pcode: '011001',
//   //       icon: 'iconfont icon-chakan'
//   //     },
//   //     {
//   //       name: '实地评估打分',
//   //       url: '/assess/score',
//   //       pcode: '011002',
//   //       icon: 'iconfont icon-chakan'
//   //     },
//   //   ]
//   // },
//   {
//     name: '数据统计',
//     url: '/statistics',
//     pcode: '012',
//     icon: 'iconfont icon-tubiaolunkuo-',
//     children: [
//       {
//         name: '实地评估机构',
//         url: '/assess/assessment',
//         pcode: '011001',
//         icon: 'iconfont icon-chakan'
//       },
//       {
//         name: '实地评估打分',
//         url: '/assess/score',
//         pcode: '011002',
//         icon: 'iconfont icon-chakan'
//       },
//       {
//         name: '统计详情',
//         url: '/statistics/details',
//         pcode: '012001',
//         icon: 'iconfont icon-chakan'
//       },
//       {
//         name: '分数统计',
//         url: '/statistics/score-level',
//         pcode: '012002',
//         icon: 'iconfont icon-chakan'
//       },
//     ]
//   },
// ];
