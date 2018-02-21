const path = require('path');
const extractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require("webpack");
const NODE_ENV = process.env.NODE_ENV;
const isProduction = (NODE_ENV === 'production');

module.exports = {

    context: path.resolve('src', 'assets'),

    entry: ['./components/index'],

    output: {
        path: path.resolve('build'),
        publicPath: "/build/",
        filename: "./js/bundle.js",
    },

    devServer: {
        contentBase: "src",
        hot: true
    },

    plugins: [
        new extractTextPlugin({ // define where to save the file
            filename: './/css/style.css',
            allChunks: true,
        }),
        new webpack.BannerPlugin("Generated by Webpack Banner Plugin"),
        new webpack.HotModuleReplacementPlugin()

    ],

    module: {
        rules: [
            {
                test: /\.(js|jsx|es6)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!autoprefixer-loader'
                })
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                loader: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','less-loader']
                })
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.es6', '.jsx', '.css']
    },

    devtool: isProduction ? 'none' : 'source-map'
}