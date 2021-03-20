const path = require("path");
const AwsSamPlugin = require("aws-sam-webpack-plugin");
const awsSamPlugin = new AwsSamPlugin({vscodeDebug: false});
const entries = awsSamPlugin.entry();

for(const property in entries){
    entries[property] = __dirname + entries[property].replace(/.\/\//g, '/');
}

console.log("Running webpack build...", entries);

module.exports = {
    // Loads the entry object from AWS::Serverless::Function resources in SAM config
    entry: entries,

    // Write the output to the .aws-sam/build folder
    output: {
        filename: (chunkData: string) => awsSamPlugin.filename(chunkData),
        libraryTarget: "commonjs2",
        path: path.resolve(__dirname, "."),
    },

    // Create source maps
    devtool: "source-maap",

    // Resolve .ts and .js extensions
    resolve: {
        extensions: [".ts", ".js"],
        modules: ['node_modules'],
    },

    // Target node
    target: "node",

    // AWS recommends always including the aws-sdk in your lambda package but excluding can significantly reduce the size of dev package.
    externals: process.env.NODE_ENV === "development" ? [] : ["aws-sdk"],

    // Set the webpack mode
    mode: process.env.NODE_ENV === "production" ? "production" : "development",

    // Add the Typescript Loader
    module: {
        rules: [{test: /\.tsx?$/, loader: "ts-loader"}]
    },

    watchOptions: {
        poll: true,
        ignored: /node_modules/
    },

    // Add the AWS SAM Webpack plugin
    plugins: [awsSamPlugin],

    stats: {
        warnings: false
    }
};