const get = require('./methods/get');
const post = require('./methods/post');
const put = require('./methods/put');
const _delete = require('./methods/delete');
const patch = require('./methods/patch');
const { setConfig, getConfig } = require('./config');
const {log, colors} = require("./logger");

process.on('unhandledRejection', (reason, promise) => {
    log(`Unhandled Rejection: ${reason.message || reason}`, colors.red);
});

const fetchninja = {
    get,
    post,
    put,
    delete: _delete,
    patch,
    setConfig,
    getConfig
};

module.exports = fetchninja;
