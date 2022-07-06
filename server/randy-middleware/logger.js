const fs = require('fs');

function logger(morgan, app) {
    const logDirectory = require('path').join(__dirname, '../morgan-logs');
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
    app.use(morgan('combined', {
        stream: require('rotating-file-stream')(`${require('dayjs')().format('YYYY-MM-DD-hh-mm-ss')}.log`, {
            interval: '1d',
            path: logDirectory
        })
    }));
    require('../conf/global.conf').isDebug && app.use(morgan('dev'));
}

module.exports = logger;
