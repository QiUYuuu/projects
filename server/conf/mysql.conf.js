const config = require('./config.conf');
module.exports = {
    connectionLimit: 10,
    host: config.isTest ? '10.199.4.25' : '10.199.13.6',//10.199.4.11  10.235.1.34 10.211.55.5
    user: 'u_sjjh',
    port: config.isTest ? '30055' : '33333',
    password: config.isTest ? 'SJjh2020)^' : 'SJjh2020)^',
    database: 'sjjhqzk'
};
const a = [
    {
        parentName: '2021机构',
        itemName: '医院',
        children: []
    },
    {
        parentName: '医院',
        children: []
    },
    {
        parentName: '医院',
        children: []
    },
    {
        parentName: '医院',
        children: []
    },
]
