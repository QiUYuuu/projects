const PizZip = require('pizzip');
const docxTemplate = require('docxtemplater');
const fs = require('fs');
const path = require('path');

const insertTemplateTypeObj = {
    A: ['creditCode', 'name', 'address', 'Region', 'member', 'type', 'level', 'ownship', 'nature', 'officeNum', 'bedNum', 'onemoNum', 'area', 'ybCharge', 'ybChargeTel', 'setDate',
        'licenseKey', 'insurance', 'dockerH', 'dockerM', 'dockerL', 'nurseH', 'nurseM', 'nurseL', 'meTechH', 'meTechM', 'meTechL', 'applyDate', 'locationAddress',
        'memberTel', 'timeLimit', 'onlyCode', 'yingYeTime'],

    B: ['creditCode', 'name', 'address', 'Region', 'member', 'practice', 'area', 'ybCharge', 'ybChargeTel', 'business', 'setDate', 'level', 'pharmacist',
        'insurance', 'techH', 'techM', 'techL', 'yingyeNum', 'applyDate', 'locationAddress', 'lat', 'lng', 'memberTel', 'timeLimit', 'yingYeTime'],
};

const changeTemplateTypeObj = ['id', 'befName', 'aftName', 'befMember', 'aftMember', 'befAddress', 'aftAddress', 'befArea', 'aftArea', 'befCode', 'aftCode', 'befBus', 'aftBus',
    'befBank', 'aftBank', 'befBankCode', 'aftBankCode', 'contacts', 'contactPhone', 'techZy', 'techH', 'techM', 'techL', 'yingyeNum', 'note', 'unit',
    'befLevel', 'befNature', 'befType', 'befLicense', 'aftLevel', 'aftNature', 'aftType', 'aftLicense'];

const templateObj = {
    insert: {
        A: 'medical.docx',
        B: 'drug.docx',
        C: 'ltc.docx'
    },
    change: {
        A: 'change-medical.docx',
        B: 'change-drug.docx',
    }
};

const allAreas = [
    { id: 'in_01', title: '南关区' }, { id: 'in_02', title: '朝阳区' }, { id: 'in_03', title: '二道区' }, { id: 'in_04', title: '绿园区' },
    { id: 'in_05', title: '高新区' }, { id: 'in_06', title: '宽城区' }, { id: 'in_07', title: '汽车经济开发区' }, { id: 'in_08', title: '经济开发区' },
    { id: 'in_09', title: '净月经济开发区' }, { id: 'in_10', title: '净月高新技术产业开发区' }, { id: 'in_11', title: '北湖经济开发区' }, { id: 'out_01', title: '双阳' },
    // tslint:disable-next-line: max-line-length
    { id: 'out_02', title: '德惠' }, { id: 'out_03', title: '九台' }, { id: 'out_04', title: '农安' }, { id: 'out_05', title: '榆树' }, { id: 'out_06', title: '公主岭' }
];

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

function setDateChange(date) {
    const time = new Date(date);
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const day = time.getDate();
    const dateStr = `${year}-${dateFormat(month)}-${dateFormat(day)}`;
    return dateStr;
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

function getRealValue(key, value) {
    let rtnStr = value;
    switch (key) {
        case 'timeLimit':
            rtnStr = dateChange(value);
            break;
        case 'Region':
            rtnStr = allAreas.find(e => e.id === value)['title'];
            break;
        case 'setDate':
            rtnStr = setDateChange(value);
            break;
        case 'unit':
            rtnStr = setChangeMatter(value);
            break;
    }
    return rtnStr;
}

function deleteFolder(path) {
    let files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        console.log(files);
        files.forEach(function(file,index){
            let curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) {
                deleteFolder(curPath);
            } else {
                console.log(`删除文件${curPath}`);
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

module.exports = async function word(type, affairs, dirName, organName, filename, valueArray, parentUrl) {
    if (!fs.existsSync(`${process.cwd()}/${!!parentUrl ? parentUrl : 'download'}/${dirName}`)) {
        fs.mkdirSync(`${process.cwd()}/${!!parentUrl ? parentUrl : 'download'}/${dirName}`);
    }
    if (!fs.existsSync(`${process.cwd()}/${!!parentUrl ? parentUrl : 'download'}/${dirName}/${organName}`)) {
        fs.mkdirSync(`${process.cwd()}/${!!parentUrl ? parentUrl : 'download'}/${dirName}/${organName}`);
    } else {
        deleteFolder(`${process.cwd()}/${!!parentUrl ? parentUrl : 'download'}/${dirName}/${organName}`);
        fs.mkdirSync(`${process.cwd()}/${!!parentUrl ? parentUrl : 'download'}/${dirName}/${organName}`);
    }
    const content = fs.readFileSync(`${process.cwd()}/templates/${templateObj[affairs][type]}`, 'binary');
    // const content = fs.readFileSync(path.join(__dirname, `../templates/${templateObj[type]}`), 'binary');
    const zip = new PizZip(content);
    const doc = new docxTemplate();
    doc.loadZip(zip);
    const valueObj = {};
    const array = affairs === 'insert' ? insertTemplateTypeObj[type] : changeTemplateTypeObj;
    array.map((e, i) => {
        const key = array[i];
        valueObj[key] = getRealValue(key, valueArray[i]);
    });
    const length = valueArray.length;
    valueObj['yingYeTime'] = `${valueArray[length - 3]} - ${valueArray[length - 2]}`;
    // 医疗机构
    // doc.setData({
    //     name: '肆伍科技',
    //     address: '吉大',
    //     member: '吕晨曦',
    //     memberTel: '15671551894',
    //     type: '零售',
    //     hosLevel: '三级',
    //     ownship: '私有',
    //     businessNature: '连锁',
    //     licenseData: '2020-06-30',
    //     businessLicenseData: '2020-06-30',
    //     officeNum: '20',
    //     bedNum: '200',
    //     serviceItem: '基本要点',
    //     creditCode: '200564986165465113',
    //     area: '2000',
    //     rental: '2020-06-30',
    //     bank: '100089998765613',
    //     ybCharge: '吕晨曦',
    //     ybChargeTel: '15671551894'
    // });
    doc.setData(valueObj);
    try {
        doc.render();
    } catch (err) {
        console.log(err);
    }
    // process.cwd()
    const buf = doc.getZip().generate({ type: 'nodebuffer' });
    // `${process.cwd()}/output/${filename}.docx`
    fs.writeFileSync(`${process.cwd()}/${!!parentUrl ? parentUrl : 'download'}/${dirName}/${organName}/${filename}.docx`, buf, (err) => {
        console.log(err);
    });

    return `${process.cwd()}/${!!parentUrl ? parentUrl : 'download'}/${dirName}/${organName}/${filename}.docx`;
}
