import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrintmeService {

  constructor() { }

  public printme(type, value) {
    let content = `<html><head><meta charset=\'utf-8\'/><title></title></head>
    <style>table,tr,td,th{border: 1px solid black;border-collapse: collapse;text-align:center}table{width: 100%;height:80%;margin:auto;}
    td{min-width:150px;}
    </style><body><table>`;
    content += this.contractString(type, value);
    content += '</tbody>';
    content += '</table></body></html>';
    const WindowPrt = window.open('', '');
    WindowPrt.document.write(content);
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();

  }

  // 日期格式化
  private datetimeFormat(longTypeDate: string) {
    let dateTypeDate = '';
    const date = new Date(longTypeDate);
    dateTypeDate += date.getFullYear();
    dateTypeDate += '-' + (date.getMonth() + 1);
    dateTypeDate += '-' + date.getDay();
    return dateTypeDate;
  }

  private contractString(type: string, value: object): string {
    let finalString = '';
    if (type === 'A') {
      finalString += `<tr><td>申请机构名称</td><td colspan="3">${value['comname']}</td></tr>\n`;
      finalString += `<tr><td>注册地址</td><td colspan="3">${value['adress']}</td></tr>\n`;
      finalString += `<tr><td>城区控规所属单元</td><td colspan="3">${value['unit']}</td></tr>\n`;
      // tslint:disable-next-line: max-line-length
      finalString += `<tr><td>法定代表人</td><td>${value['legal_person']}</td><td>申请开通医保服务内容</td><td>${value['serviceContent']}</td></tr>\n`;
      finalString += `<tr><td>医疗机构类别</td><td>${value['moType']}</td><td>医疗机构许可证号登记号</td><td>${value['licenseNum']}</td></tr>\n`;
      // tslint:disable-next-line: max-line-length
      finalString += `<tr><td>医院等级</td><td>${value['grade']}</td><td>医疗机构许可证有效期限</td><td>${this.datetimeFormat(value['termDate'])}</td></tr>\n`;
      finalString += `<tr><td>所有制形式</td><td>${value['ownership']}</td><td>经营性质</td><td>${value['nature']}</td></tr>\n`;
      finalString += `<tr><td>统一机构代码</td><td>${value['creditCode']}</td><td>${value['level']}</td></tr>\n`;
      // tslint:disable-next-line: max-line-length
      finalString += `<tr<td>医疗用房面积/m2</td><td>${value['area']}</td><td>营业执照有效期限</td><td>${this.datetimeFormat(value['licenseVali'])}</td></tr>\n`;
      finalString += `<tr><td>单位开户银行账号</td><td>${value['bank']}</td><td>科室数量</td><td>${value['departNum']}</td></tr>\n`;
      finalString += `<tr><td>租房期限</td><td>${this.datetimeFormat(value['rental'])}</td><td>床位数量</td><td>${value['bedNum']}</td></tr>\n`;
      // tslint:disable-next-line: max-line-length
      finalString += `<tr><td>诊疗科目</td><td colspan="3">${value['scope']}</td></tr>\n`;
      finalString += `<tr><td>联系人</td><td>${value['people']}</td><td>联系人手机号</td><td>${value['tel']}</td></tr>\n`;
    } else if (type === 'B') {
      finalString += `<tr><td>申请机构名称</td><td colspan="3">${value['comname']}</td></tr>\n`;
      finalString += `<tr><td>注册地址</td><td colspan="3">${value['adress']}</td></tr>\n`;
      finalString += `<tr><td>城区控规所属单元</td><td colspan="3">${value['unit']}</td></tr>\n`;
      finalString += `<tr><td>药品经营许可证号</td><td>${value['licenseNum']}</td><td>法定代表人</td><td>${value['legal_person']}</td></tr>\n`;
      // tslint:disable-next-line: max-line-length
      finalString += `<tr><td>药品经营许可证号有效期限</td><td>${this.datetimeFormat(value['termDate'])}</td><td>企业负责人</td><td>${value['charge']}</td></tr>\n`;
      finalString += `<tr><td>统一机构代码</td><td colspan="3">${value['creditCode']}</td></tr>\n`;
      // tslint:disable-next-line: max-line-length
      finalString += `<tr><td>营业执照有效期限</td><td>${this.datetimeFormat(value['licenseVali'])}</td><td>经营方式</td><td>${value['manMode']}</td></tr>\n`;
      finalString += `<tr><td>药品经营质量管理规范认证证书编号</td><td>${value['authNum']}</td>`;
      // tslint:disable-next-line: max-line-length
      finalString += `<tr><td>药品经营质量管理规范认证证书有效期限</td><td>${this.datetimeFormat(value['authDate'])}</td><td>经营药品品种数量</td><td>${value['drugNum']}</td></tr>\n`;
      finalString += `<tr><td>单位开户银行账号</td><td>${value['bank']}</td><td>租房期限</td><td>${this.datetimeFormat(value['rental'])}</td></tr>\n`;
      finalString += `<tr><td>药店经营范围</td><td colspan="3">${value['scope']}</td></tr>\n`;
      finalString += `<tr><td>联系人</td><td>${value['people']}</td><td>联系人手机号</td><td>${value['tel']}</td></tr>\n`;
    } else if (type === 'SA') {
      finalString += `<tr><td>医疗机构名称(编码)</td><td colspan="3">${value['comName']}</td></tr>\n`;
      finalString += `<tr><td>单位地址</td><td colspan="3">${value['address']}</td></tr>\n`;
      finalString += `<tr><td>医疗机构类别</td><td>${value['medicalType']}</td><td>经营性质</td><td>${value['businessNature']}</td></tr>\n`;
      finalString += `<tr><td>法定代表人</td><td>${value['legalMember']}</td><td>特药专业科室数量</td><td>${value['departNum']}</td></tr>\n`;
      // tslint:disable-next-line: max-line-length
      finalString += `<tr><td>医院等级</td><td>${value['hosLevel']}</td><td>医院级别</td><td>${value['hosGrade']}</td></tr>\n`;
      finalString += `<tr><td>统一机构代码</td><td colspan="3">${value['creditCode']}</td></tr>\n`;
      // tslint:disable-next-line: max-line-length
      finalString += `<tr><td>医疗机构执业许可证登记号</td><td>${value['registerNum']}</td><td>具备责任医师资格的人数</td><td>${value['docNum']}</td></tr>\n`;
      finalString += `<tr><td>医保负责人</td><td>${value['ybCharge']}</td><td>医保负责人联系电话</td><td>${value['ybChargeTel']}</td></tr>\n`;
      finalString += `<tr><td>取得销售资格的特药或医用材料情况</td><td colspan="3">${value['spMedicalMaterial']}</td></tr>\n`;
    } else if (type === 'SB') {
      finalString += `<tr><td>药店名称</td><td colspan="3">${value['comName']}</td></tr>\n`;
      finalString += `<tr><td>所属企业（集团）名称</td><td colspan="3">${value['partOfUnit']}</td></tr>\n`;
      finalString += `<tr><td>经营场所</td><td colspan="3">${value['address']}</td></tr>\n`;
      finalString += `<tr><td>统一机构代码</td><td>${value['creditCode']}</td><td>营业面积</td><td>${value['area']}</td></tr>\n`;
      finalString += `<tr><td>药品经营许可证号</td><td>${value['licenseKey']}</td><td>经营方式</td><td>${value['businessPractice']}</td></tr>\n`;
      // tslint:disable-next-line: max-line-length
      finalString += `<tr><td>法定代表人</td><td>${value['legalMember']}</td><td>法定代表人联系电话</td><td>${value['legalMemberTel']}</td></tr>\n`;
      finalString += `<tr><td>医保负责人</td><td>${value['ybCharge']}</td><td>医保负责人联系电话</td><td>${value['ybChargeTel']}</td></tr>\n`;
      // tslint:disable-next-line: max-line-length
      finalString += `<tr><td>具备销售特药品种名称、数量</td><td colspan="3">${value['drugTypeAndNum']}</td></tr>\n`;
    } else if (type === 'C') {
      finalString += `<tr><td>申请机构名称</td><td colspan="3">${value['comname']}</td></tr>\n`;
      finalString += `<tr><td>单位地址</td><td colspan="3">${value['address']}</td></tr>\n`;
      finalString += `<tr><td>法定代表人</td><td>${value['member']}</td><td>法定代表人联系电话</td><td>${value['memberTel']}</td></tr>\n`;
      finalString += `<tr><td>机构类别</td><td>${value['manageType']}</td><td>机构许可证号编号</td><td>${value['registerNum']}</td></tr>\n`;
      // tslint:disable-next-line: max-line-length
      finalString += `<tr><td>机构许可证有效期限</td><td>${this.datetimeFormat(value['licenseDate'])}</td><td>统一机构代码</td><td colspan="3">${value['creditCode']}</td></tr>\n`;
      // tslint:disable-next-line: max-line-length
      finalString += `<tr><td>经营方式</td><td>${value['businessPractice']}</td><td>经营性质</td><td>${value['businessNature']}</td></tr>\n`;
      // tslint:disable-next-line: max-line-length
      finalString += `<tr><td>机构用房面积（平方米）</td><td>${value['area']}</td><td>营业执照有效期限</td><td>${this.datetimeFormat(value['businessLicenseDate'])}</td></tr>\n`;
      finalString += `<tr><td>单位开户银行账号</td><td>${value['bank']}</td><td>科室数量</td><td>${value['deptNum']}</td></tr>\n`;
      finalString += `<tr><td>租房期限</td><td>${this.datetimeFormat(value['rental'])}</td><td>床位数量</td><td>${value['bedNum']}</td></tr>\n`;
      finalString += `<tr><td>服务范围</td><td colspan="3">${value['services']}</td></tr>\n`;
      finalString += `<tr><td>联系人</td><td>${value['people']}</td><td>联系人手机号</td><td>${value['tel']}</td></tr>\n`;
    }
    return finalString;
  }
}
