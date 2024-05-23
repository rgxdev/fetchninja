const https = require('https');
const { log, colors } = require('./logger');
const { getConfig } = require('./config');
const querystring = require('querystring');

const supportedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

const sanitizeInput = (input, isEmail = false) => {
    if (typeof input === 'string') {
        if (isEmail) {
            return input; // Do not sanitize email addresses
        }
        return input.replace(/[^a-zA-Z0-9 _-]/g, '');
    }
    return input;
};

const apiCall = async (path, method, data = null, options = {}) => {
    const config = getConfig();

    try {
        if (!supportedMethods.includes(method)) {
            const errorMsg = `Unsupported method: ${method}`;
            if (config.error) {
                log(errorMsg, colors.red);
            }
            return { error: errorMsg };
        }

        const url = new URL(path, config.baseUrl);
        Object.entries({ ...config.queryParams, ...options.queryParams }).forEach(([key, value]) => {
            url.searchParams.append(key, sanitizeInput(value, key.includes('email')));
        });

        let postData = '';
        if (method === 'GET') {
            Object.entries(data || {}).forEach(([key, value]) => {
                url.searchParams.append(key, sanitizeInput(value, key.includes('email')));
            });
        } else {
            const sanitizedData = config.sanitize
                ? Object.fromEntries(Object.entries(data || {}).map(([key, value]) => [key, sanitizeInput(value, key.includes('email'))]))
                : data;
            postData = JSON.stringify(sanitizedData);
        }

        const requestOptions = {
            method,
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

            if (['POST', 'PUT', 'PATCH'].includes(method) && postData) {
                req.write(postData);
            }

            req.end();
        });
    } catch (error) {
        if (config.error) {
            log(`Unexpected Error: ${error.message}`, colors.red);
        }
        return { error: error.message };
    }
};

process.on('unhandledRejection', (reason, promise) => {
    log(`Unhandled Rejection: ${reason.message || reason}`, colors.red);
});

module.exports = { apiCall };
