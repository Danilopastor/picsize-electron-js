const axios = require('axios');

exports.api = axios.create({
    baseURL : "api.url",
});