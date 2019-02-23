'use strict';

const {
  getRequestToken,
  getSignInUrl,
  getAccessTokenResponse
} = require('./pocket-client');

module.exports.get = async (event) => {
  const token = event.queryStringParameters && event.queryStringParameters.token;
  if (!token) {
    return await redirectToSignInResponse();
  }
  const accessTokenResponse = await getAccessTokenResponse(token);
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Get a Pocket Token</title>
  <meta name="description" content="Get a Pocket Token">
</head>
<body>
  <label>New Access Token</label>
  <label>${accessTokenResponse.access_token}</label>
  <br />
  <label>Valid for user</label>
  <label>${accessTokenResponse.username}</label>
</body>
</html>`;
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html'
    },
    body: html,
  };

};

async function redirectToSignInResponse() {
  const token = await getRequestToken();
  const signInUrl = await getSignInUrl(token);
  return {
    statusCode: 302,
    headers: {
      Location: signInUrl
    }
  };
}