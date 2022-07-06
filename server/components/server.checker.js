const Promise = require('promise');
const debug = require('debug')('express:sdr');
const monConnentor = require('../connector/mongdb.connector');
var MongoClient = require('mongodb').MongoClient;
const config = require('../conf/config.conf');
const mysqlConnentor = require('../connector/mysql.connector');
const urlParser = url => url.match(/[^(\/\/)]+:[\d]+(?=\/)/)[0].split(':');
// const urlParser = url => url.match(/[^(\/\/)]+:[\d]+(?=\/)/)[0].split(':');

// 检查session是否启动
const sessionServer = new Promise(resolve => {
    /*mogConnector.getConnection()
        .then(() => {
            console.log('[SESSION SERVER] has been detected!');
            resolve();
        })
        .catch((e) => {
            console.error(e.message);
            exit();
        })*/
        monConnentor.init()
        .then(() => {
            console.log('[SESSION SERVER] has been detected!');
            resolve();
        })
        .catch(e => console.log(e))
})

const oracleServer = new Promise(resolve => {
    const output = urlParser(config.poolAttrs.connectionString);
    require('net').createConnection(output[1], output[0])
        .on('connect', () => {
            console.log(`[[ORACLE   SERVER]@${output[1]}:${output[0]} IS STAND BY!`.green);
            resolve(1);
        })
        .on('error', (err) => {
            console.log(`[ORACLE SERVER]@${output[1]}:${output[0]} IS DOWN!`.red);
            resolve(0);
        });
});

// const mysqlServer = new Promise(resolve => {
//     mysqlConnentor.init()
//         .then(() => {
//             console.log('[MYSQL SERVER] has been detected!');
//             resolve();
//         })
//         .catch(e => console.log(e))
// });

module.exports = new Promise(resolve => {
    console.log('#############Detecting Dependency Servers############');
    Promise.all([oracleServer, sessionServer]).then(() => {
        console.log('##########Dependency Server Detect Completely########\n')
        resolve();
    });
});
