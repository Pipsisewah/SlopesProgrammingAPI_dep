const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient({region: "us-west-2"});

exports.lambdaHandler = async (event, context, callback) => {
    await getAllCompanies().then((companies) => {
        return {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'Companies Getter Endpoint',
                data: companies
            })
        }
    });
};

function getAllCompanies(){
    const params = {
        TableName: 'Companies'
    };
    return dynamoDB.scan(params).promise();
}