export const allAreas = [
  {id: 'in_01', title: '南关区'}, {id: 'in_02', title: '朝阳区'}, {id: 'in_03', title: '二道区'}, {id: 'in_04', title: '绿园区'},
  {id: 'in_05', title: '高新区'}, {id: 'in_06', title: '宽城区'}, {id: 'in_07', title: '汽车经济开发区'}, {id: 'in_08', title: '经济开发区'},
  {id: 'in_09', title: '净月经济开发区'}, {id: 'in_10', title: '净月高新技术产业开发区'}, {id: 'in_11', title: '北湖经济开发区'}, {id: 'out_01', title: '双阳'},
  // tslint:disable-next-line: max-line-length
  {id: 'out_02', title: '德惠'}, {id: 'out_03', title: '九台'}, {id: 'out_04', title: '农安'}, {id: 'out_05', title: '榆树'}, {
    id: 'out_06',
    title: '公主岭'
  }
];

export const AllComType = {
  medical: ['综合医院', '中医医院', '中西医结合医院', '民族医院', '专科医院', '康复医院', '综合门诊', '专科门诊', '中医门诊', '安宁疗护中心', '中西医结合门诊', '社区卫生服务中心', '社区卫生服务站',
    '专科疾病防治院(所、站)', '妇幼保健院', '中心卫生院', '乡镇卫生院', '街道卫生院', '卫生所(站)', '村卫生室(所)'],
  drugstore: ['零售药店'],
};

export const nameToFileUnit = {
  A: {
    xukez: '《医疗机构执业许可证》或军队医疗机构为民服务许可证照',
    yingye: '《营业执照》（《事业单位法人登记证书》、《民办非企事业单位法人登记证书》、《非营利性组织证书》）',
    idcard: '法人身份证',
    fapiao: '上传日期为三个月前的进、销、存台账和购药发票（随货同行单）',
    zhiye: '科室设置及医务人员的执业信息',
    zhidu: '与医保政策对应的内部管理制度和财务制度目录',
    cailiao: '与医保有关的信息系统相关材料',
    baogao: '纳入定点后对医保基金影响的预测性分析报告',
    zulin: '营业场所的房屋产权证明或租赁合同',
    shouyin: '收银窗口场景照片',
    mentou: '带有医疗机构名称的门头照片',
    ty1: '经卫健部门评定的医院等级佐证材料',
    lenglian: '与所经营药品、医用材料相适应的确保质量的物流、仓储等“冷链系统”相关材料',
    ty2: '使用特药的临床科室及相应的临床医师信息',
    tycl: '经营特药名单及供货商销售资格证明材料',
    ty3: '综合评价药品流通企业的整体规模、质量标准、制度流程、专业管理等材料',
  },
  B: {
    jingying: '《药品经营许可证》（副本）、《营业执照》（副本）和法定代表人身份证',
    fapiao: '上传日期为三个月前的进、销、存台账和购药发票（随货同行单）',
    zige: '《执业药师资格证书》《执业药师注册证》及其《劳动合同》',
    laodong: '医保专（兼）职管理人员的《劳动合同》',
    zhidu: '与医保政策对应的内部管理制度和财务制度',
    cailiao: '与医保有关的信息系统相关材料',
    baogao: '纳入定点后对医保基金影响的预测性分析报告',
    zulin: '营业场所的房屋产权证明或租赁合同',
    shouyin: '收银台场景照片',
    mentou: '药店门头照片',
    ty1: '申请单位的企业集团或连锁销售单位与特药生产厂家签署的一级经销商协议',
    tycl: '经营特药名单及供货商销售资格证明材料',
    lenglian: '所经营特药相适应的物流、仓储、配送及“冷链系统”相关材料',
    ty4: '申请单位股权权属证明材料、药店权属证明材料',
    ty5: '特药供应业务相适应的经营管理制度',
    ty6: '所配备的执业医师和执业药师注册信息'
  }
}

export const autoTips = {
  'zh-cn': {
    required: '这是必填字段',
    email: '请输入有效的电子邮件地址',
    idCard: '身份证格式不正确',
    maxlength: ('超过允许输入的字符个数'),
    minlength: ('少于规定的字符个数'),
    date: '请输入有效的日期',
    pwd: '账号或密码不正确',
    special: '当前内容包含非法字符或全角字符',
    NumAndLetter: '当前内容仅输入数字或英文字母'
  },
  'en': {
    required: '必填项',
    email: '邮箱格式不正确',
    idCard: '身份证格式不正确'
  }
}

