const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient({region: "us-west-2"});

exports.handler = async (event, context, callback) => {
    await addCompany().then(() => {
        callback(null, {
            statusCode: 201
        });
    }).catch((err) => {
        console.log(err);
    });
};

function addCompany() {
    const params = {
        TableName: "Companies",
        Item: {
            "CompanyName": "Heart Cup"
        }
    };
    return dynamoDB.put(params).promise();
}