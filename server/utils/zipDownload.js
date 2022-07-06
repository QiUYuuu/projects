const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const urlencode = require('urlencode');
const word = require('./exportWord');
const composeImg = require('./exportPDF');
const drawPDF = require('./drawWorldToPDF');
const connection = require('../connector/oracle.connector');
const PDFDocument = require('pdfkit');

let pathArray = [];

function downLoad(res, downPath) {
    const unzipName = 'package';
    // 压缩文件生成目录
    let output = fs.createWriteStream(process.cwd() + `/${unzipName}.zip`);
    let archive = archiver('zip', {
        zlib: { level: 9 }
    });
    output.on('close', function () {
        console.log(`总共 ${archive.pointer()} 字节`);
        console.log('archiver完成文件的归档，文件输出流描述符已关闭');
        setTimeout(() => {
            // 下载文件目录  即为  压缩文件生成目录
            let pahtTemp = process.cwd() + `/${unzipName}.zip`;
            let size = fs.statSync(pahtTemp).size;
            let f = fs.createReadStream(pahtTemp);
            res.writeHead(200, {
                'Content-Type': 'application/force-download',
                'Content-Disposition': 'attachment; filename=' + urlencode(`${unzipName}.zip`),
                'Content-Length': size
            });
            f.pipe(res);
        }, 2000);
    });
    output.on('end', function () {
        console.log('数据源已耗尽');
    });
    archive.on('warning', function (err) {
        if (err.code === 'ENOENT') {
            console.warn('stat故障和其他非阻塞错误');
        } else {
            throw err;
        }
    });
    archive.on('error', function (err) {
        throw err;
    });
    archive.pipe(output);
    archive.directory(downPath, unzipName);
    archive.finalize();
}

async function down(code, type, affairs, timestamp, quarter, parentUrl) {
    const procedureName = 'M_GET_DOWNINFO';
    const inputParams = {};
    inputParams['creditCode'] = connection.inputParamsVal(code);
    inputParams['quarter'] = connection.inputParamsVal(quarter);
    inputParams['type'] = connection.inputParamsVal(type);
    inputParams['affairs'] = connection.inputParamsVal(affairs);
    const oracleData = await connection.executeProcedure(procedureName, inputParams, connection.outputParamsCursor(2));
    return new Promise(async (resolve, reject) => {
        await word(type, affairs, timestamp, oracleData[0][0][1], `${oracleData[0][0][1]}申请表`, oracleData[0][0], parentUrl);
        const imgList = [];
        oracleData[1].map(e => {
            imgList.push({
                fileId: e[0],
                fileUnit: e[1],
                fileNo: e[2]
            });
        });
        const imgFilePath = await composeImg(timestamp, oracleData[0][0][1], quarter, imgList, parentUrl);
        pathArray.push(imgFilePath);
        const rtnObj = {
            affairs: affairs,
            type: type,
            info: oracleData[0][0],
            pdfPath: imgFilePath,
            imgPath: path.join(imgFilePath, oracleData[0][0][1])
        };
        resolve(rtnObj);
    });
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
const functionObj = {};

functionObj.zipDownload = async function (req, res) {
    pathArray = [];
    const timestamp = new Date().getTime() + '';
    const body = req.query;
    const params = JSON.parse(body.params);
    for (let i = 0; i < params.length; i++) {
        const doc = new PDFDocument;
        const rtnObj = await down(params[i][0], params[i][1], params[i][2], timestamp, body.quarter);
        await drawPDF(rtnObj.affairs, rtnObj.type, doc, rtnObj.info, rtnObj.imgPath, rtnObj.pdfPath);
    }
    downLoad(res, pathArray[0]);
}

functionObj.filrBackUp = async function(code, type, affairs, quarter, parentUrl) {
    const doc = new PDFDocument;
    const rtnObj = await down(code, type, affairs, quarter, quarter, parentUrl);
    await drawPDF(rtnObj.affairs, rtnObj.type, doc, rtnObj.info, rtnObj.imgPath, rtnObj.pdfPath);
}

module.exports = functionObj;