export const marks =
  [
      {
        "address": "长春市北湖科技开发区明斯克路滨湖雅苑小区C区第12幢0单元110号房",
        "lat": "43.8723857872965",
        "lng": "125.372116820492",
        "name": "长春市益丰堂大药房北湖春天店"
      },
      {
        "address": "长春市北湖科技开发区中天·北湾新城二期1号楼108号",
        "lat": "43.9752055621996",
        "lng": "125.397703898938",
        "name": "吉林同道堂大药房"
      },
      {
        "address": "长春市北湖科技开发区北湖科技园配套住宅B1项目H8栋109、110号",
        "lat": "43.9957026680083",
        "lng": "125.395981203822",
        "name": "长春市蓝珀湖念康医药有限公司"
      },
      {
        "address": "长春市北湖科技开发区中海·盛世城B区B9栋0单元115号房",
        "lat": "43.966408810345",
        "lng": "125.398326033801",
        "name": "长春市盛安堂大药房"
      },
      {
        "address": "长春市北湖科技开发区中海龙玺A区AG3栋103号",
        "lat": "43.9806096931182",
        "lng": "125.407336858084",
        "name": "长春市医诺药房"
      },
      {
        "address": "长春市北湖科技开发区龙湖大路以南，北湾西街以东，卓扬北湖湾B区5号楼107号",
        "lat": "43.9794908234627",
        "lng": "125.398878770987",
        "name": "吉林省养天和康赛大药房连锁有限公司长春北湖湾店"
      },
      {
        "address": "长春市北湖科技开发区北湖科技园配套住宅B8项目第S2幢105号房",
        "lat": "43.9956987406312",
        "lng": "125.395988182274",
        "name": "长春市英才大药房"
      },
      {
        "address": "长春市北湖科技开发区北湾新城5楼110号",
        "lat": "43.9753859674914",
        "lng": "125.397756589125",
        "name": "长春市馨康大药房有限公司"
      },
      {
        "address": "长春市北湖科技开发区明斯克路以北、丙七街以西中天北湾新城二期S2号楼117号",
        "lat": "43.9752055621996",
        "lng": "125.397703898938",
        "name": "长春市康源天翼大药房有限公司"
      },
      {
        "address": "长春市北湖科技开发区应化路盛世·君悦豪庭B区第B9幢0单元1层110号房",
        "lat": "43.9798128386602",
        "lng": "125.427282280395",
        "name": "长春市明华药房"
      },
      {
        "address": "长春市北湖科技开发区盛北大街国宸中航御湖天城18号楼102号门市",
        "lat": "43.9780086399571",
        "lng": "125.407224223596",
        "name": "长春市以琳大药房"
      },
      {
        "address": "长春市北湖科技开发区兴华园小区E区11栋108号房",
        "lat": "43.9666534354477",
        "lng": "125.42825214123",
        "name": "吉林省绿色森林医药连锁有限公司兴华园分店"
      },
      {
        "address": "长春市北湖科技开发区光机路新星宇·之悦（B区）二期6幢114室、122室",
        "lat": "43.9878752762214",
        "lng": "125.419919192957",
        "name": "长春新悦大药房"
      },
      {
        "address": "长春市北湖科技开发区爱尚北湖19栋104号房",
        "lat": "43.9752223170351",
        "lng": "125.402819783139",
        "name": "长春市御臻大药房"
      },
      {
        "address": "吉林省长春市北湖科技开发区丙九路中天北湾新城四期第30幢103、104、111、112号房",
        "lat": "43.9695410103887",
        "lng": "125.397479768282",
        "name": "高新园区保善堂综合门诊部"
      },
      {
        "address": "吉林省长春市高新北区福源街2136号兴华园B区4栋117、118号",
        "lat": "43.9775343361261",
        "lng": "125.43283310357",
        "name": "高新园区祥和中医门诊部"
      },
      {
        "address": "长春市北湖科技开发区北湾新城三期3栋119号房",
        "lat": "43.9725131028562",
        "lng": "125.397683087189",
        "name": "长春市久玖康大药房有限公司"
      },
      {
        "address": "长春市北湖科技开发区北湾东街以东新星宇和韵一期第3幢101、102、116号",
        "lat": "43.972309503683",
        "lng": "125.404345529879",
        "name": "吉林大药房药业股份有限公司长春新星宇和韵连锁店"
      },
      {
        "address": "长春市北湖科技开发区丙三十六路中天北湾新城第5幢112号房",
        "lat": "43.9753859674914",
        "lng": "125.397756589125",
        "name": "吉林省禹成药房连锁有限公司长春应化新路店"
      },
      {
        "address": "长春市北湖科技开发区丙十七街以东、丙三十五路南中天.北湾新城17楼120号",
        "lat": "43.9753859674914",
        "lng": "125.397756589125",
        "name": "长春市民益大药房连锁有限公司北湾分公司"
      },
      {
        "address": "长春市宽城区扶余路柳影家园小区1区1栋111号",
        "lat": "43.9452307997856",
        "lng": "125.309054996662",
        "name": "长春市福亿康大药房有限公司"
      },
      {
        "address": "长春市宽城区基隆路以西、柳江路南侧绿化带以北新月屯地块棚户区改造项目豪邦四季经典小区B区6号楼104号",
        "lat": "43.9403975765385",
        "lng": "125.289066140789",
        "name": "长春市益合大药房"
      },
      {
        "address": "长春市宽城区青年路住邦城市广场26号门市",
        "lat": "43.9462464897231",
        "lng": "125.299114591812",
        "name": "吉林省九乐堂药房有限责任公司长春市住邦城市广场连锁店"
      },
      {
        "address": "长春市宽城区地铁名典小区D区D6栋104号一层",
        "lat": "43.9381355819759",
        "lng": "125.329385205568",
        "name": "吉林省尚宏裕大药房连锁有限公司长新街分公司"
      },
      {
        "address": "长春市宽城区新月东路61号门市",
        "lat": "43.943583355997",
        "lng": "125.301250826748",
        "name": "长春市慈仁堂大药房"
      },
      {
        "address": "吉林省长春市宽城区小南地块棚户区改造.华大城三期J3J31幢112号房",
        "lat": "43.9659312334368",
        "lng": "125.348398520654",
        "name": "长春市小葵花大药房"
      },
      {
        "address": "长春市宽城区恒大城23号物业楼1楼壹号生活超市内",
        "lat": "43.9531357633856",
        "lng": "125.297867794009",
        "name": "长春市鑫福亿康大药房"
      },
      {
        "address": "长春市宽城区美景天城二期52栋104门市",
        "lat": "43.9436466193348",
        "lng": "125.308040726271",
        "name": "吉林省世一堂药铺连锁有限公司长春美景天城店"
      },
      {
        "address": "吉林省长春市空港经济开发区西营城街道",
        "lat": "44.0389073461704",
        "lng": "125.811334567514",
        "name": "长春永安大药房"
      },
      {
        "address": "长春市宽城区西二条13号七中宿舍101室",
        "lat": "43.9078780142671",
        "lng": "125.323801662832",
        "name": "吉林省信逸医药有限公司欧亚广场大药房"
      },
      {
        "address": "长春市宽城区菜市街以西，北三环以北，丙四街以东，丙三路以南恒利·七彩阳光B-10号楼111号",
        "lat": "43.9625995173963",
        "lng": "125.308888845579",
        "name": "长春市医仁堂大药房有限公司"
      },
      {
        "address": "长春市宽城区东至乙二路、南至丙三十四路、西至丙七路、北至甲五路兰家镇东3号地块棚户区改造项目(万龙银河城三期)第3幢110号房",
        "lat": "43.9614791665627",
        "lng": "125.323589476377",
        "name": "吉林大药房药业股份有限公司万龙银河城连锁店"
      },
      {
        "address": "长春市宽城区北环城路南华亨名城3[幢]101号房",
        "lat": "43.9585522207806",
        "lng": "125.348942562264",
        "name": "长春上品医药有限公司"
      },
      {
        "address": "长春市宽城区北环城路7277号长春恒大城(一期A区)3号楼,15号楼A区115号",
        "lat": "43.9531357633856",
        "lng": "125.297867794009",
        "name": "长春市宽城区三棵松大药房"
      },
      {
        "address": "吉林省长春市宽城区沈铁.北部湾一期24115室",
        "lat": "43.9593796549077",
        "lng": "125.342194806913",
        "name": "长春市金开大药房"
      },
      {
        "address": "长春市宽城区台北大街以南、凯旋路以西钢材市场地块棚户区改造(台北明珠)建设项目(三期)B1、B2、B3、B4楼104号",
        "lat": "43.9277733623152",
        "lng": "125.323690005427",
        "name": "吉林大众大药房有限公司台北明珠分公司"
      },
      {
        "address": "长春市宽城区九台北路499-93号",
        "lat": "43.9413549966029",
        "lng": "125.334248905088",
        "name": "长春市金天翼大药房"
      },
      {
        "address": "吉林省长春市宽城区柳影路与菜市南街交汇处万龙柳影春天(万龙第五城)15[幢]101号房",
        "lat": "43.9473224311491",
        "lng": "125.30904091897",
        "name": "吉林大药房药业股份有限公司长春万龙第五城连锁店"
      },
      {
        "address": "长春市宽城区凯旋路7号金玉良园小区金玉良园5车库[幢]104",
        "lat": "43.922547515529",
        "lng": "125.322277732572",
        "name": "长春市弘易堂大药房有限公司"
      },
      {
        "address": "长春市宽城区新月路新月山庄小区A2栋101",
        "lat": "43.9428774139812",
        "lng": "125.295115062313",
        "name": "吉林省济仁堂大药房(普通合伙)"
      },
      {
        "address": "长春市宽城区团山街102北路东团山花园小区8号楼2单元106、107室",
        "lat": "43.9454658012229",
        "lng": "125.359807832625",
        "name": "长春市金神天翼大药房有限公司"
      },
      {
        "address": "吉林省长春市宽城区北城农贸市场2356号门市",
        "lat": "43.9550020802855",
        "lng": "125.314496001144",
        "name": "长春市康汇医药超市"
      },
      {
        "address": "长春市宽城区凯旋路西万龙台北明珠B2号楼103号",
        "lat": "43.9250194943218",
        "lng": "125.321105380759",
        "name": "长春市佳禾大药房"
      },
      {
        "address": "长春市宽城区英伦小镇B11-104号",
        "lat": "43.9634985497134",
        "lng": "125.308097574832",
        "name": "长春市宽城区山林大药房"
      },
      {
        "address": "长春市宽城区上台花园小区A-1、B-1区第A9栋107号",
        "lat": "43.9449893524615",
        "lng": "125.348497218465",
        "name": "长春市宽城区希望依博大药房"
      },
      {
        "address": "长春市宽城区美景天城二期第40号楼114号",
        "lat": "43.9436466193348",
        "lng": "125.308040726271",
        "name": "长春市靖滋大药房"
      },
      {
        "address": "长春市宽城区紫金豪庭一期第6幢0单元105号房",
        "lat": "43.9422789878072",
        "lng": "125.338336990934",
        "name": "长春市和仁堂大药房"
      },
      {
        "address": "长春市宽城区凯旋路与台北大街交汇长春宽城万达广场A地块5幢2单元104号房一楼",
        "lat": "43.9205533995937",
        "lng": "125.326491328378",
        "name": "吉林省睿通大药房连锁有限公司北站店"
      },
      {
        "address": "长春市宽城区宋家路北华泰世纪新城三期（乐嘉茗园）33/35幢103号房",
        "lat": "43.9531912498422",
        "lng": "125.310609771173",
        "name": "吉林省禹成药房连锁有限公司华泰店"
      },
      {
        "address": "吉林省长春市宽城区长白小区16栋10门",
        "lat": "43.913231869339",
        "lng": "125.33881648094",
        "name": "长春市宽城区鑫和和大药房"
      },
      {
        "address": "长春市宽城区北亚泰大街与宽府路交汇3988号",
        "lat": "43.9485002878332",
        "lng": "125.336863511422",
        "name": "博远大药房(长春)有限责任公司"
      },
      {
        "address": "长春市宽城区宽府路吴中印象二期19栋105室",
        "lat": "43.9488611752605",
        "lng": "125.336571642592",
        "name": "长春市旗开大药房有限公司"
      },
      {
        "address": "吉林省长春市宽城区纪家窝堡地块棚户区（华源公园道1号二期）16幢0单元114号房",
        "lat": "43.9688278953692",
        "lng": "125.320391136901",
        "name": "吉林省范氏昕格医药有限责任公司"
      },
      {
        "address": "长春市宽城区华源公园道1号二期16幢0单元102号",
        "lat": "43.9688278953692",
        "lng": "125.320391136901",
        "name": "吉林省吉盛药房有限责任公司"
      },
      {
        "address": "长春市宽城区上台新村花园小区A-1、B-1区第A1幢101号房",
        "lat": "43.9449893524615",
        "lng": "125.348497218465",
        "name": "长春市宽城区义合堂大药房"
      },
      {
        "address": "吉林省长春市宽城区基隆家园B楼101-109号",
        "lat": "43.9465244232977",
        "lng": "125.289238062572",
        "name": "宽城区华方医院"
      },
      {
        "address": "长春市北亚泰大街以西、规划乙一路北吴中印象1(幢)107、108号房",
        "lat": "43.9492824850589",
        "lng": "125.342179078272",
        "name": "宽城区友爱一生综合门诊部"
      },
      {
        "address": "长春市宽城区凯旋路万龙台北明珠小区E1栋（101门市）1-4楼",
        "lat": "43.9246984493911",
        "lng": "125.323186751342",
        "name": "长春长中国医馆有限公司春城国医馆中医医院"
      },
      {
        "address": "长春市宽城区西天光路春铁新城小区21栋101门市",
        "lat": "43.9251470224623",
        "lng": "125.338658973094",
        "name": "长春市宽城区阜和大药房"
      },
      {
        "address": "长春市宽城区庆丰路北、亚泰大街东、规划丙五十七路南、北十条西上台花园小区B-1区B1号楼101号",
        "lat": "43.9449893524615",
        "lng": "125.348497218465",
        "name": "吉林省恒爱大药房连锁有限公司上台连锁店"
      },
      {
        "address": "长春市宽城区青年路西、北至规划甲路、东至规划丙路青年城（C区）C-1幢0单元113",
        "lat": "43.9465521742815",
        "lng": "125.296310978877",
        "name": "长春同康大药房连锁股份有限公司住邦店"
      },
      {
        "address": "长春市宽城区砂之船（中东）奥特莱斯卖场内GB1FA0126",
        "lat": "43.9541677717781",
        "lng": "125.331754728381",
        "name": "吉林省恒爱大药房连锁有限公司健康万家砂之船连锁店"
      },
      {
        "address": "长春市宽城区东天光路215-2号",
        "lat": "43.9266120902078",
        "lng": "125.360617710926",
        "name": "长春市欣天翼大药房有限公司"
      },
      {
        "address": "吉林省长春市宽城区庆丰路北、亚泰大街东、规划丙五十七路南、北十条西上台花园小区B4号楼114号",
        "lat": "43.9406175871065",
        "lng": "125.35126129743",
        "name": "吉林敖东大药房连锁有限公司长春上台花园分店"
      },
      {
        "address": "长春市宽城区黑水路东二条综合楼（太平洋大厦）4号商业[幢]108号房",
        "lat": "43.9144046518146",
        "lng": "125.33260644154",
        "name": "吉林新海发医药连锁有限公司长春和合分公司"
      },
      {
        "address": "吉林省长春市宽城区白菊路七号706号门市",
        "lat": "43.9050706609073",
        "lng": "125.316046220188",
        "name": "长春市优建大药房有限公司"
      },
      {
        "address": "长春市宽城区东一条79号",
        "lat": "43.9141794476203",
        "lng": "125.333479169501",
        "name": "长春市益民大药房"
      },
      {
        "address": "吉林省长春市宽城区东三条街与黑水路交汇南行60米（东三条11号一楼门市）",
        "lat": "43.9129171203906",
        "lng": "125.339300520009",
        "name": "长春市新海发药品销售部"
      },
      {
        "address": "长春市宽城区雨润溪树华庭G1幢2单元104号",
        "lat": "43.9294463079707",
        "lng": "125.345235167098",
        "name": "长春市益发药店"
      },
      {
        "address": "长春市宽城区万龙北斗星城C-1幢1单元102",
        "lat": "43.9483099841204",
        "lng": "125.303078420479",
        "name": "长春市仁众大药房"
      },
      {
        "address": "长春市宽城区中冶蓝城B区34楼101号-1",
        "lat": "43.9618583911827",
        "lng": "125.325247783975",
        "name": "长春市宽城区药一堂大药房"
      },
      {
        "address": "长春市宽城区基隆北街与柳江路交汇龙泰檀香苑61幢1单元102房",
        "lat": "43.9369251381763",
        "lng": "125.289231577893",
        "name": "吉林省正开医药连锁有限公司长春龙泰檀香苑店"
      },
      {
        "address": "长春市宽城区青年路以西、北环城路以南青年城（A区）A-32（部分）幢1单元118号房",
        "lat": "43.9501387525979",
        "lng": "125.298464457372",
        "name": "吉林敖东大药房连锁有限公司长春青年城分店"
      },
      {
        "address": "长春市宽城区亚泰大街西春铁新城3号楼102号",
        "lat": "43.926978348764",
        "lng": "125.337297676982",
        "name": "吉林省金煜康大药房有限公司"
      },
      {
        "address": "长春市长德新区沃皮街道沃皮大路1579号门市",
        "lat": "43.8396161809511",
        "lng": "125.294849763892",
        "name": "长春市民益大药房连锁有限公司长德分公司"
      }
    ]


;

