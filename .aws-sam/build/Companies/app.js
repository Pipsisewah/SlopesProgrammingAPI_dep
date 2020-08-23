// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
let mysql = require('mysql');
const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-west-2'
});

const parameterStore = new AWS.SSM();
const parameterPath = "/slopesprogramming/db/";
exports.lambdaHandler = async (event, context) => {
    try {
        const message = "Companies getter";
        await loadParameters();
        let con = mysql.createConnection({
            host: process.env.URL,
            user: process.env.HOSTNAME,
            password: process.env.PASSWORD
        });
        let databaseConnectionStatus = "Disconnected";
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            databaseConnectionStatus = "Connected";
        });
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: message,
                data: process.env.HOSTNAME,
                database: databaseConnectionStatus
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};

const loadParameters = async () => {
    const parameters = await getParameters();
    for(const param of parameters){
        if(param.Name === undefined || param.Name === ""){
            throw Error(
                "Parameter name is not set for a given credential"
            );
        }
        const name = param.Name.replace(parameterPath, "").toUpperCase();
        process.env[name] = param.Value;
    }
}

const getParameters = async () => {
    const data = await parameterStore.getParametersByPath({Path: parameterPath}).promise();
    return data.Parameters;
}
