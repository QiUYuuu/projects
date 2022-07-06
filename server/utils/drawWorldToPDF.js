const fs = require('fs');


const templateTypeObj = {
    A: ['creditCode', 'name', 'address', 'Region', 'member', 'type', 'level', 'ownship', 'nature', 'officeNum', 'bedNum', 'onemoNum', 'area', 'ybCharge', 'ybChargeTel', 'setDate',
        'licenseKey', 'insurance', 'dockerH', 'dockerM', 'dockerL', 'nurseH', 'nurseM', 'nurseL', 'meTechH', 'meTechM', 'meTechL', 'applyDate', 'locationAddress',
        'memberTel', 'timeLimit', 'onlyCode', 'beginTime', 'endTime'],

    B: ['creditCode', 'name', 'address', 'Region', 'member', 'practice', 'area', 'ybCharge', 'ybChargeTel', 'business', 'setDate', 'level', 'pharmacist',
        'insurance', 'techH', 'techM', 'techL', 'yingyeNum', 'applyDate', 'locationAddress', 'lat', 'lng', 'memberTel', 'timeLimit', 'yingYeTime'],
    change: ['id', 'beforeName', 'afterName', 'beforeMember', 'afterMember', 'beforeAddress', 'afterAddress', 'beforeArea', 'afterArea', 'beforeCode', 'afterCode',
            'beforeBus', 'afterBus', 'beforeBank', 'afterBank', 'beforeBankCode', 'afterBankCode', 'contacts', 'contactsPhone', 'techzy', 'techH', 'techM', 'techL',
            'yingye', 'note', 'changeUnit', 'region', 'batch', 'beforeLevel', 'beforeNature', 'beforeType', 'beforeLicenseKey', 'afterLevel', 'afterNature',
            'afterType', 'afterLicenseKey']
};

const allAreas = [
    { id: 'in_01', title: '南关区' }, { id: 'in_02', title: '朝阳区' }, { id: 'in_03', title: '二道区' }, { id: 'in_04', title: '绿园区' },
    { id: 'in_05', title: '高新区' }, { id: 'in_06', title: '宽城区' }, { id: 'in_07', title: '汽车经济开发区' }, { id: 'in_08', title: '经济开发区' },
    { id: 'in_09', title: '净月经济开发区' }, { id: 'in_10', title: '净月高新技术产业开发区' }, { id: 'in_11', title: '北湖经济开发区' }, { id: 'out_01', title: '双阳' },
    // tslint:disable-next-line: max-line-length
    { id: 'out_02', title: '德惠' }, { id: 'out_03', title: '九台' }, { id: 'out_04', title: '农安' }, { id: 'out_05', title: '榆树' }, { id: 'out_06', title: '公主岭' }
];

module.exports = function drawPDF(affairs, type, doc, valueObj, imgPath, pdfPath) {
    const timestamp = new Date().getTime();
    const infoObj = {};
    if (affairs === 'insert') {
        templateTypeObj[type].map((e, i) => {
            const key = templateTypeObj[type][i];
            infoObj[key] = getRealValue(key, valueObj[i]);
        });
    } else if (affairs === 'change') {
        templateTypeObj[affairs].map((e, i) => {
            const key = templateTypeObj[affairs][i];
            infoObj[key] = getRealValue(key, valueObj[i]);
        });
    }
    if ((affairs === 'insert') && (type === 'B')) {
        drawDrugTable(50, 90, 48, doc, infoObj, timestamp, imgPath, pdfPath);
    } else if ((affairs === 'insert') && (type === 'A')) {
        drawMedicalTable(50, 90, 40, doc, infoObj, timestamp, imgPath, pdfPath);
    } else if ((affairs === 'change') && (type === 'B')) {
        drawDrugChangeTable(50, 90, 35, 80, doc, infoObj, timestamp, imgPath, pdfPath);
    } else if ((affairs === 'change') && (type === 'A')) {
        drawMedicalChangeTable(50, 90, 35, 80, doc, infoObj, timestamp, imgPath, pdfPath)
    }
}

