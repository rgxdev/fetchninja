let config = {
    debug: false,
    error: true,
    baseUrl: '',
    headers: {},
    timeout: 5000,
    queryParams: {},
    sanitize: true
};

const setConfig = (userConfig) => {
    config = { ...config, ...userConfig };
    if (config.debug) {
        const { log, colors } = require('./logger');
        log('Initial configuration set', colors.green);
    }
};

const getConfig = () => config;

module.exports = { setConfig, getConfig };
