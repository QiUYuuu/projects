import { Injectable } from '@angular/core';
import {openDownloadDialog, sheet2blob} from '../utils/xlsx';
import XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class RdXlsxService {

  constructor() { }
  private daochuThead = ['机构名称', '统一机构代码', '法人', '地址', '类型', '申请时间', '状态'];

  private employeeHead = ['姓名', '性别', '身份证号', '职务', '是否参加医保', '是否参加社保', '参保类型', '备注'];
  private employeeValue = ['name', 'sex', 'idCard', 'job', 'insured', 'social', 'insuredType', 'note'];

  private drugHead = ['申请机构名称', '注册地址', '城区控规所属单元', '药品经营许可证号', '药品经营许可证号有效期', '法定代表人',
  '企业负责人', '统一机构代码', '营业执照有效期限', '经营方式', '药品经营质量管理规范认证证书编号', '药品经营质量管理规范认证证书有效期限',
  , '经营药品品种数量', '单位开户银行账号', '租房期限', '药品经营范围', '联系人', '联系人手机号'];
  // tslint:disable-next-line: max-line-length
  private drugValue = ['comname', 'adress', 'unit', 'licenseNum', 'termDate', 'legal_person', 'charge', 'creditCode', 'licenseVali', 'manMode',
    'charge', 'authNum', 'authDate', 'drugNum', 'bank', 'rental', 'scope', 'people', 'tel'];

  private medicalHead = ['申请机构名称', '注册地址', '城区控规所属单元', '法定代表人', '申请开通医保服务内容', '医疗机构类别', '医疗机构许可证号登记号', '医院等级', '医院级别',
  '医疗机构许可证有效期限', '所有制形式', '经营性质', '统一机构代码', '医疗用房面积/m2', '营业执照有效期限', '单位开户银行账号', '科室数量', '租房期限', '床位数量',
  '诊疗项目', '联系人', '联系人手机号'];
  // tslint:disable-next-line: max-line-length
  private medicalValue = ['comname', 'adress', 'unit', 'legal_person', 'serviceContent', 'moType', 'licenseNum', 'grade', 'level', 'licenseVali', 'ownership', 'nature',
    'creditCode', 'area', 'licenseVali', 'bank', 'departNum', 'rental', 'bedNum', 'scope', 'people', 'tel'];

  private spDrugHead = ['药店名称', '所属企业（集团）名称', '经营场所', '统一机构代码', '药品经营许可证号', '营业面积', '法定代表人', '法定代表人联系电话', '医保负责人',
  '医保负责人联系电话', '经营方式', '具备销售特药品种名称、数量'];
  private spDrugValue = ['comName', 'partOfUnit', 'address', 'creditCode', 'licenseKey', 'area', 'legalMember', 'legalMemberTel',
    'ybCharge', 'ybChargeTel', 'businessPractice', 'drugTypeAndNum'];

  private spMedicalHead = ['医疗机构名称（编码）', '单位地址', '统一机构代码', '医疗机构类别', '经营性质', '法定代表人', '特药专业科室数量', '医院等级', '医院级别', '医疗机构许可证号登记号',
  '具备责任医师资格的人数', '医保负责人', '联系电话', '取得销售资格的特药或医用材料情况'];
  private spMedicalValue = ['comName', 'address', 'creditCode', 'type', 'businessNature', 'legalMember', 'departNum', 'hosLevel',
    'hosGrade', 'registerNum', 'docNum', 'ybCharge', 'ybChargeTel', 'spMedicalMaterial'];

  private typeObj = {
    employee: this.employeeHead,
    drug: this.drugHead,
    medical: this.medicalHead,
    spDrug: this.spDrugHead,
    spMedical: this.spMedicalHead
  };
  private valueObj = {
    employee: this.employeeValue,
    drug: this.drugValue,
    medical: this.medicalValue,
    spDrug: this.spDrugHead,
    spMedical: this.spMedicalValue
  };

  exportXlsx(type: string, filename: string, valueArr: Array<object>): void {
    const arr: Array<any> = [];
    arr.push(this.typeObj[type]);
    valueArr.map(value => {
      const newArr = [];
      this.valueObj[type].map(e => {
        newArr.push(value[e]);
      });
      arr.push(newArr);
    });
    const sheet = XLSX.utils.aoa_to_sheet(arr);
    openDownloadDialog(sheet2blob(sheet, 'sheet1'), filename + '.xlsx');
  }
}