function dateChange(dateStr) {
    const dateArray = dateStr.split(',');
    const firstDate = new Date(dateArray[0]);
    const secondDate = new Date(dateArray[1]);
    const firstYear = firstDate.getFullYear();
    const firstMonth = firstDate.getMonth() + 1;
    const firstDay = firstDate.getDate();
    const secondYear = secondDate.getFullYear();
    const secondMonth = secondDate.getMonth() + 1;
    const secondDay = secondDate.getDate();
    return `${firstYear}-${dateFormat(firstMonth)}-${dateFormat(firstDay)} 至 ${secondYear}-${dateFormat(secondMonth)}-${dateFormat(secondDay)}`;
}

function getRealValue(key, value) {
    let rtnStr = value;
    switch (key) {
        case 'timeLimit':
            rtnStr = dateChange(value);
            break;
        case 'Region':
            console.log(value);
            rtnStr = allAreas.find(e => e.id === value)['title'];
            break;
        case 'setDate':
            rtnStr = setDateChange(value);
            break;
    }
    return rtnStr;
}
function dateFormat(date) {
    return date > 10 ? date : '0' + date;
}

function setChangeMatter(matterString) {
    if (!matterString) {
        return;
    }
    let rtnStr = [];
    const matterArray = matterString.split(',');
    if (matterArray.indexOf('name') >= 0) {
        rtnStr.push('名称');
    }
    if (matterArray.indexOf('address') >= 0) {
        rtnStr.push('地址');
    }
    if (matterArray.indexOf('member') >= 0) {
        rtnStr.push('法人');
    }
    if (matterArray.indexOf('bank') >= 0) {
        rtnStr.push('账户');
    }
    return rtnStr.toString();
}

function setDateChange(date) {
    const time = new Date(date);
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const day = time.getDate();
    const dateStr = `${year}-${dateFormat(month)}-${dateFormat(day)}`;
    return dateStr;
}

function drawDrugTable(x, y, step, doc, valueObj, timestamp, imgPath, pdfPath) {
    if (!fs.existsSync(`${pdfPath}/pdfs`)) {
        fs.mkdirSync(`${pdfPath}/pdfs`);
    }
    doc.pipe(fs.createWriteStream(`${pdfPath}/pdfs/${valueObj['name']}.pdf`));
    doc.font(`${process.cwd()}/msyh.ttf`);
    doc.moveTo(x, y)
        .fontSize(15)
        .text('长春市医疗保险定点零售药店签约申请表', 180, 50);
    for (let i = 0; i < 14; i++) {
        doc.lineTo(570, y + step * i).moveTo(x, y + step * (i + 1));
    }
    doc.moveTo(x, y).lineTo(x, y + (step * 13)).moveTo(570, y).lineTo(570, y + (step * 13));
    doc.moveTo(x + 130, y).lineTo(x + 130, y + (step * 13));
    doc.moveTo(x + 260, y + (step * 4)).lineTo(x + 260, y + (step * 11));
    doc.moveTo(x + 370, y + (step * 4)).lineTo(x + 370, y + (step * 11));
    doc.moveTo(x + 180, y + (step * 11)).lineTo(x + 180, y + (step * 12));
    doc.moveTo(x + 250, y + (step * 11)).lineTo(x + 250, y + (step * 12));
    doc.moveTo(x + 320, y + (step * 11)).lineTo(x + 320, y + (step * 12));
    doc.moveTo(x + 390, y + (step * 11)).lineTo(x + 390, y + (step * 12));
    doc.moveTo(x + 460, y + (step * 11)).lineTo(x + 460, y + (step * 12));
    doc.stroke();
    writeDrug(60, 190, 330, 440, 110, step, doc, valueObj, imgPath);
}

