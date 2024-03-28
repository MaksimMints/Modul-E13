const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    mode: "development",
    output: {
        filename: 'main.js'
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.pug',
            filename: './index.html'
        }),
        new TerserWebpackPlugin(),
        new OptimizeCssAssetsWebpackPlugin(),
        new ESLintPlugin(),
        new StylelintPlugin(),
    ],
    optimization:{
        minimize: true,
        minimizer: [ new TerserWebpackPlugin(), new OptimizeCssAssetsWebpackPlugin()]
    },
    module: {
        rules: [
            {
                test:/.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: true,
                        },
                    },
                    'css-loader',
                ],
            },
            {
                test: /\.pug$/,
                use: 'pug-loader'
            },
        ]
    }
}