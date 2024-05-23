const colors = require('./colors');

const log = (message, color = colors.reset) => {
    const datetime = new Date().toISOString();
    console.log(`${color}%s${colors.reset}`, `[${datetime}] ${message}`);
};

module.exports = { log, colors };