function writeDrug(x1, x2, x3, x4, y, step, doc, valueObj, imgPath) {
    doc.fontSize(14).text('申请单位名称', x1, y).text(valueObj['name'], x2, y);
    doc.text('注册地址', x1, y + step).text(valueObj['address'], x2, y + step);
    doc.text('定位地址', x1, y + step * 2).text(valueObj['locationAddress'], x2, y + step * 2);
    doc.text('统一社会信用代码', x1, y + step * 3).text(valueObj['creditCode'], x2, y + step * 3);
    doc.text('药品经营许可证号', x1, y + step * 4).text(valueObj['business'], x2, y + step * 4).text('药品经营许可证', x3 - 15, y + step * 4 - 15).text('有效期限', x3 + 10, y + step * 4).text(valueObj['timeLimit'], x4, y + step * 4 - 15);
    doc.text('所属区域', x1, y + step * 5 - 5).text(valueObj['Region'], x2, y + step * 5).text('营业时间', x3, y + step * 5 - 5).text(valueObj['yingYeTime'], x4, y + step * 5);
    doc.text('医疗保险情况', x1, y + step * 6).text(valueObj['insurance'], x2, y + step * 6).text('成立时间', x3, y + step * 6).text(valueObj['setDate'], x4, y + step * 6);
    doc.text('经营方式', x1, y + step * 7).text(valueObj['practice'], x2, y + step * 7).text('营业面积', x3, y + step * 7).text(valueObj['area'], x4, y + step * 7);
    doc.text('药店等级', x1, y + step * 8).text(valueObj['level'], x2, y + step * 8).text('驻店药师', x3, y + step * 8).text(valueObj['pharmacist'], x4, y + step * 8);
    doc.text('法人代表', x1, y + step * 9).text(valueObj['member'], x2, y + step * 9).text('联系电话', x3, y + step * 9).text(valueObj['memberTel'], x4, y + step * 9);
    doc.text('医保负责人', x1, y + step * 10).text(valueObj['ybCharge'], x2, y + step * 10).text('联系电话', x3, y + step * 10).text(valueObj['ybChargeTel'], x4, y + step * 10);
    doc.text('药学及时人员数', x1, y + step * 11)
        .text('高级', x2, y + step * 11).text(valueObj['techH'] + '人', x2 + 75, y + step * 11)
        .text('中级', x2 + 140, y + step * 11).text(valueObj['techM'] + '人', x2 + 220, y + step * 11)
        .text('低级', x2 + 275, y + step * 11).text(valueObj['techL'] + '人', x2 + 350, y + step * 11);
    doc.text('营业人员', x1, y + step * 12).text(valueObj['yingyeNum'] + '人', x2, y + step * 12);
    doc.stroke();
    composeFile(imgPath, doc);
}


function drawMedicalTable(x, y, step, doc, valueObj, timestamp, imgPath, pdfPath) {
    if (!fs.existsSync(`${pdfPath}/pdfs`)) {
        fs.mkdirSync(`${pdfPath}/pdfs`);
    }
    doc.pipe(fs.createWriteStream(`${pdfPath}/pdfs/${valueObj['name']}.pdf`));
    doc.font(`${process.cwd()}/msyh.ttf`);
    doc.moveTo(x, y)
        .fontSize(15)
        .text('长春市医疗保险定点医疗机构签约申请表', 180, 50);
    for (let i = 0; i < 17; i++) {
        doc.lineTo(570, y + step * i).moveTo(x, y + step * (i + 1));
    }
    doc.moveTo(x, y).lineTo(x, y + (step * 16)).moveTo(570, y).lineTo(570, y + (step * 16));
    doc.moveTo(x + 130, y).lineTo(x + 130, y + (step * 16));
    doc.moveTo(x + 260, y + (step * 3)).lineTo(x + 260, y + (step * 16));
    doc.moveTo(x + 370, y + (step * 3)).lineTo(x + 370, y + (step * 16));
    doc.moveTo(x + 180, y + (step * 13)).lineTo(x + 180, y + (step * 16));
    doc.moveTo(x + 310, y + (step * 13)).lineTo(x + 310, y + (step * 16));
    doc.moveTo(x + 420, y + (step * 13)).lineTo(x + 420, y + (step * 16));
    doc.stroke();
    writeMedical(60, 190, 330, 440, 100, step, doc, valueObj, imgPath);
}


