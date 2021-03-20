import {APIGatewayProxyEventBase, APIGatewayProxyResult} from 'aws-lambda';
exports.get = async (event: APIGatewayProxyEventBase<any>): Promise<APIGatewayProxyResult> => {
    console.log("Running company endpoint");
    return {statusCode: 200, body: "Company Endpoint"};
};