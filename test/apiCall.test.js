const fetchninja = require('../package');

// Set custom configuration
fetchninja.setConfig({
    debug: true, // Enable debug mode
    baseUrl: 'https://api.schulsync.com', // Your api base url
    sanitize: true, // Set to false to disable sanitization
    noSanitizeKeys: ['password', 'email'] // Exclude these keys from sanitization
});

// Make a POST request with data and then log it
fetchninja.post('/login', {
    email: 'a.app@gmx.net',
    password: "asdasdasd"
}).then(response => {
    console.log('API Response:', response);
}).catch(error => {
    console.error('API Error:', error);
});

// Make a GET request with custom headers and then log it
fetchninja.get('/@me', {
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjNhNDRhZjUxOTU0YjE5ZTFhOTM4MTEiLCJ1c2VybmFtZSI6InJneGRldiIsImlhdCI6MTcxNTYyMTk2NiwiZXhwIjoxNzE4MjEzOTY2LCJhdWQiOiIuc2NodWxzeW5jLmNvbSJ9.h-rEWcG9Kre6EppsA8fcXrXXG9imAw2SGbK-_Rtpsdg'
    }
}).then(response => {
    console.log('API Response:', response);
}).catch(error => {
    console.error('API Error:', error);
});