function writeMedical(x1, x2, x3, x4, y, step, doc, valueObj, imgPath) {
    doc.fontSize(14).text('申请单位名称', x1, y).text(valueObj['name'], x2, y);
    doc.text('注册地址', x1, y + step).text(valueObj['address'], x2, y + step);
    doc.text('定位地址', x1, y + step * 2).text(valueObj['locationAddress'], x2, y + step * 2);
    doc.text('统一社会信用代码', x1, y + step * 3).text(valueObj['creditCode'], x2, y + step * 3).text('医疗机构等级', x3, y + step * 3).text(valueObj['level'], x4, y + step * 4 - 15);
    doc.text('机构许可证注册号', x1, y + step * 4).text(valueObj['licenseKey'], x2, y + step * 4).text('医疗机构类别', x3, y + step * 4).text(valueObj['type'], x4, y + step * 4);
    doc.text('医疗机构许可证', x1, y + step * 5 - 5).text('有效期限', x1 + 20, y + step * 5 + 10).text(valueObj['timeLimit'].slice(0, 10), x2 + 10, y + step * 5 - 5).text(valueObj['timeLimit'].slice(10, 23), x2, y + step * 5 + 10)
        .text('执业许可证', x3, y + step * 5 - 5).text('全国唯一标识码', x3 - 15, y + step * 5 + 10).text(valueObj['onlyCode'], x4, y + step * 5);
    doc.text('所属区域', x1, y + step * 6).text(valueObj['Region'], x2, y + step * 6).text('成立时间', x3, y + step * 6).text(valueObj['setDate'], x4, y + step * 6);
    doc.text('所有制形式', x1, y + step * 7).text(valueObj['ownship'], x2, y + step * 7).text('经营性质', x3, y + step * 7).text(valueObj['nature'], x4, y + step * 7);
    doc.text('医疗用房面积', x1, y + step * 8).text(valueObj['area'], x2, y + step * 8).text('科室数量', x3, y + step * 8).text(valueObj['officeNum'], x4, y + step * 8);
    doc.text('床位数量', x1, y + step * 9).text(valueObj['bedNum'], x2, y + step * 9).text('牙椅数量', x3, y + step * 9).text(valueObj['onemoNum'], x4, y + step * 9);
    doc.text('职工医疗保险情况', x1, y + step * 10).text(valueObj['insurance'], x2, y + step * 10).text('营业时间', x3, y + step * 10).text(`${valueObj['beginTime']}-${valueObj['endTime']}`, x4, y + step * 10);
    doc.text('法人代表', x1, y + step * 11).text(valueObj['member'], x2, y + step * 11).text('法人联系电话', x3, y + step * 11).text(valueObj['memberTel'], x4, y + step * 11);
    doc.text('医保负责人', x1, y + step * 12).text(valueObj['ybCharge'], x2, y + step * 12).text('联系电话', x3, y + step * 12).text(valueObj['ybChargeTel'], x4, y + step * 12);
    doc.text('医生', x1, y + step * 13)
        .text('高级', x2, y + step * 13).text(valueObj['dockerH'] + '人', x2 + 75, y + step * 13)
        .text('中级', x2 + 140, y + step * 13).text(valueObj['dockerM'] + '人', x2 + 190, y + step * 13)
        .text('低级', x2 + 240, y + step * 13).text(valueObj['dockerL'] + '人', x2 + 320, y + step * 13);
    doc.text('护士', x1, y + step * 14)
        .text('高级', x2, y + step * 14).text(valueObj['nurseH'] + '人', x2 + 75, y + step * 14)
        .text('中级', x2 + 140, y + step * 14).text(valueObj['nurseM'] + '人', x2 + 190, y + step * 14)
        .text('低级', x2 + 240, y + step * 14).text(valueObj['nurseL'] + '人', x2 + 320, y + step * 14);
    doc.text('医技人员', x1, y + step * 15)
        .text('高级', x2, y + step * 15).text(valueObj['meTechH'] + '人', x2 + 75, y + step * 15)
        .text('中级', x2 + 140, y + step * 15).text(valueObj['meTechM'] + '人', x2 + 190, y + step * 15)
        .text('低级', x2 + 240, y + step * 15).text(valueObj['meTechL'] + '人', x2 + 320, y + step * 15);
    doc.stroke();
    composeFile(imgPath, doc);
}

