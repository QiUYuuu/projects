const monConnentor = require('../connector/mongdb.connector');
const http = require('./http');

/**
 * 公众号提醒
 * @returns {Promise<Object>}
 */
async function remindOfficial(body, accessToken) {
    const url = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=' + accessToken;
    return await remind(url, body, '公众号');
}

/**
 * 发送请求 统一处理出参
 * @param url
 * @param body
 * @param msg
 * @returns {Promise<{status: number, msg: string}>}
 */
async function remind(url, body, msg) {
    try {
        const result = await http.postRequest(url, body, {isUseProxy: true});
        const json = JSON.parse(result.body);
        //access_token过期
        if (json.errcode === 40001 || json.errcode === 42001) throw json.errcode + '|' + json.errmsg;
        //成功
        else if (json.errcode === 0) return `${msg}消息提醒发送成功`;
        //未订阅（关注）
        else if (json.errcode === 43004) {
            //myBase.logInfo.warn(json.errmsg, body);
            return {status: 43004, msg: json.errmsg};
        }
        //其他错误
        else throw `错误代码:${json.errcode}|${json.errmsg}`;
    } catch (e) {
        console.log(e);
    }
}

async function activateRemind(inData, accessToken) {
    const body = {
        touser: inData.openid,//接收者openid
        template_id: 'UWXdRyDS8qjsDKTOjvuKjvmURvKqaRHE_69lfBuvoI8',//模板ID
        url: 'https://mp.weixin.qq.com/insurance/card/creditjump?cityid=220100&from=t-oH1Or55jHNtGmA9Ec9nA.%3D#wechat_redirect',//模板跳转链接 可空
        data: {
            first: {
                value: inData.first,
                color: '#173177'
            },
            keyword1: {
                value: inData.keyword1,
                color: '#173177'
            },
            keyword2: {
                value: inData.keyword2,
                color: '#173177'
            },
            remark: {
                "value": inData.remark,
                "color": "#173177"
            }
        }
    };
    return await remindOfficial(body, accessToken);
}

module.exports = async function sendMsg(unionid, type, name, status) {
    const description = {
        A: {
            A: '审核未通过',
            C: '初审未通过，请返回审核进度查询进行修改',
            D: '初审已通过，正在等待复审',
            DR: '二次申报已通过，正在等待复审',
            E: '复审未通过，请返回审核进度查询进行修改',
            F: '您申请单位已经通过复审，请于公告时间之内将评估材料并携带公章送达至长春市社会医疗保险管理局【天富路-新城大街交汇->诺瑞德广场->市医保医药监督处】(外六县送至当地医保经办)'
        },
        B: {
            A: '审核未通过',
            C: '初审未通过，请返回审核进度查询进行修改',
            D: '初审已通过，正在等待复审',
            DR: '二次申报已通过，正在等待复审',
            E: '复审未通过，请返回审核进度查询进行修改',
            F: '您申请单位已经通过复审，请于公告时间之内将评估材料并携带公章送达至长春市社会医疗保险管理局【天富路-新城大街交汇->诺瑞德广场->市医保医药监督处】(外六县送至当地医保经办)'
        },
        C: {
            C: '医保联系人认证审核未通过',
            D: '您已通过医保联系人认证，可登录系统进行业务办理',
            DR: '二次申报已通过，可登录系统进行业务办理',
        }
    };
    const userInfo = await monConnentor.select('pub_user_info', {unionid: unionid, channel: 'wechat_official'});
    const openId = userInfo[0].openid;
    console.log(openId);
    monConnentor.select('sysParams', {key: 'access_token'}).then(data => {
        let inData = {
            openid: openId,
            first: '',//问候语
            keyword1: '两定机构系统通知',//待办事务名称
            keyword2: `申报进度提示`,//事务描述
            remark: `您申报的  [${name}]  [${type === 'C' ? '医保联系人认证' : '医药机构申报'}]，${description[type][status]}`,//操作说明
            redirect: '',//通知地址
        };
        console.log(inData);
        activateRemind(inData, data[0].value).then().catch();
    });
}
