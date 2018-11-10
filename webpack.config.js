var path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlPlugin = new HtmlWebpackPlugin({
    template: "./index.html",
    filename: "./index.html"
});

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /(\.css|\.scss)$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist")
    },
    plugins: [htmlPlugin]
};