const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient({region: "us-west-2"});

exports.lambdaHandler = async (event, context) => {
    const data = await getAllCompanies();
    const response = {
        'statusCode': 200,
        'body': JSON.stringify({
            message: 'Companies Get All Endpoint',
            items: data.Items,
        }),
    };
    return response;
};

function getAllCompanies(){
    const params = {
        TableName: 'Companies'
    };
    return dynamoDB.scan(params).promise();
}