function drawDrugChangeTable(x, y, step, step2, doc, valueObj, timestamp, imgPath, pdfPath) {
    if (!fs.existsSync(`${pdfPath}/pdfs`)) {
        fs.mkdirSync(`${pdfPath}/pdfs`);
    }
    doc.pipe(fs.createWriteStream(`${pdfPath}/pdfs/${valueObj['beforeName']}.pdf`));
    doc.font(`${process.cwd()}/msyh.ttf`);
    doc.moveTo(x, y)
        .fontSize(15)
        .text('长春市医疗保险定点零售药店变更签约申请表', 160, 50);
    for (let i = 0; i < 12; i++) {
        doc.lineTo(570, y + step * i).moveTo(x, y + step * (i + 1));
    }
    doc.moveTo(x, y + step * 12.5).lineTo(570, y + step * 12.5);
    doc.moveTo(x, y + step * 12 + step2 * 1.5).lineTo(570, y + step * 12 + step2 * 1.5);
    doc.moveTo(x, y + step * 12 + step2 * 3).lineTo(570, y + step * 12 + step2 * 3);
    doc.moveTo(x, y).lineTo(x, y + step * 12 + step2 * 3).moveTo(570, y).lineTo(570, y + step * 12 + step2 * 3);
    doc.moveTo(x + 130, y).lineTo(x + 130, y + step * 12 + step2 * 3);
    doc.moveTo(x + 330, y).lineTo(x + 330, y + (step * 9));
    doc.stroke();
    writeDrugChange(60, 190, 400, 100, step, step2, doc, valueObj, imgPath);
}

function writeDrugChange(x1, x2, x3, y, step, step2, doc, valueObj, imgPath) {
    doc.fontSize(14).text('项目', x1, y).text('变更前', 260, y).text('变更后', 450, y);
    doc.text('单位名称', x1, y + step).text(valueObj['beforeName'].slice(0, 13), x2, y + step - 10)
        .text(valueObj['beforeName'].slice(13,valueObj['beforeName'].length), x2, y + step + 5)
        .text(valueObj['afterName'], x3, y + step);
    doc.text('法人代表', x1, y + step * 2).text(valueObj['beforeMember'], x2, y + step * 2).text(valueObj['afterMember'], x3, y + step * 2);
    doc.text('单位地址', x1, y + step * 3).text(valueObj['beforeAddress'], x2, y + step * 3).text(valueObj['afterAddress'], x3, y + step * 3);
    doc.text('营业面积', x1, y + step * 4).text(valueObj['beforeArea'], x2, y + step * 4).text(valueObj['afterArea'], x3, y + step * 4);
    doc.text('营业执照注册号', x1, y + step * 5 - 5).text(valueObj['beforeCode'], x2, y + step * 5).text(valueObj['afterCode'], x3, y + step * 5);
    doc.text('药品经营许可证号', x1, y + step * 6).text(valueObj['beforeBus'], x2, y + step * 6).text(valueObj['afterBus'], x3, y + step * 6);
    doc.text('开户银行', x1, y + step * 7).text(valueObj['beforeBank'], x2, y + step * 7).text(valueObj['afterBank'], x3, y + step * 7);
    doc.text('账号', x1, y + step * 8).text(valueObj['beforeBankCode'], x2, y + step * 8).text(valueObj['afterBankCode'], x3, y + step * 8);
    doc.text('联系人及电话', x1, y + step * 9).text(`${valueObj['contacts']}，${valueObj['contactsPhone']}`, x2, y + step * 9);
    doc.text('变更事项', x1, y + step * 10).text(setChangeMatter(valueObj['changeUnit']), x2, y + step * 10);
    doc.text('人员构成', x1, y + step * 11 + 10).text(`执业药师${valueObj['techzy']}人，高级${valueObj['techH']}人，中级${valueObj['techM']}人，低级${valueObj['techL']}人，`, x2, y + step * 11);
    doc.text('变更原因', x1, y + step * 10 + step2 * 1.5).text(valueObj['note'], x2, y + step * 10 + step2 * 1.5);
    doc.text('审核意见', x1, y + step * 10 + step2 * 3);
    doc.stroke();
    composeFile(imgPath, doc);
}

