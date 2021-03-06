const request = require('request');
const fs = require('fs');

const ERR_FILE_NAME = 'http_err';

module.exports = {
    postRequest: (url, data, options) => {
        return httpRequest('POST', url, data, options);
    },

    getRequest: (url, data, options) => {
        return httpRequest('GET', url, data, options);
    },
    getParameter: (req) => {
        return req.query;
    },
    postParameter: (req) => {
        return req.body;
    }
};

/**
 * http请求
 * @param method              POST/GET
 * @param url                 请求地址
 * @param data                请求数据
 * @param options             isUseProxy 是否使用代理
 *                             isUseCert  是否使用证书
 *                             pfxPath    证书地址
 *                             passphrase 证书密码
 * @returns {Promise<any>}
 */
function httpRequest(method, url, data, options) {
    return new Promise((resolve, reject) => {

        let _options = {
            headers: (!!options && !!options.headers) ? options.headers : {'Content-Type': 'application/json'},
            url: url,

            method: method,
            body: typeof data === 'object' ? JSON.stringify(data) : data,
            timeout: 30000
        };
        if (!!options && typeof options.isUseProxy === "boolean") {
            if (options.isUseProxy === true) _options.proxy = 'http://10.199.17.70:30001';
        }
        request(_options, (error, result, body) => {
            if (error) {
                reject(`http request error: ${error}| ${url}`);
                return;
            }
            if (!error && result.statusCode === 200) {
                resolve({statusCode: result.statusCode, body: body});
            }
            else {
                reject(`http request error: statusCode is ${result.statusCode}| ${url}`);
            }
        });
    });
}
