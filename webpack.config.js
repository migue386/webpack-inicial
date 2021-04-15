const HtmlWebPackPlugin   = require('html-webpack-plugin');
const MiniCssExtractPlugin= require('mini-css-extract-plugin');
const CssMinimizerPlugin  = require('css-minimizer-webpack-plugin');
const CopyPlugin   = require('copy-webpack-plugin');
const {CleanWebPackPlugin} = require('clean-webpack-plugin');

module.exports = {
   
    mode: 'development',
    optimization:{
        minimizer: [ new CssMinimizerPlugin()
        ]
    },
    output: {
        filename: 'main.[contenthash].js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/,
                use: [ 
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options:{
                    minimize: false
                },
            },
            {
                test: /\.(png|gif|svg|jpe?g)$/i,
                use:[
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 8192,
                            esModule: false,
                            name: 'assets/[name].[ext]'
                        }
                    },
                ],
                type: 'javascript/auto'



            },
            
            
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename:  './index.html'

        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                {from: 'src/assets', to: 'assets/'}
            ]
        }),
       
    ]





}