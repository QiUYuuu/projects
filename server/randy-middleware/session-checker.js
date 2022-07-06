/**
 * Created by lvchenx on 2021/2/24.
 */
const monConnentor = require('../connector/mongdb.connector');

    const handleError = (err, res) => {
    res.json({respCode: err});
};
const goRouter = ['get-login-status', 'getUuid', 'check-login-status', 'zip', 'testUrl', 'setSession'];
// 申报日期截止时间
const shutRouter = ['/ccsyb-drug/form', '/ccsyb-form/setForm', '/ccsyb-medical/form', '/ccsyb-change/drugChange', '/ccsyb-change/medicalChange',
    ];
// 修改日期截止时间
const fixRouter = ['/ccsyb-medical/updateForm', '/ccsyb-drug/updateForm', '/ccsyb-change/updateDrugChange', '/ccsyb-change/updateMedicalChange',
    '/ccsyb-form/secondForm'];
module.exports = (req, res, next) => {
    console.log('In session checker, url=', req.url);
    console.log(req.session);
    if (req.url === '/favicon.ico') {
        res.end('200');
    }else if (shutRouter.indexOf(req.url) >= 0) {
        if ( !getDate() ) {
            res.json({
                respData: {
                    status: -1,
                },
                respResultsets: '申报入口关闭',
                respCode: 't301'
            });
        } else {
            next();
        }
    }else if (fixRouter.indexOf(req.url) >= 0) {
        if ( fixShutDown() ) {
            res.json({
                respData: {
                    status: -1,
                },
                respResultsets: '修改入口关闭',
                respCode: 't301'
            });
        } else {
            next();
        }
    }
    else if(req.method === 'OPTIONS'){
        next();
    }else if (goRouter.indexOf(req.url.split('/')[2]) > -1) {
        next();
    }else if (req.url.indexOf('uploadimg') >= 0) {
        next();
    }else if(req.url.indexOf('zip') >= 0){
        next();
    }else if(req.session && req.session.unionid && (req.session.loginStatus === 'ldjg')){
        req.session._garbage = Date();
        req.session.touch();
        next();
    } else {
        res.json({
            respData: {
              status: -1,
            },
            respResultsets: 'session失效，请重新登录',
            respCode: 'e301'
          })
    }
};

function getDate () {
    const startDate = '2022-06-14';
    const shutDownDate = '2022-06-23';
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    const hour = now.getHours();
    const dateStr = `${year}-${month + 1 > 9 ? month + 1 : '0' + (month + 1)}-${day > 9 ? day : '0' + day}`;
    return (dateStr >= startDate) && (dateStr < shutDownDate) ;
}

function fixShutDown() {
    const shutDownDate = '2022-06-23';
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    const min = date.getMinutes();
    return `${year}-${month + 1 > 9 ? month + 1 : '0' + (month + 1)}-${day > 9 ? day : '0' + day}` > shutDownDate;
}

// module.exports = (req, res, next) => {
//     console.log(req.session.unionid);
//     console.log('In session checker, url=', req.url);
//     next();
// };
