const https = require('https');
const { log, colors } = require('../logger');
const { getConfig } = require('../config');
const { sanitizeInput } = require('../sanitize');

const _delete = async (path, options = {}) => {
    const config = getConfig();

    try {
        const url = new URL(path, config.baseUrl);
        Object.entries({ ...config.queryParams, ...options.queryParams }).forEach(([key, value]) => {
            url.searchParams.append(key, sanitizeInput(value, key));
        });

        const requestOptions = {
            method: 'DELETE',
            headers: { ...config.headers, ...options.headers },
            timeout: config.timeout
        };

        return await new Promise((resolve) => {
            const req = https.request(url, requestOptions, (res) => {
                let body = '';

                res.on('data', (chunk) => {
                    body += chunk;
                });

                res.on('end', () => {
                    if (config.debug) {
                        log(`Response: ${body}`, colors.cyan);
                    }
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        resolve(JSON.parse(body));
                    } else {
                        const error = new Error(`Request failed with status code ${res.statusCode}`);
                        if (config.error) {
                            log(error.message, colors.red);
                        }
                        resolve({ error: error.message });
                    }
                });
            });

            req.on('error', (e) => {
                if (config.error) {
                    log(`Error: ${e.message}`, colors.red);
                }
                resolve({ error: e.message });
            });

            req.end();
        });
    } catch (error) {
        if (config.error) {
            log(`Unexpected Error: ${error.message}`, colors.red);
        }
        return { error: error.message };
    }
};

module.exports = _delete;
