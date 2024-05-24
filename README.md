# 🐱‍👤Fetchninja Documentation


## Introduction
Fetchninja is a simple and easy to use library for fetching data from the internet. It is built on top of the popular `requests` library and provides a simple and intuitive API for making HTTP requests.

## 🔨Installation
You can install Fetchninja using `npm` or `yarn`. To install it using `npm`, run the following command in your terminal:

```bash
npm install fetch-ninja
```

To install it using `yarn`, run the following command:

```bash
yarn add fetch-ninja
```

## 🎯 Setup
To use Fetchninja in your project, you need to import it into your code and set up the config. You can do this by adding the following line at the top of your file:

```javascript
const { fetchninja } = require('fetch-ninja');

// Set custom configuration
fetchninja.setConfig({
    debug: true, // Enable debug mode
    baseUrl: 'https://api.schulsync.com', // Your api base url
    sanitize: true, // Set to false to disable sanitization
    noSanitizeKeys: ['password', 'email'] // Exclude these keys from sanitization
});

```

## 🎮 Usage
Using Fetchninja is very simple. You can make HTTP requests using the `fetchninja` function. The function takes three arguments: the path, the data, and optionally custom headers. Here is an example of how you can use the `apiCall` function to make a POST request:
```javascript
// Make a POST request with data and then log it
fetchninja.post('/login', {
    email: 'email@mail.com',
    password: "VERY_STRONG_PASSWORD"
}).then(response => {
    console.log('API Response:', response);
}).catch(error => {
    console.error('API Error:', error);
});


// Make a GET request with custom headers and then log it
fetchninja.get('/@me', {
    headers: {
        'Authorization': `Bearer ${someToken}`
    }
}).then(response => {
    console.log('API Response:', response);
}).catch(error => {
    console.error('API Error:', error);
});
```

## 💫 Conclusion
Fetchninja is a simple and easy to use library for making HTTP requests. It provides a simple and intuitive API that makes it easy to fetch data from the internet. If you are looking for a lightweight library to help you make HTTP requests in your project, Fetchninja is a great choice.


## ✨ License
Fetchninja is released under the MIT License. You can find the full license text [here]("https://github.com/rgxdev/fetchninja/blob/main/LICENSE").

## 🐞 Help and Bugs
If you have any questions or need help with Fetchninja, you can reach out to us at our [discord](https://discord.gg/q93PD8pBgy) server.
If you find any bugs or issues with Fetchninja, please report them and create an issue on our [GitHub](https://github.com/rgxdev/fetchninja) page.