function drawMedicalChangeTable(x, y, step, step2, doc, valueObj, timestamp, imgPath, pdfPath) {
    if (!fs.existsSync(`${pdfPath}/pdfs`)) {
        fs.mkdirSync(`${pdfPath}/pdfs`);
    }
    doc.pipe(fs.createWriteStream(`${pdfPath}/pdfs/${valueObj['beforeName']}.pdf`));
    doc.font(`${process.cwd()}/msyh.ttf`);
    doc.moveTo(x, y)
        .fontSize(15)
        .text('长春市医疗保险定点医疗机构变更申请表', 180, 50);
    for (let i = 0; i < 13; i++) {
        doc.lineTo(570, y + step * i).moveTo(x, y + step * (i + 1));
    }
    doc.moveTo(x, y + step * 12 + step2 * 1.5).lineTo(570, y + step * 12 + step2 * 1.5);
    doc.moveTo(x, y + step * 12 + step2 * 3).lineTo(570, y + step * 12 + step2 * 3);
    doc.moveTo(x, y).lineTo(x, y + step * 12 + step2 * 3).moveTo(570, y).lineTo(570, y + step * 12 + step2 * 3);
    doc.moveTo(x + 130, y).lineTo(x + 130, y + step * 12 + step2 * 3);
    doc.moveTo(x + 330, y).lineTo(x + 330, y + (step * 10));
    doc.stroke();
    writeMedicalChange(60, 190, 400, 100, step, step2, doc, valueObj, imgPath);
}


function writeMedicalChange(x1, x2, x3, y, step, step2, doc, valueObj, imgPath) {
    doc.fontSize(14).text('项目', x1, y).text('变更前', 260, y).text('变更后', 450, y);
    doc.text('单位名称', x1, y + step).text(valueObj['beforeName'].slice(0, 13), x2, y + step - 10)
        .text(valueObj['beforeName'].slice(13,valueObj['beforeName'].length), x2, y + step + 5)
        .text(valueObj['afterName'], x3, y + step);
    doc.text('法人代表', x1, y + step * 2).text(valueObj['beforeMember'], x2, y + step * 2).text(valueObj['afterMember'], x3, y + step * 2);
    doc.text('单位地址', x1, y + step * 3).text(valueObj['beforeAddress'], x2, y + step * 3).text(valueObj['afterAddress'], x3, y + step * 3);
    doc.text('医院等级', x1, y + step * 4).text(valueObj['beforeArea'], x2, y + step * 4).text(valueObj['afterArea'], x3, y + step * 4);
    doc.text('经营性质', x1, y + step * 5 - 5).text(valueObj['beforeCode'], x2, y + step * 5).text(valueObj['afterCode'], x3, y + step * 5);
    doc.text('医疗机构类别', x1, y + step * 6).text(valueObj['beforeBus'], x2, y + step * 6).text(valueObj['afterBus'], x3, y + step * 6);
    doc.text('执业许可证号', x1, y + step * 7).text(valueObj['beforeBank'], x2, y + step * 7).text(valueObj['afterBank'], x3, y + step * 7);
    doc.text('开户银行', x1, y + step * 8).text(valueObj['beforeBank'], x2, y + step * 8).text(valueObj['afterBank'], x3, y + step * 8);
    doc.text('账号', x1, y + step * 9).text(valueObj['beforeBankCode'], x2, y + step * 9).text(valueObj['afterBankCode'], x3, y + step * 9);
    doc.text('联系人及电话', x1, y + step * 10).text(`${valueObj['contacts']}，${valueObj['contactsPhone']}`, x2, y + step * 10);
    doc.text('变更事项', x1, y + step * 11).text(setChangeMatter(valueObj['changeUnit']), x2, y + step * 11);
    doc.text('变更原因', x1, y + step * 10 + step2 * 1.5 - 10).text(valueObj['note'], x2, y + step * 10 + step2 * 1.5 - 10);
    doc.text('审核意见', x1, y + step * 10 + step2 * 3 - 10);
    doc.stroke();
    composeFile(imgPath, doc);
}


// 往pdf里添加图片
function composeFile(imgPath, doc ) {
    doc.addPage();
    const fileArray = fs.readdirSync(imgPath);
    const imgArray = fileArray.filter(e => {
        return e.indexOf('jpg') >= 0;
    });
    for (let i = 0; i < imgArray.length; i++) {
        const fileName = imgArray[i].split('.')[0];
        doc.font(`${process.cwd()}/msyh.ttf`);
        doc.fontSize(17).text(fileName.split('-')[0], 200, 50);
        doc.image(`${imgPath}/${imgArray[i]}`, 20, 100, {
            width: 570,
            height: 600,
            align: 'center'
        });
        if (i !== imgArray.length - 1) {
            doc.addPage({margin: 10, size: [610, 800]});
        } else {
            doc.end();
        }
    }
}
