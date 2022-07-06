const fs = require('fs');
const connection = require('../connector/oracle.connector');

const fileUnitNameObj = {
    xukez: '医疗机构执业许可证',
    yingye: '营业执照',
    zhiye: '科室设置及医务人员的执业信息',
    zhidu: '与医保政策对应的内部管理制度和财务制度',
    cailiao: '与医保有关的信息系统相关材料',
    baogao: '纳入定点后对医保基金影响的预测性分析报告',
    jingying: '药品经营许可证或营业执照和法定代表人身份证',
    zige: '执业药师资格证书及其劳动合同复印件',
    laodong: '医保专（兼）职管理人员的劳动合同复印件',
    promise: '授权承诺书',
    idcard: '授权人身份证',
    zhuce: '执业药师注册证',
    shouyin: '收银窗口场景照片',
    mentou: '门头照片',
    fapiao: '正式运营3个月以上的佐证材料',
    idcard: '法人身份证',
    zulin: '房屋产权或租赁合同',
    ty1: '与特药生产厂家签署的一级经销商协议',
    tycl: '经营特药名单及供货商销售资格证明材料',
    lenglian: '冷链系统相关材料',
    ty4: '申请单位股权权属证明材料（药店权属证明材料）',
    ty5: '特药供应业务相适应的经营管理制度',
    ty6: '所配备的执业医师和执业药师注册信息'
};


async function deleteFolder(path) {
    let files = [];
    let doNext = true;
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function (file, index) {
            let curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) {
                deleteFolder(curPath);
            } else {
                if (curPath.split('.')[1] !== 'docx') {
                    fs.unlinkSync(curPath);
                } else {
                    doNext = false;
                }
            }
        });
        if (doNext) {
            fs.rmdirSync(path);
        }
    }
    return doNext;
}

module.exports = async function composeImg(dirName, organName, batch, imgList, parentUrl) {
    if (!fs.existsSync(`${process.cwd()}/${!!parentUrl ? parentUrl : 'download'}/${dirName}`)) {
        fs.mkdirSync(`${process.cwd()}/${!!parentUrl ? parentUrl : 'download'}/${dirName}`);
    }
    if (!fs.existsSync(`${process.cwd()}/${!!parentUrl ? parentUrl : 'download'}/${dirName}/${organName}`)) {
        fs.mkdirSync(`${process.cwd()}/${!!parentUrl ? parentUrl : 'download'}/${dirName}/${organName}`);
    } else {
        const doNext = await deleteFolder(`${process.cwd()}/${!!parentUrl ? parentUrl : 'download'}/${dirName}/${organName}`);
        if (doNext) {
            fs.mkdirSync(`${process.cwd()}/${!!parentUrl ? parentUrl : 'download'}/${dirName}/${organName}`);
        }
    }
    for (i = 0; i < imgList.length; i++) {
        const imgItem = imgList[i];
        await baseToJpg(imgItem['fileId'], imgItem['fileUnit'], imgItem['fileNo'], batch, dirName, organName, parentUrl);
    }
    return `${process.cwd()}/${!!parentUrl ? parentUrl : 'download'}/${dirName}`
    // return ImgPathList;
}

async function baseToJpg(fileId, fileUnit, fileNo, batch, dirName, organName, parentUrl) {
    const procedureName = "M_GET_IMGDATA";
    const inputParams = {};
    inputParams["dirName"] = connection.inputParamsVal(fileId);
    inputParams["type"] = connection.inputParamsVal('B');
    inputParams["batch"] = connection.inputParamsVal(batch);
    const resultSet = await connection.executeProcedure(procedureName, inputParams, connection.outputParamsCursor(1));
    const imgBase64 = resultSet[0][0][0];
    var imgPath = `${process.cwd()}/${!!parentUrl ? parentUrl : 'download'}/${dirName}/${organName}/${fileUnitNameObj[fileUnit]}-${fileNo}.jpg`;//从app.js级开始找--在我的项目工程里是这样的
    var base64 = imgBase64.replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
    var dataBuffer = new Buffer(base64, 'base64'); //把base64码转成buffer对象，
    return new Promise((reslove, reject) => {
        fs.writeFile(imgPath, dataBuffer, function (err) {//用fs写入文件
            if (err) {
                console.log(err);
            } else {
                console.log('写入完成！！！');
                reslove('111');
            }
        });
    })
}
