let config = {
    baseUrl: '',
    headers: {},
    queryParams: {},
    timeout: 5000,
    debug: false,
    sanitize: true,
    noSanitizeKeys: [],
    error: true
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
