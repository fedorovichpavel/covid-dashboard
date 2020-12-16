const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = (env, options) => {
    const isProduction = options.mode === 'production';
    const config = {
        mode: isProduction ? 'production' : 'development',
        devtool: isProduction ? false : 'source-map',
        devServer: {
            port: 4200,
        },
        entry: './src/index.js',
        output: {
            path: path.join(__dirname, '/dist'),
            filename: 'script.js',
        },

        module: {
            rules: [{
                    test: /\.css$/i,
                    use: [{
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: ''
                            }
                        },
                        {
                            loader: "css-loader"
                        }
                    ]
                }, {
                    test: /\.(png|svg|jpe?g|gif)$/,

                    use: [

                        'file-loader'

                    ]
                }

            ]
        },

        plugins: [
            new CleanWebpackPlugin(),
            new CopyWebpackPlugin({
                patterns: [
                    /*{
                                               from: path.resolve(__dirname, 'src/assets/audio'),
                                               to: path.resolve(__dirname, 'dist/src/assets/audio'),
                                           }, */
                    {
                        from: path.resolve(__dirname, 'src/assets/img'),
                        to: path.resolve(__dirname, 'dist/src/assets/img'),
                    }, {
                        from: './src/assets/img/favicon.ico',
                        to: '.dist/src/assets/img',
                    }
                ],
            }),
            new MiniCssExtractPlugin({
                filename: './src/style.css'
            }),
            new HtmlWebpackPlugin({
                template: 'index.html'
            }),

        ]
    }
    return config;
}