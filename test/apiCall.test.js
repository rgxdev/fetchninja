const { setConfig, apiCall } = require('../package');

// Set configuration
setConfig({
    debug: true,
    baseUrl: 'YOUR API URL',
    sanitize: true,
    headers: { 'Content-Type': 'application/json' }
});

// Make an API call

const response = apiCall('/login', 'POST', { email: 'email@mail.com', password: "SUPER_SECURE_PASSWORD" }, {
    headers: {
        "Authorization": "Bearer token"
    }
})
.then((response) => {
    console.log(response);
})
.catch((error) => {
    console.error(error);
});
