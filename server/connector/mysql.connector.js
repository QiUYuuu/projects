const mysql = require('mysql');
let pool = null;
const dbConfig = require('../conf/mysql.conf');

function init() {
    return new Promise((resolve, reject) => {

        pool = mysql.createPool({
            connectionLimit: 10,
            host:dbConfig.host,
            user: dbConfig.user,
            port:dbConfig.port,
            password: dbConfig.password,
            database: dbConfig.database,
            charset:'utf8mb4'
        });
        resolve(pool);
    });
}


function executeProcedure(procedureName, inputParams, outputParams) {
    return new Promise((resolve, reject) => {
        if (pool === null) {
            resolve();
        }
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
                reject();
                return;
            }
            try {
                // Use the connection
                const _format = formatting(procedureName, inputParams, outputParams);
                connection.query(_format, function (error, results, fields) {
                    // When done with the connection, release it.

                    connection.release();
                    // console.log(JSON.stringify(results));
                    // Handle error after the release.
                    if (error) {
                        console.log(error);
                        reject();
                        return;
                    }
                    let tempAry = [];
                    if (results instanceof Array) {
                        for (let i = 0; i < results.length - 1; i++) {
                            tempAry.push(results[i]);
                        }
                    } else {
                        resolve([]);
                    }
                    resolve(tempAry);
                });
            } catch (e) {
                console.log(e);
                reject();
            }

        });
    });


}

function getConnection() {
    return new Promise((resolve, reject) => {
        pool.getConnection()
            .then(connection => {
                //console.log('Connection was successful!');
                resolve();

                release(connection);
                //close(connection);
            })
            .catch((err) => reject(err));
    })
}

function release(connection) {
    connection.release()
        .then(() => {
            console.log('connection release');
        })
        .catch(err => {
            log.writeFile(err, 'ERR_FILE_NAME').then();
        });
}

function close(connection) {
    /* Release the connection back to the connection pool */
    connection.close({drop: true})
        .then(() => {
            console.log('connection closed');
        })
        .catch(err => {
            //console.log("normal release() error", err);
            log.writeFile(err, ERR_FILE_NAME);
        });
}

function formatting(procedureName, inputParams) {
    let plsql = '';
    if (inputParams && inputParams.length > 0) {
        plsql = `CALL ${procedureName}('${inputParams.join('\',\'')}');`;
    } else {
        plsql = `CALL ${procedureName}();`;
    }

    return plsql;
}

function inputParamsVal(value) {
    return {val: value};
}

module.exports = {
    init,
    executeProcedure,
    inputParamsVal,
    getConnection
};
