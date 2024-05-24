const { getConfig } = require('./config');

const sanitizeInput = (input, key = '') => {
    const config = getConfig();

    if (!config.sanitize || (config.noSanitizeKeys && config.noSanitizeKeys.includes(key))) {
        return input;
    }

    if (typeof input === 'string') {
        return input.replace(/[^a-zA-Z0-9 _-]/g, '');
    }
    return input;
};

module.exports = { sanitizeInput };
