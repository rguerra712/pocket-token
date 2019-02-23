# Pocket Token
This repository is for those who wish to obtain an access token for Pocket who don't want to implement the whole oauth flow.
The idea is that given *just* your consumer key, you can be redirected in order to obtain *your* access token easily. 

# Prerequisites
1. [You have created a new app on the Pocket website](https://getpocket.com/developer/apps/new)
1. You have followed the instructions to install the [serverless framework](https://github.com/serverless/serverless)

# Instructions
1. Clone this repo and navigate to the cloned repository
1. Add your consumer key to the environment variables as so:
`
echo "CONSUMER_KEY: <INSERT YOUR KEY HERE>" > serverless.env.yml
`
1. Deploy the application using the following command:
`
serverless deploy
`
1. Navigate to the output URL, which will be of the form `https://{someId}.execute-api.us-east-1.amazonaws.com/dev/`
1. Sign in, then you should see the access token upon a successful signin 