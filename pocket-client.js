'use strict';

const axios = require('axios');

module.exports.getRequestToken = async () => {
    if (!process.env.CONSUMER_KEY) {
        throw new Error('Consumer key not set in env variables');
    }
    const url = 'https://getpocket.com/v3/oauth/request';
    const data = {
        consumer_key: process.env.CONSUMER_KEY,
        redirect_uri: 'https://www.google.com'
    };
    console.log(data);
    const headers = {
        'Content-Type': 'application/json',
        'X-Accept': 'application/json',
    };
    const response = await axios({
        method: 'POST',
        url,
        data,
        headers
    });
    console.log(response);
    if (response.status !== 200) {
        throw new Error(`Unsuccessful status code ${response.statusCode}`);
    }
    if (!response.data || !response.data.code) {
        throw new Error(`Unexpected data retrieved: ${JSON.stringify(response.data)}`);
    }
    return response.data.code;
}

module.exports.getSignInUrl = (token) => {
    if (!process.env.APIGATEWAY_URL) {
        throw new Error('Gateway URL env variable not set');
    }
    const redirectUrl = encodeURIComponent (`${process.env.APIGATEWAY_URL}?token=${token}`);
    return `https://getpocket.com/auth/authorize?request_token=${token}&redirect_uri=${redirectUrl}`;
}

module.exports.getAccessTokenResponse = async (token) => {
    if (!process.env.CONSUMER_KEY) {
        throw new Error('Consumer key not set in env variables');
    }
    const url = 'https://getpocket.com/v3/oauth/authorize';
    const data = {
        consumer_key: process.env.CONSUMER_KEY,
        code: token
    };
    console.log(data);
    const headers = {
        'Content-Type': 'application/json',
        'X-Accept': 'application/json',
    };
    const response = await axios({
        method: 'POST',
        url,
        data,
        headers
    });
    console.log(response);
    if (response.status !== 200) {
        throw new Error(`Unsuccessful status code ${response.statusCode}`);
    }
    if (!response.data || !response.data.access_token) {
        throw new Error(`Unexpected data retrieved: ${JSON.stringify(response.data)}`);
    }
    return response.data;
}