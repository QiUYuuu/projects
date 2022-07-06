const isTest = !true;
module.exports = {
    isTest: isTest,
    corsConfig: {
        origin: ['localhost:5905'],
        methods: ['GET', 'PUT', 'POST', 'HEAD', 'PATCH', 'DELETE', 'OPTIONS'],
        credentials: true,
        proxy: true
    },
    nodeServer: {
        address: isTest ? 'localhost' : '',
        // port: '5865'
        port: isTest ? '5800' : '3001'
    },
    MongoUris: [`mongodb://10.199.4.22:27017,10.199.4.23:27017,10.199.4.24:27017/yb_session_test?replicaSet=my_repl`],

    isDebug : require('express')().get('env') === 'production',
};
