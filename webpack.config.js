const path  = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');



module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        filename: "bundle.[chunkhash].js",
        path: path.resolve(__dirname,'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                loader: "file-loader"
            }
        ],
    },
    devServer: {
        port: 3000
    },
    plugins: [
        new HTMLPlugin({
            template: path.resolve(__dirname,'src','index.html')
        }),
        new CleanWebpackPlugin()
    ]
};
