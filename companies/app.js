const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient({region: "us-west-2"});

exports.lambdaHandler = async (event, context, callback) => {
    await getAllCompanies().then((companies) => {
        callback(null, {
            statusCode: 200,
            companies: companies
        });
    }).catch((err) => {
        console.log(err);
    });
};

function getAllCompanies(){
    const params = {
        TableName: 'Companies'
    };
    return dynamoDB.scan(params).promise();
}

function addCompany() {
    const params = {
        TableName: "Companies",
        Item: {
            "CompanyName": "Heart Cup"
        }
    };
    return dynamoDB.put(params).promise();
}